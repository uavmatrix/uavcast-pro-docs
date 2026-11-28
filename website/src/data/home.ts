import {translate} from '@docusaurus/Translate';
import type {IconName} from '@site/src/components/Icon';
import type {Area} from './navigation';

/**
 * Home page content. Every link is a list of candidate doc paths; items whose
 * pages don't exist (yet) are hidden, so the home page never links to a 404.
 */
export type HomeLink = {id: string; label: string; to: readonly string[]; desc?: string; area?: Area['key']};

export const SUGGESTED_QUERIES = [
  {id: 'q.mp', label: translate({id: 'q.mp', message: 'Mission Planner video'}), q: 'Mission Planner video'},
  {id: 'q.qgc', label: translate({id: 'q.qgc', message: 'QGroundControl video'}), q: 'QGroundControl video'},
  {id: 'q.gstWin', label: translate({id: 'q.gstWin', message: 'GStreamer on Windows'}), q: 'GStreamer Windows'},
  {id: 'q.pairing', label: translate({id: 'q.pairing', message: 'Pairing code'}), q: 'pairing code'},
  {id: 'q.apn', label: translate({id: 'q.apn', message: 'APN settings'}), q: 'APN'},
  {id: 'q.heartbeat', label: translate({id: 'q.heartbeat', message: 'No MAVLink heartbeat'}), q: 'heartbeat'},
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
    tag: translate({id: 'goal.first.tag', message: 'Start here'}),
    title: translate({id: 'goal.first.title', message: 'I’m setting up my first drone'}),
    body: translate({id: 'goal.first.body', message: 'Install UAVcast-Pro on the companion computer, connect the flight controller and get live video in your ground station.'}),
    links: [
      {id: 'goal.first.quick', label: translate({id: 'goal.first.quick', message: 'Quick start'}), to: ['/get-started/quick-start/', '/uavcast-pro/quick-start/']},
      {id: 'goal.first.mp', label: translate({id: 'goal.first.mp', message: 'Video in Mission Planner'}), to: ['/uavcast-pro/ground-stations/mission-planner/']},
      {id: 'goal.first.qgc', label: translate({id: 'goal.first.qgc', message: 'Video in QGroundControl'}), to: ['/uavcast-pro/ground-stations/qgroundcontrol/']},
      {id: 'goal.first.gcs', label: translate({id: 'goal.first.gcs', message: 'Add your ground station'}), to: ['/uavcast-pro/ground-stations/', '/uavcast-pro/ground-control-stations/']},
      {id: 'goal.first.license', label: translate({id: 'goal.first.license', message: 'Activate your license'}), to: ['/get-started/license-activation/', '/get-started/licensing/', '/uavcast-pro/license-activation/']},
      {id: 'goal.first.hw', label: translate({id: 'goal.first.hw', message: 'Hardware requirements'}), to: ['/get-started/hardware-requirements/', '/reference/supported-hardware/']},
    ],
  },
  {
    key: 'fleet',
    icon: 'map',
    area: 'fleet-manager',
    tag: translate({id: 'goal.fleet.tag', message: 'Owners and admins'}),
    title: translate({id: 'goal.fleet.title', message: 'I manage a fleet'}),
    body: translate({id: 'goal.fleet.body', message: 'Bring drones, ground stations and licenses into one organization, follow every flight on a live map and give your team the right access.'}),
    links: [
      {id: 'goal.fleet.org', label: translate({id: 'goal.fleet.org', message: 'Create an organization'}), to: ['/fleet-manager/set-up-organization/', '/fleet-manager/organizations/']},
      {id: 'goal.fleet.pair', label: translate({id: 'goal.fleet.pair', message: 'Pair a drone with a code'}), to: ['/fleet-manager/pair-uav/', '/fleet-manager/get-started/pair-uav/', '/fleet-manager/pair-a-uav/']},
      {id: 'goal.fleet.team', label: translate({id: 'goal.fleet.team', message: 'Owner, Admin and Viewer roles'}), to: ['/fleet-manager/team/roles-and-permissions/', '/fleet-manager/team/']},
      {id: 'goal.fleet.overview', label: translate({id: 'goal.fleet.overview', message: 'Fleet Manager overview'}), to: ['/fleet-manager/']},
    ],
  },
  {
    key: 'api',
    icon: 'code',
    area: 'reference',
    tag: translate({id: 'goal.api.tag', message: 'HTTP · UDP · MAVLink'}),
    title: translate({id: 'goal.api.title', message: 'I’m integrating via API'}),
    body: translate({id: 'goal.api.body', message: 'Push your own sensor values into the MAVLink stream, receive the video in your own software and route telemetry to more tools.'}),
    links: [
      {id: 'goal.api.injectors', label: translate({id: 'goal.api.injectors', message: 'Telemetry injectors (HTTP, UDP, serial)'}), to: ['/uavcast-pro/flight-controller/injectors/', '/uavcast-pro/injectors/']},
      {id: 'goal.api.video', label: translate({id: 'goal.api.video', message: 'Receive video with GStreamer on Windows'}), to: ['/uavcast-pro/ground-stations/gstreamer-windows/']},
      {id: 'goal.api.ports', label: translate({id: 'goal.api.ports', message: 'Ports and protocols'}), to: ['/reference/ports-and-protocols/', '/reference/ports/']},
      {id: 'goal.api.streams', label: translate({id: 'goal.api.streams', message: 'Data Streams dashboards'}), to: ['/uavcast-pro/data-streams/']},
    ],
  },
  {
    key: 'broken',
    icon: 'life',
    area: 'troubleshooting',
    tag: translate({id: 'goal.broken.tag', message: 'Start from the symptom'}),
    title: translate({id: 'goal.broken.title', message: 'Something’s not working'}),
    body: translate({id: 'goal.broken.body', message: 'Each fix lists checks in the order that solves most cases, with the exact setting to look at.'}),
    links: [
      {id: 'goal.broken.video', label: translate({id: 'goal.broken.video', message: 'No video in the ground station'}), to: ['/troubleshooting/no-video-in-gcs/', '/troubleshooting/no-video/']},
      {id: 'goal.broken.hb', label: translate({id: 'goal.broken.hb', message: 'No MAVLink heartbeat'}), to: ['/troubleshooting/no-mavlink-heartbeat/', '/troubleshooting/no-heartbeat/']},
      {id: 'goal.broken.logs', label: translate({id: 'goal.broken.logs', message: 'Collect logs for support'}), to: ['/troubleshooting/collect-logs/', '/troubleshooting/logs/']},
      {id: 'goal.broken.all', label: translate({id: 'goal.broken.all', message: 'All troubleshooting'}), to: ['/troubleshooting/']},
    ],
  },
];

