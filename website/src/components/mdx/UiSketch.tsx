import React from 'react';
import {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import styles from './UiSketch.module.css';

/**
 * Simplified, hand-drawn illustration of a third-party program's UI (Mission Planner,
 * QGroundControl), used where no real screenshot exists. Only the labels the reader
 * needs are written out; everything else is drawn as neutral bars so nothing is invented.
 *
 * <UiSketch variant="qgc-video-settings" caption="…" />
 */
export type UiSketchVariant = 'mission-planner-connect' | 'mission-planner-gstreamer' | 'qgc-video-settings';

type Props = {
  variant: UiSketchVariant;
  caption?: React.ReactNode;
};

const TITLES: Record<UiSketchVariant, string> = {
  'mission-planner-connect': 'Mission Planner',
  'mission-planner-gstreamer': 'Mission Planner',
  'qgc-video-settings': 'QGroundControl',
};

const ALTS: Record<UiSketchVariant, string> = {
  'mission-planner-connect':
    'Illustration of Mission Planner: in the top-right corner the connection type set to UDP and the Connect button, then a dialog asking for the listen port with 14550 entered.',
  'mission-planner-gstreamer':
    'Illustration of Mission Planner: right-click menu on the HUD with Video highlighted and its submenu item Set GStreamer Source.',
  'qgc-video-settings':
    'Illustration of QGroundControl Application Settings: the Video page with Source set to UDP h.264 Video Stream, the UDP address 0.0.0.0:5600 and Low Latency Mode.',
};

/** Numbered call-out matching the numbered steps on the page. */
function Pin({x, y, n}: {x: number; y: number; n: number}) {
  return (
    <g className={styles.pin}>
      <circle cx={x} cy={y} r="10" />
      <text x={x} y={y + 4} textAnchor="middle">
        {n}
      </text>
    </g>
  );
}

function Bars({x, y, widths, gap = 22}: {x: number; y: number; widths: number[]; gap?: number}) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height="7" rx="3.5" className={styles.dim} />
      ))}
    </>
  );
}

function MissionPlannerConnect() {
  return (
    <>
      {/* toolbar */}
      <rect x="0" y="0" width="640" height="58" className={styles.chrome} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={18 + i * 52} y="12" width="26" height="22" rx="5" className={styles.chromeDim} />
          <rect x={14 + i * 52} y="40" width="34" height="5" rx="2.5" className={styles.chromeDim} />
        </g>
      ))}
      {/* connection box, top right */}
      <rect x="392" y="10" width="108" height="24" rx="4" className={styles.field} />
      <text x="402" y="27" className={styles.mono}>UDP</text>
      <path d="M486 19l5 5 5-5" className={styles.stroke} />
      <rect x="392" y="38" width="108" height="14" rx="3" className={styles.fieldDim} />
      <rect x="512" y="10" width="112" height="42" rx="6" className={styles.accentBox} />
      <text x="568" y="36" textAnchor="middle" className={styles.accentText}>CONNECT</text>
      <Pin x={382} y={22} n={1} />
      <Pin x={512} y={12} n={2} />
      {/* map area */}
      <rect x="0" y="58" width="640" height="302" className={styles.canvas} />
      <rect x="0" y="58" width="196" height="302" className={styles.panel} />
      <Bars x={18} y={84} widths={[120, 92, 140, 80, 110, 70, 130, 96, 84, 118, 76]} />
      {/* listen port dialog */}
      <rect x="276" y="140" width="250" height="132" rx="8" className={styles.dialog} />
      <text x="294" y="168" className={styles.label}>Listen port</text>
      <rect x="294" y="184" width="214" height="30" rx="4" className={styles.fieldStrong} />
      <text x="306" y="204" className={styles.mono}>14550</text>
      <rect x="378" y="228" width="60" height="28" rx="5" className={styles.accentBox} />
      <text x="408" y="247" textAnchor="middle" className={styles.accentText}>OK</text>
      <rect x="448" y="228" width="60" height="28" rx="5" className={styles.field} />
      <rect x="462" y="239" width="32" height="6" rx="3" className={styles.dim} />
      <Pin x={276} y={140} n={3} />
    </>
  );
}

