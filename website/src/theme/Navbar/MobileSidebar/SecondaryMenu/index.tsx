import React from 'react';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import Translate from '@docusaurus/Translate';

/** Always offer the way back: the primary menu is rendered by our own component. */
export default function NavbarMobileSidebarSecondaryMenu() {
  const secondaryMenu = useNavbarSecondaryMenu();
  return (
    <>
      <button type="button" className="clean-btn navbar-sidebar__back" onClick={() => secondaryMenu.hide()}>
        <Translate id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel">← All documentation</Translate>
      </button>
      {secondaryMenu.content}
    </>
  );
}
