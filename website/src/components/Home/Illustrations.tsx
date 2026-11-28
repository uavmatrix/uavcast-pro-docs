import React from 'react';
import {translate} from '@docusaurus/Translate';

/** Hero: how data flows between the aircraft, Fleet Manager and the ground station. */
export function DataPath({version}: {version: string}) {
  const short = version.split('.').slice(0, 2).join('.');
  return (
    <svg
      className="uvm-schematic"
      viewBox="0 0 560 384"
      role="img"
      aria-label={translate({
        id: 'home.schematic',
        message:
          'How data flows: UAVcast-Pro on the companion computer sends status to Fleet Manager over MQTT with TLS on port 8883, and video and MAVLink telemetry to the ground station on UDP ports 5600 and 14550, directly or over a WireGuard VPN.',
      })}>
      <path className="wire" d="M222 104 C 280 104, 278 70, 326 70" />
      <path className="flow slow" d="M222 104 C 280 104, 278 70, 326 70" />
      <path className="wire" d="M222 160 C 296 160, 262 286, 326 286" />
      <path className="flow" d="M222 160 C 296 160, 262 286, 326 286" />
      <text className="t-a" x="236" y="130">MQTT · TLS</text>

      <g transform="translate(20 34)">
        <rect className="node" x=".5" y=".5" width="201" height="160" rx="10" />
        <text className="t-lbl" x="16" y="24">AIRCRAFT</text>
        <circle className="ok pulse" cx="186" cy="20" r="3.5" />
        <text className="t-h" x="16" y="46">Companion computer</text>
        <text className="t-s" x="16" y="63">UAVcast-Pro {short} · Raspberry Pi 5</text>
        <rect className="chipr" x="12.5" y="78.5" width="88" height="26" rx="6" />
        <text className="t-m" x="21" y="95">FC · MAVLink</text>
        <rect className="chipr" x="106.5" y="78.5" width="84" height="26" rx="6" />
        <text className="t-m" x="115" y="95">CAM · H.264</text>
        <rect className="chipr" x="16.5" y="112.5" width="170" height="26" rx="6" />
        <text className="t-m" x="26" y="129">LTE modem · 4G/5G</text>
      </g>

      <g transform="translate(326 22)">
        <rect className="node" x=".5" y=".5" width="213" height="98" rx="10" />
        <text className="t-lbl" x="16" y="24">CLOUD</text>
        <text className="t-h" x="16" y="46">Fleet Manager</text>
        <text className="t-s" x="16" y="63">Status, position, licenses</text>
        <text className="t-m" x="16" y="84">mqtts://…:8883</text>
      </g>

      <g transform="translate(240 196)">
        <rect className="pill" x=".5" y=".5" width="84" height="24" rx="12" />
        <text className="t-a" x="14" y="16.5">VPN · UDP</text>
      </g>

      <g transform="translate(326 222)">
        <rect className="node" x=".5" y=".5" width="213" height="126" rx="10" />
        <text className="t-lbl" x="16" y="24">GROUND</text>
        <text className="t-h" x="16" y="46">Ground station</text>
        <text className="t-s" x="16" y="63">Mission Planner · QGroundControl</text>
        <rect className="chipr" x="16.5" y="78.5" width="80" height="26" rx="6" />
        <text className="t-m" x="25" y="95">Video :5600</text>
        <rect className="chipr" x="102.5" y="78.5" width="84" height="26" rx="6" />
        <text className="t-m" x="110" y="95">MAV :14550</text>
        <text className="t-s" x="16" y="118" style={{fontSize: 10.5}}>
          Direct, or over a WireGuard VPN
        </text>
      </g>

      <line x1="20" y1="372" x2="540" y2="372" className="axis" />
      <text className="t-lbl" x="20" y="362">LINK · CELLULAR / WI-FI / ETHERNET</text>
      <text className="t-lbl" x="540" y="362" textAnchor="end">
        UDP · TCP · MQTT
      </text>
    </svg>
  );
}

