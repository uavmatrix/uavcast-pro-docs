// Dev helper: tiles raw PNGs into contact sheets (raw/sheets/sheet-N.png) for quick review.
//   npx tsx contact-sheet.ts [filter-substring]
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { SCRIPTS_DIR } from "./lib/env.mjs";

const dir = join(SCRIPTS_DIR, "raw/fleet-manager");
const filter = process.argv[2] ?? "";
const files = readdirSync(dir).filter((f) => f.endsWith(".png") && f.includes(filter)).sort();
const W = 960, H = 600, COLS = 2, ROWS = 3, LABEL = 28;
mkdirSync(join(SCRIPTS_DIR, "raw/sheets"), { recursive: true });
for (let s = 0; s * COLS * ROWS < files.length; s++) {
	const batch = files.slice(s * COLS * ROWS, (s + 1) * COLS * ROWS);
	const composites = [];
	for (const [i, f] of batch.entries()) {
		const x = (i % COLS) * W, y = Math.floor(i / COLS) * (H + LABEL);
		const img = await sharp(join(dir, f)).resize(W, H, { fit: "contain", background: "#ddd" }).png().toBuffer();
		const label = Buffer.from(`<svg width="${W}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/><text x="8" y="20" font-size="18" fill="#fff" font-family="sans-serif">${f}</text></svg>`);
		composites.push({ input: label, left: x, top: y }, { input: img, left: x, top: y + LABEL });
	}
	const out = join(SCRIPTS_DIR, `raw/sheets/sheet-${s + 1}.png`);
	await sharp({ create: { width: W * COLS, height: (H + LABEL) * ROWS, channels: 3, background: "#fff" } }).composite(composites).png().toFile(out);
	console.log(out, batch.join(", "));
}
