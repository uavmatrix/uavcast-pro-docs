import type {IconName} from '@site/src/components/Icon';

/**
 * Site navigation. Links are lists of candidate doc paths (base-relative, with
 * trailing slash); the first one that exists in the build is used, so the
 * navigation keeps working while pages are added or moved. A link whose
 * candidates all miss falls back to the first page in its area, or is hidden.
 */
export type Area = {
  key: 'get-started' | 'uavcast-pro' | 'fleet-manager' | 'guides' | 'troubleshooting' | 'reference';
  label: string;
  /** translation id */
  id: string;
  icon: IconName;
  blurb: string;
};

export const AREAS: Area[] = [
  {key: 'get-started', id: 'area.getStarted', label: 'Get started', icon: 'flag', blurb: 'Install, activate and fly for the first time'},
  {key: 'uavcast-pro', id: 'area.uavcastPro', label: 'UAVcast-Pro', icon: 'chip', blurb: 'Software for the drone’s companion computer'},
  {key: 'fleet-manager', id: 'area.fleetManager', label: 'Fleet Manager', icon: 'map', blurb: 'Drones, ground stations and people in one place'},
  {key: 'guides', id: 'area.guides', label: 'Guides', icon: 'route', blurb: 'Task-based walkthroughs'},
  {key: 'troubleshooting', id: 'area.troubleshooting', label: 'Troubleshooting', icon: 'life', blurb: 'Start from the symptom'},
  {key: 'reference', id: 'area.reference', label: 'Reference', icon: 'book', blurb: 'Ports, settings, supported hardware'},
];

/** Landing page candidates per area (first existing wins). */
export const AREA_HOME: Record<Area['key'], string[]> = {
  'get-started': ['/get-started/', '/get-started/overview/', '/get-started/quick-start/'],
  'uavcast-pro': ['/uavcast-pro/'],
  'fleet-manager': ['/fleet-manager/'],
  guides: ['/guides/'],
  troubleshooting: ['/troubleshooting/'],
  reference: ['/reference/'],
};

export const AREA_BY_KEY = Object.fromEntries(AREAS.map((a) => [a.key, a])) as Record<Area['key'], Area>;

export type NavLink = {id: string; label: string; to: readonly string[]; area?: Area['key']};

/** Top bar links, in order. */
export const TOP_NAV: NavLink[] = [
  {id: 'nav.getStarted', label: 'Get started', to: ['/get-started/', '/get-started/overview/', '/get-started/quick-start/'], area: 'get-started'},
  {id: 'nav.guides', label: 'Guides', to: ['/guides/'], area: 'guides'},
  {id: 'nav.troubleshooting', label: 'Troubleshooting', to: ['/troubleshooting/'], area: 'troubleshooting'},
  {id: 'nav.reference', label: 'Reference', to: ['/reference/'], area: 'reference'},
  {
    id: 'nav.changelog',
    label: 'Changelog',
    to: ['/reference/changelog/', '/uavcast-pro/changelog/', '/changelog/'],
  },
];

/** Product switcher entries. */
export const PRODUCTS = [
  {key: 'uavcast-pro', id: 'product.uavcast', label: 'UAVcast-Pro', sub: 'Software for the drone’s companion computer', icon: 'chip', to: ['/uavcast-pro/']},
  {key: 'fleet-manager', id: 'product.fleet', label: 'Fleet Manager', sub: 'Drones, licenses and people in one place', icon: 'map', to: ['/fleet-manager/']},
  {key: 'all', id: 'product.all', label: 'All documentation', sub: 'Start page, guides and reference', icon: 'book', to: ['/']},
] as const;
