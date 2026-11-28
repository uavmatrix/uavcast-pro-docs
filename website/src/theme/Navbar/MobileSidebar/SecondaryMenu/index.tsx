import React from 'react';
import Link from '@docusaurus/Link';
import {useNavbarMobileSidebar, useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import Translate, {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import {useInstallLinks} from '@site/src/components/InstallCommand';
import {useStoreLinks} from '@site/src/components/BuyLicense';

/**
 * Always offer the way back (the primary menu is rendered by our own component),
 * and the install shortcut, so it is one tap away from every doc page too.
 */
export default function NavbarMobileSidebarSecondaryMenu() {
  const secondaryMenu = useNavbarSecondaryMenu();
  const mobileSidebar = useNavbarMobileSidebar();
  const install = useInstallLinks();
  const store = useStoreLinks();
  return (
    <>
      <button type="button" className="clean-btn navbar-sidebar__back" onClick={() => secondaryMenu.hide()}>
        <Translate id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel">← All documentation</Translate>
      </button>
      <Link className="uvm-drawer__installlink" to={install.command} onClick={() => mobileSidebar.toggle()}>
        <Icon name="term" size={14} />
        {translate({id: 'drawer.install', message: 'Install UAVcast-Pro'})}
      </Link>
      <a className="uvm-drawer__installlink uvm-drawer__buylink" href={store.buy} target="_blank" rel="noopener">
        <Icon name="key" size={14} />
        {translate({id: 'buy.cta', message: 'Buy UAVcast-Pro'})}
        <Icon name="ext" size={12} />
      </a>
      {secondaryMenu.content}
    </>
  );
}
