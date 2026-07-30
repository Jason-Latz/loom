# Fable handoff: citations in Loom lessons

Written 2026-07-30 for a fresh Fable session. Everything here is scoped work,
not exploration: read this, then build.

## What Jason asked for

> "investigate ways that we could integrate citations into each lesson, to make
> it more authoritative. maybe just footnotes? that lead to papers? or some other
> way? i want it to read clean still. add the citations on the back and on the
> frontend for era 1, in a proper and robust way"

Three requirements, in priority order:

1. **Authoritative.** A reader should be able to see what backs a specific claim,
   and click through to the paper.
2. **Still reads clean.** This is the constraint that kills naive footnoting. Loom
   is a ten-minute reading experience for a curious adult, not a journal article.
   A numeral after every sentence would wreck it.
3. **Proper and robust.** Versioned schema, a validator wired into the gate, and a
   documented update path (Jason's standing preference: build for the next
   version's data, not just this one's).

Scope for this pass: **Era I only, all 20 written lessons.** Do not touch Eras II
to V.

## Why the existing `deeper` array is not this

Every lesson already ends with `deeper`: exactly three curated objects shaped
`{ title, why, url }`, rendered under "If This Grabbed You". That is **further
reading**, an invitation to go deeper. It is not evidence, and it does not tell
the reader which claim rests on what.

Keep `deeper` exactly as it is. Citations are a new, separate apparatus. Overlap
between the two is fine and expected; some sources will appear in both.

## Recommended design

Investigate the alternatives yourself, but this is the shape I would build, and
the reasoning is worth having before you decide otherwise.

**Numbered superscript markers in the prose, which reveal the citation inline on
click, plus a numbered "Sources" apparatus at the end of the lesson.**

Why this and not the alternatives:

- **Plain endnotes** (marker jumps to a list at the bottom) break the reading
  position. Ten minutes of prose is short enough that a jump is disproportionate.
- **Tufte-style margin notes** are beautiful on a wide desktop reading column and
  genuinely suit the cartographer's-atlas aesthetic, but Loom had a full mobile
  pass and 375 px is a first-class target. Margin notes collapse badly, and
  supporting both is two code paths.
- **Hover tooltips** are desktop-only by nature; on touch they need a separate
  interaction anyway.
- **Inline reveal** is one code path that works identically at every width, needs
  no positioning math, cannot overflow, and is trivially keyboard accessible.
  Clicking a marker expands a small gloss directly beneath the paragraph.

Pair the inline reveal with the end-of-lesson Sources list so a reader who wants
the bibliography in one place has it, and so the apparatus degrades gracefully.

**Density is the thing to get right.** Cite load-bearing claims, not sentences.
Roughly 6 to 12 per lesson. The claims that earn a marker are: specific dates,
quantities and measurements, quotations, named scholarly debates, anything where
the lesson corrects a superseded view, and anything a skeptical reader would
reasonably doubt. Do not cite the composite character's sensory experience, do
not cite general background, and never cite the same source twice in one
paragraph.

## Backend: the data

### Schema

Add two optional fields to the `LOOM.lesson({...})` object. Optional matters:
48 lessons in Eras II to V have no citations and must keep passing the gate
untouched.

```js
LOOM.lesson({
  id: 'ochre-for-the-dead',
  citationsVersion: 1,
  sources: [
    {
      key: 'coqueugniot-2014',
      cite: 'Coqueugniot and colleagues, PLOS ONE 9(7): e102822 (2014)',
      url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0102822',
      kind: 'paper',
      doi: '10.1371/journal.pone.0102822',
      note: 'The 3D reappraisal that identifies the antlers as red deer.',
    },
  ],
  // ...
});
```

Field rules:

- `key` (required): kebab-case, unique within the lesson, stable. Referenced by
  the prose markers.
- `cite` (required): a human-readable label. Author, venue, year. Not a bare URL.
- `url` (required): https, and it must have been fetched and confirmed to host
  what `cite` claims.
