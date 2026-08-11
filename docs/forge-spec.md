# The Forge Spec — how a Loom lesson is written

This is the style contract for every lesson in the atlas. The exemplar is
`data/lessons/spark-of-mind.js`; read it before writing, then match it.

## What a lesson is

Ten minutes of reading that makes one node of the graph unforgettable:
a human-scale story first, the zoomed-out significance second, the graph
connections third, then retrieval questions and pointers onward. The reader
is a smart adult with no history background and no patience for filler.
Treat every lesson as artwork: make the prose beautiful and engaging, the
pedagogy elegant, and the whole reading experience aesthetically coherent.

## Output format

One file: `data/lessons/<node-id>.js`, registering a single object:

```js
LOOM.lesson({
  id: 'node-id',                    // must match the graph node exactly
  readingMinutes: 10,               // honest estimate, usually 9-11
  storyContext: 'One italic line placing the scene: who, where, when.',
  story: [ /* 5-8 paragraphs, strings */ ],
  significance: [ /* 4-6 paragraphs, strings */ ],
  threadsOut: [                     // 3-5, usually mirroring the node's graph edges
    { to: 'other-node-id', why: 'One or two sentences: why these two nodes are one story.' },
  ],
  questions: [                      // exactly 5
    { type: 'recall',   prompt: '...', answer: '...' },
    { type: 'why',      prompt: '...', answer: '...' },
    { type: 'why',      prompt: '...', answer: '...' },
    { type: 'callback', prompt: '...', answer: '...', callbackTo: 'earlier-node-id' },
    { type: 'callback', prompt: '...', answer: '...', callbackTo: 'earlier-node-id' },
  ],
  citationsVersion: 1,
  sources: [                        // 4-16, every one cited by a marker below
    {
      key: 'hovers-2003',           // kebab-case, unique here, usually author-year
      cite: 'Hovers, Ilani, Bar-Yosef and Vandermeersch, Current Anthropology 44(4): 491 to 522 (2003)',
      url: 'https://...',           // https, and you opened it
      doi: '10.1086/375869',        // whenever one exists
      kind: 'paper',                // paper|primary|book|institution|object|dataset
      access: 'open',               // open|paywalled
      note: 'One clause on what this source establishes for this lesson.',
    },
  ],
  deeper: [
    { title: 'Author, Work', why: 'One clause on what it offers.', url: 'https://...' },
    { title: 'Institution, Source or object', why: 'One clause on what it reveals.', url: 'https://...' },
    { title: 'Author, Work', why: 'One clause on why it is worth the reader’s time.', url: 'https://...' },
  ],
});
```

Word budget: story + significance together 1,500-2,200 words. **This total is
the binding constraint**, it is what the gate measures, and it is what protects
the ten minute promise. The check gate warns outside that aim, and warnings fail
the release gate. The hard structural bounds are 1,100-2,900 words.

The per-section ranges below are shape guidance, not a second gate. A lesson
whose argument needs a long View from Above pays for it with a shorter story,
not with a longer lesson. Do not compress a section that is doing real work
just to sit inside its range while the total is comfortably in band.

## The story (5-8 paragraphs, 600-1,000 words)

- Cold open inside a scene, through one person's senses. No preamble, no
  "imagine, if you will." First sentence earns the next.
- Use a real, named person when the record allows. When it does not, build a
  composite from real archaeology or documents, and let `storyContext` say so
  plainly ("a composite drawn from the excavations at ...").
- Concrete and sensory: what the ochre smells like, what the tax tablet weighs.
  Specificity is the whole trick; generic scene-setting is the failure mode.
- The story must dramatize the node's core mechanism, not just decorate it.
  End the story at the pivot where the reader can feel the question "so what?"

## The View from Above (4-6 paragraphs, 600-1,250 words)

- Answer "so what?" with mechanisms, not vibes: why it happened there and
  then, what it caused, how we know.
- Be honest about scholarly uncertainty ("archaeologists still argue...").
  One named debate per lesson is a feature; hedging every sentence is not.
- Push against Euro-teleology. The reader should feel the whole planet.
- Tie explicitly to at least two of the four threads (ideas, power, wealth,
  craft) in words, since this is what the pigments on the chart mean.
- Land the last paragraph on why the modern world still carries this node.

## The Threads (3-5)

Mirror the node's graph edges (both directions welcome), each with a fresh
"why" sentence that does not repeat the edge label in the data file. It is
fine to include one thread the graph does not draw if the lesson earned it.

## Questions (exactly 5)

