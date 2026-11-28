// Minimal local stand-in for the Headscale v0.23 REST API, so the Network page renders
// the seeded VPN devices without a real Headscale/Tailscale control server.
// Serves the nodes written by seed.ts to .state/headscale-nodes.json.
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const statePath = join(here, ".state", "headscale-nodes.json");
const port = Number(process.env.MOCK_HEADSCALE_PORT ?? 18085);

function load() {
	try {
		return JSON.parse(readFileSync(statePath, "utf8"));
	} catch {
		return { users: [], nodes: [], preAuthKeys: [] };
	}
}

function send(res, status, body) {
	res.writeHead(status, { "content-type": "application/json" });
	res.end(JSON.stringify(body));
}

createServer((req, res) => {
	const url = new URL(req.url ?? "/", `http://127.0.0.1:${port}`);
	const state = load();
	const p = url.pathname;
	if (p === "/health") return send(res, 200, { databaseConnectivity: true });
	if (p === "/api/v1/user" && req.method === "GET") return send(res, 200, { users: state.users });
	if (p === "/api/v1/user" && req.method === "POST")
		return send(res, 200, { user: state.users[0] ?? { id: "1", name: "org", createdAt: new Date().toISOString() } });
	if (p.startsWith("/api/v1/user/")) return send(res, 200, { user: state.users[0] });
	if (p === "/api/v1/node" && req.method === "GET") {
		const user = url.searchParams.get("user");
		const nodes = user ? state.nodes.filter((n) => n.user?.name === user) : state.nodes;
		return send(res, 200, { nodes });
	}
	const nodeMatch = p.match(/^\/api\/v1\/node\/([^/]+)/);
	if (nodeMatch) {
		const node = state.nodes.find((n) => n.id === nodeMatch[1]);
		return send(res, node ? 200 : 404, node ? { node } : { message: "not found" });
	}
	if (p === "/api/v1/preauthkey" && req.method === "GET") return send(res, 200, { preAuthKeys: state.preAuthKeys });
	if (p === "/api/v1/preauthkey" && req.method === "POST") return send(res, 200, { preAuthKey: state.preAuthKeys[0] });
	if (p === "/api/v1/preauthkey/expire") return send(res, 200, {});
	if (p === "/api/v1/routes") return send(res, 200, { routes: [] });
	return send(res, 200, {});
}).listen(port, "127.0.0.1", () => {
	console.log(`[mock-headscale] listening on http://127.0.0.1:${port}`);
});
