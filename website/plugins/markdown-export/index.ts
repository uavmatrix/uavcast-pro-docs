/**
 * Markdown copies of every docs page, plus llms.txt / llms-full.txt.
 *
 * postBuild (runs once per built locale):
 *   - converts the rendered article of every doc page to clean Markdown and
 *     writes it next to the HTML as `<route without trailing slash>.md`,
 *     e.g. /get-started/quick-start/ -> /get-started/quick-start.md and
 *     /es/get-started/quick-start/ -> /es/get-started/quick-start.md.
 *     Components come out readable: Screenshot -> image + caption, Steps ->
 *     numbered list, Tabs -> one labelled section per tab, admonitions ->
 *     blockquotes, the install command -> a bash code block.
 *   - for the default locale, writes /llms.txt (index of all pages in sidebar
 *     order, grouped by section, per https://llmstxt.org) and /llms-full.txt
 *     (every page concatenated).
 * The doc page head links its copy with <link rel="alternate" type="text/markdown">
 * (src/theme/DocItem/Metadata), and "Copy page" / "View as Markdown" use it.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {load} from 'cheerio';
import type {AnyNode, Element} from 'domhandler';
import type {LoadContext, Plugin} from '@docusaurus/types';
import {markdownHref as markdownPath} from '../../src/data/markdown';

type DocInfo = {permalink: string; title: string; description: string; id: string};
type SidebarItem = {type: string; id?: string; items?: SidebarItem[]; label?: string; link?: {type: string; id?: string}};

const SKIP_CLASSES = [
  'uvm-docmeta',
  'uvm-toc-mobile',
  'hash-link',
  'uvm-cb__head',
  'uvm-install__prompt',
  'uvm-install__copy',
  'uvm-buy__ico',
  'uvm-sr',
  'uvm-shot__bar',
  'uvm-shot__zoomhint',
  'uvm-no-copy',
];
const SKIP_TAGS = new Set(['button', 'script', 'style', 'svg', 'noscript', 'template']);

const isEl = (n: AnyNode): n is Element => n.type === 'tag' || n.type === 'script' || n.type === 'style';
const cls = (el: Element) => (el.attribs?.class ?? '').split(/\s+/).filter(Boolean);
const hasCls = (el: Element, c: string) => cls(el).includes(c);
const clsStarts = (el: Element, p: string) => cls(el).some((c) => c.startsWith(p));
const skip = (el: Element) => SKIP_TAGS.has(el.name) || cls(el).some((c) => SKIP_CLASSES.includes(c)) || el.attribs?.hidden === '' && !el.attribs?.role;

function kids(el: Element): Element[] {
  return el.children.filter(isEl);
}
function find(el: Element, pred: (e: Element) => boolean): Element | undefined {
  for (const c of kids(el)) {
    if (pred(c)) return c;
    const f = find(c, pred);
    if (f) return f;
  }
  return undefined;
}
function findAll(el: Element, pred: (e: Element) => boolean, out: Element[] = []): Element[] {
  for (const c of kids(el)) {
    if (pred(c)) out.push(c);
    findAll(c, pred, out);
  }
  return out;
}
function rawText(n: AnyNode): string {
  if (n.type === 'text') return (n as unknown as {data: string}).data;
  if (isEl(n)) return n.children.map(rawText).join('');
  return '';
}
const squash = (s: string) => s.replace(/\s+/g, ' ');

class Converter {
  base: string;
  constructor(base: string) {
    this.base = base;
  }

  abs(href: string): string {
    try {
      return new URL(href, this.base).toString();
    } catch {
      return href;
    }
  }

  inline(el: Element): string {
    let out = '';
    for (const c of el.children) {
      if (c.type === 'text') {
        out += squash((c as unknown as {data: string}).data);
        continue;
      }
      if (!isEl(c) || skip(c)) continue;
      const t = c.name;
      if (t === 'code') out += `\`${rawText(c)}\``;
      else if (t === 'strong' || t === 'b') out += `**${this.inline(c).trim()}**`;
      else if (t === 'em' || t === 'i') out += `*${this.inline(c).trim()}*`;
      else if (t === 'a') {
        const label = this.inline(c).trim();
        const href = c.attribs.href;
        out += href && label ? `[${label}](${this.abs(href)})` : label;
      } else if (t === 'br') out += '\n';
      else if (t === 'img') out += `![${c.attribs.alt ?? ''}](${this.abs(c.attribs.src ?? '')})`;
      else out += this.inline(c);
    }
    return out;
  }

  code(el: Element): string {
    let lang = '';
    for (let p: Element | null = el; p; p = (p.parent as Element) ?? null) {
      const m = cls(p).find((c) => c.startsWith('language-'));
      if (m) {
        lang = m.slice('language-'.length);
        break;
      }
      if (p.type !== 'tag') break;
    }
    const lines = findAll(el, (e) => hasCls(e, 'token-line'));
    const body = lines.length ? lines.map((l) => rawText(l)).join('\n') : rawText(el);
    return `\`\`\`${lang}\n${body.replace(/\n+$/, '')}\n\`\`\``;
  }

  list(el: Element): string {
    const ordered = el.name === 'ol';
    let i = Number(el.attribs.start ?? 1);
    const items = kids(el)
      .filter((li) => li.name === 'li')
      .map((li) => {
        const marker = ordered ? `${i++}.` : '-';
        const pad = ' '.repeat(marker.length + 1);
        const md = this.blocks(li).trim();
        // First line on the marker; everything else (paragraphs, code, nested lists) indented under it.
        return md
          .split('\n')
          .map((line, n) => (n === 0 ? `${marker} ${line}` : line ? `${pad}${line}` : ''))
          .join('\n');
      });
    // Loose list (blank line between items) when any item spans several lines.
    return items.join(items.some((it) => it.includes('\n')) ? '\n\n' : '\n');
  }

  table(el: Element): string {
    const rows = findAll(el, (e) => e.name === 'tr').map((r) => kids(r).map((cell) => this.inline(cell).trim().replace(/\|/g, '\\|').replace(/\n/g, ' ')));
    if (!rows.length) return '';
    const w = Math.max(...rows.map((r) => r.length));
    const pad = (r: string[]) => [...r, ...Array(w - r.length).fill('')];
    return [`| ${pad(rows[0]).join(' | ')} |`, `|${' --- |'.repeat(w)}`, ...rows.slice(1).map((r) => `| ${pad(r).join(' | ')} |`)].join('\n');
  }

  /** One block element -> Markdown. */
  block(c: Element, depth: number): string {
    const t = c.name;
    if (/^h[1-6]$/.test(t)) return `${'#'.repeat(Number(t[1]))} ${this.inline(c).trim()}`;
    if (t === 'p') return this.inline(c).trim();
    if (t === 'pre') return this.code(c);
    if (t === 'ul' || t === 'ol') return this.list(c);
    if (t === 'table') return this.table(c);
    if (t === 'hr') return '---';
    if (t === 'blockquote') return quote(this.blocks(c, depth));
    if (t === 'figure') {
      const img = find(c, (e) => e.name === 'img' && !hasCls(e, 'uvm-shot__img--dark'));
      const cap = find(c, (e) => e.name === 'figcaption');
      const caption = cap ? squash(this.inline(cap)).trim() : '';
      if (img) return `![${img.attribs.alt ?? ''}](${this.abs(img.attribs.src ?? '')})${caption ? `\n\n*${caption}*` : ''}`;
      const svg = find(c, (e) => e.name === 'svg' && !!e.attribs['aria-label']);
      return [svg ? `*${svg.attribs['aria-label']}*` : '', caption ? `*${caption}*` : ''].filter(Boolean).join('\n\n');
    }
    if (hasCls(c, 'theme-admonition')) {
      const head = find(c, (e) => clsStarts(e, 'admonitionHeading'));
      const body = find(c, (e) => clsStarts(e, 'admonitionContent'));
      const title = head ? squash(this.inline(head)).trim() : '';
      return quote(`${title ? `**${title}**\n\n` : ''}${body ? this.blocks(body, 0) : ''}`);
    }
    if (hasCls(c, 'tabs-container')) {
      const labels = findAll(c, (e) => e.attribs?.role === 'tab').map((e) => squash(this.inline(e)).trim());
      const panels = findAll(c, (e) => e.attribs?.role === 'tabpanel');
      return panels.map((p, i) => `**${labels[i] ?? `Tab ${i + 1}`}**\n\n${this.blocks(p, depth)}`).join('\n\n');
    }
    if (hasCls(c, 'uvm-install__box')) {
      const cmd = find(c, (e) => hasCls(e, 'uvm-install__cmd'));
      return cmd ? `\`\`\`bash\n${rawText(cmd).trim()}\n\`\`\`` : '';
    }
    if (hasCls(c, 'uvm-buy__actions')) {
      return kids(c)
        .filter((a) => a.name === 'a')
        .map((a) => `[${this.inline(a).trim()}](${this.abs(a.attribs.href ?? '')})`)
        .join(' · ');
    }
    if (t === 'aside') return quote(this.blocks(c, depth));
    if (t === 'details') return this.blocks(c, depth);
    if (t === 'summary') return `**${this.inline(c).trim()}**`;
    if (['div', 'section', 'header', 'span', 'nav', 'main', 'article'].includes(t)) return this.blocks(c, depth);
    return this.inline(c).trim();
  }

  blocks(el: Element, depth = 0): string {
    const parts: string[] = [];
    let inlineRun = '';
    const flush = () => {
      if (inlineRun.trim()) parts.push(inlineRun.trim());
      inlineRun = '';
    };
    for (const c of el.children) {
      if (c.type === 'text') {
        inlineRun += squash((c as unknown as {data: string}).data);
        continue;
      }
      if (!isEl(c) || skip(c)) continue;
      if (['a', 'code', 'strong', 'b', 'em', 'i', 'img', 'br'].includes(c.name)) {
        inlineRun += this.inline({...c, children: [c]} as unknown as Element);
        continue;
      }
      flush();
      const md = this.block(c, depth);
      if (md) parts.push(md);
    }
    flush();
    return parts.filter(Boolean).join('\n\n');
  }
}

