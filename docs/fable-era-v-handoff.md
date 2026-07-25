# Fable Handoff: Loom, Era V

## The commission

Write the thirteen lessons of Loom's fifth era, The Believing World, as
finished literary nonfiction. These lessons must be historically responsible,
sensuous, intellectually alive, and beautiful enough to reward slow reading.
Accuracy is the floor. The aim is to let a reader feel a mechanism of history
working, then give that feeling enough structure to become durable
understanding.

This is an execution brief, not a request for another planning pass. The graph
architecture, chronology, source reconnaissance, factual audit, and callback
design have been prepared and adversarially checked. You own the prose. Make it
better than the brief. Do not merely expand the node summaries into longer
paragraphs.

The division of responsibility is deliberate:

- Fable owns every sentence of lesson prose and the substantive literary
  revision that follows the first draft.
- The orchestrator owns graph architecture, chronology, research scaffolding,
  adversarial fact review, manifest updates, commits, release validation, and
  deployment.
- A lesson writer must not edit the graph, manifest, application code, project
  documentation, or release state.

Fable is trusted to research and judge facts, not merely decorate the brief's
conclusions. The source maps and factual traps below are a strong starting
scaffold, not a cage. If better evidence changes a date, scene, mechanism, or
scholarly balance, follow it, cite it, and explain the change in the completion
report. Do not preserve a convenient sentence at the expense of the evidence.

The graph is at its final size and green: 365 nodes, 800 forward wires, 10
eras, 43 written lessons, 0 gate warnings. Era V contains 38 nodes; the
thirteen below are its core release set. The remaining 25 are seeds for later
sessions; several of your edge targets are seeds, which is fine, the wires
already exist.

## Read these before writing

1. docs/forge-spec.md, in full. It is binding.
2. data/lessons/spark-of-mind.js, the exemplar, to calibrate voice.
3. data/lessons/byzantium-endures.js and one more Era IV lesson, to calibrate
   the current bar. Era V must improve on Era IV: better cadence, more exact
   images, stronger structural unity, no loss of evidentiary candor.
4. Your node's entry in data/eras/05-believing-world.js, and the node entry of
   every edge target named in your brief (some live in later era files).
5. The complete earlier lesson behind every callback assigned below, not only
   its graph summary.

## Deliverables and the file contract

One file per lesson, written OUTSIDE the repo (the release gate fails on
unmanifested lesson files inside data/lessons/). Park each finished file at the
path given in your commission; the orchestrator moves files into the repo and
advances the manifest one commit at a time.

Every file registers exactly one LOOM.lesson object with: the permanent node
id; readingMinutes 10 (9 or 11 only if the honest count demands it);
storyContext; story of 5 to 8 paragraphs; significance of 4 to 6 paragraphs;
threadsOut of 3 to 5 objects; exactly 5 questions; deeper of exactly 3
clickable source objects with verified https URLs.

Story plus significance must total 1,500 to 2,200 words. Aim near 1,600 to
1,850. Ample but shaped, never padded.

The five questions: 1 recall on a load-bearing fact, 2 why on mechanism or
counterfactual, 2 callback to the earlier lessons assigned in your brief.
Shape the five as one progression: fact, mechanism, complication, comparison,
synthesis. Answers teach in 2 to 4 sentences.

Verify every deeper source's author, title, edition, and destination against
the linked record before shipping it. The brief's source map lists verified
candidates; re-verify anything you substitute.

Single-file check, which must print OK:

    node scripts/check.mjs <absolute path to your parked file>

run from the repo root. Do not run the full gate; do not touch the manifest.

## Nonnegotiable hygiene

- No em dashes or en dashes anywhere, including date ranges ("632 to 750").
  Use commas, colons, periods, parentheses, or the word to.
- Normal possessives and contractions; curly apostrophes (’) keep
  single-quoted JavaScript easy. The gate fails apostrophe-less prose.
- Label composite characters and reconstructed scenes plainly in storyContext.
- Never invent a quotation, thought, gesture, smell, room, or sequence and let
  the reader mistake it for documented fact. A real named person does not make
  an invented scene documented; say which is which.
- Dates carry BCE or CE on first use in each section.
- No headings, lists, or markdown inside story or significance.
- Name uncertainty once, clearly, where it matters; do not fog every sentence.
- Before calling two people or events contemporaneous, compute the dates.
- Never attribute a paper from a search snippet; resolve DOI or publisher.

## The literary bar

Loom is artwork. A merely competent survey entry is a failure.

Era V's prose should surpass Era IV's the way Era IV surpassed Era III:
tighter cadence, images that earn their return, transitions that do argument
work, endings that land without a moral being pinned to them. Sentence music
must never perfume an empty claim. Prefer one image that deepens across the
lesson over a cupboard of metaphors opened once each.