/** Product card preview: a stylised UAVcast-Pro dashboard. */
export function UavcastMini() {
  return (
    <div className="uvm-mini" aria-hidden="true">
      <div className="uvm-mini__side">
        <i style={{width: '70%'}} />
        <i className="on" style={{width: '85%'}} />
        <i style={{width: '60%'}} />
        <i style={{width: '78%'}} />
        <i style={{width: '52%'}} />
        <i style={{width: '66%'}} />
        <i style={{width: '58%'}} />
      </div>
      <div className="uvm-mini__main">
        <div className="uvm-tile">
          <div className="k">CPU</div>
          <div className="v">38%</div>
        </div>
        <div className="uvm-tile">
          <div className="k">Temp</div>
          <div className="v">52.3°C</div>
        </div>
        <div className="uvm-tile">
          <div className="k">LTE</div>
          <div className="v">−71 dBm</div>
        </div>
        <div className="uvm-tile wide">
          <div className="k">Uplink · last 60 s</div>
          <svg viewBox="0 0 300 46" width="100%" height="46" preserveAspectRatio="none">
            <path d="M0 34 L20 30 L40 32 L60 22 L80 26 L100 18 L120 24 L140 14 L160 20 L180 12 L200 18 L220 10 L240 16 L260 8 L280 14 L300 9 L300 46 L0 46Z" fill="var(--accent-soft)" />
            <path d="M0 34 L20 30 L40 32 L60 22 L80 26 L100 18 L120 24 L140 14 L160 20 L180 12 L200 18 L220 10 L240 16 L260 8 L280 14 L300 9" fill="none" stroke="var(--accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const PLANE = 'M0 -9 L2 -3 L9 1 L9 3 L2 1 L1.5 6 L4 8 L4 9 L0 8 L-4 9 L-4 8 L-1.5 6 L-2 1 L-9 3 L-9 1 L-2 -3 Z';

/** Product card preview: a stylised Fleet Manager map. */
export function FleetMini() {
  return (
    <div className="uvm-mapmini" aria-hidden="true">
      <svg viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="180" fill="var(--m-panel)" />
        <g stroke="var(--m-line)" strokeWidth="1">
          <path d="M0 30H400M0 70H400M0 110H400M0 150H400M50 0V180M110 0V180M170 0V180M230 0V180M290 0V180M350 0V180" />
        </g>
        <path d="M-10 140 C 60 120, 90 150, 150 120 S 260 60, 410 80" fill="none" stroke="var(--m-dim)" strokeWidth="7" strokeLinecap="round" />
        <path d="M40 60 L 96 92 L 150 76" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 4" />
        <g transform="translate(150 76) rotate(64)">
          <path d={PLANE} fill="var(--accent)" />
        </g>
        <g transform="translate(92 130) rotate(-20)">
          <path d={PLANE} fill="var(--ok)" />
        </g>
        <g transform="translate(210 40)">
          <circle r="9" fill="none" stroke="var(--faint)" strokeDasharray="2 2" />
          <g transform="scale(.66)">
            <path d={PLANE} fill="var(--faint)" />
          </g>
        </g>
      </svg>
      <div className="uvm-mapmini__list">
        <div className="row">
          <span className="uvm-dot" style={{['--dot' as string]: 'var(--warn)'}} />
          Inspect-07<span className="s">ARMED</span>
        </div>
        <div className="row">
          <span className="uvm-dot" style={{['--dot' as string]: 'var(--ok)'}} />
          Survey-03<span className="s">ONLINE</span>
        </div>
        <div className="row">
          <span className="uvm-dot" />
          Mapper-11<span className="s">4 h ago</span>
        </div>
      </div>
    </div>
  );
}

/** Small line drawings for the goal cards. */
export function GoalArt({kind}: {kind: string}) {
  const common = {className: 'uvm-goalart', viewBox: '0 0 120 64', 'aria-hidden': true} as const;
  switch (kind) {
    case 'first':
      return (
        <svg {...common}>
          <g className="ln">
            <circle cx="34" cy="20" r="9" />
            <circle cx="86" cy="20" r="9" />
            <circle cx="34" cy="48" r="9" />
            <circle cx="86" cy="48" r="9" />
            <path d="M41 26 52 32M79 26 68 32M41 42 52 36M79 42 68 36" />
          </g>
          <rect className="ac" x="50" y="27" width="20" height="14" rx="3" />
          <circle className="dot" cx="60" cy="34" r="2" />
        </svg>
      );
    case 'fleet':
      return (
        <svg {...common}>
          <path className="ln" d="M8 14 32 6l28 8 28-8 24 8v44l-24-8-28 8-28-8-24 8Z" />
          <path className="ln dim" d="M32 6v44M60 14v44M88 6v44" />
          <path className="ac-ln" d="M20 44 C 36 30, 52 46, 66 30 S 90 20, 100 22" />
          <circle className="dot" cx="66" cy="30" r="3" />
          <circle className="dot ok" cx="100" cy="22" r="3" />
        </svg>
      );
    case 'api':
      return (
        <svg {...common}>
          <rect className="ln" x="10" y="8" width="100" height="48" rx="6" />
          <path className="ln dim" d="M10 18h100" />
          <circle className="dot" cx="17" cy="13" r="1.6" />
          <circle className="dot dim" cx="23" cy="13" r="1.6" />
          <path className="ac-ln" d="m42 30-8 7 8 7M78 30l8 7-8 7M64 27l-8 20" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle className="ln" cx="60" cy="32" r="22" />
          <circle className="ln" cx="60" cy="32" r="9" />
          <path className="ac-ln" d="m44 16 9 9M67 39l9 9M76 16l-9 9M53 39l-9 9" />
        </svg>
      );
  }
}
