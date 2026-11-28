// Manifest-driven Playwright capture of the Fleet Manager docs screenshots.
// Expects the local stack from run.sh (seeded DB, dev server, simulator) to be running.
//
//   npx tsx capture.ts                 # everything, light + dark
//   npx tsx capture.ts --only=map,team # ids containing any of these substrings
//   npx tsx capture.ts --light         # skip dark variants
//
// Writes raw PNGs to raw/ (outside the docs repo's tracked tree) and optimised WebP
// files to website/static/img/screenshots/fleet-manager/, plus manifest.json.
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { type BrowserContext, chromium } from "playwright";
import sharp from "sharp";
import { CLEAN_CSS, HIDE_TOASTS_CSS, newContext, settle, waitTiles } from "./lib/browser.ts";
import { buildShots, mapLs, type Shot, type Theme } from "./lib/shots.ts";
import { fmDir, loadEnv, SCRIPTS_DIR } from "./lib/env.mjs";

const env = loadEnv();
const seed = JSON.parse(readFileSync(join(SCRIPTS_DIR, ".state/seed.json"), "utf8"));
const BASE = env.NEXT_PUBLIC_APP_URL;
const OUT_DIR = resolve(SCRIPTS_DIR, "../../../static/img/screenshots");
const RAW_DIR = join(SCRIPTS_DIR, "raw");
const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const lightOnly = args.includes("--light");

const pg = createRequire(join(fmDir(), "package.json"))("pg");
async function sql(q: string, params: unknown[] = []) {
	const c = new pg.Client({ connectionString: env.DATABASE_URL });
	await c.connect();
	try {
		return await c.query(q, params);
	} finally {
		await c.end();
	}
}

const SHOTS: Shot[] = buildShots({ seed, sql });
const BLANK_PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");

// ---------------------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------------------
interface Entry {
	id: string;
	file: string;
	description: string;
	width: number;
	height: number;
	bytes: number;
	darkFile?: string;
	darkBytes?: number;
}

const manifestPath = join(OUT_DIR, "fleet-manager", "manifest.json");
const previous: Entry[] = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")).shots ?? [] : [];
const results = new Map<string, Entry>(previous.map((e) => [e.id, e]));
const failures: string[] = [];

async function toWebp(png: string, webp: string, quality = 88) {
	mkdirSync(dirname(webp), { recursive: true });
	await sharp(png).webp({ quality, effort: 6, smartSubsample: true }).toFile(webp);
	const meta = await sharp(webp).metadata();
	return { bytes: statSync(webp).size, width: meta.width ?? 0, height: meta.height ?? 0 };
}

