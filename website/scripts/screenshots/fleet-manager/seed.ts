// Seeds a LOCAL Fleet Manager database with the fictional "Nordwind Aerial Services" fleet.
// Uses the app's own generated Prisma client, so rows match the real models exactly.
// Also creates a tiny local stand-in for the Store license tables (database "store" in the
// same throwaway container) so the pairing wizard's license checks behave like production.
//
//   FM_DIR=/path/to/uavmatrix-fleet-manager npx tsx seed.ts
//
// Everything is fictional; all e-mail addresses use example.com.
import { createHash, randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { fmDir, loadEnv, SCRIPTS_DIR } from "./lib/env.mjs";
import {
	DRONES,
	type DroneDef,
	deviceIdFor,
	groundSpot,
	hostnameFor,
	isOnline,
	machineIdFor,
	rng,
	SITES,
	sampleAt,
	tailscaleIpFor,
	VEHICLE_TYPE,
} from "./lib/fleet-data.ts";

const env = loadEnv();
Object.assign(process.env, env);
const FM = fmDir();
const require = createRequire(join(FM, "package.json"));

const { PrismaClient } = await import(pathToFileURL(join(FM, "generated/prisma/client.ts")).href);
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");

if (!/127\.0\.0\.1|localhost/.test(env.DATABASE_URL)) {
	throw new Error(`Refusing to seed a non-local database: ${env.DATABASE_URL}`);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: env.DATABASE_URL }) });
const R = rng(20261128);
const NOW = Date.now();
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const ago = (ms: number) => new Date(NOW - ms);
const pick = <T>(a: T[]) => a[Math.floor(R() * a.length)];

// ---------------------------------------------------------------------------------------
// 0. Reset
// ---------------------------------------------------------------------------------------
const tables: { tablename: string }[] = await prisma.$queryRawUnsafe(
	`SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename <> '_prisma_migrations'`,
);
await prisma.$executeRawUnsafe(
	`TRUNCATE ${tables.map((t) => `"${t.tablename}"`).join(", ")} RESTART IDENTITY CASCADE`,
);

// ---------------------------------------------------------------------------------------
// 1. People
// ---------------------------------------------------------------------------------------
type U = { key: string; first: string; last: string; role: "OWNER" | "ADMIN" | "VIEWER"; title: string; seenMin: number };
const PEOPLE: U[] = [
	{ key: "owner", first: "Ingrid", last: "Halvorsen", role: "OWNER", title: "Head of Flight Operations", seenMin: 0 },
	{ key: "lars", first: "Lars", last: "Mikkelsen", role: "ADMIN", title: "Chief Pilot, Norway", seenMin: 3 },
	{ key: "sanne", first: "Sanne", last: "de Vries", role: "ADMIN", title: "Ops Lead, Rotterdam", seenMin: 1 },
	{ key: "marcus", first: "Marcus", last: "Reyes", role: "ADMIN", title: "Ops Lead, Permian", seenMin: 6 },
	{ key: "elise", first: "Elise", last: "Brekke", role: "ADMIN", title: "Fleet Engineer", seenMin: 42 },
	{ key: "tomasz", first: "Tomasz", last: "Nowak", role: "VIEWER", title: "Remote Pilot", seenMin: 9 },
	{ key: "aisha", first: "Aisha", last: "Karimi", role: "VIEWER", title: "Data Analyst", seenMin: 120 },
	{ key: "jonas", first: "Jonas", last: "Berg", role: "VIEWER", title: "Remote Pilot", seenMin: 15 },
	{ key: "femke", first: "Femke", last: "Jansen", role: "VIEWER", title: "Remote Pilot", seenMin: 4 },
	{ key: "daniel", first: "Daniel", last: "Ortiz", role: "VIEWER", title: "Remote Pilot", seenMin: 22 },
	{ key: "kari", first: "Kari", last: "Solheim", role: "VIEWER", title: "HSE Coordinator", seenMin: 60 * 20 },
	{ key: "ruben", first: "Ruben", last: "Visser", role: "VIEWER", title: "Client Liaison", seenMin: 60 * 3 },
	{ key: "emily", first: "Emily", last: "Carter", role: "VIEWER", title: "Remote Pilot", seenMin: 33 },
];
const emailOf = (p: { first: string; last: string }) =>
	`${p.first}.${p.last}`.toLowerCase().replace(/\s+/g, "").replace(/[^a-z.]/g, "") + "@example.com";

const users: Record<string, { id: string; email: string; name: string }> = {};
for (const [i, p] of PEOPLE.entries()) {
	const id = `usr_${(i + 1).toString().padStart(2, "0")}${createHash("sha1").update(p.key).digest("hex").slice(0, 18)}`;
	const email = emailOf(p);
	await prisma.user.create({
		data: {
			id,
			email,
			name: `${p.first} ${p.last}`,
			firstName: p.first,
			lastName: p.last,
			emailVerified: true,
			createdAt: ago((400 - i * 17) * DAY),
			lastSignInAt: ago(p.seenMin * MIN + 2 * HOUR),
			lastSeenAt: ago(p.seenMin * MIN),
			settings: { supportBubbleHidden: false },
		},
	});
	users[p.key] = { id, email, name: `${p.first} ${p.last}` };
}

