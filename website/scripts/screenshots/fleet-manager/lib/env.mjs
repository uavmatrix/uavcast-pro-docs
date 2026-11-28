// Loads fm.env (local-only settings) into a plain object.
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const SCRIPTS_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function loadEnv() {
	const out = {};
	for (const line of readFileSync(join(SCRIPTS_DIR, "fm.env"), "utf8").split("\n")) {
		const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
		if (m) out[m[1]] = m[2];
	}
	return out;
}

/** Path to the uavmatrix-fleet-manager checkout to run. Override with FM_DIR. */
export function fmDir() {
	return process.env.FM_DIR ?? "/home/sinamics/core/uavmatrix-fleet-manager";
}
