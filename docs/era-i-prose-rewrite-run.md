# Era I Prose Rewrite Run (2026-08-16)

Jason's commission, given at the close of the surgeons-papyrus A/B pilot:
"rewrite all of Era I, just the prose, using the skills that we have learned.
Right now, Era I just reads like terrible trash. Fan out Fable Subagents and
rewrite it according to what we have learned." Commit policy confirmed by
Jason the same night: commit and push per lesson as each lands. Scope
confirmed: story, storyContext, and significance only; questions, threads,
sources, and deeper stay byte-stable.

This document is the run's cold-start spec. If the run dies, harvest per the
CLAUDE.md gotcha (read the journal, find each lesson's stage, launch a scoped
tail); do not resume blind.

## The standard being applied

All three of these are codified in `docs/forge-spec.md` and the
`loom-clear-prose` skill as of tonight; read both before writing.

1. **Register: clear-close-third (pilot candidate A).** Explicit plot spine,
   one visible movement per paragraph, mechanisms stated literally, embodied
   but restrained interiority, imagery sparse and always carrying evidence,
   pressure, or a knowledge gap. The interior-close-third register (pilot
   candidate B) is retired.
2. **The View from Above reads plain.** Nuance, named debate, honest
   uncertainty: yes. Pithy phrasing: no. Hard defects, from Jason by quoted
   example: balanced antitheses, compressed formulas, quotable landings,
   meta-cleverness. State the literal claim in natural order.
3. **Names.** Every ancient person in a story carries a personal name. Real
   recorded names win; otherwise invent a period-plausible name from attested
   name stock of that time and language (never a real attested person in a
   similar role), and label it plainly in storyContext as ours. Era I is deep
   prehistory: no name corpora exist, so names should be linguistically
   modest inventions consistent with the lesson's existing practice (Tsela
   and Nka in spark-of-mind are the model), and storyContext says the names
   are invented.

## Scope and invariants (per lesson)

- Rewrite: `storyContext`, `story`, `significance` arrays only.
- Byte-stable: `sources`, `threadsOut`, `questions`, `deeper`, `id`,
  `readingMinutes`, `citationsVersion`.
- Citation invariant: the marker multiset per lesson is unchanged, and each
  marker stays immediately after the punctuation of a clause making the same
  claim the ledger of that lesson's sources supports. Mechanical check before
  commit: extract sorted `[^...]` markers from old and new files; they must
  be identical. Semantic check is the reviewer's job.
- Facts, dates, quantities, hedges, and named debates are preserved at their
  existing certainty. The rewrite is a register pass, not a research pass.
  If a writer finds a factual problem, it reports the finding; the
  orchestrator decides, exactly as forge-run convention has it.
- Gate per lesson: `node scripts/check.mjs data/lessons/<id>.js` prints OK
  with zero warnings. Word band and paragraph counts stay legal; the total
  need not match the old lesson but must stay in 1,500 to 2,200.
- No em or en dashes; real possessives and contractions; curly apostrophes.

## Pipeline (per lesson)

1. **Rewrite** (model pinned `fable`): reads forge-spec, the clear-prose
   skill, this spec, the current lesson file, and its era node entry;
   rewrites the three prose fields in place.
2. **Adversarial review** (model pinned `opus`, fresh context): checks fact
   and hedge preservation against git HEAD, citation-scope integrity per
   marker, the cliché list (antitheses, formulas, quotable landings,
   personified objects, fragment chains), naming-rule compliance, and reads
   the prose as a reader (one-reading comprehension). Compact defect list,
   at most ~8 findings per fix pass (chunk if more).
3. **Fix** (model `fable`): applies accepted findings; disputed findings go
   to the orchestrator.
4. **Orchestrator**: runs the gate and the marker check, commits that lesson
   alone (`lesson: rewrite <id> prose (era I register pass)`), pushes.

## Waves

Manifest order, four waves of five, each wave fully landed (gate, commit,
push) before the next launches, so a dead run costs at most one wave:

- Wave 1: first-of-our-kind, the-tended-fire, ochre-for-the-dead,
  spark-of-mind, ash-across-asia
- Wave 2: great-dispersal, firelight-economy, the-other-humans,
  crossing-to-sahul, tribe-of-strangers
- Wave 3: beads-and-alliances, the-hollow-bone, paint-in-the-dark,
  the-eyed-needle, world-the-ice-made
- Wave 4: wolf-at-the-fire, into-the-last-continents, pots-before-the-farm,
  village-before-the-farm, trap-of-seeds

spark-of-mind is the forge-spec exemplar; its rewrite re-registers the
exemplar to the new standard and needs the run's most careful review.

## Model pins

Writers and fixers: `fable`. Reviewers: `opus`. Pin explicitly on every
agent call; verify from transcripts if in doubt (subagents do NOT inherit
the session model). If Fable becomes unavailable mid-run, pause the wave and
leave this spec as the restart anchor rather than silently downgrading the
prose stages.
