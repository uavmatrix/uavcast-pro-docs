import React, {useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import {AREA_BY_KEY} from '@site/src/data/navigation';
import {track} from '@site/src/analytics';
import Menu from '@site/src/components/Menu';
import {markdownHref} from '@site/src/data/markdown';

/** Markdown of this page: the build-time copy (plugins/markdown-export), else converted from the DOM (dev). */
async function pageMarkdown(mdPath: string, pageUrl: string): Promise<string> {
  try {
    const r = await fetch(mdPath, {credentials: 'same-origin'});
    const type = r.headers.get('content-type') ?? '';
    if (r.ok && !type.includes('text/html')) return await r.text();
  } catch {
    /* fall back */
  }
  const {articleToMarkdown} = await import('./copyPage');
  return articleToMarkdown(document.querySelector('.uvm-article .markdown'), pageUrl);
}

async function copyText(text: Promise<string>) {
  // ClipboardItem with a promise keeps the click's user activation in Safari while we fetch.
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    try {
      await navigator.clipboard.write([new ClipboardItem({'text/plain': text.then((t) => new Blob([t], {type: 'text/plain'}))})]);
      return;
    } catch {
      /* fall back */
    }
  }
  await navigator.clipboard.writeText(await text);
}

/** Meta row under the lede: reading time, area, Copy page, Edit. */
export default function DocMeta() {
  const {metadata, frontMatter} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle');
  const fm = frontMatter as typeof frontMatter & {reading_time?: number; requires?: string; hide_meta?: boolean};
  if (fm.hide_meta) return null;
  const areaKey = metadata.permalink.slice(siteConfig.baseUrl.length).split('/')[0] as keyof typeof AREA_BY_KEY;
  const area = AREA_BY_KEY[areaKey];

  const pagePath = metadata.permalink.replace(/\/?$/, '/');
  const pageUrl = `${siteConfig.url}${pagePath}`;
  const mdPath = markdownHref(metadata.permalink);
  const mdUrl = `${siteConfig.url}${mdPath}`;
  const product = areaKey === 'fleet-manager' ? 'Fleet Manager' : 'UAVcast-Pro';
  const prompt = translate(
    {id: 'doc.aiPrompt', message: 'Read {url} and help me with it. I am using {product}.'},
    {url: mdUrl, product},
  );
  const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

  const copy = async () => {
    try {
      await copyText(pageMarkdown(mdPath, pageUrl));
      track('docs_copy_page', {path: pagePath});
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
          {area.label}
        </span>
      )}
      {fm.requires && (
        <span>
          <Icon name="chip" size={14} />
          {fm.requires}
        </span>
      )}
      <span className="uvm-docmeta__act">
        <span className="uvm-pagecopy">
          <button
            type="button"
            className="uvm-btn uvm-btn--sm uvm-pagecopy__main"
            onClick={copy}
            title={translate({id: 'doc.copyPageTitle', message: 'Copy this page as Markdown, for notes or an AI assistant'})}>
            <Icon name={state === 'done' ? 'check' : 'copy'} />
            {state === 'done'
              ? translate({id: 'doc.copied', message: 'Copied'})
              : state === 'error'
                ? translate({id: 'doc.copyFailed', message: 'Copy failed'})
                : translate({id: 'doc.copyPage', message: 'Copy page'})}
          </button>
          <Menu
            align="right"
            className="uvm-pagecopy__menu"
            buttonClassName="uvm-btn uvm-btn--sm uvm-pagecopy__more"
            ariaLabel={translate({id: 'doc.pageActions', message: 'More page actions: copy, open in an AI assistant, view as Markdown'})}
            button={<Icon name="down" size={14} />}>
            {(close) => (
              <>
                <button
                  type="button"
                  role="menuitem"
                  className="uvm-mi"
                  onClick={() => {
                    close();
                    void copy();
                  }}>
                  <span className="uvm-glyph">
                    <Icon name="copy" />
                  </span>
                  <span>
                    <span className="uvm-mi__title">{translate({id: 'doc.copyMarkdown', message: 'Copy page as Markdown'})}</span>
                    <span className="uvm-mi__sub">{translate({id: 'doc.copyMarkdownSub', message: 'For notes or any AI assistant'})}</span>
                  </span>
                </button>
                <a
                  role="menuitem"
                  className="uvm-mi"
                  href={chatgptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track('docs_open_in_ai', {provider: 'chatgpt', path: pagePath});
                    close();
                  }}>
                  <span className="uvm-glyph">
                    <Icon name="chat" />
                  </span>
                  <span>
                    <span className="uvm-mi__title">
                      {translate({id: 'doc.openChatGPT', message: 'Open in ChatGPT'})} <Icon name="ext" size={12} className="uvm-faint" />
                    </span>
                    <span className="uvm-mi__sub">{translate({id: 'doc.openChatGPTSub', message: 'Ask ChatGPT about this page'})}</span>
                  </span>
                </a>
                <a
                  role="menuitem"
                  className="uvm-mi"
                  href={claudeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track('docs_open_in_ai', {provider: 'claude', path: pagePath});
                    close();
                  }}>
                  <span className="uvm-glyph">
                    <Icon name="sparkle" />
                  </span>
                  <span>
                    <span className="uvm-mi__title">
                      {translate({id: 'doc.openClaude', message: 'Open in Claude'})} <Icon name="ext" size={12} className="uvm-faint" />
                    </span>
                    <span className="uvm-mi__sub">{translate({id: 'doc.openClaudeSub', message: 'Ask Claude about this page'})}</span>
                  </span>
                </a>
                <a
                  role="menuitem"
                  className="uvm-mi"
                  href={mdPath}
                  target="_blank"
                  rel="noopener"
                  onClick={() => {
                    track('docs_view_markdown', {path: pagePath});
                    close();
                  }}>
                  <span className="uvm-glyph">
                    <Icon name="doc" />
                  </span>
                  <span>
                    <span className="uvm-mi__title">{translate({id: 'doc.viewMarkdown', message: 'View as Markdown'})}</span>
                    <span className="uvm-mi__sub">{translate({id: 'doc.viewMarkdownSub', message: 'Plain text version of this page'})}</span>
                  </span>
                </a>
              </>
            )}
          </Menu>
        </span>
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
