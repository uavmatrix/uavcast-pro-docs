import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import {useColorMode} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import SearchBar from '@theme/SearchBar';
import Icon from '@site/src/components/Icon';
import {track} from '@site/src/analytics';
import Menu from '@site/src/components/Menu';
import {PRODUCTS, TOP_NAV} from '@site/src/data/navigation';
import {useDocResolver} from '@site/src/hooks/useDocResolver';
import {useLocales} from '@site/src/hooks/useLocales';

export function Brand({onClick}: {onClick?: () => void}) {
  const home = useBaseUrl('/');
  const logo = useBaseUrl('/img/logo.webp');
  return (
    <Link to={home} className="uvm-brand" onClick={onClick} aria-label={translate({id: 'nav.homeAria', message: 'UAVmatrix Docs home'})}>
      <img src={logo} alt="" width={22} height={22} decoding="async" />
      <span>UAVmatrix</span>
      <span className="uvm-brand__docs">{translate({id: 'nav.brandDocs', message: 'Docs'})}</span>
    </Link>
  );
}

function useCurrentArea(): string | undefined {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const rel = pathname.slice(siteConfig.baseUrl.length);
  return rel.split('/')[0] || undefined;
}

function ProductMenu() {
  const {resolve} = useDocResolver();
  const area = useCurrentArea();
  const current = PRODUCTS.find((p) => p.key === area) ?? PRODUCTS[2];
  const label =
    current.key === 'all' ? translate({id: 'product.allShort', message: 'All products'}) : current.label;
  return (
    <Menu
      label={translate({id: 'product.menuLabel', message: 'Products'})}
      className="uvm-product"
      button={
        <>
          <span>{label}</span>
          <Icon name="down" className="uvm-ghost__chev" />
        </>
      }>
      {(close) =>
        PRODUCTS.map((p) => {
          const to = resolve(p.to, {areaFallback: p.key === 'all' ? undefined : p.key});
          if (!to) return null;
          return (
            <Link
              key={p.key}
              to={to}
              role="menuitemradio"
              aria-checked={p.key === current.key}
              className="uvm-mi"
              onClick={close}>
              <span className="uvm-glyph">
                <Icon name={p.icon} />
              </span>
              <span>
                <span className="uvm-mi__title">{p.label}</span>
                <span className="uvm-mi__sub">{p.sub}</span>
              </span>
              <Icon name="check" className="uvm-mi__tick" />
            </Link>
          );
        })
      }
    </Menu>
  );
}

export function LocaleMenu({compact}: {compact?: boolean}) {
  const locales = useLocales();
  const current = locales.find((l) => l.current)!;
  return (
    <Menu
      align="right"
      className="uvm-lang"
      ariaLabel={translate({id: 'nav.language', message: 'Language'})}
      label={translate({id: 'nav.languageLabel', message: 'Language · same as the UAVcast-Pro app'})}
      button={
        <>
          <Icon name="globe" />
          {!compact && <span className="uvm-mono uvm-lang__code">{current.locale.replace('zh-Hans', 'ZH').replace('zh-Hant', 'ZH-TW').toUpperCase()}</span>}
        </>
      }>
      {(close) => (
        <>
          <div className="uvm-lang__grid">
            {locales.map((l) =>
              l.published ? (
                <Link
                  key={l.locale}
                  to={l.href}
                  lang={l.htmlLang}
                  hrefLang={l.htmlLang}
                  role="menuitemradio"
                  aria-checked={l.current}
                  className="uvm-mi"
                  onClick={() => {
                    if (!l.current) track('docs_locale_switch', {from: current.locale, to: l.locale}, {beacon: true});
                    close();
                  }}
                  autoAddBaseUrl={false}>
                  <span className="uvm-lang__name">{l.label}</span>
                  <span className="uvm-lang__prefix">{l.prefix}</span>
                </Link>
              ) : (
                <span key={l.locale} className="uvm-mi uvm-mi--disabled" role="menuitemradio" aria-checked={false} aria-disabled="true" lang={l.htmlLang} tabIndex={-1}>
                  <span className="uvm-lang__name">{l.label}</span>
                  <span className="uvm-lang__soon">{translate({id: 'nav.languageSoon', message: 'Soon'})}</span>
                </span>
              ),
            )}
          </div>
          <div className="uvm-menu__foot">
            {translate({
              id: 'nav.languageFoot',
              message: 'Translations are on the way. The product UI is already available in all of these languages.',
            })}
          </div>
        </>
      )}
    </Menu>
  );
}

export function ThemeToggle() {
  const {colorMode, setColorMode} = useColorMode();
  const next = colorMode === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="uvm-iconbtn"
      onClick={() => setColorMode(next)}
      title={translate({id: 'nav.theme', message: 'Switch between dark and light mode'})}
      aria-label={translate({id: 'nav.theme', message: 'Switch between dark and light mode'})}>
      <Icon name="sun" className="uvm-theme-sun" />
      <Icon name="moon" className="uvm-theme-moon" />
    </button>
  );
}

export function useTopNav() {
  const {resolve} = useDocResolver();
  return TOP_NAV.map((l) => ({...l, href: resolve(l.to, {areaFallback: l.area})})).filter((l) => l.href);
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const nav = useTopNav();
  const {siteConfig} = useDocusaurusContext();
  const area = useCurrentArea();
  const fleetUrl = siteConfig.customFields?.fleetManagerUrl as string;

  return (
    <div className="navbar__inner uvm-bar">
      <button
        type="button"
        className="uvm-iconbtn uvm-only-mobile"
        aria-label={translate({id: 'nav.openMenu', message: 'Open navigation'})}
        aria-expanded={mobileSidebar.shown}
        onClick={mobileSidebar.toggle}>
        <Icon name="menu" />
      </button>
      <Brand />
      <span className="uvm-slash" aria-hidden="true">
        /
      </span>
      <ProductMenu />
      <nav className="uvm-navlinks" aria-label={translate({id: 'nav.primary', message: 'Primary'})}>
        {nav.map((l) => (
          <Link
            key={l.id}
            to={l.href!}
            className={clsx(l.area && area === l.area && 'is-active')}
            aria-current={l.area && area === l.area ? 'true' : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="uvm-spacer" />
      <SearchBar />
      <LocaleMenu />
      <ThemeToggle />
      <span className="uvm-vsep uvm-hide-md" />
      <a className="uvm-btn uvm-btn--outline uvm-hide-md" href={fleetUrl} target="_blank" rel="noopener">
        {translate({id: 'nav.openFleet', message: 'Open Fleet Manager'})}
        <Icon name="ext" size={13} className="uvm-faint" />
      </a>
    </div>
  );
}
