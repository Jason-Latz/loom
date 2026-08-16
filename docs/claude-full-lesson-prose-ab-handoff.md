# Claude Handoff: Full-Lesson Prose A/B Pilot

## The commission

Create two complete, publishable prose candidates for Loom's existing lesson
`surgeons-papyrus`. This is a controlled A/B test of literary register, not a
request for another plan and not permission to replace the active lesson.

Both candidates must teach the same history, carry the same uncertainty, use
the same evidence, and satisfy the same lesson contract. They should differ in
one main respect:

- **Candidate A: clear-close-third.** Keep the narrative intimate, but favor
  explicit plot movement, plain mechanisms, and restrained imagery.
- **Candidate B: interior-close-third.** Keep the same plot movement and
  factual clarity, but allow the copyist's attention, judgments, knowledge
  gaps, and private logic to shape more of the narration through free indirect
  discourse.

Neither candidate is a deliberately weak control. Both should be good enough
to publish. Candidate B must not become more lyrical merely to make the
difference visible, and Candidate A must not become a textbook merely to make
Candidate B look alive.

Do not choose a winner. Do not announce which candidate you prefer before
Jason has read them. The purpose is to give Jason two honest full-lesson
experiences that differ enough to reveal what he actually prefers.

This handoff records the complete result of a prose workshop, two blind forward
tests, and a decision-level audit of the first test. Read it as an execution
brief. The factual and repository rules are binding. The literary guidance is
a set of suggestions and diagnostic tools, not a template every paragraph must
obey.

## Model assignment

Claude Fable 5 owns the lesson prose and substantive literary revision. If
Fable 5 is unavailable, Claude Opus 5 is the acceptable fallback. Do not pass
the actual drafting or sentence-level revision to a cheaper reconnaissance
model.

Research helpers may gather and verify evidence, but the premium writer must
open every source it ultimately cites and must make the final prose decisions.

If you use a separate reviewer, ask for a concise decision log or defect list.
Do not request or expose private chain-of-thought. The earlier audit discussed
below was a post-hoc account of priorities and choices, not hidden reasoning.

## Repository and current state

Run from the Loom repository root:

```text
/Users/jason/Downloads/CS Classes/Projects/Learning
```

At the time of this handoff, the full gate reports:

```text
OK: 365 nodes, 802 wires, 10 eras, 116 lessons. 0 warning(s).
```

The active lesson is:

```text
data/lessons/surgeons-papyrus.js
```

Do not edit it. Do not edit the lesson manifest, graph, application code,
project instructions, or release state. Write the candidates under `docs`,
which keeps the experiment outside the active lesson loader.

## Exact deliverables

Create this directory if it does not exist:

```text
docs/prose-ab/surgeons-papyrus/
```

Create exactly these four files:

1. `docs/prose-ab/surgeons-papyrus/shared-ledger.md`
2. `docs/prose-ab/surgeons-papyrus/candidate-a.js`
3. `docs/prose-ab/surgeons-papyrus/candidate-b.js`
4. `docs/prose-ab/surgeons-papyrus/parity-report.md`

Both JavaScript files must be complete, standalone `LOOM.lesson({...})`
objects with the real id `surgeons-papyrus`. They are not excerpts and not
diffs. A reader must be able to assess the entire lesson from opening scene to
questions and further reading.

The candidates may both register the same id because they will be validated
one at a time. Never load both in the same process.

Run:

```bash
node scripts/check.mjs docs/prose-ab/surgeons-papyrus/candidate-a.js
node scripts/check.mjs docs/prose-ab/surgeons-papyrus/candidate-b.js
node .agents/skills/loom-clear-prose/scripts/prose-metrics.mjs docs/prose-ab/surgeons-papyrus/candidate-a.js both
node .agents/skills/loom-clear-prose/scripts/prose-metrics.mjs docs/prose-ab/surgeons-papyrus/candidate-b.js both
```

Both single-file checks must print `OK` with zero warnings. The metric output is
diagnostic only. Never chop or pad sound prose merely to move a number.

Do not commit, deploy, update the manifest, or copy either candidate over the
active lesson.

## Read these files in this order

Read each file completely before drafting:

1. `CLAUDE.md`
2. `AGENTS.md`
3. `.agents/skills/forge-lesson/SKILL.md`
4. `.agents/skills/loom-clear-prose/SKILL.md`
5. `docs/forge-spec.md`
6. `data/lessons/spark-of-mind.js`
7. `data/eras/02-seeds-and-cities.js`, including the full node entries for
   `surgeons-papyrus`, `weighing-of-the-heart`, and every outgoing target
