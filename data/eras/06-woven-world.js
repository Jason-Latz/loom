LOOM.era({
  n: 6,
  title: 'The Woven World',
  span: 'c. 1100 to 1450 CE',
  blurb: 'Crusades, Mongols, and plague wire Eurasia into one circuit, while the Americas raise empires of their own.',
});

LOOM.node([
  {
    id: 'crusading-fever',
    era: 6,
    title: 'The Crusading Fever',
    date: '1096 CE',
    sort: 1096,
    region: 'europe',
    x: 34,
    threads: ['ideas', 'power', 'wealth'],
    hook: 'The pope promises paradise to armed pilgrims, and Europe discovers how much it likes the East’s goods.',
    summary:
      'The Crusades fused piety, land hunger, and papal politics into two centuries of holy war. They failed on their own terms, and their 1204 sack of Christian Constantinople was catastrophic, but they plugged backward Europe into Mediterranean commerce: Italian fleets, Eastern luxuries, and appetites that would eventually send ships around the world.',
    edges: [
      { to: 'fall-of-constantinople', type: 'enables', why: 'The 1204 sack crippled Byzantium beyond real recovery.' },
      { to: 'iberian-wager', type: 'enables', why: 'Iberia’s Reconquista carried crusading momentum straight into the Atlantic.' },
    ],
  },
  {
    id: 'first-universities',
    era: 6,
    title: 'The First Universities',
    date: 'c. 1150 CE',
    sort: 1150,
    region: 'europe',
    x: 30,
    threads: ['ideas'],
    hook: 'Guilds of masters and students invent a corporation for arguing, and Europe gets its thinking machine.',
    summary:
      'Bologna, Paris, and Oxford organized scholars into self-governing corporations with degrees, curricula, and the disputation: institutionalized argument. Scholastics like Aquinas worked to reconcile recovered Aristotle, arriving via Arabic Spain, with Christian faith. The university outlived every regime around it and remains medieval Europe’s most successful export.',
    edges: [
      { to: 'new-eyes-on-the-sky', type: 'enables', why: 'Europe’s science grew inside institutions built for disputation.' },
      { to: 'luthers-hammer', type: 'enables', why: 'The Reformation began as a university quarrel; Luther was a professor.' },
    ],
  },
  {
    id: 'genghis-exchange',
    era: 6,
    title: 'The Mongol Exchange',
    date: '1206 CE',
    sort: 1206,
    region: 'easia',
    x: 82,
    threads: ['power', 'wealth'],
    hook: 'The world’s greatest land empire is built by a man whose name means terror, and its roads are famously safe.',
    summary:
      'Genghis Khan’s Mongols killed on a scale unmatched before industry, then ruled the largest contiguous empire ever: postal relays, religious tolerance, merchants under protection. For a century, Eurasia was one circuit; Marco Polo and Chinese gunpowder moved along it. The Pax Mongolica proved connection and catastrophe can share a single set of roads.',
    edges: [
      { to: 'song-gifts-go-west', type: 'enables', why: 'One power holding the whole road moved everything along it.' },
      { to: 'black-death', type: 'enables', why: 'The plague rode the same protected routes as the silk.' },
    ],
  },
  {
    id: 'charter-and-parliament',
    era: 6,
    title: 'Charter and Parliament',
    date: '1215 CE',
    sort: 1215,
    region: 'europe',
    x: 26,
    threads: ['power'],
    hook: 'Rebellious barons force a king to sign limits on his own power, a document he repudiates within weeks.',
    summary:
      'Magna Carta failed immediately but established a fertile fiction: the king is under the law. Because European rulers were weak and needed taxes, they summoned estates and parliaments to bargain, trading rights for revenue. Consent institutions grew from this haggling, not from theory. Where rulers could tax without asking, no parliaments took root.',
    edges: [
      { to: 'crown-vs-parliament', type: 'transforms', why: 'The medieval bargain sharpens into a constitutional showdown.' },
      { to: 'american-experiment', type: 'echoes', why: 'The colonists rebelled claiming the ancient rights of Englishmen.' },
    ],
  },
  {
    id: 'song-gifts-go-west',
    era: 6,
    title: 'The Gifts Go West',
    date: 'c. 1250 CE',
    sort: 1250,
    region: 'world',
    x: 66,
    threads: ['craft'],
    hook: 'Gunpowder, the compass, printing, and paper drift out of China, and detonate in other people’s hands.',
    summary:
      'China’s great inventions crossed Eurasia along Mongol and Muslim routes. Europe, fragmented and competitive, weaponized them fastest: cannon dissolved castle walls and the lords behind them, the compass opened blue-water sailing, print would shatter its church. Technologies are not destiny; the receiving society’s structure decides what they become.',
    edges: [
      { to: 'gutenberg-explosion', type: 'enables', why: 'Paper and printing concepts reach Europe ahead of Gutenberg.' },
      { to: 'iberian-wager', type: 'enables', why: 'The compass steers Atlantic hulls beyond sight of land.' },
      { to: 'gunpowder-empires', type: 'enables', why: 'Chinese powder arms the empires that named an age.' },
    ],
  },
  {
    id: 'mansa-musa-hajj',
    era: 6,
    title: 'Mansa Musa’s Golden Road',
    date: '1324 CE',
    sort: 1324,
    region: 'africa',
    x: 43,
    threads: ['wealth', 'ideas'],
    hook: 'A West African emperor crosses the desert to Mecca and hands out so much gold he crashes Cairo’s currency.',
    summary:
      'Mali under Mansa Musa controlled perhaps half the Old World’s gold. His hajj, with tons of it given away, made Cairo’s gold price sag for years and put Mali on European maps, a king with a nugget drawn where terra incognita had been. Timbuktu grew into a university city of manuscripts. Medieval Africa was integrated, literate, and rich.',
    edges: [
      { to: 'iberian-wager', type: 'enables', why: 'Mali’s mapped gold lured Portuguese ships down Africa’s coast.' },
    ],
  },
  {
    id: 'black-death',
    era: 6,
    title: 'The Black Death',
    date: '1347 CE',
    sort: 1347,
    region: 'world',
    x: 48,
    threads: ['wealth'],
    hook: 'A bacterium rides the new trade routes and kills a third of everyone between Canton and Lisbon.',
    summary:
      'The plague traveled the Mongol-secured roads and Mediterranean ships, killing perhaps a third of Europe and vast numbers across Asia. Survivors inherited a transformed economy: labor scarce, wages up, serfdom crumbling in the West, elites scrambling to reimpose control. Mass death, horribly, dealt workers their strongest hand in centuries and shook faith in every authority.',
    edges: [
      { to: 'rebirth-of-the-ancients', type: 'enables', why: 'Plague-shaken wealth and doubt fed the Renaissance mood.' },
      { to: 'columbian-exchange', type: 'echoes', why: 'Disease returns as history’s shock troops when the oceans join.' },
    ],
  },
  {
    id: 'ottoman-dawn',
    era: 6,
    title: 'The Ottoman Dawn',
    date: 'c. 1350 CE',
    sort: 1350,
    region: 'swasia',
    x: 56,
    threads: ['power'],
    hook: 'A frontier war-band on Byzantium’s edge grows, within a century and a half, into Rome’s executioner and heir.',
    summary:
      'The Ottomans rose as ghazi frontier fighters, then out-organized everyone: the devshirme levy turned Christian boys into elite janissaries and administrators, cannon became a state specialty, and conquered peoples were slotted into a tolerant, taxed hierarchy of religious communities. They would rule the Middle East, North Africa, and southeastern Europe into the twentieth century.',
    edges: [
      { to: 'fall-of-constantinople', type: 'transforms', why: 'The frontier emirate takes the Roman capital itself.' },
      { to: 'gunpowder-empires', type: 'transforms', why: 'The Ottoman model defines the age of gunpowder empire.' },
    ],
  },
  {
    id: 'treasure-fleets',
    era: 6,
    title: 'The Treasure Fleets',
    date: '1405 CE',
    sort: 1405,
    region: 'easia',
    x: 89,
    threads: ['power', 'wealth'],
    hook: 'China sends ships five times the size of anything in Europe as far as Africa, then burns the logs and stops.',
    summary:
      'Zheng He’s seven expeditions, with crews in the tens of thousands, showed Ming China could have owned the age of sail. Court politics, steppe threats, and fiscal priorities ended the voyages; oceangoing ships were later restricted. The withdrawal is history’s great counterfactual hinge: capability is nothing without the politics to sustain it.',
    edges: [
      { to: 'iberian-wager', type: 'echoes', why: 'China stood its fleets down just as Iberia’s far smaller ships set out.' },
    ],
  },
  {
    id: 'fifth-sun-aztecs',
    era: 6,
    title: 'Empire of the Fifth Sun',
    date: '1428 CE',
    sort: 1428,
    region: 'americas',
    x: 9,
    threads: ['power', 'wealth'],
    hook: 'On a lake in the Valley of Mexico stands a capital bigger than Paris, fed by floating gardens.',
    summary:
      'The Aztec Triple Alliance ruled central Mexico through tribute lists, marketplace networks, and a theology in which sacrifice kept the sun alive. Tenochtitlan awed the Spaniards who saw it: causeways, aqueducts, ordered markets. It was also hated by tributary peoples, a fault line Cortés would exploit. Empires fall from within as much as without.',
    edges: [
      { to: 'columbian-exchange', type: 'collides', why: 'Cortés, smallpox, and resentful tributaries arrive together in 1519.' },
    ],
  },
  {
    id: 'inka-threads',
    era: 6,
    title: 'The Empire of Threads',
    date: '1438 CE',
    sort: 1438,
    region: 'americas',
    x: 12,
    threads: ['power', 'wealth'],
    hook: 'An empire the length of a continent runs on knotted cords, labor tax, and forty thousand kilometers of road.',
    summary:
      'Tawantinsuyu, the Inka realm, stretched from Ecuador to Chile: terraced mountains, freeze-dried food in state warehouses, relay runners on stone highways, all recorded on knotted quipu cords, without money, markets, wheels, or writing. It was history’s greatest command economy. That such different machinery could govern millions widens any theory of the state.',
    edges: [
      { to: 'columbian-exchange', type: 'collides', why: 'Smallpox and Pizarro reach the Andes within a decade of Cortés.' },
      { to: 'silver-river', type: 'enables', why: 'The conquered Andes yield Potosí, the silver mountain that feeds the world.' },
    ],
  },
]);