export const FEATURES: (HomeLink & {icon: IconName})[] = [
  {id: 'feat.video', icon: 'video', label: translate({id: 'feat.video', message: 'Video streaming'}), desc: translate({id: 'feat.video.desc', message: 'H.264 over UDP, two cameras, recording'}), to: ['/uavcast-pro/camera/']},
  {id: 'feat.gcs', icon: 'gauge', label: translate({id: 'feat.gcs', message: 'Telemetry & GCS'}), desc: translate({id: 'feat.gcs.desc', message: 'Mission Planner, QGroundControl, more'}), to: ['/uavcast-pro/ground-stations/', '/uavcast-pro/ground-control-stations/']},
  {id: 'feat.modem', icon: 'signal', label: translate({id: 'feat.modem', message: 'Cellular modems'}), desc: translate({id: 'feat.modem.desc', message: 'HiLink and stick modems, automatic APN'}), to: ['/uavcast-pro/connectivity/cellular-modem/', '/uavcast-pro/cellular-modem/']},
  {id: 'feat.vpn', icon: 'shield', label: translate({id: 'feat.vpn', message: 'VPN'}), desc: translate({id: 'feat.vpn.desc', message: 'Reach the drone without port forwarding'}), to: ['/uavcast-pro/connectivity/vpn/', '/uavcast-pro/vpn/']},
  {id: 'feat.rtk', icon: 'sparkle', label: translate({id: 'feat.rtk', message: 'RTK / NTRIP'}), desc: translate({id: 'feat.rtk.desc', message: 'Centimetre positioning over the cell link'}), to: ['/uavcast-pro/flight-controller/ntrip-rtk/', '/uavcast-pro/ntrip-rtk/']},
  {id: 'feat.inj', icon: 'layers', label: translate({id: 'feat.inj', message: 'Injectors'}), desc: translate({id: 'feat.inj.desc', message: 'Your sensors as native MAVLink values'}), to: ['/uavcast-pro/flight-controller/injectors/', '/uavcast-pro/injectors/']},
];

