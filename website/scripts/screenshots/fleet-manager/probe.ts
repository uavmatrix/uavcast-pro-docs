// Dev helper: screenshot arbitrary routes at 1x into raw/probe/ to check the seeded UI.
//   npx tsx probe.ts /dashboard /fleet [--dark] [--as=owner|viewer|staff|newcomer]
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { loadEnv, SCRIPTS_DIR } from "./lib/env.mjs";
import { CLEAN_CSS, newContext, settle } from "./lib/browser.ts";

const env = loadEnv();
const seed = JSON.parse(readFileSync(join(SCRIPTS_DIR, ".state/seed.json"), "utf8"));
const args = process.argv.slice(2);
const dark = args.includes("--dark");
const as = args.find((a) => a.startsWith("--as="))?.slice(5) ?? "owner";
const routes = args.filter((a) => a.startsWith("/"));
const base = env.NEXT_PUBLIC_APP_URL;
const out = join(SCRIPTS_DIR, "raw/probe");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const ctx = await newContext(browser, { baseUrl: base, token: seed.sessions[as], secret: env.BETTER_AUTH_SECRET, theme: dark ? "dark" : "light", orgId: seed.orgId });
ctx.setDefaultTimeout(60_000);
for (const r of routes) {
	const page = await ctx.newPage();
	page.on("pageerror", (e) => console.log("  pageerror", e.message));
	await page.goto(base + r, { timeout: 120_000 });
	await page.addStyleTag({ content: CLEAN_CSS });
	await settle(page, { tiles: r.startsWith("/map"), extraMs: 2500 });
	const f = join(out, `${r.replace(/[^a-z0-9]+/gi, "_")}${dark ? ".dark" : ""}.png`);
	await page.screenshot({ path: f });
	console.log(f, page.url());
	await page.close();
}
await browser.close();
