// Scales the fixed-width canvas to fit any viewport, so the layout
// never reflows between mobile and desktop -- it's the same design,
// just scaled up or down as one piece (like a poster).
(function () {
  var wrap = document.getElementById('scale-wrap');
  var canvas = document.getElementById('canvas');
  var fitMode = wrap.getAttribute('data-fit') || 'width'; // 'width' or 'viewport'
  // read the canvas's own natural (un-transformed) width once, so each page
  // can define its own design grid via CSS width / the --canvas-width variable
  var DESIGN_WIDTH = canvas.getBoundingClientRect().width;

  function applyScale() {
    if (fitMode === 'viewport') {
      // fit the whole canvas inside the viewport, no scrolling in either direction
      var designHeight = canvas.getAttribute('data-design-height')
        ? parseFloat(canvas.getAttribute('data-design-height'))
        : canvas.offsetHeight;
      var scaleW = window.innerWidth / DESIGN_WIDTH;
      var scaleH = window.innerHeight / designHeight;
      var scale = Math.min(scaleW, scaleH);
      canvas.style.transform = 'scale(' + scale + ')';
      wrap.style.height = window.innerHeight + 'px';
    } else {
      // fit width only; page scrolls vertically as needed (for longer content pages)
      var scale = window.innerWidth / DESIGN_WIDTH;
      canvas.style.transform = 'scale(' + scale + ')';
      wrap.style.height = (canvas.offsetHeight * scale) + 'px';
    }
  }

  window.addEventListener('resize', applyScale);
  window.addEventListener('orientationchange', applyScale);
  window.addEventListener('load', applyScale);
  // run once immediately, then again after fonts/images settle
  applyScale();
  setTimeout(applyScale, 200);
  setTimeout(applyScale, 600);
})();
