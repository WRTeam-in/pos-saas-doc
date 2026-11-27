// Makes an offline copy of the documentation in ./offline that opens straight from the folder (file://), no server.
// Run `npm run build:offline` (it builds the site first). Open offline/index.html in any browser.
//
// The normal build needs a web server: links and pictures start at "/" and the pages are driven by JavaScript.
// This copies that build, points every link, stylesheet and picture at a relative path (folder links get
// index.html), drops the app scripts (pages are already fully written out) and adds a tiny script for the
// phone menu. The plain scripts in static/js (screenshot viewer, search, light/dark switch) stay. All pictures, the screenshots included, are copied into the folder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');
const out = path.join(root, 'offline');

if (!fs.existsSync(path.join(build, 'index.html'))) {
  console.error('No build found. Run "npm run build" first.');
  process.exit(1);
}

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(build, out, { recursive: true });
// Server-only files and the app scripts are not needed offline.
for (const f of ['sitemap.xml', '404.html']) fs.rmSync(path.join(out, f), { force: true });
fs.rmSync(path.join(out, 'assets', 'js'), { recursive: true, force: true });

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

// "/docs/intro#x" seen from a file -> "../../docs/intro/index.html#x"
function relative(fromFile, url) {
  const [, pathname = '/', suffix = ''] = url.match(/^([^?#]*)([?#].*)?$/) || [];
  let target = path.join(out, decodeURIComponent(pathname));
  if (!path.extname(target) || (fs.existsSync(target) && fs.statSync(target).isDirectory())) target = path.join(target, 'index.html');
  let rel = path.relative(path.dirname(fromFile), target).split(path.sep).join('/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return encodeURI(rel) + suffix;
}

const helper = `<script>(function(){var d=document.documentElement;
document.addEventListener('click',function(e){
if(e.target.closest('.navbar__toggle')){d.querySelector('.navbar').classList.toggle('navbar-sidebar--show');return}
if(e.target.closest('.navbar-sidebar__backdrop,.navbar-sidebar__close')){d.querySelector('.navbar').classList.remove('navbar-sidebar--show')}
var c=e.target.closest('.menu__caret');if(c){e.preventDefault();c.closest('.menu__list-item').classList.toggle('menu__list-item--collapsed')}
});})();</script>`;

let pages = 0;
for (const file of walk(out)) {
  if (file.endsWith('.css')) {
    const css = fs.readFileSync(file, 'utf8').replace(/url\((['"]?)(\/[^'")]+)\1\)/g, (m, q, u) => `url(${q}${relative(file, u)}${q})`);
    fs.writeFileSync(file, css);
    continue;
  }
  if (!file.endsWith('.html')) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html
    .replace(/<script[^>]*\bsrc="\/assets\/js\/[^"]*"[^>]*>\s*<\/script>/g, '')
    .replace(/<link[^>]+rel="(?:preload|prefetch|modulepreload)"[^>]*>/g, '')
    .replace(/<link[^>]+rel="(?:canonical|alternate)"[^>]*>/g, '')
    .replace(/\s(href|src|poster)="(\/(?!\/)[^"]*)"/g, (m, attr, u) => ` ${attr}="${relative(file, u)}"`)
    .replace(/\ssrcset="([^"]*)"/g, (m, set) => ` srcset="${set.replace(/(^|,\s*)(\/(?!\/)\S+)/g, (s, pre, u) => pre + relative(file, u))}"`)
    // Captions: browsers block reading a caption file from disk, so put its text into the page.
    .replace(/<track([^>]*)\ssrc="([^"]+\.vtt)"/g, (m, attrs, src) => {
      const vtt = path.join(path.dirname(file), decodeURI(src.split('#')[0]));
      return fs.existsSync(vtt) ? `<track${attrs} src="data:text/vtt;base64,${fs.readFileSync(vtt).toString('base64')}"` : m;
    })
    .replace('</body>', `${helper}</body>`);
  fs.writeFileSync(file, html);
  pages++;
}

const shots = fs.existsSync(path.join(out, 'img', 'screenshots')) ? fs.readdirSync(path.join(out, 'img', 'screenshots')).length : 0;
console.log(`Offline docs ready: ${pages} pages, ${shots} screenshots in ${path.relative(process.cwd(), out) || out}. Open offline/index.html.`);
