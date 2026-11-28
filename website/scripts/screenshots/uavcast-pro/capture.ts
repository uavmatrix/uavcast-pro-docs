/**
 * UAVcast-Pro documentation screenshots: manifest-driven, read-only, re-runnable.
 *
 *   cd website/scripts/screenshots/uavcast-pro
 *   npm install                      # once (Playwright 1.49 + sharp)
 *   npx playwright install chromium  # once, if no Chromium 1148 is cached
 *   UAVCAST_URL=http://<device>:<port> npm run capture
 *
 * Options
 *   --base <url>         Device web UI (or env UAVCAST_URL).
 *   --locale <code>      Docs locale: en (default), es, it, nl, pl, pt, ru, tr, zh-cn, zh-tw.
 *   --themes light,dark  Which themes to capture (default both).
 *   --only <a,b>         Only ids containing any of these substrings.
 *   --out <dir>          Output dir (default website/static/img/screenshots/uavcast-pro).
 *   --raw <dir>          Also keep the raw 2x PNGs here (default: OS temp dir).
 *   --quality <n>        WebP quality (default 88).
 *   --system-fonts       Use the OS fonts instead of the bundled Inter / JetBrains Mono.
 *   --list               Print the manifest and exit.
 *
 * Output: <out>/<screen>[--state][.<locale>][.dark].webp and <out>/manifest.json
 * (en has no locale suffix; the light theme has no theme suffix).
 *
 * SAFETY. The target is a real aircraft companion computer. This script:
 *   - aborts every HTTP request that is not GET/HEAD/OPTIONS (tRPC mutations are
 *     POST), except URL substrings a shot explicitly allows for read-only live
 *     streams the page starts by itself;
 *   - drops every socket.io event frame the browser tries to send;
 *   - only clicks tabs, dropdown triggers and dialog openers, refusing switches,
 *     radios, checkboxes, menu items, options and buttons with action words.
 * Privacy masking (privacy.ts) rewrites IPs, e-mails, keys and ids in the DOM
 * before each capture, and an audit pass refuses to save a shot if anything slips.
 * Set SHOTS_DENY="word1,word2" (and optionally SHOTS_REDACT='{"real":"fake"}')
 * locally to add owner-specific strings that must never appear.
 */

import { chromium, type BrowserContext, type Locator, type Page } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { shots } from "./manifest.ts";
import { auditPage, installMasker, type MaskConfig } from "./privacy.ts";
import type { Action, Shot, Target, Theme } from "./types.ts";

const HERE = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const flag = (name: string) => argv.includes(`--${name}`);
const opt = (name: string, def?: string) => {
	const i = argv.indexOf(`--${name}`);
	return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : def;
};

/** Docs locale -> app locale code + file suffix. */
const LOCALES: Record<string, { app: string; suffix: string }> = {
	en: { app: "en", suffix: "" },
	es: { app: "es", suffix: ".es" },
	it: { app: "it", suffix: ".it" },
	nl: { app: "nl", suffix: ".nl" },
	pl: { app: "pl", suffix: ".pl" },
	pt: { app: "pt", suffix: ".pt" },
	ru: { app: "ru", suffix: ".ru" },
	tr: { app: "tr", suffix: ".tr" },
	"zh-cn": { app: "cn", suffix: ".zh-cn" },
	"zh-tw": { app: "tw", suffix: ".zh-tw" },
};

const BASE = (opt("base") ?? process.env.UAVCAST_URL ?? "").replace(/\/$/, "");
const LOCALE = opt("locale", "en")!;
const THEMES = (opt("themes", "light,dark")!.split(",") as Theme[]).filter((t) => t === "light" || t === "dark");
const ONLY = opt("only")?.split(",").filter(Boolean);
const OUT = path.resolve(opt("out") ?? path.join(HERE, "../../../static/img/screenshots/uavcast-pro"));
const RAW = path.resolve(opt("raw") ?? path.join(os.tmpdir(), "uavcast-pro-shots-raw"));
const QUALITY = Number(opt("quality", "88"));
const SYSTEM_FONTS = flag("system-fonts");

