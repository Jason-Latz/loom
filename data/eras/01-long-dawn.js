LOOM.era({
  n: 1,
  title: 'The Long Dawn',
  span: 'c. 300,000 to 10,000 BCE',
  blurb: 'Nearly all of human time. Minds ignite, the planet fills, and every later story is loaded into the seed.',
});

LOOM.node([
  {
    id: 'spark-of-mind',
    era: 1,
    title: 'The Spark of Mind',
    date: 'c. 100,000 BCE',
    sort: -100000,
    region: 'africa',
    x: 44,
    threads: ['ideas', 'craft'],
    hook: 'In a cave by the southern sea, someone mixes paint, strings beads, and invents meaning itself.',
    summary:
      'Anatomically modern humans existed for ages before behaving in ways we recognize: composing pigments, wearing symbols, burying the dead with care. The breakthrough was symbolic thought carried by language, which let knowledge accumulate faster than genes and outlive every knower. Cumulative culture is the ratchet every later lesson depends on.',
    edges: [
      { to: 'great-dispersal', type: 'enables', why: 'Shared, teachable knowledge let small bands adapt to any biome on Earth.' },
      { to: 'tribe-of-strangers', type: 'enables', why: 'Symbols let trust stretch past the people you personally know.' },
      { to: 'invention-of-writing', type: 'echoes', why: 'Writing finishes what language began: memory stored outside a skull.' },
    ],
  },
  {
    id: 'great-dispersal',
    era: 1,
    title: 'The Great Dispersal',
    date: 'c. 70,000 to 14,000 BCE',
    sort: -70000,
    region: 'world',
    x: 52,
    threads: ['craft', 'wealth'],
    hook: 'A species that evolved for one continent walks, paddles, and shivers its way onto all of them.',
    summary:
      'From an African homeland, humans reached Australia by open water around 50,000 BCE and the Americas by the ice-bridged north before 14,000 BCE. No other large animal occupies every biome. The trick was not biology but portable culture: clothing, boats, fire, and local knowledge rebuilt generation by generation at each frontier.',
    edges: [
      { to: 'world-the-ice-made', type: 'enables', why: 'When the great thaw came, humans were already standing on every shore.' },
      { to: 'maize-and-the-americas', type: 'enables', why: 'The peopling of the Americas launched a sealed, separate experiment in civilization.' },
    ],
  },
  {
    id: 'firelight-economy',
    era: 1,
    title: 'The Firelight Economy',
    date: 'the deep past',
    sort: -60000,
    region: 'africa',
    x: 41,
    threads: ['wealth', 'power'],
    hook: 'Before money, before markets, before bosses: the longest-running economic system in human history.',
    summary:
      'Foragers ran an economy of immediate return and radical sharing. Meat was divided by rule, hoarding was shamed, and would-be big men were cut down with mockery: an enforced equality anthropologists call reverse dominance. Humans are not naturally hierarchical or naturally equal; we are naturally political. Every state and market since is built against this baseline.',
    edges: [
      { to: 'trap-of-seeds', type: 'collides', why: 'Farming overturned the forager bargain of leisure, sharing, and enforced equality.' },
      { to: 'invention-of-money', type: 'echoes', why: 'Before coin, exchange ran on memory and relationships: debt is older than money.' },
    ],
  },
  {
    id: 'tribe-of-strangers',
    era: 1,
    title: 'The Tribe of Strangers',
    date: 'the deep past',
    sort: -50000,
    region: 'world',
    x: 48,
    threads: ['ideas', 'power'],
    hook: 'How do you trust someone you have never met? Humanity’s strangest superpower has an origin story.',
    summary:
      'Primates cooperate with kin and known partners; humans cooperate in the millions with strangers. The bridge was shared fiction: totems, ancestors, rituals, and reputations that mark an unknown person as one of us. Gossip polices cheaters, ritual synchronizes feeling, myth stores the rules. Nations, religions, and corporations still run on this ancient software.',
    edges: [
      { to: 'paint-in-the-dark', type: 'enables', why: 'Ritual and symbol gave shared belief a visible, durable body.' },
      { to: 'gods-of-the-city', type: 'transforms', why: 'The gods of the campfire scale up into the gods of the city.' },
    ],
  },
  {
    id: 'paint-in-the-dark',
    era: 1,
    title: 'Paint in the Dark',
    date: 'c. 40,000 BCE',
    sort: -40000,
    region: 'europe',
    x: 31,
    threads: ['ideas'],
    hook: 'Deep underground, by lamplight, people who owned almost nothing made images that still stop the heart.',
    summary:
      'At Chauvet, Lascaux, and Sulawesi, ice age people crawled far past daylight to paint lions, horses, and hands. This was not decoration: it was ritual, memory, and perhaps the first theology, made by minds fully our equal. Art appears wherever humans do, and it appears first as a tool for meaning rather than pleasure.',
    edges: [
      { to: 'gods-of-the-city', type: 'transforms', why: 'Cave sanctuaries anticipate temples: set-apart spaces where the unseen is addressed.' },
      { to: 'rebirth-of-the-ancients', type: 'echoes', why: 'Whenever humans rethink themselves, they reach again for the image.' },
    ],
  },
  {
    id: 'world-the-ice-made',
    era: 1,
    title: 'The World the Ice Made',
    date: 'c. 20,000 to 9600 BCE',
    sort: -20000,
    region: 'world',
    x: 55,
    threads: ['craft', 'wealth'],
    hook: 'The climate flips, the megafauna fall, and the stage is quietly set for everything.',
    summary:
      'At the glacial maximum, ice sheets locked up seas and Europe was steppe. Then warming, the cold snap of the Younger Dryas, and finally the Holocene: a freakishly stable climate that has lasted ever since. Mammoths and giant sloths vanished as hunters spread. Agriculture, and thus history, happened inside this brief warm window.',
    edges: [
      { to: 'village-before-the-farm', type: 'enables', why: 'A warming Levant filled with wild grain worth staying put for.' },
      { to: 'trap-of-seeds', type: 'enables', why: 'Stable Holocene weather is the precondition for betting your life on a harvest.' },
      { to: 'burning-mirror', type: 'echoes', why: 'Civilization grew inside a stable climate; now it is the climate’s author.' },
    ],
  },
  {
    id: 'village-before-the-farm',
    era: 1,
    title: 'The Village Before the Farm',
    date: 'c. 12,500 BCE',
    sort: -12500,
    region: 'swasia',
    x: 58,
    threads: ['wealth', 'ideas'],
    hook: 'People settled down before they planted a single seed, and built a temple before they built a town.',
    summary:
      'The Natufians of the Levant lived in permanent villages on wild harvests: settlement came before agriculture, not after. At Göbekli Tepe, foragers raised carved monumental pillars around 9500 BCE, a sanctuary preceding farms. Perhaps gathering to worship and feast is what pushed people to cultivate, inverting the old story that religion follows surplus.',
    edges: [
      { to: 'trap-of-seeds', type: 'transforms', why: 'Settled harvesters of wild grain slid into farming almost without noticing.' },
      { to: 'gods-of-the-city', type: 'echoes', why: 'The temple precedes the state here, a pattern Mesopotamia will repeat at scale.' },
    ],
  },
  {
    id: 'trap-of-seeds',
    era: 1,
    title: 'The Trap of Seeds',
    date: 'c. 9500 BCE',
    sort: -9500,
    region: 'swasia',
    x: 61,
    threads: ['wealth', 'craft'],
    hook: 'Farming made humans shorter, sicker, and more numerous, and once inside, there was no way back out.',
    summary:
      'Agriculture was invented independently at least seven times, from the Levant to China to Mesoamerica. Early farmers worked harder and died younger than foragers, but grain fed more babies, and population growth sealed the exits. Storable surplus changed everything: it could be owned, inherited, stolen, and taxed. Inequality and the state germinate here.',
    edges: [
      { to: 'uruk-first-city', type: 'enables', why: 'Surplus grain is the seed corn of every city.' },
      { to: 'surplus-and-the-state', type: 'enables', why: 'What can be stored can be counted, and what can be counted can be taxed.' },
      { to: 'maize-and-the-americas', type: 'echoes', why: 'The same trap sprang independently on other continents, proving it was no accident.' },
    ],
  },
]);
