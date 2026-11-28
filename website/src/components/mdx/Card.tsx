import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useAllDocsData, useDoc} from '@docusaurus/plugin-content-docs/client';
import Icon, {type IconName} from '@site/src/components/Icon';

/** Resolve a relative "../x/y.mdx#a" href against the current doc's source folder. */
function useDocHref(href: string): string {
  let currentId: string | undefined;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentId = useDoc().metadata.id;
  } catch {
    currentId = undefined;
  }
  const docs = useAllDocsData().default?.versions?.[0]?.docs ?? [];
  const m = href.match(/^([^#?]+)\.mdx?([#?].*)?$/);
  if (!m || /^https?:/.test(href) || !currentId) return href;
  const base = currentId.split('/').slice(0, -1);
  const parts = m[1].startsWith('/') ? m[1].slice(1).split('/') : [...base, ...m[1].split('/')];
  const out: string[] = [];
  for (const p of parts) {
    if (p === '..') out.pop();
    else if (p !== '.' && p !== '') out.push(p);
  }
  const id = out.join('/');
  const doc = docs.find((d) => d.id === id) ?? docs.find((d) => d.id === `${id}/index`);
  return doc ? `${doc.path.endsWith('/') ? doc.path : `${doc.path}/`}${m[2] ?? ''}` : href;
}

/**
 * <CardGrid>
 *   <Card href="../uavcast-pro/camera.mdx" title="Camera" description="Resolution, bitrate, two cameras." />
 * </CardGrid>
 *
 * `href` accepts a relative .md/.mdx path (checked at build time) or a URL.
 * Optional: `icon` (an icon name), `meta` (small mono label above the title).
 */
export function Card({
  href,
  title,
  description,
  icon,
  meta,
  children,
}: {
  href: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconName;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const external = /^https?:\/\//.test(href);
  const to = useDocHref(href);
  return (
    <Link to={to} className={clsx('uvm-card', icon && 'uvm-card--icon')} {...(external ? {target: '_blank', rel: 'noopener'} : {})}>
      {icon && (
        <span className="uvm-card__ico">
          <Icon name={icon} />
        </span>
      )}
      <span className="uvm-card__body">
        {meta && <span className="uvm-card__meta">{meta}</span>}
        <span className="uvm-card__title">
          {title}
          <Icon name={external ? 'ext' : 'arrow'} size={14} />
        </span>
        {description && <span className="uvm-card__desc">{description}</span>}
        {children && <span className="uvm-card__desc">{children}</span>}
      </span>
    </Link>
  );
}

export function CardGrid({children, cols}: {children: React.ReactNode; cols?: 1 | 2 | 3}) {
  return <div className={clsx('uvm-cardgrid', cols && `uvm-cardgrid--${cols}`)}>{children}</div>;
}