// A UAVmatrix staff super-admin (used only for the admin "license emails" screenshot)
const staff = await prisma.user.create({
	data: {
		id: "usr_staff_platform_admin",
		email: "support-desk@example.com",
		name: "Platform Support",
		firstName: "Platform",
		lastName: "Support",
		emailVerified: true,
		isSuperAdmin: true,
		createdAt: ago(600 * DAY),
		lastSeenAt: ago(2 * MIN),
	},
});
// A brand-new user with no organization (for the onboarding screenshot)
const newcomer = await prisma.user.create({
	data: {
		id: "usr_newcomer",
		email: "noah.lindqvist@example.com",
		name: "Noah Lindqvist",
		firstName: "Noah",
		lastName: "Lindqvist",
		emailVerified: true,
		createdAt: ago(5 * MIN),
		lastSeenAt: ago(1 * MIN),
	},
});

// Extra license e-mails: Ingrid bought some licenses through the procurement mailbox
await prisma.userLicenseEmail.createMany({
	data: [
		{ userId: users.owner.id, email: "procurement.nordwind@example.com", createdAt: ago(120 * DAY) },
		{ userId: users.owner.id, email: "ingrid.h.personal@example.com", createdAt: ago(30 * DAY) },
	],
});

// ---------------------------------------------------------------------------------------
// 2. Organizations, members, invitations, settings
// ---------------------------------------------------------------------------------------
const org = await prisma.organization.create({
	data: {
		name: "Nordwind Aerial Services",
		slug: "nordwind-aerial",
		description: "BVLOS inspection, survey and mapping for energy, ports and aquaculture.",
		vpnEnabled: true,
		ownerId: users.owner.id,
		createdAt: ago(380 * DAY),
	},
});
const sandbox = await prisma.organization.create({
	data: {
		name: "Nordwind R&D Sandbox",
		slug: "nordwind-rnd",
		description: "Bench and SITL testing before fleet roll-out.",
		ownerId: users.owner.id,
		createdAt: ago(2 * DAY),
	},
});

for (const [i, p] of PEOPLE.entries()) {
	await prisma.organizationMember.create({
		data: {
			userId: users[p.key].id,
			organizationId: org.id,
			role: p.role,
			createdAt: ago((370 - i * 21) * DAY),
		},
	});
}
await prisma.organizationMember.create({
	data: { userId: users.owner.id, organizationId: sandbox.id, role: "OWNER", createdAt: ago(2 * DAY) },
});
await prisma.organizationMember.create({
	data: { userId: users.elise.id, organizationId: sandbox.id, role: "ADMIN", createdAt: ago(2 * DAY) },
});

await prisma.invitation.createMany({
	data: [
		{ email: "mia.andersen@example.com", role: "VIEWER", organizationId: org.id, invitedById: users.lars.id, expiresAt: new Date(NOW + 6 * DAY), createdAt: ago(1 * DAY) },
	],
});

// Invitation for the newcomer, with a real encrypted token so /invite/<token> renders
const { createInvitationToken } = await import(pathToFileURL(join(FM, "lib/encryption/index.ts")).href);
const noahInvite = await prisma.invitation.create({
	data: { email: newcomer.email, role: "VIEWER", organizationId: org.id, invitedById: users.marcus.id, expiresAt: new Date(NOW + 7 * DAY), createdAt: ago(3 * MIN) },
});
const noahToken = Buffer.from(
	createInvitationToken({ invitationId: noahInvite.id, email: newcomer.email, organizationId: org.id, createdAt: NOW - 3 * MIN }),
).toString("base64url");
await prisma.invitation.update({ where: { id: noahInvite.id }, data: { token: noahToken } });

await prisma.organizationSettings.create({
	data: { organizationId: org.id, telemetryRetentionDays: 90, alertsEnabled: true, emailNotifications: true },
});

// ---------------------------------------------------------------------------------------
// 3. VPN network, ground stations
// ---------------------------------------------------------------------------------------
const headscaleUser = `org-${org.id.slice(0, 12)}`;
const network = await prisma.vpnNetwork.create({
	data: { headscaleUser, organizationId: org.id, createdAt: ago(300 * DAY) },
});
const authKey = `hskey-auth-${randomBytes(18).toString("base64url")}`;
await prisma.vpnAuthKey.create({
	data: { key: authKey, networkId: network.id, reusable: true, usedCount: 61, expiresAt: new Date(NOW + 64 * DAY), createdAt: ago(26 * DAY) },
});

type Gcs = { name: string; hostname: string; region: string; online: boolean; seenMin: number };
const GCS: Gcs[] = [
	{ name: "Rotterdam Ops Center", hostname: "rtm-ops-ws01", region: "Rotterdam", online: true, seenMin: 0 },
	{ name: "Maasvlakte Field Laptop", hostname: "rtm-field-tb14", region: "Rotterdam", online: true, seenMin: 0 },
	{ name: "Bergen Control Room", hostname: "bgo-ctrl-ws02", region: "Norway", online: true, seenMin: 0 },
	{ name: "Ålesund Survey Van", hostname: "aes-van-01", region: "Norway", online: false, seenMin: 60 * 7 },
	{ name: "Midland Field Truck", hostname: "maf-truck-07", region: "Texas", online: true, seenMin: 0 },
	{ name: "Odessa Pipeline Desk", hostname: "odo-desk-03", region: "Texas", online: true, seenMin: 0 },
];
const hsNodes: unknown[] = [];
const hsUser = { id: "7", name: headscaleUser, createdAt: ago(300 * DAY).toISOString() };
const gcsDevices: Record<string, { id: string; ip: string }> = {};
for (const [i, g] of GCS.entries()) {
	const machineId = String(10 + i);
	const ip = `100.64.0.${11 + i}`;
	const dev = await prisma.vpnDevice.create({
		data: {
			machineId,
			name: g.name,
			hostname: g.hostname,
			ipAddress: ip,
			online: g.online,
			lastSeen: ago(g.seenMin * MIN),
			expiry: new Date(NOW + 140 * DAY),
			deviceType: "gcs",
			networkId: network.id,
			createdAt: ago((200 - i * 20) * DAY),
		},
	});
	gcsDevices[g.name] = { id: dev.id, ip };
	hsNodes.push(node(machineId, g.hostname, g.name, ip, g.online, g.seenMin, (200 - i * 20) * DAY));
}

