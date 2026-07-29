# Era I completion report: The Long Dawn

Written 2026-07-29. Era I is the first era of the atlas to be fully charted:
**20 of 20 nodes now carry a lesson.**

## What shipped

Twelve new lessons, 24,704 prose words (average 2,059), 60 questions, and 36
verified clickable sources:

| lesson | words | verify rounds |
|---|---|---|
| first-of-our-kind | 1,937 | 0 |
| the-tended-fire | 2,178 | 0 |
| ochre-for-the-dead | 2,003 | 0 |
| ash-across-asia | 2,073 | 2 |
| the-other-humans | ~2,050 | 2 + orchestrator fix |
| crossing-to-sahul | 2,196 | 1 |
| beads-and-alliances | 1,833 | 2 |
| the-hollow-bone | ~2,150 | 2 + orchestrator fix |
| the-eyed-needle | 2,185 | 0 |
| wolf-at-the-fire | 1,984 | 1 + dedicated re-verify |
| into-the-last-continents | ~2,080 | 2 + orchestrator fix |
| pots-before-the-farm | 2,198 | 1 |

Plus two retrofitted lessons and ten graph-data corrections (below).

## The pipeline

Six stages per lesson, run as one workflow (110 agents, ~15.9M subagent tokens,
3,780 tool calls):

1. **Research** (Fable) - a source-verified brief per node, every URL fetched.
2. **Draft** (Fable) - prose per `docs/forge-spec.md`.
3. **Literary revision** (Fable) - a dedicated pass for cadence, image, restraint,
   structural unity.
4. **Dual adversarial review** (two independent Opus agents) - one hunting factual
   error, superseded datings, misattributed scholarship and dead links; one hunting
   voice drift, generic scene-setting, trivia callbacks and spec violations.
5. **Fix** (Fable) - applied finding by finding, reviewers treated as fallible.
6. **Verify** (Opus) - confirms each blocker actually cleared, re-fetches all three
   `deeper` URLs, returns a structured verdict. Failure loops back to Fix, twice max.

**Model policy, and why it is pinned.** Omitting `model` on a Workflow `agent()`
call does NOT inherit the Fable session model: it silently resolves to Opus
(verified by probe `wf_737a2adf-bdf`). Every generative stage therefore pins
`model: 'fable'` explicitly, and only the adversarial stages run on Opus, so the
critic is never the same model as the creator. See the note in `CLAUDE.md`.

## What the review gate caught that the check gate could not

The check gate validates structure, not truth. These are real defects it passed green:

- **A fabricated stance attributed to a living scholar.** `into-the-last-continents`
  had Vance Holliday calling the missing-tools problem "a fair question he cannot
  answer." No source says that; he rebuts it on logistics grounds. The sentence then
  contradicted itself by supplying his answer after the colon.
- **A geographic falsehood in a climactic sentence.** `the-hollow-bone` claimed "three
  kinds of first on three continents" and then enumerated Europe, China and the Levant.
  China and the Levant are both Asia.
- **A false causal bridge.** The same lesson welded the Divje Babe flute dispute (a
  taphonomic argument about whether holes are human-made or carnivore punctures) to the
  absence of diagnostic human bone in Swabia. Unrelated problems.
- **An overstated count that a reviewer had already cleared on a bad check.**
  `the-other-humans` said "more than four hundred" Bruniquel speleofacts; Jaubert et al.
  2016 say about 400. The factual reviewer's "verified clean" list wrongly asserted the
  paper said "more than".
- **An arithmetic error both reviews missed by checking two dates separately.**
  `wolf-at-the-fire` said people lived in Australia "at least 50,000 years before the
  dingo arrived a little over three thousand years ago." On its own floor that interval
  is about 46,700 years. Eight further issues were found in the same dedicated re-verify,
  including a discovery mechanism the record contradicts (quarrymen "blasting basalt...
  broke into it", when the workers found the bones clearing debris and specialists
  arrived after the bones were out).

## Graph-data corrections

Ten defects in committed node text, each re-verified against the fetched primary
source rather than the reviewer's summary. Full dossier: `docs/era-i-graph-corrections.md`.

