(function () {
  var root = document.getElementById('hero-slideshow');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
  var current = 0;
  var INTERVAL = 3000;
  var timer = null;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === current);
    });
  }

  function startAuto() {
    stopAuto();
    timer = window.setInterval(function () {
      show(current + 1);
    }, INTERVAL);
  }

  function stopAuto() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  root.querySelectorAll('.slide-zone').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dir = parseInt(btn.getAttribute('data-dir'), 10);
      show(current + dir);
      startAuto(); // manual click resets the 3s timer rather than stacking with it
    });
  });

  // pause on hover/focus so visitors can look without it jumping mid-view
  root.addEventListener('mouseenter', stopAuto);
  root.addEventListener('mouseleave', startAuto);
  root.addEventListener('focusin', stopAuto);
  root.addEventListener('focusout', startAuto);

  show(0);
  startAuto();
})();
