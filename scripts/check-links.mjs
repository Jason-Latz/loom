#!/usr/bin/env node
// Link health for every citation and further-reading URL in the atlas.
//
//   node scripts/check-links.mjs            every lesson
//   node scripts/check-links.mjs <id> ...   only these lessons
//
// Deliberately NOT part of scripts/check.mjs: that gate must stay offline and
// instant. This one hits the network, so run it before a release and whenever
// a batch of citations lands. It proves a URL resolves. It cannot prove the
// page says what the lesson claims; only a reader can do that.

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const only = new Set(process.argv.slice(2));

const sandbox = {};
sandbox.window = sandbox;
vm.createContext(sandbox);
const load = (rel) => vm.runInContext(readFileSync(join(root, rel), 'utf8'), sandbox, { filename: rel });

load('data/graph-core.js');
for (const f of readdirSync(join(root, 'data/eras')).filter((f) => f.endsWith('.js')).sort()) load(`data/eras/${f}`);
for (const f of readdirSync(join(root, 'data/lessons')).filter((f) => f.endsWith('.js') && f !== '_manifest.js')) {
  load(`data/lessons/${f}`);
}
const LOOM = sandbox.LOOM;

const targets = [];
for (const [id, l] of Object.entries(LOOM.lessons)) {
  if (only.size && !only.has(id)) continue;
  for (const s of l.sources || []) targets.push({ id, where: `source ${s.key}`, url: s.url });
  for (const s of l.sources || []) if (s.doi) targets.push({ id, where: `doi ${s.key}`, url: `https://doi.org/${s.doi}` });
  for (const [i, d] of (l.deeper || []).entries()) if (d && d.url) targets.push({ id, where: `deeper ${i + 1}`, url: d.url });
}

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 30000);
      const r = await fetch(url, { method, redirect: 'follow', signal: c.signal, headers: { 'user-agent': UA } });
      clearTimeout(t);
      if (r.ok) return { ok: true, status: r.status };
      // plenty of publishers refuse HEAD but answer GET
      if (method === 'HEAD') continue;
      return { ok: false, status: r.status };
    } catch (e) {
      if (method === 'GET') return { ok: false, status: e.name === 'AbortError' ? 'timeout' : 'network' };
    }
  }
  return { ok: false, status: 'unknown' };
}

// A few at a time: hammering a publisher is how you earn a 403 that is about
// you rather than about the link.
const CONCURRENCY = 6;
const bad = [];
let done = 0;
const queue = targets.slice();
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const t = queue.shift();
    const r = await probe(t.url);
    done++;
    if (!r.ok) bad.push({ ...t, status: r.status });
    if (done % 25 === 0) process.stderr.write(`  ${done}/${targets.length}\n`);
  }
}));

// 403 is usually a bot wall rather than a dead link, so it is reported apart
// from the failures that actually need fixing.
const walls = bad.filter((b) => b.status === 403 || b.status === 401);
const dead = bad.filter((b) => !walls.includes(b));

for (const b of dead) console.log(`  DEAD  ${b.id} · ${b.where} · ${b.status} · ${b.url}`);
for (const b of walls) console.log(`  wall  ${b.id} · ${b.where} · ${b.status} · ${b.url}`);
console.log(`\n${targets.length} URLs checked, ${dead.length} dead, ${walls.length} bot-walled (open those in a browser before assuming they are broken).`);
process.exit(dead.length ? 1 : 0);
