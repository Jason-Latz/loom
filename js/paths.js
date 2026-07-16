// Paths: other ways through the graph than the main chronological sequence.
//
//  - Thread paths: follow one pigment across all of history (a thematic course).
//  - Roots paths: start from a feature of the present and walk backward along
//    the wires that made it, which is the present-back traversal.
//
// A path never invents connections; it is always a subset of the real graph.
LOOM.paths = (function () {
  var h = LOOM.ui.h;
  var panel, bar;
  var active = null; // { title, ids, i }
  var incomingIndex = null;

  // Features of today, each anchored to the node that most directly answers it.
  var ROOTS = [
    { q: 'Why is the world carved into sovereign states?', to: 'westphalia-cage' },
    { q: 'Why is there capitalism?', to: 'dutch-money-machine' },
    { q: 'Why did some countries get rich first?', to: 'steam-and-coal' },
    { q: 'Why is there an international order?', to: 'order-from-ashes' },
    { q: 'Why do we argue in the language of rights?', to: 'rights-revolutions' },
    { q: 'Why is China rising again?', to: 'great-convergence' },
    { q: 'Why is the climate changing?', to: 'burning-mirror' },
    { q: 'Why is everyone staring at a screen?', to: 'glass-slab' },
  ];

  function node(id) { return LOOM.nodes.find(function (n) { return n.id === id; }); }
  function orderOf(id) { return LOOM.nodes.findIndex(function (n) { return n.id === id; }); }

  function incoming(id) {
    if (!incomingIndex) {
      incomingIndex = {};
      LOOM.nodes.forEach(function (n) {
        (n.edges || []).forEach(function (e) {
          (incomingIndex[e.to] = incomingIndex[e.to] || []).push(n.id);
        });
      });
    }
    return incomingIndex[id] || [];
  }

  function threadPath(tid) {
    return LOOM.nodes
      .filter(function (n) { return n.threads.indexOf(tid) !== -1; })
      .map(function (n) { return n.id; });
  }

  // Walk backward from a node along real incoming wires, one ring of causes at a
  // time. A fixed depth is useless here because in-degree varies wildly (four
  // hops back from one node reaches 29 nodes and from another 90), so instead we
  // add whole rings while they still fit, which keeps every trace a readable
  // story about the nearest causes rather than half the atlas.
  function rootsPath(id, maxNodes) {
    maxNodes = maxNodes || 16;
    var seen = {};
    seen[id] = true;
    var count = 1;
    var frontier = [id];
    for (var d = 0; d < 8; d++) {
      var next = [];
      frontier.forEach(function (cur) {
        incoming(cur).forEach(function (src) {
          if (!seen[src] && next.indexOf(src) === -1) next.push(src);
        });
      });
      if (!next.length || count + next.length > maxNodes) break;
      next.forEach(function (s) { seen[s] = true; });
      count += next.length;
      frontier = next;
    }
    return Object.keys(seen).sort(function (a, b) { return orderOf(a) - orderOf(b); });
  }

  // ---------------- path mode ----------------
  function start(title, ids, reverse) {
    if (!ids.length) return;
    active = { title: title, ids: reverse ? ids.slice().reverse() : ids, i: 0 };
    closePanel();
    LOOM.map.setPath(active.ids);
    renderBar();
    go(0);
  }

  function stop() {
    active = null;
    LOOM.map.setPath(null);
    bar.hidden = true;
  }

  function go(i) {
    if (!active) return;
    active.i = Math.max(0, Math.min(active.ids.length - 1, i));
    renderBar();
    LOOM.map.select(active.ids[active.i]);
  }

  function renderBar() {
    if (!active) { bar.hidden = true; return; }
    bar.innerHTML = '';
    var prev = h('button', 'btn path-step', '‹');
    prev.disabled = active.i === 0;
    prev.addEventListener('click', function () { go(active.i - 1); });

    var mid = h('div', 'path-mid');
    mid.appendChild(h('div', 'path-title', active.title));
    var n = node(active.ids[active.i]);
    mid.appendChild(h('div', 'path-where', (active.i + 1) + ' of ' + active.ids.length + ' · ' + (n ? n.title : '')));

    var next = h('button', 'btn path-step', '›');
    next.disabled = active.i === active.ids.length - 1;
    next.addEventListener('click', function () { go(active.i + 1); });

    var quit = h('button', 'btn path-quit', 'leave path');
    quit.addEventListener('click', stop);

    bar.appendChild(prev);
    bar.appendChild(mid);
    bar.appendChild(next);
    bar.appendChild(quit);
    bar.hidden = false;
  }

  // ---------------- chooser ----------------
  function openPanel() {
    panel.innerHTML = '';
    var card = h('div', 'paths-card');

    var close = h('button', 'dos-close', '✕');
    close.addEventListener('click', closePanel);
    card.appendChild(close);

    card.appendChild(h('h2', 'paths-h', 'Other ways through'));
    card.appendChild(h('p', 'paths-sub',
      'The chart reads bottom to top as one chronological sequence. These are the other routes: ' +
      'follow a single thread across all of history, or start from something about today and walk backward ' +
      'down the wires that made it.'));

    card.appendChild(h('div', 'dos-head', 'Follow a thread'));
    var threads = h('div', 'paths-threads');
    LOOM.threads.forEach(function (t) {
      var ids = threadPath(t.id);
      var b = h('button', 'path-opt');
      b.style.setProperty('--c', 'var(--th-' + t.id + ')');
      b.appendChild(h('span', 'path-swatch'));
      var txt = h('span', 'path-opt-text');
      txt.appendChild(h('span', 'path-opt-title', t.name));
      txt.appendChild(h('span', 'path-opt-meta', ids.length + ' nodes · ' + t.blurb));
      b.appendChild(txt);
      b.addEventListener('click', function () { start(t.name + ', end to end', ids, false); });
      threads.appendChild(b);
    });
    card.appendChild(threads);

    card.appendChild(h('div', 'dos-head', 'Trace it back'));
    var roots = h('div', 'paths-roots');
    ROOTS.forEach(function (r) {
      if (!node(r.to)) return;
      var ids = rootsPath(r.to, 16);
      var b = h('button', 'path-opt');
      b.style.setProperty('--c', 'var(--gilt)');
      b.appendChild(h('span', 'path-swatch'));
      var txt = h('span', 'path-opt-text');
      txt.appendChild(h('span', 'path-opt-title', r.q));
      txt.appendChild(h('span', 'path-opt-meta', ids.length + ' nodes back from ' + node(r.to).title));
      b.appendChild(txt);
      b.addEventListener('click', function () { start(r.q, ids, true); });
      roots.appendChild(b);
    });
    card.appendChild(roots);

    panel.appendChild(card);
    panel.hidden = false;
  }

  function closePanel() { panel.hidden = true; }

  function init() {
    panel = document.getElementById('paths');
    bar = document.getElementById('path-bar');
    document.getElementById('paths-btn').addEventListener('click', openPanel);
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !panel.hidden) closePanel();
      if (!active || !panel.hidden) return;
      if (ev.key === 'ArrowRight') go(active.i + 1);
      if (ev.key === 'ArrowLeft') go(active.i - 1);
    });
  }

  return {
    init: init,
    open: openPanel,
    stop: stop,
    isActive: function () { return !!active; },
    threadPath: threadPath,
    rootsPath: rootsPath,
  };
})();
