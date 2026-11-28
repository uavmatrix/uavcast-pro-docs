// Simulated UAVcast fleet for the LOCAL docs run. Publishes heartbeats and telemetry for
// every online Nordwind drone to the local MQTT broker exactly like UAVcast does, and
// answers the commands Fleet Manager sends back (signal pings, flight mode, mission,
// terminal). On start it backfills the last 5 minutes of 1 Hz telemetry so the live map
// shows trails immediately.
//
//   FM_DIR=/path/to/uavmatrix-fleet-manager npx tsx simulate.ts
import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import mqtt from "mqtt";
import { fmDir, loadEnv } from "./lib/env.mjs";
import {
	DRONES,
	type DroneDef,
	deviceIdFor,
	groundSpot,
	hostnameFor,
	isOnline,
	machineIdFor,
	SITES,
	sampleAt,
	tailscaleIpFor,
} from "./lib/fleet-data.ts";

const env = loadEnv();
const FM = fmDir();
const require = createRequire(join(FM, "package.json"));
const { PrismaClient } = await import(pathToFileURL(join(FM, "generated/prisma/client.ts")).href);
const { PrismaPg } = require("@prisma/adapter-pg");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: env.DATABASE_URL }) });

const online = DRONES.map((d, index) => ({ d, index, deviceId: deviceIdFor(d) })).filter((x) => isOnline(x.d));
const START = Date.now();
const modeOverride = new Map<string, string>();

// ---- backfill the 5-minute trail window for flying drones
const ids: { id: string; deviceId: string }[] = await prisma.drone.findMany({ select: { id: true, deviceId: true } });
const idByDevice = new Map(ids.map((r) => [r.deviceId, r.id]));
const backfill = [];
for (const { d, deviceId } of online) {
	if (d.state !== "flying") continue;
	const droneId = idByDevice.get(deviceId);
	if (!droneId) continue;
	for (let s = 300; s >= 1; s--) {
		const t = Math.floor((START - s * 1000) / 1000) * 1000;
		const p = sampleAt(d, t);
		backfill.push({
			droneId,
			timestamp: new Date(t),
			latitude: p.lat,
			longitude: p.lon,
			altitude: SITES[d.site].elev + p.alt,
			heading: p.heading,
			speed: p.speed,
			satellites: 17,
			gpsFixType: 3,
			batteryPercent: d.battery,
			batteryVoltage: 22.4,
			isArmed: true,
			flightMode: d.mode,
			services: { mavlink: true, camera: true, vpn: true, dns: true },
		});
	}
}
await prisma.telemetry.createMany({ data: backfill, skipDuplicates: true });
await prisma.$disconnect();
console.log(`[sim] backfilled ${backfill.length} trail points`);

// ---- MQTT
const client = mqtt.connect(env.MQTT_BROKER_URL, { clientId: `docs-sim-${process.pid}` });
await new Promise<void>((res) => client.on("connect", () => res()));
client.subscribe(["uavcast/drone/+/commands", "uavcast/drone/+/terminal"]);
console.log(`[sim] connected, simulating ${online.length} online UAVs`);

const pub = (topic: string, msg: unknown) => client.publish(topic, JSON.stringify(msg), { qos: 0 });

function heartbeat(d: DroneDef, index: number, deviceId: string) {
	const t = (Date.now() - START) / 1000;
	const jetson = d.hw.startsWith("Jetson");
	const busy = d.state === "flying";
	pub(`uavcast/drone/${deviceId}/heartbeat`, {
		timestamp: Date.now(),
		deviceId,
		name: d.name,
		hostname: hostnameFor(d),
		status: "online",
		uptime: 3600 * (2 + (index % 9)) + 137 * index + Math.floor(t),
		services: { mavlink: true, camera: true, dns: true, api: true, vpn: d.vpn !== false },
		system: {
			cpuTemp: +((jetson ? 51 : 56) + (busy ? 6 : 0) + Math.sin(t / 9 + index) * 1.5).toFixed(1),
			cpuUsage: +((busy ? 34 : 9) + ((index * 7) % 13) + Math.sin(t / 5 + index) * 3).toFixed(1),
			memoryUsage: +((jetson ? 41 : 28) + ((index * 3) % 9)).toFixed(1),
			diskUsage: +(18 + ((index * 11) % 37)).toFixed(1),
		},
		network: {
			localIp: `192.168.${10 + (index % 5)}.${40 + index}`,
			...(d.vpn !== false && { tailscaleIp: tailscaleIpFor(index), tailscaleMachineId: machineIdFor(index) }),
		},
		version: d.version,
	});
}

function telemetry(d: DroneDef, deviceId: string) {
	const now = Date.now();
	const flying = d.state === "flying";
	const site = SITES[d.site];
	const p = flying ? sampleAt(d, now) : { ...groundSpot(d), alt: 0, speed: 0 };
	const home = groundSpot(d);
	const mode = modeOverride.get(deviceId) ?? d.mode;
	const cells = d.mavType === 2 ? 4 : 6;
	pub(`uavcast/drone/${deviceId}/telemetry`, {
		timestamp: now,
		deviceId,
		gps: { lat: p.lat, lon: p.lon, alt: site.elev + p.alt, satellites: d.gps === "weak" ? 5 : 16 + (deviceId.charCodeAt(0) % 6), fix: d.gps === "weak" ? 2 : 3 },
		battery: { percent: d.battery, voltage: +(cells * (3.5 + (d.battery / 100) * 0.7)).toFixed(2) },
		heartbeat: { armed: flying, mode, connected: true, failsafe: false, // The lite view reads gcsFailsafeEnabled as "failsafe triggered", so keep it off for
			// Survey-01 (used for the lite-view shot) and on for the rest (control panel shows the chip).
			gcsFailsafeEnabled: d.name !== "Survey-01" },
		vehicle: { type: d.mavType === 1 ? "Fixed Wing" : d.mavType === 20 ? "VTOL" : d.mavType === 13 ? "Hexarotor" : "Quadrotor", typeId: d.mavType },
		attitude: {
			heading: p.heading,
			roll: flying ? Math.sin(now / 1500) * 0.08 : 0,
			pitch: flying ? -0.05 : 0,
			yaw: (p.heading * Math.PI) / 180,
			groundSpeed: flying ? p.speed : 0,
			altitude: flying ? p.alt : 0,
		},
		services: { mavlink: true, camera: true, vpn: d.vpn !== false, dns: true },
		...(flying && mode === "AUTO" && { mission: { current: 7 + (Math.floor(now / 20000) % 11), total: 24, seq: 7 + (Math.floor(now / 20000) % 11) } }),
		...(flying && { homePosition: { lat: home.lat, lon: home.lon, alt: site.elev } }),
	});
}

