(function () {
  var grid = document.querySelector('[data-photo-shuffle]');
  if (!grid) return;

  var items = Array.prototype.slice.call(grid.children);
  var wanted = parseInt(grid.getAttribute('data-photo-count'), 10) || 6;
  if (items.length <= wanted) return;

  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var swap = list[i];
      list[i] = list[j];
      list[j] = swap;
    }
    return list;
  }

  // Group by artist, then take one photo per artist per pass, so the six
  // photos come from six different artists whenever there are enough to go around.
  var order = shuffle(items.slice());
  var byArtist = {};
  var artists = [];

  order.forEach(function (item) {
    var artist = item.getAttribute('data-artist') || '';
    if (!byArtist[artist]) {
      byArtist[artist] = [];
      artists.push(artist);
    }
    byArtist[artist].push(item);
  });

  var picked = [];
  while (picked.length < wanted) {
    var tookOne = false;
    for (var i = 0; i < artists.length && picked.length < wanted; i++) {
      var pool = byArtist[artists[i]];
      if (pool.length) {
        picked.push(pool.shift());
        tookOne = true;
      }
    }
    if (!tookOne) break;
  }

  items.forEach(function (item) {
    item.hidden = true;
  });
  shuffle(picked).forEach(function (item) {
    item.hidden = false;
    grid.appendChild(item);
  });
})();

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
