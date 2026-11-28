import fs from 'node:fs';
import path from 'node:path';
import prismTheme from './src/prism-theme';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const SITE_URL = 'https://docs.uavmatrix.com';
const REPO = 'https://github.com/uavmatrix/uavcast-pro-docs';
/** Latest UAVcast-Pro release, shown in the hero and product card. Update on release. */
const UAVCAST_VERSION = '6.5.2';

/**
 * Locales. English lives at the root. A locale is "published" (linked from
 * the language menu, listed in hreflang and the sitemap index) only once its
 * translated docs exist in i18n/<path>/docusaurus-plugin-content-docs/current.
 * See README.md, "Adding a language".
 */
const LOCALES = {
  en: {label: 'English', htmlLang: 'en', path: 'en'},
  es: {label: 'Español', htmlLang: 'es', path: 'es'},
  it: {label: 'Italiano', htmlLang: 'it', path: 'it'},
  nl: {label: 'Nederlands', htmlLang: 'nl', path: 'nl'},
  pl: {label: 'Polski', htmlLang: 'pl', path: 'pl'},
  pt: {label: 'Português', htmlLang: 'pt', path: 'pt'},
  ru: {label: 'Русский', htmlLang: 'ru', path: 'ru'},
  tr: {label: 'Türkçe', htmlLang: 'tr', path: 'tr'},
  'zh-Hans': {label: '简体中文', htmlLang: 'zh-Hans', path: 'zh-cn'},
  'zh-Hant': {label: '繁體中文', htmlLang: 'zh-Hant', path: 'zh-tw'},
} as const;
type Locale = keyof typeof LOCALES;
const DEFAULT_LOCALE: Locale = 'en';

const publishedLocales = (Object.keys(LOCALES) as Locale[]).filter(
  (l) =>
    l === DEFAULT_LOCALE ||
    fs.existsSync(path.join(__dirname, 'i18n', LOCALES[l].path, 'docusaurus-plugin-content-docs', 'current')),
);

/** Reading time from the raw MDX source (≈ 220 wpm, code and JSX stripped). */
function readingMinutes(source: string): number {
  const text = source
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`|[\]()-]/g, ' ');
  const cjk = (text.match(/[㐀-鿿]/g) ?? []).length;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220 + cjk / 400));
}

const config: Config = {
  title: 'UAVmatrix Docs',
  titleDelimiter: '|',
  tagline:
    'Documentation for UAVcast-Pro and UAVmatrix Fleet Manager: stream drone video and MAVLink telemetry over 4G/LTE, and manage a fleet from the browser.',
  favicon: 'img/favicon.ico',
  url: SITE_URL,
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'uavmatrix',
  projectName: 'uavcast-pro-docs',

  // DOCS_LINKS_WARN=1 relaxes link checks for local experiments only; CI and npm run build throw.
  onBrokenLinks: process.env.DOCS_LINKS_WARN ? 'warn' : 'throw',
  onBrokenAnchors: process.env.DOCS_LINKS_WARN ? 'warn' : 'throw',
  onDuplicateRoutes: 'throw',

  future: {
    v4: true,
    faster: true,
  },

  markdown: {
    format: 'detect',
    // future.v4 turns these off; the docs use {#custom-id} headings and HTML comments.
    mdx1Compat: {comments: true, admonitions: true, headingIds: true},
    hooks: {
      onBrokenMarkdownLinks: process.env.DOCS_LINKS_WARN ? 'warn' : 'throw',
      onBrokenMarkdownImages: 'throw',
    },
    async parseFrontMatter(params) {
      const result = await params.defaultParseFrontMatter(params);
      if (params.filePath.includes(`${path.sep}docs${path.sep}`) || params.filePath.includes(`${path.sep}i18n${path.sep}`)) {
        result.frontMatter.reading_time ??= readingMinutes(params.fileContent);
      }
      return result;
    },
  },

  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: Object.keys(LOCALES) as [Locale, ...Locale[]],
    localeConfigs: Object.fromEntries(
      (Object.keys(LOCALES) as Locale[]).map((l) => [
        l,
        {
          label: LOCALES[l].label,
          htmlLang: LOCALES[l].htmlLang,
          path: LOCALES[l].path,
          baseUrl: l === DEFAULT_LOCALE ? '/' : `/${LOCALES[l].path}/`,
          direction: 'ltr',
        },
      ]),
    ),
  },

  customFields: {
    uavcastVersion: UAVCAST_VERSION,
    publishedLocales,
    repo: REPO,
    discordUrl: 'https://discord.gg/xwqMTXh',
    supportEmail: 'support@uavmatrix.com',
    fleetManagerUrl: 'https://fleet-manager.uavmatrix.com',
    storeUrl: 'https://uavmatrix.com',
    // PostHog project "Documentation" (EU Cloud). The token is public by design (write-only).
    posthog: {
      token: 'phc_sG4ch7VdDYEiwGT2iTQk3BVfL5ucUCnVU66EtbKvqZFp',
      host: 'https://eu.i.posthog.com',
      uiHost: 'https://eu.posthog.com',
    },
  },

  clientModules: ['./src/analytics/client.ts'],

  headTags: [
    // Inlined so the URLs stay /fonts/… and match the preload below (CSS
    // processed by the bundler would get hashed asset URLs instead).
    {tagName: 'style', attributes: {}, innerHTML: fs.readFileSync(path.join(__dirname, 'src/css/fonts.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ')},
    {tagName: 'link', attributes: {rel: 'preload', href: '/fonts/geist-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous'}},
    {tagName: 'meta', attributes: {name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)'}},
    {tagName: 'meta', attributes: {name: 'theme-color', content: '#0a0d13', media: '(prefers-color-scheme: dark)'}},
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: process.env.DOCS_PATH ?? 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: `${REPO}/edit/master/website/`,
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
          breadcrumbs: true,
          sidebarCollapsible: true,
          sidebarCollapsed: true,
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/layout.css', './src/css/article.css', './src/css/home.css', './src/css/search.css'],
        },
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
          ignorePatterns: ['/tags/**', '/search/', '/search/**', '/**/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    './plugins/screenshots/index.ts',
    ['./plugins/search-index/index.ts', {publishedLocales}],
    './plugins/redirects/index.ts',
  ],

  themeConfig: {
    image: 'img/og/uavmatrix-docs.png',
    metadata: [
      {name: 'keywords', content: 'UAVcast-Pro, UAVmatrix, Fleet Manager, drone 4G LTE, MAVLink, ArduPilot, PX4, QGroundControl, Mission Planner, Raspberry Pi drone video'},
      {property: 'og:site_name', content: 'UAVmatrix Docs'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {hideable: false, autoCollapseCategories: false},
    },
    navbar: {
      title: 'UAVmatrix',
      hideOnScroll: false,
      // Items are rendered by src/theme/Navbar/Content from src/data/navigation.ts.
      items: [],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    prism: {
      theme: prismTheme,
      darkTheme: prismTheme,
      additionalLanguages: ['bash', 'powershell', 'batch', 'ini', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