8. `data/lessons/surgeons-papyrus.js`
9. `data/lessons/_manifest.js`
10. Every complete earlier lesson used by a callback

The forge specification governs schema, sources, citations, chronology,
callbacks, and truth. The clear-prose skill supplies optional craft moves. If
the exemplar's style conflicts with the project's later instruction to keep
the prose clear, the later clear-prose guidance wins.

## Priority order

When goals compete, use this order:

1. Historical truth and honest uncertainty
2. Citation support and repository contract
3. Comprehension on one reading
4. Human presence and narrative pressure
5. Sentence music and beauty

Never save a lovely sentence by making a claim less exact. Never save an exact
claim by burying it in a sentence the reader cannot parse. Rewrite until both
survive.

## What remains identical across A and B

Build one shared truth ledger before writing either candidate. Use it for both.
The following should be identical or substantively identical across the two
files:

- `id`, `readingMinutes`, and `citationsVersion`
- historical claims and their degrees of certainty
- numerical values and dates
- direct quotations or translated formulae
- `sources`, including source keys, metadata, and evidence notes
- citation coverage and the claim supported by each marker
- `threadsOut` targets and historical relationships
- question types, callback targets, and the knowledge each answer teaches
- the three `deeper` destinations
- the distinction between documented manuscript features and reconstruction
- the lesson's central mechanisms and overall intellectual destination

To make the prose test as clean as practical, keep `sources`, `threadsOut`,
`questions`, and `deeper` byte-for-byte identical in A and B after their shared
factual audit. The primary comparison should live in `storyContext`, `story`,
and `significance`. If a prose change truly requires a different question
wording, record the exception in the parity report and make the same change in
both candidates.

Both candidates must be between 1,500 and 2,200 words across `story` and
`significance`, with 5 to 8 story paragraphs and 4 to 6 significance
paragraphs. They need not have identical word counts. Do not make length the
uncontrolled reason one version feels easier.

## What may differ

The candidates may differ in:

- narrative distance within close third person
- how often the copyist's judgments or questions enter the narration
- sentence boundaries and recovery beats
- paragraph rhythm and transitions
- the order in which already shared facts are disclosed, when citation scope
  remains unambiguous
- the amount of sensory texture, provided every image carries story work
- the wording of the story's controlling question and pivot into significance
- the cadence of analytical prose, provided the causal chain remains explicit

Do not vary viewpoint, factual completeness, research depth, source quality,
argument, and length all at once. That would produce two different lessons,
not a useful prose comparison.

## The target lesson

The graph seed calls this node **The Surgeon's Papyrus**, dated c. 1600 BCE,
in the craft and ideas threads. The current hook describes a scroll working
through forty-eight injuries from scalp to spine, with examination, diagnosis,
and three verdicts: treat, contend with, or not treat.

The lesson's central historical mechanisms are:

1. **A case architecture turns injury into transferable procedure.** The text
   repeatedly moves through heading, examination, diagnosis or words to say,
   verdict, and treatment.
2. **The three verdicts describe the practitioner's intended action.** The
   third verdict matters because the text records injuries the practitioner
   cannot cure and often will not treat.
3. **Observation remains valuable when treatment fails.** A case collection
   has room for failure in a way a recipe collection does not.
4. **Writing separates a technique from a particular pair of hands.** An older
   technical tradition could be copied, glossed, corrected, and used after its
   original vocabulary had become difficult.
5. **Empirical trauma care and incantation coexisted.** The useful distinction
   is not modern rationality suddenly defeating superstition. Visible causes
   invited examination and handling; invisible causes more often invited
   words. The same culture and manuscript could contain both.
6. **The surviving evidence is partial.** The copied treatise lacks its
   beginning and stops during the final surviving case. Its original date and
   authorship remain unresolved. There is no demonstrated line of transmission
   from this roll to modern triage.

The current lesson's story uses the anonymous copyist as the viewpoint. Keep
that basic choice unless the evidence audit makes it untenable. It is especially
suited to this test because the writer can dramatize transmission, exactness,
and incomplete understanding through the physical labor of copying.

## The known measurement problem

Do not inherit the current wording about the roll's length without resolving
it.

The active story says the roll is “better than five metres long.” Its source
notes also contain two measurements that refer to different states of the
object:

- the current institutional record gives the surviving roll as 4.68 metres;
- Breasted discusses an original length of at least five metres, apparently
  including lost material.

