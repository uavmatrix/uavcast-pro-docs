/**
 * Old URL -> new URL map for docs.uavmatrix.com (audit section 6).
 *
 * This file is data only. `plugins/redirects` resolves it at build time:
 *
 * - Every target is a list of candidate pages, best match first. The first
 *   candidate that exists in the build wins, so the map keeps working while the
 *   information architecture settles. A redirect whose candidates all miss is
 *   dropped and reported (.docusaurus/redirects-report.json and the console).
 * - The resolved map is written as static meta-refresh pages (with a canonical
 *   link to the target) through @docusaurus/plugin-client-redirects. The site
 *   is hosted on GitHub Pages, which cannot send server-side 301s.
 *
 * Sources: the old MkDocs site (2019 to Nov 2024) at the root and under /4.x,
 * /4x, /5.x, /5, /latest and /site (from the seo-quick-wins map, 294 URLs),
 * links baked into installed copies of UAVcast-Pro (/licensing, /installation/),
 * and every Docusaurus-era /docs/{4.x,5.x,6.x}/* URL.
 */

/** Candidate pages per topic, best match first. All paths use a trailing slash. */
export const targets = {
  home: ['/'],
  uavcastOverview: ['/uavcast-pro/', '/get-started/', '/'],
  installation: [
    '/get-started/installation/',
    '/get-started/install-uavcast-pro/',
    '/uavcast-pro/installation/',
    '/get-started/',
  ],
  hardware: [
    '/get-started/hardware-requirements/',
    '/uavcast-pro/hardware-requirements/',
    '/reference/supported-hardware/',
    '/get-started/',
  ],
  license: [
    '/get-started/license-activation/',
    '/get-started/licensing/',
    '/get-started/activate-license/',
    '/uavcast-pro/license-activation/',
    '/get-started/',
  ],
  quickStart: [
    '/get-started/quick-start/',
    '/uavcast-pro/quick-start/',
    '/get-started/',
  ],
  dashboard: [
    '/uavcast-pro/dashboard/',
    '/uavcast-pro/system/dashboard/',
    '/uavcast-pro/system/',
    '/uavcast-pro/',
  ],
  flightController: [
    '/uavcast-pro/flight-controller/',
    '/uavcast-pro/flight-controller/connection/',
    '/uavcast-pro/',
  ],
  rtk: [
    '/uavcast-pro/flight-controller/ntrip-rtk/',
    '/guides/rtk-ntrip-caster/',
    '/uavcast-pro/ntrip-rtk/',
    '/guides/rtk-ntrip/',
    '/uavcast-pro/flight-controller/',
  ],
  injectors: [
    '/uavcast-pro/flight-controller/injectors/',
    '/uavcast-pro/injectors/',
    '/uavcast-pro/flight-controller/',
  ],
  inboundLinks: [
    '/uavcast-pro/flight-controller/inbound-links/',
    '/uavcast-pro/inbound-links/',
    '/uavcast-pro/flight-controller/',
  ],
  dataStreams: ['/uavcast-pro/data-streams/', '/uavcast-pro/'],
  groundControl: [
    '/uavcast-pro/ground-stations/',
    '/uavcast-pro/ground-control-stations/',
    '/uavcast-pro/ground-control/',
    '/uavcast-pro/',
  ],
  map: ['/uavcast-pro/flight-map/', '/uavcast-pro/'],
  cockpit: [
    '/uavcast-pro/flight-map/cockpit-hud/',
    '/uavcast-pro/flight-map/',
    '/uavcast-pro/',
  ],
  camera: ['/uavcast-pro/camera/', '/uavcast-pro/'],
  receiveVideo: [
    '/uavcast-pro/ground-stations/vlc-and-rtsp/',
    '/uavcast-pro/ground-stations/',
    '/uavcast-pro/guides/receive-video/',
    '/uavcast-pro/camera/',
    '/uavcast-pro/',
  ],
  cellModem: [
    '/uavcast-pro/connectivity/cellular-modem/',
    '/uavcast-pro/cellular-modem/',
    '/uavcast-pro/connectivity/',
    '/uavcast-pro/',
  ],
  vpn: [
    '/uavcast-pro/connectivity/vpn/',
    '/uavcast-pro/vpn/',
    '/uavcast-pro/connectivity/',
    '/uavcast-pro/',
  ],
  bvlos4g: ['/guides/bvlos-4g/', '/guides/'],
  zerotier: [
    '/guides/zerotier/',
    '/uavcast-pro/guides/zerotier/',
    '/uavcast-pro/connectivity/vpn/',
    '/uavcast-pro/',
  ],
  dynamicDns: [
    '/uavcast-pro/connectivity/dynamic-dns/',
    '/uavcast-pro/dynamic-dns/',
    '/uavcast-pro/connectivity/',
    '/uavcast-pro/',
  ],
  networks: [
    '/uavcast-pro/connectivity/networks/',
    '/uavcast-pro/networks/',
    '/uavcast-pro/connectivity/',
    '/uavcast-pro/',
  ],
  settings: [
    '/uavcast-pro/application-settings/',
    '/uavcast-pro/system/settings/',
    '/uavcast-pro/settings/',
    '/uavcast-pro/system/',
    '/uavcast-pro/',
  ],
  users: [
    '/uavcast-pro/users/',
    '/uavcast-pro/system/users/',
    '/uavcast-pro/system/',
    '/uavcast-pro/',
  ],
  troubleshooting: [
    '/troubleshooting/',
    '/uavcast-pro/troubleshooting/',
    '/',
  ],
  faq: [
    '/troubleshooting/faq/',
    '/uavcast-pro/faq/',
    '/faq/',
    '/troubleshooting/',
  ],
  changelog: [
    '/reference/changelog/',
    '/uavcast-pro/changelog/',
    '/changelog/',
    '/uavcast-pro/',
  ],
  openSourceLicenses: [
    '/reference/open-source-licenses/',
    '/uavcast-pro/reference/open-source-licenses/',
    '/reference/',
    '/uavcast-pro/',
  ],
  updating: ['/get-started/updating/', '/uavcast-pro/application-settings/', '/get-started/'],
  search: ['/search/'],
} as const satisfies Record<string, readonly string[]>;

