const { rebuildIndex } = require('./lib');

const list = rebuildIndex();
console.log(`${list.length} tutorials indexed: ${list.map((t) => t.slug).join(', ')}`);
