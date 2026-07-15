// The chart itself: an SVG atlas where time rises from the bottom and the
// world's regions run left to right as meridians. Wires are causality,
// colored by the pigment of the node they leave.
LOOM.map = (function () {
  var NS = 'http://www.w3.org/2000/svg';
  var W = 1600, ML = 100, MR = 80, MT = 86, MB = 64, ROW = 46, PAD = 26;
  var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  var svg, wrap, tip;
  var H = 0;
  var vb = { x: 0, y: 0, w: W, h: 100 };
  var pos = {};      // node id -> {x, y}
  var bands = [];    // {n, title, span, top, h, center}
  var nodeEls = {};  // node id -> <g>
  var adj = {};      // node id -> {wires: [path], nodes: {id: true}}
  var pinned = null;
  var api = { onSelect: null, onEraChange: null };

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function nx(n) { return ML + (n.x / 100) * (W - ML - MR); }

  // ---------- layout ----------
  function computeLayout() {
    var byEra = {};
    LOOM.nodes.forEach(function (n) { (byEra[n.era] = byEra[n.era] || []).push(n); });

    var totalRows = LOOM.nodes.length;
    H = MT + MB + LOOM.eras.length * PAD * 2 + totalRows * ROW;

    var cursor = H - MB; // bottom edge of the oldest era's band
    LOOM.eras.forEach(function (era) {
      var list = byEra[era.n] || [];
      var h = list.length * ROW + PAD * 2;
      var top = cursor - h;
      bands.push({ n: era.n, title: era.title, span: era.span, top: top, h: h, center: top + h / 2 });
      list.forEach(function (n, i) {
        pos[n.id] = { x: nx(n), y: cursor - PAD - (i + 0.5) * ROW };
      });
      cursor = top;
    });
  }

  // ---------- render ----------
  function render() {
    var gBands = el('g', {}, svg);
    var gGuides = el('g', {}, svg);
    var gWires = el('g', {}, svg);
    var gNodes = el('g', {}, svg);

    bands.forEach(function (b, i) {
      var r = el('rect', { x: 0, y: b.top, width: W, height: b.h, 'class': 'era-band' + (i % 2 ? ' alt' : '') }, gBands);
      el('line', { x1: 0, y1: b.top, x2: W, y2: b.top, 'class': 'era-rule' }, gBands);
      var label = el('text', { x: 42, y: b.center, 'class': 'era-label', 'text-anchor': 'middle', transform: 'rotate(-90 42 ' + b.center + ')' }, gBands);
      label.textContent = 'Era ' + ROMAN[b.n - 1] + ' · ' + b.title;
      var span = el('text', { x: 66, y: b.center, 'class': 'era-span', 'text-anchor': 'middle', transform: 'rotate(-90 66 ' + b.center + ')' }, gBands);
      span.textContent = b.span;
    });
    el('line', { x1: 0, y1: H - MB, x2: W, y2: H - MB, 'class': 'era-rule' }, gBands);

    LOOM.regions.forEach(function (r) {
      if (r.id === 'world') return;
      var x = ML + (r.x / 100) * (W - ML - MR);
      el('line', { x1: x, y1: MT, x2: x, y2: H - MB, 'class': 'meridian' }, gGuides);
      var t1 = el('text', { x: x, y: MT - 34, 'class': 'meridian-label' }, gGuides);
      t1.textContent = r.name;
      var t2 = el('text', { x: x, y: H - MB + 40, 'class': 'meridian-label' }, gGuides);
      t2.textContent = r.name;
    });

    // wires
    LOOM.nodes.forEach(function (n) {
      (n.edges || []).forEach(function (e) {
        var a = pos[n.id], b = pos[e.to];
        if (!a || !b) return;
        var dy = a.y - b.y;
        var d = 'M ' + a.x + ' ' + (a.y - 10) +
          ' C ' + a.x + ' ' + (a.y - dy * 0.45) + ', ' + b.x + ' ' + (b.y + dy * 0.45) + ', ' + b.x + ' ' + (b.y + 10);
        var th = n.threads[0];
        var p = el('path', { d: d, 'class': 'wire t-' + e.type + ' th-' + th, style: '--c: var(--th-' + th + ')' }, gWires);
        p.dataset.from = n.id; p.dataset.to = e.to;
        (adj[n.id] = adj[n.id] || { wires: [], nodes: {} }).wires.push(p);
        (adj[e.to] = adj[e.to] || { wires: [], nodes: {} }).wires.push(p);
        adj[n.id].nodes[e.to] = true;
        adj[e.to].nodes[n.id] = true;
      });
    });

    // nodes
    LOOM.nodes.forEach(function (n) {
      var p = pos[n.id];
      var g = el('g', { 'class': 'node', transform: 'translate(' + p.x + ' ' + p.y + ')', style: '--c: var(--th-' + n.threads[0] + ')' }, gNodes);
      g.dataset.id = n.id;
      el('circle', { r: 15, 'class': 'halo' }, g);
      el('circle', { r: 9, 'class': 'core' }, g);
      el('circle', { r: 3.4, 'class': 'pip' }, g);
      var label = el('text', { y: 26, 'class': 'label' }, g);
      setLabel(label, n.title);
      el('circle', { r: 18, 'class': 'hit' }, g);
      nodeEls[n.id] = g;

      g.addEventListener('mouseenter', function () { hover(n.id, true); });
      g.addEventListener('mouseleave', function () { hover(n.id, false); });
      g.addEventListener('mousemove', function (ev) { moveTip(ev, n); });
    });
  }

  function setLabel(textEl, title) {
    if (title.length <= 22) { textEl.textContent = title; return; }
    var mid = Math.floor(title.length / 2);
    var space = -1;
    for (var i = 0; i < title.length; i++) {
      if (title[i] === ' ' && Math.abs(i - mid) < Math.abs(space - mid)) space = i;
    }
    if (space < 0) { textEl.textContent = title; return; }
    var l1 = el('tspan', { x: 0, dy: 0 }, textEl);
    l1.textContent = title.slice(0, space);
    var l2 = el('tspan', { x: 0, dy: 14 }, textEl);
    l2.textContent = title.slice(space + 1);
  }

  // ---------- hover / focus / tooltip ----------
  function applyFocus(id) {
    svg.classList.add('focused');
    clearLit();
    var a = adj[id] || { wires: [], nodes: {} };
    a.wires.forEach(function (w) { w.classList.add('lit'); });
    nodeEls[id].classList.add('lit');
    for (var nid in a.nodes) nodeEls[nid] && nodeEls[nid].classList.add('lit');
  }
  function clearLit() {
    svg.querySelectorAll('.lit').forEach(function (e) { e.classList.remove('lit'); });
  }
  function clearFocus() {
    svg.classList.remove('focused');
    clearLit();
  }
  function hover(id, entering) {
    if (entering) { applyFocus(id); }
    else if (pinned) { applyFocus(pinned); tip.hidden = true; }
    else { clearFocus(); tip.hidden = true; }
  }
  function moveTip(ev, n) {
    tip.innerHTML = '';
    var t = document.createElement('div');
    t.textContent = n.title;
    var d = document.createElement('div');
    d.className = 'tip-date';
    d.textContent = n.date + (LOOM.lessons[n.id] ? ' · lesson ready' : ' · not yet charted');
    tip.appendChild(t); tip.appendChild(d);
    tip.hidden = false;
    var pad = 14;
    var x = Math.min(ev.clientX + pad, window.innerWidth - 300);
    var y = Math.max(ev.clientY - 44, 8);
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  }

  // ---------- selection ----------
  function select(id, opts) {
    opts = opts || {};
    if (pinned && nodeEls[pinned]) nodeEls[pinned].classList.remove('selected');
    pinned = id;
    if (id) {
      nodeEls[id].classList.add('selected');
      applyFocus(id);
      if (opts.pan !== false) panToNode(id);
    } else {
      clearFocus();
    }
    if (api.onSelect) api.onSelect(id);
  }

  // ---------- node state classes ----------
  function refreshStates(readMap, nextId) {
    LOOM.nodes.forEach(function (n) {
      var g = nodeEls[n.id];
      var written = !!LOOM.lessons[n.id];
      g.classList.toggle('seed', !written);
      g.classList.toggle('written', written);
      g.classList.toggle('read', !!readMap[n.id]);
      g.classList.toggle('next', n.id === nextId);
    });
  }

  function setFilters(set) {
    var active = set && set.size;
    svg.classList.toggle('filtered', !!active);
    if (!active) {
      svg.querySelectorAll('.th-match').forEach(function (e) { e.classList.remove('th-match'); });
      return;
    }
    LOOM.nodes.forEach(function (n) {
      var match = n.threads.some(function (t) { return set.has(t); });
      nodeEls[n.id].classList.toggle('th-match', match);
    });
    svg.querySelectorAll('.wire').forEach(function (w) {
      var match = Array.from(set).some(function (t) { return w.classList.contains('th-' + t); });
      w.classList.toggle('th-match', match);
    });
  }

  // ---------- viewport ----------
  function aspect() { return wrap.clientHeight / Math.max(1, wrap.clientWidth); }
  function apply() {
    vb.h = vb.w * aspect();
    var minX = -vb.w + 220, maxX = W - 220;
    var minY = -vb.h + 220, maxY = H - 220;
    vb.x = Math.max(minX, Math.min(maxX, vb.x));
    vb.y = Math.max(minY, Math.min(maxY, vb.y));
    svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.w + ' ' + vb.h);
    svg.classList.toggle('far', vb.w > 2000);
    if (api.onEraChange) api.onEraChange(currentEra());
  }
  function currentEra() {
    var cy = vb.y + vb.h / 2;
    var best = null, dist = Infinity;
    bands.forEach(function (b) {
      var d = Math.abs(b.center - cy);
      if (d < dist) { dist = d; best = b.n; }
    });
    return best;
  }
  function svgPoint(ev) {
    var pt = svg.createSVGPoint();
    pt.x = ev.clientX; pt.y = ev.clientY;
    var m = svg.getScreenCTM();
    return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 };
  }
  function zoomAt(px, py, factor) {
    var w = Math.max(240, Math.min(fitAllWidth() * 1.15, vb.w * factor));
    factor = w / vb.w;
    vb.x = px - (px - vb.x) * factor;
    vb.y = py - (py - vb.y) * factor;
    vb.w = w;
    apply();
  }
  function fitAllWidth() { return Math.max(W, H / aspect()) * 1.03; }
  function fitAll() {
    vb.w = fitAllWidth();
    vb.h = vb.w * aspect();
    vb.x = (W - vb.w) / 2;
    vb.y = (H - vb.h) / 2;
    apply();
  }
  function fitEra(n) {
    var b = bands.find(function (x) { return x.n === n; });
    if (!b) return;
    var needW = Math.max(W, (b.h + 120) / aspect());
    animateTo({ w: needW, x: (W - needW) / 2, y: b.center - (needW * aspect()) / 2 });
  }
  function panToNode(id, targetW) {
    var p = pos[id];
    if (!p) return;
    var w = targetW || Math.min(Math.max(vb.w, 700), 1000);
    animateTo({ w: w, x: p.x - w / 2, y: p.y - (w * aspect()) / 2 });
  }
  var animating = null;
  function animateTo(target, ms) {
    ms = ms || 450;
    var from = { x: vb.x, y: vb.y, w: vb.w };
    var start = performance.now();
    if (animating) cancelAnimationFrame(animating);
    function tick(now) {
      var t = Math.min(1, (now - start) / ms);
      var e = 1 - Math.pow(1 - t, 3);
      vb.x = from.x + (target.x - from.x) * e;
      vb.y = from.y + (target.y - from.y) * e;
      vb.w = from.w + (target.w - from.w) * e;
      apply();
      if (t < 1) animating = requestAnimationFrame(tick);
      else animating = null;
    }
    animating = requestAnimationFrame(tick);
  }

  // ---------- input ----------
  function bindInput() {
    svg.addEventListener('wheel', function (ev) {
      ev.preventDefault();
      if (ev.ctrlKey || ev.metaKey) {
        var p = svgPoint(ev);
        zoomAt(p.x, p.y, ev.deltaY > 0 ? 1.16 : 1 / 1.16);
      } else {
        var scale = vb.w / wrap.clientWidth;
        vb.x += ev.deltaX * scale;
        vb.y += ev.deltaY * scale;
        apply();
      }
    }, { passive: false });

    var drag = null;
    svg.addEventListener('pointerdown', function (ev) {
      // capture retargets later events to the svg, so remember the true target now
      var g = ev.target.closest ? ev.target.closest('.node') : null;
      drag = { x: ev.clientX, y: ev.clientY, vx: vb.x, vy: vb.y, moved: false, node: g };
      svg.setPointerCapture(ev.pointerId);
    });
    svg.addEventListener('pointermove', function (ev) {
      if (!drag) return;
      var scale = vb.w / wrap.clientWidth;
      var dx = (ev.clientX - drag.x) * scale;
      var dy = (ev.clientY - drag.y) * scale;
      if (Math.abs(ev.clientX - drag.x) + Math.abs(ev.clientY - drag.y) > 5) drag.moved = true;
      if (drag.moved) {
        svg.classList.add('panning');
        vb.x = drag.vx - dx;
        vb.y = drag.vy - dy;
        apply();
      }
    });
    svg.addEventListener('pointerup', function (ev) {
      svg.classList.remove('panning');
      if (drag && !drag.moved) {
        select(drag.node ? drag.node.dataset.id : null, { pan: false });
      }
      drag = null;
    });
    svg.addEventListener('dblclick', function (ev) {
      var p = svgPoint(ev);
      zoomAt(p.x, p.y, 0.55);
    });
    window.addEventListener('resize', apply);
  }

  // ---------- init ----------
  function init() {
    svg = document.getElementById('chart');
    wrap = document.getElementById('chart-wrap');
    tip = document.getElementById('tip');
    computeLayout();
    render();
    bindInput();
    // open on the origins: fit width, bottom of the chart
    vb.w = W;
    vb.h = vb.w * aspect();
    vb.x = 0;
    vb.y = H - vb.h + 30;
    apply();
  }

  return {
    init: init,
    select: select,
    refreshStates: refreshStates,
    setFilters: setFilters,
    fitAll: fitAll,
    fitEra: fitEra,
    panToNode: panToNode,
    zoomBy: function (f) { zoomAt(vb.x + vb.w / 2, vb.y + vb.h / 2, f); },
    bands: function () { return bands; },
    api: api,
  };
})();