function node(id: string, hostname: string, given: string, ip: string, online: boolean, seenMin: number, createdAgo: number) {
	return {
		id,
		machineKey: `mkey:${createHash("sha256").update(id).digest("hex")}`,
		nodeKey: `nodekey:${createHash("sha256").update(`n${id}`).digest("hex")}`,
		discoKey: `discokey:${createHash("sha256").update(`d${id}`).digest("hex")}`,
		name: hostname,
		givenName: given.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
		user: hsUser,
		ipAddresses: [ip, `fd7a:115c:a1e0::${Number(id).toString(16)}`],
		online,
		lastSeen: ago(seenMin * MIN).toISOString(),
		lastSuccessfulUpdate: ago(seenMin * MIN).toISOString(),
		expiry: new Date(NOW + 140 * DAY).toISOString(),
		createdAt: ago(createdAgo).toISOString(),
		registerMethod: "REGISTER_METHOD_AUTH_KEY",
		forcedTags: [],
		invalidTags: [],
		validTags: [],
	};
}

// ---------------------------------------------------------------------------------------
// 4. Drones
// ---------------------------------------------------------------------------------------
const PALETTE = ["#2563eb", "#16a34a", "#ea580c", "#9333ea", "#0891b2", "#dc2626", "#ca8a04", "#db2777"];
const droneRows: { def: DroneDef; id: string; deviceId: string; index: number }[] = [];

for (const [index, d] of DRONES.entries()) {
	const deviceId = deviceIdFor(d);
	const online = isOnline(d);
	const pos = d.state === "flying" ? sampleAt(d, NOW) : { ...groundSpot(d), alt: 0, speed: 0 };
	const site = SITES[d.site];
	const lastSeen = online ? ago(2000) : ago((d.lastSeenMin ?? 60) * MIN);
	const pairedAgo = (330 - index * 6 + Math.floor(R() * 20)) * DAY;
	const cellsV = d.mavType === 1 || d.mavType === 20 ? 6 : d.mavType === 13 ? 6 : 4;
	const voltage = +(cellsV * (3.5 + (d.battery / 100) * 0.7)).toFixed(2);
	const hasVpn = d.vpn !== false;
	const row = await prisma.drone.create({
		data: {
			deviceId,
			name: d.name,
			description: `${site.name}, ${site.region}`,
			model: d.hw,
			status: d.state === "maintenance" ? "MAINTENANCE" : online ? "ONLINE" : "OFFLINE",
			createdAt: ago(pairedAgo),
			lastSeenAt: lastSeen,
			lastMavlinkAt: d.noMavlink ? ago(14 * MIN) : lastSeen,
			organizationId: org.id,
			certSerial: hexStr(16),
			certIssuedAt: ago(pairedAgo),
			certExpiresAt: new Date(NOW - pairedAgo + 365 * 30 * DAY),
			certVersion: d.certVersion ?? 2,
			latitude: pos.lat,
			longitude: pos.lon,
			altitude: site.elev + (pos.alt ?? 0),
			heading: Math.round(pos.heading),
			speed: d.state === "flying" ? +pos.speed.toFixed(1) : 0,
			batteryPercent: d.battery,
			batteryVoltage: voltage,
			isArmed: d.state === "flying",
			flightMode: d.mode,
			gpsFixType: d.gps === "weak" ? 2 : 3,
			satellites: d.gps === "weak" ? 5 : online ? 14 + Math.floor(R() * 9) : 11,
			vehicleType: VEHICLE_TYPE[d.mavType],
			vehicleTypeId: d.mavType,
			homePositionLat: d.state === "flying" ? groundSpot(d).lat : null,
			homePositionLon: d.state === "flying" ? groundSpot(d).lon : null,
			homePositionAlt: d.state === "flying" ? site.elev : null,
			color: d.color ?? PALETTE[index % PALETTE.length],
			vpnConnected: hasVpn && online,
			tailscaleIp: hasVpn ? tailscaleIpFor(index) : null,
			tailscaleMachineId: hasVpn ? machineIdFor(index) : null,
			uavcastVersion: d.version,
		},
	});
	droneRows.push({ def: d, id: row.id, deviceId, index });

	await prisma.pairingCode.create({
		data: {
			code: String(10_000_000 + Math.floor(R() * 89_999_999)),
			expiresAt: new Date(NOW - pairedAgo + 5 * MIN),
			used: true,
			usedAt: ago(pairedAgo - MIN),
			createdAt: ago(pairedAgo),
			droneId: row.id,
			vpnConsent: hasVpn,
			deviceInfo: {
				deviceId,
				licenseKeyHash: licenseHash(`fleet-${index}`),
				name: d.name,
				hostname: hostnameFor(d),
				os: d.hw.startsWith("Jetson") ? "Ubuntu 22.04.5 LTS (JetPack 6.2)" : "Debian GNU/Linux 12 (bookworm)",
				arch: "aarch64",
				version: d.version,
			},
		},
	});

	if (hasVpn) {
		const ip = tailscaleIpFor(index);
		await prisma.vpnDevice.create({
			data: {
				machineId: machineIdFor(index),
				name: d.name,
				hostname: hostnameFor(d),
				ipAddress: ip,
				online,
				lastSeen,
				expiry: new Date(NOW + 150 * DAY),
				deviceType: "drone",
				networkId: network.id,
				droneId: row.id,
				createdAt: ago(pairedAgo),
			},
		});
		hsNodes.push(node(machineIdFor(index), hostnameFor(d), d.name, ip, online, online ? 0 : (d.lastSeenMin ?? 60), pairedAgo));
	}
}

