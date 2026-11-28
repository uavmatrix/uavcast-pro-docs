/**
 * Build-time manifest of screenshots in static/img/screenshots/**.
 *
 * <Screenshot id="uavcast-pro/camera"/> needs to know, during SSR, whether the
 * image exists (else it renders a placeholder frame), its intrinsic size (to
 * reserve space and avoid layout shift) and whether a `.dark.webp` variant
 * exists. This plugin scans the folder and exposes that as global data.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {imageSize} from 'image-size';
import type {LoadContext, Plugin} from '@docusaurus/types';

/** Width of the smaller responsive variant written next to large screenshots. */
export const SMALL_WIDTH = 1440;
/** Screenshots at least this wide get a SMALL_WIDTH variant (`<id>.w1440.webp`). */
const VARIANT_MIN_WIDTH = 2000;

export type ScreenshotEntry = {w: number; h: number; small?: boolean; dark?: {w: number; h: number; small?: boolean}};
export type ScreenshotManifest = Record<string, ScreenshotEntry>;

async function walk(dir: string): Promise<string[]> {
  let entries: import('node:fs').Dirent[];
  try {
    entries = await fs.readdir(dir, {withFileTypes: true});
  } catch {
    return [];
  }
  const out: string[] = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.webp') && !/\.w\d+\.webp$/.test(e.name)) out.push(p);
  }
  return out;
}

async function dims(file: string) {
  const buf = await fs.readFile(file);
  const {width, height} = imageSize(buf);
  return {w: width ?? 0, h: height ?? 0};
}

export default function screenshotsPlugin(context: LoadContext): Plugin<ScreenshotManifest> {
  const root = path.join(context.siteDir, 'static', 'img', 'screenshots');
  return {
    name: 'uavmatrix-screenshots',
    getPathsToWatch() {
      return [path.join(root, '**/*.webp')];
    },
    async loadContent() {
      const files = await walk(root);
      const manifest: ScreenshotManifest = {};
      const darks: [string, string][] = [];
      for (const f of files) {
        const rel = path.relative(root, f).split(path.sep).join('/');
        if (rel.endsWith('.dark.webp')) {
          darks.push([rel.slice(0, -'.dark.webp'.length), f]);
          continue;
        }
        try {
          const d = await dims(f);
          manifest[rel.slice(0, -'.webp'.length)] = {...d, small: d.w >= VARIANT_MIN_WIDTH};
        } catch {
          /* unreadable file: treat as missing */
        }
      }
      for (const [id, f] of darks) {
        if (!manifest[id]) continue;
        try {
          const d = await dims(f);
          manifest[id].dark = {...d, small: d.w >= VARIANT_MIN_WIDTH};
        } catch {
          /* ignore */
        }
      }
      return manifest;
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
    // Write the 1440px variants into the build (not into static/). Encoded
    // files are cached in node_modules/.cache so rebuilds stay fast.
    async postBuild({outDir, content}) {
      // CJS/ESM interop: the function is either the module or its default export.
      const mod = (await import('sharp')) as unknown as {default?: unknown};
      const sharp = (typeof mod === 'function' ? mod : mod.default) as typeof import('sharp');
      const cacheDir = path.join(context.siteDir, 'node_modules', '.cache', 'uavmatrix-screenshots');
      await fs.mkdir(cacheDir, {recursive: true});
      const jobs: [string, string][] = [];
      for (const [id, e] of Object.entries(content ?? {})) {
        if (e.small) jobs.push([`${id}.webp`, `${id}.w${SMALL_WIDTH}.webp`]);
        if (e.dark?.small) jobs.push([`${id}.dark.webp`, `${id}.dark.w${SMALL_WIDTH}.webp`]);
      }
      let made = 0;
      for (const [src, dst] of jobs) {
        const srcFile = path.join(root, src);
        const stat = await fs.stat(srcFile);
        const key = `${dst.replace(/\//g, '__')}-${stat.size}-${Math.round(stat.mtimeMs)}`;
        const cached = path.join(cacheDir, key);
        const target = path.join(outDir, 'img', 'screenshots', dst);
        await fs.mkdir(path.dirname(target), {recursive: true});
        try {
          await fs.copyFile(cached, target);
        } catch {
          await sharp(srcFile).resize({width: SMALL_WIDTH}).webp({quality: 82}).toFile(cached);
          await fs.copyFile(cached, target);
          made += 1;
        }
      }
      if (jobs.length) console.log(`[screenshots] ${jobs.length} responsive variants (${made} newly encoded)`);
    },
  };
}