const DEFAULT_VIEWPORT = { width: 1440, height: 900 };
const DPR = 2;
const DEFAULT_PADDING = 14; // grid gaps are 20px, so neighbouring cards stay out of crops
const DEFAULT_MOUSE = { x: 1200, y: 30 }; // empty spot in the app header
const HIGHLIGHT = "#1747cf"; // docs accent (aviation blue)
const ASSET_HOST = "https://shot-assets.invalid";

// ---------------------------------------------------------------------------
// i18n: resolve `t:ns:key` against the device's own locale files
// ---------------------------------------------------------------------------
const localeCache = new Map<string, Record<string, unknown>>();
async function loadNs(lng: string, ns: string) {
	const k = `${lng}/${ns}`;
	if (!localeCache.has(k)) {
		const res = await fetch(`${BASE}/locales/${lng}/${ns}.json`);
		localeCache.set(k, res.ok ? ((await res.json()) as Record<string, unknown>) : {});
	}
	return localeCache.get(k)!;
}
async function tr(s: string): Promise<string> {
	if (!s.startsWith("t:")) return s;
	const [, ns, key] = s.match(/^t:([^:]+):(.+)$/) ?? [];
	if (!ns || !key) throw new Error(`Bad i18n reference ${s}`);
	for (const lng of [LOCALES[LOCALE].app, "en"]) {
		let cur: unknown = await loadNs(lng, ns);
		for (const part of key.split(".")) cur = (cur as Record<string, unknown> | undefined)?.[part];
		if (typeof cur === "string") return cur;
	}
	throw new Error(`Missing i18n key ${s}`);
}

// ---------------------------------------------------------------------------
// Targets
// ---------------------------------------------------------------------------
type Box = { x: number; y: number; width: number; height: number };
let markSeq = 0;

/** In-page finder: exact own-text match -> closest ancestor -> optional descendant. Smallest wins. */
function findInPage(a: { text: string; closest?: string; within?: string; find?: string; nth?: number; mark: string }) {
	const scope = a.within ? document.querySelector(a.within) : document.body;
	if (!scope) return null;
	const norm = (s: string | null) => (s ?? "").replace(/\s+/g, " ").trim();
	const hits = Array.from(scope.querySelectorAll<HTMLElement>("*")).filter((el) => {
		if (norm(el.textContent) !== a.text) return false;
		// deepest element carrying the text
		return !Array.from(el.children).some((c) => norm(c.textContent) === a.text);
	});
	let targets = hits
		.map((el) => (a.closest ? el.closest<HTMLElement>(a.closest) : el))
		.map((el) => {
			if (!el || !a.find) return el;
			// look for `find` inside the container, widening up to 4 ancestors (label -> field wrapper)
			let scopeEl: HTMLElement | null = el;
			for (let i = 0; i < 5 && scopeEl; i++, scopeEl = scopeEl.parentElement) {
				const q = scopeEl.querySelector<HTMLElement>(a.find);
				if (q) return q;
			}
			return null;
		})
		.filter((el): el is HTMLElement => !!el)
		.filter((el) => {
			const r = el.getBoundingClientRect();
			return r.width > 0 && r.height > 0;
		});
	targets = Array.from(new Set(targets));
	if (!targets.length) return null;
	let pick: HTMLElement;
	if (typeof a.nth === "number") pick = targets[a.nth];
	else {
		const area = (el: HTMLElement) => {
			const r = el.getBoundingClientRect();
			return r.width * r.height;
		};
		pick = targets.sort((x, y) => area(x) - area(y))[0];
	}
	if (!pick) return null;
	const existing = pick.getAttribute("data-shot-mark");
	if (existing) return existing;
	pick.setAttribute("data-shot-mark", a.mark);
	return a.mark;
}

