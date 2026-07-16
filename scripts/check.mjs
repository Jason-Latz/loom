#!/usr/bin/env node
// Loom check gate. Validates graph integrity and lesson files.
//
//   node scripts/check.mjs                       full check (graph + all lessons + manifest)
//   node scripts/check.mjs data/lessons/foo.js   graph + that single lesson file (no manifest sync)
//
// Exits 1 on any error. Warnings do not fail the gate.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ---- load data files into a sandbox ----------------------------------------
const sandbox = {};
sandbox.window = sandbox; // in a browser, window IS the global
vm.createContext(sandbox);
function load(rel) {
  const code = readFileSync(resolve(root, rel), 'utf8'); // resolve so an absolute path also works
  try {
    vm.runInContext(code, sandbox, { filename: rel });
  } catch (e) {
    err(`${rel}: failed to evaluate: ${e.message}`);
  }
}

load('data/graph-core.js');
const eraFiles = readdirSync(join(root, 'data/eras')).filter((f) => f.endsWith('.js')).sort();
for (const f of eraFiles) load(`data/eras/${f}`);

const singleLesson = process.argv[2];
let lessonFilesOnDisk = [];
if (singleLesson) {
  load(singleLesson);
} else {
  if (existsSync(join(root, 'data/lessons/_manifest.js'))) load('data/lessons/_manifest.js');
  lessonFilesOnDisk = existsSync(join(root, 'data/lessons'))
    ? readdirSync(join(root, 'data/lessons')).filter((f) => f.endsWith('.js') && f !== '_manifest.js')
    : [];
  for (const f of lessonFilesOnDisk) load(`data/lessons/${f}`);
}

const LOOM = sandbox.LOOM || sandbox.window.LOOM;
if (!LOOM || !LOOM.nodes || !LOOM.nodes.length) {
  console.error('FATAL: graph did not load');
  process.exit(1);
}

// ---- helpers ----------------------------------------------------------------
const THREADS = new Set(LOOM.threads.map((t) => t.id));
const REGIONS = new Set(LOOM.regions.map((r) => r.id));
const EDGE_TYPES = new Set(['enables', 'transforms', 'collides', 'echoes']);
const nodeIndex = new Map(LOOM.nodes.map((n, i) => [n.id, i]));
const wordCount = (s) => s.split(/\s+/).filter(Boolean).length;

function scanDashes(value, where) {
  if (typeof value === 'string') {
    if (/[—–]/.test(value)) err(`${where}: contains an em/en dash ("${value.slice(0, 60)}...")`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => scanDashes(v, `${where}[${i}]`));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) scanDashes(v, `${where}.${k}`);
  }
}

// ---- graph checks -----------------------------------------------------------
const eraNums = LOOM.eras.map((e) => e.n);
eraNums.forEach((n, i) => {
  if (n !== i + 1) err(`eras: expected era ${i + 1} at position ${i}, found ${n}`);
});

const seen = new Set();
let lastEra = 0;
let edgeCount = 0;
for (const n of LOOM.nodes) {
  const w = `node ${n.id}`;
  if (seen.has(n.id)) err(`${w}: duplicate id`);
  seen.add(n.id);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(n.id)) err(`${w}: id not kebab-case`);
  if (!LOOM.eras.find((e) => e.n === n.era)) err(`${w}: unknown era ${n.era}`);
  if (n.era < lastEra) err(`${w}: nodes must be listed grouped by ascending era`);
  lastEra = n.era;
  if (!REGIONS.has(n.region)) err(`${w}: unknown region ${n.region}`);
  if (typeof n.x !== 'number' || n.x < 0 || n.x > 100) err(`${w}: x must be 0-100`);
  if (typeof n.sort !== 'number') err(`${w}: sort must be a number`);
  if (!n.title || !n.date || !n.hook || !n.summary) err(`${w}: missing title/date/hook/summary`);
  if (!Array.isArray(n.threads) || !n.threads.length) err(`${w}: needs at least one thread`);
  else for (const t of n.threads) if (!THREADS.has(t)) err(`${w}: unknown thread ${t}`);
  const sw = n.summary ? wordCount(n.summary) : 0;
  if (sw < 25 || sw > 95) warn(`${w}: summary is ${sw} words (aim 40-80)`);
  const edges = n.edges || [];
  edgeCount += edges.length;
  if (!edges.length && nodeIndex.get(n.id) !== LOOM.nodes.length - 1) warn(`${w}: no outgoing wires`);
  for (const e of edges) {
    if (!nodeIndex.has(e.to)) err(`${w}: edge to unknown node "${e.to}"`);
    else if (e.to === n.id) err(`${w}: edge to itself`);
    else if (nodeIndex.get(e.to) <= nodeIndex.get(n.id)) err(`${w}: edge to "${e.to}" points backward in the sequence`);
    if (!EDGE_TYPES.has(e.type)) err(`${w}: unknown edge type "${e.type}"`);
    if (!e.why || wordCount(e.why) < 4) err(`${w}: edge to "${e.to}" needs a real why`);
  }
  scanDashes(n, w);
}