function hexStr(n: number) {
	let s = "";
	for (let i = 0; i < n; i++) s += Math.floor(R() * 16).toString(16).toUpperCase();
	return s;
}
function licenseHash(key: string) {
	return createHash("sha256").update(`UAVCAST-PRO-${key}`).digest("hex");
}

const byName = (n: string) => {
	const r = droneRows.find((x) => x.def.name === n);
	if (!r) throw new Error(`no drone ${n}`);
	return r;
};

// ---------------------------------------------------------------------------------------
// 5. Stream bindings (drone -> GCS, ports +1 per extra drone on the same GCS)
// ---------------------------------------------------------------------------------------
const BINDINGS: Record<string, string[]> = {
	"Rotterdam Ops Center": ["Survey-01", "Survey-02", "Inspect-04", "Patrol-03", "Inspect-07", "Inspect-08", "Mapper-05", "Harbor-11"],
	"Maasvlakte Field Laptop": ["Survey-01", "Survey-02", "Survey-09"],
	"Bergen Control Room": ["Wind-01", "Wind-02", "Survey-21", "Inspect-22", "Inspect-23"],
	"Ålesund Survey Van": ["Aqua-24", "Aqua-25"],
	"Midland Field Truck": ["Methane-43", "Methane-44", "Survey-46"],
	"Odessa Pipeline Desk": ["Pipe-41", "Pipe-42", "Inspect-45"],
};
let bindingCount = 0;
for (const [gcsName, names] of Object.entries(BINDINGS)) {
	for (const [i, n] of names.entries()) {
		await prisma.droneGcsAssignment.create({
			data: {
				droneId: byName(n).id,
				gcsId: gcsDevices[gcsName].id,
				videoEnabled: !(gcsName === "Odessa Pipeline Desk" && i === 2),
				telemetryEnabled: true,
				videoPort: 5600 + i,
				telemetryPort: 14550 + i,
				createdAt: ago((60 - i * 3) * DAY),
			},
		});
		bindingCount++;
	}
}

// A laptop that just joined the VPN but has not been configured yet (shows "Configure")
hsNodes.push(node("99", "ops-laptop-03", "ops-laptop-03", "100.64.0.31", true, 0, 20 * MIN));

writeHeadscaleState();
function writeHeadscaleState() {
	mkdirSync(join(SCRIPTS_DIR, ".state"), { recursive: true });
	writeFileSync(
		join(SCRIPTS_DIR, ".state", "headscale-nodes.json"),
		JSON.stringify(
			{
				users: [hsUser],
				nodes: hsNodes,
				preAuthKeys: [
					{ id: "1", key: authKey, user: headscaleUser, reusable: true, ephemeral: false, used: true, expiration: new Date(NOW + 64 * DAY).toISOString(), createdAt: ago(26 * DAY).toISOString(), aclTags: [] },
				],
			},
			null,
			1,
		),
	);
}

// ---------------------------------------------------------------------------------------
// 6. Flight history: 1 Hz telemetry for past flights + named (saved) flights
// ---------------------------------------------------------------------------------------
const flyers = droneRows.filter((r) => r.def.state !== "maintenance" && r.def.pattern);
let telemetryRows = 0;
let flights = 0;
const savedFlights: { droneId: string; name: string; start: Date; end: Date; notes?: string }[] = [];
const FLIGHT_NAMES: Record<string, string[]> = {
	Rotterdam: ["Quay wall survey", "Tank farm thermal check", "Berth 12 inspection", "Channel patrol", "Crane boom inspection"],
	Norway: ["Turbine blade inspection", "Flare stack check", "Net pen survey", "Coastal mapping", "Jetty inspection"],
	Texas: ["Pipeline patrol, segment 4", "Methane survey, pad 12", "Compressor station check", "Right-of-way mapping"],
};
for (const r of flyers) {
	const d = r.def.state === "flying" || r.def.state === "ground" ? r.def : { ...r.def, pattern: "orbit" as const };
	const flightDays = r.def.state === "flying" ? 9 : r.def.state === "ground" ? 6 : 3;
	const days = new Set<number>();
	while (days.size < flightDays) days.add(1 + Math.floor(R() * 13));
	for (const day of days) {
		const startHour = 7 + Math.floor(R() * 9);
		const start = new Date(NOW - day * DAY);
		start.setUTCHours(startHour, Math.floor(R() * 60), 0, 0);
		const durationS = 600 + Math.floor(R() * 900);
		const rows = [];
		const battStart = 96 + Math.floor(R() * 4);
		const battEnd = 28 + Math.floor(R() * 20);
		const flyDef: DroneDef = { ...d, pattern: d.pattern ?? "orbit" };
		const home = groundSpot(r.def);
		const climb = 40;
		for (let s = 0; s < durationS; s++) {
			const t = start.getTime() + s * 1000;
			const p = sampleAt(flyDef, t);
			// ease in from / out to the home position
			const k = Math.min(1, s / climb, (durationS - s) / climb);
			const lat = home.lat + (p.lat - home.lat) * k;
			const lon = home.lon + (p.lon - home.lon) * k;
			rows.push({
				droneId: r.id,
				timestamp: new Date(t),
				latitude: lat,
				longitude: lon,
				altitude: SITES[r.def.site].elev + p.alt * k,
				heading: p.heading,
				speed: p.speed * k,
				satellites: 15 + (s % 7 === 0 ? 1 : 0) + Math.floor(R() * 4),
				gpsFixType: 3,
				batteryPercent: Math.round(battStart - ((battStart - battEnd) * s) / durationS),
				batteryVoltage: +(22.2 + (2.9 * (durationS - s)) / durationS).toFixed(2),
				isArmed: s > 2 && s < durationS - 3,
				flightMode: s < climb ? "GUIDED" : s > durationS - climb ? "RTL" : flyDef.mode === "RTL" ? "AUTO" : flyDef.mode,
				services: { mavlink: true, camera: true, vpn: r.def.vpn !== false, dns: true },
			});
		}
		for (let i = 0; i < rows.length; i += 5000) {
			await prisma.telemetry.createMany({ data: rows.slice(i, i + 5000), skipDuplicates: true });
		}
		telemetryRows += rows.length;
		flights++;
		const mustSave = ["Inspect-22", "Survey-01", "Pipe-41"].includes(r.def.name) && !savedFlights.some((f) => f.droneId === r.id);
		if (R() < 0.12 || mustSave) {
			const region = SITES[r.def.site].region;
			savedFlights.push({
				droneId: r.id,
				name: pick(FLIGHT_NAMES[region]),
				start,
				end: new Date(start.getTime() + durationS * 1000),
				notes: R() < 0.5 ? "Client deliverable. Keep for 90 days." : undefined,
			});
		}
	}
}
for (const f of savedFlights) {
	await prisma.flightSession.create({
		data: { droneId: f.droneId, name: f.name, startTime: f.start, endTime: f.end, notes: f.notes, createdAt: f.end },
	});
}

