# AGENTS.md — Loom

**`CLAUDE.md` is the single source of truth for this repo. Read it first.**

This file used to be a full copy of it, and the copy drifted badly: it still
said "56 lessons", still listed a header-search bug fixed in the mobile pass,
and went on telling agents to add citations "wherever the lesson format can
present them tastefully" after citations became mandatory and the release gate
started enforcing them. One canonical document is worth more than two that
disagree, so this one is now a pointer.

Everything lives in `CLAUDE.md`: commands, architecture map, conventions,
gotchas, current state, change log. The forge contract lives in
`docs/forge-spec.md`.

The two rules most often broken, repeated here only because they are the
expensive ones:

- **The gate must be green before every commit:** `node scripts/check.mjs`.
- **Every lesson carries per-claim citations,** and a citation is only real
  once you have opened it. Resolve the DOI at
  `https://api.crossref.org/works/<doi>` before naming authors, venue, volume
  or pages, and fetch the URL to confirm it hosts what the cite claims. A live
  authoritative paper attached to a sentence it does not support passes the
  gate and is worse than no citation at all.
