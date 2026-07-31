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
- Deploy: `vercel --prod --yes` (project `loom`, linked; static, no build step).
  Live at https://loomhistory.com (custom domain, Vercel-managed DNS, added
  2026-07-26) and https://loom-gray.vercel.app. There is no git remote, so
  deploys are manual: **forging a lesson does not publish it until you
  redeploy.**
  `.vercelignore` keeps `.claude`, `.agents`, scripts, docs, `CLAUDE.md`, and
  `AGENTS.md` out of the published site.

## Architecture

- `index.html` — shell; loads all data via plain script tags (no modules, no fetch, so file:// works).
- `styles.css` — the whole design system. Parchment/ink + 4 pigment thread colors as CSS vars; `body.lamplight` flips to night palette.
- `data/graph-core.js` — LOOM registry: threads, regions (map meridians), era/node/lesson tables.
- `data/worldmap.js` — Natural Earth 110m land as one SVG path (public domain), equirectangular 2000x1000. Rendered as the map bands that bookend the chart.
- `data/eras/01..10-*.js` — the graph. Nodes carry id/title/date/sort/region/x/threads/hook/summary/edges. Node array order per era = reading order = main sequence. Edges point FORWARD in that sequence only.
- `data/lessons/<id>.js` — one written lesson per file; `_manifest.js` lists which exist (js/boot.js starts the app, then streams them in; nodes light up as files register).
- `js/map.js` — SVG chart: time rises bottom→top, era bands, region meridians, bezier wires colored by source node's first thread, pan/zoom, focus/dim, filters, path highlighting, and the two world-map bands.
- `js/reader.js` — dossier panel + lesson reading room + questions UI + the
  citation apparatus (marker splitting, the evidence switch, the sources
  cartouche).
- `js/paths.js` — the other traversals: thread paths (one pigment end to end) and roots paths (walk backward from a feature of the present). Always a subset of the real graph.
- `js/app.js` — localStorage state (`loom.v1`), header controls, search, intro.
- `docs/forge-spec.md` — binding style contract for lesson prose.
- `.claude/skills/forge-lesson/` — the skill that writes new lessons ("forge <node-id>").

## Conventions

- Lessons are forged per `docs/forge-spec.md`; Fable owns lesson prose and
  substantive literary revision, while Codex owns graph architecture, research,
  adversarial review, validation, manifest updates, commits, and deployment.
- Before describing historical figures or events as contemporaneous, calculate
  and compare their dates explicitly rather than inferring from an era label.
- Before naming a scholarly paper's authors in lesson prose, resolve its DOI
  metadata or publisher record; do not rely on search snippets or carried notes.
- Jason prefers Fable for Loom lesson prose and substantive literary revision.
  Do not assign those passes to Codex or Sol unless Jason explicitly changes
  that choice; prepare a precise research and architecture handoff for Fable.
- Fable owns every generative forge stage (research, draft, revision, fixes);
  Opus owns only the adversarial stages (factual review, craft review, verify),
  so the critic is never the same model as the creator.
- Trust Fable to research and correct lesson facts when needed. Treat Codex
  briefs as scaffolding rather than a cage, then adversarially review Fable's
  finished work before release.
- Treat Loom as artwork: prioritize beautiful, engaging prose, elegant
  pedagogy, and aesthetic coherence over merely correct coverage.
- Jason wants each new era to improve on the prose before it. Give every lesson
  a dedicated literary revision for cadence, concrete image, restraint,
  sentence music, and structural unity; accuracy and clarity are only the floor.
- Mobile and interaction foundations are reliable. Resist feature creep and
  treat content quality as the main problem now.
- **Every lesson carries per-claim citations.** `citationsVersion: 1`, a
  `sources` array, and 6 to 12 `[^source-key]` markers inline in the prose,
  immediately after the punctuation of the clause they support. Markers are
  hidden until the reader presses "Show the evidence", and the numbered Sources
  cartouche at the foot of the lesson is always visible, so the apparatus costs
  the reading nothing. Full contract in `docs/forge-spec.md`.
- **A citation is only real once you have opened it.** Resolve DOI metadata at
  `https://api.crossref.org/works/<doi>` before naming authors, venue, volume or
  pages, and fetch the URL to confirm it hosts what the cite claims. A live
  authoritative paper attached to a sentence it does not support passes the gate
  and is worse than no citation at all. Six solid citations beat twelve with one
  invented.
- No em/en dashes anywhere in content or UI copy (Jason's rule; check enforces).
- Node ids are kebab-case and permanent (lessons, edges, and progress key on them).
- Adding a node: insert in era file at the right array position (chronological),
  give 2-3 forward edges with real "why" text, run the gate.
- Small, narrowly-scoped commits; gate must be green before each.

## Gotchas

- Plain script tags + globals everywhere; no build step, keep it that way.
- SVG pointer capture retargets pointerup to the svg; node clicks are resolved
  from the element captured at pointerdown (js/map.js). Don't "simplify" that.
- `[hidden] { display:none !important }` exists because overlays set their own
  display; keep it when adding overlays.
- Screenshot QA: intro overlay shows on first visit only (localStorage), clear
  `loom.v1` to reproduce first-run.
- **The gate cannot read English.** It checks structure, not truth or grammar.
  Every batch of forged lessons needs an adversarial reviewer agent too; that
  pass has caught a superseded dating and several confidently-wrong claims that
  the gate passed green. This goes double for citations: the gate proves a
  marker resolves and a URL parses, never that the paper supports the sentence.
- **Citation markers must never change the prose.** They are stripped before
  every measurement in the gate. When bulk-adding them, prove it: strip the
  markers from the edited file and diff the prose against git HEAD. Anything
  other than byte-identical is a bug in the tooling, not in the writing.
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

## State (2026-07-29, after the Era I completion)

- **Era I is the first fully charted era: 20/20 nodes written.** 68 lessons total
  across the atlas. Gate: `OK: 365 nodes, 800 wires, 10 eras, 68 lessons. 0 warning(s).`
- Twelve Era I lessons forged through the full six-stage pipeline (research,
  draft, literary revision, dual adversarial review, fix, verify), plus ten
  sourced graph-data corrections and two retrofitted predecessor lessons.
  Report: `docs/era-i-completion-report.md`; briefs: `docs/era-i-briefs/`;
  correction dossier: `docs/era-i-graph-corrections.md`.
- **Inserting lessons early in the sequence retroactively changes what the gate
  demands of later ones**, since the callback count derives from earlier WRITTEN
  lessons. `spark-of-mind` and `great-dispersal` both had to gain callbacks.
  Integrate in main-sequence order, and commit any closed callback chain
  atomically (Era I's indices 0 to 5 are only green together).
- Graph is at its final size: 365 nodes (one per day of a year), 800 wires, 10
  eras. All 236 expansion seeds were adversarially audited; rationales and the
  release audit are in `docs/graph-expansion-365.md`.
- Remaining unwritten: Era II 19, Era III 21, Era IV 25, Era V 25. Eras VI to X
  are entirely unwritten seeds. Earlier era reports and briefs:
  `docs/era-iv-*`, `docs/era-v-*`.
- check.mjs derives each lesson's required callback count from earlier WRITTEN
  lessons (manifest-aware), not raw node index, since unwritten seeds precede
  the first written lessons.
- Production is https://loomhistory.com (custom domain, Vercel-managed DNS)
  and https://loom-gray.vercel.app. Deploys are manual: forging a lesson does
  not publish it until you redeploy.
- Next: forge Era II through the same pipeline and gate.

## Change log

- **2026-07-29:** Era I completed, the first fully charted era (20/20). Twelve
  lessons forged on Fable through research, draft, dedicated literary revision,
  two independent Opus reviews, fix, and an Opus verification gate that loops
  back on rejection. The verify pass caught what the check gate cannot: a
  fabricated stance attributed to a living scholar, a geographic falsehood in a
  climactic sentence, a false causal bridge, an overstated count a reviewer had
  already cleared on a bad check, and an arithmetic error both reviews missed by
  checking two dates separately. Ten graph-data defects corrected against fetched
  primary sources (fallow to red deer antlers, unpierced Qafzeh shells, the Qesem
  hearth's two use cycles, carved not drilled flute holes, needles that do not
  create fitted clothing, a puppy that was no hunting partner, a disputed
  Xianrendong date, superseded Omo Kibish arithmetic, a missing ideas thread), and
  two reviewer claims refuted rather than applied. `spark-of-mind` and
  `great-dispersal` retrofitted with real callbacks now that lessons precede them.
  Report: `docs/era-i-completion-report.md`.
- **2026-07-26 (later):** Mobile optimization pass, cross-model reviewed. Node
  tap targets now hold a fingertip-sized screen radius at any zoom (--hit-r
  geometry property driven from map.js apply()); boot streams lesson files in
  after the app starts so the chart is interactive immediately, with the open
  dossier re-rendered as files register; fixed the header flex squeeze that
  crushed search to 31px between 900 and 1400 px (the "narrow dropdown" bug);
  iOS fixes (16px search font against focus zoom, dvh bottom sheets,
  viewport-fit=cover with safe-area insets); coarse-pointer size bumps for
  rail, chips, zoom, and results; theme-color synced to lamplight; touch-aware
  intro copy; reduced-motion support without strobing the next-node halo.
- **2026-07-26:** Era V released and the site moved to loomhistory.com. All
  thirteen core lessons of The Believing World forged in one pipeline: Opus
  research briefs with fetched-and-verified sources, graph corrections landed
  first (salt/gold flow inversion, Talas papermaker legend, Ibn al-Haytham's
  Cairo, Wari/Tiwanaku vs Cahokia chronology), Fable drafts plus dedicated
  literary revision, two independent Opus reviews per lesson (37 blockers,
  107 majors, 144 minors raised), Fable fixes re-verified finding by finding,
  thirteen gate-green commits, browser QA local and live, production deploy
  with the loomhistory.com domain attached.
- **2026-07-21:** Adversarially audited all 236 expansion seeds, correcting
  more than one hundred nodes across all ten eras and bringing the graph to 800
  forward wires. Independently reviewed Fable's nine Era IV lessons, integrated
  each in its own gate-green commit, and deployed 365 nodes and 43 lessons to
  production. Local and live browser QA passed at desktop, 390 px, and 320 px.
- **2026-07-18 (evening):** The 365 expansion. Designed, adversarially verified
  and integrated 236 seed nodes (129 to 365) across all ten eras as pure
  insertions, per Jason's emphases: philosophy with primary-text anchors,
  trade/money/technology, underrepresented regions. Made the callback-count rule
  manifest-aware. Wrote all nine Era IV lessons. Dossier:
  `docs/graph-expansion-365.md`; report: `docs/era-iv-completion-report.md`.
- **2026-07-18:** Audited and corrected Era IV graph architecture, and recorded
  the Fable/Codex division of responsibility.
- **2026-07-17:** Eras II and III completed and adversarially audited. Release
  gate made strict; mobile layout and real pinch zoom added.
- **2026-07-16:** Era I finished and hardened. An adversarial verify pass fixed
  a Blombos conflation, an inverted ancestry-split claim, a Sulawesi dating
  superseded in 2024, and a false "final node" claim. Two agents had stripped
  every apostrophe from their lessons ("the men shoulders") and the gate passed
  them, so the gate now fails apostrophe-less prose.
- **2026-07-15** — Born: graph (120 nodes/10 eras), parchment atlas app
  (map/dossier/reader/progress/lamplight), check gate, forge spec + skill,
  Era I lessons (exemplar by Fable, rest by Opus agents under the spec).
