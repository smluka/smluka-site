// Links tilt slightly on hover, alternating direction each time: first
// hover +2deg, second hover -3deg, third back to +2deg, and so on.
(function () {
  var links = document.querySelectorAll('a');

  links.forEach(function (link) {
    var count = 0;
    var baseTransform = link.style.transform || 'rotate(0deg)';
    var invert = link.classList.contains('tilt-invert');

    function tilt() {
      count++;
      var angle = (count % 2 === 1) ? 2 : -3;
      if (invert) angle = -angle;
      link.style.transform = 'rotate(' + angle + 'deg)';
    }

    function reset() {
      link.style.transform = baseTransform;
    }

    link.addEventListener('mouseenter', tilt);
    link.addEventListener('mouseleave', reset);
    // keyboard users get the same feedback via focus
    link.addEventListener('focus', tilt);
    link.addEventListener('blur', reset);
  });
})();
