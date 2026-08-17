// Starts the app, then serves lesson bodies on demand.
//
// The chart knows which nodes are written from the manifest alone, so nothing
// on it waits for prose: the atlas paints complete, and a lesson file is
// fetched only when a reader actually reaches for it. Loading every lesson up
// front cost a phone megabytes and a request per lesson before the first tap.
// Plain script tags, so the atlas still works from file:// with no server.
LOOM.lessonLoader = (function () {
  var waiting = {}; // id -> [callback], so a second reach joins the first fetch

  function load(id, cb) {
    if (LOOM.lessons[id]) { if (cb) cb(LOOM.lessons[id]); return; }
    if (!LOOM.hasLesson(id)) { if (cb) cb(null); return; }
    if (waiting[id]) { if (cb) waiting[id].push(cb); return; }
    waiting[id] = cb ? [cb] : [];

    var s = document.createElement('script');
    s.src = 'data/lessons/' + id + '.js';
    s.onload = s.onerror = function () {
      var queued = waiting[id];
      delete waiting[id];
      queued.forEach(function (fn) { fn(LOOM.lessons[id] || null); });
    };
    document.head.appendChild(s);
  }

  return {
    load: load,
    // Called when a dossier opens, so the body is usually already here by the
    // time the reader presses the button and the lesson opens instantly.
    prefetch: function (id) { load(id, null); },
  };
})();

LOOM.app.init();
