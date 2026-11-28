import {useMemo} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';

/**
 * Resolves candidate doc paths (base-relative, e.g. "/uavcast-pro/camera/")
 * against the docs that exist in this build and locale. Returns the full path
 * (with the locale's baseUrl) of the first match, or a fallback.
 */
export function useDocResolver() {
  const {siteConfig} = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;
  const allDocs = useAllDocsData();

  return useMemo(() => {
    const docs = allDocs.default?.versions?.[0]?.docs ?? [];
    // Global data paths have no trailing slash; the site uses trailingSlash: true.
    const slash = (p: string) => (p.endsWith('/') ? p : `${p}/`);
    const rel = (p: string) => `/${slash(p).slice(baseUrl.length)}`;
    const byRel = new Map<string, string>();
    for (const d of docs) byRel.set(rel(d.path), slash(d.path));
    const sorted = [...byRel.keys()].sort((a, b) => a.split('/').length - b.split('/').length || a.localeCompare(b));

    const resolve = (
      candidates: readonly string[] | string,
      opts: {areaFallback?: string; homeOk?: boolean} = {},
    ): string | undefined => {
      const list = typeof candidates === 'string' ? [candidates] : candidates;
      for (const c of list) {
        if (c === '/' && opts.homeOk !== false) return baseUrl;
        const hit = byRel.get(c);
        if (hit) return hit;
      }
      if (opts.areaFallback) {
        const prefix = `/${opts.areaFallback}/`;
        const first = sorted.find((p) => p.startsWith(prefix));
        if (first) return byRel.get(first);
      }
      return undefined;
    };
    return {resolve, has: (p: string) => byRel.has(p), count: byRel.size};
  }, [allDocs, baseUrl]);
}
