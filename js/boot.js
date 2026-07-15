// Loads every written lesson listed in the manifest, then starts the app.
// Plain script tags so the atlas works from file:// with no server.
(function () {
  var ids = LOOM.lessonFiles || [];
  var remaining = ids.length;
  function done() {
    LOOM.app.init();
  }
  if (!remaining) return done();
  ids.forEach(function (id) {
    var s = document.createElement('script');
    s.src = 'data/lessons/' + id + '.js';
    s.onload = s.onerror = function () {
      remaining -= 1;
      if (!remaining) done();
    };
    document.body.appendChild(s);
  });
})();
