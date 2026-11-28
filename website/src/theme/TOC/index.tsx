import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import {translate} from '@docusaurus/Translate';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Icon from '@site/src/components/Icon';
import type {Props} from '@theme/TOC';

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

function Extras() {
  const {metadata} = useDoc();
  return (
    <div className="uvm-toc__extra">
      <a href="#uvm-feedback">
        <Icon name="chat" size={14} />
        {translate({id: 'toc.feedback', message: 'Give feedback'})}
      </a>
      {metadata.editUrl && (
        <a href={metadata.editUrl} target="_blank" rel="noopener">
          <Icon name="pencil" size={14} />
          {translate({id: 'theme.common.editThisPage', message: 'Edit this page'})}
        </a>
      )}
      <button type="button" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <Icon name="up" size={14} />
        {translate({id: 'toc.top', message: 'Back to top'})}
      </button>
    </div>
  );
}

export default function TOC({className, ...props}: Props) {
  return (
    <div className={clsx('uvm-toc thin-scrollbar', className)}>
      <div className="uvm-toc__h">
        <Icon name="list" size={14} />
        {translate({id: 'theme.TOCCollapsible.toggleButtonLabel', message: 'On this page'})}
      </div>
      <TOCItems {...props} linkClassName={LINK_CLASS_NAME} linkActiveClassName={LINK_ACTIVE_CLASS_NAME} />
      <Extras />
    </div>
  );
}
