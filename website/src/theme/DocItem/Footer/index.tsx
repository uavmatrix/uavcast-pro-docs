import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import Icon from '@site/src/components/Icon';
import Feedback from '@site/src/components/Feedback';

export default function DocItemFooter() {
  const {metadata} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const fmt = useDateTimeFormat({day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'});
  const repo = siteConfig.customFields?.repo as string;
  const issueUrl = `${repo}/issues/new?title=${encodeURIComponent(`Docs: ${metadata.title}`)}&body=${encodeURIComponent(
    `Page: ${siteConfig.url}${metadata.permalink.replace(/\/?$/, "/")}\n\nWhat is wrong or missing?\n`,
  )}`;
  return (
    <footer className="uvm-docfoot">
      <Feedback />
      <div className="uvm-metarow">
        {metadata.lastUpdatedAt ? (
          <span>
            <Translate
              id="doc.lastUpdated"
              values={{date: <time dateTime={new Date(metadata.lastUpdatedAt).toISOString()}>{fmt.format(new Date(metadata.lastUpdatedAt))}</time>}}>
              {'Last updated {date}'}
            </Translate>
          </span>
        ) : (
          <span />
        )}
        <span className="uvm-metarow__r">
          {metadata.editUrl && (
            <a href={metadata.editUrl} target="_blank" rel="noopener">
              <Icon name="pencil" size={14} />
              {translate({id: 'theme.common.editThisPage', message: 'Edit this page'})}
            </a>
          )}
          <a href={issueUrl} target="_blank" rel="noopener">
            <Icon name="git" size={14} />
            {translate({id: 'doc.reportIssue', message: 'Report an issue'})}
          </a>
        </span>
      </div>
    </footer>
  );
}
