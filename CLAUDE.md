# CLAUDE.md — Loom

A cartographer's atlas of world history: a 365-node knowledge graph (10 eras,
dawn of humanity to now, one node per day of a year) rendered as a parchment
chart, where each node opens a ~10-minute lesson (story → significance →
connections → questions with callbacks to earlier nodes). Static site, zero
dependencies, works from `file://`. Jason reads it; agents forge lessons into it.

## Commands

- Run: `python3 -m http.server 4173` (or `.claude/launch.json` → server "loom"),
  then http://localhost:4173. Opening `index.html` directly also works.
- Gate (must pass before any commit): `node scripts/check.mjs`, or
  `node scripts/check.mjs data/lessons/<id>.js` for one lesson.
- Link health (hits the network, so pre-release rather than pre-commit):
  `node scripts/check-links.mjs [<id> ...]`
- **Deploy: push to `main`.** The Vercel project `loom` is connected to
  https://github.com/Jason-Latz/loom with `main` as production, so a push
  publishes; `vercel --prod --yes` still works out of band. Live at
  https://loomhistory.com and https://loom-gray.vercel.app. `.vercelignore`
  keeps `.claude`, `.agents`, scripts, docs, `assets` and the markdown out.
- Analytics: two deferred script tags at the foot of `index.html`, from the
  site's own origin. Speed Insights is live. **Web Analytics still needs its
  one-click Enable in the Vercel dashboard** (project `loom`, Analytics tab),
  which no CLI or API can do; until then `/_vercel/insights/script.js` 404s and
  nothing is recorded. Both 404 on localhost and `file://`, the only local
  console noise.

## Architecture

