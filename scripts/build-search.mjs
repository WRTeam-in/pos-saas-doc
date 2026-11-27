// Builds the search index from the finished site (run after `docusaurus build`; `npm run build` does both).
// Writes build/js/search-index.js (and a copy in static/js for `npm start`): one entry per page with its sections (heading, anchor, plain text).
// It is a script, not JSON, so the offline copy can load it from disk (file:// cannot fetch JSON).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ' };
const text = (html) => html
  .replace(/<a[^>]*class="hash-link"[^>]*>.*?<\/a>/g, '')
  .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ')
  .replace(/<\/(p|li|tr|h\d|div|td|th)>/g, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/&(#?\w+);/g, (m, e) => entities[e] ?? (e.startsWith('#') ? String.fromCharCode(parseInt(e.slice(1).replace(/^x/, '0x'))) : m))
  .replace(/\s+/g, ' ')
  .trim();

const pages = [];
for (const file of walk(path.join(build, 'docs'))) {
  if (!file.endsWith('index.html')) continue;
  const html = fs.readFileSync(file, 'utf8');
  const start = html.indexOf('theme-doc-markdown markdown">');
  if (start < 0) continue;
  const end = html.indexOf('<footer', start);
  let body = html.slice(start + 'theme-doc-markdown markdown">'.length, end > 0 ? end : undefined);
  const title = text((body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  body = body.replace(/<header>[\s\S]*?<\/header>/, '');
  const nav = (html.match(/<nav[^>]*class="[^"]*breadcrumbs[^"]*"[^>]*>([\s\S]*?)<\/nav>/) || [])[1] || '';
  const crumbs = [...nav.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1])).filter((c) => c && !/home page/i.test(c));
  crumbs.pop(); // the last crumb is the page itself
  const url = path.relative(build, path.dirname(file)).split(path.sep).join('/') + '/';
  const sections = [];
  const parts = body.split(/(<h[23][^>]*id="[^"]+"[^>]*>[\s\S]*?<\/h[23]>)/);
  sections.push({ h: '', a: '', t: text(parts[0]) });
  for (let i = 1; i < parts.length; i += 2) {
    sections.push({ h: text(parts[i]), a: (parts[i].match(/id="([^"]+)"/) || [])[1] || '', t: text(parts[i + 1] || '') });
  }
  pages.push({ u: url, ti: title, c: crumbs.join(' › '), s: sections.filter((s) => s.h || s.t) });
}
pages.sort((a, b) => a.u.localeCompare(b.u));
const index = `window.__DOC_SEARCH_INDEX=${JSON.stringify(pages)};\n`;
fs.mkdirSync(path.join(build, 'js'), { recursive: true });
fs.writeFileSync(path.join(build, 'js', 'search-index.js'), index);
// Also kept in static/js (git-ignored) so `npm start` previews can search the last built docs.
fs.writeFileSync(path.join(root, 'static', 'js', 'search-index.js'), index);
console.log(`Search index: ${pages.length} pages, ${pages.reduce((n, p) => n + p.s.length, 0)} sections.`);
