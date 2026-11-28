import React, {useEffect, useMemo, useState} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useLocation, useHistory} from '@docusaurus/router';
import Translate, {translate} from '@docusaurus/Translate';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import Icon from '@site/src/components/Icon';
import {AREA_BY_KEY} from '@site/src/data/navigation';
import {Mark, SCOPES, useSearchEngine} from '@site/src/components/Search/Modal';
import {snippet, tokenize} from '@site/src/components/Search/engine';

/** Full results page: /search/?q=… (target of the WebSite SearchAction). */
function Results() {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const [q, setQ] = useState(params.get('q') ?? '');
  const [scope, setScope] = useState<string | undefined>(params.get('area') ?? undefined);
  const {engine, error} = useSearchEngine();

  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (scope) p.set('area', scope);
    history.replace({search: p.toString() ? `?${p}` : ''});
  }, [q, scope, history]);

  const terms = useMemo(() => tokenize(q).map((t) => t.toLowerCase()), [q]);
  const hits = useMemo(() => (engine && q.trim() ? engine.search(q.trim(), scope).slice(0, 50) : []), [engine, q, scope]);
  const label = (k: string) => {
    const a = AREA_BY_KEY[k as keyof typeof AREA_BY_KEY];
    return a ? translate({id: a.id, message: a.label}) : k;
  };

  return (
    <div className="uvm-searchpage">
      <h1>
        <Translate id="searchPage.title">Search the docs</Translate>
      </h1>
      <label className="uvm-bigsearch uvm-bigsearch--input">
        <Icon name="search" size={18} />
        <input
          type="search"
          value={q}
          autoFocus
          onChange={(e) => setQ(e.target.value)}
          placeholder={translate({id: 'search.placeholder', message: 'Search guides, settings and error messages'})}
          aria-label={translate({id: 'search.dialog', message: 'Search documentation'})}
        />
      </label>
      <div className="uvm-palette__scope uvm-searchpage__scope">
        <button type="button" aria-pressed={!scope} onClick={() => setScope(undefined)}>
          {translate({id: 'search.all', message: 'All'})}
        </button>
        {SCOPES.map((s) => (
          <button key={s} type="button" aria-pressed={scope === s} onClick={() => setScope(scope === s ? undefined : s)} className={`uvm-area--${s}`}>
            <span className="uvm-dot" />
            {label(s)}
          </button>
        ))}
      </div>
      {error && <p className="uvm-searchpage__note">{translate({id: 'search.noIndex', message: 'The search index is created by the production build. Run npm run build, then npm run serve.'})}</p>}
      {q.trim() && engine && (
        <p className="uvm-searchpage__note" role="status">
          {translate({id: 'searchPage.count', message: '{n} results for “{q}”'}, {n: hits.length, q: q.trim()})}
        </p>
      )}
      <ol className="uvm-searchpage__list">
        {hits.map((h) => (
          <li key={h.u}>
            <Link to={h.u}>
              <span className={`uvm-searchpage__area uvm-area--${h.a}`}>
                <span className="uvm-dot" />
                {label(h.a)}
                {h.l > 1 && <> · {h.p}</>}
              </span>
              <span className="uvm-searchpage__t">
                <Mark text={h.t} terms={terms} />
              </span>
              <span className="uvm-searchpage__s">
                <Mark text={snippet(h.c, terms, 220)} terms={terms} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Layout title={translate({id: 'searchPage.metaTitle', message: 'Search'})} description="Search the UAVmatrix documentation.">
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="uvm-wrap">
        <BrowserOnly fallback={<div className="uvm-searchpage" />}>{() => <Results />}</BrowserOnly>
      </main>
    </Layout>
  );
}
