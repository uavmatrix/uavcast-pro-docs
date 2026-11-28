import type {IconName} from '@site/src/components/Icon';
import type {Area} from './navigation';

/**
 * Home page content. Every link is a list of candidate doc paths; items whose
 * pages don't exist (yet) are hidden, so the home page never links to a 404.
 */
export type HomeLink = {id: string; label: string; to: readonly string[]; desc?: string; area?: Area['key']};

export const SUGGESTED_QUERIES = [
  {id: 'q.mp', label: 'Mission Planner video', q: 'Mission Planner video'},
  {id: 'q.qgc', label: 'QGroundControl video', q: 'QGroundControl video'},
  {id: 'q.gstWin', label: 'GStreamer on Windows', q: 'GStreamer Windows'},
  {id: 'q.pairing', label: 'Pairing code', q: 'pairing code'},
  {id: 'q.apn', label: 'APN settings', q: 'APN'},
  {id: 'q.heartbeat', label: 'No MAVLink heartbeat', q: 'heartbeat'},
];

export type Goal = {
  key: string;
  icon: IconName;
  area: Area['key'];
  tag: string;
  title: string;
  body: string;
  links: HomeLink[];
};

export const GOALS: Goal[] = [
  {
    key: 'first',
    icon: 'plane',
    area: 'get-started',
    tag: 'Start here',
    title: 'I’m setting up my first drone',
    body: 'Install UAVcast-Pro on the companion computer, connect the flight controller and get live video in your ground station.',
    links: [
      {id: 'goal.first.quick', label: 'Quick start', to: ['/get-started/quick-start/', '/uavcast-pro/quick-start/']},
      {id: 'goal.first.mp', label: 'Video in Mission Planner', to: ['/uavcast-pro/ground-stations/mission-planner/']},
      {id: 'goal.first.qgc', label: 'Video in QGroundControl', to: ['/uavcast-pro/ground-stations/qgroundcontrol/']},
      {id: 'goal.first.gcs', label: 'Add your ground station', to: ['/uavcast-pro/ground-stations/', '/uavcast-pro/ground-control-stations/']},
      {id: 'goal.first.license', label: 'Activate your license', to: ['/get-started/license-activation/', '/get-started/licensing/', '/uavcast-pro/license-activation/']},
      {id: 'goal.first.hw', label: 'Hardware requirements', to: ['/get-started/hardware-requirements/', '/reference/supported-hardware/']},
    ],
  },
  {
    key: 'fleet',
    icon: 'map',
    area: 'fleet-manager',
    tag: 'Owners and admins',
    title: 'I manage a fleet',
    body: 'Bring drones, ground stations and licenses into one organization, follow every flight on a live map and give your team the right access.',
    links: [
      {id: 'goal.fleet.org', label: 'Create an organization', to: ['/fleet-manager/set-up-organization/', '/fleet-manager/organizations/']},
      {id: 'goal.fleet.pair', label: 'Pair a drone with a code', to: ['/fleet-manager/pair-uav/', '/fleet-manager/get-started/pair-uav/', '/fleet-manager/pair-a-uav/']},
      {id: 'goal.fleet.team', label: 'Owner, Admin and Viewer roles', to: ['/fleet-manager/team/roles-and-permissions/', '/fleet-manager/team/']},
      {id: 'goal.fleet.overview', label: 'Fleet Manager overview', to: ['/fleet-manager/']},
    ],
  },
  {
    key: 'api',
    icon: 'code',
    area: 'reference',
    tag: 'HTTP · UDP · MAVLink',
    title: 'I’m integrating via API',
    body: 'Push your own sensor values into the MAVLink stream, receive the video in your own software and route telemetry to more tools.',
    links: [
      {id: 'goal.api.injectors', label: 'Telemetry injectors (HTTP, UDP, serial)', to: ['/uavcast-pro/flight-controller/injectors/', '/uavcast-pro/injectors/']},
      {id: 'goal.api.video', label: 'Receive video with GStreamer on Windows', to: ['/uavcast-pro/ground-stations/gstreamer-windows/']},
      {id: 'goal.api.ports', label: 'Ports and protocols', to: ['/reference/ports-and-protocols/', '/reference/ports/']},
      {id: 'goal.api.streams', label: 'Data Streams dashboards', to: ['/uavcast-pro/data-streams/']},
    ],
  },
  {
    key: 'broken',
    icon: 'life',
    area: 'troubleshooting',
    tag: 'Start from the symptom',
    title: 'Something’s not working',
    body: 'Each fix lists checks in the order that solves most cases, with the exact setting to look at.',
    links: [
      {id: 'goal.broken.video', label: 'No video in the ground station', to: ['/troubleshooting/no-video-in-gcs/', '/troubleshooting/no-video/']},
      {id: 'goal.broken.hb', label: 'No MAVLink heartbeat', to: ['/troubleshooting/no-mavlink-heartbeat/', '/troubleshooting/no-heartbeat/']},
      {id: 'goal.broken.logs', label: 'Collect logs for support', to: ['/troubleshooting/collect-logs/', '/troubleshooting/logs/']},
      {id: 'goal.broken.all', label: 'All troubleshooting', to: ['/troubleshooting/']},
    ],
  },
];