Open both sources and determine precisely what each number measures. Distinguish
the extant object from a reconstructed original length. If the distinction
cannot be stated cleanly and supported at the exact point of use, use the
secure 4.68 metre measurement for the surviving roll or write “nearly five
metres.” Record the decision in `shared-ledger.md` and `parity-report.md`.

This issue is important because the second blind test showed that matching the
current lesson is not enough. A polished rewrite can faithfully preserve an
old imprecision.

## Minimum evidence ledger

Independently verify the lesson's claims. At minimum, the shared ledger should
settle these items and name the source supporting each:

- the manuscript's date by palaeography and orthography
- the difference between the surviving copy and the unknown older treatise
- surviving length, number of sheets, recto columns, verso columns, and blank
  stretches, if used in prose
- the number of cases under Breasted's division and under later divisions
- the number and function of glosses
- the repeated case structure and exact status of its formulae
- the three verdicts and Breasted's interpretation of them
- the count of genuine “not to be treated” cases and what follows them
- Case 6's skull, brain, membrane, fluid, copper comparison, infant-crown
  comparison, and editorial restoration
- Case 31's symptoms, verdict, and absence of treatment
- Case 48's wording, interruption, remaining blank papyrus, and later verso
  material
- the one anomalous incantation within the trauma treatise
- the spells and prescriptions on the verso
- the first known medical descriptions claimed for the brain, meninges, and
  autonomic dysfunction, with the limits of each priority claim
- the purchase from Mustapha Agha Ayat, the later forged composite, and the
  recovery of the missing first column, if retained
- the state of the Imhotep attribution and the unknown date of the original
- the lack of demonstrated transmission to modern triage or later medical
  traditions

For each item record:

- atomic claim
- exact source key
- certainty or scholarly qualification
- whether the source was opened
- where the source supports the claim
- whether the claim belongs in story, significance, questions, or nowhere

Resolve every DOI through Crossref before stating article metadata. Open every
URL. Do not work from snippets, summaries, or source notes alone. The current
lesson is a research lead, not an authority.

## Truth and perspective ledger

The scene must keep two kinds of truth separate.

### Documented or materially evidenced

The current lesson treats the following as manuscript evidence, subject to
verification:

- an anonymous copyist existed
- black and red ink were used
- corrections appear above the line
- omitted words were hooked back into the text
- the text contains glosses for old language
- the treatise ends in a specific unfinished phrase
- the final strokes are conspicuously dark or broad
- blank papyrus remains
- additional texts were written on the verso
- more than one scribal hand may be distinguished

### Labeled reconstruction

The current `storyContext` identifies everything else about the copyist as
reconstruction. Under the forge contract, a plainly labeled reconstruction may
use modest, plausible connective action, sensory experience, and interior
response consistent with the documented setting. That permission is essential
to this test.

Examples of potentially permissible reconstruction include the resistance of
ink, the handling of a rush pen, heat, weights holding a roll, turning papyrus
toward light, fatigue, or a limited personal response to a comparison. Verify
material plausibility before using them. Keep them modest. Do not convert them
into claims about this particular copyist's biography, profession, motives,
memories, or private beliefs.

Never invent:

- a quotation and present it as historical speech
- a measurement or physical manuscript feature
- a named person's private thought
- a biography or relationship
- a causal historical claim
- a confident motive for the copyist or ancient practitioner
- a sequence the document contradicts

The first blind test accidentally imposed a stricter rule than this. It
therefore measured obedience to an artificial ban on reconstruction, not the
skill's ability to create good Loom prose. Do not repeat that mistake.

## The voice Jason is looking for

The desired register is close third person with some of the intimacy normally
associated with first person. Grammar remains *he*, not *I*, but the copyist's
attention determines what the narration notices, values, fears, understands,
or cannot imagine.

The useful combination is:

- Candidate A's explicit narrative spine
- Candidate B's deeper interiority
- concrete imagery that changes the story rather than decorating it
- small character-owned judgments when they arise naturally
- literal mechanisms stated fully enough that the reader does not have to
  reconstruct them
- sentence rhythm with occasional recovery beats and human asymmetry

The literary reference behind this investigation was Patrick Rothfuss's
*The Name of the Wind* and a longer multi-chapter sample supplied by Jason.
Use that material only to identify transferable craft principles. Do not
imitate Rothfuss's distinctive voice, syntax, images, phrases, character types,
or mannerisms.

The transferable observations were:

