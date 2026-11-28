// Shared fictional dataset for the Fleet Manager docs screenshots:
// "Nordwind Aerial Services", an enterprise drone operator with three operating regions.
// Used by seed.ts (database) and simulate.ts (live MQTT telemetry), so the drones in the DB
// and the drones flying on the live map are the same aircraft on the same flight paths.

// ---------------------------------------------------------------------------------------
// Deterministic helpers
// ---------------------------------------------------------------------------------------

export function rng(seed: number) {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function hex(r: () => number, len: number) {
	let s = "";
	for (let i = 0; i < len; i++) s += Math.floor(r() * 16).toString(16);
	return s;
}

const M_PER_DEG_LAT = 111_320;
export const mPerDegLon = (lat: number) => 111_320 * Math.cos((lat * Math.PI) / 180);

// ---------------------------------------------------------------------------------------
// Sites
// ---------------------------------------------------------------------------------------

export interface Site {
	key: string;
	region: "Norway" | "Rotterdam" | "Texas";
	name: string;
	lat: number;
	lon: number;
	/** Ground elevation MSL, metres (for absolute altitude). */
	elev: number;
}

export const SITES: Record<string, Site> = {
	agotnes: { key: "agotnes", region: "Norway", name: "Ågotnes supply base", lat: 60.4062, lon: 5.0068, elev: 8 },
	mongstad: { key: "mongstad", region: "Norway", name: "Mongstad terminal", lat: 60.8089, lon: 5.0318, elev: 12 },
	alesund: { key: "alesund", region: "Norway", name: "Ålesund aquaculture", lat: 62.4893, lon: 6.0914, elev: 5 },
	maasvlakte: { key: "maasvlakte", region: "Rotterdam", name: "Maasvlakte 2 terminals", lat: 51.9625, lon: 4.0148, elev: 4 },
	calandkanaal: { key: "calandkanaal", region: "Rotterdam", name: "Calandkanaal", lat: 51.9338, lon: 4.1384, elev: 3 },
	europoort: { key: "europoort", region: "Rotterdam", name: "Europoort tank farms", lat: 51.9046, lon: 4.2004, elev: 3 },
	botlek: { key: "botlek", region: "Rotterdam", name: "Botlek", lat: 51.8873, lon: 4.2962, elev: 2 },
	waalhaven: { key: "waalhaven", region: "Rotterdam", name: "Waalhaven workshop", lat: 51.8845, lon: 4.434, elev: 2 },
	midland: { key: "midland", region: "Texas", name: "Midland basin pads", lat: 32.0248, lon: -102.0105, elev: 870 },
	odessa: { key: "odessa", region: "Texas", name: "Odessa gathering line", lat: 31.9352, lon: -102.6218, elev: 900 },
	stanton: { key: "stanton", region: "Texas", name: "Stanton compressor station", lat: 32.1352, lon: -101.7911, elev: 820 },
};

// ---------------------------------------------------------------------------------------
// Drones
// ---------------------------------------------------------------------------------------

export type Pattern = "orbit" | "lawnmower" | "line" | "racetrack";
export type State = "flying" | "ground" | "offline" | "maintenance";

export interface DroneDef {
	name: string;
	site: string;
	hw: "Raspberry Pi 5" | "Jetson Orin Nano" | "Jetson Orin NX" | "Raspberry Pi 4";
	/** MAVLink MAV_TYPE id: 2 quad, 13 hex, 14 octo, 1 fixed wing, 20 VTOL quadplane */
	mavType: 2 | 13 | 14 | 1 | 20;
	state: State;
	pattern: Pattern;
	/** Pattern size in metres (orbit radius / box half-size / line half-length). */
	size: number;
	/** Offset of the pattern centre from the site, metres east/north. */
	dx: number;
	dy: number;
	alt: number; // relative altitude, m
	speed: number; // m/s
	/** Exact pattern centre / parking spot (overrides site + dx/dy). */
	at?: [number, number];
	mode: string; // flight mode while flying
	battery: number; // current battery %
	color?: string;
	/** Offline drones: minutes since last heartbeat. */
	lastSeenMin?: number;
	version?: string;
	certVersion?: number;
	vpn?: boolean;
	/** Simulator quirks for the map-indicator screenshot. */
	gps?: "weak";
	noMavlink?: boolean;
}

const D = (d: Partial<DroneDef> & Pick<DroneDef, "name" | "site" | "state">): DroneDef => ({
	hw: "Raspberry Pi 5",
	mavType: 2,
	pattern: "orbit",
	size: 350,
	dx: 0,
	dy: 0,
	alt: 60,
	speed: 9,
	mode: "AUTO",
	battery: 78,
	version: "6.4.0",
	certVersion: 2,
	vpn: true,
	...d,
});

export const DRONES: DroneDef[] = [
	// ---------------- Rotterdam (busiest region, used for the live-map hero shot).
	// Each drone gets its own spot ("at") so markers and labels don't pile up at zoom 12.
	D({ name: "Survey-01", site: "maasvlakte", at: [51.966, 4.008], state: "flying", pattern: "lawnmower", size: 1100, alt: 80, speed: 16, mode: "AUTO", battery: 71, mavType: 20, hw: "Jetson Orin NX" }),
	D({ name: "Survey-02", site: "maasvlakte", at: [51.941, 4.052], state: "flying", pattern: "lawnmower", size: 900, alt: 80, speed: 15, mode: "AUTO", battery: 64, hw: "Jetson Orin Nano" }),
	D({ name: "Inspect-04", site: "maasvlakte", at: [51.989, 4.072], state: "flying", pattern: "orbit", size: 650, alt: 45, speed: 12, mode: "GUIDED", battery: 83, mavType: 13 }),
	D({ name: "Harbor-11", site: "calandkanaal", at: [51.984, 4.142], state: "flying", pattern: "racetrack", size: 1600, alt: 60, speed: 14, mode: "AUTO", battery: 46 }),
	D({ name: "Patrol-03", site: "calandkanaal", at: [51.936, 4.168], state: "flying", pattern: "line", size: 2600, alt: 70, speed: 17, mode: "AUTO", battery: 57, mavType: 20, hw: "Jetson Orin Nano" }),
	D({ name: "Inspect-07", site: "europoort", at: [51.905, 4.218], state: "flying", pattern: "orbit", size: 700, alt: 50, speed: 12, mode: "LOITER", battery: 88, mavType: 2 }),
	D({ name: "Inspect-08", site: "europoort", at: [51.928, 4.282], state: "flying", pattern: "orbit", size: 600, alt: 40, speed: 11, mode: "GUIDED", battery: 22, mavType: 2 }),
	D({ name: "Mapper-05", site: "botlek", at: [51.884, 4.318], state: "flying", pattern: "lawnmower", size: 1000, alt: 100, speed: 18, mode: "AUTO", battery: 69, mavType: 1, hw: "Jetson Orin NX" }),
	D({ name: "Inspect-12", site: "calandkanaal", at: [51.958, 4.112], state: "ground", battery: 97, mode: "LOITER", mavType: 13 }),
	D({ name: "Harbor-15", site: "europoort", at: [51.889, 4.152], state: "offline", lastSeenMin: 190, battery: 31 }),
	D({ name: "Inspect-18", site: "botlek", at: [51.866, 4.252], state: "maintenance", lastSeenMin: 60 * 72, battery: 0, mavType: 13 }),
	D({ name: "Patrol-19", site: "calandkanaal", at: [51.972, 4.214], state: "offline", lastSeenMin: 45, battery: 54, mavType: 20, version: "6.3.2" }), // capture flips certVersion to 1 for the re-pair shots
	// Waalhaven workshop (east of the hero frame): used for the marker-indicator close-up
	D({ name: "Mapper-20", site: "waalhaven", at: [51.8858, 4.4300], state: "ground", battery: 99, mode: "MANUAL", mavType: 1, hw: "Jetson Orin NX" }),
	D({ name: "Survey-09", site: "waalhaven", at: [51.8850, 4.4370], state: "ground", battery: 100, mode: "STABILIZE", gps: "weak" }),
	D({ name: "Mapper-14", site: "waalhaven", at: [51.8832, 4.4310], state: "ground", battery: 94, mode: "STABILIZE", hw: "Jetson Orin Nano", noMavlink: true }),
	D({ name: "Survey-16", site: "waalhaven", at: [51.8826, 4.4378], state: "offline", lastSeenMin: 60 * 26, battery: 12, hw: "Raspberry Pi 4", version: "6.2.1" }),

	// ---------------- Norway coast
	D({ name: "Wind-01", site: "agotnes", state: "flying", pattern: "orbit", size: 300, dx: -2200, dy: 1400, alt: 120, speed: 7, mode: "GUIDED", battery: 74, mavType: 13, hw: "Jetson Orin Nano" }),
	D({ name: "Wind-02", site: "agotnes", state: "flying", pattern: "orbit", size: 300, dx: -2900, dy: -900, alt: 110, speed: 7, mode: "GUIDED", battery: 61, mavType: 13, hw: "Jetson Orin Nano" }),
	D({ name: "Survey-21", site: "agotnes", state: "flying", pattern: "lawnmower", size: 700, dx: 1200, dy: 800, alt: 90, speed: 12, mode: "AUTO", battery: 52, mavType: 20, hw: "Jetson Orin NX" }),
	D({ name: "Inspect-22", site: "mongstad", state: "flying", pattern: "orbit", size: 200, dx: 300, dy: -200, alt: 55, speed: 5, mode: "POSHOLD", battery: 80 }),
	D({ name: "Inspect-23", site: "mongstad", state: "flying", pattern: "orbit", size: 280, dx: -600, dy: 500, alt: 65, speed: 6, mode: "AUTO", battery: 38, mavType: 13 }),
	D({ name: "Aqua-24", site: "alesund", state: "flying", pattern: "racetrack", size: 700, dx: 0, dy: 0, alt: 40, speed: 8, mode: "AUTO", battery: 67 }),
	D({ name: "Aqua-25", site: "alesund", state: "flying", pattern: "orbit", size: 220, dx: 1500, dy: -600, alt: 35, speed: 5, mode: "LOITER", battery: 19 }),
	D({ name: "Survey-26", site: "agotnes", state: "ground", battery: 100, mode: "STABILIZE", mavType: 20, hw: "Jetson Orin NX" }),
	D({ name: "Wind-27", site: "agotnes", state: "ground", battery: 96, mode: "LOITER", mavType: 13 }),
	D({ name: "Inspect-28", site: "mongstad", state: "ground", battery: 92, mode: "STABILIZE" }),
	D({ name: "Aqua-29", site: "alesund", state: "ground", battery: 100, mode: "STABILIZE" }),
	D({ name: "Wind-30", site: "agotnes", state: "offline", lastSeenMin: 60 * 5, battery: 44, mavType: 13 }),
	D({ name: "Survey-31", site: "agotnes", state: "offline", lastSeenMin: 60 * 49, battery: 0, mavType: 20, hw: "Jetson Orin NX", version: "6.3.2" }),
	D({ name: "Inspect-32", site: "mongstad", state: "offline", lastSeenMin: 12, battery: 63 }),
	D({ name: "Aqua-33", site: "alesund", state: "offline", lastSeenMin: 60 * 120, battery: 8, hw: "Raspberry Pi 4", version: "6.1.0", vpn: false }),
	D({ name: "Mapper-34", site: "agotnes", state: "maintenance", lastSeenMin: 60 * 200, battery: 0, mavType: 1 }),

	// ---------------- Texas, Permian Basin
	D({ name: "Pipe-41", site: "odessa", state: "flying", pattern: "line", size: 3200, dx: 0, dy: 0, alt: 90, speed: 18, mode: "AUTO", battery: 66, mavType: 1, hw: "Jetson Orin NX" }),
	D({ name: "Pipe-42", site: "odessa", state: "flying", pattern: "line", size: 2600, dx: 2500, dy: 3500, alt: 90, speed: 17, mode: "AUTO", battery: 48, mavType: 20, hw: "Jetson Orin NX" }),
	D({ name: "Methane-43", site: "midland", state: "flying", pattern: "lawnmower", size: 500, dx: -1200, dy: 700, alt: 30, speed: 7, mode: "AUTO", battery: 72, mavType: 13, hw: "Jetson Orin Nano" }),
	D({ name: "Methane-44", site: "midland", state: "flying", pattern: "lawnmower", size: 450, dx: 1500, dy: -900, alt: 30, speed: 7, mode: "AUTO", battery: 85, mavType: 13, hw: "Jetson Orin Nano" }),
	D({ name: "Inspect-45", site: "stanton", state: "flying", pattern: "orbit", size: 220, dx: 0, dy: 0, alt: 45, speed: 6, mode: "GUIDED", battery: 58 }),
	D({ name: "Survey-46", site: "midland", state: "flying", pattern: "racetrack", size: 1400, dx: 0, dy: -3000, alt: 110, speed: 15, mode: "RTL", battery: 21, mavType: 20, hw: "Jetson Orin NX" }),
	D({ name: "Methane-47", site: "midland", state: "ground", battery: 100, mode: "STABILIZE", mavType: 13 }),
	D({ name: "Pipe-48", site: "odessa", state: "ground", battery: 98, mode: "MANUAL", mavType: 1, hw: "Jetson Orin NX" }),
	D({ name: "Inspect-49", site: "stanton", state: "ground", battery: 95, mode: "LOITER" }),
	D({ name: "Survey-50", site: "midland", state: "ground", battery: 100, mode: "QLOITER", mavType: 20, hw: "Jetson Orin NX" }),
	D({ name: "Methane-51", site: "midland", state: "offline", lastSeenMin: 60 * 9, battery: 27, mavType: 13 }),
	D({ name: "Pipe-52", site: "odessa", state: "offline", lastSeenMin: 60 * 30, battery: 0, mavType: 1, version: "6.3.2" }),
	D({ name: "Inspect-53", site: "stanton", state: "offline", lastSeenMin: 60 * 75, battery: 15, hw: "Raspberry Pi 4", version: "6.2.1" }),
	D({ name: "Survey-54", site: "midland", state: "offline", lastSeenMin: 60 * 8 * 24, battery: 0, mavType: 20, vpn: false }),
];

// ---------------------------------------------------------------------------------------
// Flight paths (pure functions of wall-clock time, so seed + simulator agree)
// ---------------------------------------------------------------------------------------

export interface Sample {
	lat: number;
	lon: number;
	alt: number; // relative
	heading: number;
	speed: number;
}

function hashName(name: string) {
	let h = 2166136261;
	for (let i = 0; i < name.length; i++) h = Math.imul(h ^ name.charCodeAt(i), 16777619);
	return h >>> 0;
}

function localXY(d: DroneDef, tSec: number): [number, number] {
	const phase = (hashName(d.name) % 1000) / 1000;
	const s = d.size;
	switch (d.pattern) {
		case "orbit": {
			const period = (2 * Math.PI * s) / d.speed;
			const a = 2 * Math.PI * (tSec / period + phase);
			return [s * Math.cos(a), s * Math.sin(a)];
		}
		case "line": {
			// Back and forth along a slanted pipeline / quay
			const L = 2 * s;
			const period = (2 * L) / d.speed;
			let u = ((tSec / period + phase) % 1) * 2; // 0..2
			u = u < 1 ? u : 2 - u;
			const x = -s + u * L;
			return [x, x * 0.35];
		}
		case "racetrack": {
			const r = s * 0.35;
			const straight = s;
			const per = 2 * straight + 2 * Math.PI * r;
			let p = ((tSec * d.speed) / per + phase) % 1;
			p *= per;
			if (p < straight) return [-straight / 2 + p, -r];
			p -= straight;
			if (p < Math.PI * r) {
				const a = -Math.PI / 2 + p / r;
				return [straight / 2 + r * Math.cos(a), r * Math.sin(a)];
			}
			p -= Math.PI * r;
			if (p < straight) return [straight / 2 - p, r];
			p -= straight;
			const a = Math.PI / 2 + p / r;
			return [-straight / 2 + r * Math.cos(a), r * Math.sin(a)];
		}
		case "lawnmower": {
			const lanes = 6;
			const w = 2 * s;
			const laneGap = w / (lanes - 1);
			const per = lanes * w + (lanes - 1) * laneGap;
			const total = 2 * per; // there and back
			let p = ((tSec * d.speed) / total + phase) % 1;
			p *= total;
			const back = p > per;
			if (back) p = total - p;
			const seg = w + laneGap;
			const lane = Math.min(lanes - 1, Math.floor(p / seg));
			const inLane = p - lane * seg;
			const y = -s + lane * laneGap;
			if (inLane <= w) {
				const x = lane % 2 === 0 ? -s + inLane : s - inLane;
				return [x, y];
			}
			const x = lane % 2 === 0 ? s : -s;
			return [x, y + (inLane - w)];
		}
	}
}

export function sampleAt(d: DroneDef, tMs: number): Sample {
	const site = SITES[d.site];
	const t = tMs / 1000;
	const [x0, y0] = localXY(d, t);
	const [x1, y1] = localXY(d, t + 1);
	const [oLat, oLon] = d.at ?? [site.lat, site.lon];
	const cx = (d.at ? 0 : d.dx) + x0;
	const cy = (d.at ? 0 : d.dy) + y0;
	const lat = oLat + cy / M_PER_DEG_LAT;
	const lon = oLon + cx / mPerDegLon(oLat);
	const vx = x1 - x0;
	const vy = y1 - y0;
	const heading = ((Math.atan2(vx, vy) * 180) / Math.PI + 360) % 360;
	const speed = Math.hypot(vx, vy);
	const wobble = Math.sin(t / 7 + hashName(d.name)) * 1.5;
	return { lat, lon, alt: d.alt + wobble, heading, speed };
}

/** Parking spot for a drone on the ground at its site (small offset per drone). */
export function groundSpot(d: DroneDef) {
	const site = SITES[d.site];
	const r = rng(hashName(d.name));
	if (d.at) return { lat: d.at[0], lon: d.at[1], heading: Math.floor(r() * 360) };
	const ex = (r() - 0.5) * 400;
	const ny = (r() - 0.5) * 300;
	return {
		lat: site.lat + ny / M_PER_DEG_LAT,
		lon: site.lon + ex / mPerDegLon(site.lat),
		heading: Math.floor(r() * 360),
	};
}

export function deviceIdFor(d: DroneDef) {
	const r = rng(hashName(d.name) ^ 0x5eed);
	return hex(r, 32);
}

export function hostnameFor(d: DroneDef) {
	const hw = d.hw.startsWith("Jetson") ? "orin" : d.hw === "Raspberry Pi 4" ? "pi4" : "pi5";
	return `nw-${d.name.toLowerCase()}-${hw}`;
}

export function tailscaleIpFor(index: number) {
	return `100.64.${10 + Math.floor(index / 200)}.${(index % 200) + 21}`;
}

export function machineIdFor(index: number) {
	return String(100 + index);
}

export const VEHICLE_TYPE: Record<number, string> = {
	1: "Fixed Wing",
	2: "Quadrotor",
	13: "Hexarotor",
	14: "Octorotor",
	20: "VTOL", // what UAVcast reports for MAV_TYPE 20 (mav_vehicle_types.rs)
};

export function isFlyingNow(d: DroneDef) {
	return d.state === "flying";
}
export function isOnline(d: DroneDef) {
	return d.state === "flying" || d.state === "ground";
}
