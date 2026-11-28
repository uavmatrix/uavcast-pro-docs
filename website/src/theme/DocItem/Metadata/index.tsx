import React from 'react';
import Head from '@docusaurus/Head';
import Metadata from '@theme-original/DocItem/Metadata';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

/** Adds TechArticle JSON-LD. BreadcrumbList comes from DocBreadcrumbs. */
export default function MetadataWrapper(props: Record<string, never>) {
  const {metadata, frontMatter, assets, contentTitle} = useDoc();
  const {siteConfig, i18n} = useDocusaurusContext();
  const image = assets.image ?? frontMatter.image ?? 'img/og/uavmatrix-docs.png';
  const imageUrl = `${siteConfig.url}${useBaseUrl(image)}`;
  const url = `${siteConfig.url}${metadata.permalink.replace(/\/?$/, "/")}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: contentTitle ?? metadata.title,
    name: metadata.title,
    description: metadata.description,
    url,
    mainEntityOfPage: url,
    image: imageUrl,
    inLanguage: i18n.localeConfigs[i18n.currentLocale]?.htmlLang,
    ...(metadata.lastUpdatedAt ? {dateModified: new Date(metadata.lastUpdatedAt).toISOString()} : {}),
    isPartOf: {'@type': 'WebSite', name: 'UAVmatrix Docs', url: `${siteConfig.url}${useBaseUrl('/')}`},
    author: {'@type': 'Organization', name: 'UAVmatrix', url: 'https://uavmatrix.com'},
    publisher: {
      '@type': 'Organization',
      name: 'UAVmatrix',
      url: 'https://uavmatrix.com',
      logo: {'@type': 'ImageObject', url: `${siteConfig.url}${useBaseUrl('/img/logo.webp')}`},
    },
  };
  return (
    <>
      <Metadata {...props} />
      <Head>
        <script type="application/ld+json">{JSON.stringify(data)}</script>
      </Head>
    </>
  );
}
