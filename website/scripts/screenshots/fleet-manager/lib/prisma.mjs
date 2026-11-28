// Runs the Fleet Manager checkout's Prisma CLI with the local env, e.g. `node lib/prisma.mjs migrate deploy`.
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { fmDir, loadEnv } from "./env.mjs";

const cwd = fmDir();
const env = loadEnv();
if (!/127\.0\.0\.1|localhost/.test(env.DATABASE_URL)) throw new Error("Refusing to run against a non-local database");
const r = spawnSync(process.execPath, [join(cwd, "node_modules/prisma/build/index.js"), ...process.argv.slice(2)], {
	cwd,
	env: { ...process.env, ...env },
	stdio: "inherit",
});
process.exit(r.status ?? 1);
