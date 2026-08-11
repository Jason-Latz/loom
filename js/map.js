// The chart itself: an SVG atlas where time rises from the bottom and the
// world's regions run left to right as meridians. Wires are causality,
// colored by the pigment of the node they leave.
LOOM.map = (function () {
  var NS = 'http://www.w3.org/2000/svg';
  var W = 1600, ML = 100, MR = 80, MT = 86, MB = 64, ROW = 46, PAD = 26;
  var FOLD_LEFT = 44, FOLD_RIGHT = 36, FOLD_TOP = 118, FOLD_BOTTOM = 72, FOLD_GAP = 10;
  var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  var svg, wrap, tip, navigator, navigatorMap, navigatorContent, navigatorViewport;
  var mode = 'folded';
  var H = 0;
  // The chart is bookended by the world: an engraved map band below the oldest
  // era and another above the newest, so all of history sits between two earths.
  // The source map is equirectangular 2000x1000; we crop off Antarctica and the
  // empty high Arctic so the band reads as land rather than as ocean.
  var MAP_LAT_TOP = 78, MAP_LAT_BOT = -58;
  var MAP_Y_TOP = (90 - MAP_LAT_TOP) / 180 * 1000;
  var MAP_Y_BOT = (90 - MAP_LAT_BOT) / 180 * 1000;
  var MAPB = 0, worldBottomY = 0, worldTopY = 0, eraTop = 0;
  var vb = { x: 0, y: 0, w: W, h: 100 };
  var pos = {};      // node id -> {x, y}
  var bands = [];    // {n, title, span, top, h, center}
  var nodeEls = {};  // node id -> <g>
  var adj = {};      // node id -> {wires: [path], nodes: {id: true}}
  var nodeById = {};
  var pinned = null;
  var stateRead = {}, stateNext = null, activeFilters = null, activePath = null;
  var viewCache = { folded: null, original: null };
  var navDrag = null;
  var navDismissed = false;
  var api = { onSelect: null, onEraChange: null };

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function nx(n) { return ML + (n.x / 100) * (W - ML - MR); }

  // ---------- layout ----------
  function computeOriginalLayout() {
    var byEra = {};
    LOOM.nodes.forEach(function (n) { (byEra[n.era] = byEra[n.era] || []).push(n); });

    MAPB = window.LOOM_WORLDMAP ? (MAP_Y_BOT - MAP_Y_TOP) * (W / 2000) : 0;

    var totalRows = LOOM.nodes.length;
    H = MT + MB + 2 * MAPB + LOOM.eras.length * PAD * 2 + totalRows * ROW;

    worldBottomY = H - MB - MAPB;
    var cursor = worldBottomY; // bottom edge of the oldest era's band
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
    eraTop = cursor;              // top edge of the newest era's band
    worldTopY = eraTop - MAPB;    // the second world sits above it
  }

  // The folded atlas turns the long scroll into ten adjacent plates. Time still
  // rises inside every plate and geography still runs left to right, but each
  // era gets the full height of the screen instead of adding to one 18,000-unit
  // column. No node or wire is aggregated: this is the same graph, refolded.
  function computeFoldedLayout() {
    var byEra = {};
    LOOM.nodes.forEach(function (n) { (byEra[n.era] = byEra[n.era] || []).push(n); });

    MAPB = 0;
    H = 960;
    eraTop = FOLD_TOP;
    worldTopY = 0;
    worldBottomY = H;
    var plateH = H - FOLD_TOP - FOLD_BOTTOM;
    var plateW = (W - FOLD_LEFT - FOLD_RIGHT - FOLD_GAP * (LOOM.eras.length - 1)) / LOOM.eras.length;

    LOOM.eras.forEach(function (era, ei) {
      var list = byEra[era.n] || [];
      var left = FOLD_LEFT + ei * (plateW + FOLD_GAP);
      var b = {
        n: era.n, title: era.title, span: era.span,
        left: left, w: plateW, top: FOLD_TOP, h: plateH,
        center: FOLD_TOP + plateH / 2,
      };
      bands.push(b);
      list.forEach(function (n, i) {
        var inset = 8;
        pos[n.id] = {
          x: left + inset + (n.x / 100) * (plateW - inset * 2),
          y: FOLD_TOP + plateH - (i + 0.5) * (plateH / Math.max(1, list.length)),
        };
      });
    });
  }

  function computeLayout() {
    pos = {};
    bands = [];
    nodeById = {};
    LOOM.nodes.forEach(function (n) { nodeById[n.id] = n; });
    if (mode === 'folded') computeFoldedLayout();
    else computeOriginalLayout();
  }

  // ---------- the world, engraved ----------
  function renderWorld(parent) {
    var wm = window.LOOM_WORLDMAP;
    if (!wm) return;
    var scale = W / 2000;
    var defs = el('defs', {}, parent);

    band(worldBottomY, 'up');
    band(worldTopY, 'down');

    // dir is the direction the map fades in: it is solid at the outer edge of
    // the chart and dissolves into the parchment where history begins.
    function band(top, dir) {
      var gid = 'worldfade-' + dir;
      var grad = el('linearGradient', {
        id: gid,
        gradientUnits: 'userSpaceOnUse',
        x1: 0, x2: 0,
        y1: dir === 'up' ? top + MAPB : top,
        y2: dir === 'up' ? top : top + MAPB,
      }, defs);
      el('stop', { offset: '0', 'stop-color': '#fff', 'stop-opacity': '1' }, grad);
      el('stop', { offset: '0.65', 'stop-color': '#fff', 'stop-opacity': '0.72' }, grad);
      el('stop', { offset: '1', 'stop-color': '#fff', 'stop-opacity': '0.10' }, grad);

      // The mask region must be given explicitly in user space. Without x/y/w/h
      // it defaults to percentages of the bounding box, which silently clipped
      // the whole band away. It doubles as the latitude crop.
      var mid = 'worldmask-' + dir;
      var mask = el('mask', {
        id: mid, maskUnits: 'userSpaceOnUse',
        x: 0, y: top, width: W, height: MAPB,
      }, defs);
      el('rect', { x: 0, y: top, width: W, height: MAPB, fill: 'url(#' + gid + ')' }, mask);

      var g = el('g', { 'class': 'world-band', mask: 'url(#' + mid + ')' }, parent);
      var inner = el('g', { transform: 'translate(0 ' + (top - MAP_Y_TOP * scale) + ') scale(' + scale + ')' }, g);

      var grat = el('g', { 'class': 'world-graticule' }, inner);
      var lon, lat;
      for (lon = -180; lon <= 180; lon += 30) {
        var gx = (lon + 180) / 360 * 2000;
        el('line', { x1: gx, y1: 0, x2: gx, y2: 1000 }, grat);
      }
      for (lat = -60; lat <= 60; lat += 30) {
        var gy = (90 - lat) / 180 * 1000;
        el('line', { x1: 0, y1: gy, x2: 2000, y2: gy }, grat);
      }
      el('line', { x1: 0, y1: 500, x2: 2000, y2: 500, 'class': 'world-equator' }, inner);
      el('path', { d: wm.land, 'class': 'world-land' }, inner);
    }
  }

  // ---------- render ----------
  function renderFoldedFrame(gBands, gGuides) {
    var axis = el('line', {
      x1: FOLD_LEFT, y1: 34, x2: W - FOLD_RIGHT, y2: 34,
      'class': 'folded-time-axis',
    }, gBands);
    axis.setAttribute('marker-end', 'url(#folded-arrow)');
    var defs = svg.querySelector('defs') || el('defs', {}, svg);
    var marker = el('marker', {
      id: 'folded-arrow', viewBox: '0 0 10 10', refX: 9, refY: 5,
      markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse',
    }, defs);
    el('path', { d: 'M 0 0 L 10 5 L 0 10 z', 'class': 'folded-arrow' }, marker);

    var origins = el('text', { x: FOLD_LEFT, y: 24, 'class': 'folded-end', 'text-anchor': 'start' }, gBands);
    origins.textContent = 'ORIGINS';
    var now = el('text', { x: W - FOLD_RIGHT, y: 24, 'class': 'folded-end', 'text-anchor': 'end' }, gBands);
    now.textContent = 'NOW';

    bands.forEach(function (b, i) {
      var hit = el('rect', {
        x: b.left, y: b.top, width: b.w, height: b.h,
        'class': 'era-click', tabindex: '0', role: 'button',
        'aria-label': 'Zoom to Era ' + ROMAN[b.n - 1] + ', ' + b.title,
      }, gBands);
      hit.dataset.era = b.n;
      hit.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        ev.preventDefault();
        ev.stopPropagation();
        fitEra(+hit.dataset.era);
      });
      el('rect', {
        x: b.left, y: b.top, width: b.w, height: b.h,
        'class': 'folded-plate' + (i % 2 ? ' alt' : ''),
      }, gBands);
      var numeral = el('text', {
        x: b.left + b.w / 2, y: 64, 'class': 'folded-era-num', 'text-anchor': 'middle',
      }, gBands);
      numeral.textContent = ROMAN[b.n - 1];
      var label = el('text', {
        x: b.left + b.w / 2, y: 82, 'class': 'folded-era-label', 'text-anchor': 'middle',
      }, gBands);
      label.textContent = b.title.replace(/^The /, '');
      var span = el('text', {
        x: b.left + b.w / 2, y: 98, 'class': 'folded-era-span', 'text-anchor': 'middle',
      }, gBands);
      span.textContent = b.span;

      LOOM.regions.forEach(function (r) {
        if (r.id === 'world') return;
        var x = b.left + 8 + (r.x / 100) * (b.w - 16);
        el('line', {
          x1: x, y1: b.top, x2: x, y2: b.top + b.h,
          'class': 'folded-meridian',
        }, gGuides);
      });
    });
  }

  function render() {
    var gWorld = el('g', { 'class': 'world-layer' }, svg);
    var gBands = el('g', {}, svg);
    var gGuides = el('g', {}, svg);
    var gWires = el('g', {}, svg);
    var gNodes = el('g', {}, svg);

    if (mode === 'folded') {
      renderFoldedFrame(gBands, gGuides);
    } else {
      renderWorld(gWorld);

      bands.forEach(function (b, i) {
        el('rect', { x: 0, y: b.top, width: W, height: b.h, 'class': 'era-band' + (i % 2 ? ' alt' : '') }, gBands);
        el('line', { x1: 0, y1: b.top, x2: W, y2: b.top, 'class': 'era-rule' }, gBands);
        var label = el('text', { x: 42, y: b.center, 'class': 'era-label', 'text-anchor': 'middle', transform: 'rotate(-90 42 ' + b.center + ')' }, gBands);
        label.textContent = 'Era ' + ROMAN[b.n - 1] + ' · ' + b.title;
        var span = el('text', { x: 66, y: b.center, 'class': 'era-span', 'text-anchor': 'middle', transform: 'rotate(-90 66 ' + b.center + ')' }, gBands);
        span.textContent = b.span;
      });
      el('line', { x1: 0, y1: worldBottomY, x2: W, y2: worldBottomY, 'class': 'era-rule' }, gBands);

      // Meridians belong to the chart, not to the maps: the region columns are
      // evenly spaced for legibility and do not claim to be real longitudes, so
      // they stop where the world begins.
      LOOM.regions.forEach(function (r) {
        if (r.id === 'world') return;
        var x = ML + (r.x / 100) * (W - ML - MR);
        el('line', { x1: x, y1: eraTop, x2: x, y2: worldBottomY, 'class': 'meridian' }, gGuides);
        var t1 = el('text', { x: x, y: eraTop - 34, 'class': 'meridian-label' }, gGuides);
        t1.textContent = r.name;
        var t2 = el('text', { x: x, y: worldBottomY + 40, 'class': 'meridian-label' }, gGuides);
        t2.textContent = r.name;
      });
    }

    // wires
    LOOM.nodes.forEach(function (n) {
      (n.edges || []).forEach(function (e) {
        var a = pos[n.id], b = pos[e.to];
        if (!a || !b) return;
        var dy = a.y - b.y;
        var target = nodeById[e.to];
        var d;
        if (mode === 'folded' && target && target.era !== n.era) {
          var dx = b.x - a.x;
          d = 'M ' + a.x + ' ' + a.y +
            ' C ' + (a.x + dx * 0.42) + ' ' + a.y + ', ' +
            (b.x - dx * 0.42) + ' ' + b.y + ', ' + b.x + ' ' + b.y;
        } else {
          var edgeInset = mode === 'folded' ? 5 : 10;
          d = 'M ' + a.x + ' ' + (a.y - edgeInset) +
            ' C ' + a.x + ' ' + (a.y - dy * 0.45) + ', ' + b.x + ' ' + (b.y + dy * 0.45) + ', ' + b.x + ' ' + (b.y + edgeInset);
        }
        var th = n.threads[0];
        var cross = mode === 'folded' && target && target.era !== n.era ? ' cross-era' : '';
        var p = el('path', { d: d, 'class': 'wire t-' + e.type + ' th-' + th + cross, style: '--c: var(--th-' + th + ')' }, gWires);
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
      var g = el('g', { 'class': 'node era-' + n.era, transform: 'translate(' + p.x + ' ' + p.y + ')', style: '--c: var(--th-' + n.threads[0] + ')' }, gNodes);
      g.dataset.id = n.id;
      var folded = mode === 'folded';
      el('circle', { r: folded ? 7.5 : 15, 'class': 'halo' }, g);
      el('circle', { r: folded ? 4.5 : 9, 'class': 'core' }, g);
      el('circle', { r: folded ? 1.7 : 3.4, 'class': 'pip' }, g);
      var label = el('text', { y: folded ? 12 : 26, 'class': 'label' }, g);
      setLabel(label, n.title, folded ? 7.2 : 14);
      el('circle', { r: folded ? 9 : 18, 'class': 'hit' }, g);
      nodeEls[n.id] = g;

      g.addEventListener('mouseenter', function () { hover(n.id, true); });
      g.addEventListener('mouseleave', function () { hover(n.id, false); });
      g.addEventListener('mousemove', function (ev) { moveTip(ev, n); });
    });
  }

  function setLabel(textEl, title, lineHeight) {
    if (title.length <= 22) { textEl.textContent = title; return; }
    var mid = Math.floor(title.length / 2);
    var space = -1;
    for (var i = 0; i < title.length; i++) {
      if (title[i] === ' ' && Math.abs(i - mid) < Math.abs(space - mid)) space = i;
    }
    if (space < 0) { textEl.textContent = title; return; }
    var l1 = el('tspan', { x: 0, dy: 0 }, textEl);
    l1.textContent = title.slice(0, space);
    var l2 = el('tspan', { x: 0, dy: lineHeight }, textEl);
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

  // Arrow-key traversal. Up and down walk the main reading sequence, and since
  // time rises on this chart, up is later. Left and right jump to the nearest
  // node on that side, strongly preferring one on a similar row so the move
  // matches what the eye expects.
  function neighbor(id, key) {
    var idx = LOOM.nodes.findIndex(function (n) { return n.id === id; });
    if (idx < 0) return null;
    if (key === 'ArrowUp') return LOOM.nodes[idx + 1] ? LOOM.nodes[idx + 1].id : null;
    if (key === 'ArrowDown') return LOOM.nodes[idx - 1] ? LOOM.nodes[idx - 1].id : null;

    var from = pos[id];
    if (!from) return null;
    var want = key === 'ArrowRight' ? 1 : -1;
    var best = null, bestScore = Infinity;
    LOOM.nodes.forEach(function (n) {
      if (n.id === id) return;
      var p = pos[n.id];
      var dx = (p.x - from.x) * want;
      if (dx <= 1) return; // must actually be on the side we are heading
      var score = dx + Math.abs(p.y - from.y) * 3;
      if (score < bestScore) { bestScore = score; best = n.id; }
    });
    return best;
  }

  // ---------- node state classes ----------
  function refreshStates(readMap, nextId) {
    stateRead = readMap || {};
    stateNext = nextId || null;
    LOOM.nodes.forEach(function (n) {
      var g = nodeEls[n.id];
      if (!g) return;
      var written = !!LOOM.lessons[n.id];
      g.classList.toggle('seed', !written);
      g.classList.toggle('written', written);
      g.classList.toggle('read', !!readMap[n.id]);
      g.classList.toggle('next', n.id === nextId);
    });
  }

  // Light only the nodes on a path and the wires that run between them.
  function setPath(ids) {
    activePath = ids && ids.length ? ids.slice() : null;
    var set = ids && ids.length ? ids.reduce(function (m, id) { m[id] = true; return m; }, {}) : null;
    svg.classList.toggle('pathed', !!set);
    if (!set) {
      svg.querySelectorAll('.on-path').forEach(function (e) { e.classList.remove('on-path'); });
      return;
    }
    LOOM.nodes.forEach(function (n) {
      nodeEls[n.id].classList.toggle('on-path', !!set[n.id]);
    });
    svg.querySelectorAll('.wire').forEach(function (w) {
      w.classList.toggle('on-path', !!set[w.dataset.from] && !!set[w.dataset.to]);
    });
  }

  function setFilters(set) {
    activeFilters = set && set.size ? new Set(set) : null;
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
  // A zero-height container (hidden tab, mid-layout, a phone mid-rotation) used to
  // make this return 0; every place that divides by aspect then produced Infinity,
  // the viewBox became "-Infinity NaN Infinity Infinity", and the chart stayed dead
  // until a reload. Fall back to a sane ratio instead of poisoning the viewport.
  function aspect() {
    var w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return 0.5625;
    return h / w;
  }
  // Invisible tap targets must never shrink below a fingertip on screen, so
  // the .hit radius grows in svg units as the view zooms out (via --hit-r,
  // consumed as a CSS geometry property; the r=18 attribute stays the floor).
  var HIT_SCREEN_PX = window.matchMedia && window.matchMedia('(pointer: coarse)').matches ? 21 : 12;
  var lastHitR = 0;
  function apply() {
    // repair any non-finite value before it can reach the viewBox attribute
    if (!isFinite(vb.w) || vb.w <= 0) vb.w = W;
    vb.h = vb.w * aspect();
    if (!isFinite(vb.x)) vb.x = (W - vb.w) / 2;
    if (!isFinite(vb.y)) vb.y = H - vb.h;
    var minX = -vb.w + 220, maxX = W - 220;
    var minY = -vb.h + 220, maxY = H - 220;
    vb.x = Math.max(minX, Math.min(maxX, vb.x));
    vb.y = Math.max(minY, Math.min(maxY, vb.y));
    svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.w + ' ' + vb.h);
    svg.classList.toggle('folded', mode === 'folded');
    svg.classList.toggle('original', mode === 'original');
    svg.classList.toggle('overview', mode === 'folded' && vb.w > 820);
    svg.classList.toggle('far', mode === 'original' ? vb.w > 2000 : vb.w > 820);
    var hitFloor = mode === 'folded' ? 9 : 18;
    var hitR = Math.max(hitFloor, HIT_SCREEN_PX * vb.w / (wrap.clientWidth || 1));
    if (Math.abs(hitR - lastHitR) > 1) {
      lastHitR = hitR;
      svg.style.setProperty('--hit-r', hitR.toFixed(1) + 'px');
    }
    var era = currentEra();
    if (era) svg.dataset.era = era;
    if (api.onEraChange) api.onEraChange(era);
    updateNavigator();
  }
  function currentEra() {
    if (mode === 'folded') {
      var cx = vb.x + vb.w / 2;
      var foldedBest = null, xDist = Infinity;
      bands.forEach(function (b) {
        var d = Math.abs(b.left + b.w / 2 - cx);
        if (d < xDist) { xDist = d; foldedBest = b.n; }
      });
      return foldedBest;
    }
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
    if (mode === 'folded') {
      var foldedW = wrap.clientWidth < 600 ? 260 : 560;
      animateTo({ w: foldedW, x: b.left + b.w / 2 - foldedW / 2, y: b.center - (foldedW * aspect()) / 2 });
      return;
    }
    var needW = Math.max(W, (b.h + 120) / aspect());
    animateTo({ w: needW, x: (W - needW) / 2, y: b.center - (needW * aspect()) / 2 });
  }
  function panToNode(id, targetW) {
    var p = pos[id];
    if (!p) return;
    var w;
    if (targetW) w = targetW;
    else if (mode === 'folded') {
      var detailW = wrap.clientWidth < 600 ? 260 : 700;
      w = Math.max(240, Math.min(vb.w, detailW));
    } else {
      w = Math.min(Math.max(vb.w, 700), 1000);
    }
    animateTo({ w: w, x: p.x - w / 2, y: p.y - (w * aspect()) / 2 });
  }
  var animating = null;
  function animateTo(target, ms) {
    ms = ms || 450;
    if (!isFinite(vb.x) || !isFinite(vb.y) || !isFinite(vb.w)) apply(); // repair before reading a start point
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

  // ---------- folded overview navigator ----------
  function renderNavigator() {
    if (!navigatorMap || !navigatorContent) return;
    navigatorContent.innerHTML = '';
    navigatorMap.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    navigatorMap.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    if (mode !== 'folded') return;

    bands.forEach(function (b, i) {
      el('rect', {
        x: b.left, y: b.top, width: b.w, height: b.h,
        'class': 'navigator-plate' + (i % 2 ? ' alt' : ''),
      }, navigatorContent);
    });

    LOOM.nodes.forEach(function (n) {
      (n.edges || []).forEach(function (e) {
        var a = pos[n.id], b = pos[e.to];
        if (!a || !b) return;
        var target = nodeById[e.to];
        var d;
        if (target && target.era !== n.era) {
          var dx = b.x - a.x;
          d = 'M ' + a.x + ' ' + a.y +
            ' C ' + (a.x + dx * 0.42) + ' ' + a.y + ', ' +
            (b.x - dx * 0.42) + ' ' + b.y + ', ' + b.x + ' ' + b.y;
        } else {
          var dy = a.y - b.y;
          d = 'M ' + a.x + ' ' + a.y +
            ' C ' + a.x + ' ' + (a.y - dy * 0.45) + ', ' +
            b.x + ' ' + (b.y + dy * 0.45) + ', ' + b.x + ' ' + b.y;
        }
        var th = n.threads[0];
        el('path', {
          d: d, 'class': 'navigator-wire',
          style: '--c: var(--th-' + th + ')',
        }, navigatorContent);
      });
    });

    LOOM.nodes.forEach(function (n) {
      var p = pos[n.id];
      var th = n.threads[0];
      el('circle', {
        cx: p.x, cy: p.y, r: 5.2, 'class': 'navigator-node',
        style: '--c: var(--th-' + th + ')',
      }, navigatorContent);
    });
  }

  function updateNavigator() {
    if (!navigator || !navigatorViewport) return;
    var whole = fitAllWidth();
    var zoomed = mode === 'folded' && vb.w < whole * 0.84;
    if (!zoomed) navDismissed = false;
    var covered = document.body.classList.contains('path-active') ||
      ['dossier', 'reader', 'intro', 'paths'].some(function (id) {
        var overlay = document.getElementById(id);
        return overlay && !overlay.hidden;
      });
    var visible = zoomed && !navDismissed && !covered;
    navigator.hidden = !visible;
    navigator.dataset.navigatorState = visible ? 'active' : 'inactive';
    if (!visible) return;
    navigatorViewport.setAttribute('x', vb.x);
    navigatorViewport.setAttribute('y', vb.y);
    navigatorViewport.setAttribute('width', vb.w);
    navigatorViewport.setAttribute('height', vb.h);
  }

  function navigatorPoint(ev) {
    var pt = navigatorMap.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    var matrix = navigatorMap.getScreenCTM();
    return matrix ? pt.matrixTransform(matrix.inverse()) : { x: W / 2, y: H / 2 };
  }

  function bindNavigator() {
    if (!navigatorMap) return;
    var dismiss = document.getElementById('navigator-dismiss');
    if (dismiss) dismiss.addEventListener('click', function () {
      navDismissed = true;
      updateNavigator();
      var fit = document.getElementById('zoom-fit');
      if (fit) fit.focus();
    });

    navigatorMap.setAttribute('tabindex', '0');
    navigatorMap.setAttribute('role', 'application');
    navigatorMap.setAttribute('aria-label', 'Folded atlas overview. Drag the gold frame, use the Arrow keys, or use the era rail to travel.');
    navigatorMap.addEventListener('pointerdown', function (ev) {
      if (mode !== 'folded') return;
      ev.preventDefault();
      var p = navigatorPoint(ev);
      if (ev.target === navigatorViewport) {
        navDrag = { id: ev.pointerId, dx: p.x - vb.x, dy: p.y - vb.y };
      } else {
        vb.x = p.x - vb.w / 2;
        vb.y = p.y - vb.h / 2;
        navDrag = { id: ev.pointerId, dx: vb.w / 2, dy: vb.h / 2 };
        apply();
      }
      navigatorMap.setPointerCapture(ev.pointerId);
    });
    navigatorMap.addEventListener('pointermove', function (ev) {
      if (!navDrag || navDrag.id !== ev.pointerId) return;
      ev.preventDefault();
      var p = navigatorPoint(ev);
      vb.x = p.x - navDrag.dx;
      vb.y = p.y - navDrag.dy;
      apply();
    });
    function finishNavigator(ev) {
      if (!navDrag || navDrag.id !== ev.pointerId) return;
      navDrag = null;
      if (navigatorMap.hasPointerCapture(ev.pointerId)) navigatorMap.releasePointerCapture(ev.pointerId);
    }
    navigatorMap.addEventListener('pointerup', finishNavigator);
    navigatorMap.addEventListener('pointercancel', finishNavigator);
    navigatorMap.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        ev.stopPropagation();
        return;
      }
      var dx = 0, dy = 0;
      if (ev.key === 'ArrowLeft') dx = -vb.w * 0.18;
      else if (ev.key === 'ArrowRight') dx = vb.w * 0.18;
      else if (ev.key === 'ArrowUp') dy = -vb.h * 0.18;
      else if (ev.key === 'ArrowDown') dy = vb.h * 0.18;
      else return;
      ev.preventDefault();
      ev.stopPropagation();
      vb.x += dx;
      vb.y += dy;
      apply();
    });

    ['dossier', 'reader', 'intro', 'paths'].forEach(function (id) {
      var overlay = document.getElementById(id);
      if (overlay) new MutationObserver(updateNavigator).observe(overlay, { attributes: true, attributeFilter: ['hidden'] });
    });
    new MutationObserver(updateNavigator).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  // ---------- layout mode ----------
  function updateModeControls() {
    document.querySelectorAll('[data-atlas-view]').forEach(function (button) {
      var active = button.dataset.atlasView === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', active ? 'true' : 'false');
      button.setAttribute('tabindex', active ? '0' : '-1');
    });
    document.body.classList.toggle('folded-atlas', mode === 'folded');
    document.body.classList.toggle('original-atlas', mode === 'original');
  }

  function rebuild() {
    svg.innerHTML = '';
    nodeEls = {};
    adj = {};
    lastHitR = 0;
    computeLayout();
    render();
    renderNavigator();
    refreshStates(stateRead, stateNext);
    if (activeFilters && activeFilters.size) setFilters(activeFilters);
    if (activePath && activePath.length) setPath(activePath);
    if (pinned && nodeEls[pinned]) {
      nodeEls[pinned].classList.add('selected');
      applyFocus(pinned);
    }
  }

  function openInitialView() {
    if (mode === 'folded') {
      fitAll();
      return;
    }
    vb.w = W;
    vb.h = vb.w * aspect();
    vb.x = 0;
    vb.y = worldBottomY + Math.min(400, MAPB) - vb.h;
    apply();
  }

  function setMode(next) {
    next = next === 'original' ? 'original' : 'folded';
    if (next === mode) { updateModeControls(); return; }
    viewCache[mode] = { x: vb.x, y: vb.y, w: vb.w };
    mode = next;
    if (animating) { cancelAnimationFrame(animating); animating = null; }
    rebuild();
    var saved = viewCache[mode];
    if (saved) {
      vb.x = saved.x;
      vb.y = saved.y;
      vb.w = saved.w;
      apply();
    } else {
      openInitialView();
      if (pinned) panToNode(pinned);
    }
    updateModeControls();
    if (api.onModeChange) api.onModeChange(mode);
  }

  function bindModeControls() {
    var buttons = Array.from(document.querySelectorAll('[data-atlas-view]'));
    buttons.forEach(function (button, i) {
      button.addEventListener('click', function () { setMode(button.dataset.atlasView); });
      button.addEventListener('keydown', function (ev) {
        if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
        ev.preventDefault();
        ev.stopPropagation();
        var next = buttons[(i + (ev.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length];
        next.focus();
        setMode(next.dataset.atlasView);
      });
    });
    updateModeControls();
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
    var pointers = {};
    var pinch = null;

    function pointerList() {
      return Object.keys(pointers).map(function (id) { return pointers[id]; });
    }

    function beginPinch() {
      var pts = pointerList();
      if (pts.length < 2) return;
      var a = pts[0], b = pts[1];
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      var rect = svg.getBoundingClientRect();
      pinch = {
        distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        w: vb.w,
        anchorX: vb.x + (mx - rect.left) / rect.width * vb.w,
        anchorY: vb.y + (my - rect.top) / rect.height * vb.h,
      };
      drag = null;
      svg.classList.add('panning');
    }

    function movePinch() {
      var pts = pointerList();
      if (!pinch || pts.length < 2) return;
      var a = pts[0], b = pts[1];
      var distance = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      var w = Math.max(240, Math.min(fitAllWidth() * 1.15, pinch.w * pinch.distance / distance));
      var h = w * aspect();
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      var rect = svg.getBoundingClientRect();
      vb.w = w;
      vb.x = pinch.anchorX - (mx - rect.left) / rect.width * w;
      vb.y = pinch.anchorY - (my - rect.top) / rect.height * h;
      apply();
    }

    svg.addEventListener('pointerdown', function (ev) {
      // capture retargets later events to the svg, so remember the true target now
      var g = ev.target.closest ? ev.target.closest('.node') : null;
      var era = ev.target.closest ? ev.target.closest('.era-click') : null;
      pointers[ev.pointerId] = { id: ev.pointerId, x: ev.clientX, y: ev.clientY };
      if (pointerList().length > 1) beginPinch();
      else drag = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, vx: vb.x, vy: vb.y, moved: false, node: g, era: era };
      svg.setPointerCapture(ev.pointerId);
    });
    svg.addEventListener('pointermove', function (ev) {
      if (!pointers[ev.pointerId]) return;
      pointers[ev.pointerId].x = ev.clientX;
      pointers[ev.pointerId].y = ev.clientY;
      if (pinch) { movePinch(); return; }
      if (!drag || drag.id !== ev.pointerId) return;
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
    function finishPointer(ev, cancelled) {
      if (!pointers[ev.pointerId]) return;
      var wasPinching = !!pinch;
      delete pointers[ev.pointerId];
      var left = pointerList();
      if (wasPinching) {
        pinch = null;
        if (left.length >= 2) {
          beginPinch();
        } else if (left.length === 1) {
          drag = { id: left[0].id, x: left[0].x, y: left[0].y, vx: vb.x, vy: vb.y, moved: true, node: null };
        } else {
          drag = null;
        }
      } else if (drag && drag.id === ev.pointerId) {
        if (!cancelled && !drag.moved) {
          if (drag.node) select(drag.node.dataset.id, { pan: false });
          else if (drag.era && mode === 'folded') fitEra(+drag.era.dataset.era);
          else select(null, { pan: false });
        }
        drag = null;
      }
      if (!left.length) svg.classList.remove('panning');
    }
    svg.addEventListener('pointerup', function (ev) { finishPointer(ev, false); });
    svg.addEventListener('pointercancel', function (ev) { finishPointer(ev, true); });
    svg.addEventListener('dblclick', function (ev) {
      var p = svgPoint(ev);
      zoomAt(p.x, p.y, 0.55);
    });
    window.addEventListener('resize', apply);
  }

  // ---------- init ----------
  function init(initialMode) {
    svg = document.getElementById('chart');
    wrap = document.getElementById('chart-wrap');
    tip = document.getElementById('tip');
    navigator = document.getElementById('navigator-overlay');
    navigatorMap = document.getElementById('navigator-map');
    navigatorContent = document.getElementById('navigator-content');
    navigatorViewport = document.getElementById('navigator-viewport');
    mode = initialMode === 'original' ? 'original' : 'folded';
    computeLayout();
    render();
    renderNavigator();
    bindInput();
    bindNavigator();
    bindModeControls();
    openInitialView();
  }

  return {
    init: init,
    select: select,
    selected: function () { return pinned; },
    neighbor: neighbor,
    refreshStates: refreshStates,
    setFilters: setFilters,
    setPath: setPath,
    fitAll: fitAll,
    fitEra: fitEra,
    panToNode: panToNode,
    zoomBy: function (f) { zoomAt(vb.x + vb.w / 2, vb.y + vb.h / 2, f); },
    setMode: setMode,
    mode: function () { return mode; },
    currentEra: currentEra,
    bands: function () { return bands; },
    api: api,
  };
})();
