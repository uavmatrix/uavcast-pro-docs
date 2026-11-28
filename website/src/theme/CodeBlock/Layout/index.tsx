import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import type {Props} from '@theme/CodeBlock/Layout';
import Icon from '@site/src/components/Icon';
import {currentPath, track} from '@site/src/analytics';

const LANG: Record<string, string> = {
  bash: 'Terminal',
  sh: 'Terminal',
  shell: 'Terminal',
  zsh: 'Terminal',
  console: 'Terminal',
  powershell: 'PowerShell',
  ps1: 'PowerShell',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  ini: 'INI',
  toml: 'TOML',
  python: 'Python',
  py: 'Python',
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  diff: 'Diff',
  nginx: 'nginx',
  http: 'HTTP',
  text: 'Text',
  txt: 'Text',
};

function CopyButton() {
  const {metadata} = useCodeBlockContext();
  const [done, setDone] = useState(false);
  const t = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(t.current), []);
  const copy = useCallback(async () => {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(metadata.code);
      else {
        const {default: c} = await import('copy-text-to-clipboard');
        c(metadata.code);
      }
      track('docs_code_copied', {path: currentPath(), language: metadata.language ?? 'text'});
      setDone(true);
      t.current = window.setTimeout(() => setDone(false), 1400);
    } catch {
      /* ignore */
    }
  }, [metadata.code, metadata.language]);
  return (
    <button
      type="button"
      className={clsx('uvm-cb__copy', done && 'is-done')}
      onClick={copy}
      aria-label={done ? translate({id: 'theme.CodeBlock.copied', message: 'Copied'}) : translate({id: 'theme.CodeBlock.copyButtonAriaLabel', message: 'Copy code to clipboard'})}>
      <Icon name={done ? 'check' : 'copy'} size={13} />
      <span>{done ? translate({id: 'theme.CodeBlock.copied', message: 'Copied'}) : translate({id: 'theme.CodeBlock.copy', message: 'Copy'})}</span>
    </button>
  );
}

export default function CodeBlockLayout({className}: Props) {
  const {metadata} = useCodeBlockContext();
  const lang = metadata.language ?? '';
  const label = LANG[lang] ?? (lang && lang !== 'none' ? lang : '');
  const isTerm = ['bash', 'sh', 'shell', 'zsh', 'console', 'powershell', 'ps1'].includes(lang);
  return (
    <Container as="div" className={clsx(className, metadata.className, 'uvm-cb')}>
      <div className="uvm-cb__head">
        <span className="uvm-cb__label">
          <Icon name={isTerm ? 'term' : 'doc'} size={13} />
          {metadata.title ? <Title>{metadata.title}</Title> : <span>{label || translate({id: 'codeblock.code', message: 'Code'})}</span>}
          {metadata.title && label && <span className="uvm-cb__lang">{label}</span>}
        </span>
        <CopyButton />
      </div>
      <div className="uvm-cb__content">
        <Content />
      </div>
    </Container>
  );
}
