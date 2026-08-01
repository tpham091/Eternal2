(function () {
  var triggers = document.querySelectorAll('[data-lightbox-open]');
  if (!triggers.length) return;

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
  closeButton.textContent = 'x';

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

  triggers.forEach(function (button) {
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
})();
