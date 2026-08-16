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

## Command construction

- When a shell command verifies literal skill invocation text such as
  `$skill-name`, protect the dollar sign with single quotes or an explicit
  escape. A double-quoted `python -c` program still undergoes shell expansion.

## Reconnaissance validation

- When auditing Markdown packet structure, prefer fixed-string heading checks
  and simple count commands; avoid brittle nested regular expressions that can
  stop a read-only validation before reporting the actual file state.
- When Jason asks about a recognizable model voice that is not an official
  product characteristic, especially Claude Fable 5's prose mannerisms, use
  firsthand user reports such as Reddit as the primary evidence. Treat official
  prompting guidance only as corroboration, not as a description of that voice.
- Do not infer an author's name from a partial search result. Leave attribution
  unresolved until the publisher or a trusted catalogue confirms it.
- Validate every proposed callback mechanically against both main-sequence
  order and the current lesson manifest. Do not accept a worker's statement
  that its callback list is eligible without checking the actual IDs.
- Keep model-based reconnaissance jobs short and narrowly scoped. The Era III
  pilot's long seven-node sessions repeatedly carried expanding tool history;
  prefer one-node jobs with compact extracted context and deterministic checks.

## Jason's prose preferences

- Before patching iterative workshop samples, re-read the current file and
  compare it with the latest chat version. Do not assume a revision shown only
  in chat was also written to the temporary test artifact.
- For Loom readability, use Jason's supplied excerpt from Patrick Rothfuss's
  *The Name of the Wind* as a diagnostic reference without imitating Rothfuss's
  distinctive voice. Favor rhythmic but plain sentences, short recovery beats,
  exact repetition instead of synonym churn, concrete action, and one main job
  per paragraph. Preserve the lessons' factual substance and citation support.
- Before codifying a literary reference into the Loom forge contract, validate
  the proposed patterns against a multi-chapter sample rather than generalizing
  from one striking passage. Separate narration from dialogue in quantitative
  comparisons so dialogue does not make the reference look artificially simple.
- Do not flatten Loom prose by categorically removing fragments, metaphor, or
  personification. Jason's Rothfuss reference uses these successfully when they
  are concrete, sparse, and follow an already clear literal meaning. Reject
  chains of abstract, performative effects; allow an occasional earned device
  that improves rhythm, characterization, or sensory understanding.
- Encode durable Loom prose guidance in a project skill instead of leaving it
  only in chat history. When evaluating a new prose rule or register, compare
  two named variants built from the same factual and citation ledger so the
  difference in voice is visible without a change in substance.
- Jason prefers Loom stories with first-person intimacy carried through close
  third person and free indirect thought: keep third-person pronouns while the
  character's senses and private logic shape the narration. Favor A's clear
  sentence architecture, but give it concrete imagery and embodied interiority.
  For future A/B prose comparisons, use material suited to the craft question
  and provide two paragraphs on each side.
- Jason currently prefers the deeper interior direction of the B comparison,
  but rejects generic lyrical atmosphere and compressed paradox as obvious AI
  prose. Every image must carry information, pressure, characterization, or
  choice. Cut scenic lines whose removal changes nothing, and replace sentences
  that assert an idea then partly reverse it with literal facts in natural
  order.
- Combine B's close interiority with A's explicit narrative spine. Do not let
  free indirect questions, fragments, or imagery obscure the plot. Each story
  movement should plainly state its controlling question or choice, while the
  interior voice shows why it matters to the character.
- State mechanisms and leave feelings available for inference. Jason likes
  small character-owned value judgments such as *Good* because they reveal a
  personal standard without narrator explanation. When a process matters,
  prefer an explicit actor plus distinct verbs, such as what a singer kept,
  forgot and added, over vague phrasing such as *some came from his teacher*.
- Treat Loom prose guidance as suggestions rather than a generative checklist.
  Factual preservation, citation scope, supported uncertainty and repository
  constraints remain binding. In a plainly labeled composite or reconstruction,
  the forge spec permits modest connective action, sensory experience and
  interior response consistent with the evidence; do not misstate those as
  recorded facts. Let writers choose among viewpoint, imagery, rhythm and
  plot-anchor techniques instead of forcing every successful example into later
  passages.
- A prose forward test must reproduce the production prompt's actual authority
  boundaries. Do not add a stricter ban on reconstruction than the forge spec,
  because the test will measure obedience to the artificial restriction rather
  than the skill's ability to produce good Loom prose.
- In a prose forward test, factual parity with the current draft is not enough.
  Cross-check quantities and hard claims against the lesson's own source notes;
  the surgeons-papyrus test inherited "more than five metres" even though the
  source note gives the surviving roll as 4.68 metres.
- When handing a full-lesson prose A/B test to Claude, make the brief
  self-contained: carry forward the successful and rejected workshop examples,
  the blind-test failures and decision-level diagnosis, the true reconstruction
  boundary, a shared evidence ledger, controlled variant definitions, exact
  deliverables, validation commands and a no-winner blind-reading scorecard.
  Keep the active lesson untouched until Jason chooses what to integrate.
- Pilot verdict (2026-08-16): Jason chose candidate A, clear-close-third, over
  the interior-close-third B, and banned pithy phrasing in the View from Above
  by quoted example. Every ancient story person now carries a personal name,
  invented and labeled when the record is silent. Both rules are codified in
  docs/forge-spec.md and the loom-clear-prose skill; this ledger only points.
