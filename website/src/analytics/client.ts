/**
 * Client module (docusaurus.config.ts clientModules): starts PostHog after the
 * page is interactive, and tracks outbound link clicks site-wide.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';
import {classifyOutbound, initAnalytics, setLocaleBase, track} from './index';

if (ExecutionEnvironment.canUseDOM && process.env.NODE_ENV === 'production') {
  setLocaleBase(siteConfig.baseUrl);
  const cf = siteConfig.customFields as {posthog?: {token: string; host: string; uiHost: string}};
  const start = () => {
    if (cf.posthog) void initAnalytics(cf.posthog);
  };
  const idle = () =>
    'requestIdleCallback' in window
      ? (window as Window & {requestIdleCallback: (cb: () => void, o?: {timeout: number}) => void}).requestIdleCallback(start, {timeout: 4000})
      : setTimeout(start, 2000);
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, {once: true});

  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const destination = classifyOutbound(href);
      if (destination) track('docs_outbound_click', {url: a.href, destination}, {beacon: true});
    },
    {capture: true},
  );
}
