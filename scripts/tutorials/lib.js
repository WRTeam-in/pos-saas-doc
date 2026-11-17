/*
 * Tutorial recorder. Drives the running app with Playwright, records the screen as WebM, and writes
 * the captions (WebVTT), a thumbnail and the entry in src/data/tutorials.json.
 *
 *   node scripts/tutorials/run.js product-overview        one tutorial
 *   node scripts/tutorials/run.js all                     every tutorial
 *
 * Needs the app running on demo data (see scripts/tutorials/README.md) and Playwright.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const narration = require('./narration');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = process.env.TUTORIAL_OUT || path.join(ROOT, 'static', 'tutorials');
const DATA = path.join(ROOT, 'src', 'data', 'tutorials.json');
const BASE = (process.env.TUTORIAL_BASE_URL || 'http://127.0.0.1:8005').replace(/\/$/, '');
const SIZE = { width: 1280, height: 720 };    // layout size the app is drawn at
const VIDEO = process.env.TUTORIAL_VIDEO_WIDTH === "1280" ? { width: 1280, height: 720 } : { width: 1920, height: 1080 };  // recorded size (Full HD); the page renders at 1.5x so text stays sharp
const SCALE = VIDEO.width / SIZE.width;
const CREDS = {
  shop: { email: process.env.TUTORIAL_SHOP_EMAIL || 'rahul@freshmart.example', password: process.env.TUTORIAL_SHOP_PASSWORD || 'password' },
  admin: { email: process.env.TUTORIAL_ADMIN_EMAIL || 'admin@gmail.com', password: process.env.TUTORIAL_ADMIN_PASSWORD || 'Admin@123' },
};

function loadPlaywright() {
  const candidates = [process.env.PLAYWRIGHT_PATH, 'playwright'].filter(Boolean);
  const npx = path.join(os.homedir(), '.npm', '_npx');
  if (fs.existsSync(npx)) {
    for (const dir of fs.readdirSync(npx)) candidates.push(path.join(npx, dir, 'node_modules', 'playwright'));
  }
  for (const candidate of candidates) {
    try { return require(candidate); } catch (error) { /* try the next one */ }
  }
  throw new Error('Playwright not found. Set PLAYWRIGHT_PATH or run: npm i -D playwright');
}

function browserPath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright');
  if (!fs.existsSync(cache)) return undefined;
  const shell = fs.readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort().pop();
  if (!shell) return undefined;
  const root = path.join(cache, shell);
  const inner = fs.readdirSync(root).find((d) => d.startsWith('chrome-headless-shell'));

  return inner ? path.join(root, inner, 'chrome-headless-shell') : undefined;
}

