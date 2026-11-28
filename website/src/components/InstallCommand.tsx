import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Icon from '@site/src/components/Icon';
import {currentPath, track} from '@site/src/analytics';
import {useDocResolver} from '@site/src/hooks/useDocResolver';
import {INSTALL_ANCHOR, INSTALL_COMMAND, INSTALL_DOC} from '@site/src/data/install';

/** Resolved installation page (locale-aware), and the link to its command box. */
export function useInstallLinks(): {page: string; command: string} {
  const {resolve} = useDocResolver();
  const page = resolve(INSTALL_DOC, {areaFallback: 'get-started', homeOk: false}) ?? INSTALL_DOC;
  return {page, command: `${page}#${INSTALL_ANCHOR}`};
}

function CopyCommand({compact}: {compact?: boolean}) {
  const [done, setDone] = useState(false);
  const t = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(t.current), []);
  const copy = useCallback(async () => {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(INSTALL_COMMAND);
      else {
        const {default: c} = await import('copy-text-to-clipboard');
        c(INSTALL_COMMAND);
      }
      track('docs_code_copied', {path: currentPath(), language: 'bash'});
      setDone(true);
      t.current = window.setTimeout(() => setDone(false), 1400);
    } catch {
      /* ignore */
    }
  }, []);
  const copied = translate({id: 'install.copied', message: 'Copied'});
  return (
    <button
      type="button"
      className={clsx('uvm-cb__copy', 'uvm-install__copy', done && 'is-done')}
      onClick={copy}
      aria-label={done ? copied : translate({id: 'install.copyAria', message: 'Copy the install command'})}>
      <Icon name={done ? 'check' : 'copy'} size={13} />
      {!compact && <span>{done ? copied : translate({id: 'install.copy', message: 'Copy'})}</span>}
      <span className="uvm-sr" aria-live="polite">
        {done ? copied : ''}
      </span>
    </button>
  );
}

/** The command in a copyable mono box: `$ curl … | sudo bash  [Copy]`. */
export function InstallCommandBox({compact, className}: {compact?: boolean; className?: string}) {
  return (
    <div className={clsx('uvm-install__box', compact && 'uvm-install__box--compact', className)}>
      <span className="uvm-install__prompt" aria-hidden="true">
        $
      </span>
      <code className="uvm-install__cmd" translate="no">
        {INSTALL_COMMAND}
      </code>
      <CopyCommand compact={compact} />
    </div>
  );
}

/**
 * <InstallCommand /> in MDX.
 * - default ("top"): the "Install in one command" box at the top of the installation page,
 *   carrying the anchor the navbar and footer link to.
 * - variant="step": the same command inside a step, without the anchor or heading.
 */
export default function InstallCommand({variant = 'top'}: {variant?: 'top' | 'step'}) {
  const brokenLinks = useBrokenLinks();
  if (variant === 'top') brokenLinks.collectAnchor(INSTALL_ANCHOR);
  if (variant === 'step') return <InstallCommandBox className="uvm-install--step" />;
  return (
    <div id={INSTALL_ANCHOR} className="uvm-install uvm-install--doc">
      <div className="uvm-install__label">
        <Icon name="term" size={13} />
        <Translate id="install.oneCommand">Install in one command</Translate>
      </div>
      <InstallCommandBox />
      <p className="uvm-install__note">
        <Translate id="install.docNote">
          Run it on the companion computer (64-bit Raspberry Pi OS, Debian or Ubuntu, with internet). The steps below explain what it does and how to prepare the device.
        </Translate>
      </p>
    </div>
  );
}

/** Home page hero block: label, command, link to the full instructions. */
export function InstallHero() {
  const {page} = useInstallLinks();
  return (
    <div className="uvm-install uvm-install--hero">
      <div className="uvm-install__label">
        <Icon name="term" size={13} />
        <Translate id="install.heroLabel">Install UAVcast-Pro</Translate>
      </div>
      <InstallCommandBox />
      <Link to={page} className="uvm-install__more">
        <Translate id="install.moreLink">Other methods and requirements</Translate>
        <Icon name="arrow" size={13} />
      </Link>
    </div>
  );
}