The cold open places the reader inside pressure: someone wants, fears, counts,
carries, or must decide. Atmosphere alone is not a scene. The scene must
dramatize the node's historical mechanism, and the story must end where the
reader can feel the question that significance will answer. Significance does
not retell the story; it rises: evidence, mechanism, named debate, consequence,
inheritance. Its last paragraph returns to the opening image with its meaning
changed.

Do not write the museum-audio-guide voice. Do not announce that everything
changed forever. Arrange the facts until the reader feels why they did.

## The architecture of the era

The era runs from about 600 to 1100 CE. Era IV asked how a form of order
outlives its makers. Era V asks a stranger question: what can a shared belief
build that an army cannot hold? Its answers are infrastructural. A recitation
becomes a book, the book becomes law, courts, and a translation economy. Merit
becomes woodblocks; scripture becomes alphabets; faith travels as contract law
down caravan roads and monsoon lanes. Meanwhile Europe reboots on scavenged
Roman parts, and the Americas raise a city whose carriers of order, earth,
plaza, and feast, owe nothing to any book at all. The era's quiet question:
belief as infrastructure, and infrastructure as belief. Money that is only
paper, a truce that is only memory, a church unity that is only enforced
paperwork: each holds exactly as long as enough people keep treating it as
solid.

The thirteen lessons make one deliberate movement:

1. recitation-in-the-desert: a voice becomes a community with a book at its
   center.
2. gupta-zero: nothing becomes a number; rules make the unthinkable calculable.
3. caliphate-lightning: the community becomes an empire that conquers by
   keeping the paperwork running.
4. tang-golden-network: the open empire at the road's east end, and the hinge
   where its confidence breaks.
5. europe-reboots: an old title re-erected on scavenged columns.
6. house-of-wisdom: the book faith builds a translation economy and banks the
   ancient world's knowledge.
7. northmen-networks: raiders and traders as one expansion, silver as its
   bloodstream.
8. golden-sahara: the desert crossed by contract; African gold under the
   world's coins.
9. monsoon-marketplace: the ocean as a machine; globalization without a
   hegemon.
10. song-economic-miracle: the examination state and the near-industrial
    economy; money thins to paper.
11. heian-and-genji: the borrowed model made native; the vernacular hand
    writes the interior life.
12. mound-and-mountain: American statecraft in its own idioms, earth and
    thread instead of book and coin.
13. great-schism: the believing world's unity fails at the altar, on paper,
    by increments.

Avoid an Islam-and-China center of gravity flattening the rest. Each lesson
owns its world; the reader should feel the whole planet believing, building,
and accounting at once.

Vary the movement across the thirteen. The era should feel composed, not
templated. The briefs assign each lesson a governing image and a distinct
story movement: a collection of scattered words, a rulebook in verse, a tax
receipt, a stele carved in a foreign faith's memory of the open city, a coronation among
scavenged columns, a translator collating corrupt copies, an eyewitness on the
Volga, a geography assembled from hearsay, a crossing remembered into a geography,
a poem about coal smoke, a diary at a cloistered court, a plaza raised by
basket-loads, a parchment left on an altar. Let each motif return once, at the
hinge or the end, with its meaning changed.

## Reporting

When your lesson is done, report: the file path; story plus significance word
count; the single-file check output; any claim you softened or omitted and
why; any source you replaced and why; any scene detail that remains explicit
reconstruction; and optionally a replacement hook or summary (40 to 80 words)
for the node if the finished lesson found a more beautiful formulation. Do not
edit the graph yourself.
## Curation: binding per-lesson decisions

Each lesson has a full research brief at docs/era-v-briefs/<id>.md covering
scene documentation ledgers, factual traps with sources, significance spines,
and a verified source map. The briefs' node-data flags have already been
adjudicated and the era file corrected where warranted (commit d472ecd);
write against the current data/eras/05-believing-world.js, and do not
re-litigate flags marked as fixed.

Callback assignments below are BINDING (they were balanced across the whole
era: no earlier lesson carries more than two Era V callbacks). The angle
given is the comparison the question should build; the brief's callback
design section has the full argument. Scenes are approved as listed; the
brief governs the details.

### 1. recitation-in-the-desert (The Recitation)

- Scene: Zayd ibn Thabit and the first collection at Medina, c. 632 to 634,
  framed honestly as the tradition's own memory of how a voice became a book
  (al-Bukhari 4986, two centuries later). The cave at Hira may appear only as
  what tradition remembers, never as documented fact.
- Callbacks: israel-one-god (two portable monotheisms forged under opposite
  pressures, exile against community-building); tribe-of-strangers (the umma
  as the largest kinship fiction yet, which kept the clans it claimed to
  transcend).
- Guardrails: label 610 and the Year of the Elephant chronology as
  traditional; Birmingham folios date the parchment's animal, not the text;
  Mecca was a sanctuary town with regional trade, not a great emporium.

