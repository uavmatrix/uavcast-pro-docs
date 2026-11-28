/**
 * UAVmatrix store links, in one place (home hero, navbar, drawer, footer,
 * home cards and <BuyLicense/> in the docs).
 *
 * The store (uavmatrix-store, next-intl with localePrefix "as-needed") serves
 * English at the root and every other language under its own prefix. Its codes
 * differ from ours for Chinese: zh (简体) and zh-TW (繁體).
 *
 * - BUY:   /checkout opens the plan picker with the most popular plan preselected
 *          and supports guest checkout, so it works signed out.
 * - PLANS: /products compares the plans.
 */
export const STORE_ORIGIN = 'https://uavmatrix.com';

/** Docs locale -> store locale prefix ('' = root, the store's default English). */
export const STORE_LOCALE: Record<string, string> = {
  en: '',
  es: 'es',
  it: 'it',
  nl: 'nl',
  pl: 'pl',
  pt: 'pt',
  ru: 'ru',
  tr: 'tr',
  'zh-Hans': 'zh',
  'zh-Hant': 'zh-TW',
};

export const STORE_BUY_PATH = '/checkout';
export const STORE_PLANS_PATH = '/products';

export function storeUrl(locale: string, path: string): string {
  const prefix = STORE_LOCALE[locale] ?? '';
  return `${STORE_ORIGIN}${prefix ? `/${prefix}` : ''}${path}`;
}
