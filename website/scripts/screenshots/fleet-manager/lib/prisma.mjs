// Runs the Fleet Manager checkout's Prisma CLI with the local env, e.g. `node lib/prisma.mjs migrate deploy`.
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { fmDir, loadEnv } from "./env.mjs";

const cwd = fmDir();
const env = loadEnv();
// Only ever touch a database on this machine: parse the URL and require a loopback host.
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
let dbHost;
try {
	dbHost = new URL(env.DATABASE_URL).hostname.toLowerCase();
} catch {
	throw new Error("Refusing to run: DATABASE_URL is missing or not a valid URL");
}
if (!LOOPBACK_HOSTS.has(dbHost)) throw new Error(`Refusing to run against a non-local database (host "${dbHost}")`);
const r = spawnSync(process.execPath, [join(cwd, "node_modules/prisma/build/index.js"), ...process.argv.slice(2)], {
	cwd,
	env: { ...process.env, ...env },
	stdio: "inherit",
});
process.exit(r.status ?? 1);