- A scene becomes readable when the reader knows who is attending to what.
- Concrete action usually arrives before reflection.
- Exact repetition can be clearer and more musical than synonym churn.
- Short sentences can provide recovery after a dense one.
- Paragraphs tend to have one main movement.
- Dialogue, thought, and narration can trade distance without losing the plot.
- A detail earns its place by revealing pressure, relationship, knowledge, or
  choice.
- The prose can attach a value judgment without explaining the associated
  feeling.

## What the model-voice research did and did not establish

There is no official, documented “Fable voice” that Anthropic intentionally
specifies. The original research therefore treated firsthand user reports,
especially Reddit discussions, as evidence about recognition rather than as
product documentation. Official prompting material can establish that model
behavior is steerable. It cannot tell us what readers mean when they say they
can recognize Fable or Opus prose.

The useful conclusion was not that every Fable or Opus response has one fixed
style. It was that readers notice a recurring cluster when a model is asked to
be literary: compressed aphorisms, balanced contrasts, atmospheric images,
abstract personification, ornamental triads, and conclusions that announce
their own resonance. Those devices can all appear in good human prose. The
recognizable effect comes from their frequency, polish, and weak connection to
the passage's actual work.

Do not try to solve this by telling Claude to “stop sounding like Claude.” That
instruction is neither precise nor testable. Solve it at the sentence and
paragraph level:

- make the plot recoverable;
- attach images to knowledge, pressure, or choice;
- let mechanisms remain literal;
- allow ordinary connective sentences;
- preserve useful asymmetry;
- remove a polished line when it performs no additional work.

Switching from Fable to Opus is not by itself a prose strategy. Either model
can produce cognitive overload or generic literary effects under the same
prompt. The A/B design exists to make the relevant craft decisions visible and
judge them in the finished lesson rather than infer quality from the model
name.

## Baseline cognitive-load diagnostics

The active lesson currently passes the forge gate, but its prose metrics show
why readability is a legitimate concern:

| Section | Words | Paragraphs | Sentences | Average sentence | P90 sentence | Maximum sentence | Sentences over 35 words |
|---|---:|---:|---:|---:|---:|---:|---:|
| Story | 950 | 7 | 49 | 19.4 | 42 | 56 | 6, or 12.2% |
| Significance | 989 | 6 | 42 | 23.5 | 37 | 68 | 6, or 14.3% |

The total is 1,939 words, which is comfortably inside the lesson band. Length
alone is not the problem. Several paragraphs carry too many relationships at
once. Story paragraphs average about 136 words. Significance paragraphs
average about 165 words, and the longest reaches about 235.

These measurements are pressure indicators, not a style target. The corrected
second blind test fell to 220 words across 16 sentences, averaged 13.8 words,
had a P90 of 27, and contained no sentence over 35 words. It still sounded
partly machine-made. Shortening sentences can reduce load; it cannot by itself
create a writer's mind on the page.

## Workshop findings to preserve

These examples were written during the workshop. They demonstrate mechanisms,
not reusable phrases. Do not transplant them into the papyrus lesson.

### Small judgments create a person

Jason strongly liked:

> The boy was learning. Good.

The second sentence does more than vary rhythm. *Good* belongs to the teacher's
standards and attention. It reveals approval and relationship without the
narrator explaining that the teacher felt proud.

This suggests a possible technique, not a requirement. Do not force a fragment
or an approving judgment into either candidate. Look for a moment where this
copyist would naturally distinguish a clean stroke from a bad one, a familiar
comparison from an unimaginable one, or an exact instruction from an obscure
word. If no judgment earns its place, omit it.

### State mechanisms; leave feelings available for inference

Jason liked the mechanism in:

> Kleitos had kept some of his teacher's lines, forgotten others, and added
> lines his teacher had never sung.

The useful feature is not the three-part cadence. It is that an actor and three
different verbs expose the entire process. A vague sentence such as *Some came
from his teacher* asks the reader to infer what *some* means, what changed, and
who changed it.

Keep a triad when three real operations matter. Cut it when three phrases are
only ornamental restatements of one idea.

### Interior thought needs a visible plot

Jason liked the more interior version of an earlier comparison, but noticed
that it could lose the plot. He preferred the version that directly named the
question: writing may preserve a performed song, but someone must decide which
version becomes the written one.

The same principle applies here. Free indirect questions can bring the reader
close to the copyist, but the reader should still be able to state what the
scene is about. The controlling problem might be that the copyist must preserve
instructions about injuries he has never seen, or that an exact manual can
carry observations beyond the person who made them. State the problem plainly
when the scene needs the anchor.

### An image must change something

Jason rejected:

> Beyond him the sea kept its own time.

