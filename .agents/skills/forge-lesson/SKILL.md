---
name: forge-lesson
description: Write one or more Loom lessons for uncharted nodes in the atlas. Use when the user says "forge <node-id>", "forge era <n>", "write the lesson for X", or asks to chart new territory in the Loom history atlas.
---

# Forge a Loom lesson

You are adding lessons to Loom, the world-history atlas in this repo. A lesson
is the ten-minute reading experience behind one node of the 365-node graph.

## Inputs

- `forge <node-id>` — write that one node's lesson.
- `forge era <n>` or a list of ids — batch mode.
- If the argument is ambiguous, grep `data/eras/*.js` for the id or title.

## Procedure (single lesson)

1. Read `docs/forge-spec.md` in full. It is the binding style contract.
2. Read `data/lessons/spark-of-mind.js` (the exemplar) to calibrate voice.
3. Read the node's entry in its `data/eras/*.js` file: date, region, threads,
   hook, summary, and edges. Read the entries of every node its edges point
   to (they may live in other era files) so the threadsOut sentences are true.
4. Determine which nodes come EARLIER in the main sequence (era files load in
   filename order; within a file, array order). Callback questions may only
   reach earlier nodes, and prefer ones that already have lessons (check
   `data/lessons/_manifest.js`).
5. Write `data/lessons/<node-id>.js` exactly per the spec's format.
6. Append the id to `LOOM.lessonFiles` in `data/lessons/_manifest.js`,
   keeping main-sequence order (the order nodes appear across era files).
7. Run `node scripts/check.mjs` from the repo root. Fix until it prints OK
   with zero errors; resolve word-count warnings by editing, not by ignoring.
8. Commit the lesson file + manifest together:
   `lesson: forge <node-id> (<Title>)`.

## Batch mode

Prepare one self-contained research and architecture brief per lesson, then
hand the prose and substantive literary revision to Claude Fable 5, with Claude
Opus 5 as the fallback. The premium writer follows steps 1-5 and runs the
single-file check (`node scripts/check.mjs data/lessons/<id>.js`). Tell the
writer NOT to touch the manifest. Codex remains responsible for graph edits,
adversarial review, validation, manifest updates, commits, and deployment.

### Costed model split

Use GPT-5.6 Luna for bounded reconnaissance: graph extraction, chronology,
source discovery, DOI and URL verification, evidence ledgers, callback
eligibility, and mechanical audits. Pin Luna explicitly and verify the model in
the resulting session metadata; never assume an unpinned subagent was routed to
Luna. If the installed native `spawn_agent` runtime rejects Luna, use an
explicit `codex exec -m gpt-5.6-luna` worker instead.

Keep each Luna run short and disposable, normally one node per run at medium
effort. Feed it a compact extract containing the node, its outgoing targets,
the earlier manifested IDs, and the packet schema. Do not make a reconnaissance
worker reread the full exemplar or unrelated lesson files: Luna is not writing
prose, and long multi-node sessions repeatedly carry an expanding tool history.
Prefer deterministic scripts for seed extraction, sequence checks, URL status,
and DOI metadata wherever possible so model tokens are spent on interpretation.

Escalate a packet or disputed claim to GPT-5.6 Terra when it needs stronger
cross-source interpretation. Do not use Luna or Terra to draft sample openings,
scenes, transitions, lesson paragraphs, questions, `threadsOut` language, or
sentence-level rewrites that a premium writer could merely polish.

The Fable 5 or Opus 5 handoff must include the node seed, forge spec, exemplar,
the completed reconnaissance packet, and every unresolved verification flag.
The writer must independently open any source it actually cites; a packet is
scaffolding, not citation authority.

**Then verify adversarially.** The gate only checks structure, so pair every
lesson with a reviewer agent that reads the spec, the exemplar, and the node,
and hunts for: factual claims stated with more confidence than the scholarship
supports, superseded datings, voice drift into encyclopedia tone, callbacks
that are trivia rather than comparisons, and threadsOut whys that just echo the
edge label. This pass has caught real errors every time it has been run,
including in lessons the gate passed green.

Fix the blockers yourself, then update the manifest in one edit, run the full
check, and commit each lesson separately.

To keep the gate green at every commit (it errors on any lesson file that is
on disk but absent from the manifest), park the not-yet-committed lesson files
outside the repo and move them back one at a time, advancing the manifest with
each commit.

## Hard rules (the ones agents break most)

- No em dashes or en dashes anywhere, including date ranges ("1450 to 1700").
- Write real possessives and contractions; never strip apostrophes to protect a
  JS string. The gate fails prose containing no apostrophe at all.
- Exactly 5 questions; callbacks only to earlier nodes.
- storyContext labels composite characters as composites.
- Every ancient person in the story carries a personal name: the real one when
  the record has it, otherwise a period-plausible invented one that
  storyContext plainly labels as ours (full rule in docs/forge-spec.md).
- A labeled composite or reconstruction may use plausible connective action,
  sensory experience, and interior response grounded in the documented setting.
  Do not mistake this permission for license to invent quotations, measurements,
  biographies, motives, or historical claims.
- Prose stays in the 1,500-2,200 word aim (story + significance).
- Treat each lesson as artwork: make the prose engaging, the pedagogy elegant,
  and the whole piece aesthetically coherent.
- Keep forge work focused on content quality; do not add product features.
- For every new lesson, make `deeper` exactly three clickable objects shaped
  `{ title: 'Author, Work', why: '...', url: 'https://...' }`. Legacy string
  items remain supported, but new work must use objects.
- Give each source a tasteful label and an authoritative HTTPS link. Verify
  authors, titles, editions, and paper metadata against the linked record.
- When available, vary the three sources across a primary text or source
  object, a scholarly work, and an accessible museum or university synthesis.
- Calculate and compare dates before calling people or events contemporaneous.
- Resolve a paper's DOI metadata or publisher record before naming its authors.
- Never mark a lesson done while the check gate fails.
