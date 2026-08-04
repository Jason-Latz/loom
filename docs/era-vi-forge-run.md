# Era VI forge run, batch 1 (2026-08-04)

Spec captured before launch so a dead or derailed run can be restarted with
nothing lost. Budget: Jason allocated about 5 percent of the week's usage.

## Batch

The first eight nodes of Era VI in main-sequence order (array order in
`data/eras/06-woven-world.js`), the twelfth century of faith and reason:

1. `crusading-fever` (The Crusading Fever, 1096 CE)
2. `ghazali-crisis` (Al-Ghazali's Deliverance, c. 1100 CE)
3. `first-universities` (The First Universities, c. 1150 CE)
4. `angkor-hydraulic` (The City That Drank the Monsoon, c. 1150 CE)
5. `vachana-poets` (The Body Is the Temple, c. 1160 CE)
6. `neo-confucian-turn` (The Neo-Confucian Turn, c. 1175 CE)
7. `commentator-of-cordoba` (The Commentator, c. 1180 CE)
8. `guide-for-the-perplexed` (A Guide for the Perplexed, c. 1190 CE)

## Pipeline (per lesson, Workflow tool)

Five stages, lessons flowing independently (pipeline, no barriers):

1. **Forge** (Fable, pinned `model: 'fable'`): research with every URL opened
   and every DOI resolved at api.crossref.org, then draft per
   `docs/forge-spec.md`, written to the staging dir, single-file gate green.
2. **Revise** (Fable): dedicated literary revision for cadence, image,
   restraint, sentence music, unity. No new factual claims.
3. **Review** (Opus): adversarial factual + craft + citation pass; every
   source fetched and checked field by field against the clause it supports.
4. **Fix** (Fable): apply blockers; overrules need fetched evidence (a past
   audit found 25 of 94 overrules wrong).
5. **Verify** (Opus): confirm fixes, fresh sweep, ship verdict. Max two
   fix/verify rounds.

Staging dir (lessons parked outside the repo so the full gate stays green):
`/private/tmp/claude-501/-Users-jason-Downloads-CS-Classes-Projects-Learning/af6a66fd-ee20-4874-9d07-080f5a38b319/scratchpad/era6-staging/`

Callback questions may target only ids already in
`data/lessons/_manifest.js` (the 68 written lessons), never batch-mates, so
every lesson is independently shippable.

## Integration (orchestrator, after the workflow)

For each shipped lesson, in main-sequence order: copy from staging into
`data/lessons/`, append its id to `_manifest.js` under a new Era VI comment,
run `node scripts/check.mjs` to a clean OK, commit
`lesson: forge <id> (<Title>)`. Then: link sweep the new ids with
`node scripts/check-links.mjs` (read, do not blindly act), update `CLAUDE.md`
state + change log, deploy `vercel --prod --yes`, verify live.

## Resume

If the run dies (usage limit, API error): do not restart. Find the run id
below, then relaunch with `Workflow({scriptPath, resumeFromRunId})`; completed
agents return cached results instantly. Check `agent-*.meta.json` in the
transcript dir to confirm prose stages resolved to Fable before letting a
resumed run proceed.

Run id: recorded after launch in this file's git history or via /workflows.