It sounded literary while carrying no information, pressure,
characterization, or choice. Remove it and the story is unchanged. That is a
good test for the papyrus scene: if a furnace, ink cake, blank stretch, line of
red, or fold of papyrus can be removed without affecting what the copyist knows
or must do, the detail is probably atmosphere supplied by the narrator.

### Avoid compressed profundity

Jason rejected:

> His teacher's voice was gone from the world, except where it remained in him.

The sentence asks the reader to resolve a conceptual reversal before reaching
a simple fact. It sounds composed, but it has high cognitive overhead. State
literal facts in their natural order. Do not manufacture depth through a
paradox, an abstraction with intentions, or a sentence that partly retracts
itself.

## First blind forward test

A clean sub-agent with no workshop history was given the current papyrus
lesson, the forge rules, the prose skill, and an instruction to rewrite the
opening in two paragraphs. The prompt also said to use only scene-level details
directly supported by the existing lesson and not invent any new action,
thought, sensation, or object detail.

It produced:

> The copyist sets his rush pen to the roll in black ink. Before him lies a
> papyrus more than five metres long, sheet joined to sheet. He is several
> columns into an older trauma treatise. The line under his hand directs an
> unnamed practitioner to put his fingers into an opening in another man's
> skull and report what moves beneath them.
>
> The cases proceed in a repeated order: a heading names the injury; an
> examination begins, “If you examine a man having ...,” and tells the reader
> where to place a hand; then come words to say about the patient and a course
> of action. Here the wound gapes through a smashed skull and exposes the
> brain. The text compares the broken surface to corrugations on molten copper,
> while the tissue below throbs and flutters like the soft place on an infant's
> crown. A gloss lower in the column explains the old copper phrase: it means
> the scum a coppersmith skims away before the metal goes into a mould. The
> copyist preserves both the observation and the explanation.

The result was accurate-looking and easy enough to parse, but flat and visibly
machine-made. It positioned a camera, inventoried facts, and ended with an
abstract summary. The copyist could be removed without changing the paragraph.

The decision-level audit found that the writer had consciously prioritized:

- factual parity with the current draft
- exact two-paragraph shape
- avoidance of invention
- compact word count
- a summary sentence that named the preservation mechanism

Those priorities were reasonable under the prompt, but the prompt had quietly
made the forge contract stricter than it is. The writer therefore omitted the
physical and interior details that could make the copyist present. It retreated
to a safe museum-label register.

The lesson from this failure is not “add more imagery.” It is that truthfulness
needs the actual reconstruction boundary. When plausible interior response is
allowed, the writer should use it selectively to reveal a person's relation to
the facts. When it is not allowed, do not pretend that exterior camera
placement creates intimacy.

## Second blind forward test

The skill and forge instructions were corrected so that only hard constraints
bind and labeled reconstruction retains its real permission. A second clean
agent, again with no workshop history, produced:

> The black ink catches at the tip of his rush pen. He works it against the
> cake again until the stroke comes clean. Before him, weights hold down a
> papyrus roll more than five metres long, its sheets joined so neatly that he
> must tilt them toward the light to see the seams. He is already several
> columns in. The line under his hand tells a practitioner he will never meet
> to put his fingers into a hole in another man's head and report what moves.
> His task is simple only in appearance: preserve the instruction exactly.
>
> Nearly every case gives him the same path through an injured body. First
> comes a heading. Then an examination, beginning “if you examine a man
> having,” that tells the reader where to place a hand. The diagnosis and
> treatment follow. Here the wound gapes through the skull and exposes the
> brain. The text compares the broken surface to ridges on molten copper, then
> describes something beneath it throbbing like the soft place on an infant's
> crown. A gloss explains the copper image as the scum a worker skims away
> before pouring metal into a mould. That comparison is clear to him; he has
> stood near a furnace. A brain is different. He copies the words without
> knowing what the examining fingers would feel.

This version was materially closer. The furnace and brain create a useful
asymmetry between what the copyist knows and what he cannot know. The final
three sentences make him necessary to the passage. The concrete actions
support the historical mechanism of transmission.

It still contains recognizable AI residue:

- *His task is simple only in appearance* is a tidy thematic signpost. It tells
  the reader that complexity is coming instead of letting the action reveal it.
- *The same path through an injured body* is an elegant abstraction placed
  over a literal structure that can be stated more directly.
- Several sentences feel designed to be individually quotable.

Preserve what improved, especially the copyist's knowledge gap. Revise away the
signposts and polished abstractions that announce the writing.

