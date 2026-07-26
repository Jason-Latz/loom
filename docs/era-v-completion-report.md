# Era V Completion Report: The Believing World

Date: 2026-07-26. Scope: the thirteen core lessons of Era V (c. 600 to 1100
CE), researched, written, adversarially reviewed, released, and deployed to
production at https://loomhistory.com (new custom domain) and
https://loom-gray.vercel.app, deployment dpl_3DGF1SSPv7njCcSpy1mqN7gKYKM9.
The atlas now holds 56 written lessons over 365 nodes with a zero-warning gate.

## What shipped

Thirteen lessons in main-sequence order, each in its own gate-green commit:

| Lesson | Title | Words |
|---|---|---|
| recitation-in-the-desert | The Recitation | 1,898 |
| gupta-zero | Rules for Nothing | 1,779 |
| caliphate-lightning | The Caliphate's Lightning | 1,808 |
| tang-golden-network | Tang: The Open Empire | 1,885 |
| europe-reboots | Europe Reboots | 1,886 |
| house-of-wisdom | The House of Wisdom | 1,892 |
| northmen-networks | The Northmen's Networks | 1,842 |
| golden-sahara | Gold Roads of the Sahara | 1,893 |
| monsoon-marketplace | The Monsoon Marketplace | 1,891 |
| song-economic-miracle | The Song Economic Miracle | 1,844 |
| heian-and-genji | The Pillow and the Brush | 1,850 |
| mound-and-mountain | Mound and Mountain | 1,797 |
| great-schism | The Great Schism | 1,865 |

Totals: about 24,100 words of story and significance, 65 questions, 26
callback questions balanced across the whole atlas (no earlier lesson used
more than twice; two era-internal chains: house-of-wisdom reaches gupta-zero,
heian-and-genji reaches tang-golden-network), and 39 clickable sources, every
URL fetched and its author, title, and edition metadata verified against the
linked record.

## Process

The full pipeline ran under one orchestrator (Fable) with delegated agents:

1. Research: one Opus 5 brief per lesson (docs/era-v-briefs/), each with a
   documentation-ledgered scene, verified chronology, factual traps with
   sources, a significance spine, callback candidates argued from the actual
   text of earlier lessons, and a fetched-and-verified source map.
2. Graph corrections first: research contradicted the node data in several
   places, fixed in commit d472ecd before any prose was written. Highest
   severity: the golden-sahara hook had the trans-Saharan trade backwards
   (salt moved south, gold north); the tang edge to house-of-wisdom stated
   the Talas captured-papermakers legend as fact; the house-of-wisdom summary
   placed Ibn al-Haytham (Fatimid Cairo, c. 965 to 1040) in Abbasid Baghdad;
   mound-and-mountain implied Wari and Tiwanaku were contemporaries of
   Cahokia; monsoon-marketplace had the Chola taxing straits they raided.
3. Writing: one Fable draft per lesson against the binding handoff
   (docs/fable-era-v-handoff.md), then a separate fresh-eyes Fable literary
   revision per lesson.
4. Adversarial review: two independent Opus 5 reviewers per lesson (fact
   attack with web verification of every claim, quote, and source link;
   craft attack against the forge spec and the byzantium-endures bar).
   Across the era they raised 37 blockers, 107 majors, and 144 minors.
5. Fix and re-verify: one Fable fix pass per lesson resolving every finding
   (or rejecting it with an audited justification), then an Opus verifier
   confirming each blocker and major was genuinely resolved; two lessons
   (recitation-in-the-desert, great-schism) needed a second round. Three
   residual nits were fixed by the release editor; two phantom findings and
   one question-overlap judgment call were dismissed on inspection.
6. Release: each lesson moved from an out-of-repo parking directory into
   data/lessons/ with its manifest line, full gate green at all thirteen
   commits. Browser QA passed locally and on the live site (reader, dossier,
   callbacks, sources, sequence chain, zero console errors).

## Representative catches the gate could never see

- A "c. 660" closure date attributed to Nicolai Sinai that appears nowhere
  in his article (his stated default is closure by 650 or earlier).
- Brahmagupta's division rules misstated: he left a/0 and 0/a as formal
  fractions; only 0/0 = 0 is his false rule, confirmed against Colebrooke's
  1817 edition, the very source the lesson links.
- Bulliet's conversion curves misdated by roughly a century and pinned to
  his name.
- "Byzantium lost Syria and Egypt within a decade" failing its own date
  arithmetic against Alexandria's 641 to 642 terms.
- PERF 558's layout inverted (the emir's name opens the Greek; the scribes
  sign at the bottom).
- Wagner's Su Shi reading and the stele, hoard, geniza, and feast-pit details
  aligned to their custodial records rather than to textbook paraphrase.

## Known follow-ups

- The header search dropdown collapses to a narrow strip (pre-existing app
  CSS, spawned as its own task; not a content issue).
- Era VI (The Woven World, c. 1100 to 1450 CE) is next: 15 core lessons plus
  25 seeds already audited in docs/graph-expansion-365.md.