async function resolveLocator(page: Page, t: Target, timeout = 15000): Promise<Locator> {
	if ("css" in t) {
		const loc = page.locator(t.css).nth(t.nth ?? 0);
		await loc.waitFor({ state: "visible", timeout });
		return loc;
	}
	if ("text" in t || "card" in t) {
		const text = await tr("text" in t ? t.text : t.card);
		const closest = "text" in t ? t.closest : 'div[class~="rounded-lg"][class~="border"], div[class~="rounded-xl"][class~="border"]';
		const find = "find" in t ? (t as { find?: string }).find : undefined;
		const nth = "nth" in t ? t.nth : undefined;
		const mark = `m${++markSeq}`;
		const deadline = Date.now() + timeout;
		for (;;) {
			const got = await page.evaluate(findInPage, { text, closest, within: t.within, find, nth, mark });
			if (got) return page.locator(`[data-shot-mark="${got}"]`);
			if (Date.now() > deadline) throw new Error(`Target not found: ${JSON.stringify(t)} (text "${text}")`);
			await page.waitForTimeout(300);
		}
	}
	throw new Error(`Target ${JSON.stringify(t)} cannot be used as a locator`);
}

async function resolveBox(page: Page, t: Target): Promise<Box> {
	if ("clip" in t) return t.clip;
	if ("union" in t) {
		const boxes = await Promise.all(t.union.map((u) => resolveBox(page, u)));
		const x = Math.min(...boxes.map((b) => b.x));
		const y = Math.min(...boxes.map((b) => b.y));
		return {
			x,
			y,
			width: Math.max(...boxes.map((b) => b.x + b.width)) - x,
			height: Math.max(...boxes.map((b) => b.y + b.height)) - y,
		};
	}
	const loc = await resolveLocator(page, t);
	const b = await loc.boundingBox();
	if (!b) throw new Error(`No bounding box for ${JSON.stringify(t)}`);
	return b;
}

// ---------------------------------------------------------------------------
// Safety
// ---------------------------------------------------------------------------
const DANGEROUS_WORDS =
	/\b(save|apply|submit|restart|reboot|shutdown|update now|install|pair|connect|disconnect|delete|remove|unregister|reset|prune|restore|backup|upload|read|arm|disarm|log ?out|validate|clear|start|stop|enable|disable|switch|test|browse|download)\b/i;

async function assertSafeClick(loc: Locator, why: string) {
	const info = await loc.evaluate((el) => ({
		tag: el.tagName.toLowerCase(),
		role: el.getAttribute("role") ?? "",
		type: (el as HTMLInputElement).type ?? "",
		text: (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80),
		aria: el.getAttribute("aria-label") ?? "",
		popup: el.getAttribute("aria-haspopup") ?? "",
		inForm: !!el.closest("form"),
	}));
	const forbiddenRoles = ["switch", "radio", "checkbox", "menuitem", "menuitemradio", "menuitemcheckbox", "option", "slider"];
	if (forbiddenRoles.includes(info.role) || ["checkbox", "radio", "range", "file"].includes(info.type) || (info.type === "submit" && info.inForm)) {
		throw new Error(`Refusing to click ${info.role || info.type} "${info.text}"`);
	}
	const benign = info.role === "tab" || info.role === "combobox" || info.popup !== "";
	if (!benign && DANGEROUS_WORDS.test(`${info.text} ${info.aria}`)) {
		throw new Error(`Refusing to click "${info.text || info.aria}" (${why}): looks like an action`);
	}
}

interface ShotRuntime {
	allowPost: string[];
	mockTrpc: Record<string, unknown> | undefined;
	blocked: string[];
}
const runtime: ShotRuntime = { allowPost: [], mockTrpc: undefined, blocked: [] };

async function installGuards(ctx: BrowserContext) {
	const fontDir = (pkg: string) => path.join(HERE, "node_modules/@fontsource-variable", pkg, "files");
	await ctx.route("**/*", async (route) => {
		const req = route.request();
		const url = req.url();
		const method = req.method();
		if (url.startsWith(ASSET_HOST)) {
			const file = url.slice(ASSET_HOST.length + 1); // e.g. inter/inter-latin-wght-normal.woff2
			const [pkg, name] = file.split("/");
			const p = path.join(fontDir(pkg), path.basename(name));
			if (fs.existsSync(p)) return route.fulfill({ body: fs.readFileSync(p), contentType: "font/woff2", headers: { "access-control-allow-origin": "*" } });
			return route.fulfill({ status: 404 });
		}
		if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
			if (method === "GET" && runtime.mockTrpc && /\/trpc\//.test(url)) return mockTrpc(route, runtime.mockTrpc);
			return route.continue();
		}
		if (method === "POST" && runtime.allowPost.some((s) => url.includes(s))) return route.continue();
		runtime.blocked.push(`${method} ${url.replace(/^https?:\/\/[^/]+/, "")}`);
		return route.abort("blockedbyclient");
	});
	await ctx.routeWebSocket(/.*/, (ws) => {
		const server = ws.connectToServer();
		ws.onMessage((msg) => {
			// socket.io: "42..." = event, "43..." = ack. The UI never needs to send either to render.
			if (typeof msg === "string" && /^4[23]/.test(msg)) {
				runtime.blocked.push(`WS ${msg.slice(0, 60)}`);
				return;
			}
			server.send(msg);
		});
		server.onMessage((msg) => ws.send(msg));
	});
}

