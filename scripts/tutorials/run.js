const fs = require('fs');
const path = require('path');
const { record } = require('./lib');

const dir = path.join(__dirname, 'videos');
const wanted = process.argv.slice(2);
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
const picked = wanted.length === 0 || wanted[0] === 'all' ? files : files.filter((f) => wanted.some((w) => f.includes(w)));

(async () => {
  if (picked.length === 0) {
    console.error(`Nothing matches ${wanted.join(', ')}. Available: ${files.map((f) => f.replace('.js', '')).join(', ')}`);
    process.exit(1);
  }
  for (const file of picked) {
    const { meta, run } = require(path.join(dir, file));
    await record(meta, run);
  }
})().catch((error) => { console.error(error); process.exit(1); });