// ---- lesson checks ----------------------------------------------------------
const QUESTION_TYPES = new Set(['recall', 'why', 'callback']);
const lessonIds = Object.keys(LOOM.lessons);
for (const id of lessonIds) {
  const l = LOOM.lessons[id];
  const w = `lesson ${id}`;
  if (!nodeIndex.has(id)) {
    err(`${w}: no node with this id in the graph`);
    continue;
  }
  const myIndex = nodeIndex.get(id);
  if (!Array.isArray(l.story) || l.story.length < 4) err(`${w}: story must be an array of 4+ paragraphs`);
  if (!l.storyContext) err(`${w}: missing storyContext line`);
  if (!Array.isArray(l.significance) || l.significance.length < 3) err(`${w}: significance must be an array of 3+ paragraphs`);
  if (!Array.isArray(l.threadsOut) || l.threadsOut.length < 2) err(`${w}: threadsOut must list 2+ connections`);
  else
    for (const t of l.threadsOut) {
      if (!nodeIndex.has(t.to)) err(`${w}: threadsOut points to unknown node "${t.to}"`);
      if (!t.why || wordCount(t.why) < 6) err(`${w}: threadsOut to "${t.to}" needs a substantial why`);
    }
  if (!Array.isArray(l.questions) || l.questions.length < 4) err(`${w}: needs 4+ questions`);
  else
    for (const [qi, q] of l.questions.entries()) {
      if (!QUESTION_TYPES.has(q.type)) err(`${w}: question ${qi + 1} has unknown type "${q.type}"`);
      if (!q.prompt || !q.answer) err(`${w}: question ${qi + 1} missing prompt or answer`);
      if (q.type === 'callback') {
        if (!q.callbackTo) err(`${w}: callback question ${qi + 1} missing callbackTo`);
        else if (!nodeIndex.has(q.callbackTo)) err(`${w}: callback to unknown node "${q.callbackTo}"`);
        else if (nodeIndex.get(q.callbackTo) >= myIndex) err(`${w}: callback must reach an EARLIER node, "${q.callbackTo}" is not`);
      }
    }
  if (!Array.isArray(l.deeper) || l.deeper.length < 2) err(`${w}: deeper must list 2+ follow-ups`);
  // Forge agents have twice written a whole lesson with every apostrophe stripped
  // (dodging the single-quoted JS string delimiter), yielding "the men shoulders"
  // and "Aya girlhood". The gate cannot read English, but a lesson of this length
  // with no apostrophe anywhere has only ever meant that bug.
  const prose = (l.story || []).concat(l.significance || []).join(' ');
  if (prose.length > 400 && !/['’]/.test(prose)) {
    err(`${w}: prose contains no apostrophe at all, which means the possessives were stripped (look for "the men shoulders", "Aya girlhood")`);
  }

  const words = (l.story || []).concat(l.significance || []).map(wordCount).reduce((a, b) => a + b, 0);
  if (words < 1100 || words > 2900) err(`${w}: prose is ${words} words (hard bounds 1100-2900)`);
  else if (words < 1400 || words > 2400) warn(`${w}: prose is ${words} words (aim 1500-2200)`);
  scanDashes(l, w);
}

// ---- manifest + index.html sync (full mode only) ----------------------------
if (!singleLesson) {
  const manifest = LOOM.lessonFiles || [];
  const onDisk = lessonFilesOnDisk.map((f) => basename(f, '.js'));
  for (const m of manifest) if (!onDisk.includes(m)) err(`manifest lists "${m}" but data/lessons/${m}.js not found`);
  for (const d of onDisk) if (!manifest.includes(d)) err(`data/lessons/${d}.js exists but is not in _manifest.js`);
  for (const m of manifest) if (!LOOM.lessons[m]) err(`manifest lists "${m}" but no lesson registered under that id`);

  const indexPath = join(root, 'index.html');
  if (existsSync(indexPath)) {
    const html = readFileSync(indexPath, 'utf8');
    for (const f of eraFiles) if (!html.includes(`data/eras/${f}`)) err(`index.html missing script tag for data/eras/${f}`);
    if (existsSync(join(root, 'data/worldmap.js')) && !html.includes('data/worldmap.js')) {
      err('index.html missing script tag for data/worldmap.js, so the chart would silently lose its world');
    }
  } else {
    warn('index.html not present yet');
  }
}

// ---- report -----------------------------------------------------------------
const readable = `${LOOM.nodes.length} nodes, ${edgeCount} wires, ${LOOM.eras.length} eras, ${lessonIds.length} lessons`;
for (const m of warnings) console.log(`  warn  ${m}`);
for (const m of errors) console.log(`  ERROR ${m}`);
console.log(errors.length ? `FAIL: ${errors.length} error(s), ${warnings.length} warning(s). ${readable}` : `OK: ${readable}. ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
