import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocMeta from '@site/src/components/DocMeta';
import type {Props} from '@theme/DocItem/Content';

/**
 * Title, then the first paragraph (styled as the lede), then the meta row,
 * then the body. The meta row and mobile TOC are rendered after the MDX
 * content in the DOM and placed visually with flex `order` (see article.css),
 * because the title and lede come from the MDX itself.
 */
export default function DocItemContent({children}: Props) {
  const {metadata, frontMatter, contentTitle, toc} = useDoc();
  const synthetic = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  const hasToc = !frontMatter.hide_table_of_contents && toc.length > 0;
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown', 'uvm-prose')}>
      {synthetic && (
        <header>
          <Heading as="h1">{metadata.title}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
      <DocMeta />
      {hasToc && (
        <div className="uvm-toc-mobile">
          <DocItemTOCMobile />
        </div>
      )}
    </div>
  );
}
