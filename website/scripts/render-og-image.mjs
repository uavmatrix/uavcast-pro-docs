#!/usr/bin/env node
/**
 * Renders scripts/og/og-image.html to static/img/og/uavmatrix-docs.png (1200×630).
 * The social image stays PNG on purpose: Facebook, LinkedIn, Slack and others
 * handle WebP poorly. Needs Playwright, which is not a site dependency:
 *   npm i --no-save playwright@1.49.1 && npm run og-image
 */
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
let chromium;
try {
  ({chromium} = createRequire(process.env.NODE_PATH ? `${process.env.NODE_PATH}/` : import.meta.url)('playwright'));
} catch {
  ({chromium} = await import('playwright'));
}
const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 1200, height: 630}, deviceScaleFactor: 1});
await page.goto(pathToFileURL(path.join(here, 'og', 'og-image.html')).href, {waitUntil: 'networkidle'});
await page.evaluate(() => document.fonts.ready);
const out = path.join(here, '..', 'static', 'img', 'og', 'uavmatrix-docs.png');
await page.screenshot({path: out, type: 'png'});
await browser.close();
console.log(`wrote ${out}`);
