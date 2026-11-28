import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import type {Props} from '@theme/DocItem/Layout';

/** Article column (68ch measure) + sticky "On this page" column. */
export default function DocItemLayout({children}: Props) {
  const {frontMatter, toc, metadata} = useDoc();
  const windowSize = useWindowSize();
  const hasToc = !frontMatter.hide_table_of_contents && toc.length > 0;
  const desktopToc = hasToc && (windowSize === 'desktop' || windowSize === 'ssr');
  return (
    <div className={clsx('uvm-doc', !hasToc && 'uvm-doc--wide')}>
      <div className="uvm-doc__main">
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <article className="uvm-article">
          <DocBreadcrumbs />
          <DocItemContent>{children}</DocItemContent>
          <DocItemFooter />
        </article>
        <DocItemPaginator />
      </div>
      {desktopToc && (
        <aside className="uvm-doc__toc">
          <DocItemTOCDesktop />
        </aside>
      )}
    </div>
  );
}
