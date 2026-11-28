import React, {useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Translate, {translate} from '@docusaurus/Translate';
import {openSearch} from '@site/src/theme/SearchBar';
import Icon from '@site/src/components/Icon';
import {AREAS, AREA_HOME} from '@site/src/data/navigation';
import {useDocResolver} from '@site/src/hooks/useDocResolver';
import type {Props} from '@theme/NotFound/Content';
import {track} from '@site/src/analytics';

export default function NotFoundContent({className}: Props) {
  const {resolve} = useDocResolver();
  useEffect(() => {
    track('docs_404', {path: window.location.pathname, referrer: document.referrer});
  }, []);
  const areas = AREAS.map((a) => ({...a, href: resolve(AREA_HOME[a.key], {areaFallback: a.key})})).filter((a) => a.href);
  return (
    <main className={clsx('uvm-404', className)}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="uvm-404__in">
        <div className="uvm-label">
          <span className="uvm-404__code">404</span> · <Translate id="notFound.kicker">Page not found</Translate>
        </div>
        <h1>
          <Translate id="theme.NotFound.title">This page has moved or never existed.</Translate>
        </h1>
        <p>
          <Translate id="theme.NotFound.p1">
            The docs were reorganized in 2026 and most old addresses redirect automatically. Search for what you need, or pick a section below.
          </Translate>
        </p>
        <button type="button" className="uvm-bigsearch" onClick={() => openSearch()}>
          <Icon name="search" size={18} />
          <span className="uvm-bigsearch__ph">{translate({id: 'home.searchPlaceholder', message: 'Search guides, settings and error messages'})}</span>
          <kbd className="uvm-searchbtn__kbd">⌘K</kbd>
        </button>
        <div className="uvm-404__grid">
          {areas.map((a) => (
            <Link key={a.key} to={a.href!} className={clsx('uvm-404__area', `uvm-area--${a.key}`)}>
              <span className="uvm-dot" />
              <span>
                <b>{a.label}</b>
                <small>{a.blurb}</small>
              </span>
              <Icon name="arrow" size={14} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
