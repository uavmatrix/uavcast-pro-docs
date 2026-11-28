import React from 'react';

/**
 * Wrap an ordered Markdown list to render numbered steps with a rail:
 *
 *   <Steps>
 *
 *   1. Open **Camera**.
 *   2. Select **Start Camera**.
 *
 *   </Steps>
 *
 * Optional `start` continues numbering (e.g. after an interruption).
 */
export default function Steps({children, start}: {children: React.ReactNode; start?: number}) {
  return (
    <div className="uvm-steps" style={start ? ({counterReset: `uvm-step ${start - 1}`} as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
