#!/usr/bin/env node
/**
 * Validates the redirects in a finished build (default: ./build), using the
 * resolved map in .docusaurus/redirects-report.json:
 *  - every target exists as a page (<target>/index.html),
 *  - every source has a meta-refresh page pointing at its target,
 *  - no source is also a real page.
 * Exit code 1 on any problem. Usage: npm run check:redirects [-- <buildDir>]
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.resolve(process.argv[2] ?? path.join(site, 'build'));
const reportFile = path.join(site, '.docusaurus', 'redirects-report.json');
if (!fs.existsSync(reportFile) || !fs.existsSync(build)) {
  console.error('No build or redirects report. Run npm run build first.');
  process.exit(1);
}
const r = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
const problems = [];
const exists = (p) => fs.existsSync(p) || fs.existsSync(p.toLowerCase());
for (const {from, to} of r.map) {
  if (!fs.existsSync(path.join(build, to, 'index.html'))) problems.push(`target missing: ${from} -> ${to}`);
  const page = path.join(build, from, 'index.html');
  if (!exists(page)) {
    problems.push(`redirect page missing: ${from}`);
    continue;
  }
  const html = fs.readFileSync(fs.existsSync(page) ? page : page.toLowerCase(), 'utf8');
  if (!/http-equiv="?refresh/.test(html)) problems.push(`source is a real page: ${from}`);
  else if (!html.includes(`${to}"`) && !html.includes(`${to}'`) && !html.includes(`url=https://docs.uavmatrix.com${to}`)) problems.push(`redirect page points elsewhere: ${from}`);
}
console.log(`rules: ${r.total}, written: ${r.written}, dropped: ${r.dropped.length}`);
for (const f of r.targetsUsingFallback) console.log(`  fallback: ${f.key}: wanted ${f.primary}, using ${f.usedFallback}`);
for (const d of r.dropped) console.log(`  dropped: ${d.from} (${d.key})`);
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`All ${r.map.length} redirect pages exist and point at real pages.`);
