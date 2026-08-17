// State, header controls, search, intro, and the wiring between map and reader.
LOOM.app = (function () {
  var h = LOOM.ui.h;
  var KEY = 'loom.v1';
  var state = { read: {}, marks: {}, filters: [], lamplight: false, introSeen: false, streak: null, evidence: false };

  // ---------------- streak ----------------
  // Consecutive days on which you charted something. Kept deliberately quiet: a
  // single mark in the header, and nothing at all when there is no streak.
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function dayKey(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function yesterdayKey() {
    var d = new Date();
    d.setDate(d.getDate() - 1); // stepping the date field is daylight-saving safe
    return dayKey(d);
  }
  function touchStreak() {
    var s = state.streak || (state.streak = { count: 0, last: null });
    var today = dayKey(new Date());
    if (s.last === today) return;                       // already counted today
    s.count = s.last === yesterdayKey() ? s.count + 1 : 1;
    s.last = today;
  }
  function currentStreak() {
    var s = state.streak;
    if (!s || !s.last) return 0;
    // a streak only stands if it reaches today or yesterday; otherwise it broke
    return s.last === dayKey(new Date()) || s.last === yesterdayKey() ? s.count : 0;
  }
  function renderStreak() {
    var el = document.getElementById('streak');
    var n = currentStreak();
    if (!n) { el.hidden = true; return; }
    el.textContent = '✦ ' + n;
    el.title = n + (n === 1 ? ' day running.' : ' days running.') +
      ' Chart a lesson today to keep it.';
    el.hidden = false;
  }

  function renderLampButton() {
    var el = document.getElementById('lamp-btn');
    var on = document.body.classList.contains('lamplight');
    var label = on ? 'Turn off lamplight mode' : 'Turn on lamplight mode';
    el.title = label;
    el.setAttribute('aria-label', label);
    el.setAttribute('aria-pressed', on ? 'true' : 'false');
    // keep mobile browser chrome the same color as the parchment or the lamp
    var tc = document.getElementById('theme-color');
    if (tc) tc.setAttribute('content', on ? '#211a10' : '#efe3c6');
  }

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
    touchStreak();
    save();
    refresh();
    pressSeal();
    setTimeout(function () {
      LOOM.reader.closeLesson();
      if (LOOM.map) LOOM.reader.showDossier(id);
    }, 900);
  }
  // Citation markers are off by default and the choice sticks, so a reader who
  // wants the evidence raises it once rather than on every lesson.
  function evidenceOn() { return !!state.evidence; }
  function setEvidence(on) {
    state.evidence = !!on;
    document.body.classList.toggle('evidence-on', state.evidence);
    save();
    return state.evidence;
  }

  function getMark(lessonId, qi) { return (state.marks[lessonId] || {})[qi] || null; }
  function setMark(lessonId, qi, v) {
    (state.marks[lessonId] = state.marks[lessonId] || {})[qi] = v;
    save();
  }
  function nextId() {
    var n = LOOM.nodes.find(function (x) { return LOOM.hasLesson(x.id) && !state.read[x.id]; });
    return n ? n.id : null;
  }
  // Returns {id, forward}. forward=false means the sequence has no unread lesson
  // after this one, so we are sending the reader back to an earlier gap; the
  // reader labels the two cases differently rather than calling a jump
  // backward "next".
  function nextAfter(id) {
    var idx = LOOM.nodes.findIndex(function (x) { return x.id === id; });
    for (var i = idx + 1; i < LOOM.nodes.length; i++) {
      if (LOOM.hasLesson(LOOM.nodes[i].id) && !state.read[LOOM.nodes[i].id]) {
        return { id: LOOM.nodes[i].id, forward: true };
      }
    }
    var back = nextId();
    return back && back !== id ? { id: back, forward: false } : null;
  }
  function refresh() {
    LOOM.map.refreshStates(state.read, nextId());
    var done = Object.keys(state.read).filter(function (id) { return LOOM.hasLesson(id); }).length;
    var written = LOOM.lessonCount();
    document.getElementById('progress').textContent =
      done + ' of ' + LOOM.nodes.length + ' charted · ' + written + ' lessons ready';
    renderStreak();
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
        item.appendChild(h('div', 'sr-meta', e.title + ' · ' + n.date + (LOOM.hasLesson(n.id) ? ' · lesson ready' : '')));
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
  function showIntro(opener) {
    var intro = document.getElementById('intro');
    intro.innerHTML = '';
    var card = h('div', 'intro-card');
    card.appendChild(h('h2', null, 'LOOM'));
    card.appendChild(h('div', 'intro-sub', 'a cartographer’s atlas of why the world is the way it is'));
    card.appendChild(h('p', null,
      'This chart holds ' + LOOM.nodes.length + ' turning points of the human story, from the first spark of symbolic thought to the ' +
      'present you are standing in. Time rises from the bottom; the world’s regions run left to right. Four pigments ' +
      'thread every age together: Lapis for ideas and belief, Oxblood for power, Gilt for wealth, Verdigris for craft and science.'));
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    card.appendChild(h('p', null,
      (coarse ? 'Tap' : 'Click') + ' any node to open its dossier and see what it is woven from and what it leads to. Nodes with a solid ring ' +
      'hold a lesson: ten minutes of story, significance, and questions that deliberately reach back to what you have ' +
      'already read. Chart a lesson and the node turns gold. Dotted nodes are uncharted territory, waiting for the forge.'));
    card.appendChild(h('p', null,
      (coarse
        ? 'Drag to pan, pinch to zoom, and use the roman numerals on the right to voyage between eras. '
        : 'Drag to pan, pinch or ⌘-scroll to zoom, and use the roman numerals on the right to voyage between eras. ') +
      'Begin at the bottom of the map, at the beginning of everything.'));
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
    LOOM.ui.modal.open(intro, begin, opener);
    function dismiss() {
      LOOM.ui.modal.close(intro);
      state.introSeen = true;
      save();
    }
  }

  // ---------------- keyboard ----------------
  // The whole chart is walkable without a mouse: up and down follow the reading
  // sequence (up is later, because time rises here), left and right jump across
  // to the nearest neighbour, and Enter opens the lesson.
  function bindKeys() {
    var NAV = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    document.addEventListener('keydown', function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      var t = ev.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      // overlays own the keyboard while they are up
      if (!document.getElementById('reader').hidden) return;
      if (!document.getElementById('paths').hidden) return;
      if (!document.getElementById('intro').hidden) return;

      if (ev.key === 'Enter') {
        var sel = LOOM.map.selected();
        if (sel && LOOM.hasLesson(sel)) { ev.preventDefault(); LOOM.reader.openLesson(sel); }
        return;
      }
      if (NAV.indexOf(ev.key) === -1) return;
      // a live path owns left/right for stepping along itself
      if (LOOM.paths.isActive() && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) return;
      ev.preventDefault();

      var cur = LOOM.map.selected();
      if (!cur) { LOOM.map.select(nextId() || LOOM.nodes[0].id); return; }
      var nid = LOOM.map.neighbor(cur, ev.key);
      if (nid) LOOM.map.select(nid);
    });
  }

  // ---------------- init ----------------
  function init() {
    load();
    if (state.lamplight) document.body.classList.add('lamplight');
    if (state.evidence) document.body.classList.add('evidence-on');
    renderLampButton();
    LOOM.map.init();
    LOOM.reader.init();
    LOOM.paths.init();

    LOOM.map.api.onSelect = function (id) {
      if (id) LOOM.reader.showDossier(id);
      else LOOM.reader.hideDossier();
    };

    buildThreadChips();
    buildLegend();
    buildEraRail();
    buildSearch();
    bindKeys();
    refresh();

    document.getElementById('continue-btn').addEventListener('click', function () {
      var id = nextId();
      if (!id) {
        // everything written is read: point at the first uncharted seed
        var seed = LOOM.nodes.find(function (n) { return !LOOM.hasLesson(n.id); });
        if (seed) LOOM.map.select(seed.id);
        return;
      }
      LOOM.map.select(id);
    });
    document.getElementById('lamp-btn').addEventListener('click', function () {
      state.lamplight = document.body.classList.toggle('lamplight');
      renderLampButton();
      save();
    });
    document.getElementById('help-btn').addEventListener('click', function (ev) { showIntro(ev.currentTarget); });
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
    evidenceOn: evidenceOn,
    setEvidence: setEvidence,
    nextAfter: nextAfter,
  };
})();
