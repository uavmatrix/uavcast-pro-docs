// The screenshot manifest: one entry per docs image id (fleet-manager/<screen>[--<state>]).
// The ids match the <Screenshot id="..."> references in website/docs/fleet-manager/**.
import type { Locator, Page } from "playwright";
import { mapView } from "./browser.ts";

export type Theme = "light" | "dark";
export interface Shot {
	id: string;
	description: string;
	path: string;
	as?: "owner" | "viewer" | "staff" | "newcomer" | null;
	org?: "main" | "sandbox";
	dark?: boolean; // capture a .dark variant (default true)
	viewport?: { width: number; height: number };
	mobile?: boolean;
	ls?: (theme: Theme) => Record<string, string>;
	tiles?: boolean;
	toasts?: boolean;
	fullPage?: boolean;
	css?: string;
	before?: () => Promise<void>;
	after?: () => Promise<void>;
	action?: (page: Page, theme: Theme) => Promise<void>;
	/** Crop to an element, padded. */
	crop?: (page: Page) => Locator;
	pad?: number;
}

export interface Ctx {
	seed: any;
	sql: (q: string, p?: unknown[]) => Promise<unknown>;
}

export const mapLs =
	(layer: "light" | "dark" | "satellite" | "auto", extra: Record<string, string> = {}) =>
	(theme: Theme) => {
		const l = layer === "auto" ? (theme === "dark" ? "dark" : "light") : layer;
		return {
			"fleet-map-layer": l,
			"mission-planner-map-layer": l,
			"fleet-map-trail-visible": "true",
			"fleet-map-heading-line-visible": "true",
			"fleet-map-marker-tooltip-visible": "true",
			"fleet-map-tooltip-permanent": "true",
			"fleet-map-drone-filter": "all",
			"fleet-map-airspace-visible": "false",
			...extra,
		};
	};

const card = (p: Page, text: string | RegExp) => p.getByText(text).first().locator("xpath=ancestor::*[@data-slot='card'][1]");

/** Open a Leaflet marker popup by drone name (markers carry permanent name tooltips). */
export async function openMarker(page: Page, name: string, zoom = 14) {
	await page.waitForFunction(() => (window as any).__maps?.length > 0);
	const ok = await page.evaluate(
		({ name, zoom }) => {
			const maps = (window as any).__maps;
			const map = maps[maps.length - 1];
			let hit: any = null;
			map.eachLayer((l: any) => {
				const text = l.getTooltip?.()?.getElement?.()?.textContent ?? "";
				if (!hit && (text === name || text.startsWith(`${name} `) || text.startsWith(`⚠ ${name} `))) hit = l;
			});
			if (hit) {
				map.setView(hit.getLatLng(), zoom, { animate: false });
				hit.openPopup();
			}
			return !!hit;
		},
		{ name, zoom },
	);
	if (!ok) throw new Error(`marker ${name} not found`);
	await page.waitForSelector(".leaflet-popup", { timeout: 10_000 });
}

/** Pan so the open popup is fully visible below the header. */
async function panForPopup(page: Page) {
	await page.evaluate(() => {
		const maps = (window as any).__maps;
		const map = maps[maps.length - 1];
		map.panBy([0, -220], { animate: false });
	});
}

/** Mission planner: optionally collapse the waypoint drawer, then fit the map to the waypoints. */
async function fitMission(page: Page, collapse: boolean, bottomPad = 60) {
	if (collapse) {
		await page.locator("div.absolute.bottom-0.left-0.right-0 > button").filter({ hasText: /Waypoints/ }).first().click();
		await page.waitForTimeout(500);
	}
	await page.evaluate((bottomPad) => {
		const maps = (window as any).__maps;
		const map = maps[maps.length - 1];
		const pts: any[] = [];
		map.eachLayer((l: any) => {
			if (l.getLatLng && l.options?.icon) pts.push(l.getLatLng());
		});
		if (pts.length) map.fitBounds((window as any).L.latLngBounds(pts), { paddingTopLeft: [60, 90], paddingBottomRight: [60, bottomPad], animate: false });
	}, bottomPad);
	await page.waitForTimeout(1500);
}

