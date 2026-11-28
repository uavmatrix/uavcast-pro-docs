// Playwright helpers shared by capture.ts: authenticated contexts, clean-UI CSS,
// readiness waits (skeletons, spinners, Leaflet tiles) and a Leaflet map handle.
import { createHmac } from "node:crypto";
import type { Browser, BrowserContext, Page } from "playwright";

export const VIEWPORT = { width: 1440, height: 900 };
export const DPR = 2;

export function sessionCookie(token: string, secret: string) {
	const sig = createHmac("sha256", secret).update(token).digest("base64");
	return encodeURIComponent(`${token}.${sig}`);
}

export interface CtxOptions {
	baseUrl: string;
	token?: string;
	secret: string;
	theme: "light" | "dark";
	orgId?: string;
	localStorage?: Record<string, string>;
	viewport?: { width: number; height: number };
	isMobile?: boolean;
}

export async function newContext(browser: Browser, o: CtxOptions): Promise<BrowserContext> {
	const ctx = await browser.newContext({
		viewport: o.viewport ?? VIEWPORT,
		deviceScaleFactor: DPR,
		colorScheme: o.theme,
		reducedMotion: "reduce",
		locale: "en-US",
		timezoneId: "Europe/Oslo",
		isMobile: o.isMobile ?? false,
		hasTouch: o.isMobile ?? false,
	});
	const url = new URL(o.baseUrl);
	const cookies = [{ name: "sidebar_state", value: "true", domain: url.hostname, path: "/" }];
	if (o.token) cookies.push({ name: "better-auth.session_token", value: sessionCookie(o.token, o.secret), domain: url.hostname, path: "/" });
	if (o.orgId) cookies.push({ name: "fleet-manager-current-org", value: o.orgId, domain: url.hostname, path: "/" });
	await ctx.addCookies(cookies.map((c) => ({ ...c, httpOnly: false, secure: false, sameSite: "Lax" as const })));
	const ls = { theme: o.theme, ...(o.localStorage ?? {}) };
	// Plain-string init script (tsx would inject helpers into a serialized function)
	await ctx.addInitScript(`
		try { const ls = ${JSON.stringify(ls)}; for (const k in ls) localStorage.setItem(k, ls[k]); } catch (e) {}
		// Expose every Leaflet map instance as window.__maps (Leaflet's UMD build sets window.L)
		(function () {
			var _L; window.__maps = [];
			Object.defineProperty(window, "L", { configurable: true, get: function () { return _L; },
				set: function (v) { _L = v; try { v.Map.addInitHook(function () { window.__maps.push(this); }); } catch (e) {} } });
		})();
	`);
	return ctx;
}

/** CSS injected before every capture: hides the cursor, toasts, the Next dev badge and caret. */
export const CLEAN_CSS = `
  *, *::before, *::after { transition: none !important; animation-duration: 0s !important; animation-delay: 0s !important; caret-color: transparent !important; }
  nextjs-portal, [data-nextjs-toast], #__next-build-watcher { display: none !important; }
  html, body { cursor: none !important; scrollbar-width: none; }
  ::-webkit-scrollbar { display: none; }
`;
export const HIDE_TOASTS_CSS = `[data-sonner-toaster] { display: none !important; }`;

export async function settle(page: Page, opts: { tiles?: boolean; extraMs?: number } = {}) {
	await page.waitForLoadState("domcontentloaded");
	await page.waitForLoadState("load").catch(() => {});
	// skeletons / spinners gone
	await page
		.waitForFunction(
			() =>
				!document.querySelector('[data-slot="skeleton"]') &&
				!Array.from(document.querySelectorAll(".animate-spin")).some((el) => (el as HTMLElement).offsetParent !== null),
			undefined,
			{ timeout: 20_000 },
		)
		.catch(() => console.warn("  ! skeleton/spinner still visible"));
	if (opts.tiles) await waitTiles(page);
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(opts.extraMs ?? 400);
}

export async function waitTiles(page: Page, timeout = 45_000) {
	await page
		.waitForFunction(
			() => {
				const tiles = Array.from(document.querySelectorAll<HTMLImageElement>("img.leaflet-tile"));
				if (tiles.length === 0) return false;
				return tiles.every((t) => t.complete && t.naturalWidth > 0) && !document.querySelector(".leaflet-tile-loading");
			},
			undefined,
			{ timeout, polling: 250 },
		)
		.catch(() => console.warn("  ! map tiles not fully loaded"));
}

/** Set the view of the first Leaflet map on the page (no animation). */
export async function mapView(page: Page, lat: number, lon: number, zoom: number) {
	await page.waitForFunction(() => (window as any).__maps?.length > 0, undefined, { timeout: 20_000 });
	await page.evaluate(
		({ lat, lon, zoom }) => {
			const maps = (window as any).__maps;
			maps[maps.length - 1].setView([lat, lon], zoom, { animate: false });
		},
		{ lat, lon, zoom },
	);
}