Commit `f11147f` (eight):
- `ochre-for-the-dead`: fallow to **red** deer antlers (Coqueugniot et al. 2014, PLOS
  ONE, co-authored by the burial's excavator); the Qafzeh shells are naturally
  perforated by surf and are NOT associated with the burials, so the summary no longer
  calls them pierced grave goods (Bar-Yosef Mayer et al. 2009, JHE 56).
- `the-tended-fire`: the Qesem hearth is two superimposed use cycles over about four
  square meters, not ash returned for millennia (Shahack-Gross et al. 2014).
- `the-hollow-bone`: holes were carved with chipped-stone tools, not drilled; the
  celebrated 42,000 date belongs to a horizon *below* the flutes; "cut to a playable
  scale" is refuted by the excavators' own inability to replicate the instrument
  (Conard et al. 2009).
- `the-eyed-needle`: fitted garments predate eyed needles, so the needle now claims
  finer seams rather than the transformation itself (Gilligan et al. 2024).
- `wolf-at-the-fire`: the Bonn-Oberkassel dog was a sick puppy dead at about 28 weeks
  that "cannot have held any utilitarian use" (Janssens et al. 2018).
- `pots-before-the-farm`: the Xianrendong date is a live dispute (Kuzmin 2015 against
  Wu et al. 2012), not settled fact.

Commit `b53f0b2` (two):
- `first-of-our-kind`'s hook claimed Irhoud pushes our origin back "a hundred thousand
  years." That delta rested on the superseded ~195,000-year Omo Kibish date; the 2022
  redating gives 233,000 +/- 22,000, leaving roughly eighty thousand. The lesson never
  repeated the arithmetic, so the hook was its only carrier.
- `the-tended-fire` declared `threads: ['craft']` while its prose names both craft and
  ideas, as the spec requires. Without `ideas` the chart pigment contradicted the text.
  `craft` stays first so wire colors are unchanged.

Two reviewer claims were **refuted** rather than applied: Xianrendong's "soot and
scorch marks" are in Wu et al. 2012 (the reviewer could not open the paywalled paper
and inferred absence), and "sinew" is supported by the reviewer's own cited authority.

## The retrofit, and a structural lesson

`spark-of-mind` was the atlas's first lesson, written when nothing preceded it, so it
carried zero callbacks; `great-dispersal` carried one. Inserting twelve lessons *before*
them changed what the gate requires, because it derives the callback count from earlier
**written** lessons. Both now owe two.

This will recur in every later era that gains early insertions. The rule: **integrate in
main-sequence order, and treat any closed callback chain as one atomic commit.** Era I's
opening six (indices 0 to 5) are only green together, since every callback points backward
inside the set.

Both retrofits gained real comparisons rather than mechanical conversions:
- `spark-of-mind` against the silence `first-of-our-kind` hands forward, and against
  Qafzeh's antlers: a bead must be *read* to function, so it argues for other minds
  sharing a code, while the antlers argue only for the mind that placed them.
- `great-dispersal` against Toba: two narrow gates offered as explanations for the same
  observed thinness in human variation, one catastrophic and released by the field, one
  demographic and still standing.

Two cross-lesson collisions were also caught and resolved, both by agents reading each
other's staged work: duplicate callback comparisons on consecutive reading days, and a
near-identical verb list colliding with `ochre-for-the-dead`'s structural bookend.

## Verification

- `node scripts/check.mjs`: **OK: 365 nodes, 800 wires, 10 eras, 68 lessons. 0 warning(s).**
- Gate green at every one of the twelve commits.
- Browser QA local: all 68 lessons stream and register, every Era I node resolves a
  lesson, zero console errors, callbacks render and resolve their target titles, all
  `deeper` links https. Mobile at 375 px: no horizontal overflow.
- Every newly forged lesson swept for em/en dashes and stripped apostrophes: clean.

## Known deviations, accepted

- Several lessons run long in `significance` against the spec's per-section aim of 600
  to 950 words (the enforced bound is the 1,500 to 2,200 combined total, which all pass).
  The overage is reviewer-mandated insertions. Worth deciding corpus-wide rather than
  per lesson.
- `first-of-our-kind` and `wolf-at-the-fire` carry three scholarly papers in `deeper`
  rather than the spec's preferred one primary / one custodian / one synthesis. For
  `wolf-at-the-fire` this preserves the only non-European item.
- `first-of-our-kind` question 3 still lends Irhoud a chronological precision the prose
  correctly refuses two paragraphs earlier. Minor, logged, not fixed.

## Next

Eras II to V remain: 19, 21, 25 and 25 unwritten nodes. Packets, briefs directories and
workflow args for all four are already generated in the session scratchpad. The pipeline
and the resume path are both proven: on a session limit, stop the dead task and relaunch
with `resumeFromRunId`, and completed agents replay from cache.
