// Runs `next dev` for the Fleet Manager checkout with the local-only env from fm.env.
// Usage: FM_DIR=/path/to/uavmatrix-fleet-manager node start-app.mjs
import { spawn } from "node:child_process";
import { join } from "node:path";
import { fmDir, loadEnv } from "./lib/env.mjs";

const env = { ...process.env, ...loadEnv() };
delete env.NODE_OPTIONS;
// Run Next as a plain dev server: drop coding-agent markers so Next 16 does not switch to
// its agent mode (writing AGENTS.md into the checkout and pausing on upgrade nudges).
for (const k of Object.keys(env)) {
	if (k === "AI_AGENT" || k === "CLAUDECODE" || k.startsWith("CLAUDE_")) delete env[k];
}
const cwd = fmDir();
const child = spawn(
	process.execPath,
	[join(cwd, "node_modules/next/dist/bin/next"), "dev", "-H", "127.0.0.1", "-p", env.PORT ?? "3107"],
	{ cwd, env, stdio: "inherit" },
);
child.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));
