# Era II forge run (2026-08-05)

Spec captured before launch so a dead or derailed run can be restarted with
nothing lost. Goal: chart every unwritten node in Era II, Seeds & Cities.

## Scope

Era II holds 32 nodes; 13 already have lessons. The 19 unwritten ones, in
main-sequence order (array order in `data/eras/02-seeds-and-cities.js`):

**Batch 1 (7).** town-without-streets, green-sahara, gardens-of-kuk,
gold-before-kings, second-harvest, caral-supe, enheduanna

**Batch 2 (6).** language-puts-to-sea, empire-of-wool, oxus-oases,
cloth-for-silver, epic-of-gilgamesh, counting-in-sixties

**Batch 3 (6).** kingdom-of-kerma, surgeons-papyrus, weighing-of-the-heart,
poverty-point, rigveda, oldest-song

Batches run and integrate sequentially, so a death costs at most one batch
(per the 2026-08-05 lesson that resume caching is unreliable), and so later
batches can cite earlier ones in callbacks.

## Pipeline (per lesson, Workflow tool)

Same five stages that produced Era VI, lessons flowing independently
(pipeline, no barriers):

1. **Forge** (Fable, pinned `model: 'fable'`): research with every URL opened
   and every DOI resolved at api.crossref.org, then draft per
   `docs/forge-spec.md`, written to the staging dir, single-file gate green.
2. **Revise** (Fable): dedicated literary revision for cadence, image,
   restraint, sentence music, unity. No new factual claims.
3. **Review** (Opus): adversarial factual + craft + citation pass; every
   source fetched and checked field by field against the clause it supports.
4. **Fix** (Fable): apply blockers; overrules need fetched evidence.
5. **Verify** (Opus): confirm fixes, fresh sweep, ship verdict. Max two
   fix/verify rounds.

Staging dir (lessons parked outside the repo so the full gate stays green):
`/private/tmp/claude-501/-Users-jason-Downloads-CS-Classes-Projects-Learning/e59a20b1-c670-45c8-99c8-4c42f152afbb/scratchpad/era2-staging/`

Callback questions may target only ids already in `data/lessons/_manifest.js`
at the time the batch launches, never batch-mates, so every lesson is
independently shippable.

## Era II specific hazards

The era's nodes are unusually easy to get wrong in one particular way: they
are mostly places where a familiar story (farming to surplus to state to
writing to king) does not hold, and the node summaries already say so
carefully. A lesson that quietly restores the tidy sequence is a defect even
when every sentence in it is true. Watched for in review:

- **Density without hierarchy.** Çatalhöyük, the Indus, Poverty Point: absence
  of palaces is not evidence of equality, and similarity of houses is not
  proof of it.
- **Farming without grain.** Kuk, Caral, Poverty Point. No granary, no
  domesticated staple cereal, monuments anyway.
- **Superseded framings.** Sherratt's secondary products revolution (milk
  residues predate it by millennia), Mellaart's mother goddess, Reisner's
  reading of Kerma as an Egyptian outpost, Breasted's Imhotep authorship of
  the Edwin Smith papyrus, Botai as the domestic horse lineage.
- **Genomic overreach.** The Austronesian and Oxus nodes both touch aDNA
  results whose popular summaries overstate admixture; Skoglund 2016 and
  Narasimhan 2019 must be read, not recalled.
- **Attribution.** Enheduanna's authorship is genuinely disputed; the Hurrian
  hymn's melody has rival transcriptions that disagree audibly.

## Integration (orchestrator, after each batch)

For each shipped lesson, in main-sequence order: copy from staging into
`data/lessons/`, append its id to `_manifest.js` in main-sequence position,
run `node scripts/check.mjs` to a clean OK, commit
`lesson: forge <id> (<Title>)`. After the final batch: link sweep the new ids
with `node scripts/check-links.mjs` (read, do not blindly act), update
`CLAUDE.md` state + change log, deploy `vercel --prod --yes`, verify live.

## Outcome (2026-08-06)

All 19 shipped. Gate `OK: 365 nodes, 802 wires, 10 eras, 95 lessons. 0
warning(s).` Link sweep 339 URLs, 0 dead, 58 publisher bot walls left untouched
per policy (two spot-checked in a real browser and both live).

Runs: batch 1 `wf_e8f79a39-6e8` (died in an overload wave; four lessons had
already drafted and revised, so the tail `wf_a5b47839-4e7` resumed them at
review and re-forged only the three that left nothing behind, 27/27 clean),
batch 2 `wf_a9b01eea-74b` (38/38 clean), batch 3 `wf_287f8111-f55` (died at the
session limit with all six drafted), tails `wf_86f84f37-34f` and
`wf_5001fad5-b8b`, plus two single-lesson repairs. Polish runs:
`wf_38c090cf-dfa`, `wf_34fd7873-1ea`, `wf_a7de0b0e-629`.

Lessons for the next run:

- **Harvest, do not resume.** Both deaths left finished drafts on disk. Reading
  the journal and building a tail scoped to each lesson's actual stage saved
  the completed research every time; the built-in resume cache re-ran finished
  stages in the Era VI run.
- **Identify recovered work by content, not by id.** Reviews mention other
  nodes by name (the Edwin Smith review discusses weighing-of-the-heart because
  the nodes are linked), so id-matching mis-assigned them. Match on the
  distinctive source instead.
- **Recovered findings are too big for `args`** (57 KB here) and workflow
  scripts cannot read files. Generate the tail script with the findings
  embedded as a constant, and parse-check it with `new Function` before
  launching: `node --check` gives false passes on this shape of script.
- **A verifier that re-measures beats one that complies.** The rigveda verifier
  refuted its own review's central claim by measuring all 89 shipped lessons,
  and flagged an integration dependency (the lesson's "this atlas has read
  both already" is only true if weighing-of-the-heart ships ahead of it).
