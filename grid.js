// Dev-only positioning aid, not part of the site design.
// Press "g" to toggle a coordinate grid over the canvas, and show a
// live (x, y) readout (in canvas-space px -- the same units used by
// the left/top values throughout the HTML) that follows the cursor.
(function () {
  var canvas = document.getElementById('canvas');
  if (!canvas) return;

  var STEP_MINOR = 20;
  var STEP_MAJOR = 100;

  var overlay = document.createElement('div');
  overlay.className = 'grid-overlay';
  overlay.style.backgroundImage =
    'repeating-linear-gradient(to right, rgba(255,0,80,0.35) 0 1px, transparent 1px ' + STEP_MAJOR + 'px),' +
    'repeating-linear-gradient(to bottom, rgba(255,0,80,0.35) 0 1px, transparent 1px ' + STEP_MAJOR + 'px),' +
    'repeating-linear-gradient(to right, rgba(255,0,80,0.12) 0 1px, transparent 1px ' + STEP_MINOR + 'px),' +
    'repeating-linear-gradient(to bottom, rgba(255,0,80,0.12) 0 1px, transparent 1px ' + STEP_MINOR + 'px)';

  var labelsX = document.createElement('div');
  var labelsY = document.createElement('div');
  var width = canvas.offsetWidth;
  var height = canvas.getAttribute('data-design-height')
    ? parseFloat(canvas.getAttribute('data-design-height'))
    : canvas.offsetHeight;

  for (var x = 0; x <= width; x += STEP_MAJOR) {
    var lx = document.createElement('span');
    lx.className = 'grid-label grid-label-x';
    lx.style.left = x + 'px';
    lx.textContent = x;
    labelsX.appendChild(lx);
  }
  for (var y = 0; y <= height; y += STEP_MAJOR) {
    var ly = document.createElement('span');
    ly.className = 'grid-label grid-label-y';
    ly.style.top = y + 'px';
    ly.textContent = y;
    labelsY.appendChild(ly);
  }

  overlay.appendChild(labelsX);
  overlay.appendChild(labelsY);
  canvas.appendChild(overlay);

  var readout = document.createElement('div');
  readout.className = 'grid-readout';
  readout.textContent = 'x: 0, y: 0';
  document.body.appendChild(readout);

  var active = location.search.indexOf('grid') !== -1;

  function render() {
    overlay.style.display = active ? 'block' : 'none';
    readout.style.display = active ? 'block' : 'none';
  }
  render();

  window.addEventListener('keydown', function (e) {
    if (e.key === 'g' || e.key === 'G') {
      active = !active;
      render();
    }
  });

  document.addEventListener('mousemove', function (e) {
    if (!active) return;
    var rect = canvas.getBoundingClientRect();
    var scale = rect.width / canvas.offsetWidth;
    var cx = Math.round((e.clientX - rect.left) / scale);
    var cy = Math.round((e.clientY - rect.top) / scale);
    readout.textContent = 'x: ' + cx + ', y: ' + cy;
  });
})();