const browser = await chromium.launch();
for (const shot of SHOTS) {
	if (only && !only.some((o) => shot.id.includes(o))) continue;
	const themes: Theme[] = shot.dark === false || lightOnly ? ["light"] : ["light", "dark"];
	for (const theme of themes) {
		const label = `${shot.id}${theme === "dark" ? ".dark" : ""}`;
		process.stdout.write(`- ${label} ... `);
		for (let attempt = 1; attempt <= 2; attempt++) {
		let ctx: BrowserContext | undefined;
		try {
			await shot.before?.();
			const as = shot.as === undefined ? "owner" : shot.as;
			ctx = await newContext(browser, {
				baseUrl: BASE,
				token: as ? seed.sessions[as] : undefined,
				secret: env.BETTER_AUTH_SECRET,
				theme,
				orgId: shot.org === "sandbox" ? seed.sandboxOrgId : seed.orgId,
				localStorage: shot.ls?.(theme) ?? mapLs("auto")(theme),
				viewport: shot.viewport,
				isMobile: shot.mobile,
			});
			ctx.setDefaultTimeout(30_000);
			// Never let the airspace overlay reach OpenAIP: serve transparent tiles locally
			await ctx.route("**/api/tiles/openaip/**", (r) => r.fulfill({ contentType: "image/png", body: BLANK_PNG }));
			const page = await ctx.newPage();
			await page.goto(BASE + shot.path, { timeout: 120_000 });
			await page.addStyleTag({ content: CLEAN_CSS + (shot.toasts ? "" : HIDE_TOASTS_CSS) + (shot.css ?? "") });
			await settle(page, { tiles: shot.tiles, extraMs: 1200 });
			await shot.action?.(page, theme);
			if (shot.tiles) await waitTiles(page);
			await page.mouse.move(0, 0);
			await page.waitForTimeout(400);
			const png = join(RAW_DIR, `${label}.png`);
			mkdirSync(dirname(png), { recursive: true });
			if (shot.crop) {
				const loc = shot.crop(page).first();
				await loc.scrollIntoViewIfNeeded();
				const box = await loc.boundingBox();
				if (!box) throw new Error("crop target not visible");
				const pad = shot.pad ?? 16;
				const scrollY = await page.evaluate(() => window.scrollY);
				const docH = await page.evaluate(() => document.documentElement.scrollHeight);
				const vw = shot.viewport?.width ?? 1440;
				const clip = {
					x: Math.max(0, box.x - pad),
					y: Math.max(0, box.y + scrollY - pad),
					width: Math.min(vw, box.x + box.width + pad) - Math.max(0, box.x - pad),
					height: Math.min(docH, box.y + scrollY + box.height + pad) - Math.max(0, box.y + scrollY - pad),
				};
				await page.screenshot({ path: png, clip, fullPage: true });
			} else {
				await page.screenshot({ path: png, fullPage: shot.fullPage ?? false });
			}
			await ctx.close();
			await shot.after?.();
			const file = `${shot.id}${theme === "dark" ? ".dark" : ""}.webp`;
			const r = await toWebp(png, join(OUT_DIR, file), shot.tiles ? 82 : 88); // photo map tiles compress poorly; UI text stays at 88
			const e = results.get(shot.id) ?? ({ id: shot.id } as Entry);
			if (theme === "light") Object.assign(e, { file, description: shot.description, width: r.width, height: r.height, bytes: r.bytes });
			else Object.assign(e, { darkFile: file, darkBytes: r.bytes });
			if (theme === "light" && !themes.includes("dark")) {
				delete e.darkFile;
				delete e.darkBytes;
			}
			results.set(shot.id, e);
			console.log(`${Math.round(r.bytes / 1024)} KB${attempt > 1 ? " (retry)" : ""}`);
			break;
		} catch (err) {
			// keep a screenshot of the failure state for debugging
			const pg = ctx?.pages()[0];
			if (pg) {
				mkdirSync(join(RAW_DIR, "failed"), { recursive: true });
				await pg.screenshot({ path: join(RAW_DIR, "failed", `${label.replace(/\//g, "_")}.png`) }).catch(() => {});
			}
			await ctx?.close().catch(() => {});
			await shot.after?.().catch(() => {});
			if (attempt < 2) continue; // live UI (terminal, pairing) is occasionally slow: retry once
			failures.push(`${label}: ${(err as Error).message.split("\n")[0]}`);
			console.log(`FAILED (${(err as Error).message.split("\n")[0]})`);
		}
		}
	}
}
await browser.close();

const order = new Map(SHOTS.map((s, i) => [s.id, i]));
const shots = [...results.values()].filter((e) => order.has(e.id) && e.file).sort((a, b) => order.get(a.id)! - order.get(b.id)!);
mkdirSync(dirname(manifestPath), { recursive: true });
writeFileSync(
	manifestPath,
	`${JSON.stringify(
		{
			generated: new Date().toISOString(),
			source: "Local Fleet Manager dev server with seeded demo data (Nordwind Aerial Services). Not production.",
			viewport: "1440x900 @2x (lite-view: 390x844 @2x)",
			format: "webp q88",
			shots: shots.map((e) => ({ ...e, file: e.file.replace(/^fleet-manager\//, ""), darkFile: e.darkFile?.replace(/^fleet-manager\//, "") })),
		},
		null,
		2,
	)}\n`,
);
console.log(`\n${shots.length} shots in manifest${failures.length ? `, ${failures.length} failures:\n  ${failures.join("\n  ")}` : ""}`);
