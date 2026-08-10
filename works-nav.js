// Shared works list, injected into every #works-nav element found on the
// page. Kept as data + a render function (rather than duplicated markup)
// so the list only needs updating in one place as new works are added.
(function () {
  // Fallback preview shown for any item that doesn't have its own image yet.
  var FALLBACK_IMAGE = 'images/bar cart/bar cart hover-web.jpg';

  // Every item is indented under its category label by default.
  var WORKS = [
    { label: 'works', items: [
        { text: 'limbo lounge', href: 'limbo-lounge.html', image: 'images/limbo lounge/web/a2.jpg' },
        { text: 'just another room', href: 'just-another-room.html', image: 'images/just another room/web/DSCF0262.JPG' },
        { text: 'domestic daydreams', href: 'domestic-daydreams.html', image: 'images/domestic daydreams/web/Image.jpg' },
        { text: 'small scale commons', href: 'small-scale-commons.html', image: 'images/small scale commons/web/DSCF7451.JPG' }
    ]},
    { label: 'exhibitions', items: [
        { text: 'graduation show 2024_kabk', href: 'graduation-show.html', image: 'images/graduation show/web/EDV6245.jpg' },
        { text: 'class of \'24_dutch design week', href: 'dutch-design-week.html', image: 'images/dutch design week/web/DSCF6690.jpeg' }
    ]},
    { label: '"real" stuff', items: [
        { text: 'bar cart', href: 'bar-cart.html', image: 'images/bar cart/web/first photo.jpg' }
    ]},
    { label: 'workshops', items: [
        { text: 'P.I.M.P.S', href: 'pimps.html', image: 'images/PIMPS/web/main.JPG' }
    ]},
    { label: 'collaborations', items: [
        { text: 'am I live: make it fit', href: 'am-i-live-make-it-fit.html', image: 'images/make it fit/W773_3155907-Tingyi-Jiang.jpg' }
    ]},
    { label: 'archive', items: [
        { text: 'a big trashy collection', href: '#' }
    ]},
    { label: 'publications', items: [
        { text: 'domestic daydreams', href: 'domestic-daydreams.html', image: 'images/domestic daydreams/web/Image.jpg' }
    ]}
  ];

  function getPreview() {
    var el = document.getElementById('works-preview');
    if (!el) {
      el = document.createElement('img');
      el.id = 'works-preview';
      el.className = 'works-preview';
      document.body.appendChild(el);
    }
    return el;
  }

  function render(root) {
    var list = document.createElement('div');
    list.className = 'works-list mono-text';

    var siteTitle = document.createElement('div');
    siteTitle.className = 'works-label group-label site-title';
    siteTitle.textContent = 'Luka Smišek';
    list.appendChild(siteTitle);

    WORKS.forEach(function (group) {
      var label = document.createElement('div');
      label.className = 'works-label group-label';
      label.textContent = group.label;
      list.appendChild(label);

      group.items.forEach(function (item) {
        var a = document.createElement('a');
        a.href = item.href;
        a.className = 'works-item group-link';
        a.textContent = item.text;
        var previewImage = item.image || FALLBACK_IMAGE;
        a.addEventListener('mouseenter', function () {
          var preview = getPreview();
          preview.src = previewImage;
          var rect = a.getBoundingClientRect();
          preview.style.left = (rect.right + 16 + 65) + 'px';
          preview.style.top = 'auto';
          preview.style.bottom = (window.innerHeight - rect.bottom - 40) + 'px';
          preview.classList.add('is-visible');
        });
        a.addEventListener('mouseleave', function () {
          getPreview().classList.remove('is-visible');
        });
        list.appendChild(a);
      });
    });

    root.appendChild(list);
  }

  document.querySelectorAll('#works-nav').forEach(render);
})();
