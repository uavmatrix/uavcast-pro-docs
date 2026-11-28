/** Serialises the rendered article to clean Markdown (loaded on demand). */
const SKIP = '.uvm-docmeta, .uvm-toc-mobile, .hash-link, button, .uvm-shot__zoom, script, style, .uvm-no-copy';

function text(n: Node): string {
  return (n.textContent ?? '').replace(/\s+/g, ' ');
}

function inline(node: Node): string {
  let out = '';
  node.childNodes.forEach((c) => {
    if (c.nodeType === Node.TEXT_NODE) {
      out += (c.textContent ?? '').replace(/\s+/g, ' ');
      return;
    }
    if (!(c instanceof HTMLElement) || c.matches(SKIP)) return;
    const t = c.tagName.toLowerCase();
    if (t === 'code') out += `\`${c.textContent}\``;
    else if (t === 'strong' || t === 'b') out += `**${inline(c).trim()}**`;
    else if (t === 'em' || t === 'i') out += `*${inline(c).trim()}*`;
    else if (t === 'a') {
      const href = (c as HTMLAnchorElement).href;
      out += href ? `[${inline(c).trim()}](${href})` : inline(c);
    } else if (t === 'br') out += '\n';
    else if (t === 'img') out += `![${(c as HTMLImageElement).alt}]`;
    else out += inline(c);
  });
  return out;
}

function block(el: Element, depth = 0): string {
  const parts: string[] = [];
  el.childNodes.forEach((c) => {
    if (c.nodeType === Node.TEXT_NODE) {
      const t = c.textContent?.trim();
      if (t) parts.push(t);
      return;
    }
    if (!(c instanceof HTMLElement) || c.matches(SKIP)) return;
    const t = c.tagName.toLowerCase();
    const ind = '  '.repeat(depth);
    if (/^h[1-6]$/.test(t)) parts.push(`${'#'.repeat(Number(t[1]))} ${inline(c).trim()}`);
    else if (t === 'p') parts.push(inline(c).trim());
    else if (t === 'pre') {
      const lang = (c.closest('[class*="language-"]')?.className.match(/language-(\S+)/) ?? [])[1] ?? '';
      const code = [...c.querySelectorAll('.token-line')].map((l) => l.textContent).join('\n') || c.textContent || '';
      parts.push(`\`\`\`${lang}\n${code.replace(/\n$/, '')}\n\`\`\``);
    } else if (t === 'ul' || t === 'ol') {
      let i = 1;
      const items: string[] = [];
      c.querySelectorAll(':scope > li').forEach((li) => {
        const marker = t === 'ol' ? `${i++}.` : '-';
        const nested = [...li.children].filter((x) => /^(UL|OL|PRE|DIV)$/.test(x.tagName));
        const clone = li.cloneNode(true) as HTMLElement;
        clone.querySelectorAll(':scope > ul, :scope > ol, :scope > pre, :scope > div').forEach((x) => x.remove());
        let line = `${ind}${marker} ${inline(clone).trim()}`;
        nested.forEach((x) => {
          const inner = block(x.tagName === 'DIV' ? x : wrap(x), depth + 1);
          if (inner) line += `\n${inner}`;
        });
        items.push(line);
      });
      parts.push(items.join('\n'));
    } else if (t === 'table') {
      const rows = [...c.querySelectorAll('tr')].map((r) => [...r.children].map((cell) => text(cell).trim().replace(/\|/g, '\\|')));
      if (rows.length) {
        const w = rows[0].length;
        parts.push([`| ${rows[0].join(' | ')} |`, `|${' --- |'.repeat(w)}`, ...rows.slice(1).map((r) => `| ${r.join(' | ')} |`)].join('\n'));
      }
    } else if (t === 'figure') {
      const img = c.querySelector('img');
      const cap = c.querySelector('figcaption');
      parts.push(`![${img?.alt ?? ''}]${cap ? `\n*${text(cap).trim()}*` : ''}`);
    } else if (c.classList.contains('theme-admonition')) {
      const body = block(c.querySelector('[class*="admonitionContent"]') ?? c, 0);
      const title = text(c.querySelector('[class*="admonitionHeading"]') ?? document.createElement('span')).trim();
      parts.push(`> **${title}**\n${body.split('\n').map((l) => `> ${l}`).join('\n')}`);
    } else if (t === 'blockquote') parts.push(block(c).split('\n').map((l) => `> ${l}`).join('\n'));
    else if (t === 'hr') parts.push('---');
    else if (t === 'details') parts.push(block(c));
    else if (t === 'summary') parts.push(`**${inline(c).trim()}**`);
    else if (t === 'header' || t === 'div' || t === 'section' || t === 'span' || t === 'nav') {
      const inner = block(c, depth);
      if (inner) parts.push(inner);
    } else parts.push(inline(c).trim());
  });
  return parts.filter(Boolean).join('\n\n');
}

function wrap(el: Element): HTMLElement {
  const d = document.createElement('div');
  d.appendChild(el.cloneNode(true));
  return d;
}

export function articleToMarkdown(root: Element | null, url: string): string {
  if (!root) throw new Error('no article');
  return `${block(root).replace(/\n{3,}/g, '\n\n').trim()}\n\nSource: ${url}\n`;
}
