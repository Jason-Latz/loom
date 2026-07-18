# Fable Handoff: Loom, Era IV

## The commission

Write the nine lessons of Loom’s fourth era, Empires & Faiths, as finished
literary nonfiction. These lessons must be historically responsible, sensuous,
intellectually alive, and beautiful enough to reward slow reading. Accuracy is
the floor. The aim is to let a reader feel a mechanism of history working, then
give that feeling enough structure to become durable understanding.

This is an execution brief, not a request for another planning pass. The graph
architecture, chronology, source reconnaissance, factual audit, and callback
design have already been prepared. You own the prose. Make it better than the
brief. Do not merely expand the node summaries into longer paragraphs.

The division of responsibility is deliberate:

- Fable owns every sentence of lesson prose and the substantive literary
  revision that follows the first draft.
- Codex owns graph architecture, chronology, research scaffolding, adversarial
  fact review, manifest updates, commits, release validation, and deployment.
- Fable must not edit the graph, manifest, application code, project
  documentation, or release state.

Fable is trusted to research and judge facts, not merely decorate Codex’s
conclusions. The source maps and factual traps below are a strong starting
scaffold, not a cage. If better evidence changes a date, scene, mechanism, or
scholarly balance, follow it, cite it, and explain the change in the completion
report. Do not preserve this handoff’s wording to avoid disagreeing with it.

The corrected graph is currently green:

- 129 permanent nodes
- 273 forward wires
- 10 eras
- 34 existing lessons
- 0 gate warnings

Era IV now contains nine lessons. Two old seeds were moved because their dates
were indefensible: gupta-zero now belongs in Era V at 628 CE, and
pacific-navigators now belongs in Era VI at about 1200 CE. Do not write either
one as part of this commission.

## Read these before writing

Read all of the following in the repository before beginning:

1. AGENTS.md
2. docs/forge-spec.md
3. data/lessons/spark-of-mind.js
4. data/lessons/ashoka-wheel.js
5. data/eras/04-empires-and-faiths.js
6. The entries for every future node named in an Era IV edge
7. data/lessons/_manifest.js, only to understand which earlier lessons exist
8. The complete earlier lesson behind every callback proposed below, not only
   its graph summary. These are qin-hammer, hundred-schools, bronze-web,
   alexanders-comet, athens-demokratia, crown-of-cyrus, israel-one-god,
   ashoka-wheel, uruk-first-city, indus-enigma, iron-and-alphabet,
   sea-peoples-collapse, horse-and-wheel, and code-of-hammurabi. Read any other
   backward node in full before adding it to threadsOut.

The forge specification is binding. This document adds research and artistic
direction; it does not relax the specification.

If a claim in this handoff conflicts with the corrected graph, stop and inspect
the local graph. If a source complicates this handoff, follow the source and
write the complication honestly. Never preserve a convenient sentence at the
expense of the evidence.

## Exact deliverables

Create these nine files in this order:

1. data/lessons/han-mandate.js
2. data/lessons/silk-road-pulse.js
3. data/lessons/roman-republic-breaks.js
4. data/lessons/pax-romana-machine.js
5. data/lessons/jesus-to-constantine.js
6. data/lessons/teotihuacan-maya.js
7. data/lessons/bantu-and-aksum.js
8. data/lessons/steppe-hammer.js
9. data/lessons/byzantium-endures.js

Do not edit data/lessons/_manifest.js. Codex will add the lessons to the
manifest one at a time after review so that every intermediate commit remains
valid.

For each file, run:

    node scripts/check.mjs data/lessons/<node-id>.js

Do not run the full gate as your completion test. Unmanifested new files make
the full release gate fail by design. Codex will run it during integration.

When all nine files are ready, report:

- each file written
- story plus significance word count for each
- the single-file check result for each
- any historical claim you deliberately softened or omitted
- any source candidate you replaced, with the reason
- any scene detail that remains an explicit reconstruction
- optional replacement hook or summary copy for a node if the finished lesson
  reveals a more beautiful formulation. Do not edit the graph yourself. Keep
  any proposed summary between 40 and 80 words so Codex can review and apply it.

## The file contract

Every file must register exactly one LOOM.lesson object with:

- the permanent node id
- readingMinutes: 10
- a storyContext string
- story: 5 to 8 prose paragraphs
- significance: 4 to 6 prose paragraphs
- threadsOut: 3 to 5 objects
- questions: exactly 5 objects
- deeper: exactly 3 clickable source objects

Story and significance together must total 1,500 to 2,200 words. Aim near
1,600 to 1,850. A lesson should feel ample but shaped, never padded.

The five questions must be:

- 1 recall question about a load-bearing fact
- 2 why questions about mechanism, causation, or counterfactual pressure
- 2 callback questions reaching only to earlier nodes in the main sequence

Each answer should teach in 2 to 4 sentences. Shape all five into a progression:
fact, mechanism, complication, comparison, synthesis.

The three deeper items must use this object shape:

    {
      title: 'A human-readable author and title',
      why: 'An elegant clause explaining what the reader will find there.',
      url: 'an authoritative HTTPS source URL',
    }

Verify the author, title, edition, paper metadata, and destination before using
any source in the finished lesson. The links below are researched candidates,
not permission to skip opening them.

## Nonnegotiable hygiene

- No em dashes or en dashes anywhere. Use periods, commas, colons,
  parentheses, or the word to in date ranges.
- Use normal possessives and contractions. Curly apostrophes are welcome and
  make single-quoted JavaScript easier.
- Label composite characters and reconstructed scenes plainly in storyContext.
- Never invent a quotation, private thought, gesture, smell, room, or sequence
  and let the reader mistake it for documented fact.
- A real historical person does not make an invented scene real. Distinguish
  what the source attests from what the prose reconstructs.
- Give dates with BCE or CE on first use in each section.
- Do not place headings, lists, markdown, or citations inside story and
  significance arrays. The reader renders the section headings.
- Use exactly three clickable deeper objects, not strings.
- Call uncertainty by its name once and clearly. Do not fog every sentence
  with timid qualifiers.
- Before calling two people or events contemporaneous, calculate their dates.
- Do not name scholarly authors from search snippets. Resolve the publisher,
  journal, DOI, or institutional record.

## The literary bar

Loom is artwork. A merely competent survey entry is a failure.

The prose should have sentence music, but it must never perfume an empty claim.
Let beauty come from exact nouns, physical action, controlled rhythm, and the
clean unveiling of a difficult idea. Prefer one image that deepens across the
lesson over a cupboard of metaphors opened once each.

The cold open must place the reader inside pressure. Someone wants something,
fears something, waits for something, counts something, carries something, or
must decide. Atmosphere alone is not a scene. The scene must dramatize the
historical mechanism:

- a proposal opens one narrow route toward office
- an embassy failure becomes a map
- a lawful veto becomes a weapon
- a report after a city fire exposes the reach and controls of a thin state
- an emperor’s baptism reveals the ambiguity of patronage
- different archives make different kinds of rulers visible
- words and coins preserve two unrelated maps of African motion
- a border sorts refugees into recruits, dependents, enemies, and settlers
- a dome makes taxation, law, labor, and sacred authority visible at once

Write with restraint. Avoid the museum-audio-guide voice, the textbook drumbeat,
and the false grandeur of announcing that everything changed forever. Do not
tell the reader a scene is extraordinary. Arrange the facts until the reader
feels why it is.

Vary the movement across the nine lessons. Not every story should be one
composite artisan walking through a workday. Use a memorial, a return, a
political killing, an exchange of letters, a ritual, a paired city portrait, a
diptych, a frontier crossing, and an architectural encounter. The era should
feel composed, not templated.

Each lesson needs a governing image or verbal motif, used lightly:

- Han: a proposal that opens one route to office
- Silk Roads: an object passing from hand to hand
- Republic: legitimate tools turned into weapons
- Roman cities: cooling ash and a request about future organization
- Christianity: purple refused, a white couch, and power not washed away
- Teotihuacan and Maya: public silence beside speaking stone
- Bantu languages and Aksum: histories reconstructed from speech and royal
  claims struck in metal
- western Rome: a border changing from line into relationship
- eastern Rome: light held aloft by hidden structure

Do not force these motifs into every paragraph. Let each return at the hinge or
ending with a changed meaning.

The story should end where the reader can feel the question that significance
will answer. The significance should not retell the story. It should rise:
evidence, mechanism, debate, consequence, inheritance. Its last paragraph
should return to the opening image without flattening the history into a moral.