function MissionPlannerGstreamer() {
  return (
    <>
      <rect x="0" y="0" width="640" height="34" className={styles.chrome} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={16 + i * 46} y="10" width="30" height="14" rx="4" className={styles.chromeDim} />
      ))}
      {/* HUD */}
      <rect x="0" y="34" width="330" height="200" className={styles.sky} />
      <path d="M0 150 L330 120 L330 234 L0 234 Z" className={styles.ground} />
      <path d="M135 134h24M171 134h24" className={styles.hudLine} />
      <circle cx="165" cy="134" r="3" className={styles.hudDot} />
      <rect x="6" y="64" width="34" height="120" rx="3" className={styles.hudTape} />
      <rect x="290" y="64" width="34" height="120" rx="3" className={styles.hudTape} />
      <Pin x={165} y={108} n={1} />
      {/* under HUD: tabs panel */}
      <rect x="0" y="234" width="330" height="126" className={styles.panel} />
      <Bars x={16} y={252} widths={[60, 52, 70, 48, 64]} gap={0} />
      <Bars x={16} y={276} widths={[260, 210, 240, 180]} />
      {/* map */}
      <rect x="330" y="34" width="310" height="326" className={styles.canvas} />
      {/* context menu */}
      <rect x="214" y="104" width="150" height="150" rx="6" className={styles.dialog} />
      <rect x="220" y="112" width="138" height="24" rx="4" className={styles.accentSoft} />
      <text x="232" y="128" className={styles.label}>Video</text>
      <path d="M346 119l5 5-5 5" className={styles.stroke} />
      <Bars x={232} y={150} widths={[84, 100, 72, 92, 66]} gap={20} />
      {/* submenu */}
      <rect x="364" y="106" width="196" height="96" rx="6" className={styles.dialog} />
      <Bars x={378} y={122} widths={[96]} />
      <rect x="370" y="140" width="184" height="24" rx="4" className={styles.accentSoft} />
      <text x="382" y="156" className={styles.label}>Set GStreamer Source</text>
      <Bars x={378} y={180} widths={[110]} />
      <Pin x={214} y={104} n={2} />
      <Pin x={564} y={152} n={3} />
    </>
  );
}

function QgcVideoSettings() {
  return (
    <>
      <rect x="0" y="0" width="640" height="40" className={styles.chrome} />
      <rect x="12" y="8" width="24" height="24" rx="5" className={styles.accentBox} />
      <text x="24" y="25" textAnchor="middle" className={styles.accentText}>Q</text>
      <text x="48" y="25" className={styles.chromeText}>Application Settings</text>
      <Pin x={40} y={12} n={1} />
      {/* left menu */}
      <rect x="0" y="40" width="168" height="320" className={styles.panel} />
      <Bars x={18} y={62} widths={[70, 96, 60, 84]} gap={30} />
      <rect x="10" y="176" width="148" height="28" rx="5" className={styles.accentSoft} />
      <text x="20" y="194" className={styles.label}>Video</text>
      <Bars x={18} y={226} widths={[78, 64, 90, 58]} gap={30} />
      {/* content */}
      <rect x="168" y="40" width="472" height="320" className={styles.canvas} />
      <text x="196" y="80" className={styles.heading}>Video</text>
      <text x="196" y="122" className={styles.label}>Source</text>
      <rect x="350" y="104" width="250" height="28" rx="4" className={styles.fieldStrong} />
      <text x="362" y="123" className={styles.mono}>UDP h.264 Video Stream</text>
      <path d="M584 115l5 5 5-5" className={styles.stroke} />
      <Pin x={610} y={118} n={3} />
      <text x="196" y="166" className={styles.label}>UDP URL</text>
      <rect x="350" y="148" width="250" height="28" rx="4" className={styles.fieldStrong} />
      <text x="362" y="167" className={styles.mono}>0.0.0.0:5600</text>
      <Pin x={610} y={162} n={4} />
      <rect x="196" y="196" width="404" height="1" className={styles.dim} />
      <rect x="196" y="214" width="120" height="7" rx="3.5" className={styles.dim} />
      <rect x="350" y="208" width="250" height="20" rx="4" className={styles.fieldDim} />
      <text x="196" y="262" className={styles.label}>Low Latency Mode</text>
      <rect x="560" y="248" width="40" height="22" rx="11" className={styles.fieldDim} />
      <circle cx="571" cy="259" r="8" className={styles.knob} />
      <rect x="196" y="296" width="150" height="7" rx="3.5" className={styles.dim} />
      <rect x="350" y="290" width="250" height="20" rx="4" className={styles.fieldDim} />
      <Pin x={158} y={190} n={2} />
    </>
  );
}

export default function UiSketch({variant, caption}: Props) {
  const body =
    variant === 'mission-planner-connect' ? (
      <MissionPlannerConnect />
    ) : variant === 'mission-planner-gstreamer' ? (
      <MissionPlannerGstreamer />
    ) : (
      <QgcVideoSettings />
    );
  return (
    <figure className={`uvm-shot ${styles.sketch}`}>
      <div className="uvm-shot__bar" aria-hidden="true">
        <span className="uvm-shot__lights">
          <i />
          <i />
          <i />
        </span>
        <span className="uvm-shot__url">{TITLES[variant]}</span>
        <span className="uvm-shot__lights uvm-shot__lights--ghost" />
      </div>
      <div className="uvm-shot__body">
        <svg viewBox="0 0 640 360" role="img" aria-label={ALTS[variant]} className={styles.svg}>
          {body}
        </svg>
      </div>
      <figcaption>
        <Icon name="info" size={15} />
        <span>
          <span className={styles.tag}>{translate({id: 'sketch.tag', message: 'Illustration'})}</span> {caption}
        </span>
      </figcaption>
    </figure>
  );
}
