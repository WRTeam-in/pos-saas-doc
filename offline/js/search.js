// Documentation search: the Search button in the top bar (or Ctrl/Cmd+K, or "/") opens a box; results are grouped
// page by page, each with its matching sections. Plain script so it works online and in the offline copy.
// The index (js/search-index.js) is made at build time by scripts/build-search.mjs and loaded on first open.
(function () {
  if (window.__docSearch) return;
  window.__docSearch = true;

  var self = document.currentScript && document.currentScript.src;
  var siteRoot = self ? self.replace(/js\/search\.js(\?.*)?$/, '') : '/';
  var offline = location.protocol === 'file:';
  var box, input, list, status, index = null, active = -1, links = [], lastFocus = null, timer;

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function words(q) { return q.toLowerCase().split(/\s+/).filter(function (w) { return w.length > 0; }); }
  function href(page, anchor) { return siteRoot + page.u + (offline ? 'index.html' : '') + (anchor ? '#' + anchor : ''); }

  function load(done) {
    if (index) return done();
    if (window.__DOC_SEARCH_INDEX) { index = window.__DOC_SEARCH_INDEX; return done(); }
    var missing = function () { index = []; done(); status.textContent = 'Search is not ready yet. Run "npm run build" in the documentation folder once, then reload.'; };
    if (offline) {
      // Opened from disk: a script tag is the only way to read a local file.
      var s = document.createElement('script');
      s.src = siteRoot + 'js/search-index.js';
      s.onload = function () { index = window.__DOC_SEARCH_INDEX || []; done(); };
      s.onerror = missing;
      document.head.appendChild(s);
      return;
    }
    // On a server, check the file really is the index (a preview server answers a missing file with a web page).
    fetch(siteRoot + 'js/search-index.js', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (code) {
      var start = code.indexOf('window.__DOC_SEARCH_INDEX=');
      if (start !== 0) return missing();
      try { index = JSON.parse(code.slice(26).trim().replace(/;$/, '')); } catch (x) { return missing(); }
      done();
    }, missing);
  }

  function snippet(textValue, ws) {
    var lower = textValue.toLowerCase(), pos = -1;
    for (var i = 0; i < ws.length && pos < 0; i++) pos = lower.indexOf(ws[i]);
    var from = Math.max(0, pos - 60), part = textValue.slice(from, from + 170);
    var out = esc(part);
    ws.forEach(function (w) { out = out.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); });
    return (from > 0 ? '… ' : '') + out + (from + 170 < textValue.length ? ' …' : '');
  }

  function search(q) {
    var ws = words(q);
    if (!ws.length) return [];
    var results = [];
    index.forEach(function (page) {
      var title = page.ti.toLowerCase(), pageScore = 0, hits = [];
      ws.forEach(function (w) { if (title.indexOf(w) >= 0) pageScore += 10; });
      page.s.forEach(function (sec) {
        var h = sec.h.toLowerCase(), t = sec.t.toLowerCase(), all = title + ' ' + h + ' ' + t, score = 0;
        for (var i = 0; i < ws.length; i++) {
          if (all.indexOf(ws[i]) < 0) return; // every word must appear on the page section
          score += (h.indexOf(ws[i]) >= 0 ? 6 : 0) + (t.indexOf(ws[i]) >= 0 ? 2 : 0);
        }
        if (t.indexOf(q.toLowerCase()) >= 0) score += 5;
        hits.push({ sec: sec, score: score });
      });
      if (!hits.length) return;
      hits.sort(function (a, b) { return b.score - a.score; });
      results.push({ page: page, score: pageScore + hits[0].score + Math.min(hits.length, 5), hits: hits.slice(0, 3), more: hits.length - 3 });
    });
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 30);
  }

  function render() {
    var q = input.value.trim();
    active = -1;
    if (!q) { list.innerHTML = ''; status.textContent = 'Type to search every page of the documentation.'; links = []; return; }
    var res = search(q), ws = words(q);
    status.textContent = res.length ? res.length + (res.length === 1 ? ' page' : ' pages') + ' found' : 'No results for “' + q + '”.';
    list.innerHTML = res.map(function (r) {
      return '<li class="doc-search__page"><a class="doc-search__title" href="' + href(r.page, '') + '"><span>' + esc(r.page.ti) + '</span>' +
        (r.page.c ? '<small>' + esc(r.page.c) + '</small>' : '') + '</a><ul>' +
        r.hits.map(function (h) {
          return '<li><a class="doc-search__hit" href="' + href(r.page, h.sec.a) + '">' + (h.sec.h ? '<b>' + esc(h.sec.h) + '</b>' : '') +
            (h.sec.t ? '<span>' + snippet(h.sec.t, ws) + '</span>' : '') + '</a></li>';
        }).join('') + (r.more > 0 ? '<li class="doc-search__more">+ ' + r.more + ' more on this page</li>' : '') + '</ul></li>';
    }).join('');
    links = Array.prototype.slice.call(list.querySelectorAll('a'));
  }

  function move(step) {
    if (!links.length) return;
    if (active >= 0) links[active].classList.remove('is-active');
    active = (active + step + links.length) % links.length;
    links[active].classList.add('is-active');
    links[active].scrollIntoView({ block: 'nearest' });
  }

  function build() {
    box = document.createElement('div');
    box.className = 'doc-search';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Search the documentation');
    box.innerHTML =
      '<div class="doc-search__panel">' +
      '<div class="doc-search__bar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>' +
      '<input type="search" placeholder="Search the documentation" aria-label="Search the documentation" autocomplete="off" spellcheck="false">' +
      '<button type="button" class="doc-search__esc" aria-label="Close search">Esc</button></div>' +
      '<p class="doc-search__status" role="status"></p><ul class="doc-search__results"></ul></div>';
    document.body.appendChild(box);
    input = box.querySelector('input');
    list = box.querySelector('.doc-search__results');
    status = box.querySelector('.doc-search__status');
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { load(render); }, 80); });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.closest('.doc-search__esc')) close();
      else if (e.target.closest('a')) close(true);
    });
  }

  function open() {
    if (!box) build();
    lastFocus = document.activeElement;
    box.classList.add('is-open');
    document.documentElement.classList.add('doc-search-open');
    input.focus();
    input.select();
    load(render);
  }

  function close(keepFocus) {
    if (!box || !box.classList.contains('is-open')) return;
    box.classList.remove('is-open');
    document.documentElement.classList.remove('doc-search-open');
    if (!keepFocus && lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.doc-search-btn')) { e.preventDefault(); open(); }
  });

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || '')) || e.target.isContentEditable;
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); open(); return; }
    if (!box || !box.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Enter' && links.length) { e.preventDefault(); (links[active >= 0 ? active : 0]).click(); }
  });
})();