export type TargetKey = keyof typeof targets;

/**
 * Pages of the old MkDocs site, relative to the site root or to one of
 * `legacyPrefixes`. Mixed-case paths also get an all-lowercase variant,
 * because static hosts match paths case-sensitively.
 */
const legacyPages: Record<string, TargetKey> = {
  installation: 'installation',
  'application-update': 'updating',
  hardware: 'hardware',
  how_it_works: 'uavcastOverview',
  'license/license': 'license',
  libraries: 'openSourceLicenses',
  changelog: 'changelog',
  troubleshooting: 'troubleshooting',
  'pages/Dashboard': 'dashboard',
  'pages/Application': 'settings',
  'pages/Flight-Controller': 'flightController',
  'pages/Ground-Control': 'groundControl',
  'pages/Map': 'map',
  'pages/Cockpit': 'cockpit',
  'pages/Camera': 'camera',
  'pages/camera/Configuration': 'camera',
  'pages/camera/HTTP Videostream': 'receiveVideo',
  'pages/Cell-Modem': 'cellModem',
  'pages/Vpn': 'zerotier',
  'pages/Dynamic-DNS': 'dynamicDns',
  'pages/raspberry/diagnostic': 'dashboard',
  'pages/raspberry/led': 'dashboard',
  'pages/raspberry/network': 'networks',
  'pages/beta': 'changelog',
  'pages/developer': 'changelog',
  'vpn/zerotier': 'zerotier',
  'developers/restapi': 'injectors',
  'developers/translation': 'uavcastOverview',
};

/** Folders the old MkDocs site was served under ("" is the site root). */
const legacyPrefixes = ['', '/4.x', '/4x', '/5.x', '/5', '/latest', '/site'];

/** Docusaurus-era slugs, valid under /docs/4.x/, /docs/5.x/ and /docs/6.x/. */
const docusaurusSlugs: Record<string, TargetKey> = {
  introduction: 'uavcastOverview',
  installation: 'installation',
  hardware: 'hardware',
  'get_started/license': 'license',
  'quick-start': 'quickStart',
  'configuration-dashboard': 'dashboard',
  'configuration-flight-controller': 'flightController',
  'configuration-rtk': 'rtk',
  'configuration-injectors': 'injectors',
  'configuration-inbound-links': 'inboundLinks',
  'configuration-data-streams': 'dataStreams',
  'configuration-ground-controller': 'groundControl',
  'configuration-map': 'map',
  'configuration-camera': 'camera',
  'configuration-cell-modem': 'cellModem',
  'configuration-vpn': 'vpn',
  'setup-vpn': 'vpn',
  'configuration-dynamic-dns': 'dynamicDns',
  'configuration-networks': 'networks',
  'configuration-settings': 'settings',
  'configuration-users': 'users',
  'configuration-raspberry': 'dashboard',
  'configuration-fleet-connect': 'uavcastOverview',
  'frequently-asked-questions': 'faq',
  changelog: 'changelog',
  'configuration-libraries': 'openSourceLicenses',
  'configuration-contributors': 'openSourceLicenses',
  'configuration-developers': 'openSourceLicenses',
  'category/get-started': 'installation',
  'category/configuration': 'uavcastOverview',
  'category/setup': 'uavcastOverview',
  search: 'search',
};

const docusaurusVersions = ['4.x', '5.x', '6.x'];

/** One-off URLs. */
const otherRedirects: Record<string, TargetKey> = {
  // Linked from installed UAVcast-Pro copies (license page, branding config).
  '/licensing/': 'license',
  '/license/': 'license',
  // Linked from the UAVcast-Pro installer error message (install/helpers.sh).
  // Also covered by the legacy map, listed here for visibility.
  '/installation/': 'installation',
  '/docs/': 'uavcastOverview',
  '/markdown-page/': 'home',
  // Renamed guide slug (docs v2 preview): the 4G guide no longer centres on UAVnet/ZeroTier.
  '/guides/bvlos-4g-zerotier/': 'bvlos4g',
};

export type RedirectRule = {from: string; to: TargetKey};

function withLowercase(paths: Record<string, TargetKey>): [string, TargetKey][] {
  const out = new Map<string, TargetKey>();
  for (const [from, to] of Object.entries(paths)) {
    out.set(from, to);
    out.set(from.toLowerCase(), to);
  }
  return [...out.entries()];
}

function build(): RedirectRule[] {
  const rules = new Map<string, TargetKey>();
  const add = (from: string, to: TargetKey) => {
    if (!rules.has(from)) rules.set(from, to);
  };

  for (const [from, to] of Object.entries(otherRedirects)) add(from, to);

  for (const prefix of legacyPrefixes) {
    for (const [path, to] of withLowercase(legacyPages)) add(`${prefix}/${path}/`, to);
    if (prefix) add(`${prefix}/`, 'uavcastOverview');
  }

  for (const v of docusaurusVersions) {
    add(`/docs/${v}/`, 'uavcastOverview');
    for (const [slug, to] of Object.entries(docusaurusSlugs)) add(`/docs/${v}/${slug}/`, to);
  }

  return [...rules.entries()].map(([from, to]) => ({from, to}));
}

/** Every redirect rule, unresolved. */
export const redirectRules: RedirectRule[] = build();
