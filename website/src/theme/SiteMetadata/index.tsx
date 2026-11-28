import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {PageMetadata, useThemeConfig} from '@docusaurus/theme-common';
import {DEFAULT_SEARCH_TAG, useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';
import {applyTrailingSlash} from '@docusaurus/utils-common';
import SearchMetadata from '@theme/SearchMetadata';

/**
 * Same as the classic theme, except hreflang alternates are only emitted for
 * locales that are actually published (customFields.publishedLocales), so
 * untranslated locales never appear as alternates.
 */
function AlternateLangHeaders() {
  const {
    i18n: {currentLocale, defaultLocale, localeConfigs},
    siteConfig,
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const published = new Set((siteConfig.customFields?.publishedLocales as string[]) ?? [defaultLocale]);
  published.add(currentLocale);
  const entries = Object.entries(localeConfigs).filter(([l]) => published.has(l));
  const og = (code: string) => code.replace('-', '_');
  const currentHtmlLang = localeConfigs[currentLocale].htmlLang;
  return (
    <Head>
      {entries.map(([locale, {htmlLang}]) => (
        <link key={locale} rel="alternate" href={alternatePageUtils.createUrl({locale, fullyQualified: true})} hrefLang={htmlLang} />
      ))}
      <link rel="alternate" href={alternatePageUtils.createUrl({locale: defaultLocale, fullyQualified: true})} hrefLang="x-default" />
      <meta property="og:locale" content={og(currentHtmlLang)} />
      {entries
        .filter(([, c]) => c.htmlLang !== currentHtmlLang)
        .map(([, c]) => (
          <meta key={`og-${c.htmlLang}`} property="og:locale:alternate" content={og(c.htmlLang)} />
        ))}
    </Head>
  );
}

function CanonicalUrlHeaders() {
  const {
    siteConfig: {url: siteUrl, baseUrl, trailingSlash},
  } = useDocusaurusContext();
  const {pathname} = useLocation();
  const canonical = siteUrl + applyTrailingSlash(useBaseUrl(pathname), {trailingSlash, baseUrl});
  return (
    <Head>
      <meta property="og:url" content={canonical} />
      <link rel="canonical" href={canonical} />
    </Head>
  );
}

export default function SiteMetadata() {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const {metadata, image: defaultImage} = useThemeConfig();
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <body />
      </Head>
      {defaultImage && <PageMetadata image={defaultImage} />}
      <CanonicalUrlHeaders />
      <AlternateLangHeaders />
      <SearchMetadata tag={DEFAULT_SEARCH_TAG} locale={currentLocale} />
      <Head>
        {metadata.map((m, i) => (
          <meta key={i} {...m} />
        ))}
      </Head>
    </>
  );
}
