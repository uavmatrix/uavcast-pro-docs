/**
 * PostHog analytics (EU Cloud, cookieless). posthog-js is loaded after the page
 * has hydrated and the browser is idle, so it does not affect page speed.
 * Events sent before it loads are queued.
 *
 * Event names and properties are a contract with the PostHog dashboard. Don't
 * rename them (see docs-v2 contract, "Analytics (PostHog)").
 */
import type {PostHog} from 'posthog-js';

export type DocsEvent =
  | ['docs_search', {query: string; results_count: number}]
  | ['docs_search_result_clicked', {query: string; url: string; position: number}]
  | ['docs_feedback', {helpful: boolean; comment?: string; path: string}]
  | ['docs_code_copied', {path: string; language: string}]
  | ['docs_copy_page', {path: string}]
  | ['docs_outbound_click', {url: string; destination: 'store' | 'fleet-manager' | 'discord' | 'github' | 'email' | 'other'}]
  | ['docs_404', {path: string; referrer: string}]
  | ['docs_locale_switch', {from: string; to: string}]
  | ['docs_tab_selected', {group: string; value: string}]
  | ['docs_screenshot_zoom', {id: string}];

type Cfg = {token: string; host: string; uiHost: string};

let ph: PostHog | null = null;
let loading = false;
const queue: {event: string; props: Record<string, unknown>; beacon?: boolean}[] = [];

const SECTIONS = ['get-started', 'uavcast-pro', 'fleet-manager', 'guides', 'troubleshooting', 'reference'];

let localeBase = '/';
/** The locale's baseUrl ("/" for English, "/es/" for Spanish). */
export function setLocaleBase(base: string) {
  localeBase = base;
}

/** Path without the locale prefix, e.g. "/es/guides/x/" -> "/guides/x/". */
function docPath(pathname: string): string {
  return localeBase !== '/' && pathname.startsWith(localeBase) ? `/${pathname.slice(localeBase.length)}` : pathname;
}

export function sectionFor(pathname: string): string {
  const first = docPath(pathname).split('/').filter(Boolean)[0];
  if (!first) return 'home';
  return SECTIONS.includes(first) ? first : 'other';
}

function superProps() {
  return {
    environment: window.location.hostname === 'docs.uavmatrix.com' ? 'production' : 'preview',
    locale: document.documentElement.lang || 'en',
    section: sectionFor(window.location.pathname),
  };
}

export function track<E extends DocsEvent>(event: E[0], props: E[1], opts: {beacon?: boolean} = {}) {
  if (typeof window === 'undefined') return;
  if (ph) ph.capture(event, props, opts.beacon ? {transport: 'sendBeacon'} : undefined);
  else queue.push({event, props, beacon: opts.beacon});
}

export function currentPath() {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}

export async function initAnalytics(cfg: Cfg) {
  if (loading || ph || !cfg.token) return;
  loading = true;
  const {default: posthog} = await import('posthog-js');
  const debug = /[?&]ph_debug=1/.test(window.location.search);
  posthog.init(cfg.token, {
    api_host: cfg.host,
    ui_host: cfg.uiHost,
    defaults: '2025-05-24',
    cookieless_mode: 'always',
    person_profiles: 'identified_only',
    disable_session_recording: true,
    autocapture: true,
    enable_heatmaps: true,
    capture_dead_clicks: false,
    capture_performance: false,
    capture_pageview: 'history_change',
    capture_pageleave: true,
    respect_dnt: true,
    // ?ph_debug=1 logs every event and lets automated browsers through for verification.
    opt_out_useragent_filter: debug,
    mask_all_text: false,
    mask_all_element_attributes: false,
    session_recording: {maskAllInputs: true},
    disable_surveys: true,
    advanced_disable_feature_flags: true,
    // Section changes on every client-side navigation, so stamp it per event.
    before_send: (e) => {
      if (e) {
        e.properties = {...e.properties, ...superProps()};
        if (debug) {
          const {environment, locale, section} = e.properties;
          const own = Object.fromEntries(Object.entries(e.properties).filter(([k]) => !k.startsWith('$')));
          console.info('[docs analytics]', e.event, JSON.stringify({environment, locale, section, ...own}));
        }
      }
      return e;
    },
    loaded: (p) => {
      p.register(superProps());
      if (debug) p.debug(true);
    },
  });
  ph = posthog;
  for (const q of queue.splice(0)) ph.capture(q.event, q.props, q.beacon ? {transport: 'sendBeacon'} : undefined);
}

type Destination = DocsEvent extends infer T ? (T extends ['docs_outbound_click', infer P] ? P extends {destination: infer D} ? D : never : never) : never;

export function classifyOutbound(href: string): Destination | null {
  if (href.startsWith('mailto:')) return 'email';
  let u: URL;
  try {
    u = new URL(href, window.location.href);
  } catch {
    return null;
  }
  if (u.origin === window.location.origin) return null;
  const h = u.hostname.replace(/^www\./, '');
  if (h === 'fleet-manager.uavmatrix.com') return 'fleet-manager';
  if (h === 'uavmatrix.com' || h === 'store.uavmatrix.com') return 'store';
  if (h === 'discord.gg' || h.endsWith('discord.com')) return 'discord';
  if (h === 'github.com' || h.endsWith('.github.com')) return 'github';
  if (u.protocol === 'http:' || u.protocol === 'https:') return 'other';
  return null;
}
