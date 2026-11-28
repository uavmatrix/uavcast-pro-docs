/**
 * Privacy and cosmetic rewriting, done in the DOM before every capture so the
 * screenshots keep looking real (no blur boxes) but never show anything that
 * identifies the device, its owner or the network it sits on.
 *
 * Everything here runs inside the page (it is serialised by page.evaluate), so
 * the functions below must be self-contained: no imports, no closures.
 */

export interface MaskConfig {
	/** Exact text nodes to replace (cosmetic, e.g. dev build version strings). */
	exact: Record<string, string>;
	/** Elements whose trimmed text equals one of these get `display:none`. */
	hideText: string[];
	/**
	 * Value next to a label: find the element whose text equals `label`, then
	 * replace the text of the first element in its parent matching `value`.
	 */
	labelled: { label: string; value: string; replace: string }[];
	/** Extra literal replacements, from SHOTS_REDACT (local only, never committed). */
	literal: Record<string, string>;
	/** Strings that must never appear in a capture (SHOTS_DENY, local only). */
	deny: string[];
	/** Field labels (already translated) that hold a latitude / longitude. */
	latLabels: string[];
	lonLabels: string[];
}

/**
 * Demo position used instead of any real coordinate: ArduPilot SITL's default
 * home (CMAC, Canberra), which readers who know ArduPilot will recognise.
 */
export const DEMO_LAT = "-35.363261";
export const DEMO_LON = "149.165230";

