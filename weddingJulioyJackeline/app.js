(() => {
  const allowedGuestCounts = new Set([1, 2, 3, 4, 5, 6]);
  const pathSegment = window.location.pathname.replace(/\/$/, '').split('/').pop();
  const requestedGuests = Number(new URLSearchParams(window.location.search).get('invitados'));
  const guests = allowedGuestCounts.has(Number(pathSegment)) ? Number(pathSegment) : (allowedGuestCounts.has(requestedGuests) ? requestedGuests : 1);
  const guestLabel = guests === 1 ? 'persona' : 'personas';

  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

  const preloader = document.getElementById('preloader');
  const opening = document.getElementById('opening');
  const invitation = document.getElementById('invitation');
  const openInvitation = document.getElementById('openInvitation');
  const music = document.getElementById('backgroundMusic');
  const musicToggle = document.getElementById('musicToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  const guestCount = document.getElementById('guestCount');
  const openingGuests = document.getElementById('openingGuests');
  const attendeeCount = document.getElementById('attendeeCount');

  let minimumPreloadTimeElapsed = false;
  let audioCanPlay = music.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
  let preloaderFinished = false;

  const finishPreload = () => {
    if (preloaderFinished || !minimumPreloadTimeElapsed || !audioCanPlay) return;
    preloaderFinished = true;
    preloader.classList.add('is-complete');
    window.setTimeout(() => {
      preloader.classList.add('is-ready');
      opening.setAttribute('aria-hidden', 'false');
      openInvitation.disabled = false;
      window.setTimeout(() => preloader.remove(), 500);
    }, 220);
  };

  const markAudioReady = () => {
    audioCanPlay = true;
    finishPreload();
  };

  music.volume = 0.48;
  music.addEventListener('canplay', markAudioReady, { once: true });
  music.addEventListener('error', markAudioReady, { once: true });
  music.load();

  window.setTimeout(() => {
    minimumPreloadTimeElapsed = true;
    finishPreload();
  }, 900);
  window.setTimeout(markAudioReady, 3500);

  openingGuests.textContent = `${guests} ${guestLabel}`;
  guestCount.innerHTML = `Esta invitación es válida para<strong>${guests} ${guestLabel}</strong>`;

  for (let count = 1; count <= guests; count += 1) {
    const option = document.createElement('option');
    option.value = count;
    option.textContent = `${count} ${count === 1 ? 'persona' : 'personas'}`;
    attendeeCount.appendChild(option);
  }

  const updateMusicButton = (playing) => {
    musicToggle.classList.toggle('is-playing', playing);
    musicToggle.setAttribute('aria-pressed', String(playing));
    musicToggle.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
  };

  const playMusic = () => {
    music.play().catch(() => updateMusicButton(false));
  };

  const open = () => {
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    document.getElementById('inicio').scrollIntoView({ behavior: 'auto', block: 'start' });
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#inicio`);
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
    opening.classList.add('is-opening');
    playMusic();
    window.setTimeout(() => opening.classList.add('is-card-rising'), 900);
    window.setTimeout(() => {
      document.body.classList.add('is-open');
      invitation.setAttribute('aria-hidden', 'false');
      opening.classList.add('is-leaving');
    }, 3000);
    window.setTimeout(() => opening.remove(), 3800);
  };

  openInvitation.addEventListener('click', open, { once: true });
  music.addEventListener('playing', () => updateMusicButton(true));
  music.addEventListener('pause', () => updateMusicButton(false));
  musicToggle.addEventListener('click', () => {
    if (music.paused) playMusic();
    else music.pause();
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = mainMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mainMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  const countdown = document.getElementById('countdown');
  const weddingDate = new Date('2026-12-05T15:00:00-06:00').getTime();
  const renderCountdown = () => {
    const remaining = Math.max(0, weddingDate - Date.now());
    const values = [
      Math.floor(remaining / 86400000),
      Math.floor((remaining % 86400000) / 3600000),
      Math.floor((remaining % 3600000) / 60000),
      Math.floor((remaining % 60000) / 1000),
    ];
    countdown.querySelectorAll('strong').forEach((element, index) => {
      element.textContent = String(values[index]).padStart(2, '0');
    });
  };
  renderCountdown();
  window.setInterval(renderCountdown, 1000);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.13 });
  document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));

  document.getElementById('rsvpForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const count = Number(attendeeCount.value);
    const names = document.getElementById('attendeeNames').value.trim();
    const note = document.getElementById('guestMessage').value.trim();
    const message = [
      '¡Hola! Confirmo asistencia a la boda de Julio y Jackeline.',
      '',
      `${count} ${count === 1 ? 'persona confirma' : 'personas confirman'} asistencia.`,
      `Nombre(s): ${names}`,
      `Invitación válida para: ${guests} ${guestLabel}.`,
      ...(note ? ['', `Mensaje: ${note}`] : []),
    ].join('\n');
    window.location.href = `https://wa.me/50244218004?text=${encodeURIComponent(message)}`;
  });
})();