export const FEATURES: (HomeLink & {icon: IconName})[] = [
  {id: 'feat.video', icon: 'video', label: 'Video streaming', desc: 'H.264 over UDP, two cameras, recording', to: ['/uavcast-pro/camera/']},
  {id: 'feat.gcs', icon: 'gauge', label: 'Telemetry & GCS', desc: 'Mission Planner, QGroundControl, more', to: ['/uavcast-pro/ground-stations/', '/uavcast-pro/ground-control-stations/']},
  {id: 'feat.modem', icon: 'signal', label: 'Cellular modems', desc: 'HiLink and stick modems, automatic APN', to: ['/uavcast-pro/connectivity/cellular-modem/', '/uavcast-pro/cellular-modem/']},
  {id: 'feat.vpn', icon: 'shield', label: 'VPN', desc: 'Reach the drone without port forwarding', to: ['/uavcast-pro/connectivity/vpn/', '/uavcast-pro/vpn/']},
  {id: 'feat.rtk', icon: 'sparkle', label: 'RTK / NTRIP', desc: 'Centimetre positioning over the cell link', to: ['/uavcast-pro/flight-controller/ntrip-rtk/', '/uavcast-pro/ntrip-rtk/']},
  {id: 'feat.inj', icon: 'layers', label: 'Injectors', desc: 'Your sensors as native MAVLink values', to: ['/uavcast-pro/flight-controller/injectors/', '/uavcast-pro/injectors/']},
];

export const PRODUCT_LINKS = {
  uavcast: [
    {id: 'pl.u.install', label: 'Installation', to: ['/get-started/installation/', '/uavcast-pro/installation/']},
    {id: 'pl.u.camera', label: 'Video streaming', to: ['/uavcast-pro/camera/']},
    {id: 'pl.u.modem', label: 'Cellular modems', to: ['/uavcast-pro/connectivity/cellular-modem/', '/uavcast-pro/cellular-modem/']},
    {id: 'pl.u.rtk', label: 'RTK / NTRIP', to: ['/uavcast-pro/flight-controller/ntrip-rtk/', '/uavcast-pro/ntrip-rtk/']},
  ],
  fleet: [
    {id: 'pl.f.org', label: 'Set up your organization', to: ['/fleet-manager/set-up-organization/', '/fleet-manager/organizations/']},
    {id: 'pl.f.pair', label: 'Pair your first UAV', to: ['/fleet-manager/pair-uav/']},
    {id: 'pl.f.map', label: 'Live map & telemetry', to: ['/fleet-manager/map/']},
    {id: 'pl.f.team', label: 'Members & roles', to: ['/fleet-manager/team/']},
  ],
} satisfies Record<string, HomeLink[]>;

export type StartCard = {
  key: string;
  icon: IconName;
  meta: string;
  title: string;
  desc: string;
  to: readonly string[];
  steps?: string[];
  bullets?: string[];
  cta: string;
};

export const START_HERE: StartCard[] = [
  {
    key: 'quick',
    icon: 'clock',
    meta: 'Tutorial · Raspberry Pi',
    title: 'Quick start',
    desc: 'From a blank SD card to live video and telemetry in your ground station.',
    to: ['/get-started/quick-start/', '/uavcast-pro/quick-start/'],
    steps: ['Flash a 64-bit OS', 'Run the installer', 'Connect the flight controller', 'Add your ground station'],
    cta: 'Start the quick start',
  },
  {
    key: 'hw',
    icon: 'chip',
    meta: 'Reference',
    title: 'Hardware requirements',
    desc: 'Companion computers, flight controllers, cameras and modems. Check this before you buy parts.',
    to: ['/get-started/hardware-requirements/', '/uavcast-pro/hardware-requirements/', '/reference/supported-hardware/'],
    bullets: ['Raspberry Pi and other arm64 boards', 'amd64 computers, NVIDIA Jetson', 'ArduPilot flight controllers', 'USB and HiLink LTE modems'],
    cta: 'Hardware requirements',
  },
  {
    key: 'license',
    icon: 'key',
    meta: 'Licensing',
    title: 'Activate your license',
    desc: 'Activate a key on a device, move it to new hardware and see how device slots work.',
    to: ['/get-started/license-activation/', '/get-started/licensing/', '/uavcast-pro/license-activation/'],
    steps: ['Buy a key in the UAVmatrix store', 'Open Application › License Manager', 'Enter the key while online'],
    cta: 'Licensing & activation',
  },
];

