import React from 'react';
import {translate} from '@docusaurus/Translate';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import Icon from '@site/src/components/Icon';
import {Brand, ThemeToggle} from '@site/src/theme/Navbar/Content';

export default function NavbarMobileSidebarHeader() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <div className="navbar-sidebar__brand uvm-drawer-head">
      <Brand onClick={() => mobileSidebar.toggle()} />
      <div className="uvm-spacer" />
      <ThemeToggle />
      <button
        type="button"
        className="uvm-iconbtn"
        aria-label={translate({id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel', message: 'Close navigation bar'})}
        onClick={() => mobileSidebar.toggle()}>
        <Icon name="x" />
      </button>
    </div>
  );
}
