/**
 * URL of a doc page's Markdown copy (written by plugins/markdown-export):
 * the route without its trailing slash plus ".md", e.g.
 * /get-started/quick-start/ -> /get-started/quick-start.md (and /es/… for locales).
 */
export function markdownHref(permalink: string): string {
  return `${permalink.replace(/\/+$/, '')}.md`;
}
