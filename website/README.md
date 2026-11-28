# UAVmatrix Docs (docs.uavmatrix.com)

The documentation site for UAVcast-Pro and UAVmatrix Fleet Manager, built with Docusaurus 3 (TypeScript, static output).

```bash
npm ci
npm start                 # dev server on http://localhost:3000 (search needs a production build)
npm run build             # production build, English only -> build/
npm run serve             # serve build/ on http://0.0.0.0:4100
npm run check:redirects   # verify every redirect target exists in build/
npm run typecheck
```

Only one build can write to `build/` at a time. To verify a build somewhere else, run `npx docusaurus build --locale en --out-dir /tmp/docs-build`. If rspack panics with "Dependency … not found", delete `node_modules/.cache/rspack`.

## Where things live

| Path | What |
|---|---|
| `docs/` | Content (MDX). The folders are the URLs and the sidebar. Use `_category_.json` and `sidebar_position` to set order. |
| `static/img/screenshots/<product>/<screen>.webp` | Screenshots. Add `<screen>.dark.webp` for a dark-mode variant. |
| `src/theme/` | Overridden Docusaurus components (navbar, sidebar, doc page, TOC, footer, search, 404, code blocks). |
| `src/components/mdx/` | MDX components. They are global, so content needs no imports. |
| `src/data/` | Home page and navigation content. Links are lists of candidate doc paths, and the first page that exists wins. |
| `redirects/redirects.ts` | Old URL → new URL map, resolved and validated at build time. |
| `plugins/` | Search index, screenshot manifest and redirects. |
| `scripts/og/` | Source for the 1200×630 social image (`npm run og-image`). |
| `src/analytics/` | PostHog (cookieless, EU). Event names are a contract with the dashboard. Add `?ph_debug=1` to a URL to log events. |

## MDX components

```mdx
<Steps>

1. Open **Camera**.
2. Select **Start Camera**.

</Steps>

<Screenshot id="uavcast-pro/camera" alt="Camera page with the live preview" caption="Camera → Camera settings." />

<SymptomTable rows={[{symptom: 'Video is black', cause: 'Camera not running', start: '#check-1'}]} />

<CardGrid>
  <Card href="/guides/rtk-ntrip-caster/" title="RTK over 4G" description="RTCM3 from a caster to the flight controller." />
</CardGrid>
```

These work too: `<Tabs>`/`<TabItem>`, admonitions (`:::note|tip|info|warning|danger`) and code blocks with `title="…"`. Optional front matter: `requires: "UAVcast-Pro 6.5+"` (shown in the meta row), `hide_meta: true`.

A `<Screenshot>` whose image is missing renders a placeholder frame, so pages build before the screenshots exist. Images need to be WebP. The social image is the only exception and stays PNG.

## Adding a language

All ten locales are configured in `docusaurus.config.ts` (`LOCALES`). A locale goes live, meaning it appears in the language menu, in hreflang and in the sitemap index, as soon as its translated docs exist:

```bash
# 1. UI strings (navbar, footer, home page, search) for e.g. Spanish
npm run write-translations -- --locale es        # creates i18n/es/code.json etc.; translate the "message" values
# 2. Docs: copy and translate, same file names and paths
mkdir -p i18n/es/docusaurus-plugin-content-docs/current
cp -r docs/* i18n/es/docusaurus-plugin-content-docs/current/
# 3. Build it together with English
npx docusaurus build --locale en --locale es     # then add "--locale es" to the build script in package.json
```

Chinese uses the folders `i18n/zh-cn` and `i18n/zh-tw` (locales `zh-Hans`/`zh-Hant`, URLs `/zh-cn/`, `/zh-tw/`). Slugs stay in English in every language. Each locale gets its own offline search index (`/<locale>/search-docs.json`) and its own sitemap.

## Search

Search runs offline. `plugins/search-index` indexes the built HTML of every locale, the ⌘K dialog searches it with MiniSearch, and the index loads on first use. When there is budget for it, the upgrade is Algolia DocSearch (free for open-source docs). It would replace `src/theme/SearchBar` and keep the same dialog look.

## Redirects and hosting

The site is hosted on **GitHub Pages** (the `gh-pages` branch, CNAME `docs.uavmatrix.com`). `trailingSlash: true` makes every page a folder, so GitHub Pages serves `/page/` directly, and `/page` gets a 301 to it.

`redirects/redirects.ts` lists about 390 old URLs. These are the 2019–2024 MkDocs site at the root and under `/4.x`, `/4x`, `/5.x`, `/5`, `/latest` and `/site`, plus `/licensing`, `/license`, `/installation/` and every `/docs/{4.x,5.x,6.x}/…` URL. Each target is a list of candidate pages, and the first one that exists in the build wins. The plugin writes static redirect pages through `@docusaurus/plugin-client-redirects`. Each one has a meta refresh and a canonical link to the absolute target, because GitHub Pages cannot send 301s. It fails on duplicate sources and records dropped or fallback targets in `.docusaurus/redirects-report.json`. `npm run check:redirects` verifies the result. `REDIRECTS_FILE=1` also writes a `_redirects` file, in case the site ever moves to a host with real 301s.

Screenshots of 2000px or wider get a 1440px WebP variant (`<id>.w1440.webp`), generated into the build with sharp and cached in `node_modules/.cache`. `<Screenshot>` serves the variants through `srcset`.

**Cutover (manual, not done yet):** `.github/workflows/deploy-website.yml` builds `website/` and publishes `website/build` to `gh-pages` with the CNAME. For now it only runs when started by hand. At cutover, disable `deploy.yml` and `test-deploy.yml` (they push the old `docs/` site to the same branch), then enable the workflow's `push` trigger and turn on "Enforce HTTPS" in the Pages settings. `website-build.yml` builds every PR that touches `website/`.