function quote(s: string): string {
  return s
    .trim()
    .split('\n')
    .map((l) => (l ? `> ${l}` : '>'))
    .join('\n');
}

/** Rendered doc page HTML -> Markdown (null if it isn't a doc page). */
export function htmlToMarkdown(html: string, pageUrl: string): {md: string; title: string; description: string} | null {
  const $ = load(html);
  const root = $('.theme-doc-markdown').get(0) as Element | undefined;
  if (!root) return null;
  const title = $('article h1').first().text().trim() || $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') ?? '';
  const body = new Converter(pageUrl).blocks(root).replace(/\n{3,}/g, '\n\n').trim();
  // Put the description under the title, then the body.
  const lines = body.split('\n');
  const h1 = lines[0]?.startsWith('# ') ? lines.shift() : `# ${title}`;
  const rest = lines.join('\n').trim();
  const md = `${h1}\n\n${description ? `> ${description}\n\n` : ''}${rest}\n\nSource: ${pageUrl}\n`;
  return {md, title, description};
}

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/** Sidebar order of doc ids (categories with a linked index doc come first). */
function sidebarOrder(items: SidebarItem[], out: string[] = []): string[] {
  for (const it of items) {
    if (it.type === 'doc' && it.id) out.push(it.id);
    if (it.type === 'category') {
      if (it.link?.type === 'doc' && it.link.id) out.push(it.link.id);
      sidebarOrder(it.items ?? [], out);
    }
  }
  return out;
}

