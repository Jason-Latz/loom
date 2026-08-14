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

## Outcome (2026-08-12)

**All 21 shipped. Era III is complete at 34/34**, and the atlas stands at 116
lessons, 1,298 sources and 1,630 markers, gate
`OK: 365 nodes, 802 wires, 10 eras, 116 lessons. 0 warning(s).`

Release sweep: 348 URLs, **0 confirmed dead**. The sweep first reported 19 dead,
then 8 on an immediate re-run, and all 8 of those proved live or blocked when
checked by hand: Perseus was returning a Varnish "Backend fetch failed" across
its whole text service (confirmed in a real browser, its root answering 200),
Redalyc answered 200 with a 2.8 MB PDF, and `assets.cambridge.org` resolves but
drops connections while Cambridge bot-walls its main site with a 403. This is
the failure mode `CLAUDE.md` warns about, in triplicate. Nothing was changed.

**Six graph corrections** came out of the research, each verified at source by
the orchestrator before the edit and committed apart from its lesson: the
Upanishadic village setting, Nineveh's fire-versus-burial preservation and its
tablet count, the star diaries' span and price columns, the Analects' East Asian
reach, the Nok iron date, and the Dong Son casting method and period. **Two
further suggestions were declined** because the era file was loose rather than
wrong: Carthage's Sardinian grain and craft production (true of Carthage, simply
not covered by the lesson) and Nok's Jos Plateau geography (Breunig himself
places Nok between Abuja, Jos and Kaduna).

Deaths and recoveries: eight stages died across the run, to connection drops,
a Fable usage limit and a weekly limit. Every one was harvested rather than
re-run. Two lessons kept Fable-authored drafts recovered from dead forge agents
(wine-dark-song, zapotec-dawn), and carthage-ledger, nok-terracotta and
garden-and-stoa resumed at verification with all their fix work intact, costing
two agents each instead of nine.

## Where the run stopped (superseded, kept for the record)

Agents stopped with "You've hit your weekly limit, resets 2am
(America/Chicago)". **17 of 21 lessons are shipped and committed**; the atlas
is at 112 lessons and the gate is green. Four remain. Each already has a
gate-green file in the staging dir, and none is safe to commit as it stands,
because passing the structural gate is not the same as having been verified.

| lesson | died at | already done | still needs |
|---|---|---|---|
| `nok-terracotta` | verify | 2 reviews (27 findings), all 4 fix passes | verify, polish |
| `garden-and-stoa` | verify | 2 reviews (24 findings), all 3 fix passes | verify, polish |
| `dong-son-drums` | fix pass 4 | 2 reviews (32 findings), passes 1 to 3 | fix pass 4, verify, polish |
| `zapotec-dawn` | forge | a complete gate-green draft only | revise, review x2, fix, verify, polish |

Harvested reviews and fix reports are saved as `<id>-reviews.json` and
`<id>-fixes.json` next to the staging dir, with exact relaunch commands in
`RESUME.md` there. Harvest, do not re-run finished stages. Note that
`dong-son-drums` died *mid-edit*, so its file is in an unknown partial state:
its fix pass must re-check every finding against the file rather than trust
either the findings or the prior edits.

**One era-file correction is still owed**, raised by the analects verifier and
not yet applied: the `analects-of-confucius` node summary says the book "became
a shared curriculum across much of East Asia for roughly two millennia", where
the finished lesson dates the Korean, Japanese and Vietnamese spread to Zhu Xi's
Four Books (d. 1200) and the examination core to 1313 to 1905. Verify against
the lesson's sources before editing, and commit it apart from any lesson.

## Operational lessons from this run

**Chunk the fix stage.** The fix agent died twice in a row with "Connection
closed mid-response", once after real work and once after four tool calls. The
prompt was unremarkable (37 KB); what killed it was the reply, since one agent
had to report on 29 findings from two reviewers in a single response. The fix
stage is now split into sequential passes of 8 findings each, every pass told to
touch only its own assignment and to report at most three sentences per finding,
with the last pass owning the return to the word band. A death now costs one
pass instead of the stage. Both `gen-wf.mjs` and `gen-tail.mjs` do this.

**Harvest at the stage the run actually reached.** Two deaths so far, and both
left finished work: wine-dark-song died in forge with a complete gate-green
draft on disk (kept, so that lesson retains a Fable author), and
upanishadic-turn died in fix with both reviews complete in `journal.jsonl` (the
29 findings were extracted and embedded in a tail). Never re-run research that
already succeeded. A fix agent that died mid-edit leaves the file in an unknown
partial state, so the tail must tell the next fix pass to re-check every finding
against the current file rather than trusting either the findings or the prior
edits.

**The prose rule is holding, and it is not flattening the writing.** A
four-agent read-only audit of the first four shipped lessons against Jason's
directive found no systematic drift: zarathustra-fire clean, the other three
minor, nine real instances in total (a fragment chain, two aphorism poses, a
personified text, and long sentences needing a second read). All four scored 5
of 5 on specificity, which was the thing at risk: the failure mode of a
clean-prose rule is prose that goes generic and encyclopedic, and that has not
happened. The nine were fixed in one commit. Worth re-running this audit once
more late in the era.

## Parallel batches (2026-08-11, at Jason's request)

The first seven lessons were forged one at a time. Jason then asked for the
rest to run in parallel, so the remainder are forged in concurrent batches,
the same shape Era II used. `gen-batch.mjs` emits one workflow that runs N
lessons through the full six-stage pipeline at once, each lesson flowing
independently with no barrier between them, so a slow lesson never holds up a
fast one.

**The constraint that shapes the batches:** a callback question may only
target a lesson already in `data/lessons/_manifest.js`, so batch-mates cannot
reference each other. `contract.mjs` computes eligibility from the live
manifest and `gen-batch.mjs` refuses to build a batch whose members appear in
each other's eligible lists, so this cannot be got wrong by accident. The
batches are therefore grouped so that lessons which most want to reference one
another land in different batches:

- **Batch A** (star-diaries, ionian-awakening, scythian-gold, carthage-ledger,
  tragic-stage): Mesopotamia, Greece, the steppe and North Africa, none of
  which needs another batch member.
- **Batch B** (zapotec-dawn, analects-of-confucius, nok-terracotta,
  sacred-disease, panini-grammar): zapotec-dawn wants chavin-oracle and
  sacred-disease wants ionian-awakening, both shipped by then.
- **Batch C** (dong-son-drums, zhuangzi-butterfly, garden-and-stoa,
  euclid-elements): zhuangzi-butterfly wants the Analects from batch B.

Integration stays sequential and unchanged: audit the models, gate, insert in
main-sequence position, commit one lesson per commit.

## Scope

Era III holds 34 nodes; 13 already have lessons. The 21 unwritten ones are
forged in exact main-sequence order (array order in
`data/eras/03-axial-age.js`), the first seven one at a time and the rest in
the concurrent batches above:

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