/** Replace selected procedures in a tRPC (batched) GET response. */
async function mockTrpc(route: import("playwright").Route, mocks: Record<string, unknown>) {
	const url = new URL(route.request().url());
	const procs = decodeURIComponent(url.pathname.split("/trpc/")[1] ?? "").split(",");
	if (!procs.some((p) => p in mocks)) return route.continue();
	const res = await route.fetch();
	let body: unknown = await res.json().catch(() => null);
	const wrap = (v: unknown) => ({ result: { data: { json: v } } });
	if (Array.isArray(body)) body = body.map((item, i) => (procs[i] in mocks ? wrap(mocks[procs[i]]) : item));
	else if (procs.length === 1) body = wrap(mocks[procs[0]]);
	return route.fulfill({ response: res, json: body });
}

// ---------------------------------------------------------------------------
// Page preparation
// ---------------------------------------------------------------------------
function fontCss(): string {
	if (SYSTEM_FONTS) return "";
	const faces = (pkg: string) =>
		fs
			.readFileSync(path.join(HERE, "node_modules/@fontsource-variable", pkg, "index.css"), "utf8")
			.replaceAll("url(./files/", `url(${ASSET_HOST}/${pkg}/`)
			.replaceAll("font-display: swap", "font-display: block");
	return `${faces("inter")}
${faces("jetbrains-mono")}
html, body, .font-sans { font-family: 'Inter Variable', ui-sans-serif, system-ui, sans-serif, 'Droid Sans Fallback' !important;
  font-feature-settings: 'cv11', 'ss01'; -webkit-font-smoothing: antialiased; }
.font-mono, code, kbd, pre, samp { font-family: 'JetBrains Mono Variable', ui-monospace, monospace !important; }`;
}

const STABLE_CSS = `
*, *::before, *::after { transition-duration: 0s !important; transition-delay: 0s !important; caret-color: transparent !important; }
::-webkit-scrollbar { width: 0 !important; height: 0 !important; display: none !important; }
* { scrollbar-width: none !important; }
div[style*="z-index: 9999"][style*="position: fixed"] { display: none !important; } /* react-hot-toast */
`;

async function newContext(browser: import("playwright").Browser, theme: Theme) {
	const ctx = await browser.newContext({
		viewport: DEFAULT_VIEWPORT,
		deviceScaleFactor: DPR,
		colorScheme: theme,
		locale: "en-US", // Intl needs a valid locale; the UI language comes from i18nextLng below
		timezoneId: "Europe/Oslo",
		reducedMotion: "reduce",
	});
	const appLng = LOCALES[LOCALE].app;
	await ctx.addInitScript(
		({ theme, appLng, css }) => {
			// esbuild (tsx) may wrap serialised functions in __name(); make it a no-op in the page.
			(window as unknown as { __name: (f: unknown) => unknown }).__name = (f) => f;
			try {
				localStorage.setItem("vite-ui-theme", theme);
				localStorage.setItem("theme", theme);
				localStorage.setItem("i18nextLng", appLng);
				localStorage.setItem(
					"tour-storage",
					JSON.stringify({ state: { neverShowTour: true, hasSeenTour: true, isVisible: false, currentStep: 0, currentTour: "" }, version: 0 }),
				);
			} catch {}
			const add = () => {
				const s = document.createElement("style");
				s.setAttribute("data-shot", "");
				s.textContent = css;
				(document.head ?? document.documentElement).appendChild(s);
			};
			if (document.documentElement) add();
			else document.addEventListener("DOMContentLoaded", add);
		},
		{ theme, appLng, css: fontCss() + STABLE_CSS },
	);
	await installGuards(ctx);
	return ctx;
}

