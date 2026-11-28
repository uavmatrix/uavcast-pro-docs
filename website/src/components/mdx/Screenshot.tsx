import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useColorMode} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import {track} from '@site/src/analytics';
import type {ScreenshotManifest} from '../../../plugins/screenshots';

/** Article column is at most ~760px wide; the lightbox always loads the full file. */
const SIZES = '(min-width: 1240px) 760px, (min-width: 997px) calc(100vw - 380px), calc(100vw - 32px)';
const prod = process.env.NODE_ENV === 'production';

export type ScreenshotProps = {
  /** "<product>/<screen>[--<state>]", e.g. "uavcast-pro/camera" */
  id: string;
  alt: string;
  caption?: React.ReactNode;
  /** Address shown in the browser frame. Default derived from the id. */
  url?: string;
  /** "browser" (default) or "none" for a plain bordered image. */
  frame?: 'browser' | 'none';
};

function frameUrl(id: string) {
  const [product, rest = ''] = id.split('/');
  const screen = rest.split('--')[0];
  if (product === 'fleet-manager') return `fleet-manager.uavmatrix.com/${screen}`;
  if (product === 'uavcast-pro') return `<drone-ip>/${screen === 'dashboard' ? '' : screen}`;
  return id;
}

function Lightbox({src, alt, onClose}: {src: string; alt: string; onClose: () => void}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  return createPortal(
    <dialog
      ref={ref}
      className="uvm-lightbox"
      onClose={onClose}
      onClick={onClose}
      aria-label={alt}>
      <img src={src} alt={alt} />
      <button type="button" className="uvm-lightbox__x" aria-label={translate({id: 'shot.close', message: 'Close'})} onClick={onClose}>
        <Icon name="x" />
      </button>
    </dialog>,
    document.body,
  );
}

function Placeholder({id}: {id: string}) {
  return (
    <div className="uvm-shot__ph" role="img" aria-label={translate({id: 'shot.placeholder', message: 'Screenshot placeholder: {id}'}, {id})}>
      <svg viewBox="0 0 640 380" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="0" width="150" height="380" className="ph-side" />
        <rect x="18" y="20" width="84" height="10" rx="5" className="ph-strong" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x="18" y={58 + i * 26} width={[96, 74, 88, 60, 92, 70, 80, 64][i]} height="8" rx="4" className={i === 2 ? 'ph-accent' : 'ph-dim'} />
        ))}
        <rect x="182" y="24" width="190" height="14" rx="7" className="ph-strong" />
        <rect x="182" y="48" width="300" height="8" rx="4" className="ph-dim" />
        <rect x="182" y="84" width="200" height="120" rx="10" className="ph-card" />
        <rect x="398" y="84" width="210" height="120" rx="10" className="ph-card" />
        <rect x="182" y="222" width="426" height="128" rx="10" className="ph-card" />
        <path d="M200 320 L250 300 L300 310 L350 280 L400 292 L450 262 L500 276 L550 250 L590 258" className="ph-line" />
      </svg>
      <div className="uvm-shot__ph-label">
        <Icon name="image" size={18} />
        <span>{translate({id: 'shot.soon', message: 'Screenshot coming soon'})}</span>
        <code>{id}</code>
      </div>
    </div>
  );
}

/**
 * <Screenshot id="uavcast-pro/camera" alt="…" caption="…" />
 * Loads /img/screenshots/<id>.webp (+ <id>.dark.webp in dark mode when present),
 * lazy, with intrinsic width/height (no layout shift) and click-to-zoom.
 * Renders a placeholder frame when the image does not exist yet.
 */
export default function Screenshot({id, alt, caption, url, frame = 'browser'}: ScreenshotProps) {
  const manifest = (usePluginData('uavmatrix-screenshots') ?? {}) as ScreenshotManifest;
  const entry = manifest[id];
  const light = useBaseUrl(`/img/screenshots/${id}.webp`);
  const dark = useBaseUrl(`/img/screenshots/${id}.dark.webp`);
  const lightSmall = useBaseUrl(`/img/screenshots/${id}.w1440.webp`);
  const darkSmall = useBaseUrl(`/img/screenshots/${id}.dark.w1440.webp`);
  // Variants exist only in production builds (written by the plugin's postBuild).
  const srcSetLight = prod && entry?.small ? `${lightSmall} 1440w, ${light} ${entry.w}w` : undefined;
  const srcSetDark = prod && entry?.dark?.small ? `${darkSmall} 1440w, ${dark} ${entry.dark.w}w` : undefined;
  const {colorMode} = useColorMode();
  const [zoom, setZoom] = useState(false);
  const close = useCallback(() => setZoom(false), []);
  const zoomSrc = entry?.dark && colorMode === 'dark' ? dark : light;

  return (
    <figure className={clsx('uvm-shot', frame === 'none' && 'uvm-shot--plain', !entry && 'uvm-shot--missing')}>
      {frame === 'browser' && (
        <div className="uvm-shot__bar" aria-hidden="true">
          <span className="uvm-shot__lights">
            <i />
            <i />
            <i />
          </span>
          <span className="uvm-shot__url">
            <Icon name="lock" size={11} />
            {url ?? frameUrl(id)}
          </span>
          <span className="uvm-shot__lights uvm-shot__lights--ghost" />
        </div>
      )}
      <div className="uvm-shot__body">
        {entry ? (
          <button
            type="button"
            className="uvm-shot__zoom"
            onClick={() => {
              setZoom(true);
              track('docs_screenshot_zoom', {id});
            }}
            aria-label={translate({id: 'shot.enlarge', message: 'Enlarge screenshot: {alt}'}, {alt})}>
            <img
              src={light}
              srcSet={srcSetLight}
              sizes={srcSetLight ? SIZES : undefined}
              alt={alt}
              width={entry.w}
              height={entry.h}
              loading="lazy"
              decoding="async"
              className={clsx(entry.dark && 'uvm-shot__img--light')}
            />
            {entry.dark && (
              <img src={dark} srcSet={srcSetDark} sizes={srcSetDark ? SIZES : undefined} alt={alt} width={entry.dark.w} height={entry.dark.h} loading="lazy" decoding="async" className="uvm-shot__img--dark" />
            )}
            <span className="uvm-shot__zoomhint" aria-hidden="true">
              <Icon name="zoom" size={14} />
            </span>
          </button>
        ) : (
          <Placeholder id={id} />
        )}
      </div>
      {(caption || !entry) && (
        <figcaption>
          <Icon name="image" size={15} />
          <span>{caption ?? alt}</span>
        </figcaption>
      )}
      {zoom && entry && <Lightbox src={zoomSrc} alt={alt} onClose={close} />}
    </figure>
  );
}
