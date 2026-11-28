#!/usr/bin/env node
/**
 * Preview server for the production build, close to how Cloudflare Pages
 * serves it: brotli/gzip, immutable caching for hashed assets, trailing-slash
 * redirects, the site's 404 page. No dependencies.
 *
 *   node scripts/serve.mjs [buildDir] [--port 4100] [--host 0.0.0.0]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? def : args[i + 1];
};
const root = path.resolve(args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')) ?? 'build');
const port = Number(opt('port', process.env.PORT ?? 4100));
const host = opt('host', '0.0.0.0');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.map': 'application/json',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg', '.map']);
const cache = new Map();

function compressed(file, enc, stat) {
  const key = `${file}:${enc}:${stat.mtimeMs}`;
  if (!cache.has(key)) {
    const buf = fs.readFileSync(file);
    cache.set(key, enc === 'br'
      ? zlib.brotliCompressSync(buf, {params: {[zlib.constants.BROTLI_PARAM_QUALITY]: 9}})
      : zlib.gzipSync(buf, {level: 9}));
  }
  return cache.get(key);
}

function send(req, res, file, status = 200) {
  const stat = fs.statSync(file);
  const ext = path.extname(file);
  const rel = path.relative(root, file);
  res.setHeader('Content-Type', TYPES[ext] ?? 'application/octet-stream');
  res.setHeader('Cache-Control', rel.startsWith('assets') || rel.startsWith('fonts')
    ? 'public, max-age=31536000, immutable'
    : ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  const accept = String(req.headers['accept-encoding'] ?? '');
  if (COMPRESSIBLE.has(ext) && stat.size > 1024) {
    const enc = accept.includes('br') ? 'br' : accept.includes('gzip') ? 'gzip' : null;
    if (enc) {
      res.setHeader('Content-Encoding', enc);
      res.setHeader('Vary', 'Accept-Encoding');
      res.writeHead(status);
      return res.end(req.method === 'HEAD' ? undefined : compressed(file, enc, stat));
    }
  }
  res.writeHead(status, {'Content-Length': stat.size});
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file).pipe(res);
}

http
  .createServer((req, res) => {
    try {
      const url = new URL(req.url, 'http://x');
      const pathname = decodeURIComponent(url.pathname);
      const target = path.join(root, pathname);
      if (!target.startsWith(root)) return res.writeHead(400).end();
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
        if (!pathname.endsWith('/')) {
          res.writeHead(301, {Location: `${url.pathname}/${url.search}`});
          return res.end();
        }
        const index = path.join(target, 'index.html');
        if (fs.existsSync(index)) return send(req, res, index);
      } else if (fs.existsSync(target)) {
        return send(req, res, target);
      }
      const notFound = path.join(root, '404.html');
      if (fs.existsSync(notFound)) return send(req, res, notFound, 404);
      res.writeHead(404).end('Not found');
    } catch (e) {
      res.writeHead(500).end(String(e));
    }
  })
  .listen(port, host, () => console.log(`Serving ${root} on http://${host}:${port}`));
