#!/usr/bin/env node
// Loom check gate. Validates graph integrity and lesson files.
//
//   node scripts/check.mjs                       full check (graph + all lessons + manifest)
//   node scripts/check.mjs data/lessons/foo.js   graph + that single lesson file (no manifest sync)
//
// Exits 1 on any error or warning. A release gate is only green at zero of both.

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
if (existsSync(join(root, 'data/lessons/_manifest.js'))) load('data/lessons/_manifest.js');
if (singleLesson) {
  load(singleLesson);
} else {
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

// Citation markers are a structured token, not prose: [^source-key] sits inline
// in story/significance immediately after the punctuation of the clause it
// supports. Strip them before ANY prose measurement or the word band silently
// shifts under every lesson that gains citations.
const MARKER_SRC = '\\[\\^([a-z0-9]+(?:-[a-z0-9]+)*)\\]';
const stripMarkers = (s) => (typeof s === 'string' ? s.replace(new RegExp(MARKER_SRC, 'g'), '') : s);
const SOURCE_KINDS = new Set(['paper', 'primary', 'book', 'institution', 'object', 'dataset']);
const ACCESS = new Set(['open', 'paywalled']);

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
  if (!Number.isInteger(l.readingMinutes) || l.readingMinutes < 9 || l.readingMinutes > 11) {
    err(`${w}: readingMinutes must be an honest integer from 9 to 11`);
  }
  if (!Array.isArray(l.story) || l.story.length < 5 || l.story.length > 8) {
    err(`${w}: story must contain 5-8 paragraphs`);
  }
  if (!l.storyContext) err(`${w}: missing storyContext line`);
  if (!Array.isArray(l.significance) || l.significance.length < 4 || l.significance.length > 6) {
    err(`${w}: significance must contain 4-6 paragraphs`);
  }
  if (!Array.isArray(l.threadsOut) || l.threadsOut.length < 3 || l.threadsOut.length > 5) {
    err(`${w}: threadsOut must list 3-5 connections`);
  }
  else
    for (const t of l.threadsOut) {
      if (!nodeIndex.has(t.to)) err(`${w}: threadsOut points to unknown node "${t.to}"`);
      if (!t.why || wordCount(t.why) < 6) err(`${w}: threadsOut to "${t.to}" needs a substantial why`);
    }
  if (!Array.isArray(l.questions) || l.questions.length !== 5) err(`${w}: needs exactly 5 questions`);
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
  if (Array.isArray(l.questions) && l.questions.length === 5) {
    const typeCounts = l.questions.reduce((counts, q) => {
      counts[q.type] = (counts[q.type] || 0) + 1;
      return counts;
    }, {});
    // Callbacks can only reach earlier WRITTEN lessons, so the required count
    // follows the manifest, not the raw node index: unwritten seeds inserted
    // before a written lesson must not demand callbacks that cannot exist yet.
    const earlierWritten = (LOOM.lessonFiles || []).filter((m) => nodeIndex.get(m) < myIndex).length;
    const expectedCallbacks = LOOM.lessonFiles ? Math.min(2, earlierWritten) : myIndex === 0 ? 0 : myIndex === 1 ? 1 : 2;
    const expectedWhys = 4 - expectedCallbacks;
    if ((typeCounts.recall || 0) !== 1 || (typeCounts.why || 0) !== expectedWhys ||
        (typeCounts.callback || 0) !== expectedCallbacks) {
      err(`${w}: question mix must be 1 recall, ${expectedWhys} why, ${expectedCallbacks} callback`);
    }
  }
  if (!Array.isArray(l.deeper) || l.deeper.length !== 3) err(`${w}: deeper must list exactly 3 follow-ups`);
  else
    for (const [di, d] of l.deeper.entries()) {
      if (typeof d === 'string') continue;
      if (!d || typeof d !== 'object' || typeof d.title !== 'string' || wordCount(d.title) < 2 ||
          typeof d.why !== 'string' || wordCount(d.why) < 5) {
        err(`${w}: deeper item ${di + 1} must be a string or an object with substantial title and why fields`);
        continue;
      }
      try {
        const u = new URL(d.url);
        if (u.protocol !== 'https:') throw new Error('not https');
      } catch {
        err(`${w}: deeper item ${di + 1} must use a valid https URL`);
      }
    }
  // Forge agents have twice written a whole lesson with every apostrophe stripped
  // (dodging the single-quoted JS string delimiter), yielding "the men shoulders"
  // and "Aya girlhood". The gate cannot read English, but a lesson of this length
  // with no apostrophe anywhere has only ever meant that bug.
  const proseParts = (l.story || []).concat(l.significance || [])
    .filter((p) => typeof p === 'string')
    .map(stripMarkers);
  const prose = proseParts.join(' ');
  if (prose.length > 400 && !/['’]/.test(prose)) {
    err(`${w}: prose contains no apostrophe at all, which means the possessives were stripped (look for "the men shoulders", "Aya girlhood")`);
  }

  const words = proseParts.map(wordCount).reduce((a, b) => a + b, 0);
  if (words < 1100 || words > 2900) err(`${w}: prose is ${words} words (hard bounds 1100-2900)`);
  else if (words < 1500 || words > 2200) warn(`${w}: prose is ${words} words (aim 1500-2200)`);

  // ---- citations ------------------------------------------------------------
  // The gate cannot tell whether a source supports the sentence it is attached
  // to. It can guarantee that every marker resolves, that every declared source
  // is actually used, and that nothing is a bare URL pretending to be a citation.
  const marks = [];
  for (const [section, paras] of [['story', l.story], ['significance', l.significance]]) {
    if (!Array.isArray(paras)) continue;
    paras.forEach((p, pi) => {
      if (typeof p !== 'string') return;
      const here = new Set();
      for (const m of p.matchAll(new RegExp(MARKER_SRC, 'g'))) {
        marks.push({ key: m[1], where: `${section}[${pi}]` });
        if (here.has(m[1])) err(`${w}: source "${m[1]}" is cited twice in the same paragraph (${section}[${pi}])`);
        here.add(m[1]);
      }
    });
  }

  // Citations are mandatory. Every written lesson carries them as of the
  // 2026-08-01 pass, so a new lesson without them is an omission, not a choice.
  if (!Array.isArray(l.sources) || !marks.length) {
    err(`${w}: every lesson must carry citations (citationsVersion, a sources array, and [^key] markers in the prose)`);
  } else {
    if (l.citationsVersion !== 1) err(`${w}: citationsVersion must be 1 when a lesson carries citations`);
    if (!Array.isArray(l.sources) || l.sources.length < 4 || l.sources.length > 16) {
      err(`${w}: sources must be an array of 4 to 16 entries`);
    }
    const keys = new Set();
    for (const [i, s] of (Array.isArray(l.sources) ? l.sources : []).entries()) {
      const sw = `${w}: source ${i + 1}`;
      if (!s || typeof s !== 'object') { err(`${sw} must be an object`); continue; }
      if (typeof s.key !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.key)) err(`${sw} key must be kebab-case`);
      else if (keys.has(s.key)) err(`${sw} duplicate key "${s.key}"`);
      else keys.add(s.key);
      if (typeof s.cite !== 'string' || wordCount(s.cite) < 3) err(`${sw} needs a human-readable cite (author, venue, year), not a bare URL`);
      if (typeof s.note !== 'string' || wordCount(s.note) < 5) err(`${sw} needs a note saying what it establishes`);
      try {
        const u = new URL(s.url);
        if (u.protocol !== 'https:') throw new Error('not https');
      } catch {
        err(`${sw} must use a valid https URL`);
      }
      if (s.kind !== undefined && !SOURCE_KINDS.has(s.kind)) err(`${sw} unknown kind "${s.kind}"`);
      if (s.access !== undefined && !ACCESS.has(s.access)) err(`${sw} access must be "open" or "paywalled"`);
      if (s.doi !== undefined && !/^10\.\d{4,9}\/\S+$/.test(s.doi)) err(`${sw} doi "${s.doi}" is not a bare DOI (expected 10.xxxx/...)`);
    }
    const cited = new Set(marks.map((m) => m.key));
    for (const m of marks) if (!keys.has(m.key)) err(`${w}: marker [^${m.key}] in ${m.where} has no declared source`);
    for (const k of keys) if (!cited.has(k)) err(`${w}: source "${k}" is declared but never cited in the prose; an uncited source belongs in deeper`);
    if (marks.length < 5 || marks.length > 16) err(`${w}: ${marks.length} citation markers in the prose (5 to 16 required, aim 6 to 12)`);
  }

  scanDashes(l, w);
}

