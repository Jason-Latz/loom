// Dossier panel (the node's card on the chart) and the reading room
// (a quiet paper page for the lesson itself).
LOOM.ui = {
  h: function (tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = text;
    return e;
  },
};

LOOM.ui.modal = (function () {
  var FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  var sessions = new WeakMap();

  function controls(container) {
    return Array.prototype.filter.call(container.querySelectorAll(FOCUSABLE), function (el) {
      return !el.closest('[hidden]') && el.getAttribute('aria-hidden') !== 'true';
    });
  }

  function open(container, first, opener) {
    var previous = sessions.get(container);
    if (previous) document.removeEventListener('keydown', previous.trap);

    var returnTo = opener || document.activeElement;
    if (returnTo === document.body || returnTo === document.documentElement) returnTo = null;

    function trap(ev) {
      if (ev.key !== 'Tab') return;
      var items = controls(container);
      if (!items.length) { ev.preventDefault(); return; }
      var firstItem = items[0];
      var lastItem = items[items.length - 1];
      if (ev.shiftKey && (document.activeElement === firstItem || !container.contains(document.activeElement))) {
        ev.preventDefault();
        lastItem.focus();
      } else if (!ev.shiftKey && (document.activeElement === lastItem || !container.contains(document.activeElement))) {
        ev.preventDefault();
        firstItem.focus();
      }
    }

    sessions.set(container, { opener: returnTo, trap: trap });
    document.addEventListener('keydown', trap);
    container.hidden = false;
    var target = first || controls(container)[0];
    if (target) target.focus();
  }

  function close(container) {
    var session = sessions.get(container);
    if (container.hidden && !session) return;
    container.hidden = true;
    if (!session) return;
    document.removeEventListener('keydown', session.trap);
    sessions.delete(container);
    var opener = session.opener;
    if (opener && opener.isConnected && !opener.disabled && !opener.closest('[hidden]')) opener.focus();
  }

  return { open: open, close: close };
})();