- `index.html` — shell; loads all data via plain script tags (no modules, no fetch, so file:// works).
- `styles.css` — the whole design system. Parchment/ink + 4 pigment thread colors as CSS vars; `body.lamplight` flips to night palette.
- `data/graph-core.js` — LOOM registry: threads, regions (map meridians), era/node/lesson tables.
- `data/worldmap.js` — Natural Earth 110m land as one SVG path (public domain), equirectangular 2000x1000, drawn as the map bands that bookend the chart.
- `data/eras/01..10-*.js` — the graph. Nodes carry id/title/date/sort/region/x/threads/hook/summary/edges. Node array order per era = reading order = main sequence. Edges point FORWARD in that sequence only.
- `data/lessons/<id>.js` — one written lesson per file; `_manifest.js` lists which exist (js/boot.js starts the app, then streams them in; nodes light up as files register).
- `js/map.js` — SVG chart: time rises bottom→top, era bands, region meridians, bezier wires colored by source node's first thread, pan/zoom, focus/dim, filters, path highlighting, and the two world-map bands.
- `js/reader.js` — dossier panel + lesson reading room + questions UI + the citation apparatus (marker splitting, the evidence switch, the sources cartouche).
- `js/paths.js` — the other traversals: thread paths (one pigment end to end) and roots paths (walk backward from the present). Always a subset of the real graph.
- `js/app.js` — localStorage state (`loom.v1`), header controls, search, intro. `docs/forge-spec.md` is the binding style contract for lesson prose, and `.claude/skills/forge-lesson/` the skill that writes new lessons ("forge <node-id>").

## Conventions

- Lessons are forged per `docs/forge-spec.md`. **Generative stages** (research,
  draft, literary revision, fixes, polish) and **adversarial ones** (factual,
  citation and craft review, verify) must never share an agent, and preferably
  not a model: the critic being a different model from the creator is the point
  of the split. Fable writes and Opus reviews whenever Fable is available; see
  State for the current assignment and its compensation. The orchestrator owns
  graph architecture, manifest, commits and deployment.
- Trust the writer to research and correct lesson facts. Briefs are scaffolding,
  not a cage: a brief that turns out wrong should be corrected in the lesson,
  and if the era file is what is wrong, fix that too and commit it separately.
- Before calling figures or events contemporaneous, calculate and compare their dates explicitly rather than inferring from an era label.
- Treat Loom as artwork: prioritize beautiful, engaging prose, elegant pedagogy
  and aesthetic coherence over merely correct coverage. Jason likes the chart's
  parchment-atlas look and its dense woven topology; preserve that character.
- Prefer cost-conscious Terra or Luna subagents for separable engineering and
  review subtasks; keep architecture and final verification centralized.
- Each era should improve on the prose before it. Give every lesson a dedicated
  revision pass for clarity, concrete image and restraint; accuracy is the floor.
- Mobile and interaction foundations are reliable; content quality is the main problem, so resist feature creep.
- **Every lesson carries per-claim citations.** `citationsVersion: 1`, a
  `sources` array, and `[^source-key]` markers after the punctuation of the
  clause they support (aim 6 to 12; the gate allows 5 to 16). Markers stay
  hidden until the reader presses "Show the evidence", so the apparatus costs
  the reading nothing. Full contract in `docs/forge-spec.md`.
- **A citation is only real once you have opened it.** Resolve DOI metadata at
  `https://api.crossref.org/works/<doi>` before naming authors, venue, volume or
  pages, and fetch the URL to confirm it hosts what the cite claims. A live
  authoritative paper attached to a sentence it does not support passes the gate
  and is worse than no citation. Six solid beat twelve with one invented. Before
  release, sweep links and re-audit overrules: a third-party pass over rejected
  citation findings once found 25 of 94 rejections wrong.
- No em/en dashes anywhere in content or UI copy (Jason's rule; check enforces).
- Node ids are kebab-case and permanent (lessons, edges and progress key on
  them). Adding a node: insert at the right chronological array position with
  2-3 forward edges carrying real "why" text.
- Small, narrowly-scoped commits; gate green before each. **Stage explicit
  paths, never `git commit -a`**: the tree often holds someone else’s work, and
  a push to `main` publishes it.

## Gotchas

- Plain script tags + globals everywhere; no build step, keep it that way.
- SVG pointer capture retargets pointerup to the svg; node clicks are resolved
  from the element captured at pointerdown (js/map.js). Don't "simplify" that.
- `[hidden] { display:none !important }` exists because overlays set their own
  display; keep it. Screenshot QA: the intro overlay shows on first visit only,
  so clear `loom.v1` to reproduce first-run.
- **The gate cannot read English.** It checks structure, not truth or grammar,
  so every batch needs an adversarial reviewer too; that pass has caught
  superseded datings and confidently-wrong claims the gate passed green. This
  goes double for citations: the gate proves a marker resolves and a URL parses,
  never that the paper supports the sentence.
- **Citation markers must never change the prose.** They are stripped before
  every measurement in the gate. When bulk-adding them, prove it: strip them from
  the edited file and diff the prose against git HEAD. Anything but byte-identical
  is a bug in the tooling, not the writing.
- **When a long run dies, harvest it; do not resume it.** Deaths leave finished
  drafts and completed reviews on disk: read `journal.jsonl`, find the stage each
  lesson reached, and launch a tail scoped to the rest. Identify recovered results
  by content, not id (reviews name other nodes). Findings are too big for `args`,
  so embed them in the generated script and parse-check with `new Function`, since
  `node --check` silently passes a quote bug. A stage that died mid-edit leaves an
  unknown partial file: tell the next agent to re-check every finding against it.
- **A fix agent given ~30 findings dies mid-response.** The prompt is not the
  problem, the reply is. Chunk the fix stage into passes of about 8 findings and
  demand a compact report (2026-08-11, twice, before chunking).
- **Subagents do NOT inherit the session model.** Omitting `model` on a Workflow
  `agent()` call resolves to Opus. Pin every stage explicitly, then verify from
  the transcripts (`grep '"model"' <transcriptDir>/agent-*.jsonl`), not from the
  meta file alone: a `fallbackModel` chain can reroute a stage mid-run.
- **Browser QA: the preview tab reports `visibilityState: hidden` and never
  fires requestAnimationFrame**, so pan/zoom animations appear to do nothing
  when driven from javascript_tool. Take a screenshot to wake the tab, or assert
  on `LOOM.map.bands()` math instead of the viewBox. The pane also caches JS
  hard; refetch with `{cache:'reload'}` after editing, or you will QA stale code.

## State (2026-08-12, Era III complete)

- **116 lessons, every one with per-claim citations**: 1,298 sources and 1,630
  markers. Gate: `OK: 365 nodes, 802 wires, 10 eras, 116 lessons. 0 warning(s).`
- **Eras I, II and III are complete** (20/20, 32/32, 34/34). Read
  `docs/era-iii-forge-run.md` before charting a new era: model contract, batch
  grouping, and the operational lessons that cost the most to learn. Era II's
  spec is `docs/era-ii-forge-run.md`.
- **Fable 5 hit its usage limit during Era III** and Jason moved the run to Opus
  5, so author and critic became the same model. The compensation is **two
  independent reviewers per lesson with different lenses** (sources, facts and
  dates; craft, pedagogy and graph truth), each in a fresh context. Keep both
  lenses; restore `model: 'fable'` on prose stages when Fable is available.
- **Keep the prose clean** (Jason, 2026-08-11). He rejected the dense literary
  register by name: fragment chains, stacked metaphor, aphoristic poses, objects
  granted intentions. The rule is in `docs/forge-spec.md` and overrides the
  exemplar where they conflict. It is not a licence to go flat: an audit of four
  Era III lessons scored all 5 of 5 on specificity, the thing it must not cost.
- **Keep the polish stage, for notes rather than length:** it applies the
  verifier's leftovers, often real citation and craft fixes.
- **Word bands widened 2026-08-06** (Jason: lessons may run a little longer).
  Story 600 to 1,000 and View from Above 600 to 1,250 are shape guidance: the
  **combined 1,500 to 2,200 total is the sole binding constraint**, being what
  the gate measures and what protects the ten minute promise. Never compress a
  section doing real work while the total sits comfortably in band.
- The evidence switch persists in `loom.v1`, and `scripts/check.mjs` REQUIRES
  citations, so a new lesson cannot ship without them.
- `node scripts/check-links.mjs` sweeps every citation, DOI and further-reading
  URL. **Read its output, do not act on it**: past sweeps called live links dead
  over transient errors and bot walls that open fine for a human (Era III's
  release sweep reported 19 dead, then 8, and all 8 proved live or blocked).
  Confirm in a real browser before touching a link.
- Remaining unwritten: 249 seeds (IV 9/34, V 13/38, VI 8/40, VII to X
  untouched). Graph is at its final size. `AGENTS.md` points here, not a copy.

## Change log

- **2026-08-12:** Era III completed, the third fully charted era. All 21 lessons
  forged: seven singly, then concurrent batches at Jason's request. Fable's
  usage limit moved the run to Opus mid-flight, answered with two diverse
  reviewers per lesson instead of one. **Six graph corrections came out of the
  research**, each committed apart from its lesson: the Upanishadic node sat in
  a village when these texts are staged in royal courts; Nineveh credited the
  fire with preserving tablets that Robson says burial saved, and its 30,000 are
  the whole excavated heap, not a library; the star diaries ran nearly six
  centuries, not seven, with no prices at the start; the Analects reached Korea,
  Japan and Vietnam with Zhu Xi, not across two millennia; Nok iron starts in
  the seventh century BCE, not the fifth; the drums were cast in pieced moulds,
  not one pour. Two more were declined: the file was loose there, not wrong.
- **2026-08-06:** Era II completed, the second fully charted era. All 19
  lessons forged in three sequential batches, integrating each before launching
  the next so callbacks could reach the new lessons and a dead run cost at most
  one batch. Nineteen gate-green commits, 339-URL sweep, 0 dead. **Six graph
  corrections came out of the research** and were committed apart from the
  lessons, because the forge agents kept finding the era file wrong (Papuan
  ancestry overstated in Remote Oceania; traction, wool and wagons bundled when
  only wagons cluster; Poverty Point's imports a thousand miles, not seven
  hundred). **When a lesson and its node summary disagree, the lesson usually
  wins**, so check the era file against the finished prose before shipping.
- **2026-08-05:** Era VI opened: eight lessons (Cluny to Cairo), 111-URL sweep
  clean. The run outlived a usage limit and a 529 wave; resume caching re-ran
  finished stages, so trust the journal, not the cache.
- **2026-08-01:** The citation pass. All 68 lessons gained per-claim citations
  (826 sources, 964 markers) behind a reader-controlled evidence switch, in
  three stages each: research, an independent refutation, an adjudication. 84
  prose corrections landed where lessons claimed more than their evidence
  carried. The gate now requires citations.
- **2026-07-29:** Era I completed (20/20). The verify pass caught what the gate
  cannot: a fabricated stance attributed to a living scholar, a geographic
  falsehood, a false causal bridge, an arithmetic error both reviews missed.
  Report: `docs/era-i-completion-report.md`.
- **2026-07-26:** Era V released (thirteen lessons, 37 blockers), the site moved to loomhistory.com, and a mobile pass landed.
- **2026-07-18 to 21:** The 365 expansion. 236 seed nodes designed and
  adversarially verified as pure insertions, more than a hundred nodes
  corrected, 800 forward wires, all nine Era IV lessons written. Dossiers:
  `docs/graph-expansion-365.md`, `docs/era-iv-completion-report.md`.
- **2026-07-15 to 17:** Born: graph, parchment atlas app, check gate, forge
  spec and skill, Era I lessons. Two agents stripped every apostrophe from their
  lessons ("the men shoulders") and the gate passed them, so it now fails
  apostrophe-less prose.
