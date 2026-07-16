# CLAUDE.md — Loom

A cartographer's atlas of world history: a 120-node knowledge graph (10 eras,
dawn of humanity to now) rendered as a parchment chart, where each node opens
a ~10-minute lesson (story → significance → connections → questions with
callbacks to earlier nodes). Static site, zero dependencies, works from
`file://`. Jason reads it; Claude forges new lessons into it.

## Commands

- Run: `python3 -m http.server 4173` (or `.claude/launch.json` → server "loom"),
  then http://localhost:4173. Opening `index.html` directly also works.
- Gate (must pass before any commit): `node scripts/check.mjs`
- Single lesson check: `node scripts/check.mjs data/lessons/<id>.js`
- Deploy: `vercel --prod --yes` (project `loom`, linked; static, no build step).
  Live at https://loom-gray.vercel.app. There is no git remote, so deploys are
  manual: **forging a lesson does not publish it until you redeploy.**
  `.vercelignore` keeps scripts/docs/CLAUDE.md out of the published site.

## Architecture

- `index.html` — shell; loads all data via plain script tags (no modules, no fetch, so file:// works).
- `styles.css` — the whole design system. Parchment/ink + 4 pigment thread colors as CSS vars; `body.lamplight` flips to night palette.
- `data/graph-core.js` — LOOM registry: threads, regions (map meridians), era/node/lesson tables.
- `data/eras/01..10-*.js` — the graph. Nodes carry id/title/date/sort/region/x/threads/hook/summary/edges. Node array order per era = reading order = main sequence. Edges point FORWARD in that sequence only.
- `data/lessons/<id>.js` — one written lesson per file; `_manifest.js` lists which exist (js/boot.js loads them, then starts the app).
- `js/map.js` — SVG chart: time rises bottom→top, era bands, region meridians, bezier wires colored by source node's first thread, pan/zoom, focus/dim, filters.
- `js/reader.js` — dossier panel + lesson reading room + questions UI.
- `js/app.js` — localStorage state (`loom.v1`), header controls, search, intro.
- `docs/forge-spec.md` — binding style contract for lesson prose.
- `.claude/skills/forge-lesson/` — the skill that writes new lessons ("forge <node-id>").

## Conventions

- Lessons are forged per `docs/forge-spec.md`; batch generation delegates prose
  to Opus subagents, one per lesson, manifest updated only by the orchestrator.
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

## State (2026-07-16)

- Graph complete: 120 nodes, 243 wires, 10 eras, all validated.
- Era I fully written (8 lessons, ~14,800 words, 13 callback links), reviewed
  adversarially, and verified in the browser. Eras II-X are seeds awaiting the forge.
- Next priorities: forge Era II ("forge era 2"), consider a "paths" feature
  (present-back and thematic traversals are modeled but not built), maybe
  deploy to Vercel for phone reading.

## Change log

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