- `kind` (optional): one of `paper`, `primary`, `book`, `institution`, `object`.
  Used for nothing today; present so a later version can group or icon the list.
- `doi` (optional): when one exists. Include it whenever the source is a paper.
- `note` (optional): one clause on what this source establishes. This is what
  the inline reveal shows.

`citationsVersion: 1` is the update path. When the schema changes, bump it and
the validator branches on it rather than guessing.

### Marker token in the prose

Use `[^key]` inline in `story` and `significance` strings, immediately after the
punctuation of the clause it supports:

```js
'Thermoluminescence and electron spin resonance put the lower layers near 92,000 years ago.[^hovers-2003]'
```

`[^key]` is markdown-familiar, unambiguous, trivial to strip, and impossible to
confuse with prose. The forge spec says to avoid markdown syntax inside prose;
this is a deliberate structured token rather than styling, so **update
`docs/forge-spec.md` to document it** as part of this work.

### Validator: `scripts/check.mjs`

The gate is the contract. Add these checks, and keep them silent for lessons with
no `sources` field:

1. `sources` is an array of 4 to 16 objects when present.
2. `key` unique within the lesson, matching `/^[a-z0-9]+(-[a-z0-9]+)*$/`.
3. `cite` and `url` present; `url` parses and is `https:`.
4. Every `[^key]` token in `story` or `significance` resolves to a declared
   source. An unresolved token is an error.
5. Every declared source is referenced by at least one marker. Orphans are an
   error: an uncited source belongs in `deeper`, not `sources`.
6. `citationsVersion` is `1` when `sources` is present.

**Critical: strip markers before counting words.** The existing word count runs
over `story.concat(significance)` and enforces 1500 to 2200. `[^hovers-2003]`
would count as a word and silently shift every lesson's count. Strip
`/\[\^[a-z0-9-]+\]/g` before `wordCount`, and verify the 20 Era I lessons report
the same counts after your change as before it. That is your regression test.

The existing `scanDashes` walks objects recursively, so it will cover `sources`
automatically once the field exists. Do not add a separate dash check.

## Frontend: the reading experience

This is the part that is Fable-only, and the part where the design actually
matters.

### Where to hook in

`js/reader.js`, in `openLesson()`. Today:

```js
l.story.forEach(function (p) { story.appendChild(h('p', null, p)); });
```

`h(tag, className, text)` sets `textContent`, so paragraphs are plain text. You
need a paragraph builder that splits each string on the marker token and
interleaves text nodes with marker buttons. Significance renders the same way one
block lower. Do not reach for `innerHTML`.

Number markers by **order of first appearance in the prose**, not array order.
That is the academic convention and it means the Sources list reads in the order
the reader met each source.

Add the Sources apparatus as its own `sec-head` section. Put it after "The
Threads" and before "Prove It to Yourself", so the evidence sits with the
substance rather than trailing the questions.

### Requirements

- **Marker:** a `<button>`, not a span. Small gilt superscript numeral. Needs a
  fingertip-sized tap target on coarse pointers, which the mobile pass already
  established a pattern for (see `--hit-r` in `js/map.js` and the coarse-pointer
  blocks in `styles.css`); a superscript numeral is far too small to tap
  unassisted.
- **Reveal:** `aria-expanded` on the button, `aria-controls` pointing at the gloss
  block. Toggling shows a small note beneath the paragraph: the number, the
  `cite` label, the `note` clause, and a link. Style it as a marginal gloss, not a
  callout box. A gilt left rule and a smaller size is enough.
- **Links:** `target="_blank"` with `rel="noopener noreferrer"`, matching how
  `deeper` already renders.
- **Theme:** must work in both palettes. `body.lamplight` flips to the night
  palette via CSS vars; use `--gilt`, `--ink-soft`, `--ink-faint` rather than
  literal colors.
- **Reduced motion:** the reveal can animate, but honor
  `prefers-reduced-motion`. The mobile pass set this precedent.
