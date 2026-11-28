import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';

export type SymptomRow = {
  symptom: React.ReactNode;
  cause: React.ReactNode;
  /** anchor ("#check-1") or path */
  start: string;
  /** link text; default derived from the anchor ("#check-2" -> "Check 2") */
  label?: string;
};

function defaultLabel(start: string) {
  const m = start.match(/check-?(\d+)/i);
  if (m) return translate({id: 'symptom.check', message: 'Check {n}'}, {n: m[1]});
  const step = start.match(/step-?(\d+)/i);
  if (step) return translate({id: 'symptom.step', message: 'Step {n}'}, {n: step[1]});
  return translate({id: 'symptom.go', message: 'Go'});
}

/** "Match your symptom" table for troubleshooting pages. */
export default function SymptomTable({rows, title}: {rows: SymptomRow[]; title?: string}) {
  return (
    <div className="uvm-symptoms">
      <table>
        {title && <caption>{title}</caption>}
        <thead>
          <tr>
            <th scope="col">{translate({id: 'symptom.see', message: 'What you see'})}</th>
            <th scope="col">{translate({id: 'symptom.cause', message: 'Likely cause'})}</th>
            <th scope="col" className="uvm-symptoms__go">
              {translate({id: 'symptom.start', message: 'Start at'})}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="uvm-symptoms__s">{r.symptom}</td>
              <td>{r.cause}</td>
              <td className="uvm-symptoms__go">
                {r.start.startsWith('#') ? (
                  <a href={r.start}>
                    {r.label ?? defaultLabel(r.start)}
                    <Icon name="arrow" size={13} />
                  </a>
                ) : (
                  <Link to={r.start}>
                    {r.label ?? defaultLabel(r.start)}
                    <Icon name="arrow" size={13} />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