export const POPULAR: (HomeLink & {area: Area['key']})[] = [
  {id: 'pop.mp', label: 'Mission Planner: telemetry and video', desc: 'Telemetry on UDP 14550 and the GStreamer video source for the HUD.', area: 'uavcast-pro', to: ['/uavcast-pro/ground-stations/mission-planner/']},
  {id: 'pop.qgc', label: 'QGroundControl: telemetry and video', desc: 'Telemetry and H.264 video on UDP 5600, on desktop and Android.', area: 'uavcast-pro', to: ['/uavcast-pro/ground-stations/qgroundcontrol/']},
  {id: 'pop.gstwin', label: 'Receive video with GStreamer on Windows', desc: 'Install the right GStreamer build and play the stream from the drone.', area: 'uavcast-pro', to: ['/uavcast-pro/ground-stations/gstreamer-windows/']},
  {id: 'pop.4g', label: 'Fly beyond visual range over 4G', desc: 'Modem, ZeroTier VPN, telemetry and video to QGroundControl or Mission Planner.', area: 'guides', to: ['/guides/bvlos-4g-zerotier/']},
  {id: 'pop.pair', label: 'Pair a drone with Fleet Manager', desc: 'Enter the 8-digit code that UAVcast-Pro shows into Fleet Manager.', area: 'fleet-manager', to: ['/fleet-manager/pair-uav/']},
  {id: 'pop.modem', label: 'Set up a cellular modem', desc: 'HiLink or stick modem, APN and automatic connection.', area: 'uavcast-pro', to: ['/uavcast-pro/connectivity/cellular-modem/']},
  {id: 'pop.gcs', label: 'Connect Mission Planner or QGroundControl', desc: 'Telemetry on UDP 14550 and video on UDP 5600 to each ground station.', area: 'uavcast-pro', to: ['/uavcast-pro/ground-control-stations/']},
  {id: 'pop.rtk', label: 'RTK over 4G with an NTRIP caster', desc: 'RTCM3 corrections from a caster to the flight controller for RTK Fixed.', area: 'guides', to: ['/guides/rtk-ntrip-caster/', '/uavcast-pro/flight-controller/ntrip-rtk/']},
  {id: 'pop.bind', label: 'Stream bindings and port assignment', desc: 'How several drones share one ground station.', area: 'fleet-manager', to: ['/fleet-manager/network/stream-bindings/']},
  {id: 'pop.rec', label: 'Record flights and review them', desc: 'Video and telemetry on the drone, replayed on one timeline.', area: 'guides', to: ['/guides/recording-flight-review/', '/uavcast-pro/camera/recordings/']},
  {id: 'pop.ts', label: 'Remote access with Tailscale', desc: 'Reach the drone on your tailnet over LTE, without port forwarding.', area: 'guides', to: ['/guides/remote-access-tailscale/']},
  {id: 'pop.multi', label: 'Stream to multiple ground stations', desc: 'Pilot, payload operator and observers on one drone.', area: 'guides', to: ['/guides/multiple-ground-stations/']},
  {id: 'pop.onboard', label: 'Onboard a fleet with Fleet Manager', desc: 'Licenses, naming, pairing, VPN and stream bindings for many drones.', area: 'fleet-manager', to: ['/guides/fleet-onboarding/']},
];

export const TROUBLESHOOTING: HomeLink[] = [
  {id: 'ts.video', label: 'No video in QGroundControl or Mission Planner', to: ['/troubleshooting/no-video-in-gcs/']},
  {id: 'ts.hb', label: 'No MAVLink heartbeat from the flight controller', to: ['/troubleshooting/no-mavlink-heartbeat/']},
  {id: 'ts.telemetry', label: 'No telemetry in the ground station', to: ['/troubleshooting/no-telemetry-in-gcs/']},
  {id: 'ts.license', label: 'License key won’t activate', to: ['/troubleshooting/license-activation-failed/']},
  {id: 'ts.modem', label: 'Modem connects but gets no internet', to: ['/troubleshooting/modem-no-internet/']},
  {id: 'ts.web', label: 'Web interface won’t open', to: ['/troubleshooting/web-interface-wont-open/']},
  {id: 'ts.offline', label: 'Drone shows Offline in Fleet Manager', to: ['/troubleshooting/drone-offline-fleet-manager/']},
  {id: 'ts.power', label: 'Undervoltage and throttling', to: ['/troubleshooting/undervoltage-and-throttling/']},
];

/** Real release notes (UAVcast-Pro changelog, Fleet Manager releases). */
export const RECENT = [
  {date: '2026-11-24', label: 'Fleet Manager', text: 'Licenses bought with another email address can be linked to your account.'},
  {date: '2026-11-21', label: '6.5.2', text: 'Camera fixes: no more “Insufficient permissions”, and video keeps running when the live preview is off.'},
  {date: '2026-11-16', label: '6.5.1', text: 'Camera recording, storage management and the flight review player.'},
  {date: '2026-11-09', label: '6.5.0', text: 'Camera audio over Opus and faster NTRIP/RTK recovery after a dropped connection.'},
];
