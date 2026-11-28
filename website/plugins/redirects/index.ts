/**
 * Resolves redirects/redirects.ts against the pages that actually exist in the
 * build, then:
 *  - writes meta-refresh pages through @docusaurus/plugin-client-redirects,
 *  - writes pages for legacy paths with spaces (the plugin rejects those),
 *  - optionally writes a `_redirects` file (REDIRECTS_FILE=1) for hosts with real 301s,
 *  - writes .docusaurus/redirects-report.json and logs dropped or fallback targets.
 *
 * Runs for the default locale only: the old URLs never had a locale prefix.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import clientRedirects from '@docusaurus/plugin-client-redirects';
import {redirectRules, targets, type TargetKey} from '../../redirects/redirects';

type Resolved = {from: string; to: string; key: TargetKey; fallback: boolean};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function redirectPage(toUrl: string): string {
  const u = escapeHtml(toUrl);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${u}"><link rel="canonical" href="${u}"><title>Moved</title></head><body><script>window.location.replace(${JSON.stringify(toUrl)}+window.location.search+window.location.hash)</script><p>This page has moved to <a href="${u}">${u}</a>.</p></body></html>`;
}

export function resolveRedirects(routes: Set<string>) {
  const resolved: Resolved[] = [];
  const dropped: {from: string; key: TargetKey}[] = [];
  const shadowed: string[] = [];
  const resolvedTargets: Partial<Record<TargetKey, {to: string; fallback: boolean} | null>> = {};

  for (const key of Object.keys(targets) as TargetKey[]) {
    const list = targets[key];
    const idx = list.findIndex((p) => routes.has(p));
    resolvedTargets[key] = idx === -1 ? null : {to: list[idx], fallback: idx > 0};
  }

  for (const rule of redirectRules) {
    if (routes.has(rule.from)) {
      shadowed.push(rule.from);
      continue;
    }
    const t = resolvedTargets[rule.to];
    if (!t) dropped.push({from: rule.from, key: rule.to});
    else resolved.push({from: rule.from, to: t.to, key: rule.to, fallback: t.fallback});
  }
  return {resolved, dropped, shadowed, resolvedTargets};
}

export default function redirectsPlugin(context: LoadContext): Plugin {
  return {
    name: 'uavmatrix-redirects',
    async postBuild(props) {
      const {i18n} = context;
      if (i18n.currentLocale !== i18n.defaultLocale) return;

      const routes = new Set(props.routesPaths);
      const site = context.siteConfig.url.replace(/\/$/, '');
      const {resolved, dropped, shadowed, resolvedTargets} = resolveRedirects(routes);

      // Sources must be unique after normalising the trailing slash.
      const norm = (p: string) => `${p.replace(/\/+$/, '')}/`;
      const seen = new Map<string, string>();
      const dupes: string[] = [];
      for (const r of resolved) {
        const k = norm(r.from);
        if (seen.has(k)) dupes.push(`${r.from} (also ${seen.get(k)})`);
        else seen.set(k, r.from);
      }
      if (dupes.length) {
        throw new Error(`[redirects] duplicate redirect sources in redirects/redirects.ts:\n- ${dupes.join('\n- ')}`);
      }

      // Never overwrite a file that is already in the build (a page or a
      // static file), and on case-insensitive file systems (macOS) write one
      // file per case-folded path. _redirects below keeps every variant.
      const probe = path.join(props.outDir, '.uvm-case-probe');
      await fs.writeFile(probe, '');
      const caseInsensitive = await fs
        .access(path.join(props.outDir, '.UVM-CASE-PROBE'))
        .then(() => true)
        .catch(() => false);
      await fs.rm(probe, {force: true});
      const folded = new Set<string>();
      const existing: string[] = [];
      const writable: Resolved[] = [];
      for (const r of resolved) {
        const file = path.join(props.outDir, r.from, 'index.html');
        const key = caseInsensitive ? file.toLowerCase() : file;
        if (folded.has(key)) continue;
        folded.add(key);
        if (await fs.access(file).then(() => true, () => false)) {
          existing.push(r.from);
          continue;
        }
        writable.push(r);
      }

      const plain = writable.filter((r) => !r.from.includes(' '));
      const spaced = writable.filter((r) => r.from.includes(' '));

      // 1. Meta-refresh pages via the official plugin.
      const inner = clientRedirects(context, {
        id: 'default',
        fromExtensions: [],
        toExtensions: [],
        // Absolute targets: the meta-refresh page's canonical must be a full URL.
        redirects: plain.map(({from, to}) => ({from, to: `${site}${to}`})),
        createRedirects: undefined,
      } as never);
      await inner?.postBuild?.(props as never);

      // 2. Paths with spaces.
      for (const r of spaced) {
        const file = path.join(props.outDir, r.from, 'index.html');
        await fs.mkdir(path.dirname(file), {recursive: true});
        await fs.writeFile(file, redirectPage(`${site}${r.to}`));
      }

      // 3. Optional: a Cloudflare Pages / Netlify `_redirects` file with real
      // 301s. The site is hosted on GitHub Pages, which ignores it, so it is
      // only written when REDIRECTS_FILE=1.
      if (process.env.REDIRECTS_FILE === '1') {
        const lines = ['# Generated by plugins/redirects from redirects/redirects.ts. Do not edit.'];
        for (const r of resolved) {
          const from = encodeURI(r.from);
          lines.push(`${from} ${r.to} 301`, `${from.replace(/\/$/, '')} ${r.to} 301`);
        }
        await fs.writeFile(path.join(props.outDir, '_redirects'), `${lines.join('\n')}\n`);
      }

      // 4. Report.
      const fallbacks = Object.entries(resolvedTargets)
        .filter(([, v]) => v?.fallback)
        .map(([k, v]) => ({key: k, primary: targets[k as TargetKey][0], usedFallback: v!.to}));
      const missing = Object.entries(resolvedTargets)
        .filter(([, v]) => v === null)
        .map(([k]) => k);
      const report = {
        generatedAt: new Date().toISOString(),
        total: redirectRules.length,
        written: resolved.length,
        dropped,
        shadowedByRealPages: shadowed,
        skippedExistingFiles: existing,
        targetsUsingFallback: fallbacks,
        targetsMissing: missing,
        map: resolved.map(({from, to}) => ({from, to})),
      };
      await fs.writeFile(
        path.join(context.generatedFilesDir, 'redirects-report.json'),
        JSON.stringify(report, null, 2),
      );
      const log = (m: string) => console.log(`[redirects] ${m}`);
      log(`${resolved.length}/${redirectRules.length} redirects written.`);
      if (fallbacks.length)
        log(`targets using a fallback page: ${fallbacks.map((f) => `${f.key} -> ${f.usedFallback}`).join(', ')}`);
      if (missing.length) log(`targets with no page (redirects dropped): ${missing.join(', ')}`);
      if (existing.length) log(`sources that already exist as files (skipped): ${existing.join(', ')}`);
      if (shadowed.length) log(`sources that are real pages (skipped): ${shadowed.join(', ')}`);
    },
  };
}
