/*
 * Makes the spoken clips for the tutorial captions.
 *
 *   GEMINI_API_KEY=... node scripts/tutorials/narrate.js all           every video
 *   GEMINI_API_KEY=... node scripts/tutorials/narrate.js pos-terminal  one or more slugs
 *   NARRATE_PROVIDER=say node scripts/tutorials/narrate.js pos-terminal   offline test with the macOS voice
 *
 * Reads static/tutorials/<slug>/captions.vtt, sends each caption to Gemini text-to-speech and caches the
 * 24 kHz mono WAV by hash of text + voice + model, so a second run only asks for new or changed text.
 * The key is read from the environment only and is never printed, logged or written.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const N = require('./narration');

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/interactions';
const GAP_MS = Number(process.env.NARRATE_GAP_MS || 2500);   // minimum time between requests
const TRIES = 8;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const key = process.env.GEMINI_API_KEY || '';
const scrub = (s) => (key ? String(s).split(key).join('[key]') : String(s));

async function gemini(text, s) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: s.model,
      input: [{ type: 'user_input', content: [{ type: 'text', text }] }],
      response_format: { type: 'audio', mime_type: 'audio/wav', sample_rate: N.RATE },
      generation_config: { speech_config: [{ voice: s.voice }] },
    }),
  });
  if (!res.ok) {
    const err = new Error(`Gemini ${res.status}: ${scrub(await res.text().catch(() => '')).slice(0, 300)}`);
    err.status = res.status;
    err.retryAfter = Number(res.headers.get('retry-after')) || 0;
    throw err;
  }
  const body = await res.json();
  const parts = (body.steps || []).filter((st) => st.type === 'model_output').flatMap((st) => st.content || []).filter((c) => c.type === 'audio' && c.data);
  if (!parts.length) throw Object.assign(new Error('Gemini returned no audio'), { status: 502 });

  return Buffer.from(parts[parts.length - 1].data, 'base64');
}

function say(text, s) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'narrate-'));
  try {
    const aiff = path.join(tmp, 'clip.aiff');
    execFileSync('say', ['-v', s.voice, '-o', aiff, '--', text]);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', aiff, '-ar', String(N.RATE), '-ac', '1', '-c:a', 'pcm_s16le', path.join(tmp, 'clip.wav')]);

    return fs.readFileSync(path.join(tmp, 'clip.wav'));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

let last = 0;
async function synth(text, s) {
  for (let attempt = 1; ; attempt++) {
    const wait = last + GAP_MS - Date.now();
    if (wait > 0) await sleep(wait);
    last = Date.now();
    try {
      return s.provider === 'say' ? say(text, s) : await gemini(text, s);
    } catch (error) {
      const daily = /per day/i.test(error.message);   // a daily quota will not clear by waiting a minute
      if (daily) throw new Error(`Daily quota reached, stopping. ${scrub(error.message).slice(0, 300)}`);
      const retryable = !error.status || error.status === 429 || error.status >= 500;
      if (!retryable || attempt >= TRIES) throw error;
      const delay = Math.max(error.retryAfter * 1000, Math.min(60000, 4000 * 2 ** (attempt - 1))) + Math.random() * 1000;
      console.log(`  retry ${attempt}/${TRIES - 1} in ${Math.round(delay / 1000)}s (${scrub(error.message).slice(0, 400)})`);
      await sleep(delay);
    }
  }
}

(async () => {
  const s = N.settings();
  if (s.provider === 'gemini' && !key) {
    console.error('Set GEMINI_API_KEY in the environment: GEMINI_API_KEY=... node scripts/tutorials/narrate.js all');
    process.exit(1);
  }
  const wanted = process.argv.slice(2);
  const all = N.slugs();
  const picked = wanted.length === 0 || wanted[0] === 'all' ? all : all.filter((d) => wanted.includes(d));
  if (!picked.length) { console.error(`Nothing matches. Available: ${all.join(', ')}`); process.exit(1); }

  fs.mkdirSync(N.CACHE, { recursive: true });
  const texts = [...new Set(picked.flatMap((d) => N.parseVtt(path.join(N.OUT, d, 'captions.vtt')).map((c) => c.text)))];
  const todo = texts.filter((x) => !fs.existsSync(N.clipPath(x, s)));
  console.log(`${s.provider} ${s.model} / ${s.voice}: ${texts.length} captions in ${picked.length} videos, ${texts.length - todo.length} cached, ${todo.length} to make`);

  let done = 0;
  const failed = [];
  for (const text of todo) {
    try {
      let wav = await synth(text, s);
      wav = N.wavFile(N.wavData(wav));   // normalise the header
      fs.writeFileSync(`${N.clipPath(text, s)}.part`, wav);
      fs.renameSync(`${N.clipPath(text, s)}.part`, N.clipPath(text, s));
      done++;
      console.log(`[${done}/${todo.length}] ${(wav.length / 48000).toFixed(1)}s  ${text.slice(0, 70)}`);
    } catch (error) {
      failed.push(text);
      console.error(`FAILED: ${text.slice(0, 70)}\n  ${scrub(error.message)}`);
      if (/^Daily quota/.test(error.message)) break;
    }
  }
  console.log(failed.length ? `Done with ${failed.length} failed. Run the same command again to retry only those.` : 'All clips ready.');
  process.exit(failed.length ? 1 : 0);
})().catch((error) => { console.error(scrub(error.stack || error)); process.exit(1); });