// ---------------------------------------------------------------------------------------
// 7. Missions (planner) with waypoints
// ---------------------------------------------------------------------------------------
type WP = { lat: number; lon: number; alt: number; command?: number; p1?: number; p2?: number };
function grid(siteKey: string, dx: number, dy: number, w: number, h: number, lanes: number, alt: number): WP[] {
	const s = SITES[siteKey];
	const mLon = 111_320 * Math.cos((s.lat * Math.PI) / 180);
	const out: WP[] = [];
	for (let i = 0; i < lanes; i++) {
		const y = dy - h / 2 + (h * i) / (lanes - 1);
		const xs = i % 2 === 0 ? [dx - w / 2, dx + w / 2] : [dx + w / 2, dx - w / 2];
		for (const x of xs) out.push({ lat: s.lat + y / 111_320, lon: s.lon + x / mLon, alt });
	}
	return out;
}
function ring(siteKey: string, dx: number, dy: number, r: number, n: number, alt: number): WP[] {
	const s = SITES[siteKey];
	const mLon = 111_320 * Math.cos((s.lat * Math.PI) / 180);
	return Array.from({ length: n }, (_, i) => {
		const a = (2 * Math.PI * i) / n;
		return { lat: s.lat + (dy + r * Math.sin(a)) / 111_320, lon: s.lon + (dx + r * Math.cos(a)) / mLon, alt };
	});
}
function line(siteKey: string, pts: [number, number][], alt: number): WP[] {
	const s = SITES[siteKey];
	const mLon = 111_320 * Math.cos((s.lat * Math.PI) / 180);
	return pts.map(([x, y]) => ({ lat: s.lat + y / 111_320, lon: s.lon + x / mLon, alt }));
}
const MISSIONS: { name: string; description: string; site: string; by: string; days: number; wps: WP[]; template?: boolean }[] = [
	{ name: "Maasvlakte quay wall survey", description: "Photogrammetry grid, 80 m AGL, 75% overlap. Prinses Amaliahaven east quay.", site: "maasvlakte", by: "sanne", days: 1, wps: grid("maasvlakte", 300, 400, 1300, 900, 7, 80) },
	{ name: "Europoort tank farm thermal orbit", description: "Two-level orbit around tanks T-14 to T-17 for the thermal survey.", site: "europoort", by: "sanne", days: 3, wps: [...ring("europoort", -300, 200, 320, 8, 50), ...ring("europoort", -300, 200, 220, 6, 35)] },
	{ name: "Mongstad flare stack inspection", description: "Vertical inspection pattern around flare stack F-2, 15 m stand-off.", site: "mongstad", by: "lars", days: 5, wps: [...ring("mongstad", 300, -200, 120, 6, 40), ...ring("mongstad", 300, -200, 120, 6, 70), ...ring("mongstad", 300, -200, 120, 6, 100)] },
	{ name: "Odessa pipeline patrol, segment 4", description: "BVLOS corridor patrol along the gathering line, 90 m AGL.", site: "odessa", by: "marcus", days: 2, wps: line("odessa", [[-3200, -1100], [-2000, -700], [-800, -250], [400, 150], [1600, 560], [2800, 980], [3600, 1250]], 90) },
	{ name: "Midland pad 12 methane survey", description: "Low-altitude grid for the OGI methane sensor.", site: "midland", by: "marcus", days: 6, wps: grid("midland", -1200, 700, 1000, 700, 8, 30) },
	{ name: "Ålesund net pen survey", description: "Racetrack over pens 3 to 6 at 40 m.", site: "alesund", by: "lars", days: 9, wps: line("alesund", [[-500, -250], [500, -250], [700, 0], [500, 250], [-500, 250], [-700, 0], [-500, -250]], 40) },
	{ name: "Turbine blade inspection (template)", description: "Reusable template: 3-level orbit for a single turbine.", site: "agotnes", by: "elise", days: 21, template: true, wps: [...ring("agotnes", -2200, 1400, 90, 8, 60), ...ring("agotnes", -2200, 1400, 90, 8, 100)] },
];
for (const m of MISSIONS) {
	const s = SITES[m.site];
	const mission = await prisma.mission.create({
		data: {
			name: m.name,
			description: m.description,
			organizationId: org.id,
			createdById: users[m.by].id,
			isTemplate: m.template ?? false,
			createdAt: ago((m.days + 4) * DAY),
			updatedAt: ago(m.days * DAY),
		},
	});
	const wps: { seq: number; lat: number; lon: number; alt: number; command: number; param1?: number; param2?: number }[] = [];
	wps.push({ seq: 0, lat: s.lat, lon: s.lon, alt: 0, command: 16 }); // home
	wps.push({ seq: 1, lat: s.lat, lon: s.lon, alt: m.wps[0].alt, command: 22 }); // takeoff
	wps.push({ seq: 2, lat: m.wps[0].lat, lon: m.wps[0].lon, alt: m.wps[0].alt, command: 178, param1: 1, param2: 10 }); // change speed
	m.wps.forEach((w, i) => wps.push({ seq: 3 + i, lat: w.lat, lon: w.lon, alt: w.alt, command: 16 }));
	wps.push({ seq: wps.length, lat: s.lat, lon: s.lon, alt: 0, command: 20 }); // RTL
	await prisma.waypoint.createMany({
		data: wps.map((w) => ({ missionId: mission.id, seq: w.seq, lat: w.lat, lon: w.lon, alt: w.alt, command: w.command, param1: w.param1 ?? 0, param2: w.param2 ?? 0 })),
	});
}