### 2. gupta-zero (Rules for Nothing)

- Scene: Brahmagupta composing the cipher and fortune-and-debt verses of
  Brahmasphutasiddhanta chapter 18 at Bhillamala, 628. Never call him
  Gupta-era; the id is legacy.
- Callbacks: invention-of-writing (a mark that holds a number's place against
  marks that hold speech; the second externalization); code-of-hammurabi (two
  lists of terse rules in fixed form, and whether a list of cases is a
  system).
- Guardrails: Brahmagupta did not invent zero, he legislated for it; his
  cipher-divided-by-cipher rule is wrong and the a/0 case is left as a formal
  object; Bakhshali radiocarbon claims are disputed (Plofker et al.); the
  Sindhind reached Baghdad in the 770s, half a century before the c. 820
  house-of-wisdom anchor.

### 3. caliphate-lightning (The Caliphate's Lightning)

- Scene: PERF 558, the bilingual Greek and Arabic receipt for sixty-five
  sheep, Herakleopolis, 25 April 643: armies pass, paperwork stays.
- Callbacks: byzantium-endures (the exhausted victor loses Syria and Egypt
  within a decade; the dome's hidden structure against the receipt's hidden
  continuity); pax-romana-machine (two thin centers resting on local
  administration; what the conquerors kept running).
- Guardrails: two conquest phases (636 to 651, then 698 to 711 under a later
  dynasty); early fiscal categories fluid, mature dhimma is eighth to ninth
  century; conversion ran far behind conquest (Bulliet); no bedouin-horde
  framing, the armies founded garrison cities.

### 4. tang-golden-network (Tang: The Open Empire)

- Scene: the carving of the Church of the East stele, Chang'an, 4 February
  781, with its named author Jingjing (Adam), calligrapher Lü Xiuyan, and
  patron Yisi: a foreign faith writing 146 years of the open city into stone,
  after the break of 755. State the date math plainly.
- Callbacks: han-mandate (what changed in recruitment between the two Wus,
  seven centuries apart); silk-road-pulse (the relay system seen from inside
  one marketplace at its eastern end).
- Guardrails: exams prestigious but small, great clans held office to the
  end, maturity is Song; register collapse measures administrative breakdown,
  not a body count; "a million" is the metropolitan prefecture; say Church of
  the East.

### 5. europe-reboots (Europe Reboots)

- Scene: the two days at St Peter's, 23 and 25 December 800: Leo III's
  purgation oath, then the crown, with Einhard's suspicious anecdote weighed
  as courtly apologetics. Aachen's Ravenna spolia may carry the reboot image.
- Callbacks: byzantium-endures (two courts claim one Roman name; Irene's
  throne vacant only from Rome's side of the sea); iron-and-alphabet (a
  smaller sign inventory lowers one wall; Caroline minuscule as the alphabet
  lesson replayed inside Latin).
- Guardrails: never "Holy Roman Empire" for 800; the West kept memory, not
  apparatus; Carolingian copies carry most surviving classical Latin; no
  liberty teleology on the divisions.

### 6. house-of-wisdom (The House of Wisdom)

- Scene: Hunayn ibn Ishaq hunting Galen's On Demonstration across
  Mesopotamia, Syria, Palestine, and Egypt, from his own Risala: the
  translation movement as work, not legend.
- Callbacks: gupta-zero, era-internal (Brahmagupta's rules riding the
  Sindhind into Baghdad in the 770s; what a translation movement does to a
  mathematics); alexanders-comet (Alexandria's state-funded learning and its
  afterlife; no straight pipeline, and who inherits a library).
- Guardrails: the weight-in-gold story is a 13th-century anecdote, label it;
  the bayt al-hikma's nature is the named debate (Gutas, van Bladel); the
  movement spans two centuries and many patrons; Ibn al-Haytham belongs to
  Fatimid Cairo; leading translators were Christians and a Sabian.

### 7. northmen-networks (The Northmen's Networks)

- Scene: Ibn Fadlan among the Rus at the Volga Bulghar market, 922: raid,
  trade, and settlement in one documented eyewitness frame, slavery stated
  honestly as a core commodity.
- Callbacks: phoenician-web (networks named by outsiders, known by their
  victims' words and their own foundations); sea-peoples-collapse (who
  writes the record of a raider, and what the ground says instead).
- Guardrails: the famous "fury of the Northmen" prayer is unattested, say so
  and quote Alcuin instead; dirhams are mostly Samanid Central Asian mints
  via the Volga; "the Rus," not "Russia"; Althing is a chieftains' assembly
  in a slave-holding society; Vinland wood-cutting dated 1021 (Nature 2021).
  
### 8. golden-sahara (Gold Roads of the Sahara)

