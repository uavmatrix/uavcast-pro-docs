import {translate} from '@docusaurus/Translate';
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
  {key: 'get-started', id: 'area.getStarted', label: translate({id: 'area.getStarted', message: 'Get started'}), icon: 'flag', blurb: translate({id: 'area.getStarted.blurb', message: 'Install, activate and fly for the first time'})},
  {key: 'uavcast-pro', id: 'area.uavcastPro', label: translate({id: 'area.uavcastPro', message: 'UAVcast-Pro'}), icon: 'chip', blurb: translate({id: 'area.uavcastPro.blurb', message: 'Software for the drone’s companion computer'})},
  {key: 'fleet-manager', id: 'area.fleetManager', label: translate({id: 'area.fleetManager', message: 'Fleet Manager'}), icon: 'map', blurb: translate({id: 'area.fleetManager.blurb', message: 'Drones, ground stations and people in one place'})},
  {key: 'guides', id: 'area.guides', label: translate({id: 'area.guides', message: 'Guides'}), icon: 'route', blurb: translate({id: 'area.guides.blurb', message: 'Task-based walkthroughs'})},
  {key: 'troubleshooting', id: 'area.troubleshooting', label: translate({id: 'area.troubleshooting', message: 'Troubleshooting'}), icon: 'life', blurb: translate({id: 'area.troubleshooting.blurb', message: 'Start from the symptom'})},
  {key: 'reference', id: 'area.reference', label: translate({id: 'area.reference', message: 'Reference'}), icon: 'book', blurb: translate({id: 'area.reference.blurb', message: 'Ports, settings, supported hardware'})},
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
  {id: 'nav.getStarted', label: translate({id: 'nav.getStarted', message: 'Get started'}), to: ['/get-started/', '/get-started/overview/', '/get-started/quick-start/'], area: 'get-started'},
  {id: 'nav.guides', label: translate({id: 'nav.guides', message: 'Guides'}), to: ['/guides/'], area: 'guides'},
  {id: 'nav.troubleshooting', label: translate({id: 'nav.troubleshooting', message: 'Troubleshooting'}), to: ['/troubleshooting/'], area: 'troubleshooting'},
  {id: 'nav.reference', label: translate({id: 'nav.reference', message: 'Reference'}), to: ['/reference/'], area: 'reference'},
  {
    id: 'nav.changelog',
    label: translate({id: 'nav.changelog', message: 'Changelog'}),
    to: ['/reference/changelog/', '/uavcast-pro/changelog/', '/changelog/'],
  },
];

/** Product switcher entries. */
export const PRODUCTS = [
  {key: 'uavcast-pro', id: 'product.uavcast', label: translate({id: 'product.uavcast', message: 'UAVcast-Pro'}), sub: translate({id: 'product.uavcast.sub', message: 'Software for the drone’s companion computer'}), icon: 'chip', to: ['/uavcast-pro/']},
  {key: 'fleet-manager', id: 'product.fleet', label: translate({id: 'product.fleet', message: 'Fleet Manager'}), sub: translate({id: 'product.fleet.sub', message: 'Drones, licenses and people in one place'}), icon: 'map', to: ['/fleet-manager/']},
  {key: 'all', id: 'product.all', label: translate({id: 'product.all', message: 'All documentation'}), sub: translate({id: 'product.all.sub', message: 'Start page, guides and reference'}), icon: 'book', to: ['/']},
] as const;