// ---------------------------------------------------------------------------------------
// 8. Commands, alerts, activity timeline
// ---------------------------------------------------------------------------------------
const CMDS: [string, string, "COMPLETED" | "FAILED" | "ACKNOWLEDGED" | "EXPIRED", string?][] = [
	["mission", "start", "COMPLETED", "Mission started"],
	["drone", "set_flight_mode", "COMPLETED", "Mode set to AUTO"],
	["get_status", "services", "COMPLETED"],
	["vpn", "set_destinations", "COMPLETED", "2 video, 2 telemetry destinations"],
	["service_control", "restart", "COMPLETED", "uavcast-camera.service restarted"],
	["mission", "request", "COMPLETED", "Read 18 mission items"],
	["drone", "set_flight_mode", "FAILED", "Mode change denied by FC: not armable"],
	["system", "reboot", "COMPLETED", "Rebooting"],
	["mission", "pause", "COMPLETED", "Mission paused"],
	["drone", "rename", "COMPLETED"],
];
const commandUsers = ["sanne", "lars", "marcus", "tomasz", "femke", "elise"];
let commandCount = 0;
for (const r of droneRows) {
	const n = r.def.name === "Survey-01" ? 10 : r.def.state === "flying" ? 4 : 2;
	for (let i = 0; i < n; i++) {
		const [type, action, status, response] = r.def.name === "Survey-01" ? CMDS[i] : pick(CMDS);
		const t = ago((i * 7 + Math.floor(R() * 6)) * HOUR + Math.floor(R() * HOUR));
		await prisma.command.create({
			data: {
				droneId: r.id,
				userId: users[pick(commandUsers)].id,
				commandType: type,
				action,
				status,
				response: response ?? null,
				errorCode: status === "FAILED" ? "MAV_RESULT_DENIED" : null,
				requiresConfirm: type === "system",
				confirmedAt: type === "system" ? t : null,
				createdAt: t,
				sentAt: t,
				ackedAt: new Date(t.getTime() + 600 + Math.floor(R() * 900)),
				expiresAt: new Date(t.getTime() + 60_000),
			},
		});
		commandCount++;
	}
}

const ALERTS: [string, "LOW_BATTERY" | "SIGNAL_LOST" | "GEOFENCE_BREACH" | "ARMED" | "DISARMED" | "SYSTEM_ERROR", "INFO" | "WARNING" | "CRITICAL", string, number][] = [
	["Inspect-08", "LOW_BATTERY", "WARNING", "Battery at 22% (14.9 V). Consider RTL.", 4],
	["Aqua-25", "LOW_BATTERY", "CRITICAL", "Battery at 19% (14.7 V). Failsafe RTL threshold reached.", 2],
	["Survey-46", "LOW_BATTERY", "WARNING", "Battery at 24% (21.8 V). Returning to launch.", 6],
	["Patrol-19", "SIGNAL_LOST", "CRITICAL", "Heartbeat lost for 30 s (last seen over Calandkanaal).", 47],
	["Inspect-32", "SIGNAL_LOST", "WARNING", "LTE link degraded: RTT 820 ms, 3 missed pings.", 14],
	["Harbor-11", "GEOFENCE_BREACH", "WARNING", "Inclusion fence breached by 35 m near berth 8.", 95],
	["Pipe-42", "GEOFENCE_BREACH", "CRITICAL", "Exclusion fence: corridor edge crossed at 90 m AGL.", 60 * 20],
	["Survey-01", "ARMED", "INFO", "Vehicle armed in GUIDED.", 38],
	["Wind-01", "ARMED", "INFO", "Vehicle armed in GUIDED.", 25],
	["Survey-09", "DISARMED", "INFO", "Vehicle disarmed after landing.", 55],
	["Survey-31", "SYSTEM_ERROR", "CRITICAL", "Camera service crashed: /dev/video0 not found.", 60 * 49],
];
for (const [n, type, severity, message, minAgo] of ALERTS) {
	await prisma.alert.create({ data: { droneId: byName(n).id, type, severity, message, isRead: minAgo > 60, createdAt: ago(minAgo * MIN) } });
}

