import React, {useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import {AREA_BY_KEY} from '@site/src/data/navigation';
import {track} from '@site/src/analytics';

/** Meta row under the lede: reading time, area, Copy page, Edit. */
export default function DocMeta() {
  const {metadata, frontMatter} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle');
  const fm = frontMatter as typeof frontMatter & {reading_time?: number; requires?: string; hide_meta?: boolean};
  if (fm.hide_meta) return null;
  const areaKey = metadata.permalink.slice(siteConfig.baseUrl.length).split('/')[0] as keyof typeof AREA_BY_KEY;
  const area = AREA_BY_KEY[areaKey];

  const copy = async () => {
    try {
      const {articleToMarkdown} = await import('./copyPage');
      const md = articleToMarkdown(document.querySelector('.uvm-article .markdown'), `${siteConfig.url}${metadata.permalink.replace(/\/?$/, "/")}`);
      await navigator.clipboard.writeText(md);
      track('docs_copy_page', {path: metadata.permalink.replace(/\/?$/, "/")});
      setState('done');
    } catch {
      setState('error');
    }
    setTimeout(() => setState('idle'), 1800);
  };

  return (
    <div className="uvm-docmeta">
      {fm.reading_time ? (
        <span>
          <Icon name="clock" size={14} />
          {translate({id: 'doc.readingTime', message: '{n} min read'}, {n: fm.reading_time})}
        </span>
      ) : null}
      {area && (
        <span className={`uvm-area--${area.key}`}>
          <span className="uvm-dot" />
          {translate({id: area.id, message: area.label})}
        </span>
      )}
      {fm.requires && (
        <span>
          <Icon name="chip" size={14} />
          {fm.requires}
        </span>
      )}
      <span className="uvm-docmeta__act">
        <button type="button" className="uvm-btn uvm-btn--sm" onClick={copy} title={translate({id: 'doc.copyPageTitle', message: 'Copy this page as Markdown, for notes or an AI assistant'})}>
          <Icon name={state === 'done' ? 'check' : 'copy'} />
          {state === 'done'
            ? translate({id: 'doc.copied', message: 'Copied'})
            : state === 'error'
              ? translate({id: 'doc.copyFailed', message: 'Copy failed'})
              : translate({id: 'doc.copyPage', message: 'Copy page'})}
        </button>
        {metadata.editUrl && (
          <a className="uvm-btn uvm-btn--sm" href={metadata.editUrl} target="_blank" rel="noopener">
            <Icon name="pencil" />
            {translate({id: 'doc.edit', message: 'Edit'})}
          </a>
        )}
      </span>
    </div>
  );
}