const OVERLAY = () => {
  const mount = () => {
    if (document.getElementById('__tut') || !document.body) return;
    const root = document.createElement('div');
    root.id = '__tut';
    root.innerHTML = `<style>
      #__tut-cur{position:fixed;left:0;top:0;z-index:2147483647;width:26px;height:26px;pointer-events:none;filter:drop-shadow(0 2px 3px rgba(0,0,0,.45));transform:translate(var(--x,60px),var(--y,60px))}
      #__tut-rip{position:fixed;z-index:2147483646;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;pointer-events:none;border:3px solid #6366f1;opacity:0}
      #__tut-rip.go{animation:__tutrip .55s ease-out}
      @keyframes __tutrip{0%{opacity:.9;transform:scale(.6)}100%{opacity:0;transform:scale(4.2)}}
      #__tut-ring{position:fixed;z-index:2147483645;pointer-events:none;border:3px solid #6366f1;border-radius:12px;box-shadow:0 0 0 6px rgba(99,102,241,.25);opacity:0;transition:opacity .25s}
      #__tut-ring.on{opacity:1}
    </style>
    <svg id="__tut-cur" viewBox="0 0 24 24"><path d="M4 2l15 9-6.5 1.6L9.5 19z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>
    <div id="__tut-rip"></div><div id="__tut-ring"></div>`;
    document.body.append(root);
    const cur = document.getElementById('__tut-cur');
    const place = (x, y) => { cur.style.setProperty('--x', `${x - 4}px`); cur.style.setProperty('--y', `${y - 2}px`); };
    const saved = sessionStorage.getItem('__tutpos');
    if (saved) { const [x, y] = saved.split(','); place(+x, +y); }
    document.addEventListener('mousemove', (e) => { place(e.clientX, e.clientY); sessionStorage.setItem('__tutpos', `${e.clientX},${e.clientY}`); }, true);
    window.__tutRipple = (x, y) => {
      const rip = document.getElementById('__tut-rip');
      rip.style.left = `${x}px`; rip.style.top = `${y}px`; rip.classList.remove('go'); void rip.offsetWidth; rip.classList.add('go');
    };
    window.__tutRing = (r) => {
      const ring = document.getElementById('__tut-ring');
      if (!r) { ring.classList.remove('on'); return; }
      Object.assign(ring.style, { left: `${r.x - 6}px`, top: `${r.y - 6}px`, width: `${r.w + 12}px`, height: `${r.h + 12}px` });
      ring.classList.add('on');
    };
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const stamp = (s) => {
  const ms = Math.round(s * 1000);
  const p = (n, w = 2) => String(n).padStart(w, '0');

  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)}.${p(ms % 1000, 3)}`;
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function introHtml(title, subtitle, logo) {
  return `<!doctype html><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;height:100vh;display:grid;place-items:center;font-family:'Plus Jakarta Sans',system-ui,-apple-system,Segoe UI,sans-serif;background:radial-gradient(60rem 30rem at 85% 10%,rgba(99,102,241,.14),transparent 70%),radial-gradient(50rem 28rem at 5% 95%,rgba(236,72,153,.1),transparent 70%),#f7f6fb;color:#15131f}
    .card{display:grid;justify-items:center;gap:22px;text-align:center;padding:0 80px}
    img{height:84px;width:auto;mix-blend-mode:multiply}.logo{font-weight:800;font-size:44px;letter-spacing:-.02em}
    .tag{font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6366f1}
    h1{margin:0;font-size:56px;line-height:1.08;letter-spacing:-.03em;max-width:980px}
    p{margin:0;font-size:24px;color:#5b5870;max-width:820px;line-height:1.4}
    .bar{width:96px;height:6px;border-radius:6px;background:linear-gradient(90deg,#6366f1,#ec4899)}
  </style><div class="card">${logo ? `<img src="${logo}" alt="">` : '<div class="logo">POS SaaS</div>'}<div class="bar"></div><div class="tag">Video tutorial</div><h1>${esc(title)}</h1>${subtitle ? `<p>${esc(subtitle)}</p>` : ''}</div>`;
}

function pngInfo(file) {
  const head = Buffer.alloc(26);
  const fd = fs.openSync(file, 'r');
  fs.readSync(fd, head, 0, 26, 0);
  fs.closeSync(fd);

  return { width: head.readUInt32BE(16), height: head.readUInt32BE(20), alpha: head[25] === 6 };
}

// The platform logo: a wide PNG with transparency in the platform upload folder (set TUTORIAL_LOGO to pick one).
function logoDataUri() {
  const dirs = [path.resolve(ROOT, '..', 'pos_final', 'storage', 'app', 'public', 'platform'), path.resolve(ROOT, '..', 'storage', 'app', 'public', 'platform')];
  const dir = dirs.find((d) => fs.existsSync(d));
  let file = process.env.TUTORIAL_LOGO;
  if (!file && dir) {
    file = fs.readdirSync(dir).filter((f) => f.endsWith('.png')).map((f) => path.join(dir, f)).filter((f) => {
      try { const i = pngInfo(f); const ratio = i.width / i.height; return i.alpha && ratio > 2 && ratio < 7; } catch (error) { return false; }
    }).sort((x, y) => fs.statSync(y).mtimeMs - fs.statSync(x).mtimeMs)[0];
  }
  if (!file || !fs.existsSync(file)) return null;

  return `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;
}

// src/data/tutorials.json is derived from every static/tutorials/<slug>/meta.json, so recordings can run side by side.
function rebuildIndex() {
  const list = fs.existsSync(OUT)
    ? fs.readdirSync(OUT).map((d) => path.join(OUT, d, 'meta.json')).filter((f) => fs.existsSync(f)).map((f) => JSON.parse(fs.readFileSync(f, 'utf8')))
    : [];
  list.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
  fs.mkdirSync(path.dirname(DATA), { recursive: true });
  fs.writeFileSync(DATA, `${JSON.stringify(list, null, 2)}\n`);

  return list;
}

// Reset demo data between takes (local demo database only): sql("UPDATE ..."). Skipped when TUTORIAL_SKIP_SQL is set.
function sql(statement) {
  if (process.env.TUTORIAL_SKIP_SQL) return;
  const mysql = process.env.TUTORIAL_MYSQL || '/Applications/XAMPP/xamppfiles/bin/mysql';
  const args = (process.env.TUTORIAL_MYSQL_ARGS || '-uroot').split(' ').filter(Boolean);
  require('child_process').execFileSync(mysql, [...args, process.env.TUTORIAL_DB || 'pos_tutorials', '-e', statement], { stdio: 'pipe' });
}

async function record(meta, script) {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ executablePath: browserPath() });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tutorial-'));
  const context = await browser.newContext({ viewport: SIZE, deviceScaleFactor: SCALE, recordVideo: { dir: tmp, size: VIDEO }, locale: 'en-US' });
  await context.addInitScript(OVERLAY);
  const page = await context.newPage();
  const t0 = Date.now();
  const now = () => (Date.now() - t0) / 1000;
  const cues = [];
  const chapters = [];
  let pos = { x: 640, y: 360 };
  let thumb = null;

  const t = {
    page,
    base: BASE,
    now,
    sql,
    wait: (ms) => sleep(ms),

    async intro(title, subtitle, hold = 3400) {
      await page.setContent(introHtml(title, subtitle, logoDataUri()));
      await sleep(600);
      thumb = await page.screenshot({ type: 'png' });
      await sleep(hold - 600);
    },

    chapter(title) { chapters.push({ t: Math.max(0, Math.round(now() * 10) / 10), title }); },

    async say(text, action) {
      const start = now();
      // With a narration clip the caption lasts as long as the speech (plus a breath); otherwise a reading time.
      const spoken = narration.clipSeconds(text);
      const min = spoken === null ? clamp(0.055 * text.length + 0.9, 2.2, 8) : spoken + 0.35;
      if (action) await action();
      const rest = start + min - now();
      if (rest > 0) await sleep(rest * 1000);
      cues.push({ start: start + 0.05, end: now() - 0.05, text });
    },

    async settle(extra = 500) {
      await page.waitForLoadState('load').catch(() => {});
      await page.waitForLoadState('networkidle', { timeout: 6000 }).catch(() => {});
      await page.waitForSelector('.fixed-table-loading:visible', { state: 'hidden', timeout: 5000 }).catch(() => {});
      await t.showPublicAddress();
      await sleep(extra);
    },

    async goto(url) {
      await page.goto(url.startsWith('http') ? url : BASE + url);
      await t.settle();
    },

    async moveTo(x, y) {
      const dist = Math.hypot(x - pos.x, y - pos.y);
      const steps = clamp(Math.round(dist / 14), 14, 48);
      for (let i = 1; i <= steps; i++) {
        const e = 0.5 - Math.cos((i / steps) * Math.PI) / 2;
        await page.mouse.move(pos.x + (x - pos.x) * e, pos.y + (y - pos.y) * e);
        await sleep(14);
      }
      pos = { x, y };
    },

    async point(sel, { ring = false } = {}) {
      const el = typeof sel === 'string' ? page.locator(sel).first() : sel;
      await el.scrollIntoViewIfNeeded();
      await sleep(150);
      const box = await el.boundingBox();
      if (!box) throw new Error(`No box for ${sel}`);
      if (ring) await page.evaluate((r) => window.__tutRing && window.__tutRing(r), { x: box.x, y: box.y, w: box.width, h: box.height });
      await t.moveTo(box.x + box.width / 2, box.y + box.height / 2);

      return { el, box };
    },

    async highlight(sel, ms = 1600) {
      await t.point(sel, { ring: true });
      await sleep(ms);
      await page.evaluate(() => window.__tutRing && window.__tutRing(null));
    },

    async click(sel, { settle = true } = {}) {
      const { el, box } = await t.point(sel);
      await page.evaluate(({ x, y }) => window.__tutRipple && window.__tutRipple(x, y), { x: box.x + box.width / 2, y: box.y + box.height / 2 });
      await sleep(200);
      await el.click();
      if (settle) await t.settle(400);
    },

    // Native <select>: the cursor goes to it and the value changes (the browser's own list is not captured in video).
    async choose(sel, value) {
      const { el, box } = await t.point(sel);
      await page.evaluate(({ x, y }) => window.__tutRipple && window.__tutRipple(x, y), { x: box.x + box.width / 2, y: box.y + box.height / 2 });
      await sleep(300);
      await el.selectOption(typeof value === 'string' ? { label: value } : value);
      await t.settle(500);
    },

    async type(sel, text, { delay = 65 } = {}) {
      const { el } = await t.point(sel);
      await el.click();
      await page.keyboard.type(text, { delay });
      await sleep(250);
    },

    async scroll(by, ms = 1200) {
      const steps = Math.max(6, Math.round(ms / 60));
      for (let i = 0; i < steps; i++) {
        await page.mouse.wheel(0, by / steps);
        await sleep(ms / steps);
      }
    },

    async openMenu(group, href) {
      const toggle = page.locator('.app-sidebar .sidebar-group-toggle', { hasText: group }).first();
      const open = await toggle.evaluate((el) => !!el.closest('.sidebar-group')?.classList.contains('open')).catch(() => false);
      if (!open) await t.click(toggle, { settle: false });
      await sleep(450);
      await t.click(page.locator(`.app-sidebar a[href$="${href}"]`).first());
    },

    // Recording on a local copy: show the real site's address wherever the page prints the local one (webhook URLs and the like).
    async showPublicAddress() {
      const pub = process.env.TUTORIAL_PUBLIC_URL;
      if (!pub) return;
      await page.evaluate(({ from, to }) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (n.nodeValue.includes(from)) n.nodeValue = n.nodeValue.split(from).join(to);
        }
        document.querySelectorAll('input, textarea').forEach((el) => { if (el.value && el.value.includes(from)) el.value = el.value.split(from).join(to); });
      }, { from: BASE, to: pub.replace(/\/$/, '') }).catch(() => {});
    },

    async dismissWelcome() {
      const skip = page.locator('[data-tour-action="skip"]').first();
      if (await skip.isVisible().catch(() => false)) {
        await skip.click({ timeout: 3000 }).catch(() => {});
        await sleep(500);
      }
    },

    async login(email, password) {
      await t.goto('/login');
      await t.type('#email', email);
      await t.type('#password', password, { delay: 55 });
      await t.click('button[type="submit"]', { settle: false });
      await page.waitForURL((u) => !u.pathname.endsWith('/login'), { timeout: 15000 });
      await t.settle(800);
      await t.dismissWelcome();
    },
  };

  try {
    await script(t);
  } catch (error) {
    const shot = path.join(os.tmpdir(), `tutorial-error-${meta.slug}.png`);
    await page.screenshot({ path: shot }).catch(() => {});
    console.error(`Failed in ${meta.slug} at ${Math.round(now())}s. Screenshot: ${shot}`);
    await context.close();
    await browser.close();
    throw error;
  }
  await sleep(1200);
  const duration = now();
  const video = page.video();
  await context.close();
  const dir = path.join(OUT, meta.slug);
  fs.mkdirSync(dir, { recursive: true });
  await video.saveAs(path.join(dir, 'video.webm'));
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });

  const vtt = `WEBVTT\n\n${cues.map((c, i) => `${i + 1}\n${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}`).join('\n\n')}\n`;
  fs.writeFileSync(path.join(dir, 'captions.vtt'), vtt);
  if (thumb) fs.writeFileSync(path.join(dir, 'thumb.png'), thumb);

  fs.writeFileSync(path.join(dir, 'meta.json'), `${JSON.stringify({
    slug: meta.slug,
    title: meta.title,
    category: meta.category,
    summary: meta.summary,
    doc: meta.doc || null,
    order: meta.order ?? 99,
    duration: Math.round(duration),
    chapters,
  }, null, 2)}\n`);
  if (!process.env.TUTORIAL_OUT) rebuildIndex();   // a test output folder must not rewrite the site index

  const size = fs.statSync(path.join(dir, 'video.webm')).size;
  console.log(`${meta.slug}: ${Math.round(duration)}s, ${chapters.length} chapters, ${cues.length} captions, ${(size / 1048576).toFixed(1)} MB`);
}

module.exports = { record, rebuildIndex, sql, BASE, CREDS };
