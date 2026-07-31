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
hand the prose and substantive literary revision to Fable. Fable follows steps
1-5 and runs the single-file check (`node scripts/check.mjs
data/lessons/<id>.js`). Tell Fable NOT to touch the manifest. Codex remains
responsible for graph edits, adversarial review, validation, manifest updates,
commits, and deployment.

**Then verify adversarially.** The gate only checks structure, so pair every
lesson with a reviewer agent that reads the spec, the exemplar, and the node,
and hunts for: factual claims stated with more confidence than the scholarship
supports, superseded datings, voice drift into encyclopedia tone, callbacks
that are trivia rather than comparisons, and threadsOut whys that just echo the
edge label. This pass has caught real errors every time it has been run,
including in lessons the gate passed green.

Citations need their own adversarial pass, by a different agent than the one
that wrote them. The gate can prove that a marker resolves and that a URL is
well formed; it cannot tell whether the source supports the sentence. The
reviewer must open each URL, resolve the DOI at
`https://api.crossref.org/works/<doi>`, check the cite string against that
record field by field, and ask whether the source is being stretched past what
it establishes.

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
- Prose stays in the 1,500-2,200 word aim (story + significance).
- Treat each lesson as artwork: make the prose engaging, the pedagogy elegant,
  and the whole piece aesthetically coherent.
- Keep forge work focused on content quality; do not add product features.
- Every lesson carries citations: `citationsVersion: 1`, a `sources` array, and
  6 to 12 `[^source-key]` markers inline in the prose. See the Citations section
  of `docs/forge-spec.md`. Markers are hidden until the reader raises them, so
  they cost the prose nothing; open every URL and resolve every DOI before
  writing one, because a real paper attached to a claim it does not support
  passes the gate and is worse than no citation.
- For every new lesson, make `deeper` exactly three clickable objects shaped
  `{ title: 'Author, Work', why: '...', url: 'https://...' }`. Legacy string
  items remain supported, but new work must use objects. `deeper` is invitation,
  `sources` is evidence; overlap between them is expected.
- Give each source a tasteful label and an authoritative HTTPS link. Verify
  authors, titles, editions, and paper metadata against the linked record.
- When available, vary the three sources across a primary text or source
  object, a scholarly work, and an accessible museum or university synthesis.
- Calculate and compare dates before calling people or events contemporaneous.
- Resolve a paper's DOI metadata or publisher record before naming its authors.
- Never mark a lesson done while the check gate fails.
