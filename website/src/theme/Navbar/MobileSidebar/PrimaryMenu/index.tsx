import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import Icon from '@site/src/components/Icon';
import {track} from '@site/src/analytics';
import {AREAS, AREA_HOME} from '@site/src/data/navigation';
import {useDocResolver} from '@site/src/hooks/useDocResolver';
import {useLocales} from '@site/src/hooks/useLocales';
import {useTopNav} from '@site/src/theme/Navbar/Content';

export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const {resolve} = useDocResolver();
  const nav = useTopNav();
  const locales = useLocales();
  const {siteConfig} = useDocusaurusContext();
  const close = () => mobileSidebar.toggle();
  const areas = AREAS.map((a) => ({...a, href: resolve(AREA_HOME[a.key], {areaFallback: a.key})})).filter((a) => a.href);
  return (
    <div className="uvm-drawer">
      <div className="uvm-drawer__label">{translate({id: 'drawer.areas', message: 'Documentation'})}</div>
      <ul className="menu__list">
        {areas.map((a) => (
          <li key={a.key} className="menu__list-item">
            <Link className={`menu__link uvm-drawer__area uvm-area--${a.key}`} to={a.href!} onClick={close}>
              <span className="uvm-dot" />
              {translate({id: a.id, message: a.label})}
            </Link>
          </li>
        ))}
        {nav
          .filter((l) => !l.area)
          .map((l) => (
            <li key={l.id} className="menu__list-item">
              <Link className="menu__link uvm-drawer__area" to={l.href!} onClick={close}>
                <Icon name="history" size={14} />
                {translate({id: l.id, message: l.label})}
              </Link>
            </li>
          ))}
      </ul>
      <div className="uvm-drawer__label">{translate({id: 'nav.language', message: 'Language'})}</div>
      <div className="uvm-drawer__langs">
        {locales.map((l) =>
          l.published ? (
            <Link
              key={l.locale}
              to={l.href}
              lang={l.htmlLang}
              className={l.current ? 'is-current' : undefined}
              autoAddBaseUrl={false}
              onClick={() => !l.current && track('docs_locale_switch', {from: locales.find((x) => x.current)!.locale, to: l.locale}, {beacon: true})}>
              {l.label}
            </Link>
          ) : (
            <span key={l.locale} lang={l.htmlLang} className="is-disabled" title={translate({id: 'nav.languageSoon', message: 'Soon'})}>
              {l.label}
            </span>
          ),
        )}
      </div>
      <a className="uvm-btn uvm-btn--outline uvm-drawer__cta" href={siteConfig.customFields?.fleetManagerUrl as string} target="_blank" rel="noopener">
        {translate({id: 'nav.openFleet', message: 'Open Fleet Manager'})}
        <Icon name="ext" size={13} />
      </a>
    </div>
  );
}