// ---- manifest + index.html sync (full mode only) ----------------------------
if (!singleLesson) {
  const manifest = LOOM.lessonFiles || [];
  const onDisk = lessonFilesOnDisk.map((f) => basename(f, '.js'));
  if (new Set(manifest).size !== manifest.length) err('manifest contains duplicate lesson ids');
  for (const m of manifest) if (!onDisk.includes(m)) err(`manifest lists "${m}" but data/lessons/${m}.js not found`);
  for (const d of onDisk) if (!manifest.includes(d)) err(`data/lessons/${d}.js exists but is not in _manifest.js`);
  for (const m of manifest) if (!LOOM.lessons[m]) err(`manifest lists "${m}" but no lesson registered under that id`);
  for (const m of manifest) {
    const lesson = LOOM.lessons[m];
    if (!lesson || !Array.isArray(lesson.questions)) continue;
    for (const q of lesson.questions) {
      if (q.type === 'callback' && q.callbackTo && !manifest.includes(q.callbackTo)) {
        err(`lesson ${m}: callback target "${q.callbackTo}" has no written lesson in the manifest`);
      }
    }
  }
  for (let i = 1; i < manifest.length; i++) {
    if (nodeIndex.get(manifest[i - 1]) > nodeIndex.get(manifest[i])) {
      err(`manifest is out of main-sequence order at "${manifest[i - 1]}" then "${manifest[i]}"`);
    }
  }

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
const failed = errors.length || warnings.length;
console.log(failed ? `FAIL: ${errors.length} error(s), ${warnings.length} warning(s). ${readable}` : `OK: ${readable}. 0 warning(s).`);
process.exit(failed ? 1 : 0);