- **Mobile:** verify 375 px has no horizontal overflow. The body already sets
  `overflow-x: hidden`, so an overflowing gloss will clip silently rather than
  scroll. Check it explicitly.
- **No build step.** Plain script tags, globals, no modules, no fetch. It must
  work opened from `file://`. Do not change that.

## Content: the citations themselves

20 lessons. This is the part where a hallucinated URL or a misattributed paper
would be worse than having no citations at all, so it is the part to be slowest
about.

**Every citation must be fetched and confirmed.** Not search-snippet confirmed.
Open the URL, verify it hosts what you are claiming, and resolve the DOI or
publisher record before naming authors. This project has already been burned by
snippet-level author lists, and there is a source in the Era I briefs whose
recommended figure turned out to be captioned "(cast)" rather than the in-situ
photograph the brief promised.

**Twelve lessons have verified source maps already.** `docs/era-i-briefs/*.md`
section 7 lists, per lesson, every URL that was fetched and confirmed during the
forge run, with a note on what was verified about each. Start there; it is the
single biggest accelerator in this task. Those lessons are:

`first-of-our-kind`, `the-tended-fire`, `ochre-for-the-dead`, `ash-across-asia`,
`the-other-humans`, `crossing-to-sahul`, `beads-and-alliances`, `the-hollow-bone`,
`the-eyed-needle`, `wolf-at-the-fire`, `into-the-last-continents`,
`pots-before-the-farm`

**Eight lessons predate the briefs and need fresh research.** They have `deeper`
items but no per-claim source map:

`spark-of-mind`, `great-dispersal`, `firelight-economy`, `tribe-of-strangers`,
`paint-in-the-dark`, `world-the-ice-made`, `village-before-the-farm`,
`trap-of-seeds`

Prefer open-access URLs so a reader can actually read what they clicked. PMC,
PLOS, university repositories, and museum collection pages are better citations
than a paywalled publisher landing page. Where only a paywalled record exists,
cite it with the DOI and say so in `note`.

## Order of work

1. Design the schema and the marker token. Write the validator first, before any
   content, so the contract is enforced from the first lesson.
2. Build the renderer and the styling. Prove the reading experience on **one**
   lesson end to end (`ochre-for-the-dead` is a good candidate: it already
   carries a named debate, a superseded reading, and hedged claims). Screenshot
   it at desktop and 375 px, in both palettes, before scaling up.
3. Only then do the remaining 19 lessons' citations.
4. Update `docs/forge-spec.md` with the marker token, the `sources` schema, and
   the density guidance, so future forged lessons carry citations natively.

## Verification gate

Non-negotiable, per `CLAUDE.md`:

- `node scripts/check.mjs` prints `OK` with **0 warnings**. Warnings fail the
  release gate.
- Word counts for all 20 Era I lessons unchanged from before your edits. Capture
  them first.
- Browser QA: no console errors; markers render, reveal, and link; all citation
  URLs resolve; 375 px has no horizontal overflow; both palettes correct.
- Commit in small, narrowly-scoped commits (schema and validator, then renderer
  and styles, then citations per lesson or in small batches). Gate green before
  each.
- Deploys are manual. `vercel --prod --yes` publishes; forging or editing alone
  does not.

## Gotchas specific to this work

- **The gate cannot read English.** It will happily pass a citation that points at
  a real, live, authoritative paper that does not actually support the sentence it
  is attached to. Pair the content pass with an adversarial review that checks
  claim-to-source fit, not just link health.
- **`[hidden] { display:none !important }`** exists in `styles.css` because
  overlays set their own display. If you use `hidden` for the collapsed gloss,
  that rule already covers you; do not remove it.
- **Do not inflate word counts.** Adding a hedge to make a sentence citable costs
  words, and the lessons are already near the top of the 1500 to 2200 band.
  Several Era I lessons sit above 2150. If you add, cut elsewhere.
- **Browser QA caches hard.** The preview pane also reports
  `visibilityState: hidden` and never fires `requestAnimationFrame`. Refetch with
  `{cache:'reload'}` after editing, or you will QA stale code.