export const PRODUCT_LINKS = {
  uavcast: [
    {id: 'pl.u.install', label: translate({id: 'pl.u.install', message: 'Installation'}), to: ['/get-started/installation/', '/uavcast-pro/installation/']},
    {id: 'pl.u.camera', label: translate({id: 'pl.u.camera', message: 'Video streaming'}), to: ['/uavcast-pro/camera/']},
    {id: 'pl.u.modem', label: translate({id: 'pl.u.modem', message: 'Cellular modems'}), to: ['/uavcast-pro/connectivity/cellular-modem/', '/uavcast-pro/cellular-modem/']},
    {id: 'pl.u.rtk', label: translate({id: 'pl.u.rtk', message: 'RTK / NTRIP'}), to: ['/uavcast-pro/flight-controller/ntrip-rtk/', '/uavcast-pro/ntrip-rtk/']},
  ],
  fleet: [
    {id: 'pl.f.org', label: translate({id: 'pl.f.org', message: 'Set up your organization'}), to: ['/fleet-manager/set-up-organization/', '/fleet-manager/organizations/']},
    {id: 'pl.f.pair', label: translate({id: 'pl.f.pair', message: 'Pair your first UAV'}), to: ['/fleet-manager/pair-uav/']},
    {id: 'pl.f.map', label: translate({id: 'pl.f.map', message: 'Live map & telemetry'}), to: ['/fleet-manager/map/']},
    {id: 'pl.f.team', label: translate({id: 'pl.f.team', message: 'Members & roles'}), to: ['/fleet-manager/team/']},
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
    meta: translate({id: 'start.quick.meta', message: 'Tutorial · Raspberry Pi'}),
    title: translate({id: 'start.quick.title', message: 'Quick start'}),
    desc: translate({id: 'start.quick.desc', message: 'From a blank SD card to live video and telemetry in your ground station.'}),
    to: ['/get-started/quick-start/', '/uavcast-pro/quick-start/'],
    steps: [translate({id: 'start.quick.step0', message: 'Flash a 64-bit OS'}), translate({id: 'start.quick.step1', message: 'Run the installer'}), translate({id: 'start.quick.step2', message: 'Connect the flight controller'}), translate({id: 'start.quick.step3', message: 'Add your ground station'})],
    cta: 'Start the quick start',
  },
  {
    key: 'hw',
    icon: 'chip',
    meta: translate({id: 'start.hw.meta', message: 'Reference'}),
    title: translate({id: 'start.hw.title', message: 'Hardware requirements'}),
    desc: translate({id: 'start.hw.desc', message: 'Companion computers, flight controllers, cameras and modems. Check this before you buy parts.'}),
    to: ['/get-started/hardware-requirements/', '/uavcast-pro/hardware-requirements/', '/reference/supported-hardware/'],
    bullets: [translate({id: 'start.hw.b0', message: 'Raspberry Pi, NVIDIA Jetson, Orange Pi'}), translate({id: 'start.hw.b1', message: 'Any arm64 or amd64 Linux computer'}), translate({id: 'start.hw.b2', message: 'Any MAVLink flight controller (ArduPilot, PX4)'}), translate({id: 'start.hw.b3', message: 'USB and HiLink LTE modems'})],
    cta: 'Hardware requirements',
  },
  {
    key: 'license',
    icon: 'key',
    meta: translate({id: 'start.license.meta', message: 'Licensing'}),
    title: translate({id: 'start.license.title', message: 'Activate your license'}),
    desc: translate({id: 'start.license.desc', message: 'Activate a key on a device, move it to new hardware and see how device slots work.'}),
    to: ['/get-started/license-activation/', '/get-started/licensing/', '/uavcast-pro/license-activation/'],
    steps: [translate({id: 'start.license.step0', message: 'Buy a key in the UAVmatrix store'}), translate({id: 'start.license.step1', message: 'Open Application › License Manager'}), translate({id: 'start.license.step2', message: 'Enter the key while online'})],
    cta: 'Licensing & activation',
  },
];

