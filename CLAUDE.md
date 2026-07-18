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
- Deploy: `vercel --prod --yes` (project `loom`, linked; static, no build step).
  Live at https://loom-gray.vercel.app. There is no git remote, so deploys are
  manual: **forging a lesson does not publish it until you redeploy.**
  `.vercelignore` keeps `.claude`, `.agents`, scripts, docs, `CLAUDE.md`, and
  `AGENTS.md` out of the published site.

## Architecture

- `index.html` — shell; loads all data via plain script tags (no modules, no fetch, so file:// works).
- `styles.css` — the whole design system. Parchment/ink + 4 pigment thread colors as CSS vars; `body.lamplight` flips to night palette.
- `data/graph-core.js` — LOOM registry: threads, regions (map meridians), era/node/lesson tables.
- `data/worldmap.js` — Natural Earth 110m land as one SVG path (public domain), equirectangular 2000x1000. Rendered as the map bands that bookend the chart.
- `data/eras/01..10-*.js` — the graph. Nodes carry id/title/date/sort/region/x/threads/hook/summary/edges. Node array order per era = reading order = main sequence. Edges point FORWARD in that sequence only.
- `data/lessons/<id>.js` — one written lesson per file; `_manifest.js` lists which exist (js/boot.js loads them, then starts the app).
- `js/map.js` — SVG chart: time rises bottom→top, era bands, region meridians, bezier wires colored by source node's first thread, pan/zoom, focus/dim, filters, path highlighting, and the two world-map bands.
- `js/reader.js` — dossier panel + lesson reading room + questions UI.
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
- Include authoritative citations or direct links wherever the lesson format
  can present them tastefully.
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
  the gate passed green.
- **Browser QA: the preview tab reports `visibilityState: hidden` and never
  fires requestAnimationFrame**, so pan/zoom animations appear to do nothing
  when driven from javascript_tool. Take a screenshot to wake the tab, or assert
  on `LOOM.map.bands()` math instead of the viewBox. The pane also caches JS
  hard; refetch with `{cache:'reload'}` after editing, or you will QA stale code.

## State (2026-07-18, after the 365 expansion)

- Graph expanded to its final size: 365 nodes (one per day of a year), 799
  wires, 10 eras, gate green with zero warnings. The 236 new seeds emphasize
  philosophy anchored to readable primary texts, trade/money/technology, and
  deliberate depth for Africa, the Americas, Oceania, and Southeast and
  Central Asia; no military spine. Rationales, reading anchors, and 147
  designer/verifier flags: docs/graph-expansion-365.md. Codex's adversarial
  audit of the new seeds is the pending morning task.
- Eras I through III are fully written: 34 lessons, all adversarially reviewed.
- The nine Era IV lessons are WRITTEN by Fable per docs/fable-era-iv-handoff.md:
  each drafted, source-verified, literarily revised, adversarially reviewed by
  a fresh agent, and green on its single-file check with zero warnings. They
  sit unmanifested and uncommitted in data/lessons/ awaiting Codex's release
  review; the completion report is docs/era-iv-completion-report.md.
- check.mjs now derives each lesson's required callback count from earlier
  WRITTEN lessons (manifest-aware), not raw node index, since unwritten seeds
  now precede the first written lessons.
- Paths, both world-map bands, mobile reading layouts, and real pinch zoom are
  built. Production is https://loom-gray.vercel.app (not yet redeployed with
  the 365 graph).
- Next: Codex adversarially audits the 236 new seeds (docs/graph-expansion-365.md),
  reviews and manifests the nine Era IV lessons, commits them, and redeploys.

## Change log

- **2026-07-18 (evening):** The 365 expansion. Designed, adversarially
  verified, and integrated 236 new seed nodes (129 → 365, one per day of a
  year) across all ten eras as pure insertions, per Jason's chosen emphases:
  philosophy with primary-text reading anchors, trade/money/technology, and
  underrepresented regions as a priority. Made the gate's callback-count rule
  manifest-aware. Wrote all nine Era IV lessons per the handoff (Fable agents
  only): source-verified, literarily revised, adversarially reviewed (two
  factual blockers caught and fixed), single-file checks green; files left
  unmanifested for Codex's release review. Audit dossier:
  docs/graph-expansion-365.md; completion report:
  docs/era-iv-completion-report.md.
- **2026-07-18:** Audited and corrected Era IV graph architecture, relocated
  two chronologically misplaced nodes, prepared the source-backed Fable writing
  handoff, and recorded the Fable/Codex division of responsibility.
- **2026-07-17:** Era III completed. Forged and adversarially audited all 13
  lessons, with 39 clickable authoritative source links across the era.
- **2026-07-17** — Era II completed and adversarially audited, with the release
  gate made strict. Added the mobile layout and real pinch zoom.
- **2026-07-16** — Era I finished and hardened. Forged the last 3 lessons, then
  ran an adversarial verify pass over all 8: fixed a Blombos engraved-vs-drawn
  conflation, an inverted claim about the deepest human-ancestry splits, a
  Sulawesi dating superseded in 2024, and a false "final node" claim. Two agents
  had stripped every apostrophe from their lessons ("the men shoulders") and the
  gate passed them, so the gate now fails apostrophe-less prose. Also fixed the
  reader calling a jump back to lesson one the "next" lesson, and a zero-height
  container permanently poisoning the chart viewBox with Infinity/NaN.
- **2026-07-15** — Born: graph (120 nodes/10 eras), parchment atlas app
  (map/dossier/reader/progress/lamplight), check gate, forge spec + skill,
  Era I lessons (exemplar by Fable, rest by Opus agents under the spec).
