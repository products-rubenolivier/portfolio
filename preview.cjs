// Local preview: node preview.cjs
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const siteFiles = new Set(['index.html', 'project.html', 'project-2.html', 'project-3.html', 'styles.css', 'site.js', 'favicon.svg']);
const previewFiles = new Set(['index.html', 'clari.html', 'axis.html', 'nomada.html', 'styles.css', 'site.js']);
const brandFiles = new Set(['logo.png', 'wordmark.png', 'symbol.png', 'favicon.svg']);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  if (pathname === '/') pathname = '/index.html';
  if (pathname === '/iteration-01/') pathname += 'index.html';
  const isSiteFile = siteFiles.has(pathname.slice(1));
  const isBrandFile = pathname.startsWith('/assets/brand/') && brandFiles.has(pathname.slice('/assets/brand/'.length));
  const isPreviewFile = pathname.startsWith('/iteration-01/') && previewFiles.has(pathname.slice('/iteration-01/'.length));
  const isPreviewBrand = pathname.startsWith('/iteration-01/assets/brand/') && brandFiles.has(pathname.slice('/iteration-01/assets/brand/'.length));
  if (!(isSiteFile || isBrandFile || isPreviewFile || isPreviewBrand)) {
    res.writeHead(404).end('Not found'); return;
  }
  fs.readFile(path.join(root, pathname.slice(1)), (error, data) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(pathname)], 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('Portfolio: http://localhost:4173/'));
