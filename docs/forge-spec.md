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
  deeper: [ /* 3 strings: named books/works with one clause on why */ ],
});
```

Word budget: story + significance together 1,500-2,200 words. The check gate
warns outside that aim, and warnings fail the release gate. The hard structural
bounds are 1,100-2,900 words.

## The story (5-8 paragraphs, 600-950 words)

- Cold open inside a scene, through one person's senses. No preamble, no
  "imagine, if you will." First sentence earns the next.
- Use a real, named person when the record allows. When it does not, build a
  composite from real archaeology or documents, and let `storyContext` say so
  plainly ("a composite drawn from the excavations at ...").
- Concrete and sensory: what the ochre smells like, what the tax tablet weighs.
  Specificity is the whole trick; generic scene-setting is the failure mode.
- The story must dramatize the node's core mechanism, not just decorate it.
  End the story at the pivot where the reader can feel the question "so what?"

## The View from Above (4-6 paragraphs, 600-950 words)

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

## Deeper (3)

Named, real works: author + title + one clause on what it offers. Vary the
kind (a trade book, a scholarly work, a primary source or site). Prefer
authoritative editions, DOI records, publisher pages, museums, and primary
sources. Include a direct link or concise citation when it fits tastefully.

## Voice and hygiene

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
- Plain quotation marks and apostrophes are fine; avoid markdown syntax.
- Vivid is good, invented certainty is not. Composite characters are labeled;
  real quotes are real.

## Verify before you are done

```
node scripts/check.mjs data/lessons/<node-id>.js
```

must print `OK`. The orchestrator (not you, if you are a subagent) adds the
id to `data/lessons/_manifest.js`.