- Scene: Tadmekka, c. 900: gold dust cast into blank coin molds (excavated,
  radiocarbon dated c. 850 to 950; al-Bakri corroborates "bald" dinars),
  with al-Bakri assembling Ghana from hearsay in 1068 as the second movement.
  State the 168-year gap between node date and richest text.
- Callbacks: invention-of-money (the mark against the blank: verification
  compression against gold pure enough to need no stamp); bantu-and-aksum
  (two African archives, a language map and a coin legend, now joined by a
  desert crossed by contract).
- Guardrails: salt south, gold north; the camel accelerated older contacts,
  it did not open a sealed desert; Almoravid "conquest of Ghana 1076" is
  doubted (Conrad and Fisher, the named debate); kings converted late and
  layered.

### 9. monsoon-marketplace (The Monsoon Marketplace)

- Scene: al-Masudi's own crossing from Qanbalu back to Oman, 916 to 917, in
  the ship of named Sirafi owners: a real passenger on a documented voyage.
- Callbacks: silk-road-pulse (relay against hull: overland nobody saw the
  whole, at sea one ship could run the chain); bronze-web (what breaks a web
  with a palace layer against what a web without one survives).
- Guardrails: Srivijaya taxed the straits, the Chola raided them (1025);
  sewn-plank ships, not "dhows"; no horses as headline cargo at c. 950;
  Belitung is 110 to 125 years earlier than the node date, state the math;
  monsoons are seasonal, not safe.

### 10. song-economic-miracle (The Song Economic Miracle)

- Scene: Su Shi at Pengcheng, January 1079: the dated "Stone Coal" poem,
  furnaces north of Baituzhen, the reprieved chestnut forests. The jiaozi
  and Bi Sheng belong to significance with their own dates.
- Callbacks: invention-of-money (money's substance thins to pure promise;
  what makes a state's paper hold); rice-and-the-yangtze (Nuo's unwitting
  millennia of selection against a court shipping early-ripening seed with
  printed instructions in 1011 to 1012).
- Guardrails: iron figures are Hartwell's contested estimate, named as such
  (Wagner's critique is the honest counterweight); champa rice ripened
  early rather than doubling harvests; the mobility debate (Kracke against
  Hartwell and Hymes) is the named debate; no teleology of failure.

### 11. heian-and-genji (The Pillow and the Brush)

- Scene: the Tsuchimikado mansion, eleventh month of 1008: Kinto's "young
  Murasaki" quip, the celebrations for Prince Atsuhira, the secret Bo Juyi
  lessons for Empress Shoshi, all from Murasaki's own diary.
- Callbacks: tang-golden-network, era-internal (what the borrowed package
  becomes when the importer stops sending ships); invention-of-writing
  (script as social gatekeeper: Uruk's hard script guarded by scribes, kana
  as the unguarded channel that produced the masterpiece).
- Guardrails: embassies lapsed while private trade sailed on, no isolation;
  kana was not women-only and no law barred women from Chinese; Genji is
  "often called" the first psychological novel, circulating by 1008; mono no
  aware is an 18th-century coinage, keep it out of Heian mouths.

### 12. mound-and-mountain (Mound and Mountain)

- Scene: Cahokia, c. 1050: the plaza-raising feast whose leavings filled the
  borrow pit under Mound 51 (swans, deer, thousands of vessels), composite
  laborer labeled plainly. The Andean movement pivots with explicit date
  math: Wari and Tiwanaku, c. 600 to 1000, were fading as Cahokia rose.
- Callbacks: maize-and-the-americas (the crop and the haulers, no animal in
  harness, from domestication to big bang); teotihuacan-maya (a third kind
  of archive: speaking stone, silent murals, and now earth and post molds).
- Guardrails: population estimates range 6,000 to 40,000, name the
  uncertainty; footprint not volume against Giza; Mound 72 handled with the
  2016 reanalysis in view; descendants are living nations (Osage and other
  Dhegihan connections argued), no vanishing tropes.

### 13. great-schism (The Great Schism)

- Scene: Hagia Sophia, the third hour, Saturday 16 July 1054: the bull on
  the altar, the dust shaken from the legates' feet, the deacon in the
  street, told with its pettiness intact; then the complication that nobody
  present thought Christendom had split.
- Callbacks: jesus-to-constantine (councils and creeds as boundary
  technology, built under patronage, now running without an referee both
  sides accept); sea-peoples-collapse (famous dates as retrospective labels:
  1177 and 1054 as bookkeeping for processes that took centuries).
- Guardrails: Leo IX was dead in April 1054, the legates' mandate arguably
  void; excommunications were personal, and the synod condemned the bull's
  authors, not the Latin church; azymes was the hot issue, filioque the deep
  one; 1204 deepened what 1054 marked; the anathemas were lifted 7 December
  1965, "removed from memory and from the midst of the Church."
