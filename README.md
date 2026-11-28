# UAVmatrix docs

Source for **https://docs.uavmatrix.com**: documentation for UAVcast-Pro and Fleet Manager, in 10 languages.

The site lives in [`website/`](website/) (Docusaurus 3). See [`website/README.md`](website/README.md) for local development, adding a language, screenshots and the redirect map.

## Contributing

1. Fork and clone the repository, then create a branch: `git checkout -b my-change`
2. `cd website && npm install && npm run start`, which opens the dev server at http://localhost:3000
3. Edit pages under `website/docs/` (English). Translations live in `website/i18n/<locale>/`.
4. Open a pull request against `master`. The **Build docs (website/)** check builds every language and fails on broken links.

## Deploy

Merging to `master` deploys automatically: **Deploy docs v2 (website/) to GitHub Pages** builds the site and publishes it to the `gh-pages` branch, which GitHub serves at docs.uavmatrix.com.

The previous Docusaurus site (`docs/`, versions 4.x–6.x) was removed at the v2 cutover on 2026-11-28. It's still in git history.
