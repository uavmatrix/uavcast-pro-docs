/**
 * The UAVcast-Pro one-line install command, in one place. Used by the home
 * page hero, the navbar/drawer, the footer and the installation page
 * (<InstallCommand/> in MDX), so they can't drift apart.
 */
export const INSTALL_COMMAND = 'curl -fsSL https://install.uavmatrix.com | sudo bash';

/** Installation page (base-relative, trailing slash). */
export const INSTALL_DOC = '/get-started/installation/';

/** Anchor of the "Install in one command" box at the top of the installation page. */
export const INSTALL_ANCHOR = 'install-command';