/** Installs the masker (idempotent) and runs one pass. Returns nothing. */
export function installMasker(cfg: MaskConfig): void {
	const w = window as unknown as {
		__shotMask?: { cfg: MaskConfig; run: () => void; observer: MutationObserver };
	};

	const PRIVATE_10 = /^10\./;
	const isDocRange = (ip: string) =>
		/^(192\.0\.2|198\.51\.100|203\.0\.113)\./.test(ip);
	const isPrivate = (ip: string) =>
		/^(10\.|127\.|0\.|169\.254\.|192\.168\.|255\.)/.test(ip) ||
		/^172\.(1[6-9]|2\d|3[01])\./.test(ip);
	const isCgnat = (ip: string) => /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(ip);
	const hash = (s: string) => {
		let h = 7;
		for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
		return h;
	};
	const EMAIL_ALLOW = /@(uavmatrix\.com|example\.com|example\.org)$/i;

	const rewrite = (input: string): string => {
		let s = input;
		if (!s || !/[\w@#]/.test(s)) return s;
		const c = w.__shotMask?.cfg ?? cfg;

		for (const [from, to] of Object.entries(c.literal)) {
			if (from && s.includes(from)) s = s.split(from).join(to);
		}
		// MAC addresses -> locally administered placeholder
		s = s.replace(/\b(?:[0-9a-f]{2}[:-]){5}[0-9a-f]{2}\b/gi, (m) => {
			const n = hash(m) % 250;
			return `02:42:ac:11:00:${n.toString(16).padStart(2, "0")}`;
		});
		// IPv4
		s = s.replace(/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g, (ip) => {
			if (isDocRange(ip)) return ip;
			const last = ip.split(".")[3];
			if (PRIVATE_10.test(ip)) return `192.168.1.${last}`; // neutral home/lab range
			if (isPrivate(ip)) return ip;
			if (isCgnat(ip)) return `100.64.0.${last}`; // Tailscale / CGNAT
			return `203.0.113.${(hash(ip) % 253) + 1}`; // RFC 5737 documentation range
		});
		// IPv6 (full or compressed with ::), except documentation prefix and loopback
		s = s.replace(
			/(?<![\w:])(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}(?![\w:])|(?<![\w:])(?:[0-9a-f]{1,4}:){1,6}:(?:[0-9a-f]{1,4}(?::[0-9a-f]{1,4}){0,5})?(?![\w:])/gi,
			(ip) => (/^2001:db8:/i.test(ip) || ip === "::1" ? ip : `2001:db8::${(hash(ip) % 0xfff).toString(16)}`),
		);
		// Coordinate pairs "lat, lon" with 4+ decimals -> demo position
		s = s.replace(/-?\d{1,3}\.\d{4,}\s*,\s*-?\d{1,3}\.\d{4,}/g, "-35.363261, 149.165230");
		// Key/value coordinates in MAVLink payloads and logs: lat: 58.12 / "lon": 81234567 / latitude=...
		s = s.replace(
			/(["']?\b(lat|latitude|lon|lng|longitude)\b["']?\s*[:=]\s*)(-?\d+(?:\.\d+)?)/gi,
			(_m, pre: string, key: string, val: string) => {
				if (/^-?0(\.0+)?$/.test(val)) return `${pre}${val}`; // no fix: keep the honest zero
				const isLat = /^lat/i.test(key);
				const asInt = !val.includes(".") && Math.abs(Number(val)) > 1000; // degE7 integers
				const demo = isLat ? (asInt ? "-353632610" : "-35.363261") : asInt ? "1491652300" : "149.165230";
				return `${pre}${demo}`;
			},
		);
		// E-mail addresses (company support addresses may stay)
		s = s.replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, (m) => (EMAIL_ALLOW.test(m) ? m : "pilot@example.com"));
		// License key as shown by the app (all but the last 8 chars masked with #)
		s = s.replace(/(#{4,})[A-Za-z0-9]{8}\b/g, (_m, hashes: string) => `${hashes}A7K2Q9XD`);
		// Tailscale auth keys
		s = s.replace(/\btskey-[a-z]+-[A-Za-z0-9-]+/g, "tskey-auth-kDEMO1CNTRL-0000000000000000");
		// UUIDs
		s = s.replace(
			/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
			"3f2b8c1e-5a7d-4c9e-9b1a-2d6f0e8a4c71",
		);
		// 16-hex ids (ZeroTier network ids, Pi serials) -> ZeroTier's own docs example id
		s = s.replace(/\b(?=[0-9a-f]*[a-f])[0-9a-f]{16}\b/gi, "8056c2e21c000001");
		// 10-hex ZeroTier node ids (must contain a letter so plain numbers survive)
		s = s.replace(/\b(?=[0-9a-f]*[a-f])(?=[0-9a-f]*\d)[0-9a-f]{10}\b/gi, "a1b2c3d4e5");
		// IMEI / ICCID / IMSI style long digit runs
		s = s.replace(/\b\d{15,20}\b/g, (m) => (m.length === 15 ? "356938035643809" : `8947${"0".repeat(m.length - 4)}`));
		// Phone numbers in international format
		s = s.replace(/\+\d{8,15}\b/g, "+47 400 00 000");
		// Long opaque tokens (API keys, JWT parts). Paths never match: "/" is not in the class.
		s = s.replace(/\b(?=[A-Za-z0-9_-]{28,}\b)(?=[A-Za-z0-9_-]*\d)(?=[A-Za-z0-9_-]*[A-Za-z])[A-Za-z0-9_-]{28,}\b/g, (m) =>
			m.includes("DEMO") ? m : `${m.slice(0, 4)}${"x".repeat(Math.min(m.length, 40) - 4)}`,
		);
		return s;
	};

	const run = () => {
		const c = w.__shotMask?.cfg ?? cfg;
		const root = document.body;
		if (!root) return;
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
		for (let n = walker.nextNode(); n; n = walker.nextNode()) {
			const t = n.nodeValue ?? "";
			const trimmed = t.trim();
			if (trimmed && c.exact[trimmed] !== undefined) {
				n.nodeValue = t.replace(trimmed, c.exact[trimmed]);
				continue;
			}
			const r = rewrite(t);
			if (r !== t) n.nodeValue = r;
		}
		const labelOf = (el: HTMLElement) => {
			let p: HTMLElement | null = el.parentElement;
			for (let i = 0; i < 3 && p; i++, p = p.parentElement) {
				const l = p.querySelector("label");
				if (l) return (l.textContent ?? "").trim();
			}
			return "";
		};
		for (const el of Array.from(document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea"))) {
			if (el.type === "password" || el.type === "hidden") continue;
			if (/^-?\d{1,3}\.\d+$/.test(el.value.trim())) {
				const lab = labelOf(el);
				const coord = c.latLabels.includes(lab) ? "-35.363261" : c.lonLabels.includes(lab) ? "149.165230" : null;
				if (coord && el.value !== coord) {
					el.value = coord;
					el.setAttribute("value", coord);
					continue;
				}
			}
			const v = el.value;
			const r = rewrite(v);
			if (r !== v) {
				el.value = r;
				el.setAttribute("value", r);
			}
		}
		for (const table of Array.from(document.querySelectorAll("table"))) {
			const heads = Array.from(table.querySelectorAll("thead th, thead td")).map((h) => (h.textContent ?? "").trim());
			heads.forEach((h, col) => {
				const demo = c.latLabels.includes(h) ? "-35.363261" : c.lonLabels.includes(h) ? "149.165230" : null;
				if (!demo) return;
				for (const row of Array.from(table.querySelectorAll("tbody tr"))) {
					const cell = row.children[col] as HTMLElement | undefined;
					if (!cell) continue;
					const inp = cell.querySelector("input");
					if (inp && /^-?\d+\.\d+$/.test(inp.value) && inp.value !== demo) {
						inp.value = demo;
						inp.setAttribute("value", demo);
					} else if (!inp && /^-?\d+\.\d+$/.test((cell.textContent ?? "").trim()) && cell.textContent !== demo) {
						cell.textContent = demo;
					}
				}
			});
		}
		if (c.hideText.length || c.labelled.length) {
			const all = Array.from(document.body.querySelectorAll<HTMLElement>("p, span, div, label, button, td, dd, dt, h1, h2, h3, h4"));
			for (const el of all) {
				const txt = el.textContent?.trim() ?? "";
				if (!txt || txt.length > 200) continue;
				if (c.hideText.includes(txt) && el.children.length === 0) el.style.setProperty("display", "none", "important");
				for (const rule of c.labelled) {
					if (txt === rule.label && el.children.length === 0) {
						const target = el.parentElement?.querySelector<HTMLElement>(rule.value);
						if (target && target !== el && target.textContent !== rule.replace) target.textContent = rule.replace;
					}
				}
			}
		}
	};

	if (w.__shotMask) {
		w.__shotMask.cfg = cfg;
		w.__shotMask.run();
		return;
	}
	let scheduled = false;
	const observer = new MutationObserver(() => {
		if (scheduled) return;
		scheduled = true;
		queueMicrotask(() => {
			scheduled = false;
			observer.disconnect();
			try {
				run();
			} finally {
				observer.observe(document.body, { subtree: true, childList: true, characterData: true });
			}
		});
	});
	w.__shotMask = { cfg, run, observer };
	run();
	observer.observe(document.body, { subtree: true, childList: true, characterData: true });
}

/** Scans what is on screen for anything that slipped through. Returns findings. */
export function auditPage(cfg: MaskConfig): string[] {
	const findings: string[] = [];
	const texts: string[] = [];
	const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	for (let n = walker.nextNode(); n; n = walker.nextNode()) {
		const el = n.parentElement;
		if (!el) continue;
		const cs = getComputedStyle(el);
		if (cs.display === "none" || cs.visibility === "hidden") continue;
		texts.push(n.nodeValue ?? "");
	}
	for (const el of Array.from(document.querySelectorAll<HTMLInputElement>("input, textarea"))) {
		if (el.type !== "password" && el.type !== "hidden") texts.push(el.value);
	}
	const all = texts.join("\n");
	const ipv4 = all.match(/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g) ?? [];
	for (const ip of ipv4) {
		const ok =
			/^(192\.168\.|127\.|0\.|169\.254\.|255\.|192\.0\.2\.|198\.51\.100\.|203\.0\.113\.|100\.64\.0\.)/.test(ip) ||
			/^172\.(1[6-9]|2\d|3[01])\./.test(ip);
		if (!ok) findings.push(`ip:${ip}`);
	}
	for (const m of all.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) ?? []) {
		if (!/@(uavmatrix\.com|example\.com|example\.org)$/i.test(m)) findings.push(`email:${m}`);
	}
	for (const m of all.match(/#{4,}[A-Za-z0-9]{8}\b/g) ?? []) {
		if (!m.endsWith("A7K2Q9XD")) findings.push(`license:${m.slice(-8)}`);
	}
	for (const m of all.match(/-?\d{1,3}\.\d{4,}\s*,\s*-?\d{1,3}\.\d{4,}/g) ?? []) {
		if (!m.startsWith("-35.363261")) findings.push("coordinate-pair");
	}
	for (const m of all.matchAll(/["']?\b(lat|latitude|lon|lng|longitude)\b["']?\s*[:=]\s*(-?\d+(?:\.\d+)?)/gi)) {
		if (!/^(-?0(\.0+)?|-35\.363261|149\.165230|-353632610|1491652300)$/.test(m[2])) findings.push(`coordinate:${m[1]}`);
	}
	for (const d of cfg.deny) if (d && all.toLowerCase().includes(d.toLowerCase())) findings.push(`deny:${d}`);
	return findings;
}
