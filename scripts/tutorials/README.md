# Tutorial recorder

Records captioned screen videos of the app for the **Tutorials** section of these docs (`/tutorials`).
Each tutorial is one script in `videos/`. Running it drives the app with Playwright and writes:

```
static/tutorials/<slug>/video.webm      the recording (1920x1080, Full HD)
static/tutorials/<slug>/captions.vtt    WebVTT captions (shown by the player)
static/tutorials/<slug>/thumb.png       the intro card, used as thumbnail and poster
static/tutorials/<slug>/meta.json       title, category, summary, chapters, duration
src/data/tutorials.json                 rebuilt from every meta.json (the site reads this)
```

## Run

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/pos_saas_documentation
TUTORIAL_BASE_URL=http://127.0.0.1:8005 TUTORIAL_DB=pos_tutorials node scripts/tutorials/run.js product-overview
node scripts/tutorials/run.js all          # every script in videos/
node scripts/tutorials/index.js            # rebuild src/data/tutorials.json only
```

| Variable | Default | Meaning |
|---|---|---|
| `TUTORIAL_BASE_URL` | `http://127.0.0.1:8005` | the running app, on demo data |
| `TUTORIAL_DB` | `pos_tutorials` | database the app serves, used by `t.sql()` to reset demo state |
| `TUTORIAL_SHOP_EMAIL` / `_PASSWORD` | `rahul@freshmart.example` / `password` | the business owner |
| `TUTORIAL_ADMIN_EMAIL` / `_PASSWORD` | `admin@gmail.com` / `Admin@123` | the platform admin |
| `PLAYWRIGHT_PATH`, `CHROME_PATH`, `TUTORIAL_LOGO` | auto-detected | Playwright module, headless Chrome, intro-card logo |
| `TUTORIAL_SKIP_SQL` | unset | set when recording against a live site: `t.sql()` is skipped |

To record against a live site instead of the demo copy, set `TUTORIAL_BASE_URL`, the logins and `TUTORIAL_SKIP_SQL=1`.
Scripts that create data (sales, products) add it to whatever site they run on, so use a demo site.

## Writing a script

```js
const { CREDS } = require('../lib');

const meta = {
  slug: 'pos-terminal',               // folder name and URL: /tutorials/pos-terminal
  title: 'Sell at the POS terminal',
  category: 'selling',                // getting-started | selling | back-office | super-admin
  summary: 'One sentence shown on the card.',
  doc: '/docs/shop/selling/pos-terminal',   // written guide to link to (must exist under docs/)
  order: 10,                          // sort order: 1-9 getting-started, 10-19 selling, 20-39 back-office, 40-49 super-admin
};

async function run(t) {
  await t.intro(meta.title, 'A short subtitle');           // 3.4 s title card, also the thumbnail
  t.chapter('Sign in');                                    // marks a chapter at the current time
  await t.say('Narration shown as a caption.', () => t.login(CREDS.shop.email, CREDS.shop.password));
  // t.say(text, action): shows the caption while the action runs, then holds it long enough to read.
}
module.exports = { meta, run };
```

Helpers on `t`:

| Helper | What it does |
|---|---|
| `t.say(text, action?)` | Caption cue. Runs `action` meanwhile and keeps the cue for at least ~55 ms per character. |
| `t.chapter(title)` | Chapter marker (appears in the chapter list next to the player). |
| `t.goto(path)` | Navigate and wait for the page, tables and ajax to settle. |
| `t.click(selectorOrLocator)` | Moves the on-screen cursor there, shows a click ripple, clicks, waits to settle. |
| `t.type(selector, text)` | Click the field and type with visible keystrokes. |
| `t.highlight(selector, ms)` | Moves the cursor and draws a ring around an element. |
| `t.scroll(px, ms)` | Smooth scroll (negative scrolls up). |
| `t.openMenu(group, href)` | Opens a sidebar group (Sales, Inventory, ...) and clicks the link ending in `href`. |
| `t.login(email, password)` | Typed sign-in, then dismisses the welcome tour. |
| `t.sql(statement)` | Run SQL against `TUTORIAL_DB` before/while recording to reset demo state. |
| `t.wait(ms)`, `t.settle()`, `t.page` | Plain pauses, wait-for-load, and the raw Playwright page. |

## Style

- 60 to 150 seconds, 5 to 9 chapters. One idea per chapter. Short sentences, second person, present tense ("Click New product").
- Captions up to about 110 characters. Say what the viewer is looking at and why, not only what you click.
- Show the real thing: do the action on screen, then let the result sit for 1.5 to 2 seconds.
- Start with `t.intro`, end with a closing caption. No narration of passwords or personal data.
- Keep to what the screen shows. Do not invent features or numbers. If a screen has no data, change the story, not the app.

## Demo data

- Business owner: **FreshMart Grocers** (rahul@freshmart.example / password), currency ₹, branches Camp, Kothrud, Baner. Other staff: sneha@freshmart.example (Manager), vikram@ (Inventory Manager), anita@ (cashier). Same password.
- Platform admin: admin@gmail.com / Admin@123 (separate panel; sign in on `/login` too).
- A welcome tour appears on first sign-in; `t.login` dismisses it.
- The POS opens to an "Open Register" screen when no till session is open. Reset with
  `t.sql("UPDATE cashier_sessions SET status='closed', closed_at=NOW() WHERE status='open' AND tenant_id=1")`.
- Sidebar groups are accordions: use `t.openMenu('Inventory', '/products')`.
- Product images are generated tiles with initials.

## Check a recording

Pull frames out of the video with the ffmpeg that ships with Playwright:

```bash
FF=$(ls ~/Library/Caches/ms-playwright/ffmpeg-*/ffmpeg-mac | head -1)
$FF -v error -y -ss 20 -i static/tutorials/<slug>/video.webm -frames:v 1 /tmp/frame20.png
```

Look at 3 or 4 frames spread across the video: no error pages, no broken images, no overlay hiding the action, captions in sync.

## Narration

Spoken narration is made from the captions, then mixed into each video.

```bash
GEMINI_API_KEY=... node scripts/tutorials/narrate.js all     # clips, cached in scripts/tutorials/.narration-cache (git-ignored)
node scripts/tutorials/run.js all                             # re-record: each t.say is held for clip length + 0.35 s
node scripts/tutorials/mix.js all                             # place clips at caption starts, mux into video.webm (video copied, audio opus)
```

Clips are keyed by hash of text + voice + model, so a changed caption is the only thing re-sent. Defaults: `gemini-3.8-flash-tts`, voice `Kore`
(`NARRATE_MODEL`, `NARRATE_VOICE`), 24 kHz mono WAV. The key is read from `GEMINI_API_KEY` only and never printed or stored.
Offline test with the macOS voice: `NARRATE_PROVIDER=say`, and `TUTORIAL_OUT=/some/dir` to write somewhere other than `static/tutorials`.
Edit a caption text in `videos/*.js` and the clip is regenerated on the next `narrate.js` run, but re-record before mixing so `captions.vtt` matches.
