import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebar/Desktop/Content';
import type {PropSidebarItem} from '@docusaurus/plugin-content-docs';
import Icon from '@site/src/components/Icon';

function filterItems(items: readonly PropSidebarItem[], q: string): PropSidebarItem[] {
  const out: PropSidebarItem[] = [];
  for (const item of items) {
    if (item.type === 'html') continue;
    const hit = item.label.toLowerCase().includes(q);
    if (item.type === 'link') {
      if (hit) out.push(item);
    } else if (item.type === 'category') {
      const kids = hit ? item.items : filterItems(item.items, q);
      if (hit || kids.length) out.push({...item, items: kids, collapsed: false});
    }
  }
  return out;
}

export default function DocSidebarDesktopContent({path, sidebar, className}: Props) {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const items = useMemo(() => (query ? filterItems(sidebar, query) : sidebar), [sidebar, query]);
  return (
    <nav
      aria-label={translate({id: 'theme.docs.sidebar.navAriaLabel', message: 'Docs sidebar'})}
      className={clsx('menu thin-scrollbar uvm-sidebar', className)}>
      <label className="uvm-sb-filter">
        <Icon name="search" size={14} />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={translate({id: 'sidebar.filter', message: 'Filter pages'})}
          aria-label={translate({id: 'sidebar.filter', message: 'Filter pages'})}
          autoComplete="off"
        />
      </label>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')} key={query ? `q:${query}` : 'all'}>
        <DocSidebarItems items={items} activePath={path} level={1} />
      </ul>
      {query && items.length === 0 && (
        <p className="uvm-sb-empty">{translate({id: 'sidebar.noMatch', message: 'No page titles match. Try search (⌘K).'})}</p>
      )}
    </nav>
  );
}
