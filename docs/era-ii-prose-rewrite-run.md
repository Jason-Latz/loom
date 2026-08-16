# Era II Prose Rewrite Run (2026-08-16)

Jason's commission: "Run the same pass on Era II." Same standard, pipeline,
invariants, and commit policy as the Era I pass; this document records only
what differs. Read `docs/era-i-prose-rewrite-run.md` first for the standard
(clear-close-third register, plain View from Above, naming rule, scope,
citation invariants, pipeline stages, model pins, harvest-on-death rule).

## Differences from Era I

- **Era file:** node entries live in `data/eras/02-seeds-and-cities.js`.
- **Scope:** 31 lessons. `surgeons-papyrus` is excluded: it was replaced
  today by the A/B pilot winner and already carries the new register.
- **Names:** Era II reaches literate societies, so the naming rule's
  corpus clause now has teeth. For Egyptian and Mesopotamian settings,
  invented names come from attested period name stock (Senebtifi in
  surgeons-papyrus is the model), never a documented individual in a
  similar role. For societies without recoverable names (Poverty Point,
  Caral, the Austronesian dispersal, Oxus, Poverty Point), use
  linguistically modest inventions per the Era I practice (Tsela and Nka
  are the model). Real recorded names always win: Enheduanna stays
  Enheduanna. Existing composite names in Era II lessons (Iddin-Sin,
  Lamassi, Uda, and others) are retained unless a reviewer shows a
  collision with a documented person.
- **Invented names are unique across the atlas** (added after wave 2, when
  a writer reused Sena from village-before-the-farm for a second invented
  grandmother). Before choosing an invented name, check it is unused:
  `grep -rlw '<name>' data/lessons/`. Real recorded names are exempt; only
  inventions must not repeat.
- **Known writer failure modes**, from Era I's review record, now warned
  against in the rewrite prompt itself: do not strengthen or weaken any
  claim (a register pass moves no claim's certainty in either direction);
  do not assert in the narrator's voice a proposition the lesson's named
  debate leaves open; check any duration, count, or date you rephrase
  against the lesson's own arithmetic elsewhere.

## Waves

Manifest order, six waves, each fully landed (verify, commit per lesson,
push) before the next launches:

- Wave 1: rice-and-the-yangtze, town-without-streets, green-sahara,
  gardens-of-kuk, gold-before-kings
- Wave 2: second-harvest, uruk-first-city, invention-of-writing,
  surplus-and-the-state, caral-supe
- Wave 3: gift-of-the-nile, indus-enigma, enheduanna, language-puts-to-sea,
  gods-of-the-city
- Wave 4: empire-of-wool, oxus-oases, horse-and-wheel, cloth-for-silver,
  epic-of-gilgamesh
- Wave 5: counting-in-sixties, code-of-hammurabi, kingdom-of-kerma,
  weighing-of-the-heart, yellow-river-bronze
- Wave 6: poverty-point, bronze-web, rigveda, oldest-song,
  maize-and-the-americas, sea-peoples-collapse

Commit message convention: `lesson: rewrite <id> prose (era II register
pass)`. If a wave dies to a usage limit mid-write, revert the partial files
and re-run the wave after reset (the Era I precedent); harvest only when the
journal shows completed stages worth keeping.
