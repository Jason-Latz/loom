# Era III forge run (2026-08-11)

Spec captured before launch so a dead or derailed run can be restarted with
nothing lost. Goal: chart every unwritten node in Era III, The Axial Age.

## Model contract change (2026-08-11, mid-run)

**Fable 5 hit its usage limit during lesson 4 of 21** (wine-dark-song), killing
the forge agent. Jason switched the session to Opus 5 and instructed the run to
continue on it. From that point:

- **Every stage runs on Claude Opus 5**, pinned `model: 'opus'`, verified per
  stage against the transcript. The `.agents/skills/forge-lesson/SKILL.md`
  already names Opus 5 as the sanctioned prose fallback, so this is the
  documented degraded mode rather than an improvisation.
- **What is lost:** the critic is no longer a different model from the creator,
  which is the property `CLAUDE.md` singles out as the point of the split. Blind
  spots shared by author and reviewer stop being caught by the pairing.
- **What replaces it:** the single review stage became **two independent
  reviewers running in parallel with different lenses**, one on sources, facts,
  dates and quotations, the other on craft, pedagogy, graph truth and spec
  compliance. Each runs in a fresh context, is told its author shares its model
  and that shared blind spots are the real risk, and neither sees the other's
  findings. Perspective diversity substitutes for model diversity, imperfectly.
- **Still enforced:** no silent fallback to Sonnet or anything else. The audit
  script now checks every agent in a run against `claude-opus-5` and any stage
  that drifted is re-run before its output is accepted.
- **wine-dark-song keeps the original split.** Its draft was written by Fable 5
  before the limit hit and survived the death gate-green, so it was harvested
  rather than re-forged: Fable authored it, Opus reviews it.
- If Fable's limit resets and Jason wants the split restored, flip the prose
  stages in `gen-wf.mjs` back to `model: 'fable'` and the audit back to
  per-stage expectations. The two-lens review is worth keeping either way.

## Original model contract (Jason's gate at launch)

- **Authors are Claude Fable 5. Reviewers are separate Claude Opus 5 agents
  with fresh context.** Neither role may silently fall back to Sonnet, Terra,
  Luna, or anything else.
- Every prose stage (forge, revise, fix) is pinned `model: 'fable'`; every
  adversarial stage (review, verify) is pinned `model: 'opus'`. Unpinned
  Workflow agents resolve to Opus, never Fable (verified 2026-07-28 and again
  today).
- Probe result (wf_86f9ff89-e04, 2026-08-11): `model: 'fable'` served by
  `claude-fable-5`, `model: 'opus'` served by `claude-opus-5`.
- The global settings carry a `fallbackModel` chain (claude-opus-5, then
  claude-sonnet-5) that can reroute requests during overloads. Prevention
  cannot be absolute, so verification is: every agent transcript records the
  exact model id on every message. After each lesson's workflow, the
  orchestrator greps `agent-*.jsonl` in the transcript dir; a prose stage
  showing anything but `claude-fable-5`, or a review stage showing anything
  but `claude-opus-5`, is re-run from scratch before its output is accepted.
  Nothing ships on the wrong model.

## Scope

Era III holds 34 nodes; 13 already have lessons. The 21 unwritten ones are
forged strictly sequentially, one at a time, in exact main-sequence order
(array order in `data/eras/03-axial-age.js`):

zarathustra-fire, book-of-songs, pharaohs-of-kush, wine-dark-song,
upanishadic-turn, library-of-nineveh, chavin-oracle, star-diaries,
ionian-awakening, scythian-gold, carthage-ledger, zapotec-dawn, tragic-stage,
analects-of-confucius, nok-terracotta, sacred-disease, panini-grammar,
dong-son-drums, zhuangzi-butterfly, garden-and-stoa, euclid-elements

Each lesson is integrated (manifest + commit) before the next launches, so
every lesson may take callbacks to all previously shipped ones and a death
costs at most one lesson's pipeline.

