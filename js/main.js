(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    function closeNav() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeNav();
    });

    // Highlight the current page's nav link.
    var here = window.location.pathname.replace(/index\.html$/, '');
    nav.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === here || (href === '/' && (here === '' || here === '/'))) {
        link.classList.add('active');
      }
    });
  }

  document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
    var lightbox = document.createElement('div');
    var lightboxImage = document.createElement('img');
    var closeButton = document.createElement('button');
    var activeTrigger = null;

    lightbox.className = 'gallery-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    closeButton.className = 'gallery-lightbox-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close expanded image');
    closeButton.textContent = '×';
    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);

    function closeLightbox() {
      lightbox.hidden = true;
      lightboxImage.removeAttribute('src');
      lightboxImage.removeAttribute('alt');
      if (activeTrigger) activeTrigger.focus();
      activeTrigger = null;
    }

    function openLightbox(trigger) {
      var image = trigger.querySelector('img');
      if (!image) return;

      activeTrigger = trigger;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.hidden = false;
      closeButton.focus();
    }

    gallery.querySelectorAll('[data-gallery-open]').forEach(function (button) {
      button.addEventListener('click', function () {
        openLightbox(button);
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (!lightbox.hidden && event.key === 'Escape') closeLightbox();
    });
  });
})();