const SECTION_TITLES: Record<string, string> = {
  'get-started': 'Get started',
  'uavcast-pro': 'UAVcast-Pro',
  'fleet-manager': 'Fleet Manager',
  guides: 'Guides',
  troubleshooting: 'Troubleshooting & FAQ',
  reference: 'Reference',
};

export default function markdownExportPlugin(context: LoadContext): Plugin {
  let ordered: DocInfo[] = [];
  return {
    name: 'uavmatrix-markdown-export',
    allContentLoaded({allContent}) {
      const docsContent = (allContent['docusaurus-plugin-content-docs'] as Record<string, unknown> | undefined)?.default as
        | {loadedVersions: {docs: DocInfo[]; sidebars: Record<string, SidebarItem[]>}[]}
        | undefined;
      const version = docsContent?.loadedVersions?.[0];
      if (!version) return;
      const byId = new Map(version.docs.map((d) => [d.id, d]));
      const ids = Object.values(version.sidebars).flatMap((items) => sidebarOrder(items));
      const seen = new Set<string>();
      ordered = [];
      for (const id of ids) {
        const d = byId.get(id);
        if (d && !seen.has(id)) {
          seen.add(id);
          ordered.push(d);
        }
      }
      for (const d of version.docs) if (!seen.has(d.id)) ordered.push(d);
    },
    async postBuild({routesPaths, outDir, baseUrl, siteConfig}) {
      const site = siteConfig.url.replace(/\/$/, '');
      const pages = new Map<string, {md: string; title: string; description: string}>();
      for (const route of routesPaths) {
        if (/^\/(search|404)\/?$|\/tags\//.test(route.slice(baseUrl.length - 1))) continue;
        const rel = route.slice(baseUrl.length);
        const file = path.join(outDir, rel, 'index.html');
        if (!(await exists(file))) continue;
        const html = await fs.readFile(file, 'utf8');
        if (!html.includes('theme-doc-markdown')) continue;
        const r = htmlToMarkdown(html, `${site}${route}`);
        if (!r) continue;
        const mdRel = markdownPath(rel ? `/${rel}` : '/index/').replace(/^\//, '');
        await fs.mkdir(path.dirname(path.join(outDir, mdRel)), {recursive: true});
        await fs.writeFile(path.join(outDir, mdRel), r.md);
        pages.set(route, r);
      }
      console.log(`[markdown] ${context.i18n.currentLocale}: wrote ${pages.size} .md pages`);

      if (context.i18n.currentLocale !== context.i18n.defaultLocale) return;

      // llms.txt: sidebar order, grouped by top-level section.
      const list = ordered.length
        ? ordered.map((d) => ({route: d.permalink.replace(/\/?$/, '/'), title: d.title, description: d.description}))
        : [...pages.entries()].map(([route, p]) => ({route, title: p.title, description: p.description}));
      const groups = new Map<string, string[]>();
      const full: string[] = [];
      for (const item of list) {
        const page = pages.get(item.route);
        if (!page) continue;
        const section = item.route.slice(baseUrl.length).split('/')[0] || 'other';
        const line = `- [${page.title || item.title}](${site}${markdownPath(item.route)}): ${(page.description || item.description).trim()}`;
        if (!groups.has(section)) groups.set(section, []);
        groups.get(section)!.push(line);
        full.push(page.md);
      }
      const order = Object.keys(SECTION_TITLES);
      const sections = [...groups.keys()].sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
      const llms = [
        '# UAVmatrix Docs',
        '',
        '> Documentation for UAVcast-Pro (software on a drone\'s companion computer that streams MAVLink telemetry and H.264 video to ground stations over 4G/LTE, Wi-Fi or a VPN) and UAVmatrix Fleet Manager (the web dashboard for managing drones, ground stations and teams).',
        '',
        `Every page below is also available as HTML without the .md suffix. Translations exist under /es/, /it/, /nl/, /pl/, /pt/, /ru/, /tr/, /zh-cn/ and /zh-tw/ with the same paths. The full English documentation in one file: ${site}${baseUrl}llms-full.txt`,
        '',
        ...sections.flatMap((s) => [`## ${SECTION_TITLES[s] ?? s}`, '', ...groups.get(s)!, '']),
      ].join('\n');
      await fs.writeFile(path.join(outDir, 'llms.txt'), llms);
      await fs.writeFile(path.join(outDir, 'llms-full.txt'), `# UAVmatrix Docs (full)\n\n${full.join('\n\n---\n\n')}`);
      console.log(`[markdown] llms.txt: ${full.length} pages in ${sections.length} sections`);
    },
  };
}
