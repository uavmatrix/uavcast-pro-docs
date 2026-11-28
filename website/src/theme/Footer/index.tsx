import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import {useDocResolver} from '@site/src/hooks/useDocResolver';
import {useLocales} from '@site/src/hooks/useLocales';
import {INSTALL_ANCHOR, INSTALL_DOC} from '@site/src/data/install';
import {useStoreLinks} from '@site/src/components/BuyLicense';
import {track} from '@site/src/analytics';

type Item = {label: string; to?: string; href?: string};

function Col({title, items}: {title: string; items: Item[]}) {
  return (
    <div>
      <h2 className="uvm-foot__h">{title}</h2>
      <ul>
        {items.map((i) => (
          <li key={i.label}>
            {i.to ? (
              <Link to={i.to}>{i.label}</Link>
            ) : (
              <a href={i.href} target={i.href?.startsWith('mailto:') ? undefined : '_blank'} rel="noopener">
                {i.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const {siteConfig} = useDocusaurusContext();
  const {resolve} = useDocResolver();
  const logo = useBaseUrl('/img/logo.webp');
  const home = useBaseUrl('/');
  const locales = useLocales();
  const cf = siteConfig.customFields as Record<string, string>;
  const store = useStoreLinks();
  const r = (label: string, cands: string[], area?: string): Item | null => {
    const to = resolve(cands, {areaFallback: area, homeOk: false});
    return to ? {label, to} : null;
  };
  const products = [
    r('UAVcast-Pro', ['/uavcast-pro/'], 'uavcast-pro'),
    r('Fleet Manager', ['/fleet-manager/'], 'fleet-manager'),
    {label: translate({id: 'footer.store', message: 'UAVmatrix store'}), href: store.plans},
    {label: translate({id: 'buy.cta', message: 'Buy UAVcast-Pro'}), href: store.buy},
  ].filter(Boolean) as Item[];
  const installDoc = resolve(INSTALL_DOC, {areaFallback: 'get-started', homeOk: false});
  const resources = [
    installDoc ? {label: translate({id: 'footer.install', message: 'Install UAVcast-Pro'}), to: `${installDoc}#${INSTALL_ANCHOR}`} : null,
    r(translate({id: 'footer.quickStart', message: 'Quick start'}), ['/get-started/quick-start/', '/get-started/overview/'], 'get-started'),
    r(translate({id: 'footer.guides', message: 'Guides'}), ['/guides/'], 'guides'),
    r(translate({id: 'footer.troubleshooting', message: 'Troubleshooting'}), ['/troubleshooting/'], 'troubleshooting'),
    r(translate({id: 'footer.reference', message: 'Reference'}), ['/reference/'], 'reference'),
    r(translate({id: 'footer.changelog', message: 'Changelog'}), ['/reference/changelog/', '/uavcast-pro/changelog/']),
  ].filter(Boolean) as Item[];
  const community: Item[] = [
    {label: 'Discord', href: cf.discordUrl},
    {label: 'GitHub', href: cf.repo},
    {label: translate({id: 'footer.contact', message: 'Contact support'}), href: `mailto:${cf.supportEmail}`},
    {label: 'uavmatrix.com', href: cf.storeUrl},
  ];
  return (
    <footer className="uvm-foot">
      <div className="uvm-wrap uvm-foot__grid">
        <div className="uvm-foot__brand">
          <Link to={home} className="uvm-brand">
            <img src={logo} alt="" width={22} height={22} loading="lazy" decoding="async" />
            <span>UAVmatrix</span>
            <span className="uvm-brand__docs">{translate({id: 'nav.brandDocs', message: 'Docs'})}</span>
          </Link>
          <p>
            <Translate id="footer.tagline">Connectivity software for professional drone operators: UAVcast-Pro on the aircraft, Fleet Manager in the browser.</Translate>
          </p>
        </div>
        <Col title={translate({id: 'footer.products', message: 'Products'})} items={products} />
        <Col title={translate({id: 'footer.resources', message: 'Resources'})} items={resources} />
        <Col title={translate({id: 'footer.community', message: 'Community'})} items={community} />
        <div>
          <h2 className="uvm-foot__h">{translate({id: 'footer.language', message: 'Language'})}</h2>
          <ul className="uvm-foot__langs">
            {locales.map((l) => (
              <li key={l.locale}>
                {l.published ? (
                  <Link
                    to={l.href}
                    lang={l.htmlLang}
                    hrefLang={l.htmlLang}
                    autoAddBaseUrl={false}
                    aria-current={l.current ? 'true' : undefined}
                    onClick={() => !l.current && track('docs_locale_switch', {from: locales.find((x) => x.current)!.locale, to: l.locale}, {beacon: true})}>
                    <span>{l.label}</span>
                    <span className="uvm-foot__prefix">{l.prefix}</span>
                  </Link>
                ) : (
                  <span lang={l.htmlLang} className="is-disabled">
                    <span>{l.label}</span>
                    <span className="uvm-foot__prefix">{translate({id: 'nav.languageSoon', message: 'Soon'})}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="uvm-wrap uvm-foot__bottom">
        <span>© {new Date().getFullYear()} UAVmatrix</span>
        <span className="uvm-foot__links">
          <a href={`${cf.storeUrl}/privacy-policy`} target="_blank" rel="noopener">
            {translate({id: 'footer.privacy', message: 'Privacy'})}
          </a>
          <a href={`${cf.storeUrl}/terms`} target="_blank" rel="noopener">
            {translate({id: 'footer.terms', message: 'Terms'})}
          </a>
          <a href={cf.repo} target="_blank" rel="noopener">
            {translate({id: 'footer.source', message: 'Docs source on GitHub'})}
          </a>
        </span>
      </div>
    </footer>
  );
}