export const POPULAR: (HomeLink & {area: Area['key']})[] = [
  {id: 'pop.mp', label: translate({id: 'pop.mp', message: 'Mission Planner: telemetry and video'}), desc: translate({id: 'pop.mp.desc', message: 'Telemetry on UDP 14550 and the GStreamer video source for the HUD.'}), area: 'uavcast-pro', to: ['/uavcast-pro/ground-stations/mission-planner/']},
  {id: 'pop.qgc', label: translate({id: 'pop.qgc', message: 'QGroundControl: telemetry and video'}), desc: translate({id: 'pop.qgc.desc', message: 'Telemetry and H.264 video on UDP 5600, on desktop and Android.'}), area: 'uavcast-pro', to: ['/uavcast-pro/ground-stations/qgroundcontrol/']},
  {id: 'pop.gstwin', label: translate({id: 'pop.gstwin', message: 'Receive video with GStreamer on Windows'}), desc: translate({id: 'pop.gstwin.desc', message: 'Install the right GStreamer build and play the stream from the drone.'}), area: 'uavcast-pro', to: ['/uavcast-pro/ground-stations/gstreamer-windows/']},
  {id: 'pop.4g', label: translate({id: 'pop.4g', message: 'Fly beyond visual range over 4G'}), desc: translate({id: 'pop.4g.desc', message: 'Modem, Fleet Manager VPN, telemetry and video to QGroundControl or Mission Planner.'}), area: 'guides', to: ['/guides/bvlos-4g/']},
  {id: 'pop.pair', label: translate({id: 'pop.pair', message: 'Pair a drone with Fleet Manager'}), desc: translate({id: 'pop.pair.desc', message: 'Enter the 8-digit code that UAVcast-Pro shows into Fleet Manager.'}), area: 'fleet-manager', to: ['/fleet-manager/pair-uav/']},
  {id: 'pop.modem', label: translate({id: 'pop.modem', message: 'Set up a cellular modem'}), desc: translate({id: 'pop.modem.desc', message: 'HiLink or stick modem, APN and automatic connection.'}), area: 'uavcast-pro', to: ['/uavcast-pro/connectivity/cellular-modem/']},
  {id: 'pop.gcs', label: translate({id: 'pop.gcs', message: 'Connect Mission Planner or QGroundControl'}), desc: translate({id: 'pop.gcs.desc', message: 'Telemetry on UDP 14550 and video on UDP 5600 to each ground station.'}), area: 'uavcast-pro', to: ['/uavcast-pro/ground-control-stations/']},
  {id: 'pop.rtk', label: translate({id: 'pop.rtk', message: 'RTK over 4G with an NTRIP caster'}), desc: translate({id: 'pop.rtk.desc', message: 'RTCM3 corrections from a caster to the flight controller for RTK Fixed.'}), area: 'guides', to: ['/guides/rtk-ntrip-caster/', '/uavcast-pro/flight-controller/ntrip-rtk/']},
  {id: 'pop.bind', label: translate({id: 'pop.bind', message: 'Stream bindings and port assignment'}), desc: translate({id: 'pop.bind.desc', message: 'How several drones share one ground station.'}), area: 'fleet-manager', to: ['/fleet-manager/network/stream-bindings/']},
  {id: 'pop.rec', label: translate({id: 'pop.rec', message: 'Record flights and review them'}), desc: translate({id: 'pop.rec.desc', message: 'Video and telemetry on the drone, replayed on one timeline.'}), area: 'guides', to: ['/guides/recording-flight-review/', '/uavcast-pro/camera/recordings/']},
  {id: 'pop.ts', label: translate({id: 'pop.ts', message: 'Remote access with Tailscale'}), desc: translate({id: 'pop.ts.desc', message: 'Reach the drone on your tailnet over LTE, without port forwarding.'}), area: 'guides', to: ['/guides/remote-access-tailscale/']},
  {id: 'pop.multi', label: translate({id: 'pop.multi', message: 'Stream to multiple ground stations'}), desc: translate({id: 'pop.multi.desc', message: 'Pilot, payload operator and observers on one drone.'}), area: 'guides', to: ['/guides/multiple-ground-stations/']},
  {id: 'pop.onboard', label: translate({id: 'pop.onboard', message: 'Onboard a fleet with Fleet Manager'}), desc: translate({id: 'pop.onboard.desc', message: 'Licenses, naming, pairing, VPN and stream bindings for many drones.'}), area: 'fleet-manager', to: ['/guides/fleet-onboarding/']},
];

