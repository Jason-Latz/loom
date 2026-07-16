// State, header controls, search, intro, and the wiring between map and reader.
LOOM.app = (function () {
  var h = LOOM.ui.h;
  var KEY = 'loom.v1';
  var state = { read: {}, marks: {}, filters: [], lamplight: false, introSeen: false };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) Object.assign(state, JSON.parse(raw));
    } catch (e) { /* fresh start is fine */ }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  // ---------------- progress ----------------
  function isRead(id) { return !!state.read[id]; }
  function markRead(id) {
    state.read[id] = Date.now();
    save();
    refresh();
    pressSeal();
    setTimeout(function () {
      LOOM.reader.closeLesson();
      if (LOOM.map) LOOM.reader.showDossier(id);
    }, 900);
  }
  function getMark(lessonId, qi) { return (state.marks[lessonId] || {})[qi] || null; }
  function setMark(lessonId, qi, v) {
    (state.marks[lessonId] = state.marks[lessonId] || {})[qi] = v;
    save();
  }
  function nextId() {
    var n = LOOM.nodes.find(function (x) { return LOOM.lessons[x.id] && !state.read[x.id]; });
    return n ? n.id : null;
  }
  // Returns {id, forward}. forward=false means the sequence has no unread lesson
  // after this one, so we are sending the reader back to an earlier gap; the
  // reader labels the two cases differently rather than calling a jump
  // backward "next".
  function nextAfter(id) {
    var idx = LOOM.nodes.findIndex(function (x) { return x.id === id; });
    for (var i = idx + 1; i < LOOM.nodes.length; i++) {
      if (LOOM.lessons[LOOM.nodes[i].id] && !state.read[LOOM.nodes[i].id]) {
        return { id: LOOM.nodes[i].id, forward: true };
      }
    }
    var back = nextId();
    return back && back !== id ? { id: back, forward: false } : null;
  }
  function refresh() {
    LOOM.map.refreshStates(state.read, nextId());
    var done = Object.keys(state.read).filter(function (id) { return LOOM.lessons[id]; }).length;
    var written = Object.keys(LOOM.lessons).length;
    document.getElementById('progress').textContent =
      done + ' of ' + LOOM.nodes.length + ' charted · ' + written + ' lessons ready';
  }

  function pressSeal() {
    var seal = h('div');
    seal.id = 'seal';
    var disc = h('div', 'seal-disc', 'charted');
    seal.appendChild(disc);
    document.body.appendChild(seal);
    setTimeout(function () { seal.remove(); }, 1500);
  }

  // ---------------- header controls ----------------
  function buildThreadChips() {
    var box = document.getElementById('thread-chips');
    var active = new Set(state.filters);
    LOOM.threads.forEach(function (t) {
      var chip = h('button', 'chip', null);
      chip.style.setProperty('--c', 'var(--th-' + t.id + ')');
      chip.appendChild(h('span', 'dot'));
      chip.appendChild(document.createTextNode(t.pigment));
      chip.title = t.name + ': ' + t.blurb;
      if (active.has(t.id)) chip.classList.add('on');
      chip.addEventListener('click', function () {
        chip.classList.toggle('on');
        if (active.has(t.id)) active.delete(t.id); else active.add(t.id);
        state.filters = Array.from(active);
        save();
        LOOM.map.setFilters(active);
      });
      box.appendChild(chip);
    });
    if (active.size) LOOM.map.setFilters(active);
  }

  function buildLegend() {
    var box = document.getElementById('legend');
    LOOM.threads.forEach(function (t) {
      var row = h('div', 'leg-row');
      var sw = h('span', 'leg-swatch');
      sw.style.setProperty('--c', 'var(--th-' + t.id + ')');
      row.appendChild(sw);
      row.appendChild(h('span', 'leg-name', t.pigment + ' · ' + t.name));
      box.appendChild(row);
    });
    box.appendChild(h('div', 'leg-sep'));
    [
      ['◌', 'uncharted territory'],
      ['○', 'lesson ready'],
      ['●', 'charted by you'],
    ].forEach(function (pair) {
      var row = h('div', 'leg-row');
      var dot = h('span', null, pair[0]);
      dot.style.width = '22px';
      dot.style.textAlign = 'center';
      if (pair[0] === '●') dot.style.color = 'var(--gilt)';
      row.appendChild(dot);
      row.appendChild(h('span', 'leg-name', pair[1]));
      box.appendChild(row);
    });
  }

  function buildEraRail() {
    var rail = document.getElementById('era-rail');
    var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    var bands = LOOM.map.bands().slice().reverse(); // newest on top, like the chart
    bands.forEach(function (b) {
      var btn = h('button', 'rail-era', ROMAN[b.n - 1]);
      btn.title = 'Era ' + ROMAN[b.n - 1] + ' · ' + b.title + ' (' + b.span + ')';
      btn.dataset.era = b.n;
      btn.addEventListener('click', function () { LOOM.map.fitEra(b.n); });
      rail.appendChild(btn);
    });
    LOOM.map.api.onEraChange = function (n) {
      rail.querySelectorAll('.rail-era').forEach(function (b) {
        b.classList.toggle('here', +b.dataset.era === n);
      });
    };
  }

  // ---------------- search ----------------
  function buildSearch() {
    var input = document.getElementById('search');
    var results = document.getElementById('search-results');
    var items = [];
    var activeIdx = -1;

    function hide() { results.hidden = true; activeIdx = -1; }
    function run() {
      var q = input.value.trim().toLowerCase();
      results.innerHTML = '';
      items = [];
      if (q.length < 2) return hide();
      var hits = LOOM.nodes.filter(function (n) {
        return (n.title + ' ' + n.hook + ' ' + n.summary + ' ' + n.date).toLowerCase().indexOf(q) !== -1;
      }).slice(0, 8);
      if (!hits.length) return hide();
      hits.forEach(function (n) {
        var item = h('div', 'sr-item');
        item.appendChild(h('div', 'sr-title', n.title));
        var e = LOOM.eras.find(function (x) { return x.n === n.era; });
        item.appendChild(h('div', 'sr-meta', e.title + ' · ' + n.date + (LOOM.lessons[n.id] ? ' · lesson ready' : '')));
        item.addEventListener('mousedown', function (ev) {
          ev.preventDefault();
          choose(n.id);
        });
        results.appendChild(item);
        items.push({ el: item, id: n.id });
      });
      results.hidden = false;
    }
    function choose(id) {
      hide();
      input.blur();
      LOOM.map.select(id);
    }
    input.addEventListener('input', run);
    input.addEventListener('blur', function () { setTimeout(hide, 120); });
    input.addEventListener('keydown', function (ev) {
      if (results.hidden) return;
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault();
        activeIdx += ev.key === 'ArrowDown' ? 1 : -1;
        activeIdx = (activeIdx + items.length) % items.length;
        items.forEach(function (it, i) { it.el.classList.toggle('active', i === activeIdx); });
      } else if (ev.key === 'Enter' && activeIdx >= 0) {
        choose(items[activeIdx].id);
      } else if (ev.key === 'Escape') {
        hide();
        input.blur();
      }
    });
  }

  // ---------------- intro ----------------
  function showIntro() {
    var intro = document.getElementById('intro');
    intro.innerHTML = '';
    var card = h('div', 'intro-card');
    card.appendChild(h('h2', null, 'LOOM'));
    card.appendChild(h('div', 'intro-sub', 'a cartographer’s atlas of why the world is the way it is'));
    card.appendChild(h('p', null,
      'This chart holds 120 turning points of the human story, from the first spark of symbolic thought to the ' +
      'present you are standing in. Time rises from the bottom; the world’s regions run left to right. Four pigments ' +
      'thread every age together: Lapis for ideas and belief, Oxblood for power, Gilt for wealth, Verdigris for craft and science.'));
    card.appendChild(h('p', null,
      'Click any node to open its dossier and see what it is woven from and what it leads to. Nodes with a solid ring ' +
      'hold a lesson: ten minutes of story, significance, and questions that deliberately reach back to what you have ' +
      'already read. Chart a lesson and the node turns gold. Dotted nodes are uncharted territory, waiting for the forge.'));
    card.appendChild(h('p', null,
      'Drag to pan, pinch or ⌘-scroll to zoom, and use the roman numerals on the right to voyage between eras. Begin at the bottom of the map, at the beginning of everything.'));
    var actions = h('div', 'intro-actions');
    var begin = h('button', 'btn btn-gilt', 'Begin at the beginning');
    begin.addEventListener('click', function () {
      dismiss();
      LOOM.map.select(LOOM.nodes[0].id);
    });
    var unroll = h('button', 'btn', 'Unroll the chart');
    unroll.addEventListener('click', dismiss);
    actions.appendChild(begin);
    actions.appendChild(unroll);
    card.appendChild(actions);
    intro.appendChild(card);
    intro.hidden = false;
    function dismiss() {
      intro.hidden = true;
      state.introSeen = true;
      save();
    }
  }

  // ---------------- init ----------------
  function init() {
    load();
    if (state.lamplight) document.body.classList.add('lamplight');
    LOOM.map.init();
    LOOM.reader.init();

    LOOM.map.api.onSelect = function (id) {
      if (id) LOOM.reader.showDossier(id);
      else LOOM.reader.hideDossier();
    };

    buildThreadChips();
    buildLegend();
    buildEraRail();
    buildSearch();
    refresh();

    document.getElementById('continue-btn').addEventListener('click', function () {
      var id = nextId();
      if (!id) {
        // everything written is read: point at the first uncharted seed
        var seed = LOOM.nodes.find(function (n) { return !LOOM.lessons[n.id]; });
        if (seed) LOOM.map.select(seed.id);
        return;
      }
      LOOM.map.select(id);
    });
    document.getElementById('lamp-btn').addEventListener('click', function () {
      state.lamplight = document.body.classList.toggle('lamplight');
      save();
    });
    document.getElementById('help-btn').addEventListener('click', showIntro);
    document.getElementById('zoom-in').addEventListener('click', function () { LOOM.map.zoomBy(1 / 1.4); });
    document.getElementById('zoom-out').addEventListener('click', function () { LOOM.map.zoomBy(1.4); });
    document.getElementById('zoom-fit').addEventListener('click', LOOM.map.fitAll);

    if (!state.introSeen) showIntro();
  }

  return {
    init: init,
    isRead: isRead,
    markRead: markRead,
    getMark: getMark,
    setMark: setMark,
    nextAfter: nextAfter,
  };
})();
