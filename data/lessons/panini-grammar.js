LOOM.lesson({
  id: 'panini-grammar',
  readingMinutes: 10,
  citationsVersion: 1,
  sources: [
    {
      key: 'kiparsky-2022',
      cite: 'Paul Kiparsky, "Panini", chapter 3 of The Oxford History of Phonology, Oxford University Press: 38 to 63 (2022)',
      url: 'https://web.stanford.edu/~kiparsky/Papers/panini_hist_of_phon_handbook.pdf',
      doi: '10.1093/oso/9780198796800.003.0003',
      kind: 'book',
      access: 'open',
      note: 'The clearest scholarly account of how the grammar works, and the source of this lesson’s hard numbers: 3,981 rules made of 9,737 words in eight chapters, the four components (Ashtadhyayi, the root list, the stem lists, the fourteen sound lines), the pratyahara device generating 292 possible abbreviations of which Panini uses 42, dittoing (anuvritti), deletion as substitution by lopa defined as invisibility, the Minimum Description Length principle Kiparsky calls Panini’s Razor, the phonetic treatises and word-by-word Vedic texts behind the method, the language stage of about 500 BCE, and the claim that the grammar is a source of many key ideas in Western linguistics over the last two centuries. Paywalled at Oxford; the link is the author’s own copy on his Stanford page.',
    },
    {
      key: 'penn-kiparsky-2012',
      cite: 'Gerald Penn and Paul Kiparsky, "On Panini and the Generative Capacity of Contextualized Replacement Systems", Proceedings of COLING 2012: Posters, Mumbai: 943 to 950 (2012)',
      url: 'https://aclanthology.org/C12-2092/',
      kind: 'paper',
      access: 'open',
      note: 'The careful test of the computing comparison: the resemblance to the rewriting systems of programming language theory is called striking but cosmetic, a subtle difference in how rules are stopped from applying cyclically makes a massive difference in generative capacity, the Paninian formalism generates string languages outside the multiple-component tree-adjoining languages for any k, Panini himself uses that power very sparingly, and his metarules deliver a single derivation for every grammatical sentence, which no system in the Chomsky hierarchy does. Also the source of the date range given as ca. 450 to 350 BCE. Free full text at the ACL Anthology.',
    },
    {
      key: 'rajpopat-2022',
      cite: 'Rishi Atul Rajpopat, "In Panini We Trust: Discovering the Algorithm for Rule Conflict Resolution in the Ashtadhyayi", PhD dissertation, University of Cambridge, submitted 2021 and published online 15 December 2022',
      url: 'https://www.cam.ac.uk/system/files/rajpopat_phd_thesis_15_dec_2022.pdf',
      kind: 'paper',
      access: 'open',
      note: 'The proposal at the centre of the modern argument, and the source of the traditional reading of 1.4.2 it rejects: that in a conflict between rules of equal strength the later rule in the sequence wins, propped up by the nitya, antaranga and apavada categories plus, in his words, numerous additional metarules for umpteen exceptions. Rajpopat replaces those with same-operand and different-operand interaction and rereads para as the right-hand side. Also the source for composition around 350 BCE in north-western South Asia, the eight books of four chapters each, and the footnote stating that scholars disagree over whether Panini used writing, that Vergiani has argued he did, and that the text was in any case handed down orally as the Vedas were. Free full text at Cambridge.',
    },
    {
      key: 'kiparsky-2026',
      cite: 'Paul Kiparsky, "Reparsing Panini", Cracow Indological Studies 28(1): 13 to 57 (2026)',
      url: 'https://journals.akademicka.pl/cis/article/view/7558',
      kind: 'paper',
      access: 'open',
      note: 'The published rebuttal that keeps the question open: Kiparsky argues that Rajpopat’s version of generalized blocking is ill defined, that his new principle yields the wrong results in a large class of cases, that his criticism of the Joshi approach is misguided, and that a Joshi-type account covers both what Rajpopat gets right and what he does not. Its abstract, its section 3 and its reference list answer Rajpopat 2025, the Harvard University Press book Panini’s Perfect Rule, not the 2022 dissertation, which is why this lesson names the book. The DOI printed on the article’s first page, 10.12797/CIS.28.2026.01.03, is not yet registered and resolves to nothing, so it is left out here and these fields are taken from that page instead. Free full text at Akademicka.',
    },
    {
      key: 'bronkhorst-2001',
      cite: 'Johannes Bronkhorst, "Panini and Euclid: Reflections on Indian Geometry", Journal of Indian Philosophy 29(1 to 2): 43 to 80 (2001)',
      url: 'https://iris.unil.ch/bitstreams/b6b1a2a4-9491-4919-82dd-46a33d26e3dd/download',
      doi: '10.1023/A:1017506118885',
      kind: 'paper',
      access: 'open',
      note: 'Where the grammar-as-model-science thesis is stated and then tested: Ingalls’s 1954 observation that Greek philosophy leaned on mathematics while Indian philosophy leaned on grammatical theory, Staal’s claim that Panini’s method held a place comparable to Euclid’s in the West, Bronkhorst’s judgement that the thesis remains interesting but under-tested and that classical India was not short of mathematics, and his demonstration that Aryabhata and Brahmagupta in 628 CE state geometry in sutra-style compression with no proof, no examples and no diagrams. He raises the possibility that this brevity was a mixed blessing for mathematics, holds that such a conclusion would not do full justice to the evidence, and suggests instead that the missing proofs may in part reflect mathematicians being less exposed to debate and controversy than the philosophers, while still allowing that Panini’s example may conceivably have lent added respectability to a geometry without proof. Author’s copy at the University of Lausanne repository.',
    },
    {
      key: 'panini-sutrapatha',
      cite: 'Panini, Ashtadhyayi or Sutrapatha, digital edition prepared by volunteers at Sanskrit Documents, last updated 28 August 2021',
      url: 'https://sanskritdocuments.org/doc_z_misc_major_works/aShTAdhyAyI.html',
      kind: 'primary',
      access: 'open',
      note: 'The bare rules, numbered by book, chapter and position, which is how the lesson can quote addresses: 1.1.60 adarshanam lopah, defining deletion as invisibility; 1.4.2 vipratishedhe param karyam, the only rule that names conflict itself; 6.1.72 samhitayam, the heading five rules upstream; and 6.1.77 iko yanaci, the rule the story turns on. Counting the numbered rules in this edition gives 3,981, matching Kiparsky’s independent count exactly.',
    },
  ],
  storyContext:
    'A grammarian’s courtyard in north-western South Asia, in the fourth century BCE. The teacher and the boy are composites: the Ashtadhyayi survives complete and its author’s life does not, so both people here are built out of the text itself and out of what is known about how it was taught by recitation. The boy’s closing question is a deliberate anachronism. The answer his teacher gives is the reading first attested in Katyayana, a century or more after Panini, and the alternative the boy gropes for is one published in 2022.',
  story: [
    'The boy is reciting the fourteen lines again, cross-legged on packed earth still cool from the night, and he has been at them a month without knowing what they are for. They are not a hymn and they are not sentences. Each line is a short run of bare sounds that ends in one extra consonant with no apparent purpose: the first line goes a, i, u, and then an n, and the second gives two more vowels and then a k. He can get through all fourteen in the dark, faster than he can say the names of his cousins, and his teacher, sitting in the shade of the wall with a bowl of water at his knee, has never once told him what they mean.',
    'This morning the teacher stops him halfway down the third line and gives him a rule instead. It is three words long, and because Sanskrit runs the sounds of neighbouring words together it is written as two: iko yanaci. Opened at the join, so that all three words can be seen, it is iko yan aci. The boy repeats it and waits, because three words does not seem like enough to be anything.',
    'Every word in it is an address, the teacher says. He counts while he talks, his thumb walking down the joints of his fingers the way reciters keep their place. Take the first word. Begin at the i in the opening line of the sound list, read forward until you reach the k that closes the second line, and stop before it: that stretch is what the first word names, four vowels in two syllables. Now the middle word. Begin at the y partway down the fifth line and stop at the n on the sixth, and you have y, v, r and l. Now the last. Begin at the a that opens the whole list and read down to the c at the end of the fourth line, and you have nine sounds, which is every vowel in the language. The consonants at the ends of the lines are not sounds in the list at all; they are markers, put there so that any stretch of it can be named by its two ends.',
    'The case endings finish the job, because in this grammar a case ending is an instruction. The first word is in the genitive, which in a substitution rule marks the thing that gets replaced. The middle word is in the nominative, which marks what replaces it. The last is in the locative, which marks the environment the swap happens in. So the whole rule says that any of those four vowels becomes the matching one of those four consonants when another vowel follows. Dadhi is curds and atra is here, words the boy has said over a bowl at breakfast without noticing what his own mouth did to them; say them one after the other the way people actually speak, and you get dadhy atra. The rule is the seventy-seventh in the first chapter of the sixth book.[^panini-sutrapatha]',
    'There is a fourth word in the rule, the teacher adds, and it is not written. Five rules earlier a heading says samhitayam, in close juncture, meaning that the sounds are running together as they do in speech, and that word goes on governing everything after it until some rule contradicts it. Rather than repeat it, you carry it down. The shade has pulled back to the boy’s knees, and he understands for the first time that the order he recites the eight books in was doing work.',
    'What he is beginning to see, with his throat raw from the morning, is why the grammar is so short. It is not a book about Sanskrit but a machine for producing Sanskrit, and nearly every convention in it exists to keep that machine small enough to be held in one memory. What comes out the far end is any correct sentence you like, including ones nobody has ever said.',
    'By late afternoon the boy has found the difficulty, and he asks about it. If two rules fit the same word at the same moment, which one acts? The teacher gives him one more line, three words from the fourth chapter of the first book: vipratishedhe param karyam. In a conflict, the later operation is the one performed.[^rajpopat-2022] Later in what sense, the boy asks: further along in the recitation of the eight books, or further to the right in the word itself? The teacher answers without hesitating that it is the first of the two, and the boy lets it go, because it is nearly dark and there is food. He has just asked out loud in a courtyard a question that the people who read this grammar for a living have not finished answering.',
  ],
  significance: [
    'Everything in that courtyard comes out of one text. The Ashtadhyayi takes its name from its eight adhyayas, chapters or books in English, each divided again into four, which is why a rule carries a three-part address. In Paul Kiparsky’s count it holds 3,981 rules made of 9,737 words altogether, about four and a half times the length of the lesson you are reading. Three companion lists come with it: roughly two thousand verbal roots, a set of stem lists the rules point at, and the fourteen lines of sounds the boy memorised first. The abbreviation trick he was shown can generate 292 possible names out of that sound list, and Panini uses 42 of them. Kiparsky calls the governing principle Minimum Description Length: a device is charged against the entire system, conventions and lists included, so it earns its place only if it makes the whole grammar shorter.[^kiparsky-2022] Counting the numbered rules in a modern digital edition of the bare text gives 3,981 as well, though the figure usually quoted is about four thousand and totals shift with how you count.[^panini-sutrapatha]',
    'It did not arrive out of nowhere. For centuries the people whose job was keeping the Vedic hymns exact had been building the tools he would generalise. The phonetic treatises, the shiksha, had already sorted every sound of the language by where in the mouth it was made and how open the passage was. More consequentially, scholars had produced word-by-word versions of the recited texts, undoing every join speech makes where one word runs into the next, and then formulated rules for putting the running text back together: rules of the form A becomes B between C and D. The substitution rule was in service before the grammar existed.[^kiparsky-2022] Panini’s object was not primarily scripture, though. It was the standard learned speech of his own time, a stage of the language between Vedic and the classical Sanskrit that came later. Vedic gets its own provisions, ninety-nine rules carrying the word chandasi, in the Vedic, but it is the marked case and ordinary speech is the default.[^panini-sutrapatha] He did not invent Sanskrit and he did not put the vernaculars out of business. He described one prestigious register with more precision than anyone had yet described anything.',
    'The man himself is almost entirely missing: no biography, no dated event, no anecdote that survives scrutiny. Gerald Penn and Paul Kiparsky write ca. 450 to 350 BCE and leave it there.[^penn-kiparsky-2012] Rishi Rajpopat, resting on George Cardona’s survey of the evidence, places the composition around 350 BCE in north-western South Asia, grants in the same breath that the dating is much disputed, and deliberately writes composed rather than wrote, because scholars do not agree that Panini used writing at all.[^rajpopat-2022] He notes that Vincenzo Vergiani has argued strongly that Panini did use written means to put the grammar together; the case on the other side is that a rule system can be built and carried entirely in trained memory, which is demonstrably what happened afterwards, since the text was handed down by recitation exactly as the Vedas were. The label on this node names the fourth century BCE, which is where most of that argument settles rather than where it ends.',
    'The argument that has never stopped is the one the boy walked into. Panini composed several rules to govern how his rules interact, but only one of them names conflict outright. Katyayana, around 250 BCE, the first scholar known to have gone through the grammar rule by rule, read that one as: when two rules of equal strength both apply, the later one in the sequence wins.[^rajpopat-2022] His varttikas, terse notes that explain, test and sometimes correct the rules, were absorbed into Patanjali’s Mahabhashya, the Great Commentary, and later grammarians treated Panini, Katyayana and Patanjali as the munitraya, the three sages, siding with the latest of them when they disagreed.[^kiparsky-2022] Equal strength was doing enormous hidden work in that reading, and the commentators had to add category after category, and then metarule after metarule, to specify when two rules did not count as equal. Rajpopat’s Cambridge dissertation, put online in December 2022, threw the categories out. He sorts conflicts by whether the two rules act on the same piece of the word or on different pieces, argues that the more specific rule wins in the first case, and rereads the key word in the metarule as meaning the right-hand side rather than the later position. Cambridge announced a puzzle two and a half millennia old, and the story went round the world’s newspapers. Rajpopat expanded the thesis into a book, Panini’s Perfect Rule, in 2025, and in 2026 Kiparsky answered that book in Cracow Indological Studies, holding that its version of blocking is ill defined, that its new principle gives wrong results across a large class of cases, and that the older approach he favours covers both what Rajpopat gets right and what he does not.[^kiparsky-2026] However that ends, notice what is happening: a text from the fourth century BCE is being tested like a scientific theory, by predictions, counterexamples and published replies, which is what Katyayana was already doing.',
    'The comparison you will meet everywhere is with computing, and it needs care. Penn and Kiparsky tested the strong version and called the resemblance to modern rewriting systems striking but cosmetic. One subtle difference, in how Panini prevents a rule from applying to its own output over and over, changes the power of the system enormously: the Paninian formalism can generate string languages lying outside even the multiple-component tree-adjoining languages, far outside the machinery a programming language needs. And Panini barely uses that power, working a very versatile tool sparingly, for brevity and elegance. They also note something no system in the Chomsky hierarchy has: his conventions deliver exactly one derivation for every grammatical sentence, which is precisely what a metarule on conflict is for.[^penn-kiparsky-2012] So the accurate claim is not that he wrote the first program. It is that he built a formal system, with a metalanguage, defaults, exceptions and ordered operations, twenty-three centuries before there was a field that studied such things, and that when the field arrived it recognised him.',
    'The largest claim is about what kind of science a culture takes as its model. In 1954 Daniel Ingalls observed that Greek philosophers reached for mathematics wherever they could, while Indian thinkers, who were perfectly good mathematicians, reached for grammatical theory instead. Frits Staal turned that into a thesis: Panini’s method held a place in India comparable to Euclid’s in the West. Johannes Bronkhorst went looking for the evidence, judged the thesis interesting but under-tested, and pointed out that classical India was not remotely short of mathematics. What he found was a shared manner of presentation and no proof of influence. Aryabhata, and Brahmagupta in 628 CE, state their geometry in the compressed manner of a grammatical rule, pushed to the highest generality and given without proof, examples or diagrams. Bronkhorst wonders whether the brevity that served grammar so well was a mixed blessing for mathematics, then refuses the idea as too easy: Indian mathematicians, unlike the philosophers beside them, were not obliged to defend every position against opponents, and he offers that missing pressure as part of why the proofs are absent.[^bronkhorst-2001] Here the ideas thread and the craft thread run together: a theory of language that was also a manufactured object, built to a specification. What is beyond dispute is the science it founded at home. Kiparsky credits two thousand years of commentatorial ingenuity with good headway on a text much of which is still poorly understood: the Kashika paraphrasing every rule for students, Bhartrihari taking the system into the philosophy of language, Nagesha setting out its metarules in the eighteenth century, and Bhattoji Dikshita rearranging it into the textbook still used to teach it in India. He also calls the Ashtadhyayi a source of many of the key ideas in Western linguistics of the last two centuries.[^kiparsky-2022] The zero element, the ordered rule, the abstract underlying form nobody ever pronounces: a modern linguistics course is a late entrant to an argument that has run in Sanskrit since Katyayana first sat down with the text.',
  ],
  threadsOut: [
    {
      to: 'gupta-zero',
      why: 'Panini already keeps a zero inside his machine, the substitute called lopa, defined as invisibility, and a thousand years later Brahmagupta gives zero its arithmetic in the same clipped rule style and with the same refusal to show working. The habit of compression travelled between the sciences; nobody has shown the idea did.',
    },
    {
      to: 'transistor-to-internet',
      why: 'Computer scientists keep meeting their own working habits in this text: a metalanguage, ordered operations, defaults overridden by exceptions. The recognition is real and the descent is not, since the formalism turns out to be far stronger than anything a compiler needs and Panini used almost none of that strength.',
    },
    {
      to: 'euclid-elements',
      why: 'Daniel Ingalls and Frits Staal set these two texts beside each other: the grammar held a place in Indian intellectual life comparable to the one the Elements held in the West, each showing its culture what a finished body of knowledge ought to look like. Bronkhorst tested the parallel and found a shared taste for compression rather than any line of influence.',
    },
    {
      to: 'upanishadic-turn',
      why: 'These are two answers to the same inheritance. A liturgy that had to be kept exact produced teachers who turned the question inward on the self, and scholars who turned the tradition’s own tools outward on the living learned speech of their day, and both moves happened inside the institution rather than against it.',
    },
    {
      to: 'rigveda',
      why: 'The reciters who pulled the hymns apart word by word to protect them had already formulated substitution rules for putting the running text back together. Panini took those tools off a single sacred corpus and pointed them at a whole living language.',
    },
  ],
  questions: [
    {
      type: 'recall',
      prompt: 'The rule the boy is given is three words long. What does it actually say, and how can three words say it?',
      answer:
        'It says that four vowels, i and u among them, are replaced by y, v, r and l respectively when another vowel follows, which is what turns dadhi atra, curds here, into dadhy atra. All three of its words are abbreviations cut out of a fourteen-line list of the language’s sounds by naming a start point and an end marker, so a set of four sounds, or of all nine vowels, fits into a syllable or two. The rest of the work is done by case endings, which in this grammar are instructions: genitive for what is replaced, nominative for the replacement, locative for the environment. A fourth word, in close juncture, is not written at all; it is carried down silently from five rules earlier.',
    },
    {
      type: 'why',
      prompt: 'Why did the most formal grammar of the ancient world grow out of a tradition of recitation rather than one of writing?',
      answer:
        'Because the problem it solves is a preservation problem. Keeping a memorised liturgy exact across centuries forces precision about sounds, about where one word ends and the next begins, and about what happens at the join. The scholars who made word-by-word versions of the Vedic texts had already framed substitution rules to reassemble them, and Panini generalised those tools from one corpus to a whole language. Memory also explains the compression: a text you carry in your head costs you something for every syllable, so brevity was not a style but the design constraint.',
    },
    {
      type: 'why',
      prompt: 'What breaks if you delete the metarule on rule conflict and leave everything else standing?',
      answer:
        'The grammar stops being a machine and becomes a pile of observations. Kiparsky reckons that deriving even a simple sentence applies hundreds of rules, and on the order of a thousand once you count the definitions, the metarules and the rules that were potentially applicable but got blocked; several are live at any one step, so with no principle for choosing, one input yields several outputs and nothing decides which of them is Sanskrit. Penn and Kiparsky point out that a single derivation per grammatical sentence is a property no formal system in the Chomsky hierarchy has, and it is bought entirely with metarules like this one. It is also, not by accident, the piece of the design scholars are still fighting over.',
    },
    {
      type: 'callback',
      prompt: 'The Rigveda lesson called the recitation system a checksum run by a human throat, and described the padapatha, the word-by-word text Shakalya pulled out of the running hymns. Panini uses the same tools in the same medium. What are the two of them for, and where do they part?',
      callbackTo: 'rigveda',
      answer:
        'The reciters were defending one fixed text against drift: the word text, the overlapping pairs, the braided orders all exist so that a single syllable cannot move without contradicting itself somewhere else. Panini borrowed their substitution rules and aimed them somewhere else entirely. His grammar preserves no particular sentence; it generates any correct one, including sentences nobody has said. That is the step from an archive to a theory, made inside the same tradition, in the same medium, out of apparatus built for the older job.',
    },
    {
      type: 'callback',
      prompt: 'Uruk’s script began as bookkeeping, and six or seven centuries passed before writing there could carry extended speech and argument. Panini’s grammar is the most formally sophisticated text of its millennium, and scholars are not agreed it was written down at all. What does the pair suggest about writing and complex thought?',
      callbackTo: 'invention-of-writing',
      answer:
        'That writing is a storage and transmission technology before it is a thinking one, and the two capacities do not arrive together. Mesopotamia held a script for centuries while its uses stayed administrative and numerical, and South Asia produced a rule-governed formal system whose transmission ran through trained throats. Do not flip the moral over, though: the case is genuinely open, and Vergiani has argued strongly that Panini did use written means to put his grammar together. What both nodes rule out is the tidy story in which script arrives and thought follows it.',
    },
  ],
  deeper: [
    {
      title: 'Panini, The Ashtadhyayi, translated by Srisa Chandra Vasu, volume 1 of 8',
      why: 'The first volume of the 1891 English translation, taking Book I rule by rule with the Sanskrit alongside, where you can watch how much freight the three words of the conflict rule are expected to carry.',
      url: 'https://archive.org/details/wg1038',
    },
    {
      title: 'Paul Kiparsky, Panini',
      why: 'The best short account of how the machine actually runs, written by the linguist who has spent a career taking it apart, and openly readable on his own page.',
      url: 'https://web.stanford.edu/~kiparsky/Papers/panini_hist_of_phon_handbook.pdf',
    },
    {
      title: 'University of Cambridge, Solving grammar’s greatest puzzle',
      why: 'The announcement that put a Sanskrit metarule into the world’s newspapers, best read next to Kiparsky’s published rebuttal so you can watch a scholarly argument still moving.',
      url: 'https://www.cam.ac.uk/stories/solving-grammars-greatest-puzzle',
    },
  ],
});
