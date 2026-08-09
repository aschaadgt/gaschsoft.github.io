(() => {
  document.documentElement.classList.add('js');
  const validCounts = new Set([1, 2, 3, 4, 5, 6]);
  const pathPart = window.location.pathname.replace(/\/$/, '').split('/').pop();
  const queryCount = Number(new URLSearchParams(window.location.search).get('invitados'));
  const guests = validCounts.has(Number(pathPart)) ? Number(pathPart) : (validCounts.has(queryCount) ? queryCount : 1);
  const label = guests === 1 ? 'persona' : 'personas';
  document.getElementById('guestCount').innerHTML = `Esta invitación es válida para<strong>${guests} ${label}</strong>`;
  document.getElementById('envelopeCapacity').textContent = `${guests} ${label}`;

  const screen = document.getElementById('envelopeScreen');
  const invitation = document.getElementById('invitation');
  const open = () => {
    screen.classList.add('open');
    fadeMusicIn();
    window.setTimeout(() => {
      screen.classList.add('dismiss');
      invitation.setAttribute('aria-hidden', 'false');
    }, 2300);
  };
  document.getElementById('openInvitation').addEventListener('click', open, { once: true });

  const revealSections = document.querySelectorAll('.reveal-section');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealSections.forEach((section) => revealObserver.observe(section));

  const countSelect = document.getElementById('attendeeCount');
  for (let count = 1; count <= guests; count += 1) {
    const option = document.createElement('option');
    option.value = count;
    option.textContent = `${count} ${count === 1 ? 'persona' : 'personas'}`;
    countSelect.appendChild(option);
  }

  document.getElementById('rsvpForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const count = Number(countSelect.value);
    const names = document.getElementById('attendeeNames').value.trim();
    const note = document.getElementById('guestMessage').value.trim();
    const personLabel = count === 1 ? 'persona confirma asistencia' : 'personas confirman asistencia';
    const message = [
      '¡Hola! Confirmo asistencia a la boda de Julio y Jackelin.',
      '',
      `${count} ${personLabel}.`,
      `Nombre(s): ${names}`,
      `Invitación válida para: ${guests} ${label}.`,
      ...(note ? ['', `Mensaje: ${note}`] : []),
    ].join('\n');
    window.location.href = `https://wa.me/50244218004?text=${encodeURIComponent(message)}`;
  });

  const musicButton = document.getElementById('musicToggle');
  const backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.volume = 0.42;
  let fadeTimer;
  const showPlaying = () => {
    musicButton.classList.add('is-playing');
    musicButton.setAttribute('aria-label', 'Pausar melodía');
    musicButton.setAttribute('aria-pressed', 'true');
  };
  const showStopped = () => {
    musicButton.classList.remove('is-playing');
    musicButton.setAttribute('aria-label', 'Reproducir melodía');
    musicButton.setAttribute('aria-pressed', 'false');
  };
  const startMelody = () => {
    backgroundMusic.play().catch(() => {
      musicButton.setAttribute('aria-label', 'No se pudo reproducir la melodía');
    });
  };
  const stopMelody = () => {
    window.clearInterval(fadeTimer);
    backgroundMusic.pause();
  };
  const fadeMusicIn = () => {
    if (!backgroundMusic.paused) return;
    const targetVolume = 1;
    const duration = 5000;
    const startVolume = 0.01;
    const startTime = performance.now();
    backgroundMusic.volume = startVolume;
    startMelody();
    window.clearInterval(fadeTimer);
    fadeTimer = window.setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      backgroundMusic.volume = startVolume + ((targetVolume - startVolume) * progress);
      if (progress === 1) window.clearInterval(fadeTimer);
    }, 80);
  };
  backgroundMusic.addEventListener('playing', showPlaying);
  backgroundMusic.addEventListener('pause', showStopped);
  musicButton.addEventListener('click', () => {
    if (!backgroundMusic.paused) stopMelody();
    else startMelody();
  });
})();