## Common AI prose signatures to audit

Treat these as suspicions, not automatic bans. A line survives if it is the
clearest and most alive way to carry its actual work.

- generic atmosphere whose removal changes nothing
- an aphoristic or morally resonant landing after every paragraph
- balanced contrast that seems written for quotation rather than thought
- abstract nouns granted intentions, memory, hunger, patience, or agency
- a sentence that asserts an idea and then reverses or qualifies it into depth
- the exterior camera inventory: person, room, object, fact, abstract summary
- a historical person who could be deleted without changing the prose
- museum-label verbs such as *shows*, *reveals*, *demonstrates*, or *preserves*
  doing work that action could do
- vague placeholders such as *some*, *it*, or *they* where the reader must
  reconstruct actor and process
- automatic three-part phrases whose parts do not name distinct mechanisms
- a conspicuously polished sentence at every paragraph ending
- sentence lengths and syntactic patterns that repeat too evenly
- free indirect questions used as the only source of the plot
- emotions explained after a judgment or action already made them available
- tidy signposts such as *simple only in appearance*, *this was the moment*,
  *what mattered was*, or *the point was*
- narrator-supplied grandeur where an exact physical detail would suffice
- every sentence performing “literary prose” at once

One or two irregular, ordinary sentences can make a passage feel more human.
Do not sand away useful asymmetry, repetition, bluntness, or silence.

## Candidate A brief: clear-close-third

Candidate A should be the clearer and slightly more explicit of the two, but it
must still feel written by a person rather than summarized by a system.

Possible tendencies:

- State the scene's controlling problem early.
- Let each paragraph have one visible movement.
- Name actors and mechanisms directly.
- Prefer literal sequence before reflection.
- Use short recovery sentences after difficult anatomy or textual detail.
- Keep the copyist close through what he handles, recognizes, corrects, and
  cannot understand.
- Use fewer free indirect questions than B.
- Use imagery sparingly and make each image carry evidence, pressure, or a
  knowledge gap.
- In significance, make the causal structure unusually easy to follow without
  flattening debate or uncertainty.

Candidate A is not “plain style” in the sense of colorless style. Its beauty
should come from exact nouns, controlled rhythm, and the order in which facts
become legible.

## Candidate B brief: interior-close-third

Candidate B should move more often through the copyist's attention and private
logic, while retaining A's explicit plot spine.

Possible tendencies:

- Move from physical perception into thought without repeatedly saying *he
  saw*, *he knew*, or *he thought*.
- Let an occasional fragment or question belong to the copyist.
- Use small judgments to reveal standards, attention, or uncertainty.
- Let his familiarity with ink, copying, copper, or old words contrast with his
  distance from injured bodies.
- Make imagery arise from things he could plausibly encounter.
- Preserve simple causal sentences whenever the reader needs them.
- Do not make interiority the only place where the controlling problem appears.
- Do not increase metaphor density merely to distinguish B.
- In significance, retain analytic clarity. The View from Above does not need
  to remain in the copyist's viewpoint, and it should not become a second
  lyrical story.

Candidate B should feel closer, not foggier. If a reader loses the plot, it has
failed even if individual sentences sound beautiful.

## Suggested story movement

This is a possible architecture, not a required sequence. Change it if the
evidence and prose discover a better one.

1. **The physical task.** Ink, pen, roll, and one instruction about an opened
   skull. Establish what the copyist must do.
2. **The repeated case structure.** Let the reader feel how a technical form
   guides hand and attention. Place the copper and infant-crown comparisons
   inside the copyist's unequal knowledge.
3. **The three verdicts.** Make the third verdict plain and emotionally exact
   without telling the reader what to feel.
4. **The broken neck.** Show what the text records when it offers no treatment.
5. **The labor of transmission.** Corrections, glosses, dropped words, old
   vocabulary, and the limit between a copyist's exactness and a practitioner's
   experience.
6. **The unfinished spine case.** Let the physical interruption of the text
   carry the incompleteness.
7. **The verso.** Spells and remedies return on the other side of the same
   object. End at the question the View from Above must answer, without a
   prepackaged moral.

Do not force seven paragraphs if six or eight gives the lesson a better shape.
Do not end every movement with a miniature thesis.

## Suggested significance movement

The current significance is strong in substance but cognitively heavy. Its six
paragraphs average about 165 words, and its longest reaches about 235. Candidate
prose should make the argument easier to hold without losing its density.

A possible spine:

1. **Object history and survival.** Explain how the object reached the modern
   record and why its beginning is missing.
