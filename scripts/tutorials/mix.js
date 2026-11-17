/*
 * Builds the narration track for a recorded video and muxes it into video.webm.
 *
 *   node scripts/tutorials/mix.js all
 *   node scripts/tutorials/mix.js pos-terminal
 *
 * Each clip from narrate.js is placed at its caption's start time (captions.vtt), the track is padded to the
 * video length and muxed with ffmpeg: video copied, audio encoded as opus. captions.vtt is left alone.
 * Safe to run again: any audio already in video.webm is replaced.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const N = require('./narration');

function duration(file) {
  return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
}

function mix(slug) {
  const dir = path.join(N.OUT, slug);
  const video = path.join(dir, 'video.webm');
  const cues = N.parseVtt(path.join(dir, 'captions.vtt'));
  const total = duration(video);
  const pcm = Buffer.alloc(Math.ceil(total * N.RATE) * 2);
  const missing = [];
  let late = 0;

  for (const cue of cues) {
    const file = N.clipPath(cue.text);
    if (!fs.existsSync(file)) { missing.push(cue.text); continue; }
    const clip = N.wavData(fs.readFileSync(file));
    const at = Math.round(cue.start * N.RATE) * 2;
    if (at + clip.length > pcm.length) late++;
    clip.copy(pcm, at, 0, Math.min(clip.length, Math.max(0, pcm.length - at)));
  }
  if (missing.length) throw new Error(`${slug}: ${missing.length} captions have no clip (run narrate.js first), e.g. "${missing[0].slice(0, 60)}"`);

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mix-'));
  try {
    const track = path.join(tmp, 'narration.wav');
    const out = path.join(tmp, 'video.webm');
    fs.writeFileSync(track, N.wavFile(pcm));
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', video, '-i', track, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy', '-c:a', 'libopus', '-b:a', '48k', '-ar', '48000', '-shortest', out]);
    fs.copyFileSync(out, video);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  console.log(`${slug}: ${cues.length} clips mixed${late ? `, ${late} run past the end` : ''}, ${(fs.statSync(video).size / 1048576).toFixed(1)} MB`);
}

const wanted = process.argv.slice(2);
const all = N.slugs();
const picked = wanted.length === 0 || wanted[0] === 'all' ? all : all.filter((d) => wanted.includes(d));
if (!picked.length) { console.error(`Nothing matches. Available: ${all.join(', ')}`); process.exit(1); }
let failed = 0;
for (const slug of picked) {
  try { mix(slug); } catch (error) { failed++; console.error(error.message); }
}
process.exit(failed ? 1 : 0);