// heartbeats every 2 s, telemetry at 2 Hz
setInterval(() => online.forEach(({ d, index, deviceId }) => heartbeat(d, index, deviceId)), 2000);
setInterval(() => online.forEach(({ d, deviceId }) => !d.noMavlink && telemetry(d, deviceId)), 500);
online.forEach(({ d, index, deviceId }) => heartbeat(d, index, deviceId));

// ---- answer commands
const shell: Record<string, string> = {
	"df -h": `Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p1  117G   21G   91G  19% /
tmpfs           3.8G     0  3.8G   0% /dev/shm
/dev/nvme0n1p2  1.0G  118M  906M  12% /boot/firmware
/dev/sda1        58G   12G   46G  21% /media/recordings`,
	"free -h": `               total        used        free      shared  buff/cache   available
Mem:           7.6Gi       2.2Gi       3.9Gi        41Mi       1.6Gi       5.4Gi
Swap:          2.0Gi          0B       2.0Gi`,
	uptime: " 10:42:17 up 3:18,  1 user,  load average: 0.84, 0.77, 0.69",
	"ip r": `default via 10.48.0.1 dev wwan0 proto dhcp src 10.48.17.203 metric 700
10.48.0.0/16 dev wwan0 proto kernel scope link src 10.48.17.203 metric 700
100.64.0.0/10 dev tailscale0 scope link
192.168.10.0/24 dev eth0 proto kernel scope link src 192.168.10.40 metric 100`,
	"systemctl status uavcast-camera --no-pager": `● uavcast-camera.service - UAVcast camera pipeline
     Loaded: loaded (/etc/systemd/system/uavcast-camera.service; enabled)
     Active: active (running) since Fri 2026-11-28 07:24:02 UTC; 3h 18min ago
   Main PID: 1187 (uavcast-camera)
      Tasks: 23 (limit: 9284)
     Memory: 184.2M
        CPU: 41min 12.330s`,
};
const sessions = new Map<string, { deviceId: string; host: string; line: string }>();
const out = (deviceId: string, sessionId: string, text: string) =>
	pub(`uavcast/drone/${deviceId}/terminal/output`, { type: "output", payload: { sessionId, data: Buffer.from(text).toString("base64") } });

client.on("message", (topic, buf) => {
	const deviceId = topic.split("/")[2];
	const drone = online.find((o) => o.deviceId === deviceId);
	if (!drone) return;
	let msg: Record<string, any>;
	try {
		msg = JSON.parse(buf.toString());
	} catch {
		return;
	}
	if (topic.endsWith("/commands")) {
		if (msg.type === "drone" && msg.action === "set_flight_mode" && msg.payload?.mode) modeOverride.set(deviceId, String(msg.payload.mode));
		setTimeout(
			() => pub(`uavcast/drone/${deviceId}/commands/ack`, { commandId: msg.id, status: "success", message: "OK", timestamp: Date.now() }),
			msg.action === "ping" ? 40 + Math.random() * 50 : 300,
		);
		return;
	}
	// terminal
	const host = hostnameFor(drone.d);
	const prompt = `\x1b[1;32muavcast@${host}\x1b[0m:\x1b[1;34m~\x1b[0m$ `;
	if (msg.action === "start") {
		sessions.set(msg.sessionId, { deviceId, host, line: "" });
		out(deviceId, msg.sessionId, `Linux ${host} 6.6.51-v8+ #1 SMP PREEMPT aarch64\r\n\r\nLast login: Fri Nov 28 07:31:44 2026 from 100.64.0.11\r\n${prompt}`);
	} else if (msg.action === "input") {
		const s = sessions.get(msg.sessionId);
		if (!s) return;
		const data = Buffer.from(msg.data, "base64").toString();
		for (const ch of data) {
			if (ch === "\r" || ch === "\n") {
				const cmd = s.line.trim();
				s.line = "";
				const key = Object.keys(shell).find((k) => cmd.startsWith(k));
				const body = key ? shell[key] : cmd ? `${cmd}: ok` : "";
				out(deviceId, msg.sessionId, `\r\n${body.replace(/\n/g, "\r\n")}${body ? "\r\n" : ""}${prompt}`);
			} else {
				s.line += ch;
				out(deviceId, msg.sessionId, ch);
			}
		}
	}
});

for (const sig of ["SIGINT", "SIGTERM"]) {
	process.on(sig, () => {
		// Go offline cleanly so the next run starts from a known state
		online.forEach(({ d, deviceId }) =>
			client.publish(`uavcast/drone/${deviceId}/heartbeat`, JSON.stringify({ timestamp: Date.now(), deviceId, name: d.name, status: "offline" })),
		);
		setTimeout(() => process.exit(0), 300);
	});
}
