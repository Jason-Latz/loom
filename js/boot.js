// Starts the app as soon as the graph is ready, then streams every written
// lesson in behind it; nodes light up as their files register. Plain script
// tags so the atlas works from file:// with no server. On a phone this makes
// the chart interactive immediately instead of waiting on all lesson files.
(function () {
  var ids = LOOM.lessonFiles || [];
  LOOM.app.init();
  if (!ids.length) return;
  var timer = null;
  function arrived() {
    if (timer) return;
    timer = setTimeout(function () {
      timer = null;
      LOOM.app.lessonsArrived();
    }, 120);
  }
  ids.forEach(function (id) {
    var s = document.createElement('script');
    s.src = 'data/lessons/' + id + '.js';
    s.onload = s.onerror = arrived;
    document.body.appendChild(s);
  });
})();