const ACT: [string, string, string, number][] = [
	["sanne", "mission.uploaded", `uploaded mission "Maasvlakte quay wall survey" (24 waypoints) to Survey-01`, 36],
	["femke", "command.completed", "drone:set_flight_mode completed on Inspect-04", 31],
	["lars", "command.completed", "mission:start completed on Wind-01", 26],
	["marcus", "mission.uploaded", `uploaded mission "Odessa pipeline patrol, segment 4" (12 waypoints) to Pipe-41`, 21],
	["tomasz", "command.completed", "drone:set_flight_mode completed on Survey-21", 17],
	["sanne", "stream.binding.created", "created stream binding: Survey-09 → Maasvlakte Field Laptop", 12],
	["daniel", "command.completed", "mission:start completed on Methane-44", 9],
	["marcus", "command.completed", "flight mode changed to RTL on Survey-46", 4],
	["marcus", "member.invited", "invited noah.lindqvist@example.com as VIEWER", 3],
	["elise", "drone.repaired", `re-paired UAV "Inspect-23"`, 60 * 7],
	["lars", "mission.created", `created mission "Mongstad flare stack inspection" with 21 waypoints`, 60 * 26],
	["sanne", "drone.gcs.assigned", `assigned GCS to drone "Survey-09"`, 60 * 48],
	["owner", "settings.updated", "updated telemetry retention to 90 days", 60 * 50],
	["elise", "drone.paired", `paired UAV "Mapper-20"`, 60 * 52],
	["marcus", "drone.gcs.assigned", `assigned GCS to drone "Survey-46"`, 60 * 70],
	["lars", "member.invited", "invited mia.andersen@example.com as VIEWER", 60 * 24],
	["owner", "member.role_changed", "changed elise.brekke@example.com's role to ADMIN", 60 * 120],
	["emily", "member.joined", "emily.carter@example.com joined as VIEWER", 60 * 140],
	["owner", "vpn.authkey.created", "created new VPN auth key", 60 * 24 * 26],
];
for (const [who, type, description, minAgo] of ACT) {
	await prisma.activity.create({ data: { userId: users[who].id, organizationId: org.id, type, description, createdAt: ago(minAgo * MIN) } });
}
await prisma.activity.create({ data: { userId: users.owner.id, organizationId: sandbox.id, type: "organization.created", description: `created organization "Nordwind R&D Sandbox"`, createdAt: ago(2 * DAY) } });

// ---------------------------------------------------------------------------------------
// 9. Support tickets, status announcements
// ---------------------------------------------------------------------------------------
const TICKETS: [string, "BUG_REPORT" | "FEATURE_REQUEST" | "GENERAL_INQUIRY" | "QUESTION", string, string, "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED", number][] = [
	["SUP-7K2Q9M", "FEATURE_REQUEST", "Export flight history as KML", "Our clients ask for KML/GPX of each inspection flight. Could the flight history drawer offer an export?", "IN_PROGRESS", 3],
	["SUP-4XN8TB", "QUESTION", "Stream bindings for a second GCS laptop", "When we add a second field laptop at Maasvlakte, do the ports restart at 5600 or continue from the ops center?", "RESOLVED", 9],
	["SUP-9PL3RA", "BUG_REPORT", "Patrol-19 shows Re-pair required", "After the 6.3.2 update Patrol-19 shows a re-pair banner. Is this expected?", "OPEN", 1],
	["SUP-2HD6WE", "GENERAL_INQUIRY", "Adding 20 more device slots", "We are expanding the Permian operation next quarter and need 20 more seats.", "CLOSED", 34],
];
for (const [ticketNumber, category, subject, message, status, daysAgo] of TICKETS) {
	await prisma.supportTicket.create({
		data: { ticketNumber, category, subject, message, status, userId: users.owner.id, organizationId: org.id, pageUrl: "http://localhost:3107/fleet", createdAt: ago(daysAgo * DAY), updatedAt: ago(Math.max(0, daysAgo - 1) * DAY) },
	});
}
await prisma.systemAnnouncement.createMany({
	data: [
		{ title: "Degraded MQTT connectivity (EU)", message: "Some UAVs in the EU region reconnected repeatedly between 06:10 and 06:42 UTC.", type: "WARNING", status: "RESOLVED", resolutionMessage: "A broker node was replaced. All UAVs reconnected automatically.", createdById: staff.id, createdAt: ago(12 * DAY), resolvedAt: ago(12 * DAY - 40 * MIN) },
		{ title: "Scheduled maintenance: VPN control server", message: "The VPN control server restarts for an upgrade. Existing tunnels stay up.", type: "INFO", status: "RESOLVED", resolutionMessage: "Maintenance completed in 6 minutes.", createdById: staff.id, createdAt: ago(27 * DAY), resolvedAt: ago(27 * DAY - 20 * MIN) },
	],
});

