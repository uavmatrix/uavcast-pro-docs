/**
 * Offline search index + sitemap index.
 *
 * postBuild (runs once per built locale, so every locale gets its own index):
 *   - parses every built doc page, splits it into sections at h2/h3,
 *   - writes <locale outDir>/search-docs.json, loaded lazily by the ⌘K modal
 *     (src/theme/SearchBar) and the /search/ page.
 * For the default locale it also writes /sitemap-index.xml listing the sitemap
 * of every published locale.
 *
 * In `docusaurus start` there is no build output: the modal then explains that
 * search works in production builds (npm run build && npm run serve).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {parse, type HTMLElement} from 'node-html-parser';
import type {LoadContext, Plugin} from '@docusaurus/types';

export type SearchDoc = {
  /** url incl. anchor */
  u: string;
  /** heading (section) or page title */
  t: string;
  /** page title */
  p: string;
  /** breadcrumb trail, " › " separated */
  b: string;
  /** text content */
  c: string;
  /** area slug (first path segment) */
  a: string;
  /** 1 = page, 2/3 = heading level */
  l: number;
};

const SKIP = /^\/(search|404)\/?$|\/tags\//;
const MAX_TEXT = 1400;

const clean = (s: string) =>
  s
    .replace(/​/g, '')
    .replace(/\s+/g, ' ')
    .trim();

function headingText(el: HTMLElement): string {
  const c = el.clone() as HTMLElement;
  c.querySelectorAll('a.hash-link').forEach((a) => a.remove());
  return clean(c.textContent);
}

function extract(html: string, route: string, baseUrl: string): SearchDoc[] {
  const root = parse(html, {blockTextElements: {script: false, style: false, pre: true}});
  const md = root.querySelector('.theme-doc-markdown');
  if (!md) return [];

  const relRoute = route.startsWith(baseUrl) ? `/${route.slice(baseUrl.length)}` : route;
  const area = relRoute.split('/').filter(Boolean)[0] ?? '';
  const h1 = root.querySelector('article h1') ?? md.querySelector('h1');
  const title = h1 ? headingText(h1) : clean(root.querySelector('title')?.textContent ?? '');
  const crumbs = root
    .querySelectorAll('.theme-doc-breadcrumbs .breadcrumbs__item')
    .map((li) => clean(li.textContent))
    .filter(Boolean);
  // Drop the home crumb ("Docs") and the page itself.
  const trail = crumbs.slice(1, -1).join(' › ');
  const description =
    root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

  // Remove UI-only chrome from the content before reading text.
  md.querySelectorAll(
    'header, .uvm-docmeta, .uvm-lede, button, .theme-code-block button, figure .uvm-shot__placeholder-meta, .uvm-no-index',
  ).forEach((n) => n.remove());

  const docs: SearchDoc[] = [];
  let cur: SearchDoc = {u: route, t: title, p: title, b: trail, c: description, a: area, l: 1};
  const push = () => {
    cur.c = clean(cur.c).slice(0, MAX_TEXT);
    if (cur.l === 1 || cur.c || cur.t) docs.push(cur);
  };

  const walk = (nodes: HTMLElement[]) => {
    for (const node of nodes) {
      const tag = node.tagName?.toLowerCase();
      if (!tag) continue;
      if ((tag === 'h2' || tag === 'h3') && node.id) {
        push();
        cur = {
          u: `${route}#${node.id}`,
          t: headingText(node),
          p: title,
          b: trail ? `${trail} › ${title}` : title,
          c: '',
          a: area,
          l: tag === 'h2' ? 2 : 3,
        };
        continue;
      }
      // Descend into wrappers that may contain headings (e.g. Steps, tabs).
      if (node.querySelector('h2[id], h3[id]')) {
        walk(node.childNodes as HTMLElement[]);
        continue;
      }
      cur.c += ` ${node.structuredText ?? node.textContent}`;
    }
  };
  walk(md.childNodes as HTMLElement[]);
  push();
  return docs;
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export default function searchIndexPlugin(
  context: LoadContext,
  options: {publishedLocales: string[]},
): Plugin {
  return {
    name: 'uavmatrix-search-index',
    async postBuild({routesPaths, outDir, baseUrl}) {
      const docs: SearchDoc[] = [];
      for (const route of routesPaths) {
        if (SKIP.test(route)) continue;
        const rel = route.slice(baseUrl.length);
        const file = path.join(outDir, rel, 'index.html');
        if (!(await exists(file))) continue;
        const html = await fs.readFile(file, 'utf8');
        if (!html.includes('theme-doc-markdown')) continue;
        docs.push(...extract(html, route, baseUrl));
      }
      await fs.writeFile(path.join(outDir, 'search-docs.json'), JSON.stringify(docs));
      console.log(
        `[search] ${context.i18n.currentLocale}: indexed ${docs.filter((d) => d.l === 1).length} pages, ${docs.length} sections`,
      );

      const {i18n, siteConfig} = context;
      if (i18n.currentLocale === i18n.defaultLocale) {
        const site = siteConfig.url.replace(/\/$/, '');
        const entries = options.publishedLocales.map((loc) => {
          const lb = i18n.localeConfigs[loc]?.baseUrl ?? (loc === i18n.defaultLocale ? '/' : `/${loc}/`);
          return `  <sitemap><loc>${site}${lb}sitemap.xml</loc></sitemap>`;
        });
        await fs.writeFile(
          path.join(outDir, 'sitemap-index.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</sitemapindex>\n`,
        );
      }
    },
  };
}
