// Loom — graph registry. Every data file registers itself into these tables.
// Load order: this file, then data/eras/*.js, then lessons via js/boot.js.
window.LOOM = window.LOOM || {};

LOOM.threads = [
  {
    id: 'ideas',
    name: 'Ideas & Belief',
    pigment: 'Lapis',
    blurb: 'Philosophy, religion, and ideology: the history of what humans think the world is and what they owe each other.',
  },
  {
    id: 'power',
    name: 'Power & Institutions',
    pigment: 'Oxblood',
    blurb: 'States, law, empires, and revolutions: how humans organize coercion and consent.',
  },
  {
    id: 'wealth',
    name: 'Wealth & Exchange',
    pigment: 'Gilt',
    blurb: 'Farms, trade, money, and markets: why prosperity concentrates where it does.',
  },
  {
    id: 'craft',
    name: 'Craft & Science',
    pigment: 'Verdigris',
    blurb: 'Tools, techniques, and theories: capability as a driver of everything else.',
  },
];

// Meridians of the chart. x is a 0-100 coordinate across the map; each node
// carries its own hand-placed x, and these provide the labeled guide lines.
LOOM.regions = [
  { id: 'americas', name: 'The Americas', x: 10 },
  { id: 'europe', name: 'Europe & the Mediterranean', x: 30 },
  { id: 'africa', name: 'Africa', x: 45 },
  { id: 'swasia', name: 'Southwest Asia', x: 58 },
  { id: 'sasia', name: 'South & Central Asia', x: 72 },
  { id: 'easia', name: 'East Asia & the Pacific', x: 88 },
  { id: 'world', name: 'The Whole World', x: 50 },
];

LOOM.eras = [];
LOOM.nodes = [];
LOOM.lessons = {};

LOOM.era = function (era) {
  LOOM.eras.push(era);
};

LOOM.node = function (nodes) {
  for (var i = 0; i < nodes.length; i++) LOOM.nodes.push(nodes[i]);
};

LOOM.lesson = function (l) {
  LOOM.lessons[l.id] = l;
};

// Which nodes hold a written lesson is answered by the manifest alone, so the
// chart draws its solid rings, counts its progress and picks the next lesson
// without a single lesson body being fetched. Bodies arrive on demand
// (js/boot.js), which keeps megabytes of prose off the first paint on a phone.
(function () {
  var ids = null;
  function set() {
    if (!ids) ids = new Set(LOOM.lessonFiles || []);
    return ids;
  }
  LOOM.hasLesson = function (id) { return set().has(id); };
  LOOM.lessonCount = function () { return set().size; };
})();