/** Blur the VPN auth key wherever it is printed (it is fake, but docs should model good practice). */
async function blurAuthKey(page: Page) {
	await page.addStyleTag({ content: ".fm-blur { filter: blur(5px); }" });
	await page.evaluate(() => {
		const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
		const hits: Text[] = [];
		let n: Node | null;
		while ((n = walker.nextNode())) if (/hskey-auth-[A-Za-z0-9_-]+/.test(n.textContent ?? "")) hits.push(n as Text);
		for (const t of hits) {
			const m = (t.textContent ?? "").match(/hskey-auth-[A-Za-z0-9_-]+/);
			if (!m || !t.parentNode) continue;
			const idx = (t.textContent ?? "").indexOf(m[0]);
			const after = t.splitText(idx);
			after.splitText(m[0].length);
			const span = document.createElement("span");
			span.className = "fm-blur";
			span.textContent = m[0];
			after.parentNode?.replaceChild(span, after);
		}
	});
}

const ROTTERDAM: [number, number, number] = [51.927, 4.163, 12];
const MAASVLAKTE: [number, number, number] = [51.958, 4.04, 13];
const INDICATORS: [number, number, number] = [51.8842, 4.4339, 16];
const PHONE = { width: 390, height: 844 };

export function buildShots({ seed, sql }: Ctx): Shot[] {
	const drone = (name: string) => seed.drones[name] as string;
	const setCert = (names: string[], v: number) => async () => {
		await sql(`UPDATE "Drone" SET "certVersion"=$1 WHERE name = ANY($2)`, [v, names]);
	};
	// Re-arm the wizard's pairing codes. Deleting the paired drone would cascade-delete its
	// PairingCode row, so detach first and re-insert any code that is missing.
	const pairingReset = async () => {
		await sql(`UPDATE "PairingCode" SET "droneId"=NULL WHERE code = ANY($1)`, [seed.pairing.rows.map((r: any) => r.code)]);
		await sql(`DELETE FROM "Drone" WHERE "deviceId" = $1`, [seed.pairing.deviceId]);
		for (const r of seed.pairing.rows) {
			await sql(
				`INSERT INTO "PairingCode" (id, code, "expiresAt", used, "createdAt", "deviceInfo")
				 VALUES ($1, $2, now() + interval '6 hours', false, now(), $3)
				 ON CONFLICT (code) DO UPDATE SET used=false, "usedAt"=NULL, "droneId"=NULL,
				   "expiresAt" = CASE WHEN EXCLUDED.code = $4 THEN now() - interval '20 minutes' ELSE now() + interval '6 hours' END`,
				[`pc_docs_${r.code}`, r.code, JSON.stringify(r.deviceInfo), seed.pairing.expired],
			);
		}
		await sql(`UPDATE "PairingCode" SET "expiresAt" = now() - interval '20 minutes' WHERE code = $1`, [seed.pairing.expired]);
	};
	const pairTo = async (page: Page, step: "org" | "code" | "confirm" | "vpn" | "complete", code = seed.pairing.ok) => {
		await page.getByRole("combobox").first().click();
		await page.getByRole("option", { name: "Nordwind Aerial Services" }).click();
		if (step === "org") return;
		await page.getByRole("button", { name: "Continue" }).click();
		await page.getByPlaceholder("Enter 8-digit code").fill(code);
		if (step === "code") return;
		await page.getByRole("button", { name: "Continue" }).click();
		await page.getByText("Confirm Device").first().waitFor();
		if (step === "confirm") return;
		await page.getByRole("button", { name: "Continue" }).click();
		await page.getByText("VPN Connection").first().waitFor();
		if (step === "vpn") return;
		await page.getByRole("button", { name: "Complete Pairing" }).click();
		await page.getByText("UAV Name").first().waitFor({ timeout: 20_000 });
		const name = page.locator("#drone-name");
		await name.fill("NW-055 Survey");
	};
	const openOps = async (page: Page, name: string) => {
		const cardEl = page.locator("div", { has: page.getByText(name, { exact: true }) }).filter({ has: page.getByRole("button", { name: "Operations" }) }).last();
		await cardEl.getByRole("button", { name: "Operations" }).click();
		await page.getByText("Flight Mode", { exact: true }).first().waitFor();
		await page.waitForTimeout(1500);
	};

	return [
		// ------------------------------------------------------------ sign-in & onboarding
		{ id: "fleet-manager/landing", description: "Public Fleet Manager landing page.", path: "/", as: null },
		{
			id: "fleet-manager/onboarding--create-organization",
			description: "Create Organization dialog on first sign-in, filled in with a company name.",
			path: "/onboarding",
			as: "newcomer",
			action: async (p) => {
				await p.getByRole("button", { name: /Create Organization/ }).first().click();
				const d = p.getByRole("dialog");
				await d.waitFor();
				await d.locator("input").first().fill("Nordic Aerial Survey AS");
				const desc = d.locator("textarea");
				if (await desc.count()) await desc.first().fill("Coastal and offshore inspection");
			},
		},
		{
			id: "fleet-manager/dashboard--organization-switcher",
			description: "Organization switcher open in the sidebar.",
			path: "/dashboard",
			action: async (p) => {
				await p.locator('[data-sidebar="header"] button, [data-slot="sidebar-header"] button').first().click();
				await p.getByRole("menu").waitFor();
				await p.waitForTimeout(300);
			},
		},
		{
			id: "fleet-manager/invite",
			description: "Invitation page as the invitee sees it, with Accept Invitation.",
			path: `/invite/${seed.inviteToken}`,
			as: "newcomer",
		},

		// ------------------------------------------------------------ dashboard
		{ id: "fleet-manager/dashboard", description: "Dashboard of a large operator: stats, UAV status and recent team activity.", path: "/dashboard" },
		{ id: "fleet-manager/dashboard--getting-started", description: "Getting-started checklist in a new organization without UAVs.", path: "/dashboard", org: "sandbox" },

		// ------------------------------------------------------------ fleet & UAV details
		{ id: "fleet-manager/fleet", description: "Fleet page: UAV cards with status, battery and last seen.", path: "/fleet" },
		{
			id: "fleet-manager/fleet--repair-required",
			description: "Fleet page with the re-pair banner and Re-pair required badges.",
			path: "/fleet",
			before: setCert(["Aqua-33", "Harbor-15"], 1),
			after: setCert(["Aqua-33", "Harbor-15"], 2),
		},
		{ id: "fleet-manager/drone-detail", description: "UAV details, Overview tab: UAVcast Application and MAVLink / Flight Controller cards.", path: `/drones/${drone("Survey-01")}` },
		{ id: "fleet-manager/drone-detail--full", description: "UAV details Overview, full length incl. Connected Ground Stations.", path: `/drones/${drone("Survey-01")}`, fullPage: true, dark: false },
		{ id: "fleet-manager/drone-detail--ground-stations", description: "Connected Ground Stations card on the UAV details page.", path: `/drones/${drone("Survey-01")}`, crop: (p) => card(p, "Connected Ground Stations") },
		{
			id: "fleet-manager/drone-detail--proxy-warning",
			description: "Remote UAVcast Access via Proxy warning dialog.",
			path: `/drones/${drone("Survey-01")}`,
			action: async (p) => {
				await p.getByRole("button", { name: "Open via Proxy" }).click();
				await p.getByRole("dialog").waitFor();
			},
		},
		{
			id: "fleet-manager/drone-detail--terminal",
			description: "Terminal tab: SSH session after the df -h quick command.",
			path: `/drones/${drone("Survey-01")}`,
			action: async (p) => {
				await p.getByRole("tab", { name: "Terminal" }).click();
				await p.waitForTimeout(3000); // let the page's live socket authenticate first
				await p.getByRole("button", { name: "Connect", exact: true }).click();
				const prompt = p.locator(".xterm-rows").getByText("uavcast@").first();
				if (!(await prompt.waitFor({ timeout: 12_000 }).then(() => true).catch(() => false))) {
					await p.getByRole("button", { name: /Reconnect|Connect/ }).first().click();
					await prompt.waitFor({ timeout: 15_000 });
				}
				await p.getByRole("button", { name: "uptime" }).click();
				await p.waitForTimeout(500);
				await p.getByRole("button", { name: "df -h" }).click();
				await p.waitForTimeout(800);
			},
		},
		{
			id: "fleet-manager/drone-detail--logs",
			description: "Logs tab streaming MAVLink messages.",
			path: `/drones/${drone("Survey-01")}`,
			action: async (p) => {
				await p.getByRole("tab", { name: "Logs" }).click();
				await p.waitForTimeout(5000);
			},
		},
		{
			id: "fleet-manager/drone-detail--actions",
			description: "Actions tab with the Confirm Reboot dialog asking to type reboot.",
			path: `/drones/${drone("Survey-09")}`,
			action: async (p) => {
				await p.getByRole("tab", { name: "Actions" }).click();
				await p.getByRole("button", { name: /Reboot/ }).first().click();
				const d = p.getByRole("dialog");
				await d.waitFor();
				await d.locator("input").first().fill("reboot");
			},
		},
		{
			id: "fleet-manager/drone-detail--actions-tab",
			description: "Actions tab: System Actions and command history.",
			path: `/drones/${drone("Survey-01")}`,
			action: async (p) => {
				await p.getByRole("tab", { name: "Actions" }).click();
				await p.waitForTimeout(800);
			},
		},
		{
			id: "fleet-manager/drone-detail--repair-required",
			description: "UAV page with the This UAV must be re-paired banner.",
			path: `/drones/${drone("Patrol-19")}`,
			before: setCert(["Patrol-19"], 1),
			after: setCert(["Patrol-19"], 2),
		},
		{
			id: "fleet-manager/drone-detail--delete",
			description: "Delete UAV confirmation dialog for a retired airframe.",
			path: `/drones/${drone("Survey-54")}`,
			action: async (p) => {
				await p.getByRole("button", { name: "Remove" }).click();
				await p.getByRole("dialog").or(p.getByRole("alertdialog")).first().waitFor();
			},
		},

		// ------------------------------------------------------------ control panel (drawer)
		{
			id: "fleet-manager/control-panel",
			description: "UAV Control Panel: Flight Mode, Mission and Actions columns for a quadcopter in LOITER.",
			path: "/fleet",
			action: async (p) => {
				await openOps(p, "Inspect-07");
				const sel = p.getByRole("combobox").filter({ hasText: /Select mission/ });
				if (await sel.count()) {
					await sel.first().click();
					await p.getByRole("option", { name: /Maasvlakte quay wall survey/ }).click();
				}
				await p.waitForTimeout(600);
			},
		},
		{
			id: "fleet-manager/control-panel--mode-confirm",
			description: "Flight mode confirmation for LAND, which must be typed to confirm.",
			path: "/fleet",
			action: async (p) => {
				await openOps(p, "Inspect-07");
				await p.getByRole("button", { name: /^Loiter/ }).first().click();
				await p.getByRole("menuitem", { name: /^Land$/ }).first().click();
				await p.getByRole("dialog").or(p.getByRole("alertdialog")).last().waitFor();
				await p.waitForTimeout(400);
			},
		},
		{
			id: "fleet-manager/control-panel--arm-confirm",
			description: "Arm confirmation with the propeller warning and Force arm option.",
			path: "/fleet",
			action: async (p) => {
				await openOps(p, "Inspect-12");
				await p.getByRole("button", { name: "Arm", exact: true }).click();
				await p.getByText(/Confirm Arm/).waitFor();
				await p.waitForTimeout(400);
			},
		},

		// ------------------------------------------------------------ fleet map
		{
			id: "fleet-manager/map",
			description: "Live fleet map, Dark style, over the Port of Rotterdam: armed UAVs with heading lines and 5-minute trails.",
			path: "/map",
			tiles: true,
			ls: mapLs("dark"),
			action: async (p) => {
				await mapView(p, ...ROTTERDAM);
				await p.waitForTimeout(2500);
			},
		},
		{
			id: "fleet-manager/map--satellite",
			description: "Live fleet map on Satellite over the Port of Rotterdam.",
			path: "/map",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await mapView(p, ...ROTTERDAM);
				await p.waitForTimeout(2500);
			},
		},
		{
			id: "fleet-manager/map--close-up",
			description: "Fleet map close-up at Maasvlakte: survey grids and an inspection orbit in progress.",
			path: "/map",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await mapView(p, ...MAASVLAKTE);
				await p.waitForTimeout(2500);
			},
		},
		{ id: "fleet-manager/map--overview", description: "Fleet map fitted to all 46 UAVs across Norway, Rotterdam and Texas.", path: "/map", tiles: true, ls: mapLs("auto"), action: async (p) => p.waitForTimeout(2000) },
		{
			id: "fleet-manager/map--indicators",
			description: "Marker states close-up: healthy, OFFLINE with clock badge, NO MAVLINK and WEAK GPS.",
			path: "/map",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await mapView(p, ...INDICATORS);
				await p.waitForTimeout(2500);
			},
		},
		{
			id: "fleet-manager/map--popup",
			description: "Popup for an armed survey UAV in AUTO, with Follow, History and Controls.",
			path: "/map",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await openMarker(p, "Survey-01", 14);
				await panForPopup(p);
				await p.waitForTimeout(1500);
			},
		},
		{
			id: "fleet-manager/map--follow",
			description: "Follow mode on a fixed-wing flying a pipeline corridor.",
			path: "/map",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await openMarker(p, "Pipe-41", 14);
				await p.locator(".leaflet-popup").getByRole("button", { name: "Follow" }).click();
				await p.waitForTimeout(5000);
			},
		},
		{
			id: "fleet-manager/map--settings",
			description: "Map Settings panel: Airspace Layers on, Drone Filter Online Only, Map Style Satellite.",
			path: "/map",
			tiles: true,
			ls: mapLs("satellite", { "fleet-map-airspace-visible": "true", "fleet-map-drone-filter": "online" }),
			action: async (p) => {
				await mapView(p, ...ROTTERDAM);
				await p.locator("button:has(svg.lucide-settings-2)").first().click();
				await p.getByText("Map Settings").waitFor();
				await p.waitForTimeout(800);
			},
		},
		{
			id: "fleet-manager/map--history",
			description: "Flight history drawer: session picker, playback, flight stats and the replayed path.",
			path: "/map",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await openMarker(p, "Inspect-22", 14);
				await p.locator(".leaflet-popup").getByRole("button", { name: "History" }).click();
				await p.getByText("Flight History").first().waitFor();
				await p.waitForTimeout(2500);
				// pick the saved (bookmarked) flight, 4x playback, scrub to ~45 %
				await p.getByRole("combobox").filter({ hasText: /AM|PM/ }).first().click();
				await p.getByRole("option").filter({ has: p.locator("svg.lucide-bookmark") }).first().click();
				await p.waitForTimeout(3000);
				await p.getByRole("combobox").filter({ hasText: /^\s*1x/ }).first().click();
				await p.getByRole("option", { name: "4x" }).click();
				const track = p.locator('[data-slot="slider"]').first();
				const box = await track.boundingBox();
				if (box) await p.mouse.click(box.x + box.width * 0.45, box.y + box.height / 2);
				await p.waitForTimeout(2500);
			},
		},

		// ------------------------------------------------------------ missions
		{
			id: "fleet-manager/missions",
			description: "Mission Planner on Satellite with a saved survey grid, takeoff and Return to Launch.",
			path: "/missions",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await p.getByRole("button", { name: "Missions" }).click();
				await p.getByRole("menuitem", { name: /Maasvlakte quay wall survey/ }).click();
				await fitMission(p, true);
			},
		},
		{
			id: "fleet-manager/missions--waypoint-drawer",
			description: "Waypoint drawer: Takeoff, waypoints, Change Speed and Return to Launch.",
			path: "/missions",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await p.getByRole("button", { name: "Missions" }).click();
				await p.getByRole("menuitem", { name: /Maasvlakte quay wall survey/ }).click();
				await p.waitForTimeout(2000);
			},
			crop: (p) => p.locator("div.absolute.bottom-0.left-0.right-0").filter({ hasText: /Waypoints/ }).first(),
			pad: 0,
		},
		{
			id: "fleet-manager/missions--upload",
			description: "Upload Mission to Drone dialog with the online UAVs to choose from.",
			path: "/missions",
			tiles: true,
			ls: mapLs("satellite"),
			action: async (p) => {
				await p.getByRole("button", { name: "Missions" }).click();
				await p.getByRole("menuitem", { name: /Maasvlakte quay wall survey/ }).click();
				await fitMission(p, true);
				await p.getByRole("button", { name: /Upload to Drone/ }).click();
				const d = p.getByRole("dialog");
				await d.waitFor();
				await d.getByRole("combobox").first().click();
				await p.waitForTimeout(500);
			},
		},

		// ------------------------------------------------------------ network & VPN
		{ id: "fleet-manager/network", description: "Network page, Devices tab: device counters, GCS connection command, Push to Drone and the devices table (full length).", path: "/network", fullPage: true, action: blurAuthKey },
		{ id: "fleet-manager/network--top", description: "Network page, Devices tab, first screen: counters and Connect a Device.", path: "/network", action: blurAuthKey },
		{
			id: "fleet-manager/network--enable",
			description: "Network page before VPN is enabled, with Enable VPN Network.",
			path: "/network",
			org: "sandbox",
		},
		{
			id: "fleet-manager/network--connect-device",
			description: "Connect a Device card with the GCS Computer Only warning and the tailscale up command (auth key blurred).",
			path: "/network",
			action: blurAuthKey,
			crop: (p) => card(p, "Connect a Device"),
		},
		{
			id: "fleet-manager/network--devices",
			description: "Connected devices table: ground stations and UAVs with VPN IPs and status.",
			path: "/network",
			fullPage: true,
			crop: (p) => card(p, "Devices connected to your organization's VPN network"),
		},
		{
			id: "fleet-manager/network--device-actions",
			description: "Device actions menu: Rename, Change Type, Remove.",
			path: "/network",
			action: async (p) => {
				await blurAuthKey(p);
				const search = p.getByPlaceholder("Search devices...");
				await search.scrollIntoViewIfNeeded();
				await search.fill("Bergen");
				await p.waitForTimeout(500);
				const row = p.getByRole("row", { name: /Bergen Control Room/ }).first();
				await row.scrollIntoViewIfNeeded();
				await row.getByRole("button").last().click();
				await p.getByRole("menu").waitFor();
			},
		},
		{
			id: "fleet-manager/network--setup-wizard",
			description: "Configure dialog: What type of device is this? with Ground Control Station selected.",
			path: "/network",
			action: async (p) => {
				await blurAuthKey(p);
				const search = p.getByPlaceholder("Search devices...");
				await search.scrollIntoViewIfNeeded();
				await search.fill("ops-laptop");
				await p.waitForTimeout(500);
				const btn = p.getByRole("button", { name: "Configure" }).first();
				await btn.scrollIntoViewIfNeeded();
				await btn.click();
				const d = p.getByRole("dialog");
				await d.waitFor();
				const gcs = d.getByText(/Ground Control Station/).first();
				if (await gcs.count()) await gcs.click();
				await p.waitForTimeout(400);
			},
		},
		{ id: "fleet-manager/network--stream-bindings", description: "Stream Bindings: GCS, UAV, video/telemetry switches and incrementing ports.", path: "/network?tab=stream-bindings" },
		{
			id: "fleet-manager/network--add-binding",
			description: "Add Stream Binding dialog with drone and ground station selected.",
			path: "/network?tab=stream-bindings",
			action: async (p) => {
				await p.getByRole("button", { name: "Add Binding" }).click();
				const d = p.getByRole("dialog");
				await d.waitFor();
				const boxes = d.getByRole("combobox");
				if ((await boxes.count()) >= 2) {
					await boxes.nth(0).click();
					await p.getByRole("option", { name: /Mapper-14/ }).first().click();
					await boxes.nth(1).click();
					await p.getByRole("option", { name: /Maasvlakte Field Laptop/ }).first().click();
				}
				await p.waitForTimeout(300);
			},
		},
		{ id: "fleet-manager/network--settings", description: "Network Settings tab.", path: "/network?tab=settings" },

		// ------------------------------------------------------------ team
		{ id: "fleet-manager/team", description: "Team Management: Owner, Admins, Viewers and pending invitations.", path: "/team" },
		{ id: "fleet-manager/team--full", description: "Team Management, full length incl. pending invitations.", path: "/team", fullPage: true, dark: false },
		{
			id: "fleet-manager/team--invite",
			description: "Invite Team Member dialog with Role set to Viewer.",
			path: "/team",
			action: async (p) => {
				await p.getByRole("button", { name: "Invite Member" }).click();
				const d = p.getByRole("dialog");
				await d.waitFor();
				await d.locator("input").first().fill("client.contact@example.com");
				await d.getByRole("combobox").first().click();
				await p.getByRole("option", { name: "Nordwind Aerial Services" }).click();
				await p.waitForTimeout(300);
			},
		},
		{
			id: "fleet-manager/team--member-menu",
			description: "Member menu opened by the Owner: Change Role, Transfer Ownership, Remove Member.",
			path: "/team",
			action: async (p) => {
				const row = p.locator("div", { has: p.getByText("lars.mikkelsen@example.com") }).filter({ has: p.getByRole("button") }).last();
				await row.getByRole("button").last().click();
				await p.getByRole("menu").waitFor();
				await p.waitForTimeout(300);
			},
		},

		// ------------------------------------------------------------ settings, support, status
		{ id: "fleet-manager/settings--profile", description: "Settings, Profile tab.", path: "/settings" },
		{ id: "fleet-manager/settings--organizations", description: "Settings, Organizations tab for the Owner.", path: "/settings?tab=organizations" },
		{ id: "fleet-manager/settings--history", description: "Settings, History tab: storage, retention and per-UAV telemetry.", path: "/settings?tab=history" },
		{ id: "fleet-manager/settings--support", description: "Settings, Support tab: your support tickets.", path: "/settings?tab=support" },
		{
			id: "fleet-manager/support-bubble--fleetbot",
			description: "Support panel, FleetBot tab, answering how to add a stream binding.",
			path: "/fleet",
			action: async (p) => {
				await p.route("**/api/chat/fleetbot", (r) =>
					r.fulfill({
						json: {
							content:
								"Open [Network → Stream Bindings](/network?tab=stream-bindings) and click **Add Binding**. Pick the UAV and the ground station that should receive its video and telemetry.\n\nPorts are assigned automatically: the first UAV on a ground station uses 5600 (video) and 14550 (telemetry), the next one 5601 and 14551, and so on.",
						},
					}),
				);
				await p.getByRole("button", { name: "Open support" }).click();
				await p.getByPlaceholder("Ask FleetBot...").fill("How do I send video from Survey-09 to the field laptop?");
				await p.keyboard.press("Enter");
				await p.getByText("assigned automatically").waitFor();
				await p.waitForTimeout(600);
			},
		},
		{
			id: "fleet-manager/support-bubble--ticket",
			description: "Support panel, Ticket tab filled in as a bug report.",
			path: "/fleet",
			action: async (p) => {
				await p.getByRole("button", { name: "Open support" }).click();
				await p.getByRole("button", { name: "Ticket" }).click();
				await p.getByRole("combobox").last().click();
				await p.getByRole("option", { name: /Bug/ }).click();
				await p.getByPlaceholder("Brief description of your issue").fill("Survey-55 stuck on PAIRING");
				await p.getByPlaceholder("Please describe your issue in detail...").fill("After pairing, Survey-55 has shown PAIRING for 20 minutes. UAVcast says connected. Re-entering a new code gives the same result.");
				await p.waitForTimeout(300);
			},
		},
		{ id: "fleet-manager/status", description: "System Status: all systems operational, with past incidents.", path: "/status" },

		// ------------------------------------------------------------ pairing wizard
		{ id: "fleet-manager/pair-device--organization", description: "Pair UAV, Organization step.", path: "/fleet/pairing", before: pairingReset, action: (p) => pairTo(p, "org") },
		{ id: "fleet-manager/pair-device--code", description: "Pair UAV, Pairing Code step with an 8-digit code entered.", path: "/fleet/pairing", before: pairingReset, action: (p) => pairTo(p, "code") },
		{ id: "fleet-manager/pair-device--confirm", description: "Pair UAV, Confirm Device step: name, hostname, OS, architecture, UAVcast version.", path: "/fleet/pairing", before: pairingReset, action: (p) => pairTo(p, "confirm") },
		{ id: "fleet-manager/pair-device--vpn", description: "Pair UAV, VPN Connection step with Enable VPN for this UAV ticked.", path: "/fleet/pairing", before: pairingReset, action: (p) => pairTo(p, "vpn") },
		{ id: "fleet-manager/pair-device--complete", description: "Pairing Complete with the UAV Name being edited.", path: "/fleet/pairing", before: pairingReset, after: pairingReset, action: (p) => pairTo(p, "complete") },
		{
			id: "fleet-manager/pair-device--code-expired",
			description: "Pairing error toast: This pairing code has expired.",
			path: "/fleet/pairing",
			toasts: true,
			action: async (p) => {
				await pairTo(p, "code", seed.pairing.expired);
				await p.getByRole("button", { name: "Continue" }).click();
				await p.getByText("This pairing code has expired").waitFor();
				await p.waitForTimeout(300);
			},
		},
		{
			id: "fleet-manager/pair-device--license-not-owned",
			description: "Pairing error toast: License is not owned by any member of this organization.",
			path: "/fleet/pairing",
			toasts: true,
			before: pairingReset,
			after: pairingReset,
			action: async (p) => {
				await pairTo(p, "vpn", seed.pairing.foreign);
				await p.getByRole("button", { name: "Complete Pairing" }).click();
				await p.getByText("License is not owned by any member of this organization").waitFor();
				await p.waitForTimeout(300);
			},
		},

		// ------------------------------------------------------------ admin: extra license e-mails
		{
			id: "fleet-manager/admin-user--license-emails",
			description: "Admin user page (UAVmatrix staff): extra license e-mails counted as this user's when pairing.",
			path: `/admin/users/${seed.ownerId}`,
			as: "staff",
			fullPage: true,
			crop: (p) => card(p, /License E-?mails/i),
		},

		// ------------------------------------------------------------ lite view (phone)
		{ id: "fleet-manager/lite", description: "Lite view on a 390x844 phone: fleet list.", path: "/lite", viewport: PHONE, mobile: true },
		{ id: "fleet-manager/lite--drone", description: "Lite view for an armed UAV in AUTO: status cards and controls.", path: `/lite/${drone("Survey-01")}`, viewport: PHONE, mobile: true },
	];
}
