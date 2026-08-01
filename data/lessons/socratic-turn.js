LOOM.lesson({
  id: 'socratic-turn',
  readingMinutes: 10,
  citationsVersion: 1,
  sources: [
    {
      key: 'iep-socrates',
      cite: 'James M. Ambury, "Socrates", Internet Encyclopedia of Philosophy (peer reviewed)',
      url: 'https://iep.utm.edu/socrates/',
      kind: 'paper',
      access: 'open',
      note: 'States the Socratic problem directly (reconstructing the original Socrates as distinct from his literary representations, since he wrote nothing), and sets out the reading that the 403 BCE amnesty blocked openly political prosecution so the accusers opted for religious grounds.',
    },
    {
      key: 'aristophanes-clouds',
      cite: 'Aristophanes, The Clouds, translated by William James Hickie (Project Gutenberg ebook 2562)',
      url: 'https://www.gutenberg.org/files/2562/2562-h/2562-h.htm',
      kind: 'primary',
      access: 'open',
      note: 'The surviving comedy itself, including the scene in which Socrates is discovered suspended in a basket saying he walks in the air and speculates about the sun. This edition carries the text of the mockery; the play’s production date within Socrates’ lifetime is carried by the SEP Socrates entry cited beside it.',
    },
    {
      key: 'sep-aristotle',
      cite: 'Christopher Shields, "Aristotle", Stanford Encyclopedia of Philosophy (first published 2008, substantive revision 25 August 2020)',
      url: 'https://plato.stanford.edu/entries/aristotle/',
      kind: 'paper',
      access: 'open',
      note: 'Gives Aristotle’s dates as 384 to 322 BCE, his arrival at Plato’s Academy around age seventeen, and his founding of the Lyceum in 335, which fixes both dates the lesson uses.',
    },
    {
      key: 'diogenes-laertius-socrates',
      cite: 'Diogenes Laertius, Lives of Eminent Philosophers, Book II (Socrates), sections 18 to 19 and 40, translated by R. D. Hicks',
      url: 'https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_II',
      kind: 'primary',
      access: 'open',
      note: 'Preserves the wording of the indictment, reporting on Favorinus’ authority that the affidavit still survived in the Metroon; also reports Sophroniscus as a sculptor and gives the stonework attributed to Socrates himself only as a contested claim.',
    },
    {
      key: 'sep-socrates',
      cite: 'Debra Nails and S. Sara Monoson, "Socrates", Stanford Encyclopedia of Philosophy (first published 2005, substantive revision 26 May 2022)',
      url: 'https://plato.stanford.edu/entries/socrates/',
      kind: 'paper',
      access: 'open',
      note: 'Establishes that Athenian law treated irreverence (asebeia) as a capital crime and that Meletus’ document charged exactly that; gives the traditional physical description (bulging eyes, flat upturned nose, barefoot and unwashed); and dates Aristophanes’ Clouds to production within a year of the battle of Delium in 423 BCE, at which Socrates fought as a hoplite, placing the comic mockery firmly within his lifetime.',
    },
    {
      key: 'plato-meno',
      cite: 'Plato, Meno, translated by Benjamin Jowett (Project Gutenberg ebook 1643)',
      url: 'https://www.gutenberg.org/files/1643/1643-h/1643-h.htm',
      kind: 'primary',
      access: 'open',
      note: 'The classic staging of aporia: Meno, fluent about virtue a moment earlier, is left numbed and unable to say what virtue is, and the dialogue itself calls the man who has had the shock the better for it, which is the productive perplexity the lesson describes.',
    },
    {
      key: 'plato-apology',
      cite: 'Plato, Apology, translated by Benjamin Jowett (Project Gutenberg ebook 1656)',
      url: 'https://www.gutenberg.org/files/1656/1656-h/1656-h.htm',
      kind: 'primary',
      access: 'open',
      note: 'The source of the disclaimer of knowledge itself, phrased as a comparison rather than a doctrine of universal ignorance, which is precisely the distinction the lesson insists on.',
    },
    {
      key: 'aristotle-athenian-constitution',
      cite: 'Aristotle, The Athenian Constitution, part 39, translated by Sir Frederic G. Kenyon (Project Gutenberg ebook 26095)',
      url: 'https://www.gutenberg.org/files/26095/26095-h/26095-h.htm',
      kind: 'primary',
      access: 'open',
      note: 'Records the terms of the reconciliation after the Thirty, including the general amnesty for past events excluding only the named officials, which is the legal reason the political grievances around Socrates could not themselves be charged.',
    },
    {
      key: 'sep-arabic-islamic-greek',
      cite: 'Cristina D’Ancona, "Greek Sources in Arabic and Islamic Philosophy", Stanford Encyclopedia of Philosophy (first published 2009, substantive revision 23 March 2026)',
      url: 'https://plato.stanford.edu/entries/arabic-islamic-greek/',
      kind: 'paper',
      access: 'open',
      note: 'Documents three legs of the chain of hands: Syriac Christian translators before Islam, the Kindi circle and Hunayn ibn Ishaq’s workshop producing Plato and the Aristotelian corpus in Arabic, and the onward passage of an Arabic text into Latin as the Liber de Causis. The Hebrew leg of the lesson’s sentence is carried by the companion entry on Judaic thought cited beside it.',
    },
    {
      key: 'sep-arabic-islamic-judaic',
      cite: 'Mauro Zonta and Charles Manekin, "Influence of Arabic and Islamic Philosophy on Judaic Thought", Stanford Encyclopedia of Philosophy (first published 10 December 2007, substantive revision 21 February 2024)',
      url: 'https://plato.stanford.edu/entries/arabic-islamic-judaic/',
      kind: 'paper',
      access: 'open',
      note: 'Carries the Hebrew leg of the transmission sentence: almost all of Averroes’ philosophical works, including his commentaries on Aristotle, were translated from Arabic into Hebrew between 1230 and 1330, by translators including the Ibn Tibbon family and Jacob Anatoli, whose 1232 Naples translations covered the middle commentaries on Aristotle’s Categories and Porphyry’s Isagoge.',
    },
    {
      key: 'plato-phaedo',
      cite: 'Plato, Phaedo, translated by Benjamin Jowett (Project Gutenberg ebook 1658)',
      url: 'https://www.gutenberg.org/files/1658/1658-h/1658-h.htm',
      kind: 'primary',
      access: 'open',
      note: 'Explains the delay between verdict and execution: the annual mission to Delos makes the whole voyage a holy season during which the city may not be polluted by public executions.',
    },
  ],
  storyContext:
    'Athens, 399 BCE. The trial scene follows Plato’s Apology, with comparison to Xenophon. Both are literary works by admirers, not court transcripts.',
  story: [
    'The charge has survived as a sentence, though the object on which Athens first recorded it has not. It accuses Socrates of failing to honor the gods the city honors, introducing new divine things, and corrupting the young.[^diogenes-laertius-socrates] Now the man named in it stands before a large jury of male citizens selected from the same political community he has spent decades questioning. There is no black-robed judge above him, no lawyer leaning close to arrange his face. The surviving accounts do not securely give us the courtroom’s walls or the weather. They give us a voice that begins by warning the jurors about voices.',
    'Plato makes Socrates distinguish today’s accusers from older ones. For years, comedy and rumor have taught Athens to picture him as a clever talker who studies things beneath the earth and in the sky, makes the weaker argument defeat the stronger, and teaches others to do the same. Aristophanes put a character called Socrates in a basket above the stage in The Clouds, absurd and memorable. A formal answer to Meletus may take an afternoon. How does a defendant cross-examine a joke that has lived in thousands of minds for a quarter century?',
    'He tries by practicing the very method under suspicion. Meletus says Socrates corrupts the young. Who improves them? The laws, Meletus answers, then the jurors, councilors, assembly members, almost everyone except Socrates. Socrates presses the improbability. With horses, only trained people improve them while the crowd may do harm; why would young people be the reverse? Does Socrates corrupt deliberately? No one willingly makes close companions vicious, he argues, because vicious companions would harm him. If the damage is accidental, instruction rather than prosecution is the proper response. Plato has arranged the exchange to expose a weak accuser. We cannot assume Meletus sounded so helpless in the room.',
    'The religious charge cuts deeper. Socrates denies being the godless natural philosopher his enemies describe and points to his daimonion, a divine sign that sometimes restrains him. Meletus seems to accuse him at once of believing in no gods and in novel divine agencies. Socrates catches the tension, but legal piety is not merely a logic puzzle. Athenian religion lives in festivals, sacrifices, ancestral custom, military oaths, and the shared favor on which a city believes it depends. Socrates claims a divine mission to test supposed wisdom. To admirers, that makes examination an act of piety. To others, it may sound like one citizen setting a private sign and a Delphic story above civic judgment.',
    'Athens is judging with scar tissue. The city lost the Peloponnesian War in 404 BCE. An oligarchic junta remembered as the Thirty seized power, killed and dispossessed citizens, and fell the next year. Restored democracy declared an amnesty to prevent revenge from reopening civil war. Socrates had disobeyed the Thirty when they ordered him to help arrest Leon of Salamis, according to Plato, but two notorious men around his circle darkened his reputation. Alcibiades had betrayed and returned to Athens through a career of dazzling ambition. Critias became one of the Thirty’s bloodiest leaders. Socrates was not on trial formally for their crimes, and reducing the prosecution to hidden politics erases the actual charge. Yet no juror could unremember the city that clever, aristocratic men had nearly broken.',
    'A defendant was expected to persuade. Socrates refuses the theater persuasion usually included. Plato’s version says he will not bring weeping children and relatives before the jurors, though he has sons, or beg for acquittal by making pity compete with law. He will not stop questioning in exchange for life. A city needs the sting, he says, as a great sluggish horse needs a gadfly. The claim is brave and unbearable at once. He asks the people judging him to accept that their discomfort proves his value, and that obedience to his divine task outranks obedience to any command that would silence it.',
    'The ballots condemn him. In the penalty phase, after the accusers propose death, Socrates asks what he deserves. Plato has him suggest free meals in the Prytaneum, an honor given to public benefactors and victorious athletes. Only later does he settle on a fine his friends will guarantee. Xenophon also portrays a man unwilling to purchase life with humiliation, but explains his stance differently. The jury chooses death. Before he leaves, Plato’s Socrates turns examination upon the verdict itself: death may be dreamless sleep or a migration where one might question the dead. The city has ended the voice in the room. It has also given the voice a scene that students will never stop rewriting.',
    'Execution waits while a sacred ship completes its voyage to Delos, a period when Athens avoids civic pollution by putting no one to death.[^plato-phaedo] In Plato’s later Phaedo, friends gather when the ship returns. Socrates drinks the poison, walks until his legs grow heavy, lies down, and follows the cold rising through his body. The polished sequence serves a philosophical conversation about the soul, so its symptoms should not be mistaken for a medical chart or its dialogue for stenography. What the literary ending makes unforgettable is the transformation already under way. The city can stop a living exchange. Plato can place that exchange in the hands of people not yet born.',
  ],
  significance: [
    'The first fact about the historical Socrates is an absence: he wrote nothing.[^iep-socrates] Almost everything comes through people who used him for different literary purposes. Aristophanes mocked him in comedy while he was alive.[^sep-socrates][^aristophanes-clouds] Plato made him the central speaker in dialogues of many periods. Xenophon defended his usefulness and piety. Later Aristotle discussed Socratic method without ever meeting the man, since Aristotle was born in 384 BCE, about fifteen years after the execution.[^sep-aristotle] These portraits overlap and conflict. Sorting the historical questioner from Plato’s philosophical character is called the Socratic problem, and it cannot be solved by choosing whichever speech sounds most inspiring.',
    'Even the familiar body has been polished by tradition. Ancient sources connect Socrates’s father, Sophroniscus, with stoneworking, but calling Socrates himself a stonemason as settled biography goes too far.[^diogenes-laertius-socrates] Comic and philosophical texts emphasize his flat nose, prominent eyes, bare feet, endurance, and indifference to conventional beauty.[^sep-socrates] Later portraits made that strangeness recognizable in marble. The imagery matters because Socratic inquiry performs a similar reversal: social polish does not guarantee wisdom, and an awkward questioner may reveal that a celebrated general, poet, or politician cannot explain the virtue he confidently names.',
    'The method is less a doctrine than disciplined friction. Socrates asks for a definition, tests it against cases, follows the answer into contradiction, and leaves the speaker in aporia, a productive perplexity.[^plato-meno] Such questioning can expose false confidence, but it can also humiliate. It depends on who has leisure to linger, who controls the conversation, and whether public embarrassment feels like education. Socrates’s claim to know that he does not know should not become a slogan for knowing nothing.[^plato-apology] Its force lies in separating an honest limit from counterfeit certainty, then treating that admission as the beginning of inquiry rather than its defeat.',
    'Athens did not kill reason. The same democratic culture created public argument, theater, citizen juries, philosophical circles, and the space in which Socrates became famous. The formal allegations of impiety and corruption were intelligible within its laws.[^sep-socrates] Political memory also mattered: war, oligarchic terror, amnesty, and Socrates’s association with Critias and Alcibiades shaped the atmosphere even when they could not be charged as crimes.[^aristotle-athenian-constitution] Scholars disagree over the balance. Some read sincere religious prosecution; others emphasize political animus displaced into lawful categories.[^iep-socrates] The most honest lesson keeps both in view. A democracy can reasonably fear those who trained its enemies and still commit injustice against an individual who did not share their crimes.',
    'What made the turn durable was writing. Socrates practiced oral examination vulnerable to memory, rumor, and death. Plato transformed it into dialogue, a form that makes readers enter the question rather than merely receive a conclusion. That transformation is not neutral preservation. Plato could select speakers, stage silences, perfect arguments, and make Socrates carry ideas that may be Plato’s own. Around 387 BCE he founded the Academy. Aristotle later studied there, developed different methods, and founded the Lyceum around 335.[^sep-aristotle] Schools, libraries, commentaries, and later translation into Syriac, Arabic, Hebrew, and Latin let Greek arguments survive by changing hands and languages.[^sep-arabic-islamic-judaic][^sep-arabic-islamic-greek] The ideas thread therefore runs through a craft of institutions and texts, not an unbroken Western mind.',
    'The trial’s modern power lies in the conflict it refuses to tidy. Communities require shared laws and practices. They also require people who ask whether those practices deserve obedience. Critics can be vain, politically reckless, or wrong; majorities can be wounded, patient, or unjust. No procedure makes examination painless. Socrates’s gift is not a formula that automatically favors the dissenter. It is the demand that accuser, juror, teacher, and reader account for what they claim to know. Every time a courtroom, classroom, laboratory, or friendship makes room for a question that may alter the people asking it, the old oral practice begins again, with no guarantee that anyone will enjoy the answer.',
  ],
  threadsOut: [
    {
      to: 'house-of-wisdom',
      why: 'Greek philosophy reached Abbasid readers through generations of copying and translation, often by Syriac-speaking Christians before Arabic scholars criticized and extended it. Survival here means transformation, not storage in a sealed Western vault.',
    },
    {
      to: 'first-universities',
      why: 'When Aristotle’s works entered Latin curricula in force, masters and students used commentary and disputation to make inquiry institutional. The classroom inherited Socratic friction through texts Socrates never wrote and methods Aristotle built later.',
    },
    {
      to: 'athens-demokratia',
      why: 'The trial belongs inside democracy’s history, not outside it as a simple crime against thought. Citizen judgment gave Socrates a lawful hearing and a fatal verdict, forcing later readers to ask when collective authority can tolerate its own examination.',
    },
    {
      to: 'invention-of-writing',
      why: 'Writing rescued Socratic conversation from a single body and also gave Plato power to reshape it. The medium preserves a question by changing who speaks, who answers, and what later readers can mistake for a transcript.',
    },
  ],
  questions: [
    {
      type: 'recall',
      prompt: 'What were the formal charges against Socrates, and what important political experiences surrounded the trial without becoming those charges?',
      answer:
        'He was charged with impiety, including failure to honor the city’s gods and introduction of novel divine things, and with corrupting the young. The trial followed military defeat, the Thirty’s oligarchic terror, democratic restoration, and an amnesty. Socrates’s associations with Alcibiades and Critias burdened his reputation, but those associations should not simply replace the stated legal case.',
    },
    {
      type: 'why',
      prompt: 'Why can Plato’s Apology be indispensable evidence without being treated as a courtroom transcript?',
      answer:
        'Plato lived close to the event, knew Socrates, and preserves the structure of the defense, charges, accusers, and penalty exchange. He was also a literary philosopher who selected arguments, shaped scenes, and made Socrates a vehicle for inquiry. Reading him critically means using the work alongside Xenophon, comedy, legal context, and chronology rather than confusing artistry with a recording.',
    },
    {
      type: 'why',
      prompt: 'What would have been lost if Socratic questioning had remained only oral, and what changed when Plato wrote it as dialogue?',
      answer:
        'Without durable carriers, the practice would have survived mainly as unstable memory and rumor after Socrates’s death. Dialogue let distant readers perform the questions and allowed schools to teach them across generations. It also gave Plato control over speakers, sequence, and outcome, so preservation and transformation happened together.',
    },
    {
      type: 'callback',
      prompt: 'Athens: Rule of the People showed citizens exercising judgment directly. What does Socrates’s trial reveal about the strength and danger of making that political ideal a courtroom practice?',
      answer:
        'A large citizen jury disperses judgment, hears an accused person answer in public, and makes law the work of participants rather than a distant ruler. Yet participation does not dissolve fear, reputation, grief, or error. The trial turns democracy’s noblest promise into its hardest test: whether a people with the lawful power to decide can leave room for the voice that questions how well it understands.',
      callbackTo: 'athens-demokratia',
    },
    {
      type: 'callback',
      prompt: 'The Hundred Schools brought rival teachers before rulers searching for order. How is Socratic questioning another child of public argument, and why does it leave a more dangerous kind of emptiness?',
      answer:
        'Both worlds make ideas answerable in live contest rather than merely inherit authority. Warring States teachers often offer a program for cultivation or rule, even when they disagree radically about its basis. Socratic examination can end in aporia, with a confident definition broken and no replacement supplied, which makes uncertainty intellectually fertile and politically infuriating.',
      callbackTo: 'hundred-schools',
    },
  ],
  deeper: [
    {
      title: 'Plato and Xenophon, Apologies of Socrates, edited by Nicholas Denyer',
      why: 'Two admiring primary traditions placed together, making their agreements and different literary purposes visible.',
      url: 'https://assets.cambridge.org/97805217/65374/excerpt/9780521765374_excerpt.pdf',
    },
    {
      title: 'Thomas C. Brickhouse and Nicholas D. Smith, Socrates on Trial',
      why: 'A detailed Oxford study of the legal and philosophical defense that argues Socrates was sincerely trying to persuade his jury.',
      url: 'https://academic.oup.com/book/49728',
    },
    {
      title: 'British Museum, portrait head of Socrates',
      why: 'A Roman copy of a Greek portrait type created within decades of the trial, showing how the unsettling questioner became a durable visual presence.',
      url: 'https://www.britishmuseum.org/collection/object/G_1973-0327-16',
    },
  ],
});
