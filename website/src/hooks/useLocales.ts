import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';

export type LocaleLink = {
  locale: string;
  label: string;
  htmlLang: string;
  /** path prefix shown in the menu, e.g. "/es" ("/" for English) */
  prefix: string;
  href: string;
  current: boolean;
  /** has translated docs in this build (else shown as "coming soon") */
  published: boolean;
};

export function useLocales(): LocaleLink[] {
  const {
    i18n: {currentLocale, locales, localeConfigs, defaultLocale},
    siteConfig,
  } = useDocusaurusContext();
  const utils = useAlternatePageUtils();
  const published = new Set((siteConfig.customFields?.publishedLocales as string[]) ?? [defaultLocale]);
  return locales.map((locale) => {
    const cfg = localeConfigs[locale];
    const base = (cfg as {baseUrl?: string}).baseUrl ?? (locale === defaultLocale ? '/' : `/${locale}/`);
    return {
      locale,
      label: cfg.label,
      htmlLang: cfg.htmlLang,
      prefix: base === '/' ? '/' : base.replace(/\/$/, ''),
      href: `pathname://${utils.createUrl({locale, fullyQualified: false})}`,
      current: locale === currentLocale,
      published: published.has(locale) || locale === currentLocale,
    };
  });
}