2. **Date, authorship, and textual age.** Separate the c. 1650 to 1550 BCE copy
   from the older, undated treatise. Explain glosses and reject the Imhotep
   certainty cleanly.
3. **The verdict mechanism.** Explain why first-person treatment categories
   amount to triage and why recording incurable cases changes the nature of a
   medical text.
4. **What examination could see.** Brain, spinal injury, autonomic symptoms,
   and the danger of priority claims. Tie craft and ideas to specific acts.
5. **The magic/rationality complication.** Use the anomalous incantation,
   visible and invisible causes, Ebers, and the verso without turning Egypt
   into a rehearsal for Greece.
6. **Inheritance without a false genealogy.** Explain what writing makes
   portable, state that no traceable line runs to modern triage, and land on a
   historically specific implication rather than a universal aphorism.

Give demanding claims room. Splitting a sentence is not simplification if it
preserves every relationship. A reader should not have to hold a date, an
editorial caveat, a scholarly attribution, and the paragraph's main causal
turn in one grammatical unit.

## Citation and source rules

- Carry 4 to 16 declared sources and 5 to 16 citation markers. Aim for 6 to 12
  markers.
- Keep every marker immediately after the punctuation of the supported claim.
- Never cite the same source twice in one paragraph.
- Use a source only if its URL was opened and the linked material supports the
  nearby claim.
- Source notes must say what the source establishes, not merely describe the
  source's topic.
- Resolve a DOI through Crossref before naming authors, journal, volume, issue,
  or pages.
- Preserve uncertainty around priority claims and disputed attribution.
- Do not cite reconstructed sensory experience as though the source recorded
  it.
- Do not let a citation attached to the end of a long sentence appear to
  support several claims the source addresses only in part.
- If prose revision changes a factual sentence, re-audit its citation after the
  prose pass.

The existing source slate is a starting point:

- Breasted's 1930 edition and commentary
- the Saxon Academy's current Papyrus Edwin Smith record
- van Middendorp, Sanchez, and Burridge's clinical reappraisal
- the Saxon Academy's Papyrus Ebers record
- the National Library of Medicine's object overview

Retain, replace, or add sources based on direct verification. Record every
change from the active source slate in the parity report.

## Questions, threads, and deeper reading

The full lesson still needs:

- 3 to 5 `threadsOut`
- exactly 5 questions
- the callback mix required by the gate for this node
- exactly 3 linked `deeper` objects

Mechanically verify that every callback target is earlier in the main sequence
and currently written in the manifest. Read the complete callback lesson before
writing the comparison. A callback must compare mechanisms, not ask trivia.

Keep these sections identical between A and B so they do not contaminate the
prose comparison. They should nevertheless receive one shared clarity pass.
Answers should teach in two to four sentences and should not repeat the same
sentence architecture five times.

## Drafting protocol

### Phase 1: research and shared architecture

1. Read the required files.
2. Open and verify the sources.
3. Build `shared-ledger.md` before drafting prose.
4. Resolve the roll-length problem and every other contradiction you find.
5. Define the shared argument, scene boundary, citation map, thread targets,
   question knowledge, and deeper links.

### Phase 2: Candidate A

Draft Candidate A from the evidence ledger and source material. Do not merely
line-edit the active lesson sentence by sentence. Preserve what is historically
and structurally strong, but allow the prose to find a cleaner order.

Run the single-file gate and prose metrics. Then perform a factual audit of
every changed sentence.

### Phase 3: Candidate B from the ledger, not from A

Start Candidate B in a fresh context if the environment permits it. Give the
writer the shared ledger, the target files, this handoff, and the Candidate B
brief. Do not give that drafting context Candidate A's prose. This keeps B from
becoming a thesaurus paraphrase of A.

If a separate context is impossible, close Candidate A, reread the ledger and
source material, and draft B from a blank file. Do not transform A line by
line.

Run the same validation and factual audit.

### Phase 4: parity review

Compare A and B at the level of atomic claims, citations, certainty, section
function, paragraph movement, and word count. Repair any accidental content
advantage. B must not know more than A. A must not be more carefully cited than
B.

### Phase 5: literary review

Read each candidate aloud, separately. Audit for:

- one-reading comprehension
- explicit narrative spine
- character-owned attention
- useful knowledge gaps
- functional imagery
- sentence recovery after dense material
- repeated cadences
- generic atmosphere
- conceptual reversals
- abstract paragraph landings
- museum-label summary
- passages where the person can be removed
- overexplained emotion
- unsupported reconstruction