async function maskConfig(): Promise<MaskConfig> {
	const literal = process.env.SHOTS_REDACT ? (JSON.parse(process.env.SHOTS_REDACT) as Record<string, string>) : {};
	return {
		// Dev builds report "development"; show the release the docs describe.
		exact: { development: "v6.5.1", "v6.5.0": "v6.5.1" },
		hideText: [
			// Dev device runs on a non-default port, which makes Settings nag; a normal install doesn't.
			await tr("t:application:section.settings.server.port.warning"),
			await tr("t:application:section.settings.server.port.submit"),
		],
		labelled: [
			{
				label: await tr("t:application:section.licence.licenseDetails.fields.registeredName.label"),
				value: "span.font-medium",
				replace: "Alex Morgan",
			},
		],
		literal,
		deny: (process.env.SHOTS_DENY ?? "").split(",").map((s) => s.trim()).filter(Boolean),
		latLabels: [await tr("t:ntrip:gga.manualLat"), await tr("t:flight:missionPlanner.table.headers.latitude")],
		lonLabels: [await tr("t:ntrip:gga.manualLon"), await tr("t:flight:missionPlanner.table.headers.longitude")],
	};
}

async function settle(page: Page, extra: number) {
	await page.evaluate(() => document.fonts.ready.then(() => true));
	// wait (bounded) for spinners, skeletons and "Loading..." placeholders to go away
	await page
		.waitForFunction(
			() => {
				const visible = (el: Element) => {
					const r = el.getBoundingClientRect();
					return r.width > 0 && r.height > 0;
				};
				// spinners, and skeleton blocks (pulsing live-status dots are small and are ignored)
				const busy = Array.from(document.querySelectorAll(".animate-spin, .animate-pulse")).filter((el) => {
					if (!visible(el)) return false;
					if (el.classList.contains("animate-spin")) return true;
					const r = el.getBoundingClientRect();
					return r.width > 24 && r.height > 10;
				});
				const loadingText = /^(Loading\.\.\.|Loading…)$/.test(document.body.innerText.trim());
				return busy.length === 0 && !loadingText;
			},
			undefined,
			{ timeout: 10000, polling: 250 },
		)
		.catch(() => console.warn("    (spinner/skeleton still visible after 10s, continuing)"));
	await page.waitForTimeout(extra);
}

async function runAction(page: Page, a: Action) {
	if ("click" in a) {
		const loc = await resolveLocator(page, a.click);
		await assertSafeClick(loc, a.why);
		await loc.click({ force: a.force });
		await page.waitForTimeout(450);
	} else if ("hover" in a) {
		const loc = await resolveLocator(page, a.hover);
		await loc.hover();
		await page.waitForTimeout(450);
	} else if ("press" in a) {
		if (!/^(Escape|Tab|ArrowDown|ArrowUp)$/.test(a.press)) throw new Error(`Key ${a.press} not allowed`);
		await page.keyboard.press(a.press);
		await page.waitForTimeout(300);
	} else if ("wait" in a) {
		await page.waitForTimeout(a.wait);
	} else if ("waitFor" in a) {
		try {
			await resolveLocator(page, a.waitFor, a.timeout ?? 15000);
		} catch (e) {
			if (!a.optional) throw e;
			console.warn(`    (optional wait not met: ${JSON.stringify(a.waitFor)})`);
		}
	} else if ("scrollTo" in a) {
		const loc = await resolveLocator(page, a.scrollTo);
		await loc.evaluate((el, block) => el.scrollIntoView({ block, inline: "nearest" }), a.block ?? "start");
		await page.waitForTimeout(400);
	}
}

