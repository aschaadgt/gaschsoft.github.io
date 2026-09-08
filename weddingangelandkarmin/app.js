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
  const songToggle = $('songToggle');
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
    for (const button of [musicToggle, songToggle]) {
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
    }
    musicToggle.classList.toggle('is-playing', playing);
    songToggle.querySelector('span').textContent = playing ? 'Ⅱ' : '▶';
    $('songStatus').textContent = playing ? 'Sonando: nuestra canción' : 'Dale play a nuestra historia';
  };
  const playMusic = () => music.play().catch(() => {
    updateMusic();
    $('songStatus').textContent = 'Toca reproducir para escuchar';
  });
  music.volume = .48;
  music.addEventListener('playing', updateMusic);
  music.addEventListener('pause', updateMusic);
  music.addEventListener('error', () => { updateMusic(); $('songStatus').textContent = 'No se pudo cargar la canción. Inténtalo de nuevo.'; });
  for (const button of [musicToggle, songToggle]) {
    button.addEventListener('click', () => music.paused ? playMusic() : music.pause());
  }

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
      $('coupleNames').focus({ preventScroll: true });
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
  let currentPhoto = 0;
  let scrollFrame;
  const showPhoto = (index) => {
    currentPhoto = (index + slideCount) % slideCount;
    track.scrollTo({ left: currentPhoto * track.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' });
  };
  $('previousPhoto').addEventListener('click', () => showPhoto(currentPhoto - 1));
  $('nextPhoto').addEventListener('click', () => showPhoto(currentPhoto + 1));
  track.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    showPhoto(event.key === 'Home' ? 0 : event.key === 'End' ? slideCount - 1 : currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      currentPhoto = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      $('photoCounter').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / 07`;
    });
  }, { passive: true });
  new ResizeObserver(() => track.scrollTo({ left: currentPhoto * track.clientWidth, behavior: 'instant' })).observe(track);

  const namesInput = $('attendeeNames');
  namesInput.addEventListener('input', () => namesInput.setCustomValidity(''));
  $('rsvpForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const count = Number(attendeeCount.value);
    const names = namesInput.value.trim();
    namesInput.setCustomValidity(names ? '' : 'Escribe los nombres de los asistentes.');
    if (!event.currentTarget.reportValidity() || !allowedGuestCounts.has(count) || count > guests) return;
    const note = $('guestMessage').value.trim();
    const message = [
      '¡Hola! Confirmo asistencia a la boda de Ángel y Karmin.',
      'Sábado 7 de noviembre de 2026 · Jardín Tierra Linda.',
      '',
      `${count} ${count === 1 ? 'persona confirma' : 'personas confirman'} asistencia.`,
      `Nombre(s): ${names}`,
      ...(reservedGuests ? [`Invitación válida para: ${guests} ${guestLabel}.`] : []),
      ...(note ? ['', `Mensaje: ${note}`] : []),
    ].join('\n');
    window.location.href = `https://api.whatsapp.com/send?phone=${config.whatsappPhone}&text=${encodeURIComponent(message)}`;
  });
})();