## Pipeline (one Workflow per lesson, stages strictly sequential)

1. **Forge** (Fable): read spec, exemplar, packet, node contract; open every
   source actually cited (URL fetched, DOI resolved at api.crossref.org,
   access warnings resolved or the source omitted; never a search snippet);
   draft to the staging dir; single-file gate green.
2. **Revise** (Fable, fresh): dedicated clarity revision under the clean-prose
   rule now in `docs/forge-spec.md`. No new factual claims; markers stay on
   their clauses; gate green.
3. **Review** (Opus, fresh): adversarial factual + citation + craft pass;
   every source fetched and checked field by field against the clause its
   marker supports; callback eligibility checked against the list embedded in
   the prompt; structured findings with severity.
4. **Fix** (Fable, fresh): apply blockers and shoulds; overrules need fetched
   evidence (a past third-party audit found 25 of 94 rejections wrong).
5. **Verify** (Opus, fresh): confirm each finding fixed or validly overruled,
   fresh sweep, ship verdict. Max two fix/verify rounds; a lesson still not
   shippable is held in staging and repaired by the orchestrator, and later
   lessons simply do not see it as callback-eligible.

The reconnaissance packets in `docs/era-iii-briefs/` are scaffolding, not
citation authority. When a packet and fetched evidence disagree, the evidence
wins; when a lesson and its node summary disagree, the lesson usually wins
(Era II lesson), and era-file corrections are committed separately by the
orchestrator, never edited by a writer agent.

Staging dir (lessons parked outside the repo so the full gate stays green):
`/private/tmp/claude-501/-Users-jason-Downloads-CS-Classes-Projects-Learning/b6c81eb3-91b0-4a84-8bcb-c509fb83f5bd/scratchpad/era3-staging/`

## Prose directive (Jason, 2026-08-11)

Jason rejected the dense literary register by example ("The ridge is a road...
The stone is only being persuaded to agree."): fragment chains, stacked
metaphor, aphoristic poses, personified objects. The rule is now in
`docs/forge-spec.md` under Voice and hygiene, it overrides the exemplar's
style where they conflict, and the revise stage's whole charter is enforcing
it. Reviewers flag drift into that register at the same weight as drift into
encyclopedia tone.

## Era III specific hazards (watched for in review)

- **The Axial Age is a construct.** Jaspers' synchronicity is a frame, not a
  finding; the lessons must not imply one coordinated planetary awakening.
- **Dating disputes are the era's signature.** Zarathustra (a millennium of
  scholarly range), the Buddha, Homer's fixation, Panini, the Analects'
  layers: state the honest range, never pick a convenient point.
- **Attribution hazards.** Hippocrates is nearly unrecoverable behind the
  corpus; Euclid's biography is almost empty; Confucius did not compile the
  Odes; the Gathas' single authorship is argued.
- **"First" claims.** Zapotec vs Olmec writing priority is debated; Nok iron's
  independence is genuinely unresolved; coinage has three chronologies.
- **Hostile or colonial lenses.** Kush through Egyptian eyes, Scythians
  through Herodotus, Carthage through Roman enemies, "fire worshipper" for
  Zoroastrians: the sources' spin is part of the story, not the story.
- **Religious-origin overclaims.** Zoroastrian influence on Judaism is
  plausible and debated, never proven; no lesson may present direction,
  mechanism, or dating of such influence as settled.

## Integration (orchestrator, after each lesson ships)

1. Verify models from the workflow transcript (see model contract).
2. Confirm the workflow touched nothing in the repo (`git status`).
3. Copy the staged file into `data/lessons/`, insert the id into
   `_manifest.js` at its main-sequence position.
4. `node scripts/check.mjs` to a clean OK, then commit
   `lesson: forge <id> (<Title>)` staging exactly those two paths.

After the final lesson: `node scripts/check-links.mjs` over the new ids (read
the output, act only on confirmed deaths), update `CLAUDE.md` state and change
log, push to `main` (which deploys), verify live.
