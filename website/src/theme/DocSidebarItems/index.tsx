import React, {memo} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OriginalItems from '@theme-original/DocSidebarItems';
import type {Props} from '@theme/DocSidebarItems';
import type {PropSidebarItem} from '@docusaurus/plugin-content-docs';

function firstHref(item: PropSidebarItem): string | undefined {
  if (item.type === 'link') return item.href;
  if (item.type === 'category') return item.href ?? item.items.map(firstHref).find(Boolean);
  return undefined;
}

/** Tags top-level categories with their product area (colour dot). */
function DocSidebarItems(props: Props) {
  const {siteConfig} = useDocusaurusContext();
  if (props.level !== 1) return <OriginalItems {...props} />;
  const items = props.items.map((item) => {
    if (item.type !== 'category') return item;
    const href = firstHref(item);
    const area = href?.slice(siteConfig.baseUrl.length).split('/')[0];
    return area ? {...item, className: [item.className, 'uvm-sb-area', `uvm-area--${area}`].filter(Boolean).join(' ')} : item;
  });
  return <OriginalItems {...props} items={items} />;
}

export default memo(DocSidebarItems);
