import React, {Suspense, lazy, useCallback, useEffect, useRef, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';

const SearchModal = lazy(() => import('@site/src/components/Search/Modal'));

/** Open the search dialog from anywhere: openSearch('apn'). */
export function openSearch(q = '') {
  window.dispatchEvent(new CustomEvent('uvm:search', {detail: {q}}));
}

function useIsMac() {
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  return mac;
}

/** Shown for the moment the dialog code loads; keeps what the user types. */
function SearchShell({value, onChange, onClose}: {value: string; onChange: (v: string) => void; onClose: () => void}) {
  return (
    <div className="uvm-search-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="uvm-palette" role="dialog" aria-modal="true">
        <div className="uvm-palette__in">
          <Icon name="search" size={18} />
          <input
            autoFocus
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
            aria-label={translate({id: 'search.dialog', message: 'Search documentation'})}
            placeholder={translate({id: 'search.placeholder', message: 'Search guides, settings and error messages'})}
          />
          <kbd>esc</kbd>
        </div>
      </div>
    </div>
  );
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState('');
  const trigger = useRef<HTMLButtonElement>(null);
  const isMac = useIsMac();

  const show = useCallback((q = '') => {
    setInitial(q);
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus({preventScroll: true});
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        setInitial('');
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        show();
      }
    };
    const onOpen = (e: Event) => show((e as CustomEvent<{q?: string}>).detail?.q ?? '');
    window.addEventListener('keydown', onKey);
    window.addEventListener('uvm:search', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('uvm:search', onOpen);
    };
  }, [open, show]);

  // Load the dialog code once the page is idle, so ⌘K opens instantly.
  useEffect(() => {
    const warm = () => void import('@site/src/components/Search/Modal');
    const w = window as Window & {requestIdleCallback?: (cb: () => void, o?: {timeout: number}) => void};
    if (w.requestIdleCallback) w.requestIdleCallback(warm, {timeout: 5000});
    else setTimeout(warm, 3000);
  }, []);

  // Warm the chunk when the user shows intent.
  const prefetch = useCallback(() => {
    void import('@site/src/components/Search/Modal');
  }, []);

  const label = translate({id: 'search.button', message: 'Search documentation…'});
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="uvm-searchbtn"
        onClick={() => show()}
        onMouseEnter={prefetch}
        onFocus={prefetch}
        aria-label={translate({id: 'search.dialog', message: 'Search documentation'})}>
        <Icon name="search" />
        <span className="uvm-searchbtn__ph">{label}</span>
        <kbd className="uvm-searchbtn__kbd">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
      </button>
      {open && (
        <Suspense fallback={<SearchShell value={initial} onChange={setInitial} onClose={close} />}>
          <SearchModal initialQuery={initial} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