export const TROUBLESHOOTING: HomeLink[] = [
  {id: 'ts.video', label: translate({id: 'ts.video', message: 'No video in QGroundControl or Mission Planner'}), to: ['/troubleshooting/no-video-in-gcs/']},
  {id: 'ts.hb', label: translate({id: 'ts.hb', message: 'No MAVLink heartbeat from the flight controller'}), to: ['/troubleshooting/no-mavlink-heartbeat/']},
  {id: 'ts.telemetry', label: translate({id: 'ts.telemetry', message: 'No telemetry in the ground station'}), to: ['/troubleshooting/no-telemetry-in-gcs/']},
  {id: 'ts.license', label: translate({id: 'ts.license', message: 'License key won’t activate'}), to: ['/troubleshooting/license-activation-failed/']},
  {id: 'ts.modem', label: translate({id: 'ts.modem', message: 'Modem connects but gets no internet'}), to: ['/troubleshooting/modem-no-internet/']},
  {id: 'ts.web', label: translate({id: 'ts.web', message: 'Web interface won’t open'}), to: ['/troubleshooting/web-interface-wont-open/']},
  {id: 'ts.offline', label: translate({id: 'ts.offline', message: 'Drone shows Offline in Fleet Manager'}), to: ['/troubleshooting/drone-offline-fleet-manager/']},
  {id: 'ts.power', label: translate({id: 'ts.power', message: 'Undervoltage and throttling'}), to: ['/troubleshooting/undervoltage-and-throttling/']},
];

/** Real release notes (UAVcast-Pro changelog, Fleet Manager releases). */
export const RECENT = [
  {date: '2026-11-24', label: 'Fleet Manager', text: translate({id: 'recent.2026-11-24', message: 'Licenses bought with another email address can be linked to your account.'})},
  {date: '2026-11-21', label: '6.5.2', text: translate({id: 'recent.2026-11-21', message: 'Camera fixes: no more “Insufficient permissions”, and video keeps running when the live preview is off.'})},
  {date: '2026-11-16', label: '6.5.1', text: translate({id: 'recent.2026-11-16', message: 'Camera recording, storage management and the flight review player.'})},
  {date: '2026-11-09', label: '6.5.0', text: translate({id: 'recent.2026-11-09', message: 'Camera audio over Opus and faster NTRIP/RTK recovery after a dropped connection.'})},
];