/** Bounds a crop may use: the app's scroll area for in-page content, else the viewport. */
async function cropBounds(page: Page, loc: Locator | null): Promise<Box> {
	const vp = page.viewportSize()!;
	const full = { x: 0, y: 0, width: vp.width, height: vp.height };
	if (!loc) return full;
	const main = await loc.evaluate((el) => {
		const m = el.closest("main");
		if (!m) return null;
		const r = m.getBoundingClientRect();
		return { x: r.x, y: r.y, width: r.width, height: r.height };
	});
	return main ?? full;
}

async function measureTarget(page: Page, shot: Shot, pad: number): Promise<{ clip: Box; box: Box }> {
	const t = shot.target!;
	const isLocator = !("clip" in t) && !("union" in t);
	let loc: Locator | null = isLocator ? await resolveLocator(page, t) : null;
	for (let attempt = 0; attempt < 3; attempt++) {
		if (loc) {
			await loc.evaluate((el, p) => {
				(el as HTMLElement).style.scrollMargin = `${p + 4}px`;
				el.scrollIntoView({ block: "nearest", inline: "nearest" });
			}, pad);
			await page.waitForTimeout(250);
		}
		const box = await resolveBox(page, t);
		const bounds = await cropBounds(page, loc);
		const vp = page.viewportSize()!;
		const needH = box.height + 2 * pad;
		if (loc && needH > bounds.height && attempt < 2) {
			// too tall for the viewport: grow the window like a taller monitor and re-measure
			await page.setViewportSize({ width: vp.width, height: Math.ceil(vp.height + (needH - bounds.height) + 8) });
			await page.waitForTimeout(600);
			if (loc) loc = await resolveLocator(page, t);
			continue;
		}
		const x0 = Math.max(bounds.x, box.x - pad);
		const y0 = Math.max(bounds.y, box.y - pad);
		const x1 = Math.min(bounds.x + bounds.width, box.x + box.width + pad);
		const y1 = Math.min(bounds.y + bounds.height, box.y + box.height + pad);
		return { box, clip: { x: Math.round(x0), y: Math.round(y0), width: Math.round(x1 - x0), height: Math.round(y1 - y0) } };
	}
	throw new Error("could not fit target");
}

async function growToFullPage(page: Page) {
	for (let i = 0; i < 3; i++) {
		const extra = await page.evaluate(() => {
			const all = document.querySelectorAll("main"); // SidebarInset is a <main> too; the inner one scrolls
			const m = all[all.length - 1];
			return m ? m.scrollHeight - m.clientHeight : 0;
		});
		if (extra <= 1) return;
		const vp = page.viewportSize()!;
		await page.setViewportSize({ width: vp.width, height: Math.min(6000, vp.height + extra) });
		await page.waitForTimeout(700);
	}
}

async function drawHighlight(page: Page, t: Target) {
	const box = await resolveBox(page, t);
	await page.evaluate(
		({ box, color }) => {
			const d = document.createElement("div");
			d.setAttribute("data-shot-highlight", "");
			Object.assign(d.style, {
				position: "fixed",
				left: `${box.x - 6}px`,
				top: `${box.y - 6}px`,
				width: `${box.width + 12}px`,
				height: `${box.height + 12}px`,
				border: `2px solid ${color}`,
				borderRadius: "10px",
				boxShadow: `0 0 0 4px ${color}33`,
				pointerEvents: "none",
				zIndex: "2147483647",
			});
			document.body.appendChild(d);
		},
		{ box, color: HIGHLIGHT },
	);
}

// ---------------------------------------------------------------------------
// Capture
// ---------------------------------------------------------------------------
interface Result {
	id: string;
	theme: Theme;
	file: string;
	width: number;
	height: number;
	bytes: number;
}