- 1 recall: a load-bearing fact from the lesson.
- 2 why: mechanism and counterfactual ("why there and not...", "what breaks
  if you remove...").
- 2 callback: reach back to EARLIER nodes in the main sequence (`callbackTo`),
  asking the reader to connect, compare, or contrast this lesson with one
  they have already read. Phrase them as comparisons, not trivia. For very
  early nodes with few predecessors, 1 callback + 3 why is acceptable.
- Answers teach: 2-4 sentences that would satisfy a curious reader, not a
  grading key. Never "see above."
- Shape the five questions as one elegant learning sequence, not five isolated
  checks.

## Citations (6-12 markers, 4-16 sources)

Every lesson carries per-claim citations. The reader meets a clean page; a
control at the head of the lesson raises a numbered gilt superscript on every
sourced claim, and the numbered source list at the foot of the lesson is always
visible. So the apparatus costs the prose nothing, and there is no reason to
write around it.

**The marker.** Put `[^source-key]` inline in `story` or `significance`,
immediately after the punctuation of the clause it supports, with no space:

```js
'they put the lower layers near ninety-two thousand years ago, give or take five thousand.[^hovers-2003]'
```

This is a structured token, not markdown styling, which is why it is the one
bracket syntax allowed inside the prose. The gate strips markers before it
measures anything, so citations never move a lesson inside the word band.

**What earns one.** Load-bearing claims, not sentences. Specific dates,
quantities and measurements; direct quotations; named scholarly debates and
named positions; anywhere the lesson corrects a superseded view; anything a
skeptical reader would reasonably doubt. Do not cite the composite character's
sensory experience, or general background a textbook would carry. Almost
everything belongs in significance; at most two markers in the story, and only
for hard excavated or documented facts.

Never cite the same source twice in one paragraph (the gate rejects it). The
same source in different paragraphs is expected. Overlap with `deeper` is fine:
`deeper` is invitation, `sources` is evidence.

**Verification is the whole job.** A real, live, authoritative paper attached to
a sentence it does not actually support passes the gate and is worse than no
citation at all. Open every URL. Resolve DOI metadata at
`https://api.crossref.org/works/<doi>` before naming authors, venue, volume or
pages. Never work from a search snippet. Prefer sources a reader can actually
read (PMC, PLOS, university repositories, museum records, official translations)
and mark anything else `access: 'paywalled'`. If you cannot verify it, drop it:
six solid citations beat twelve with one invented.

Write page ranges as "491 to 522"; the dash ban applies to these fields too, and
the gate scans them.

## Deeper (3)

New lessons should use exactly three clickable source objects shaped
`{ title: 'Author, Work', why: '...', url: 'https://...' }`. Legacy string
items remain supported, but do not use them when forging new work. Make each
title a tasteful, human-readable label rather than a bare URL, and verify its
author, title, edition, and other metadata against the linked record.

Use authoritative HTTPS links. Prefer primary texts and source objects from
their custodians, scholarly books or papers through publishers and DOI records,
and accessible syntheses from museums, universities, or comparable institutions.
When the evidence allows, make the three items one of each. Choose sources that
genuinely extend the lesson, and make each `why` clause an elegant invitation
rather than a database annotation.

## Voice and hygiene

- **Keep the prose clean** (Jason, 2026-08-11). The failure register for this
  atlas is prose that performs: chains of clipped fragments, metaphor stacked
  on metaphor, aphoristic poses ("The ridge is a road."), objects granted
  intentions ("The stone is only being persuaded to agree."). Jason has
  rejected that register by name. Write full, clear sentences. Let one
  concrete image do its work and stop; a metaphor must clarify something
  real, and most sentences need none. Where the exemplar's own style
  conflicts with this rule, this rule wins. Beautiful means clear, specific,
  and quietly vivid, never dense, clever, or breathless.
- Never use em dashes or en dashes anywhere; use commas, colons, periods,
  parentheses, or the word "to" in ranges. The check gate enforces this.
- **Write normal possessives and contractions.** Two forge agents once stripped
  every apostrophe from a whole lesson, apparently to protect their
  single-quoted JS strings, and shipped "the men shoulders" and "Aya girlhood".
  If a string needs an apostrophe, use a curly one (’, as the exemplar does) or
  escape it. The gate now fails any lesson whose prose has no apostrophe at all.
- Dates as "c. 9500 BCE", "1347 CE" on first use per section, bare after.
- No bullet lists inside story or significance; they are prose.
- No headers inside the arrays; the app renders section heads itself.
- Plain quotation marks and apostrophes are fine; avoid markdown syntax. The
  one exception is the `[^source-key]` citation marker, which is a structured
  token the reader never sees as text.
- Vivid is good, invented certainty is not. Composite characters are labeled;
  real quotes are real.

## Verify before you are done

```
node scripts/check.mjs data/lessons/<node-id>.js
```

must print `OK`. The orchestrator (not you, if you are a subagent) adds the
id to `data/lessons/_manifest.js`.
