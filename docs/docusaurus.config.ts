import { themes as prismThemes } from "prism-react-renderer";
import type { Config, Plugin } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import fs from "fs/promises";
import path from "path";
import { SITE_URL, redirects, rawRedirects } from "./redirects";

const redirectPageHtml = (toUrl: string) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${toUrl}">
    <link rel="canonical" href="${toUrl}" />
  </head>
  <script>
    window.location.href = '${toUrl}';
  </script>
</html>
`;

/**
 * Fails the build if a redirect points to a page that does not exist or
 * would shadow a real page, and writes the redirect pages for legacy paths
 * with spaces, which plugin-client-redirects cannot express.
 */
function redirectChecksPlugin(): Plugin {
	return {
		name: "uavmatrix-redirect-checks",
		async postBuild({ routesPaths, outDir }) {
			const routes = new Set(routesPaths);
			const problems: string[] = [];
			const seen = new Set<string>();
			for (const r of [...redirects, ...rawRedirects]) {
				if (seen.has(r.from)) problems.push(`duplicate redirect source: ${r.from}`);
				seen.add(r.from);
				if (routes.has(r.from)) problems.push(`redirect source is a real page: ${r.from}`);
				const toPath = r.to.startsWith(SITE_URL) ? r.to.slice(SITE_URL.length) : r.to;
				if (!routes.has(toPath)) problems.push(`redirect target is not a page: ${r.from} -> ${r.to}`);
			}
			if (problems.length > 0) {
				throw new Error(`Invalid redirects in redirects.ts:\n- ${problems.join("\n- ")}`);
			}
			for (const r of rawRedirects) {
				const file = path.join(outDir, r.from, "index.html");
				await fs.mkdir(path.dirname(file), { recursive: true });
				await fs.writeFile(file, redirectPageHtml(r.to), { flag: "wx" });
			}
		},
	};
}

const config: Config = {
	title: "UAVcast-Pro Docs",
	tagline: "UAVcast-Pro Documentation",
	favicon: "img/favicon.ico",

	// Set the production url of your site here
	url: SITE_URL,
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub Pages serves every page as a folder (/page/index.html) and 301s
	// /page to /page/. Emit the slashed URL everywhere (canonical tags,
	// sitemap, internal links) so it matches what is actually served.
	trailingSlash: true,

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "UAVmatrix", // Usually your GitHub org/user name.
	projectName: "uavcast-pro-docs", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	// Future flags for Docusaurus v4 preparation
	future: {
		v4: {
			removeLegacyPostBuildHeadAttribute: true,
			useCssCascadeLayers: true,
		},
	},

	presets: [
		[
			"classic",
			{
				docs: {
					lastVersion: "current",
					versions: {
						current: {
							label: "6.x",
							path: "6.x",
						},
						// Old versions stay reachable for existing users, but are kept
						// out of search results and the sitemap so they do not compete
						// with the 6.x pages.
						"5.x": {
							noIndex: true,
						},
						"4.x": {
							noIndex: true,
						},
					},
					sidebarPath: "./sidebars.ts",
					editUrl: "https://github.com/UAVmatrix/uavcast-pro-docs/edit/master/docs/",
				},
				blog: false,
				theme: {
					customCss: "./src/css/custom.css",
				},
				sitemap: {
					lastmod: "date",
					ignorePatterns: ["/search/**", "/docs/*/category/**"],
				},
			} satisfies Preset.Options,
		],
	],

	plugins: [
		[
			"@docusaurus/plugin-client-redirects",
			{
				redirects,
			},
		],
		redirectChecksPlugin,
	],

	themes: [
		[
			require.resolve("@easyops-cn/docusaurus-search-local"),
			/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
			({
				hashed: true,
				language: ["en"],
				highlightSearchTermsOnTargetPage: true,
				explicitSearchResultPath: true,
				docsRouteBasePath: "/docs",
				indexDocs: true,
				indexBlog: false,
				indexPages: false,
			}),
		],
	],

	themeConfig: {
		colorMode: {
			defaultMode: "dark",
			respectPrefersColorScheme: false,
			disableSwitch: false,
		},
		image: "img/uavcast-pro-social-card.jpg",
		navbar: {
			title: "UAVcast-Pro",
			logo: {
				alt: "UAVcast Logo",
				src: "img/uavcast_logo.png",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "tutorialSidebar",
					position: "left",
					label: "Docs",
				},
				// { to: "/blog", label: "Blog", position: "left" },
				{
					type: "docsVersionDropdown",
				},
				{
					href: "https://github.com/UAVmatrix/uavcast-pro-docs",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "Docs",
					items: [
						{
							label: "Quickstart Tutorial",
							to: "/docs/6.x/quick-start",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "Discord",
							href: "https://discord.gg/xwqMTXh",
						},
					],
				},
				{
					title: "More",
					items: [
						// {
						// 	label: "Blog",
						// 	to: "/blog",
						// },
						{
							label: "Store",
							href: "https://uavmatrix.com/",
						},
						{
							label: "GitHub",
							href: "https://github.com/UAVmatrix/uavcast-pro-docs",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} uavmatrix.com`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