/** A shot limited to one theme (e.g. the always-dark HUD) is written as the primary file. */
function fileFor(shot: Shot, theme: Theme) {
	const screen = shot.id.replace(/^uavcast-pro\//, "");
	const single = shot.themes?.length === 1;
	return `${screen}${LOCALES[LOCALE].suffix}${theme === "dark" && !single ? ".dark" : ""}.webp`;
}

async function capture(ctx: BrowserContext, shot: Shot, theme: Theme, mask: MaskConfig): Promise<Result> {
	runtime.allowPost = shot.allowPost ?? [];
	runtime.mockTrpc = shot.mockTrpc;
	runtime.blocked = [];
	const page = await ctx.newPage();
	page.on("pageerror", (e) => console.warn(`    pageerror: ${e.message.slice(0, 160)}`));
	try {
		if (shot.viewport) await page.setViewportSize(shot.viewport);
		if (shot.localStorage) {
			await page.addInitScript((entries) => {
				try {
					for (const [k, v] of Object.entries(entries)) localStorage.setItem(k, v);
				} catch {}
			}, shot.localStorage);
		}
		await page.goto(BASE + shot.route, { waitUntil: "domcontentloaded", timeout: 60000 });
		if (shot.css) await page.addStyleTag({ content: shot.css });
		const onNotReady = async (e: unknown) => {
			const snippet = await page.evaluate(() => document.body?.innerText.replace(/\s+/g, " ").slice(0, 160)).catch(() => "");
			throw new Error(`${(e as Error).message.split("\n")[0]} | page shows: "${snippet}"`);
		};
		if (shot.ready) await resolveLocator(page, shot.ready, 45000).catch(onNotReady);
		else
			await page.waitForFunction(
				() => {
					const r = document.querySelector("#root");
					return !!r && (r.textContent ?? "").trim().length > 20 && r.getBoundingClientRect().height > 200;
				},
				undefined,
				{ timeout: 45000, polling: 250 },
			).catch(onNotReady);
		await settle(page, shot.settle ?? 1500);
		await page.mouse.move(shot.mouse?.x ?? DEFAULT_MOUSE.x, shot.mouse?.y ?? DEFAULT_MOUSE.y);
		for (const a of shot.actions ?? []) await runAction(page, a);
		if (!shot.actions?.some((a) => "hover" in a)) {
			await page.mouse.move(shot.mouse?.x ?? DEFAULT_MOUSE.x, shot.mouse?.y ?? DEFAULT_MOUSE.y);
		}
		if (!shot.actions?.length) await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur?.());
		if (shot.fullPage) await growToFullPage(page);

		await page.evaluate(installMasker, mask);
		await page.waitForTimeout(150);

		const pad = shot.padding ?? DEFAULT_PADDING;
		const measured = shot.target ? await measureTarget(page, shot, pad) : null;
		if (shot.highlight) await drawHighlight(page, shot.highlight);

		await page.evaluate(installMasker, mask); // final pass right before the pixels are taken
		const png = await page.screenshot({
			type: "png",
			animations: "disabled",
			caret: "hide",
			scale: "device",
			clip: measured?.clip,
		});
		const findings = await page.evaluate(auditPage, mask);
		if (findings.length) throw new Error(`privacy audit failed: ${findings.join(", ")}`);

		const file = fileFor(shot, theme);
		fs.mkdirSync(RAW, { recursive: true });
		fs.writeFileSync(path.join(RAW, file.replace(/\.webp$/, ".png")), png);
		const webp = await sharp(png).webp({ quality: QUALITY, effort: 6, smartSubsample: true }).toBuffer();
		fs.mkdirSync(OUT, { recursive: true });
		fs.writeFileSync(path.join(OUT, file), webp);
		const meta = await sharp(webp).metadata();
		if (runtime.blocked.length) console.log(`    guard blocked: ${[...new Set(runtime.blocked)].join(" | ")}`);
		return { id: shot.id, theme, file, width: meta.width!, height: meta.height!, bytes: webp.length };
	} finally {
		// navigating away lets the page run its own cleanup (e.g. stop live MAVLink streaming)
		await page.goto("about:blank").catch(() => {});
		await page.close();
	}
}

