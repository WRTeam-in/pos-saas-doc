// Screenshot viewer: a click on a documentation screenshot opens it large on the same page instead of a new tab.
// Close with the X, Esc or a click anywhere outside the picture; arrow keys move between the screenshots on the page.
// Ctrl/Cmd/Shift-click keeps the browser's own behaviour. Plain script: used by the online and the offline docs.
(function () {
  if (window.__docLightbox) return;
  window.__docLightbox = true;

  var box, img, cap, count, list = [], index = 0, lastFocus = null;

  function build() {
    box = document.createElement('div');
    box.className = 'doc-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Screenshot');
    box.innerHTML =
      '<button type="button" class="doc-lightbox__close" aria-label="Close">&times;</button>' +
      '<button type="button" class="doc-lightbox__nav doc-lightbox__nav--prev" aria-label="Previous screenshot">&#8249;</button>' +
      '<figure class="doc-lightbox__figure"><img alt=""><figcaption><span class="doc-lightbox__caption"></span><span class="doc-lightbox__count"></span></figcaption></figure>' +
      '<button type="button" class="doc-lightbox__nav doc-lightbox__nav--next" aria-label="Next screenshot">&#8250;</button>';
    document.body.appendChild(box);
    img = box.querySelector('img');
    cap = box.querySelector('.doc-lightbox__caption');
    count = box.querySelector('.doc-lightbox__count');
    box.addEventListener('click', function (e) {
      if (e.target.closest('.doc-lightbox__nav--prev')) return show(index - 1);
      if (e.target.closest('.doc-lightbox__nav--next')) return show(index + 1);
      if (e.target !== img) close(); // anywhere but the picture and the arrows closes it
    });
  }

  function show(i) {
    index = (i + list.length) % list.length;
    var link = list[index];
    var thumb = link.querySelector('img');
    img.src = link.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = thumb ? thumb.alt : '';
    count.textContent = list.length > 1 ? (index + 1) + ' / ' + list.length : '';
    box.classList.toggle('doc-lightbox--single', list.length < 2);
  }

  function open(link) {
    if (!box) build();
    list = Array.prototype.slice.call(document.querySelectorAll('.screenshot a[href]'));
    lastFocus = document.activeElement;
    show(Math.max(0, list.indexOf(link)));
    box.classList.add('is-open');
    document.documentElement.classList.add('doc-lightbox-open');
    box.querySelector('.doc-lightbox__close').focus();
  }

  function close() {
    if (!box || !box.classList.contains('is-open')) return;
    box.classList.remove('is-open');
    document.documentElement.classList.remove('doc-lightbox-open');
    img.removeAttribute('src');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('.screenshot a[href]');
    if (!link || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    open(link);
  });

  document.addEventListener('keydown', function (e) {
    if (!box || !box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && list.length > 1) show(index - 1);
    else if (e.key === 'ArrowRight' && list.length > 1) show(index + 1);
    else if (e.key === 'Tab') {
      var items = box.querySelectorAll('button:not([hidden])');
      var visible = Array.prototype.filter.call(items, function (b) { return b.offsetParent !== null; });
      var first = visible[0], last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
