# CLAUDE.md — Loom

A cartographer's atlas of world history: a 365-node knowledge graph (10 eras,
dawn of humanity to now, one node per day of a year) rendered as a parchment
chart, where each node opens a ~10-minute lesson (story → significance →
connections → questions with callbacks to earlier nodes). Static site, zero
dependencies, works from `file://`. Jason reads it; Fable and Codex forge new
lessons into it.

## Commands

- Run: `python3 -m http.server 4173` (or `.claude/launch.json` → server "loom"),
  then http://localhost:4173. Opening `index.html` directly also works.
- Gate (must pass before any commit): `node scripts/check.mjs`
- Single lesson check: `node scripts/check.mjs data/lessons/<id>.js`
- Link health (hits the network, so pre-release rather than pre-commit):
  `node scripts/check-links.mjs [<id> ...]`
- **Deploy: push to `main`.** Since 2026-08-06 the Vercel project `loom` is
  connected to https://github.com/Jason-Latz/loom with `main` as the production
  branch, so a push publishes. `vercel --prod --yes` still works for an
  out-of-band deploy. Live at https://loomhistory.com (custom domain,
  Vercel-managed DNS, added 2026-07-26) and https://loom-gray.vercel.app.
  `.vercelignore` keeps `.claude`, `.agents`, scripts, docs, `assets`,
  `README.md`, `CLAUDE.md`, and `AGENTS.md` out of the published site.
- Analytics: two deferred script tags at the foot of `index.html`, served from
  the site's own origin so no third party is contacted. Speed Insights is live.
  **Web Analytics still needs its one-click Enable in the Vercel dashboard**
  (project `loom`, Analytics tab); until then `/_vercel/insights/script.js`
  returns 404 and no page views are recorded. There is no CLI or API route to
  enable it. Both 404 on localhost and `file://`, the only console noise local.

## Architecture