async function main() {
	const selected = shots.filter((s) => !s.skip && (!ONLY || ONLY.some((o) => s.id.includes(o))));
	if (flag("list")) {
		for (const s of shots) console.log(`${s.skip ? "SKIP " : ""}${s.id.padEnd(58)} ${s.route}`);
		return;
	}
	if (!BASE) throw new Error("Set --base http://<device>:<port> or UAVCAST_URL");
	if (!LOCALES[LOCALE]) throw new Error(`Unknown locale ${LOCALE}`);
	const ids = new Set<string>();
	for (const s of shots) {
		if (!/^uavcast-pro\/[a-z0-9-]+(--[a-z0-9-]+)?$/.test(s.id)) throw new Error(`Bad id ${s.id}`);
		if (ids.has(s.id)) throw new Error(`Duplicate id ${s.id}`);
		ids.add(s.id);
	}

	const mask = await maskConfig();
	const browser = await chromium.launch();
	const results: Result[] = [];
	const failures: string[] = [];
	try {
		for (const theme of THEMES) {
			const ctx = await newContext(browser, theme);
			for (const shot of selected) {
				if (shot.themes && !shot.themes.includes(theme)) continue;
				const label = `${shot.id} [${theme}]`;
				const t0 = Date.now();
				try {
					let r: Result;
					try {
						r = await capture(ctx, shot, theme, mask);
					} catch (first) {
						// one retry for transient slowness on the device; privacy and safety refusals are final
						if (/privacy audit|Refusing/.test((first as Error).message)) throw first;
						console.log(`     retry ${label}: ${(first as Error).message.split("\n")[0]}`);
						r = await capture(ctx, shot, theme, mask);
					}
					results.push(r);
					console.log(`ok   ${label.padEnd(64)} ${r.width}x${r.height} ${(r.bytes / 1024).toFixed(0)} KB ${((Date.now() - t0) / 1000).toFixed(1)}s`);
				} catch (e) {
					failures.push(`${label}: ${(e as Error).message.split("\n")[0]}`);
					console.log(`FAIL ${label}: ${(e as Error).message.split("\n")[0]}`);
				}
			}
			await ctx.close();
		}
	} finally {
		await browser.close();
	}

	// manifest.json (merged, so --only runs update entries in place)
	const manifestPath = path.join(OUT, "manifest.json");
	type Entry = {
		id: string;
		description: string;
		route: string;
		aliases?: string[];
		pages?: string[];
		locales: Record<string, Record<string, { file: string; width: number; height: number; bytes: number; capturedIn?: Theme }>>;
	};
	const prev = fs.existsSync(manifestPath) ? (JSON.parse(fs.readFileSync(manifestPath, "utf8")) as { shots: Entry[] }) : { shots: [] };
	const byId = new Map(prev.shots.map((e) => [e.id, e]));
	for (const r of results) {
		const s = shots.find((x) => x.id === r.id)!;
		const e: Entry = byId.get(r.id) ?? { id: r.id, description: s.description, route: s.route, locales: {} };
		Object.assign(e, { description: s.description, route: s.route, aliases: s.aliases, pages: s.pages });
		e.locales[LOCALE] ??= {};
		const slot = s.themes?.length === 1 ? "light" : r.theme; // primary file slot
		e.locales[LOCALE][slot] = { file: r.file, width: r.width, height: r.height, bytes: r.bytes, ...(slot !== r.theme ? { capturedIn: r.theme } : {}) };
		byId.set(r.id, e);
	}
	const order = new Map(shots.map((s, i) => [s.id, i]));
	const entries = [...byId.values()].filter((e) => order.has(e.id)).sort((a, b) => order.get(a.id)! - order.get(b.id)!);
	const totalBytes = entries.reduce(
		(n, e) => n + Object.values(e.locales).reduce((m, l) => m + Object.values(l).reduce((k, f) => k + f.bytes, 0), 0),
		0,
	);
	fs.writeFileSync(
		manifestPath,
		`${JSON.stringify(
			{
				product: "uavcast-pro",
				generatedAt: new Date().toISOString(),
				generator: "website/scripts/screenshots/uavcast-pro/capture.ts",
				capture: { viewport: DEFAULT_VIEWPORT, deviceScaleFactor: DPR, format: "webp", quality: QUALITY },
				naming: "<screen>[--state][.<locale>][.dark].webp, en has no locale suffix",
				count: entries.length,
				totalBytes,
				shots: entries,
			},
			null,
			2,
		)}\n`,
	);
	console.log(`\n${results.length} images written to ${OUT} (${(totalBytes / 1024 / 1024).toFixed(1)} MB total in manifest)`);
	if (failures.length) {
		console.log(`\n${failures.length} failed:\n  ${failures.join("\n  ")}`);
		process.exitCode = 1;
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
