// Lets any vertical (portrait) photo be clicked to view full-size,
// uncropped, in an overlay. Orientation is detected at runtime from each
// image's natural dimensions, so this works automatically wherever a
// vertical photo appears (grids, side-by-side pairs, stacked), without
// needing per-page markup changes.
(function () {
  var zoomUI = null;

  function createOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'photo-zoom-overlay';
    var img = document.createElement('img');
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    function close() {
      overlay.classList.remove('is-open');
    }
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    return { overlay: overlay, img: img };
  }

  function openZoom(src, alt) {
    if (!zoomUI) zoomUI = createOverlay();
    zoomUI.img.src = src;
    zoomUI.img.alt = alt || '';
    zoomUI.overlay.classList.add('is-open');
  }

  function attach(img) {
    if (img.classList.contains('is-zoomable')) return;
    img.classList.add('is-zoomable');
    img.addEventListener('click', function () {
      openZoom(img.currentSrc || img.src, img.alt);
    });
  }

  function checkImage(img) {
    if (img.naturalWidth && img.naturalHeight && img.naturalHeight > img.naturalWidth) {
      attach(img);
    }
  }

  document.querySelectorAll('.col-middle img').forEach(function (img) {
    if (img.complete) {
      checkImage(img);
    } else {
      img.addEventListener('load', function () { checkImage(img); });
    }
  });
})();
