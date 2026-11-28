/**
 * Client-side search over the per-locale index written by
 * plugins/search-index (search-docs.json). Loaded lazily on first use.
 */
import MiniSearch, {type SearchResult} from 'minisearch';

/** k = front-matter keywords (page entries only), boosted so e.g. "install link" finds the installation page first. */
export type SearchDoc = {u: string; t: string; p: string; b: string; c: string; a: string; l: number; k?: string};
export type Hit = SearchDoc & {id: number; score: number; terms: string[]};

const CJK = /[぀-ヿ㐀-䶿一-鿿가-힯]/;
const SPLIT = /[^\p{L}\p{N}_.:-]+/u;

/** Words, plus unigrams and bigrams for runs of CJK characters. */
export function tokenize(text: string): string[] {
  const out: string[] = [];
  for (const raw of text.split(SPLIT)) {
    const tok = raw.replace(/^[.:_-]+|[.:_-]+$/g, '');
    if (!tok) continue;
    if (CJK.test(tok)) {
      const chars = [...tok];
      let latin = '';
      for (let i = 0; i < chars.length; i += 1) {
        const ch = chars[i];
        if (CJK.test(ch)) {
          if (latin) {
            out.push(latin);
            latin = '';
          }
          out.push(ch);
          if (i + 1 < chars.length && CJK.test(chars[i + 1])) out.push(ch + chars[i + 1]);
        } else latin += ch;
      }
      if (latin) out.push(latin);
    } else {
      out.push(tok);
      // "flight-controller" also matches "flight" and "controller".
      if (/[-_.:]/.test(tok)) out.push(...tok.split(/[-_.:]+/).filter(Boolean));
    }
  }
  return out;
}

const processTerm = (t: string) => {
  const s = t.toLowerCase();
  return s.length > 0 ? s : null;
};

export type Engine = {
  search(q: string, area?: string): Hit[];
  docs: SearchDoc[];
};

let cache: Promise<Engine> | null = null;

export function loadEngine(url: string): Promise<Engine> {
  if (cache) return cache;
  cache = fetch(url, {credentials: 'same-origin'})
    .then((r) => {
      if (!r.ok) throw new Error(`search index ${r.status}`);
      return r.json() as Promise<SearchDoc[]>;
    })
    .then((docs) => {
      const ms = new MiniSearch<SearchDoc & {id: number}>({
        fields: ['t', 'p', 'b', 'c', 'k'],
        storeFields: ['u', 't', 'p', 'b', 'c', 'a', 'l'],
        tokenize,
        processTerm,
        searchOptions: {
          boost: {t: 4, p: 1.6, b: 0.6, c: 1, k: 6},
          prefix: (term, i, terms) => i === terms.length - 1 || term.length > 3,
          fuzzy: (term) => (term.length > 4 ? 0.18 : false),
          combineWith: 'AND',
        },
      });
      ms.addAll(docs.map((d, id) => ({...d, id})));
      const run = (q: string, area?: string): Hit[] => {
        const filter = area ? (r: SearchResult) => r.a === area : undefined;
        let res = ms.search(q, {filter});
        if (res.length === 0) res = ms.search(q, {filter, combineWith: 'OR'});
        // Page hits rank slightly above their own sections for equal scores.
        return res
          .map((r) => ({...(r as unknown as Hit), score: r.score * (r.l === 1 ? 1.15 : 1)}))
          .sort((a, b) => b.score - a.score);
      };
      return {search: run, docs};
    })
    .catch((e) => {
      cache = null;
      throw e;
    });
  return cache;
}

/** ~150 character window around the first matched term. */
export function snippet(text: string, terms: string[], len = 150): string {
  if (!text) return '';
  const lower = text.toLowerCase();
  let pos = -1;
  for (const t of terms) {
    const i = lower.indexOf(t.toLowerCase());
    if (i !== -1 && (pos === -1 || i < pos)) pos = i;
  }
  if (pos === -1) return text.length > len ? `${text.slice(0, len).trimEnd()}…` : text;
  const start = Math.max(0, pos - 50);
  const s = text.slice(start, start + len).trim();
  return `${start > 0 ? '…' : ''}${s}${start + len < text.length ? '…' : ''}`;
}

export function highlightParts(text: string, terms: string[]): {s: string; m: boolean}[] {
  const clean = [...new Set(terms.filter((t) => t.length > 0))].sort((a, b) => b.length - a.length);
  if (!clean.length) return [{s: text, m: false}];
  const re = new RegExp(`(${clean.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'i');
  return text
    .split(re)
    .map((s, i) => ({s, m: i % 2 === 1}))
    .filter((p) => p.s !== '');
}
