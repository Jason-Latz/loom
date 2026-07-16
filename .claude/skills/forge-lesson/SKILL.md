---
name: forge-lesson
description: Write one or more Loom lessons for uncharted nodes in the atlas. Use when the user says "forge <node-id>", "forge era <n>", "write the lesson for X", or asks to chart new territory in the Loom history atlas.
---

# Forge a Loom lesson

You are adding lessons to Loom, the world-history atlas in this repo. A lesson
is the ten-minute reading experience behind one node of the 120-node graph.

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

Spawn one subagent per lesson in parallel (Opus for the prose), each following
steps 1-5 and running the single-file check
(`node scripts/check.mjs data/lessons/<id>.js`). Tell each agent NOT to touch
the manifest.

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
- Prose stays in the 1,500-2,200 word aim (story + significance).
- Never mark a lesson done while the check gate fails.
