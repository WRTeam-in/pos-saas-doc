// Two-way light/dark switch for the top bar (replaces the built-in three-way light/dark/system switch).
// The choice is saved under the same "theme" key the site reads on load. Plain script: online and offline.
(function () {
  if (window.__docTheme) return;
  window.__docTheme = true;
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.doc-theme-btn');
    if (!btn) return;
    e.preventDefault();
    var root = document.documentElement;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    root.setAttribute('data-theme-choice', next);
    try { localStorage.setItem('theme', next); } catch (x) {}
  });
})();
