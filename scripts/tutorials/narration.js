/*
 * Shared narration settings: which voice/model, where clips are cached, and how to read them.
 * Used by narrate.js (makes clips), lib.js (recorder holds each caption for the clip length) and mix.js.
 *
 *   NARRATE_PROVIDER   gemini (default) | say   (say = macOS voice, offline stand-in for testing)
 *   NARRATE_MODEL      gemini-3.8-flash-tts (default) | gemini-3.8-flash-lite-tts
 *   NARRATE_VOICE      Kore (default); for say: Samantha
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = process.env.TUTORIAL_OUT || path.join(ROOT, 'static', 'tutorials');
const CACHE = process.env.NARRATE_CACHE || path.join(__dirname, '.narration-cache');
const RATE = 24000;

function settings() {
  const provider = process.env.NARRATE_PROVIDER || 'gemini';
  if (provider === 'say') return { provider, model: 'say', voice: process.env.NARRATE_VOICE || 'Samantha' };

  return { provider, model: process.env.NARRATE_MODEL || 'gemini-3.8-flash-tts', voice: process.env.NARRATE_VOICE || 'Kore' };
}

function clipPath(text, s = settings()) {
  const hash = crypto.createHash('sha256').update(`${text}\n${s.voice}\n${s.model}`).digest('hex').slice(0, 32);

  return path.join(CACHE, `${hash}.wav`);
}

// Locate the PCM data of a 16-bit mono WAV (skips any extra chunks before "data").
function wavData(buf) {
  if (buf.length < 44 || buf.toString('ascii', 0, 4) !== 'RIFF') throw new Error('not a WAV file');
  let p = 12;
  while (p + 8 <= buf.length) {
    const id = buf.toString('ascii', p, p + 4);
    const size = buf.readUInt32LE(p + 4);
    if (id === 'data') return buf.subarray(p + 8, Math.min(buf.length, p + 8 + size));
    p += 8 + size + (size % 2);
  }
  throw new Error('WAV has no data chunk');
}

function wavFile(pcm) {
  const head = Buffer.alloc(44);
  head.write('RIFF', 0); head.writeUInt32LE(36 + pcm.length, 4); head.write('WAVEfmt ', 8);
  head.writeUInt32LE(16, 16); head.writeUInt16LE(1, 20); head.writeUInt16LE(1, 22);
  head.writeUInt32LE(RATE, 24); head.writeUInt32LE(RATE * 2, 28); head.writeUInt16LE(2, 32); head.writeUInt16LE(16, 34);
  head.write('data', 36); head.writeUInt32LE(pcm.length, 40);

  return Buffer.concat([head, pcm]);
}

// Clip length in seconds, or null when there is no cached clip for this text.
function clipSeconds(text) {
  const file = clipPath(text);
  if (!fs.existsSync(file)) return null;

  return wavData(fs.readFileSync(file)).length / (RATE * 2);
}

function parseVtt(file) {
  const cues = [];
  const toSec = (s) => { const [h, m, x] = s.split(':'); return +h * 3600 + +m * 60 + parseFloat(x); };
  for (const block of fs.readFileSync(file, 'utf8').split(/\r?\n\r?\n/)) {
    const lines = block.split(/\r?\n/).filter(Boolean);
    const i = lines.findIndex((l) => l.includes('-->'));
    if (i < 0) continue;
    const [a, b] = lines[i].split('-->').map((s) => s.trim());
    cues.push({ start: toSec(a), end: toSec(b), text: lines.slice(i + 1).join(' ').replace(/&lt;/g, '<').replace(/&amp;/g, '&') });
  }

  return cues;
}

function slugs() {
  return fs.existsSync(OUT) ? fs.readdirSync(OUT).filter((d) => fs.existsSync(path.join(OUT, d, 'captions.vtt'))).sort() : [];
}

module.exports = { ROOT, OUT, CACHE, RATE, settings, clipPath, clipSeconds, wavData, wavFile, parseVtt, slugs };
