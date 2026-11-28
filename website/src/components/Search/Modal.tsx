import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import {AREA_BY_KEY} from '@site/src/data/navigation';
import {SUGGESTED_QUERIES} from '@site/src/data/home';
import {highlightParts, loadEngine, snippet, tokenize, type Engine, type Hit} from './engine';
import {track} from '@site/src/analytics';

const RECENT_KEY = 'uvm-search-recent';

function readRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]').slice(0, 5);
  } catch {
    return [];
  }
}
function saveRecent(q: string) {
  try {
    const list = [q, ...readRecent().filter((x) => x !== q)].slice(0, 5);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
}

export function Mark({text, terms}: {text: string; terms: string[]}) {
  return (
    <>
      {highlightParts(text, terms).map((p, i) => (p.m ? <mark key={i}>{p.s}</mark> : <React.Fragment key={i}>{p.s}</React.Fragment>))}
    </>
  );
}

export function useSearchEngine() {
  const url = useBaseUrl('/search-docs.json');
  const [engine, setEngine] = useState<Engine | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let live = true;
    loadEngine(url)
      .then((e) => live && setEngine(e))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, [url]);
  return {engine, error};
}

export const SCOPES = ['uavcast-pro', 'fleet-manager', 'guides', 'troubleshooting'] as const;

