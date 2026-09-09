(() => {
  'use strict';
  const config = window.WEDDING_CONFIG;
  const allowedGuestCounts = new Set(Array.from({ length: config.maxGuests }, (_, i) => i + 1));
  const pathSegment = window.location.pathname.replace(/\/$/, '').split('/').pop();
  const requestedGuests = Number(new URLSearchParams(window.location.search).get('invitados'));
  const reservedGuests = allowedGuestCounts.has(Number(pathSegment)) ? Number(pathSegment)
    : allowedGuestCounts.has(requestedGuests) ? requestedGuests : null;
  const guests = reservedGuests ?? config.maxGuests;
  const guestLabel = guests === 1 ? 'persona' : 'personas';
  const $ = (id) => document.getElementById(id);
  const opening = $('opening');
  const music = $('backgroundMusic');
  const musicToggle = $('musicToggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const attendeeCount = $('attendeeCount');

  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  if (reservedGuests) {
    $('openingGuests').textContent = `Una invitación para ${guests} ${guestLabel}`;
    $('guestCount').textContent = `Hemos reservado ${guests === 1 ? 'un lugar' : `${guests} lugares`} para ti${guests === 1 ? '.' : ' y tus acompañantes.'}`;
  }
  attendeeCount.replaceChildren(...Array.from({ length: guests }, (_, i) => {
    const option = document.createElement('option');
    option.value = String(i + 1);
    option.textContent = `${i + 1} ${i === 0 ? 'persona' : 'personas'}`;
    return option;
  }));

  const updateMusic = () => {
    const playing = !music.paused;
    musicToggle.setAttribute('aria-pressed', String(playing));
    musicToggle.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
    musicToggle.classList.toggle('is-playing', playing);
  };
  const playMusic = () => music.play().catch(() => {
    updateMusic();
  });
  music.volume = .48;
  music.addEventListener('playing', updateMusic);
  music.addEventListener('pause', updateMusic);
  music.addEventListener('error', updateMusic);
  musicToggle.addEventListener('click', () => music.paused ? playMusic() : music.pause());

  const openInvitation = () => {
    $('openInvitation').disabled = true;
    opening.classList.add('is-opening');
    playMusic();
    window.setTimeout(() => opening.classList.add('is-card-rising'), reducedMotion ? 0 : 850);
    window.setTimeout(() => {
      document.body.classList.add('is-open');
      for (const id of ['invitation', 'siteHeader', 'musicToggle']) $(id).inert = false;
      opening.classList.add('is-leaving');
      opening.inert = true;
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.setTimeout(() => opening.remove(), reducedMotion ? 0 : 750);
    }, reducedMotion ? 0 : 2400);
  };
  $('openInvitation').addEventListener('click', openInvitation, { once: true });
  $('openInvitation').focus({ preventScroll: true });
  opening.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') { event.preventDefault(); $('openInvitation').focus(); }
  });

  const weddingDate = new Date(config.weddingDate).getTime();
  const renderCountdown = () => {
    const remaining = Math.max(0, weddingDate - Date.now());
    const values = [Math.floor(remaining / 86400000), Math.floor(remaining % 86400000 / 3600000), Math.floor(remaining % 3600000 / 60000), Math.floor(remaining % 60000 / 1000)];
    $('countdown').querySelectorAll('strong').forEach((element, i) => { element.textContent = String(values[i]).padStart(2, '0'); });
    if (!remaining) $('countdownLabel').textContent = '¡Llegó el gran día!';
  };
  renderCountdown();
  window.setInterval(renderCountdown, 1000);

  const track = $('carouselTrack');
  const slideCount = track.children.length;
  const dots = $('carouselDots');
  let currentPhoto = 0;
  let scrollFrame;
  let carouselTimer;
  let carouselVisible = false;
  let carouselTouching = false;
  const dotButtons = Array.from({ length: slideCount }, (_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', `Mostrar foto ${index + 1}`);
    return dot;
  });
  dots.replaceChildren(...dotButtons);
  const updateDots = () => dotButtons.forEach((dot, index) => {
    const active = index === currentPhoto;
    dot.classList.toggle('is-active', active);
    dot.setAttribute('aria-current', active ? 'true' : 'false');
  });
  const stopCarousel = () => {
    if (carouselTimer) window.clearInterval(carouselTimer);
    carouselTimer = null;
  };
  const startCarousel = () => {
    stopCarousel();
    if (reducedMotion || !carouselVisible || carouselTouching || document.hidden) return;
    carouselTimer = window.setInterval(() => showPhoto(currentPhoto + 1), 4000);
  };
  const showPhoto = (index) => {
    currentPhoto = (index + slideCount) % slideCount;
    updateDots();
    track.scrollTo({ left: currentPhoto * track.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' });
  };
  dotButtons.forEach((dot, index) => dot.addEventListener('click', () => {
    showPhoto(index);
    startCarousel();
  }));
  track.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    showPhoto(event.key === 'Home' ? 0 : event.key === 'End' ? slideCount - 1 : currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
    startCarousel();
  });
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      currentPhoto = Math.min(slideCount - 1, Math.max(0, Math.round(track.scrollLeft / Math.max(1, track.clientWidth))));
      updateDots();
    });
  }, { passive: true });
  const holdCarousel = () => {
    carouselTouching = true;
    track.classList.add('is-touching');
    stopCarousel();
  };
  const releaseCarousel = () => {
    carouselTouching = false;
    track.classList.remove('is-touching');
    startCarousel();
  };
  track.addEventListener('pointerdown', holdCarousel);
  track.addEventListener('pointerup', releaseCarousel);
  track.addEventListener('pointercancel', releaseCarousel);
  track.addEventListener('touchstart', holdCarousel, { passive: true });
  track.addEventListener('touchend', releaseCarousel, { passive: true });
  document.addEventListener('visibilitychange', startCarousel);
  new IntersectionObserver(([entry]) => {
    carouselVisible = entry.isIntersecting;
    if (carouselVisible) startCarousel(); else stopCarousel();
  }, { threshold: .35 }).observe(track);
  new ResizeObserver(() => track.scrollTo({ left: currentPhoto * track.clientWidth, behavior: 'instant' })).observe(track);
  updateDots();

  // RSVP submission and the Google Sheets receipt are handled in rsvp.js.
})();