// ---------------------------------------------------------------------------------------
// 10. Pairing codes for the wizard screenshots (as if UAVcast had requested them)
// ---------------------------------------------------------------------------------------
const PAIR_OK = "48213907";
const PAIR_EXPIRED = "19384756";
const PAIR_FOREIGN = "73920184";
const pairDevice = {
	deviceId: "c0ffee5a1e7e4b9d8a2f61e0b7d3a915",
	name: "Survey-55",
	hostname: "nw-survey-55-orin",
	os: "Ubuntu 22.04.5 LTS (JetPack 6.2)",
	arch: "aarch64",
	version: "6.4.0",
};
const pairingRows = [
		{ code: PAIR_OK, expiresAt: new Date(NOW + 6 * HOUR), deviceInfo: { ...pairDevice, licenseKeyHash: licenseHash("pairing-ok") } },
		{ code: PAIR_EXPIRED, expiresAt: ago(20 * MIN), createdAt: ago(25 * MIN), deviceInfo: { ...pairDevice, deviceId: "ab12cd34ef56ab12cd34ef56ab12cd34", name: "Inspect-56", hostname: "nw-inspect-56-pi5", os: "Debian GNU/Linux 12 (bookworm)", licenseKeyHash: licenseHash("pairing-ok") } },
		{ code: PAIR_FOREIGN, expiresAt: new Date(NOW + 6 * HOUR), deviceInfo: { ...pairDevice, deviceId: "f00dfeed0badc0de1234567890abcdef", name: "uavcast-demo", hostname: "uavcast-demo", licenseKeyHash: licenseHash("foreign") } },
];
await prisma.pairingCode.createMany({ data: pairingRows });

// ---------------------------------------------------------------------------------------
// 11. Local Store stand-in (licenses), used by the pairing license-ownership check
// ---------------------------------------------------------------------------------------
const admin = new pg.Client({ connectionString: env.DATABASE_URL });
await admin.connect();
const exists = await admin.query(`SELECT 1 FROM pg_database WHERE datname='store'`);
if (exists.rowCount === 0) await admin.query(`CREATE DATABASE store`);
await admin.end();
const store = new pg.Client({ connectionString: env.STORE_DATABASE_URL });
await store.connect();
await store.query(`
	DROP TABLE IF EXISTS "License"; DROP TABLE IF EXISTS "Product"; DROP TABLE IF EXISTS "User";
	CREATE TABLE "User" (id text primary key, email text not null);
	CREATE TABLE "Product" (id text primary key, name text not null);
	CREATE TABLE "License" (id text primary key, status text not null, "maxInstances" int not null,
		"expirationDate" timestamptz, "productId" text references "Product"(id), "ownerId" text references "User"(id),
		"licenseKeyHash" text not null);
`);
await store.query(`INSERT INTO "Product" VALUES ('p1','UAVcast-Pro')`);
await store.query(`INSERT INTO "User" VALUES ('s1',$1),('s2','procurement.nordwind@example.com'),('s3','someone.else@example.com')`, [users.owner.email]);
await store.query(`INSERT INTO "License" VALUES ('l1','ACTIVE',25,null,'p1','s1',$1)`, [licenseHash("pairing-ok")]);
await store.query(`INSERT INTO "License" VALUES ('l2','ACTIVE',30,null,'p1','s2',$1)`, [licenseHash("procurement")]);
await store.query(`INSERT INTO "License" VALUES ('l3','ACTIVE',1,null,'p1','s3',$1)`, [licenseHash("foreign")]);
await store.end();

// ---------------------------------------------------------------------------------------
// 12. Sessions for the capture script (Better Auth DB sessions)
// ---------------------------------------------------------------------------------------
const sessions: Record<string, string> = {};
for (const [key, userId] of Object.entries({ owner: users.owner.id, viewer: users.tomasz.id, staff: staff.id, newcomer: newcomer.id })) {
	const token = randomBytes(24).toString("base64url");
	await prisma.session.create({
		data: { token, userId, expiresAt: new Date(NOW + 7 * DAY), ipAddress: "127.0.0.1", userAgent: "docs-screenshots" },
	});
	sessions[key] = token;
}
writeFileSync(
	join(SCRIPTS_DIR, ".state", "seed.json"),
	JSON.stringify(
		{
			seededAt: new Date(NOW).toISOString(),
			orgId: org.id,
			sandboxOrgId: sandbox.id,
			ownerId: users.owner.id,
			staffId: staff.id,
			sessions,
			pairing: {
				ok: PAIR_OK,
				expired: PAIR_EXPIRED,
				foreign: PAIR_FOREIGN,
				deviceId: pairDevice.deviceId,
				rows: pairingRows.map((r) => ({ code: r.code, deviceInfo: r.deviceInfo })),
			},
			inviteToken: noahToken,
			drones: Object.fromEntries(droneRows.map((r) => [r.def.name, r.id])),
		},
		null,
		1,
	),
);

const online = DRONES.filter(isOnline).length;
console.log(
	`Seeded "${org.name}": ${DRONES.length} UAVs (${DRONES.filter((d) => d.state === "flying").length} flying, ${online} online, ${DRONES.length - online} offline/maintenance), ` +
		`${GCS.length} ground stations, ${bindingCount} stream bindings, ${PEOPLE.length} members + 2 pending invites, ` +
		`${flights} past flights (${telemetryRows} telemetry rows, ${savedFlights.length} saved), ${MISSIONS.length} missions, ` +
		`${commandCount} commands, ${ALERTS.length} alerts, ${ACT.length} activities, ${TICKETS.length} tickets.`,
);
await prisma.$disconnect();