Preserve Era III’s precision and candor. Improve cadence, compression, image
control, transitions, and structural unity without weakening evidentiary
precision or candor about reconstruction.

## The architecture of the era

The era runs from about 141 BCE to 565 CE. Its subject is not simply the rise
and fall of empires. It asks how institutions, objects, beliefs, and identities
travel beyond the people who first made them.

The sequence has a deliberate movement:

1. Han rule shows that durable states are repertoires, not formulas.
2. The Silk Roads show that connection is made by relays and local actors, not
   one civilizational highway.
3. The Roman Republic shows institutions becoming instruments of escalation.
4. The early empire shows a thin center resting on cities, hierarchy, and
   negotiation.
5. Christianity shows a community transformed by imperial favor even as it
   transforms the language of empire.
6. Teotihuacan and the Maya break any Eurasian monopoly on urban and political
   invention, while showing how archives bias what power looks like.
7. Bantu language histories and Aksum form an explicit African diptych about
   movement and connection, not a false causal bundle.
8. Western Roman transformation shows migration interacting with extraction,
   civil war, recruitment, settlement, and provincial loss.
9. Eastern Rome closes the era as a living society, not a warehouse between
   classical Rome and somebody else’s renaissance.

Across the era, keep returning to a quiet question: what allows a form of order
to outlive its maker? The answers differ. Law, reputation, roads, letters,
ritual, script, language, coin, tax, and memory all carry power. None carries
it unchanged.

Avoid a Rome-heavy center of gravity. Rome occupies several nodes because its
transformations are graphically connected, but the reader should never feel
that Han China, Central Asia, Mesoamerica, or Africa are side rooms in a Roman
story. Each lesson owns its world.

## Lesson 1: han-mandate

### Graph target

- Title: The Han Art of Rule
- Date: c. 141 to 87 BCE
- Threads: power, ideas
- Outgoing graph edges: silk-road-pulse, tang-golden-network

The central claim is that Han government was a changing repertoire. It joined
Qin institutions to classical argument, ritual, cosmology, recommendation,
law, taxation, monopoly, patronage, and remonstrance. It was not a Legalist
machine merely dressed in Confucian robes, and it was not yet the mature open
examination state.

### Preferred scene

Begin in 124 BCE with Gongsun Hong’s proposal to establish students for the
imperial erudites, or with one explicitly reconstructed Academy candidate
inside that route. The dramatic object is not a modern examination paper. It is
a proposal that makes one narrow path from study toward junior service more
legible. Do not turn recommendation, clerical apprenticeship, summons, kinship,
patronage, and Academy study into successive stages every candidate passed.
They were distinct and sometimes overlapping routes, to be contrasted later.

The record does not preserve an eyewitness room with complete dialogue.
storyContext must say which people, proposal, date, and institutions are real,
and which sensory or interpersonal details are reconstructed.

An alternate or secondary scene is the Salt and Iron debate of 81 BCE, where
officials and learned critics argued over monopolies, frontier war, revenue,
and moral rule after Emperor Wu. This is outside the node’s ruler-centered date
but is a superb consequence scene. It can reveal that the Han repertoire
contained argument rather than one settled ideology. The surviving Discourses
on Salt and Iron is a later literary compilation, not a transcript. Use this
scene only after adding a verified edition or scholarly source.

### Story movement

Let the first half follow the proposal or one Academy route. Let the second
contrast everything that route did not replace: birth, wealth, clerical
apprenticeship, patronage, court summons, local ties, and political need. The
pivot should come when classical learning stops looking like a soft covering
and becomes an institutional language through which officials can justify,
criticize, and sometimes redirect power.

Do not give the reader an exam hall. Do not make anonymous merit displace blood.
The tension is more interesting: a ruler strengthens central command by
cultivating a language in which educated men can tell a ruler he is wrong.

### Significance spine

1. Establish the Qin inheritance: commanderies, statutes, records, officials,
   extraction, and central command.
2. Explain recommendation, the Imperial Academy, erudites, limited testing,
   clerical service, summons, family, and patronage as distinct routes.
3. Name the debate over labels such as Confucian and Legalist. They are useful
   if treated as plural, retrospective traditions rather than cabinet
   departments.
4. Show how power and ideas interlocked. Classical learning legitimated the
   throne while giving remonstrance and moral judgment an authorized language.
5. Trace the inheritance to Tang without claiming two thousand years of an
   unchanged formula.

### Factual traps

- No open keju system in the Han.
- No staffing by men who simply passed a competitive civil service exam.
- No clean replacement of kinship and patronage by merit.
- No timeless Confucian formula rerun unchanged for two millennia.
- No claim that Han invented bureaucracy or recruitment on earth.
- Do not make Confucianism and Legalism coherent, mutually exclusive agencies.
- The Imperial Academy and recommendation matter, but neither proves a modern
  meritocracy.

### Threads and callbacks

The threadsOut section should include silk-road-pulse and
tang-golden-network. It may also include qin-hammer and hundred-schools if the
sentences add insight rather than duplicate the callbacks.

Use these two earlier callback nodes:

- qin-hammer: Qin sought legibility through standards, registers, law, and
  command. What changes when the successor state adds moral cultivation and
  remonstrance without surrendering coercion?
- hundred-schools: Warring States thinkers argued about how order should be
  made. What happens when a court turns part of that argument into curriculum,
  office, and a language for criticizing rule?

The answer to the first should resist kindness replacing cruelty. The answer to
the second should show philosophy becoming institution while remaining an arena
of contest.

### Source slate