export default function SearchModal({initialQuery, onClose}: {initialQuery: string; onClose: () => void}) {
  const {engine, error} = useSearchEngine();
  const [q, setQ] = useState(initialQuery);
  const [scope, setScope] = useState<string | undefined>();
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const {i18n} = useDocusaurusContext();

  useEffect(() => {
    setRecent(readRecent());
    const el = input.current;
    if (el) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  const terms = useMemo(() => tokenize(q.trim()).map((t) => t.toLowerCase()), [q]);

  const allHits = useMemo(() => (engine && q.trim() ? engine.search(q.trim(), scope) : []), [engine, q, scope]);

  // Analytics: one docs_search per settled query.
  const lastTracked = useRef('');
  useEffect(() => {
    const query = q.trim();
    if (!engine || query.length < 2) return undefined;
    const t = window.setTimeout(() => {
      if (lastTracked.current === query) return;
      lastTracked.current = query;
      track('docs_search', {query, results_count: allHits.length});
    }, 800);
    return () => window.clearTimeout(t);
  }, [engine, q, allHits.length]);

  const groups = useMemo(() => {
    if (!engine || !q.trim()) return [];
    const hits = allHits.slice(0, 14);
    const order: string[] = [];
    const by: Record<string, Hit[]> = {};
    for (const h of hits) {
      const k = h.a || 'other';
      if (!by[k]) {
        by[k] = [];
        order.push(k);
      }
      by[k].push(h);
    }
    return order.map((k) => ({area: k, hits: by[k]}));
  }, [engine, q, allHits]);

  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);
  useEffect(() => setActive(0), [q, scope]);

  const go = useCallback(
    (url: string, position?: number) => {
      if (q.trim()) saveRecent(q.trim());
      if (position) {
        if (lastTracked.current !== q.trim()) {
          lastTracked.current = q.trim();
          track('docs_search', {query: q.trim(), results_count: allHits.length});
        }
        track('docs_search_result_clicked', {query: q.trim(), url, position});
      }
      onClose();
      history.push(url);
    },
    [history, onClose, q, allHits.length],
  );

  useEffect(() => {
    const el = list.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({block: 'nearest'});
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && flat[active]) {
      e.preventDefault();
      go(flat[active].u, active + 1);
    } else if (e.key === 'Tab') {
      // Keep focus inside the dialog.
      const f = [...(e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('input,button,a[href]')];
      if (!f.length) return;
      const i = f.indexOf(document.activeElement as HTMLElement);
      const n = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : i === f.length - 1 ? 0 : i + 1;
      e.preventDefault();
      f[n].focus();
    }
  };

  const areaLabel = (k: string) =>
    AREA_BY_KEY[k as keyof typeof AREA_BY_KEY] ? translate({id: AREA_BY_KEY[k as keyof typeof AREA_BY_KEY].id, message: AREA_BY_KEY[k as keyof typeof AREA_BY_KEY].label}) : translate({id: 'search.other', message: 'Other'});

  let idx = -1;
  const body = (
    <div className="uvm-search-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="uvm-palette"
        role="dialog"
        aria-modal="true"
        aria-label={translate({id: 'search.dialog', message: 'Search documentation'})}
        onKeyDown={onKeyDown}>
        <div className="uvm-palette__in">
          <Icon name="search" size={18} />
          <input
            ref={input}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={translate({id: 'search.placeholder', message: 'Search guides, settings and error messages'})}
            aria-label={translate({id: 'search.dialog', message: 'Search documentation'})}
            aria-controls="uvm-search-results"
            aria-activedescendant={flat[active] ? `uvm-hit-${active}` : undefined}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
          />
          <button type="button" className="uvm-palette__esc" onClick={onClose} aria-label={translate({id: 'search.close', message: 'Close search'})}>
            <kbd>esc</kbd>
          </button>
        </div>
        <div className="uvm-palette__scope" role="group" aria-label={translate({id: 'search.scope', message: 'Limit results to'})}>
          <button type="button" aria-pressed={!scope} onClick={() => setScope(undefined)}>
            {translate({id: 'search.all', message: 'All'})}
          </button>
          {SCOPES.map((s) => (
            <button key={s} type="button" aria-pressed={scope === s} onClick={() => setScope(scope === s ? undefined : s)} className={`uvm-area--${s}`}>
              <span className="uvm-dot" />
              {areaLabel(s)}
            </button>
          ))}
        </div>
        <div className="uvm-palette__res" id="uvm-search-results" role="listbox" ref={list}>
          {error && (
            <div className="uvm-palette__empty">
              <Icon name="info" size={18} />
              <p>
                {translate({
                  id: 'search.noIndex',
                  message: 'The search index is created by the production build. Run npm run build, then npm run serve.',
                })}
              </p>
            </div>
          )}
          {!error && !q.trim() && (
            <div className="uvm-palette__start">
              {recent.length > 0 && (
                <>
                  <div className="uvm-palette__grp">{translate({id: 'search.recent', message: 'Recent'})}</div>
                  {recent.map((r) => (
                    <button key={r} type="button" className="uvm-palette__suggest" onClick={() => setQ(r)}>
                      <Icon name="history" size={14} />
                      {r}
                    </button>
                  ))}
                </>
              )}
              <div className="uvm-palette__grp">{translate({id: 'search.try', message: 'Try'})}</div>
              {SUGGESTED_QUERIES.map((s) => (
                <button key={s.q} type="button" className="uvm-palette__suggest" onClick={() => setQ(s.q)}>
                  <Icon name="search" size={14} />
                  {translate({id: s.id, message: s.label})}
                </button>
              ))}
            </div>
          )}
          {!error && q.trim() && engine && flat.length === 0 && (
            <div className="uvm-palette__empty">
              <p>
                {translate({id: 'search.none', message: 'No results for “{q}”.'}, {q: q.trim()})}
              </p>
              <p className="uvm-palette__hint">
                {translate({id: 'search.noneHint', message: 'Try the name of a setting or the exact error message, or ask on Discord.'})}
              </p>
            </div>
          )}
          {!error && q.trim() && !engine && <div className="uvm-palette__empty">{translate({id: 'search.loading', message: 'Loading search index…'})}</div>}
          {groups.map((g) => (
            <div key={g.area} role="presentation">
              <div className={`uvm-palette__grp uvm-area--${g.area}`}>
                <span className="uvm-dot" />
                {areaLabel(g.area)}
              </div>
              {g.hits.map((h) => {
                idx += 1;
                const i = idx;
                const isPage = h.l === 1;
                return (
                  <a
                    key={h.u}
                    id={`uvm-hit-${i}`}
                    data-idx={i}
                    href={h.u}
                    role="option"
                    aria-selected={i === active}
                    className="uvm-hit"
                    onMouseMove={() => i !== active && setActive(i)}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey) {
                        track('docs_search_result_clicked', {query: q.trim(), url: h.u, position: i + 1});
                        return;
                      }
                      e.preventDefault();
                      go(h.u, i + 1);
                    }}>
                    <span className="uvm-hit__ico">
                      <Icon name={isPage ? 'doc' : 'hash'} size={14} />
                    </span>
                    <span className="uvm-hit__body">
                      <span className="uvm-hit__t">
                        <Mark text={h.t} terms={terms} />
                      </span>
                      <span className="uvm-hit__p">
                        {isPage ? h.b || areaLabel(h.a) : h.p}
                        {' · '}
                        <Mark text={snippet(h.c, terms, 110)} terms={terms} />
                      </span>
                    </span>
                    <Icon name="arrow" className="uvm-hit__ent" size={15} />
                  </a>
                );
              })}
            </div>
          ))}
        </div>
        <div className="uvm-palette__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> {translate({id: 'search.navigate', message: 'to navigate'})}
          </span>
          <span>
            <kbd>↵</kbd> {translate({id: 'search.open', message: 'to open'})}
          </span>
          <span className="uvm-hide-xs">
            <kbd>esc</kbd> {translate({id: 'search.toClose', message: 'to close'})}
          </span>
          <span className="uvm-palette__r uvm-mono">{i18n.currentLocale.toUpperCase()} · {translate({id: 'search.offline', message: 'offline index'})}</span>
        </div>
      </div>
    </div>
  );
  return createPortal(body, document.body);
}