- `index.html` — shell; loads all data via plain script tags (no modules, no fetch, so file:// works).
- `styles.css` — the whole design system. Parchment/ink + 4 pigment thread colors as CSS vars; `body.lamplight` flips to night palette.
- `data/graph-core.js` — LOOM registry: threads, regions (map meridians), era/node/lesson tables.
- `data/worldmap.js` — Natural Earth 110m land as one SVG path (public domain), equirectangular 2000x1000. Rendered as the map bands that bookend the chart.
- `data/eras/01..10-*.js` — the graph. Nodes carry id/title/date/sort/region/x/threads/hook/summary/edges. Node array order per era = reading order = main sequence. Edges point FORWARD in that sequence only.
- `data/lessons/<id>.js` — one written lesson per file; `_manifest.js` lists which exist (js/boot.js starts the app, then streams them in; nodes light up as files register).
- `js/map.js` — SVG chart: time rises bottom→top, era bands, region meridians, bezier wires colored by source node's first thread, pan/zoom, focus/dim, filters, path highlighting, and the two world-map bands.
- `js/reader.js` — dossier panel + lesson reading room + questions UI + the citation apparatus (marker splitting, the evidence switch, the sources cartouche).
- `js/paths.js` — the other traversals: thread paths (one pigment end to end) and roots paths (walk backward from a feature of the present). Always a subset of the real graph.
- `js/app.js` — localStorage state (`loom.v1`), header controls, search, intro.
- `docs/forge-spec.md` — binding style contract for lesson prose.
- `.claude/skills/forge-lesson/` — the skill that writes new lessons ("forge <node-id>").

## Conventions

- Lessons are forged per `docs/forge-spec.md`. **Fable owns every generative
  stage** (research, draft, literary revision, fixes, polish); **Opus owns only
  the adversarial ones** (factual review, citation review, craft review,
  verify), so the critic is never the same model as the creator. Do not
  reassign prose to Opus or Sol unless Jason says so. The orchestrator owns
  graph architecture, manifest, commits and deployment.
- Trust Fable to research and correct lesson facts. Briefs are scaffolding, not
  a cage: a brief that turns out wrong should be corrected in the lesson, and
  if the era file is what is wrong, fix that too and commit it separately.
- Before calling figures or events contemporaneous, calculate and compare their
  dates explicitly rather than inferring from an era label.
- Treat Loom as artwork: prioritize beautiful, engaging prose, elegant
  pedagogy, and aesthetic coherence over merely correct coverage.
- Jason likes the chart's current parchment-atlas aesthetic and its dense woven
  topology. Navigation or overview work should preserve that character while
  reducing scroll and making the whole graph legible without extreme zoom.
- For separable engineering and review subtasks, Jason prefers cost-conscious
  Terra or Luna subagents when available. Keep core architecture and final
  verification centralized so this never lowers quality; lesson model ownership
  remains governed by the forge rules above.
- Jason wants each new era to improve on the prose before it. Give every lesson
  a dedicated literary revision for cadence, concrete image, restraint,
  sentence music, and structural unity; accuracy and clarity are only the floor.
- Mobile and interaction foundations are reliable; content quality is the main
  problem now, so resist feature creep.
- **Every lesson carries per-claim citations.** `citationsVersion: 1`, a
  `sources` array, and `[^source-key]` markers after the punctuation of the
  clause they support (aim 6 to 12; the gate allows 5 to 16 and the corpus
  median is 14). Markers stay hidden until the reader presses "Show the
  evidence" and the Sources cartouche is always visible, so the apparatus costs
  the reading nothing. Full contract in `docs/forge-spec.md`.
- **A citation is only real once you have opened it.** Resolve DOI metadata at
  `https://api.crossref.org/works/<doi>` before naming authors, venue, volume
  or pages, and fetch the URL to confirm it hosts what the cite claims. A live
  authoritative paper attached to a sentence it does not support passes the
  gate and is worse than no citation. Six solid beat twelve with one invented.
  Before a release, sweep the links and re-audit the overrules: a third-party
  pass over rejected citation findings once found 25 of 94 rejections wrong.
- No em/en dashes anywhere in content or UI copy (Jason's rule; check enforces).
- Node ids are kebab-case and permanent (lessons, edges and progress key on
  them). Adding a node: insert in the era file at the right array position
  (chronological) with 2-3 forward edges carrying real "why" text.
- Small, narrowly-scoped commits; gate must be green before each.

## Gotchas

- Plain script tags + globals everywhere; no build step, keep it that way.
- SVG pointer capture retargets pointerup to the svg; node clicks are resolved
  from the element captured at pointerdown (js/map.js). Don't "simplify" that.
- `[hidden] { display:none !important }` exists because overlays set their own
  display; keep it. Screenshot QA: the intro overlay shows on first visit only,
  so clear `loom.v1` to reproduce first-run.
- **The gate cannot read English.** It checks structure, not truth or grammar.
  Every batch of forged lessons needs an adversarial reviewer agent too; that
  pass has caught a superseded dating and several confidently-wrong claims that
  the gate passed green. This goes double for citations: the gate proves a
  marker resolves and a URL parses, never that the paper supports the sentence.
- **Citation markers must never change the prose.** They are stripped before
  every measurement in the gate. When bulk-adding them, prove it: strip the
  markers from the edited file and diff the prose against git HEAD. Anything
  other than byte-identical is a bug in the tooling, not in the writing.
- **When a long run dies, harvest it; do not resume it.** Deaths leave finished
  drafts on disk: read `journal.jsonl`, find the stage each lesson reached, and
  launch a tail scoped to the rest. Identify recovered results by content, not
  id (reviews name other nodes). Findings are too big for `args`, so embed them
  in the generated script and parse-check it with `new Function`, since
  `node --check` silently passes a script with a quote bug.
- **Subagents do NOT inherit Fable.** Omitting `model` on a Workflow `agent()`
  call resolves to Opus, not the Fable session model; only an explicit
  `model: 'fable'` gives Fable (verified by probe, 2026-07-28). Pin it on every
  prose stage, then confirm with `cat <transcriptDir>/agent-*.meta.json` before
  letting a long forge run proceed.
- **Browser QA: the preview tab reports `visibilityState: hidden` and never
  fires requestAnimationFrame**, so pan/zoom animations appear to do nothing
  when driven from javascript_tool. Take a screenshot to wake the tab, or assert
  on `LOOM.map.bands()` math instead of the viewBox. The pane also caches JS
  hard; refetch with `{cache:'reload'}` after editing, or you will QA stale code.

## State (2026-08-06, after Era II was completed)

- **95 lessons written, every one with per-claim citations**: 1,074 sources and
  1,312 markers across the atlas. Gate:
  `OK: 365 nodes, 802 wires, 10 eras, 95 lessons. 0 warning(s).`
- **Eras I and II are complete** (20/20 and 32/32). Era II's 19 lessons were
  forged in one session, in three sequential batches, by the usual pipeline
  plus a sixth **polish** stage. Run spec: `docs/era-ii-forge-run.md`.
- **Keep the polish stage, but for notes rather than length.** It exists to
  apply the verifier's leftover findings, which are often real citation and
  craft fixes. Give it those notes, not just a word count.
- **Word bands widened 2026-08-06** (Jason: lessons may run a little longer).
  Story 600 to 1,000, View from Above 600 to 1,250, and these are shape
  guidance only: the **combined 1,500 to 2,200 total is the sole binding
  constraint**, since it is what the gate measures and what protects the ten
  minute promise. Never compress a section doing real work while the total sits
  comfortably in band. Era II shipped under the old numbers and stays as is.
- The evidence switch persists in `loom.v1`; raised markers are gilt
  superscripts with a gloss beneath the paragraph. `scripts/check.mjs` REQUIRES
  citations, so a new lesson cannot ship without them. Design study:
  `docs/citation-options.html`.
- `node scripts/check-links.mjs` sweeps every citation, DOI and further-reading
  URL. **Read its output, do not act on it**: past sweeps called live links
  dead over transient errors and publisher bot walls that open fine for a
  human. Confirm in a real browser before touching a link.
- Remaining unwritten: 270 seeds. Eras I and II are complete; Eras III to V
  hold 71 (III 13/34, IV 9/34, V 13/38), and Eras VI to X hold 199 (VI 8/40,
  VII to X untouched). Graph is at its final size.
- `AGENTS.md` is a pointer to this file rather than a copy, because the copy
  drifted.

## Change log

- **2026-08-06:** Era II completed, the second fully charted era. All 19
  lessons forged in three sequential batches (7, 6, 6), integrating each before
  launching the next so callbacks could reach the new lessons and a dead run
  cost at most one batch. Nineteen gate-green commits, 339-URL sweep, 0 dead.
  **Six graph corrections came out of the research** and were committed apart
  from the lessons, because the forge agents kept finding the era file wrong:
  the Austronesian summary claimed genomes show mixing "at every step" when
  Skoglund shows Remote Oceania's first settlers carried almost no Papuan
  ancestry; the secondary-products summary bundled traction, wool and wagons
  into one repertoire when only wagons cluster; Poverty Point's imports come a
  thousand miles, not seven hundred. Two new edges took the graph to 802 wires.
  Next time: **when a lesson and its node summary disagree, the lesson usually
  wins**, so check the era file against the finished prose before shipping.
- **2026-08-05:** Era VI opened: eight lessons (Cluny to Cairo) by the same
  pipeline, eight gate-green commits, 111-URL sweep clean. The run outlived a
  usage limit and a 529 wave; resume caching re-ran finished stages, so trust
  the journal, not the cache.
- **2026-08-01:** The citation pass. All 68 lessons gained per-claim citations
  (826 sources, 964 markers) behind a reader-controlled evidence switch. Three
  stages each: Opus research, an independent Opus refutation, a Fable
  adjudication. 84 prose corrections landed where lessons claimed more than
  their evidence carried. The gate now requires citations.
- **2026-07-29:** Era I completed, the first fully charted era (20/20). Twelve
  lessons forged on Fable through research, draft, dedicated literary revision,
  two independent Opus reviews, fix, and an Opus verification gate. The verify
  pass caught what the check gate cannot: a fabricated stance attributed to a
  living scholar, a geographic falsehood, a false causal bridge, and an
  arithmetic error both reviews missed. Ten graph-data defects corrected against
  fetched primary sources. Report: `docs/era-i-completion-report.md`.
- **2026-07-26:** Era V released (thirteen lessons, 37 blockers raised across
  two independent Opus reviews each) and the site moved to loomhistory.com.
  Same day, a cross-model-reviewed mobile pass: fingertip tap targets at any
  zoom (--hit-r), lessons streamed in after boot, iOS viewport fixes,
  coarse-pointer sizing, lamplight theme-color, reduced motion.
- **2026-07-18 to 21:** The 365 expansion. Designed and adversarially verified
  236 seed nodes across all ten eras as pure insertions (philosophy with
  primary-text anchors, trade/money/technology, underrepresented regions),
  corrected more than a hundred nodes, reached 800 forward wires, made the
  callback-count rule manifest-aware, and wrote all nine Era IV lessons.
  Dossiers: `docs/graph-expansion-365.md`, `docs/era-iv-completion-report.md`.
- **2026-07-16 to 17:** Era I lessons hardened; Era II and III **graph data**
  audited (not their lessons, which came later). Release gate made strict,
  pinch zoom added. An adversarial pass fixed a Blombos conflation, an inverted
  ancestry-split claim, and a Sulawesi dating superseded in 2024. Two agents
  had stripped every apostrophe from their lessons ("the men shoulders") and
  the gate passed them, so the gate now fails apostrophe-less prose.
- **2026-07-15:** Born: graph (120 nodes/10 eras), parchment atlas app
  (map/dossier/reader/progress/lamplight), check gate, forge spec + skill,
  Era I lessons (exemplar by Fable, rest by Opus agents under the spec).
