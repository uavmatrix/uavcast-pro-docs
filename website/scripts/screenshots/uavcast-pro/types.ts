/**
 * Shared types for the UAVcast-Pro screenshot manifest.
 *
 * Text anywhere in a Target may be written as `t:<namespace>:<key.path>`.
 * The runner resolves it against the device's own locale files
 * (`/locales/<lng>/<ns>.json`), so the same manifest works for every UI language.
 * Plain strings are matched literally (English only), so prefer `t:` keys.
 */

export type Theme = "light" | "dark";

/** How to find an element on the page. */
export type Target =
	/** Any Playwright selector (CSS, `role=`, `text=`…). Must be locale-independent. */
	| { css: string; nth?: number }
	/**
	 * Element whose own text equals `text` (exact, trimmed), then walk up to the
	 * nearest ancestor matching `closest`. When several elements match, the one
	 * with the smallest area wins (the innermost panel). `within` scopes the search.
	 * `find` then picks a descendant (searching up to 4 ancestors wider), e.g. the
	 * `[role="combobox"]` that belongs to a field label.
	 */
	| { text: string; closest?: string; within?: string; find?: string; nth?: number }
	/** Shorthand for the innermost shadcn <Card> that contains `text`. */
	| { card: string; within?: string; find?: string }
	/** Fixed rectangle in CSS pixels (relative to the page). */
	| { clip: { x: number; y: number; width: number; height: number } }
	/** Bounding box that covers every listed target (e.g. a trigger and its open menu). */
	| { union: Target[] };

/**
 * Interactions that are allowed on the live device. There is deliberately no
 * "type", "check" or "select option": captures must never change device state.
 * Clicks are limited to things that only change what is shown (tabs, dropdown
 * triggers, dialog openers, collapsible groups). The network guard in capture.ts
 * enforces this a second time by aborting every non-GET request.
 */
export type Action =
	| { click: Target; why: "tab" | "open-dropdown" | "open-dialog" | "expand" | "local-only"; force?: boolean }
	| { hover: Target }
	| { press: string }
	| { wait: number }
	| { waitFor: Target; timeout?: number; optional?: boolean }
	/** Scroll the app's scroll container (main) so the target is in view. */
	| { scrollTo: Target; block?: "start" | "center" };

export interface Shot {
	/** `uavcast-pro/<screen>[--<state>]`. File name is derived from it. */
	id: string;
	/** Route on the device, e.g. `/flightcontroller?tab=ntrip`. */
	route: string;
	/** One-line, English description. Doubles as default alt text. */
	description: string;
	/** Other ids content writers might reasonably have used for this image. */
	aliases?: string[];
	/** Doc pages this image is meant for (from the audit). Informational. */
	pages?: string[];
	/** Default 1440×900. */
	viewport?: { width: number; height: number };
	/**
	 * Default both. Limiting a shot to ONE theme writes it as the primary file
	 * (no `.dark` suffix), for screens that look the same or only work in that theme.
	 */
	themes?: Theme[];
	/** Element that must be visible before anything else happens. */
	ready?: Target;
	/** Extra settle time after `ready` (ms). Default 1500. */
	settle?: number;
	actions?: Action[];
	/** Crop to this element (plus `padding`). Omit for the whole viewport. */
	target?: Target;
	/** Crop padding in CSS px. Default 14 (cards sit 20px apart, so neighbours stay out). */
	padding?: number;
	/**
	 * Grow the viewport height until the app's scroll container fits, so a long
	 * page is captured top to bottom (`--full` shots).
	 */
	fullPage?: boolean;
	/** Draw a docs-accent ring around this element. */
	highlight?: Target;
	/** Extra localStorage entries for this shot (e.g. to show the guided tour). */
	localStorage?: Record<string, string>;
	/**
	 * Override tRPC query results inside the capture browser only (the device is
	 * never touched). Key = procedure path, e.g. `auth.getSession`. Value = the
	 * plain JSON the procedure would return.
	 */
	mockTrpc?: Record<string, unknown>;
	/**
	 * URL substrings allowed to be POSTed. Only for requests the page itself makes
	 * on load to start a read-only live stream (e.g. MAVLink status streaming).
	 */
	allowPost?: string[];
	/** Where to park the mouse before the capture. Default: an empty header spot. */
	mouse?: { x: number; y: number };
	/** Extra CSS injected for this shot only. */
	css?: string;
	/** Skip in normal runs (kept for reference). */
	skip?: string;
}