1. [Dong Zhongshu, The Responsibilities of Rulership, from Luxuriant Gems of the Spring and Autumn Annals](https://afe.easia.columbia.edu/ps/cup/dongzhongshu_rulership.pdf)
   is excerpted in Sources of Chinese Tradition, compiled by Wm. Theodore de
   Bary and Irene Bloom. It offers a normative voice on Heaven, education,
   moral transformation, and rule. Do not use it as evidence for administrative
   practice or settled state orthodoxy.
2. [Hans Bielenstein, Civil Service Recruitment, chapter 6 of The Bureaucracy of Han Times](https://www.cambridge.org/core/books/abs/bureaucracy-of-han-times/civil-service-recruitment/9334C1BD771968D5690197868D38DF38)
   is the essential scholarly check against examination anachronism.
3. [Department of Asian Art, The Metropolitan Museum of Art, Han Dynasty, 206 B.C. to 220 A.D.](https://www.metmuseum.org/ja/essays/han-dynasty-206-b-c-220-a-d)
   supplies an accessible object-rich synthesis and a route into the material
   world of Han authority.
4. [Sima Qian, Records of the Grand Historian: Han Dynasty, translated by Burton Watson](https://search.worldcat.org/ja/title/Records-of-the-grand-historian.-Han-dynasty/oclc/781073737)
   is a bibliographic route to a modern published translation. Verify that the
   edition in hand includes Shiji 121.3118 to 3120 before using the proposal.
   A catalog record is not a substitute for reading the passage.
5. [Michael Nylan, Textual Authority in Pre-Han and Han](https://www.cambridge.org/core/journals/early-china/article/abs/textual-authority-in-prehan-and-han/D9EC76D8A0B5DA0FB512291F13A9596C)
   identifies the proposal passage and shows how little is known about the
   Academy tests. Use it to keep the scene narrow.

### Artistic challenge

Make administration feel human without making it modern. The lesson succeeds
if a proposal opens one narrow route toward office while revealing the many
other judgments and dependencies that still shape whom the state can see.

## Lesson 2: silk-road-pulse

### Graph target

- Title: The Silk Roads, Hand to Hand
- Date: c. 130 BCE to 200 CE
- Thread: wealth, with power and ideas made explicit in significance
- Outgoing graph edges: tang-golden-network, genghis-exchange

The central claim is that Eurasian connection was usually segmented and made
by many local actors. Han action intensified older routes; it did not open a
single road between self-contained China and Rome.

### Preferred scene

Begin with Zhang Qian returning to the Han court around 126 BCE after capture,
escape, travel, and a diplomatic mission that failed in its stated purpose. He
did not persuade the Yuezhi to ally against the Xiongnu. What he carried home
was knowledge: routes, polities, horses, goods, distances, possibilities. A
failed embassy became a map in the court’s mind.

The transmitted accounts are not a stenographic record of one audience. Make
that clear in storyContext. Do not invent a speech and present it as Zhang
Qian’s own words.

After the return, the safest structure is Zhang Qian plus one documented gift
or exchange mechanism dated inside this node. Expand into a multi-handoff
object itinerary only if every transfer type derives from a separately cited
document, object, or archaeological context. storyContext must identify such
an itinerary as a composite, and the prose must not imply that one surviving
bolt followed the whole chain. Do not insert a Sogdian merchant into this early
period without specific dated evidence; the strongest Sogdian merchant archive
is later.

### Story movement

Begin with failure, not discovery. Widen from one traveler’s report into a
world of older routes and new state attention. Then let the object escape every
attempt to call the network one road. It should change purpose as it changes
hands: payment, prestige, gift, textile, ritual object, stored value.

End when the object is no longer merely silk. It has carried obligations,
stories, styles, and risk. That is the pivot into significance.

### Significance spine

1. Explain older steppe, oasis, mountain, South Asian, and maritime routes.
2. Show what Han campaigns, garrisons, embassies, gifts, and demand changed.
3. Explain segmentation without making it absolute. A few people traveled far;
   most goods and information moved through relays.
4. Restore Central Asian peoples as political and commercial actors.
5. Show wealth, power, and ideas moving together, including Buddhism through
   both overland and maritime routes.
6. Treat disease connection carefully. General exposure is plausible; a named
   epidemic needs case-specific evidence.

### Factual traps

- Zhang Qian did not invent or open the Silk Road.
- Use Silk Roads as a useful modern shorthand, not an ancient road name.
- Usually relayed is defensible. No one ever traveled far is not.
- Silk was not the only commodity and not always the main one.
- Pliny’s complaint about eastern luxury is gendered Roman moral rhetoric, not
  an audited silk deficit and not proof Rome bled silver to death.
- Do not make Central Asia scenery between China and Rome.
- Buddhism reached China through plural land and sea routes.
- Do not describe the Mongol era as one seamless protected highway.

### Threads and callbacks

Include tang-golden-network and genghis-exchange in threadsOut. Strong
additional threads are han-mandate and bronze-web.

Use these earlier callbacks:

- bronze-web: Bronze Age exchange also moved materials through far-reaching
  networks. How does a relay change what it means to call a network connected?
- alexanders-comet: Alexander’s conquest created political corridors and
  Hellenistic contacts. How is connection made differently when no one empire
  owns the whole route?

The answers should distinguish continuity from central control. A network can
be continent-spanning because local exchanges overlap, not because one traveler
or ruler commands every link.

### Source slate

1. [Pliny the Elder, Natural History, Book 12, translated by John Bostock and H. T. Riley](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Aabo%3Aphi%2C0978%2C001%3A12)
   gives the primary Roman luxury complaint that must be analyzed rather than
   repeated as economic measurement.
2. [David F. Graf, The Silk Road between Syria and China](https://academic.oup.com/book/9102/chapter-abstract/269335933)
   supports segmented trade, diplomatic gifts, customs, and the absence of one
   coordinated Rome-to-China road. Its DOI is
   10.1093/oso/9780198790662.003.0015.
3. [Valerie Hansen, The Classical Silk Road: Trade and Connectivity across Central Asia, 100 BCE to 1200 CE](https://academic.oup.com/edited-volume/61799/chapter-abstract/546301482)
   restores local exchange, varied cargo, and north-to-south routes to the
   picture. Its DOI is 10.1093/acrefore/9780190277727.013.576. The article
   spans many later centuries; date every concrete example before importing it
   into this node.
4. [University of Washington, Selections from the Han Narrative Histories](https://depts.washington.edu/silkroad/texts/hantxt1.html)
   is a research gateway using Friedrich Hirth’s 1917 translation and combining
   several histories. Its own notes require checking against newer scholarship.
   Do not use the gateway as a finished deeper object unless the exact
   selection and translator are labeled and the account is independently
   checked.
5. [Sima Qian, Records of the Grand Historian: Han Dynasty, Volume 2, translated by Burton Watson](https://cup.columbia.edu/book/records-of-the-grand-historian/9780231081672/)
   includes Shiji 123, the Account of Dayuan, in a modern published
   translation and should anchor the Zhang Qian scene.

### Artistic challenge

Make a network visible without climbing above it too soon. The reader should
feel the wear of repeated handling and understand, before being told, that no
single pair of hands owns the road.

## Lesson 3: roman-republic-breaks

### Graph target

- Title: The Republic’s Long Unmaking
- Date: 133 to 27 BCE
- Thread: power
- Outgoing graph edges: pax-romana-machine, american-experiment

The central claim is not that empire simply crushed a balanced constitution.
Rome’s overlapping authorities became instruments of escalation. Many actors
used legitimate powers while making the next act of restraint harder.

### Preferred scene

Begin with the killing of Tiberius Gracchus in 133 BCE. An elected tribune and
many supporters are beaten to death with clubs and pieces of broken benches.
The killing established a grave new precedent inside late republican political
competition. Nasica and his followers presented their violence as defense
against tyranny. Do not claim access to what each man privately believed.

Appian and Plutarch wrote later and disagree in detail. storyContext must name
the evidentiary distance. Do not reconstruct exact private thoughts or a
cinematic blow-by-blow as certainty.

Sulla’s march on Rome in 88 BCE is the strongest later hinge. Caesar crossing
the Rubicon comes after generations of precedents. Augustus should enter near
the end, preserving offices and the language of restoration while ensuring
that one victor becomes the final political judge.

### Story movement

The formal subject is a century, but the story needs shape. Dramatize only
three hinges: 133 BCE, Sulla’s march, and Augustus’s settlement. Compress the
Social War, proscriptions, and Caesar into causal transitions or significance.
At the first hinge, tribunician authority collides with an extra-legal claim by
senators to save the state; no formal senate decree authorized the killing.
Separate Sulla’s first march in 88 BCE from his later return, dictatorship, and
proscriptions in 82 to 81 BCE. Those proscriptions make killing, confiscation,
denunciation, and private grievance instruments of the victorious state. At
the last hinge, Augustus closes the cycle by monopolizing the capacity to
settle it.

Return lightly to the broken bench. An object made for public deliberation
becomes a weapon. That is the lesson’s image.

### Significance spine

1. Explain Rome’s mixed and overlapping institutions without pretending it had
   a written modern constitution or clean separation of powers.
2. Treat inequality, land, slavery, military service, citizenship, debt,
   overseas commands, honor, patronage, and elite competition as interacting
   pressures, not one conveyor belt.
3. Name the scholarly dispute over displaced citizen farmers and slave estates.
4. Explain what armies offered political commanders and what commanders
   offered soldiers: booty, settlement, protection, patronage, command, and
   political advocacy, not simply personal wages.
5. Show how Augustus’s restoration language preserved forms while changing who
   could finally arbitrate conflict.
6. Let modern constitutional resonance remain a comparison, never a prophecy.

### Factual traps

- No tidy conquest wealth to slave estate to ruined farmer to personal army
  chain stated as consensus.
- No claim that generals ordinarily paid legionary salaries from their own
  pockets.
- Sulla marched on Rome before Caesar.
- The crisis begins well before 49 BCE and does not end at the Rubicon.
- Augustus preserved and repurposed many republican forms, not every form.
- Do not map Roman institutions directly onto the United States.
- Do not write a disguised op-ed about one modern republic.
- Election was never a pristine realm that suddenly became corrupt.

### Threads and callbacks

Include pax-romana-machine and american-experiment. A backward thread to
athens-demokratia or polis-experiment is welcome if it earns its place.

Use these earlier callbacks:

- athens-demokratia: Athens feared concentrated individual power and used mass
  participation, selection by lot, scrutiny, and ostracism. Rome distributed
  authority differently. Which design produced which vulnerabilities?
- alexanders-comet: Alexander’s army finally imposed a limit on its conqueror.
  What changes when armies inside a republic become bargaining partners in
  domestic political competition?

The answers should compare mechanisms, not ask which ancient system was more
democratic.

### Source slate

1. [Appian, The Civil Wars, translated by Horace White](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Appian/home.html)
   is a central ancient narrative for the Gracchi, Sulla, Caesar, and the
   proscriptions, written centuries after the events and best read as
   interpretation rather than transcript.
2. [Andrew Lintott, Violence in Republican Rome](https://academic.oup.com/book/47235)
   establishes how normalized political violence inside Rome preceded and
   enabled military insurrection.
3. [Nathan Rosenstein, Rome at War: Farms, Families, and Death in the Middle Republic](https://uncpress.org/9780807864104/rome-at-war/)
   is the essential challenge to the automatic ruined-farmer story.
4. [J. A. Crook, Andrew Lintott, and Elizabeth Rawson, Epilogue: The Fall of the Roman Republic](https://www.cambridge.org/core/books/abs/cambridge-ancient-history/epilogue-the-fall-of-the-roman-republic/60CE44101D0A3AC556E023794CE1066F)
   offers a structural synthesis beyond moral decline and personality alone.
5. [Plutarch, Life of Tiberius Gracchus 19, translated by Bernadotte Perrin](https://lexundria.com/plut_tg/19/prr)
   supplies the broken benches, Nasica’s declaration, and the killing sequence.
   It is a later moral biography, not an eyewitness transcript.

### Artistic challenge

Write tragedy without fate. The reader should see choices accumulating until
one victor can present monarchy as restoration, not until history requires a
monarch.

## Lesson 4: pax-romana-machine

### Graph target

- Title: The Empire of Cities
- Date: 27 BCE to 180 CE
- Threads: power, wealth
- Outgoing graph edges: jesus-to-constantine, steppe-hammer,
  byzantium-endures

The central claim is that the early empire’s center was thin but its rule was
not light. Armies, taxes, courts, imperial households, governors, city
councils, contractors, and local elites made imperial reach. Plural law and
money were part of that system, not evidence that no system existed.

### Preferred scene

Open in Nicomedia around 111 to 112 CE after a fire. Governor Pliny was away
when it broke out. By the time he wrote, the fire was over and he had already
ordered equipment supplied. He asked Trajan for permission to form an
association of roughly 150 craftsmen for future fires. Trajan refused because
he feared the proposed association would become factional or secret, and
returned responsibility to equipment, property owners, and a compelled crowd.

The exchange is preserved in Pliny’s Letters 10.33 and 10.34. Confirm the
translation used. The scene exposes several mechanisms at once: local
incapacity, retrospective reporting, imperial consultation, and the politics
of association. If the damaged public buildings are named, preserve the
uncertainty around gerousia, which may mean a local senate or a facility for
elderly citizens.

Do not invent victims or dialogue unless storyContext identifies them as
reconstruction. The letters themselves can carry the drama.

### Story movement

Begin with cooling ash, a retrospective report, and a request about future
organization. Move from the damaged city to the governor’s proposal, then to
the emperor’s reasoning. Do not invent a response time. Trajan placed control
of associations above Pliny’s proposed guild and returned the work to
equipment, owners, and compelled local hands.

After Trajan’s refusal, choose at most two secondary lenses for the story, such
as a city council and Gemellus’s military diploma. Move courts, roads, docks,
coinage, freedpeople, taxation, and legal pluralism into significance. The
pivot is that apparent imperial uniformity depended on managed difference.

### Significance spine

1. Explain Augustus’s settlement as monarchy nested inside familiar offices,
   honors, and civic competition.
2. Describe the thin center and the much larger ecology of local rule.
3. Correct one-law and one-coin myths with legal and monetary pluralism.
4. Explain uneven citizenship through birth, grants, emancipation, municipal
   status, and military service. Citizenship remained uneven until the 212 CE
   grant extended it to nearly all free inhabitants, outside the node’s formal
   period.
5. Define Roman peace as civil order and coercive imperial order, not an end to
   war.
6. Trace inheritances through eastern Rome and the Mediterranean as well as
   later western Europe.

### Factual traps

- No one law across the empire.
- No one coin across the empire.
- No precise quarter-of-humanity claim.
- No unqualified eighty-thousand-kilometer road statistic.
- No implication that a few hundred senior officials were the whole state.
- No implication that citizenship was simply earned.
- No claim that the empire was an operating system with uniform protocols.
- Do not make the West the only inheritor of Rome.
- Caracalla’s general citizenship grant belongs to 212 CE and should be marked
  as later than the node’s date.

### Threads and callbacks

Include all three outgoing graph edges. A backward thread to
roman-republic-breaks can show what Augustus converted rather than erased.

Use these earlier callbacks:

- qin-hammer: Qin sought uniform standards and direct administrative
  legibility. Why could Rome remain powerful while tolerating more local law,
  coinage, and civic variation?
- crown-of-cyrus: Cyrus’s empire also governed through local elites and
  traditions. What did Roman cities add to that old imperial bargain?

The answers should compare administrative architectures, not award a prize for
tolerance.

### Source slate

1. [Pliny the Younger, Letters 10.33 and 10.34, translated by J. B. Firth](https://www.attalus.org/old/pliny10a.html)
   contains the Nicomedia fire exchange in a 1900 translation with
   modifications on Attalus. Verify Attalus’s renumbering and label the two
   letters precisely.
2. [Augustus, Res Gestae Divi Augusti, translated by Frederick W. Shipley](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/home.html)
   gives the ruler’s own carefully staged account of restoration, office,
   benefaction, conquest, and civic legitimacy in the 1924 Loeb edition.
3. [Clifford Ando, Imperial Ideology and Provincial Loyalty in the Roman Empire](https://www.ucpress.edu/books/imperial-ideology-and-provincial-loyalty-in-the-roman-empire/hardcover)
   explains how communication, consent, and provincial participation made a
   thin imperial center durable.
4. [British Museum, military diploma, museum number 1930,0419.1](https://www.britishmuseum.org/collection/object/G_1930-0419-1)
   was issued to Gemellus on 17 July 122 CE after 25 years of auxiliary service
   and makes one bounded route to citizenship visible as a legal object.
5. [Constantina Katsari, The Roman Monetary System: The Eastern Provinces from the First to the Third Century AD](https://www.cambridge.org/core/books/the-roman-monetary-system/EDEEE2F5D51AA2E5EBE573B4A777940B)
   documents overlapping imperial and civic currencies in the eastern
   provinces.
6. [Clifford Ando, Legal Pluralism in Practice](https://academic.oup.com/edited-volume/38146/chapter-abstract/332922159)
   shows Roman government administering multiple local jurisdictions and legal
   traditions.

### Artistic challenge

The fire is not an anecdotal hook to abandon. It is the whole system in
miniature: revealed local vulnerability, distant sovereign judgment, suspicion
of collective action, and an empire that relies on people whose organization
it tightly polices.

## Lesson 5: jesus-to-constantine

### Graph target

- Title: From Cross to Crown
- Date: c. 30 to 380 CE
- Threads: ideas, power
- Outgoing graph edges: byzantium-endures, recitation-in-the-desert,
  great-schism

The central claim is a double transformation. Christianity changed as it moved
from Jewish movement to urban communities to an imperially favored church.
Imperial rule changed as Christian language, institutions, bishops, and
doctrinal conflict entered the practice of power.

### Preferred scene

Open with Constantine’s baptism near death in 337 CE. In Eusebius’s account,
the emperor receives baptism, refuses the purple thereafter, and lies on a
white couch in shining garments. The ritual is documented through a partisan
admirer, not a neutral witness. Eusebius’s literary design and Constantine’s
long, ambiguous path must remain visible. Do not invent fabric handling,
attendants, dialogue, room details, or baptismal gestures.

This scene is better than a confident Milvian Bridge vision because the vision
traditions differ and grew in the telling. Constantine’s deathbed baptism also
prevents the lesson from pretending that victory in 312 completed a simple
conversion.

The story may then move backward to small urban assemblies and forward to
Nicaea in 325 and Theodosius’s law of 380. Do not let the imperial scene erase
the Jewish, household, itinerant, charitable, argumentative, and epistolary
world through which the movement spread.

### Story movement

Let purple refused and the white couch organize the story. Purple means office,
victory, patronage, building, law, councils, and coercive attention. White
belongs to Eusebius’s account of ritual rebirth, but it does not wash power
away. The emperor receives baptism at the end of his life after spending
decades changing the church’s material and political conditions.

The hinge is not Christianity conquering Rome. It is the discovery that favor
binds both giver and receiver. Money, basilicas, legal privilege, councils, and
imperial arbitration give the church reach while teaching it imperial habits.

### Significance spine

1. Establish Christianity as a Jewish movement around Jesus, executed by Roman
   power.
2. Explain plural urban spread through letters, households, travelers, care,
   argument, hope, and common Greek, without reducing success to roads.
3. Treat persecution as real but intermittent and regionally variable.
4. Distinguish the toleration decree of 311, the arrangements associated with
   Milan in 313, Constantine’s patronage, and Theodosius’s prescription of
   Nicene Christianity in 380.
5. Explain Nicaea as an imperial council addressing an existing dispute, not
   the invention of Jesus’s divinity or the biblical canon.
6. Show spiritual equality crossing status without pretending Christianity
   abolished ancient slavery.

### Factual traps

- Constantine did not make Christianity Rome’s official religion in 312 or
  313.
- Toleration began before the so-called Edict of Milan, notably in 311.
- Constantine’s conversion was gradual, politically consequential, and
  contested.
- Nicaea did not invent Christ’s divinity and did not choose the biblical
  canon.
- Persecution was not one continuous empire-wide policy for three centuries.
- Early Christian communities did not dismantle slavery.
- Do not call Jesus a Christian founder detached from Judaism.
- Do not frame Islam as merely a faster repetition of Christianity.

### Threads and callbacks

Include all three outgoing graph edges. A backward thread to israel-one-god or
ashoka-wheel may be added if it carries a distinct comparison.

Use these earlier callbacks:

- israel-one-god: How did Jewish scripture, covenant, messianic expectation,
  and one God shape Christianity’s universal claims, and how did Christian and
  Jewish communities gradually define themselves apart under Roman rule?
- ashoka-wheel: Ashoka and Constantine both became later models of imperial
  religious transformation. Why does patronage change a tradition even when
  the ruler does not simply dictate belief?

The answer should resist easy conversion-story parallels. Ashoka’s dhamma and
Constantine’s Christianity are different traditions, institutions, archives,
and relationships to coercion.

### Source slate

1. [Eusebius, Life of Constantine, translated with introduction and commentary by Averil Cameron and Stuart G. Hall](https://academic.oup.com/book/46887)
   provides a critical edition of the indispensable but partisan primary
   narrative, including visions, patronage, councils, and baptism.
2. [H. A. Drake, The Impact of Constantine on Christianity](https://www.cambridge.org/core/books/abs/cambridge-companion-to-the-age-of-constantine/impact-of-constantine-on-christianity/0DF3C1FCB9E6B1CD33F2157B3CE0D4E0)
   is a compact scholarly account of ambiguous conversion and institutional
   transformation under imperial favor.
3. [E. D. Hunt, Imperial Law or Councils of the Church? Theodosius I and the Imposition of Doctrinal Uniformity](https://www.cambridge.org/core/journals/studies-in-church-history/article/abs/imperial-law-or-councils-of-the-church-theodosius-i-and-the-imposition-of-doctrinal-uniformity/27C5C9FDF4D4B9D020FF10DDBDABFD5F)
   grounds the distinction between Constantine’s patronage and Theodosius’s
   doctrinal prescription.
4. [Jennifer A. Glancy, Slavery in Early Christianity](https://academic.oup.com/book/7076)
   corrects any claim that spiritual equality amounted to an ancient
   abolitionist movement.

### Artistic challenge

Keep the cross from becoming a victory banner too quickly. End on what imperial
favor made possible, what obligations it created, and how neither church nor
court remained unchanged. Do not cast 337 as the moment either side captured
the other.

## Lesson 6: teotihuacan-maya

### Graph target

- Title: The Unnamed City and the Speaking Stones
- Date: c. 250 CE
- Threads: power, craft, ideas
- Outgoing graph edges: fifth-sun-aztecs, mound-and-mountain

The central claim is not a contrast between a kingless city and a dynastic
people. It is a contrast between political visibility. Teotihuacan’s visual and
material record rarely isolates named rulers. Maya inscriptions make dynasties,
wars, rituals, and exact dates speak. Different archives tempt historians into
different certainties.

### Preferred scene

Build a two-part reconstruction.

First, enter one named, documented Teotihuacan apartment compound through an
explicitly composite resident and use only features attested there. If the
scene synthesizes multiple excavated compounds, storyContext must say so and
identify the synthesis. Plastered floors, courtyards, craft work, murals, and
household ritual vary by setting. Surviving mural and visual programs rarely
present one named ruler in the familiar Maya manner, but some viewing contexts
were restricted. Do not call all such art public, and do not infer equality or
collective rule from the absence.

One source-ready option is the Techinantitla apartment compound, anchored to
the Metropolitan Museum mural below. That object dates to 500 to 550 CE. If
you use it, present it as a later view of the city's urban life rather than a
snapshot of the node's c. 250 date. You may instead select a better documented
compound after research. In either case, name the compound and cite an
object-level or excavation source before drafting its sensory details.

Second, move to a carver working on a specific commissioned Maya text. Secure
an object-level archaeological or epigraphic source before writing the scene,
and do not conflate carver and scribe unless that source supports it. Tikal
Stela 31 can provide genuine chronological overlap, but its 378 CE material
must not become settled proof of a Teotihuacan conquest. The stela was
dedicated in 445 CE and looks back to events associated with 378. A carver
scene using Stela 31 therefore belongs in 445, while 378 belongs to the history
the inscription constructs. Otherwise choose
another named monument, date it, and avoid invented preparation actions. The
glyphs may record accession, ritual, conflict, ancestry, and time. Make clear
that the Maya world consisted of rival cities and courts, not one empire.

storyContext must identify both halves as evidence-based reconstructions and
must not imply exact simultaneity unless the dates selected genuinely overlap.

### Story movement

The aesthetic engine is silence beside speech. Teotihuacan is not literally
silent: architecture, murals, burials, objects, and a limited notational system
all communicate. Maya stone does not transparently tell the truth: royal
inscriptions are interested political speech.

Let each archive initially seem legible, then reveal its limits without stating
claims only to retract them. The pivot is epistemic. The kind of evidence that
survives shapes the kind of government we imagine.

### Significance spine

1. Establish Teotihuacan’s scale, grid, compounds, workshops, monuments, and
   long urban life without a brittle population superlative.
2. Present monarchy, constrained rulership, collective governance, and
   institutional change as live interpretations.
3. Explain Classic Maya writing as the best understood pre-Columbian American
   writing system, not the only full writing system in the Americas.
4. Describe Maya dynastic rivalry and political inscriptions without reducing
   the civilization to kings.
5. Explain contact between Teotihuacan and Maya cities through trade,
   migration, diplomacy, and sometimes violence. Treat the meaning of the 378
   CE arrival associated with Siyaj K’ak’ as debated if included.
6. Keep the two societies’ later transformations and collapses distinct.

### Factual traps

- Silence about named rulers is not proof Teotihuacan had no kings.
- Teotihuacan was not writingless in a simple sense; it had notation whose
  status and use remain debated.
- Maya writing was not the only writing tradition in the Americas.
- The Maya were not one empire.
- Do not say Maya astronomy rivaled anyone’s as a floating superlative.
- Do not present the 378 intervention as a settled conquest narrative.
- Do not merge the decline of Teotihuacan with the varied Classic Maya
  transformations.
- Independent of Eurasia does not mean isolated within the Americas.

### Threads and callbacks

Include fifth-sun-aztecs and mound-and-mountain. Strong additional threads are
maize-and-the-americas and invention-of-writing.

Use these earlier callbacks:

- uruk-first-city: Uruk’s administrative traces make institutions visible in
  a particular way. What does Teotihuacan reveal when political coordination
  and authority must be inferred chiefly from built space, objects, and images
  rather than readable official archives?
- indus-enigma: The Indus cities also tempt us to turn undeciphered or missing
  political language into a claim about absent rulers. What can urban form
  establish, and what can it not?

The answers should teach evidence discipline, not merely list similarities.

### Source slate

1. [George L. Cowgill, Ancient Teotihuacan: Early Urbanism in Central Mexico](https://www.cambridge.org/core/books/ancient-teotihuacan/B34810596153C0AD989CD6165DEE4812)
   is the authoritative synthesis for population, compounds, economy, political
   uncertainty, and influence.
2. [George L. Cowgill, “State and Society at Teotihuacan, Mexico”](https://www.annualreviews.org/doi/10.1146/annurev.anthro.26.1.129)
   supports treating monarchy and more collective government as hypotheses
   rather than settled facts.
3. [Stephen Houston, John Robertson, and David Stuart, “The Language of Classic Maya Inscriptions”](https://www.journals.uchicago.edu/doi/abs/10.1086/300142)
   grounds the claims about the linguistic richness and decipherment of Maya
   inscriptions.
4. [James C. Langley, “The Forms and Usage of Notation at Teotihuacan”](https://www.cambridge.org/core/journals/ancient-mesoamerica/article/abs/forms-and-usage-of-notation-at-teotihuacan/5B22E8B10A3523997DB2221C950B7AC1)
   clarifies the roughly 120 signs and the limits of calling the city either
   fully literate or writingless.
5. [The Metropolitan Museum of Art, Mural from the Techinantitla apartment compound](https://www.metmuseum.org/art/collection/search/321291)
   provides an object-level anchor, a 500 to 550 CE date, material description,
   and provenance for one possible Teotihuacan scene.
6. [Smarthistory, The Mesoamerican Calendar](https://smarthistory.org/mesoamerican-calendar/)
   introduces Tikal Stela 31 as a fifth-century monument whose retrospective
   text records dynastic history and precise dates. Use specialist epigraphic
   work as well if this becomes the Maya scene.

### Artistic challenge

Turn an evidentiary problem into drama. One city should not feel mysterious
because the prose withholds facts. It should feel differently legible. The
reader should leave suspicious of how readily a named king fills the whole
frame.

## Lesson 7: bantu-and-aksum

### Graph target

- Title: A Continent in Motion
- Date: c. 350 CE
- Threads: wealth, ideas
- Outgoing graph edges: golden-sahara, recitation-in-the-desert

This node is an explicit comparative diptych. Bantu language expansions and
the kingdom of Aksum are distinct histories. They share a continent and a
lesson-ending challenge to isolation myths. They do not share a cause, one
people, one route, or one political system.

### Preferred scene

Open on one securely attributed Christian coin of Ezana, then compare it in
the narration with a securely attributed earlier pre-Christian issue. To keep
the scene human, an explicitly composite contemporary holder may inspect the
single Christian coin, but that person must not witness a diachronic symbol
change. A composite die worker is acceptable only if the striking method is
separately sourced. Do not invent mint architecture, furnace heat, smells,
tool sequence, or workshop routine. Metal, script, image, weight, and trade
make a court’s changed public claim visible in an object that can travel.

The British Museum records below are candidate anchors: 1989,0518.41 for a
pre-Christian gold issue and 1915,0108.81 for a later Christian issue. Confirm
their catalogue details directly before choosing them, and tie every claim
about symbols, metal, weight, script, and circulation to the selected records.

Then break the scene openly. Far from Aksum, no single artifact or eyewitness
can narrate centuries of Bantu language expansion. Let words carry the second
half. Check every lexical example against Bantu Lexical Reconstructions 3 and
current scholarship, then set linguistic patterns beside archaeological and
genetic evidence. One similar word proves nothing: regular sound
correspondences and distribution matter, and inheritance must be distinguished
from borrowing. Communities move, divide, mix, marry, learn, farm, herd,
forage, and work iron in varied combinations.

storyContext should call the whole construction a compressed diptych and name
the different kinds of evidence behind each half.

### Story movement

The unifying image is histories reconstructed from speech beside royal claims
struck in metal. A coin can announce a court’s new allegiance across a trade
world. Patterns across many languages can preserve evidence of shared descent,
divergence, and contact after individual travelers’ names are gone. Neither
archive is complete.

Use the break between halves as an artistic asset. Mark the seam by changing
archive and scale, not by announcing the lesson’s construction. The distance
and causal gap are the point.

### Significance spine

1. Explain Bantu as a language-family label, not a race or a single ancient
   nation.
2. Present expansions as many movements and interactions across centuries,
   with regional variation and substantial admixture.
3. Reject the single package of farming, iron, and demographic replacement.
4. Establish Aksum in the northern Ethiopian and Eritrean highlands as a state
   facing Red Sea networks, using inscriptions, coinage, agriculture, and
   trade.
5. Distinguish Ezana’s court conversion from instant popular conversion.
6. Explain early Muslim refuge in Aksum and later Red Sea change without saying
   Islam suddenly encircled and isolated Christian Ethiopia.

### Factual traps

- Bantu names a language family, not a race.
- No one Bantu migration happened in one wave.
- No universal farming-and-iron civilizing package.
- Language spread does not always equal mass population replacement.
- Aksum was not Bantu.
- These stories did not cause one another.
- Ezana’s conversion does not prove every subject converted at once.
- Aksum’s chronology in relation to Constantine must be calculated before any
  before-Rome claim. Avoid the contest entirely unless it teaches something.
- Islam did not simply isolate Aksum overnight.
- Do not use Africa as a singular actor or reduce its history to reacting to
  Eurasia.

### Threads and callbacks

Include golden-sahara and recitation-in-the-desert. Strong additional threads
are iron-and-alphabet and ashoka-wheel.

Use these earlier callbacks:

- iron-and-alphabet: Iron and alphabetic scripts spread on separate, uneven
  paths. Why should Bantu language spread, farming, and ironworking also be
  tested separately rather than treated as one package?
- ashoka-wheel: Ashoka’s inscriptions and Ezana’s coins both make royal
  religious affiliation public. What can an official object prove about a
  ruler, and what can it not prove about ordinary belief?

The second answer should distinguish public court policy from the inner lives
of subjects.

### Source slate

1. [Rebecca Grollemund, David Schoenbrun, and Jan Vansina, Moving Histories: Bantu Language Expansions, Eclectic Economies, and Mobilities](https://www.cambridge.org/core/journals/journal-of-african-history/article/moving-histories-bantu-language-expansions-eclectic-economies-and-mobilities/F9F92F9C6A16A9633E75508E836C9C46)
   is the strongest correction to one migration, one package, and automatic
   replacement.
2. [Cesar A. Fortes-Lima and colleagues, The Genetic Legacy of the Expansion of Bantu-Speaking Peoples in Africa](https://www.nature.com/articles/s41586-023-06770-6)
   supports western African origins while demonstrating extensive regional
   admixture and demographic complexity.
3. [Michael J. Harrower and colleagues, Beta Samati: Discovery and Excavation of an Aksumite Town](https://www.cambridge.org/core/journals/antiquity/article/beta-samati-discovery-and-excavation-of-an-aksumite-town/643FA872A5B2F9B5E0E765D850C4A526)
   supplies archaeological evidence for trade, mixed religious material, and
   the uncertainty surrounding nonelite Christianization.
4. [The British Museum, “Aksumite Coins,” in Smarthistory](https://smarthistory.org/aksumite-coins/)
   offers the object-centered route through metals, scripts, trade reach, and
   the change from disc-and-crescent motifs to crosses.
5. [Yvonne Bastin, André Coupez, Evariste Mumba, and Thilo C. Schadeberg, editors, Bantu Lexical Reconstructions 3](https://www.africamuseum.be/nl/research/discover/human_sciences/culture_society/blr)
   is a working database of proposed Proto-Bantu reconstructions. Use it with
   current scholarship, not as a finished or self-interpreting word list.
6. [The British Museum, gold coin of Ezana, museum number 1989,0518.41](https://www.britishmuseum.org/collection/object/C_1989-0518-41)
   is a candidate pre-Christian object whose catalogue record identifies the
   disc-and-crescent motifs, metal, weight, attribution, and date.
7. [The British Museum, coin of Ezana, museum number 1915,0108.81](https://www.britishmuseum.org/collection/object/C_1915-0108-81)
   is a candidate Christian object. Verify its catalogue fields and imagery
   before it becomes the scene's anchor.

For the three deeper objects, the strongest balanced set is Moving Histories,
Beta Samati, and Aksumite Coins. Use the genetic paper for fact checking unless
it displaces a more reader-friendly source for a clear reason.

### Artistic challenge

Do not solve the node’s awkward breadth by pretending unity. Make the seam
beautiful and visible. The lesson should demonstrate that comparison does not
require causation.

## Lesson 8: steppe-hammer

### Graph target

- Title: When Borders Became Kingdoms
- Date: 376 to 476 CE
- Threads: power, wealth
- Outgoing graph edges: europe-reboots, byzantium-endures

The central claim is that mobile peoples did not strike Rome like weather.
Migration, admission, exploitation, recruitment, settlement, civil war,
tribute, taxation, and provincial loss interacted. Borders were institutions
that classified and bargained with people. When those relationships failed,
movement and state failure amplified one another.

### Preferred scene

Open at the Danube in 376 with a composite Tervingian family among Fritigern’s
followers awaiting a permitted crossing. Contrast them explicitly with
Greuthungi whom Roman authorities denied admission and who later crossed. Ground
the reconstruction in Ammianus’s narrative of admission, the order to surrender
weapons and its corrupt, uneven enforcement, provisioning, official abuse,
hunger, and revolt, while identifying his hostile Roman literary conventions.
Book 31 is a later literary account, not preserved eyewitness testimony of the
crossing. Treat even its administrative sequence as narrated evidence rather
than a camera placed beside the river.

storyContext must identify the family, gestures, any count sequence, and
official actions as reconstructed. Move Rome’s recruitment motive into
analytical prose rather than presenting it as something the family can observe.
Avoid present-day border props or language. The scene is not an allegory for a
current policy dispute.

### Story movement

Begin with the Tervingian request for shelter, not a generic status assigned to
every Gothic group. Let Roman administration turn this permitted crossing into
dependency, hunger, and revolt, while the denied Greuthungi complicate the
frame. Then widen through decades: federate service, civil wars, Rhine
crossing, African revenue, Hunnic tribute, Attila’s coalition and collapse, and
the deposition of 476.

Return to the border at the end. Frontier bargaining reappeared inside the
empire through settlements, commands, titles, tax claims, and successor
kingdoms.

### Significance spine

1. Explain the 376 admission and Roman failures before Adrianople.
2. Treat Goths, Huns, Vandals, Alans, and Suebi as changing coalitions and
   identities, not timeless nations moving intact.
3. Explain Hunnic power through mobility, mixed war bands, ecology, tribute,
   Roman payments, diplomacy, and leadership.
4. Restore western Roman civil war, fiscal capacity, army financing, and the
   loss of Vandal Africa to the causal center.
5. Explain 476 as a later historical marker, not a lived blackout. Julius
   Nepos remained a recognized western emperor until 480 if the last-emperor
   problem enters the prose.
6. Show successor rulers recombining Roman land, law, bishops, offices, names,
   and military practice.
7. Name the historiographical disagreement. Guy Halsall stresses western Roman
   political collapse and successor-state formation; Peter Heather gives more
   causal weight to Hunnic pressure and migration as external shocks. Explain
   the mechanisms each position emphasizes without forcing a verdict.

### Factual traps

- No Hun domino chain.
- Do not say the Huns directly shoved every later group into Rome.
- Do not equate European Huns confidently with the Xiongnu.
- Do not treat mounted warfare as a sufficient explanation.
- Do not repeat Ammianus’s dehumanizing ethnography as observation.
- Do not call ethnic labels fixed national identities.
- Attila did not destroy the western empire, and his coalition collapsed before
  476.
- Migration alone did not break Rome.
- The church did not merely preserve an empty Roman shell.
- 476 was not a civilizational lights-out moment.
- Hakenbeck and Büntgen’s drought argument is a debated hypothesis focused
  mainly on the 430s and 440s. Do not project it backward as the cause of 376.
- Avoid turning the story into a disguised argument about modern migration.

### Threads and callbacks

Include europe-reboots and byzantium-endures. Strong additional threads are
sea-peoples-collapse and horse-and-wheel.

Use these earlier callbacks:

- sea-peoples-collapse: Both stories tempt us to use named migrants as a full
  explanation for imperial collapse. What additional mechanism turns movement
  from a label into an explanation?
- horse-and-wheel: Horses made speed and range possible. Why did mobility still
  require wealth, ecology, leadership, diplomacy, and statecraft to become
  Hunnic power?

The first answer should name networks, extraction, political legitimacy, and
institutional response in both cases. The second should dismantle technological
determinism.

### Source slate

1. [Ammianus Marcellinus, Roman History, Book XXXI](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Ammian/31%2A.html)
   is the central ancient narrative for Hunnic pressure, Gothic admission,
   Roman official abuse, revolt, and Adrianople, valuable alongside scrutiny of
   its hostile framing.
2. [Guy Halsall, Barbarian Migrations and the Roman West, 376-568](https://www.cambridge.org/core/books/barbarian-migrations-and-the-roman-west-376-568/13B8F5197E2544AF77CB0DFC954F0D79)
   is the major counterweight to migration-as-cause narratives.
3. [Peter Heather, The Fall of the Roman Empire](https://www.panmacmillan.com/authors/peter-heather/the-fall-of-the-roman-empire/9780330491365)
   gives external pressure and migration more causal weight and keeps the
   scholarly disagreement visible.
4. [Susanne Hakenbeck and Ulf Büntgen, “The role of drought during the Hunnic incursions into central-east Europe in the 4th and 5th c. CE”](https://www.cambridge.org/core/journals/journal-of-roman-archaeology/article/role-of-drought-during-the-hunnic-incursions-into-centraleast-europe-in-the-4th-and-5th-c-ce/C036810C421F7D04C2F6985E6B548F20)
   offers a provisional hypothesis about mixed populations, flexible
   subsistence, and severe drought mainly in the 430s and 440s. It does not
   explain the 376 crossing.

### Artistic challenge

Return agency to everyone without distributing innocence. Refugees, Roman
officials, generals, farmers, soldiers, kings, bishops, and envoys all act
inside constraints. The history becomes more tragic, not less, when no hammer
falls from outside.

## Lesson 9: byzantium-endures

### Graph target

- Title: Rome, Still Living
- Date: 527 to 565 CE
- Threads: power, ideas
- Outgoing graph edges: caliphate-lightning, great-schism,
  fall-of-constantinople

The central claim is that Constantinople headed a living Roman state. It was
not a vault holding classical civilization until western Europe woke. It
taxed, litigated, traded, fought, built, translated, worshipped, negotiated,
lost territory, and repeatedly remade itself.

### Preferred scene

Open in Hagia Sophia in 537 with an explicitly composite worshipper or worker.
Use Procopius’s description for scale, marble, light, and imperial claim, but
identify it as a later panegyric composed in the 550s, not an opening-day
visitor’s reaction preserved from 537. storyContext must disclose that the person,
entrance sequence, soundscape, gestures, and internal reactions are
reconstructed. Do not give the character a private thought such as I am Roman
and present it as evidence. The person enters a building made by geometry,
quarried stone, skilled labor, imperial revenue extracted across the provinces,
imperial ambition, and recent urban violence.

Greek was the city’s dominant spoken language while major law still arrived
largely in Latin, but any detailed 537 soundscape is reconstruction. The people
called themselves Romans; do not turn that public identity into invented
private thought. The dome should seem to float, then significance should reveal
the hidden piers, chains of labor, taxes, legal commissions, and military
extraction holding that effect aloft.

Tribonian’s Digest commission at work between 530 and 533 is the best secondary scene. Sorting
contradictory jurists and imperial enactments dramatizes codification as
selection, editing, reconciliation, and authorization, not invention. Use Tony
Honoré before attempting it. Any room, scroll-sorting sequence, gesture, or
dialogue remains reconstructed.

### Story movement

Begin in light and architecture. Move beneath the surface into riot, rebuilding,
law, taxation, reconquest, plague, and cost. Then widen beyond Justinian. The
state’s long endurance came not from remaining classical but from contracting,
changing language, reorganizing armies and provinces, bargaining with
neighbors, and continuing to call those changes Roman.

Return to the dome. The apparent miracle rests on forces the eye does not see.
So does endurance.

### Significance spine

1. Explain Roman self-identification and the modern usefulness and danger of
   the label Byzantine.
2. Establish Constantinople as an imperial capital since 330, not a city to
   which Rome suddenly fled in 476.
3. Explain the gradual linguistic shift and the Latin character of much of
   Justinian’s legal compilation.
4. Explain that Corpus Juris Civilis is a later collective label. Distinguish
   the Code, Digest, Institutes, and later Novels, then separate their eastern
   use from the western revival around 1100 and their uneven place in civil-law
   traditions.
5. Treat the gains as costly and unevenly durable. Africa remained Roman for
   more than a century; Italy fragmented after the Lombard invasion while
   imperial territories endured.
6. Let later adaptation, not passive preservation, carry the closing claim.

### Factual traps

- The inhabitants normally called themselves Romans, not Byzantines.
- Rome did not simply move east when a western emperor fell.
- The language shift from Latin to Greek was gradual.
- Justinian did not invent Roman law.
- The legal compilation did not flow continuously and uniformly into every
  European legal system.
- Justinian’s reconquests were costly and contested.
- Hagia Sophia’s first dome collapsed in 558 and was rebuilt before the 562
  rededication.
- Procopius’s Buildings is brilliant imperial rhetoric, not neutral reportage.
- Byzantium was not the sole preserver of Greek knowledge.
- 1054 was one marker in a long estrangement, not an instant permanent split.
- Do not make Slavic or Rus’ peoples passive recipients of one exported model.

### Threads and callbacks

Include all three outgoing graph edges. A backward thread to
jesus-to-constantine or pax-romana-machine can show transformation within the
era.

Use these earlier callbacks:

- code-of-hammurabi: Hammurabi’s stele and Justinian’s corpus both present a
  ruler ordering law. How are a royal monument and an edited juristic working
  archive different kinds of power?
- alexanders-comet: Greek language and culture spread widely after Alexander,
  yet Justinian’s subjects called themselves Romans. What does that reveal
  about the imperfect fit among language, culture, ancestry, and political
  identity?

The first answer should distinguish displayed justice from a compilation used
by legal institutions. The second should make identity historical and layered,
not biologically or linguistically automatic.

### Source slate

1. [Procopius, On Buildings 1.1, “On the Great Church,” translated by W. Lethaby and H. Swainson, 1894, pages 24 to 28](https://sourcebooks.web.fordham.edu/source/procop-deaed1.asp)
   gives an excerpted primary description of Hagia Sophia’s scale, light, and
   imperial claim, best read as a panegyric composed in the 550s rather than
   eyewitness reportage from the church's dedication.
2. [Anthony Kaldellis, The New Roman Empire: A History of Byzantium](https://academic.oup.com/book/46840)
   restores Roman identity, state capacity, contingency, and eastern Roman life
   beyond the preservation myth.
3. [Oxford Faculty of Law, Roman Law](https://www.law.ox.ac.uk/roman-law/roman-law)
   explains the later western revival and helps state the Corpus Juris Civilis’s
   influence without pretending it underlies every European system equally.
4. [Tony Honoré, Justinian’s Digest: Character and Compilation](https://academic.oup.com/book/26115)
   examines the probable methods and distinct roles involved in compiling the
   Digest. Read it before reconstructing any commission scene.

### Artistic challenge

Do not write an elegy for antiquity. Write presence. The lesson should close
Era IV with the sensation that Rome has neither escaped history nor ended. It
has changed its language, center, scale, enemies, and forms while keeping a
political name alive.

## The two relocated nodes

These are not part of the Era IV writing commission. They are included so that
you understand why the era now has nine lessons and do not restore their old
claims.

### gupta-zero now belongs to Era V

- Permanent id: gupta-zero
- New title: Rules for Nothing
- Date: 628 CE
- Position: after recitation-in-the-desert and before caliphate-lightning

The old c. 400 CE seed conflated decimal place value, a placeholder mark, and
arithmetic with zero. Brahmagupta’s explicit surviving rules belong to 628,
after the Gupta Empire. Some rules were correct; division by zero defeated him.
Oxford’s 2024 report found that the original determination for folio 16 was
inaccurate, while folio 17 was separately excluded as an outlier. The tested
folios calibrate broadly to 773 to 1032 CE,
the modeled production phase is approximately 799 to 1102, and bark dates are
termini post quem rather than proof of writing date. Do not replace the old
error with a placeholder-only account: notation, arithmetical use, and
Brahmagupta’s formal rules must remain distinct.

Future source candidates:

- [Brahmagupta and Bhāskara, Algebra, with Arithmetic and Mensuration, translated by H. T. Colebrooke](https://www.cambridge.org/core/books/algebra-with-arithmetic-and-mensuration/A5FD31091E6C1FACD34B186C5DBCC659)
- [David Chivall and colleagues, Radiocarbon Dating of the Bakhshali Manuscript](https://ora.ox.ac.uk/objects/uuid%3A5a6d1dd7-f20c-4209-adb6-33849f5b08f4)
- [Kim Plofker and colleagues, The Bakhshali Manuscript: A Response to the Bodleian Library’s Radiocarbon Dating](https://doi.org/10.18732/H2XT07)

### pacific-navigators now belongs to Era VI

- Permanent id: pacific-navigators
- New title: Wayfinders of the Great Ocean
- Date: c. 1200 CE
- Position: after neo-confucian-turn and before genghis-exchange

The old c. 300 CE seed compressed Austronesian movement, Lapita settlement of
western Polynesia, and the much later settlement pulse across eastern
Polynesia into one voyage. Lapita communities reached Tonga by roughly 900 BCE
and settlement extended to Samoa thereafter. One influential high-precision
synthesis places Society Islands settlement around 1025 to 1120 CE and rapid
expansion around 1190 to 1290. The broad short chronology is well supported,
while exact island sequence and dates remain debated. Hawaiʻi, Rapa Nui, and
Aotearoa were outcomes reached during the broader late expansion, not three
simultaneous landfalls.

Future source candidates:

- [Janet M. Wilmshurst, Terry L. Hunt, Carl P. Lipo, and Atholl J. Anderson, “High-precision radiocarbon dating shows recent and rapid initial human colonization of East Polynesia”](https://pmc.ncbi.nlm.nih.gov/articles/PMC3033267/)
  supports a modeled settlement chronology, not lived navigation detail or
  canoe form.
- [David V. Burley and William R. Dickinson, “Origin and Significance of a Founding Settlement in Polynesia”](https://pubmed.ncbi.nlm.nih.gov/11562453/)
  supports Nukuleka and western Polynesian Lapita foundations, not the later
  eastern expansion sequence.
- [UNESCO, The Canoe Is the People](https://www.unesco.org/en/links/canoe)
  documents geographically particular living knowledge from Satawal and
  Taumako. It is not an unchanged window into thirteenth-century East
  Polynesia.

Those three are the recommended deeper objects for a future lesson.
[University of Hawaiʻi at Mānoa, Wayfinding and Navigation](https://manoa.hawaii.edu/exploringourfluidearth/physical/navigation-and-transportation/wayfinding-and-navigation)
is research-only and explains stars, swells, island effects, and Hōkūleʻa. It
provides experimental and pedagogical evidence, not direct proof of every
ancient technique.

Future factual guardrails: Austronesian, Lapita, and Polynesian are related but
not interchangeable; canoe types varied; organic vessels rarely survive;
living traditions are geographically particular; and not every island was
settled. Avoid deficit and teleological framing such as empty ocean, without
metal or writing, or before Europe dared. If the absence of compasses or
written charts is mentioned, make clear that it names particular instruments,
not a lack of technical sophistication. Require an object-level archaeological
source before reconstructing a sensory landfall, canoe-building scene, or
Wairau Bar encounter.

## Final literary revision

Use this order for every lesson: draft, fact and source audit, prose revision,
then a final fact and source audit of every sentence changed during revision.
Read every paragraph aloud during the prose pass.

For each lesson, ask:

- Does the first sentence create pressure, not just scenery?
- Is the core mechanism visible through action before significance names it?
- Does each paragraph change the reader’s understanding?
- Is there one structural image, and does its final return deepen rather than
  repeat it?
- Are abstract nouns anchored by bodies, objects, institutions, or choices?
- Does sentence length vary with thought and pressure?
- Have three consecutive sentences fallen into the same cadence?
- Is any metaphor merely ornamental?
- Is any superlative doing work that evidence should do?
- Does the prose announce importance instead of earning it?
- Does the lesson grant agency without inventing innocence?
- Does the last paragraph remain historically specific while opening onto the
  present?
- Are the questions an elegant continuation of the lesson rather than a quiz
  bolted onto it?
- Are deeper links invitations a reader might actually follow?

Then run a mechanical pass:

- exact object shape
- 5 to 8 story paragraphs
- 4 to 6 significance paragraphs
- 3 to 5 threadsOut
- exactly 5 questions
- exactly 2 backward callbacks
- exactly 3 linked deeper objects
- 1,500 to 2,200 story plus significance words
- no em dashes
- no en dashes
- real apostrophes
- no invented quotation
- every composite labeled
- every single-file check prints OK

## Definition of done

The commission is done when all nine lesson files exist, each passes its
single-file gate with zero warnings, every source label has been verified,
every reconstruction is disclosed, and every lesson has received a separate
literary revision.

Do not update the manifest. Do not commit. Do not deploy. Hand the nine finished
files and your completion report back to Codex for adversarial review and
release.

The standard is not that the reader can repeat a date. The standard is that the
reader has been given a beautiful question, has lived inside it for ten
minutes, and leaves with a more exact way to see the world.