Revise only the problems actually present. Do not make either lesson satisfy
every item in the clear-prose skill.

### Phase 6: final source audit

Re-open the sources for every substantive sentence changed during literary
revision. The final prose pass can introduce overstatement even when the first
draft was accurate.

## `shared-ledger.md` format

Use these headings:

```markdown
# Shared Evidence and Perspective Ledger

## Controlling question
## Lesson mechanism
## Atomic factual claims
## Measurements and dates
## Quoted or translated formulae
## Scholarly uncertainty
## Citation map
## Documented scene details
## Permitted reconstruction
## Forbidden inference
## Shared story movement
## Shared significance movement
## Shared threads, questions, and deeper links
## Conflicts resolved
## Open cautions
```

For atomic claims, use a table with these columns:

```text
Claim | Certainty | Source key | Opened | Exact support | Planned location
```

For perspective details, use:

```text
Detail | Documented or reconstructed | Why permissible | Candidate use
```

## `parity-report.md` format

Keep the report concise enough that it does not become a third essay. Use:

```markdown
# Surgeon's Papyrus A/B Parity Report

## Validation
## Word and cadence diagnostics
## Shared factual core
## Controlled difference
## Source changes
## Measurement decision
## Reconstruction disclosures
## Claim or citation differences
## Known prose risks in A
## Known prose risks in B
## Blind-reading instructions
```

Under **Claim or citation differences**, write `None` if parity is exact. If it
is not exact, list every difference and repair it unless it is unavoidable.

Under **Known prose risks**, name lines or tendencies that remain uncertain.
Do not score the candidates and do not name a preferred one.

## Blind-reading instructions for Jason

End the parity report with these instructions:

1. Read one candidate in full without reading the parity report's prose-risk
   sections.
2. Wait long enough that sentence-level memory is not carrying the comparison.
3. Read the other candidate.
4. For each one, answer the same questions before deciding which prose is more
   attractive.

Use this scorecard:

| Dimension | Question |
|---|---|
| Plot | Could I state the story's controlling problem after one reading? |
| Person | Did the copyist feel necessary, or could he be removed? |
| Mechanics | Did I understand how the case format, verdicts, and copying worked? |
| Load | Where did I have to reread? |
| Imagery | Which images changed understanding, and which were decoration? |
| Trust | Did any sentence sound profound before it became clear? |
| Rhythm | Did the prose breathe, or did it feel uniformly composed? |
| Memory | What fact, scene, or question remained ten minutes later? |
| Preference | Which lesson would I voluntarily keep reading? |

The strongest result may combine parts of both candidates. The test is intended
to reveal those parts, not force a binary verdict.

## Hard repository and prose rules

- No em dashes or en dashes anywhere in the lesson object, including source
  metadata and date ranges.
- Use normal possessives and contractions. Curly apostrophes are welcome in
  single-quoted JavaScript strings.
- `story` must contain 5 to 8 paragraphs.
- `significance` must contain 4 to 6 paragraphs.
- `story` plus `significance` must contain 1,500 to 2,200 words.
- `threadsOut` must contain 3 to 5 valid targets.
- `questions` must contain exactly 5 items in the required mix.
- `deeper` must contain exactly 3 clickable objects.
- Every source must be used, and every citation marker must resolve.
- Use no headers, bullet lists, or Markdown inside story and significance.
- `storyContext` must plainly label reconstruction.
- Never invent quotations, measurements, document features, biographies,
  motives, or historical causal claims.
- Preserve the difference between the surviving copy and the lost original.
- Preserve meaningful scholarly uncertainty.
- Do not claim direct transmission to modern medicine without evidence.
- Do not edit the active lesson or manifest.
- Do not commit or deploy.

## Definition of done

The commission is complete when:

- the shared ledger exists and records direct source verification;
- both complete lesson files exist outside the active lesson directory;
- both candidates pass the single-file gate with zero warnings;
- both candidates remain within the target word band;
- A and B carry the same factual and citation ledger;
- the roll-length conflict is resolved explicitly;
- every reconstruction is disclosed and modest;
- A is clear and close without becoming reportorial;
- B is more interior without losing the plot;
- neither candidate contains generic lyrical atmosphere or compressed
  profundity merely to sound written;
- the parity report names differences and risks without choosing a winner;
- no production file has changed.

The standard is not “less AI-sounding” as a surface effect. The standard is a
lesson whose clarity comes from a mind attending to exact things, whose beauty
comes from the movement of real knowledge, and whose reader never has to choose
between understanding the history and enjoying the prose.