LOOM.reader = (function () {
  var h = LOOM.ui.h;
  var dossier, reader;
  var incomingIndex = null;

  var OUT_LABEL = { enables: 'enables', transforms: 'becomes', collides: 'collides with', echoes: 'echoes onward in' };
  var IN_LABEL = { enables: 'woven from', transforms: 'grew from', collides: 'struck by', echoes: 'echo of' };

  function node(id) { return LOOM.nodes.find(function (n) { return n.id === id; }); }
  function era(n) { return LOOM.eras.find(function (e) { return e.n === n.era; }); }
  function region(n) { return LOOM.regions.find(function (r) { return r.id === n.region; }); }
  function thread(id) { return LOOM.threads.find(function (t) { return t.id === id; }); }
  var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  function incoming(id) {
    if (!incomingIndex) {
      incomingIndex = {};
      LOOM.nodes.forEach(function (n) {
        (n.edges || []).forEach(function (e) {
          (incomingIndex[e.to] = incomingIndex[e.to] || []).push({ from: n.id, type: e.type, why: e.why });
        });
      });
    }
    return incomingIndex[id] || [];
  }

  function threadChips(n, cls) {
    var wrapEl = h('div', cls);
    n.threads.forEach(function (tid) {
      var t = thread(tid);
      var c = h('span', 'dos-thread', t.name);
      c.style.setProperty('--c', 'var(--th-' + tid + ')');
      c.title = t.pigment + ': ' + t.blurb;
      wrapEl.appendChild(c);
    });
    return wrapEl;
  }

  function connItem(targetId, typeLabel, why, pigmentThread) {
    var item = h('div', 'dos-conn');
    var link = h('button', 'conn-link');
    link.style.setProperty('--c', 'var(--th-' + pigmentThread + ')');
    var type = h('span', 'conn-type', typeLabel);
    link.appendChild(type);
    link.appendChild(document.createTextNode(node(targetId).title));
    link.addEventListener('click', function () {
      closeLesson();
      LOOM.map.select(targetId);
    });
    item.appendChild(link);
    item.appendChild(h('div', 'conn-why', why));
    return item;
  }

  // ---------------- dossier ----------------
  function showDossier(id) {
    var n = node(id);
    dossier.innerHTML = '';

    var close = h('button', 'dos-close', '✕');
    close.title = 'Close dossier';
    close.setAttribute('aria-label', 'Close dossier');
    close.addEventListener('click', function () { LOOM.map.select(null); });
    dossier.appendChild(close);

    var e = era(n);
    dossier.appendChild(h('div', 'dos-era', 'Era ' + ROMAN[e.n - 1] + ' · ' + e.title));
    dossier.appendChild(h('h2', 'dos-title', n.title));
    dossier.appendChild(h('div', 'dos-date', n.date));
    dossier.appendChild(h('div', 'dos-region', region(n).name));
    dossier.appendChild(threadChips(n, 'dos-threads'));
    dossier.appendChild(h('div', 'dos-hook', n.hook));
    dossier.appendChild(h('p', 'dos-summary', n.summary));

    var cta = h('div', 'dos-cta');
    var lesson = LOOM.lessons[id];
    var isRead = LOOM.app.isRead(id);
    if (lesson) {
      var btn = h('button', 'btn btn-gilt', isRead ? 'Read the lesson again' : 'Open the lesson · ' + (lesson.readingMinutes || 10) + ' min');
      btn.addEventListener('click', function () { openLesson(id, btn); });
      cta.appendChild(btn);
      if (isRead) cta.appendChild(h('div', 'dos-charted', '✦ charted ✦'));
    } else {
      var forge = h('div', 'dos-forge');
      forge.appendChild(document.createTextNode('This territory is not yet charted. Ask Codex in this folder to forge it:'));
      forge.appendChild(h('code', null, 'forge ' + id));
      forge.appendChild(h('div', 'forge-hint', 'The forge writes the lesson into the atlas; reload the chart to read it.'));
      cta.appendChild(forge);
    }
    dossier.appendChild(cta);

    var inc = incoming(id);
    if (inc.length) {
      dossier.appendChild(h('div', 'dos-head', 'Woven from'));
      inc.forEach(function (x) {
        dossier.appendChild(connItem(x.from, IN_LABEL[x.type], x.why, node(x.from).threads[0]));
      });
    }
    if ((n.edges || []).length) {
      dossier.appendChild(h('div', 'dos-head', 'Leads onward'));
      n.edges.forEach(function (x) {
        dossier.appendChild(connItem(x.to, OUT_LABEL[x.type], x.why, n.threads[0]));
      });
    }
    dossier.hidden = false;
  }

  function hideDossier() { dossier.hidden = true; }

  // ---------------- reading room ----------------
  function openLesson(id, opener) {
    var n = node(id);
    var l = LOOM.lessons[id];
    if (!l) return;
    reader.innerHTML = '';

    var close = h('button', 'reader-close', '✕');
    close.title = 'Close lesson';
    close.setAttribute('aria-label', 'Close lesson');
    close.addEventListener('click', closeLesson);
    reader.appendChild(close);

    var page = h('div', 'page');
    var e = era(n);
    page.appendChild(h('div', 'page-era', 'Era ' + ROMAN[e.n - 1] + ' · ' + e.title + ' · ' + n.date));
    page.appendChild(h('h1', 'page-title', n.title));
    page.appendChild(h('div', 'page-date', n.hook));
    page.appendChild(threadChips(n, 'page-threads'));
    page.appendChild(h('div', 'page-context', l.storyContext));

    var story = h('div', 'story');
    l.story.forEach(function (p) { story.appendChild(h('p', null, p)); });
    page.appendChild(story);

    page.appendChild(h('div', 'orn', '✦ ✦ ✦'));
    page.appendChild(h('div', 'sec-head', 'The View from Above'));
    l.significance.forEach(function (p) { page.appendChild(h('p', null, p)); });

    page.appendChild(h('div', 'sec-head', 'The Threads'));
    var ul = h('ul', 'threads-out');
    l.threadsOut.forEach(function (t) {
      var li = h('li');
      var link = h('button', 'conn-link');
      link.style.setProperty('--c', 'var(--th-' + node(t.to).threads[0] + ')');
      link.appendChild(h('span', 'conn-type', '→'));
      link.appendChild(document.createTextNode(node(t.to).title));
      link.addEventListener('click', function () {
        closeLesson();
        LOOM.map.select(t.to);
      });
      li.appendChild(link);
      li.appendChild(h('div', 'conn-why', t.why));
      ul.appendChild(li);
    });
    page.appendChild(ul);

    page.appendChild(h('div', 'sec-head', 'Prove It to Yourself'));
    l.questions.forEach(function (q, qi) { page.appendChild(questionBlock(id, q, qi)); });

    page.appendChild(h('div', 'sec-head', 'If This Grabbed You'));
    var deep = h('ul', 'deeper');
    l.deeper.forEach(function (d) { deep.appendChild(h('li', null, d)); });
    page.appendChild(deep);

    var foot = h('div', 'page-foot');
    var chartBtn = h('button', 'btn btn-gilt chart-it', LOOM.app.isRead(id) ? '✦ Charted · press the seal again' : 'Mark as Charted');
    chartBtn.addEventListener('click', function () { LOOM.app.markRead(id); });
    foot.appendChild(chartBtn);

    var next = LOOM.app.nextAfter(id);
    if (next) {
      var nextWrap = h('div', 'next-up');
      nextWrap.appendChild(document.createTextNode(
        next.forward ? 'Next on the sequence: ' : 'Nothing charted lies ahead yet. Still unread behind you: '
      ));
      var nb = h('button', 'btn', node(next.id).title);
      nb.addEventListener('click', function () {
        closeLesson();
        LOOM.map.select(next.id);
      });
      nextWrap.appendChild(nb);
      foot.appendChild(nextWrap);
    }
    page.appendChild(foot);

    reader.appendChild(page);
    reader.scrollTop = 0;
    LOOM.ui.modal.open(reader, close, opener);
  }

  function questionBlock(lessonId, q, qi) {
    var box = h('div', 'q');
    var head = h('div');
    head.appendChild(h('span', 'q-tag t-' + q.type, q.type));
    if (q.type === 'callback' && q.callbackTo) {
      head.appendChild(h('span', 'q-callback-chip', '↩ reaches back to ' + node(q.callbackTo).title));
    }
    box.appendChild(head);
    box.appendChild(h('div', 'q-prompt', q.prompt));

    var reveal = h('button', 'btn q-reveal', 'Reveal the answer');
    var answer = h('div', 'q-answer', q.answer);
    answer.hidden = true;
    var marks = h('div', 'q-marks');
    marks.hidden = true;
    var yes = h('button', 'btn', 'I had it');
    var no = h('button', 'btn', 'Not quite');
    var saved = LOOM.app.getMark(lessonId, qi);
    function paint() {
      yes.classList.toggle('picked-yes', saved === 'yes');
      no.classList.toggle('picked-no', saved === 'no');
    }
    yes.addEventListener('click', function () { saved = 'yes'; LOOM.app.setMark(lessonId, qi, 'yes'); paint(); });
    no.addEventListener('click', function () { saved = 'no'; LOOM.app.setMark(lessonId, qi, 'no'); paint(); });
    marks.appendChild(yes);
    marks.appendChild(no);
    reveal.addEventListener('click', function () {
      answer.hidden = false;
      marks.hidden = false;
      reveal.hidden = true;
      paint();
    });
    box.appendChild(reveal);
    box.appendChild(answer);
    box.appendChild(marks);
    return box;
  }

  function closeLesson() { LOOM.ui.modal.close(reader); }

  function init() {
    dossier = document.getElementById('dossier');
    reader = document.getElementById('reader');
    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape') return;
      if (!reader.hidden) closeLesson();
      else if (!document.getElementById('paths').hidden || !document.getElementById('intro').hidden) return;
      else if (!dossier.hidden) LOOM.map.select(null);
    });
  }

  return {
    init: init,
    showDossier: showDossier,
    hideDossier: hideDossier,
    openLesson: openLesson,
    closeLesson: closeLesson,
    isLessonOpen: function () { return !reader.hidden; },
  };
})();
