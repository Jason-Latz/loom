# Era III Codex reconnaissance run

This run prepares evidence packets for every unwritten lesson in Era III. It
does not draft lesson prose. Claude Fable 5, or Claude Opus 5 as a fallback,
remains the author of every sentence that can appear in Loom.

## Model contract

Every reconnaissance worker is launched explicitly with
`-m gpt-5.6-luna`. Native `spawn_agent` currently rejects Luna in the installed
Codex runtime even though direct Luna sessions work, so this run uses pinned
Codex CLI workers. Preserve each worker's JSON event stream and confirm its
session metadata before accepting the packet.

Luna may gather, calculate, compare, classify, and flag. It must not write a
sample opening, scene, transition, lesson paragraph, question, `threadsOut`
sentence, or other prose that a premium writer could merely polish.

## Scope

### Batch A

- `zarathustra-fire`
- `book-of-songs`
- `pharaohs-of-kush`
- `wine-dark-song`
- `upanishadic-turn`
- `library-of-nineveh`
- `chavin-oracle`

### Batch B

- `star-diaries`
- `ionian-awakening`
- `scythian-gold`
- `carthage-ledger`
- `zapotec-dawn`
- `tragic-stage`
- `analects-of-confucius`

### Batch C

- `nok-terracotta`
- `sacred-disease`
- `panini-grammar`
- `dong-son-drums`
- `zhuangzi-butterfly`
- `garden-and-stoa`
- `euclid-elements`

## Packet contract

Write one compact file per node under `docs/era-iii-briefs/<id>.md`. Each file
must contain:

1. **Node contract:** the graph facts, outgoing targets, and any conflict or
   ambiguity already visible in the seed.
2. **Chronology:** explicit date comparisons needed to avoid false claims of
   contemporaneity.
3. **Evidence ledger:** 8 to 12 candidate sources at most. For each, record the
   exact claim it supports, what it does not support, access status, URL opened,
   DOI where applicable, and metadata checked against Crossref or the publisher.
4. **Debates and traps:** superseded dates, inherited myths, attribution
   hazards, teleological framings, and claims that should remain qualified.
5. **Scene evidence:** real people, objects, places, texts, excavated details,
   and sensory facts a premium writer may inspect. List evidence only. Do not
   turn it into narrative.
6. **Eligible callbacks:** only earlier manifested lessons, with the factual
   basis for a possible comparison. Do not write the question.
7. **Deeper candidates:** three to five authoritative, opened possibilities,
   ideally spanning a primary source or object, scholarship, and an accessible
   institutional synthesis.
8. **Open questions:** anything the packet could not verify or that the premium
   writer or Opus reviewer must resolve.

Never rely on a search snippet. Open every listed URL. Resolve every DOI before
naming authors, venue, volume, issue, or pages. Six strong sources are better
than twelve weak ones, despite the candidate ceiling above.

## Acceptance

The orchestrator checks all 21 files for scope, source accessibility, metadata,
unsupported certainty, callback eligibility, and accidental lesson prose. Any
semantic uncertainty is escalated to Terra or the premium writer. These packets
are scaffolding, never authority: finished lesson evidence and prose may correct
them.

## Pilot note

The three seven-node Luna workers completed the 21 packets with 21,215,835 input
tokens, of which 19,917,568 were cached, and 119,433 output tokens. That kept the
per-token model tier inexpensive but used more tokens than necessary because
each long-lived worker repeatedly carried an expanding research history.

For the next era, run one short-lived Luna worker per node at medium effort and
provide a compact machine-extracted context instead of the full exemplar and
unrelated lessons. Reserve high effort or Terra for specific disputed claims.
