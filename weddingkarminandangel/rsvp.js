(() => {
  'use strict';
  const config = window.WEDDING_CONFIG;
  const form = document.getElementById('rsvpForm');
  const attendance = document.getElementById('attendance');
  const countInput = document.getElementById('attendeeCount');
  const namesInput = document.getElementById('attendeeNames');
  const noteInput = document.getElementById('guestMessage');
  const status = document.getElementById('rsvpStatus');
  const submit = document.getElementById('rsvpSubmit');
  const submitLabel = submit.querySelector('.rsvp-submit-label');
  const guestLimit = countInput.options.length;
  let busy = false;
  let receipt = null;
  try { receipt = JSON.parse(sessionStorage.getItem('angel-karmin-rsvp') || 'null'); } catch (_) {}

  const updateAttendance = () => {
    const declined = attendance.value === 'no';
    countInput.hidden = declined;
    countInput.disabled = declined;
    countInput.required = !declined;
    document.getElementById('attendeeCountLabel').hidden = declined;
    document.getElementById('attendeeNamesLabel').textContent = declined ? 'Tu nombre o el de tu familia' : 'Nombres de los asistentes';
    namesInput.placeholder = declined ? 'Escribe tu nombre o el de tu familia' : 'Escribe los nombres completos';
  };
  attendance.addEventListener('change', updateAttendance);
  updateAttendance();
  namesInput.addEventListener('input', () => namesInput.setCustomValidity(''));
  form.addEventListener('input', () => { if (!busy) status.textContent = ''; });

  const isMobileDevice = () => {
    const userAgent = window.navigator?.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(userAgent);
  };

  const prepareWhatsAppTarget = () => {
    if (isMobileDevice()) return null;
    const target = typeof window.open === 'function' ? window.open('', '_blank') : null;
    if (!target) return null;
    target.opener = null;
    target.document.title = 'Abriendo WhatsApp';
    target.document.body.innerHTML = '<style>body{margin:0;background:#faf6ef;color:#393c31;font-family:system-ui,sans-serif}.whatsapp-popup{min-height:100vh;display:grid;place-content:center;justify-items:center;gap:1rem;text-align:center}.whatsapp-popup__typing{position:relative;display:flex;align-items:center;gap:7px;padding:15px 18px;border-radius:18px 18px 18px 7px;background:#995c46;box-shadow:0 10px 30px #74463829}.whatsapp-popup__typing:after{content:"";position:absolute;left:-8px;bottom:4px;width:14px;height:14px;background:#995c46;clip-path:polygon(100% 0,100% 100%,0 100%)}.whatsapp-popup__typing span{width:8px;height:8px;border-radius:50%;background:#f6e4db;animation:wa-dot 1.15s ease-in-out infinite}.whatsapp-popup__typing span:nth-child(2){animation-delay:.16s}.whatsapp-popup__typing span:nth-child(3){animation-delay:.32s}.whatsapp-popup p{margin:0;font-size:15px}@keyframes wa-dot{0%,60%,100%{opacity:.45;transform:translateY(0)}30%{opacity:1;transform:translateY(-5px)}}@media(prefers-reduced-motion:reduce){.whatsapp-popup__typing span{animation:none;opacity:.82}}</style><main class="whatsapp-popup"><div class="whatsapp-popup__typing" aria-hidden="true"><span></span><span></span><span></span></div><p>Preparando tu confirmación para WhatsApp</p></main>';
    return target;
  };

  const openWhatsApp = (url, desktopTarget) => {
    if (isMobileDevice()) {
      window.location.href = url;
      return true;
    }
    if (!desktopTarget || desktopTarget.closed) return false;
    desktopTarget.location.href = url;
    return true;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    const names = namesInput.value.trim();
    namesInput.setCustomValidity(names ? '' : 'Escribe tu nombre o los nombres de los asistentes.');
    if (!form.reportValidity()) return;
    const confirmed = attendance.value === 'no' ? 0 : Number(countInput.value);
    if (!['yes', 'no'].includes(attendance.value) || !Number.isInteger(confirmed) || confirmed < (attendance.value === 'yes' ? 1 : 0) || confirmed > guestLimit) return;
    const note = noteInput.value.trim();
    const message = [
      attendance.value === 'yes' ? '¡Hola! Confirmo asistencia a la boda de Karmín y Angel.' : '¡Hola! No podremos asistir a la boda de Karmín y Angel.',
      'Sábado 7 de noviembre de 2026 · Jardín Tierra Linda.', '',
      `Personas confirmadas: ${confirmed}.`, `Nombre(s): ${names}`,
      `Cupos de la invitación: ${guestLimit}.`,
      ...(note ? ['', `Mensaje: ${note}`] : [])
    ].join('\n');
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${config.whatsappPhone}&text=${encodeURIComponent(message)}`;
    const whatsappTarget = prepareWhatsAppTarget();

    // Never report a successful Sheets write without a positive server receipt.
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(config.rsvpEndpoint || '')) {
      status.textContent = 'El registro automático no está disponible. Abriendo WhatsApp para confirmar directamente.';
      status.dataset.state = 'error';
      if (!openWhatsApp(whatsappUrl, whatsappTarget)) status.textContent = 'No se pudo abrir WhatsApp. Habilita las ventanas emergentes e inténtalo de nuevo.';
      return;
    }
    const data = { event: 'weddingangelandkarmin', names, guests: String(guestLimit), confirmed: String(confirmed), attendance: attendance.value, message: note, website: form.elements.website.value };
    const signature = JSON.stringify(data);
    // Reuse the receipt for a retry, including after reloading the current tab.
    if (!receipt || receipt.signature !== signature || typeof receipt.requestId !== 'string') {
      receipt = { signature, requestId: crypto.randomUUID() };
      try { sessionStorage.setItem('angel-karmin-rsvp', JSON.stringify(receipt)); } catch (_) {}
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    busy = true;
    submit.disabled = true;
    submit.classList.add('is-loading');
    submit.setAttribute('aria-label', 'Guardando respuesta');
    form.setAttribute('aria-busy', 'true');
    status.dataset.state = 'pending';
    status.textContent = 'Guardando tu respuesta antes de abrir WhatsApp.';
    submitLabel.textContent = 'Guardando respuesta';
    for (const input of [attendance, countInput, namesInput, noteInput]) input.disabled = true;
    try {
      const response = await fetch(config.rsvpEndpoint, {
        method: 'POST', body: new URLSearchParams({ ...data, requestId: receipt.requestId }),
        credentials: 'omit', redirect: 'follow', signal: controller.signal
      });
      if (!response.ok) throw new Error('SAVE_FAILED');
      const result = await response.json();
      if (result.ok !== true || result.requestId !== receipt.requestId) throw new Error(result.code || 'SAVE_FAILED');
      status.dataset.state = 'success';
      status.textContent = 'Respuesta registrada. Abriendo WhatsApp.';
      if (!openWhatsApp(whatsappUrl, whatsappTarget)) {
        status.dataset.state = 'error';
        status.textContent = 'Respuesta registrada, pero no se pudo abrir WhatsApp. Habilita las ventanas emergentes e inténtalo de nuevo.';
      }
    } catch (_) {
      status.dataset.state = 'error';
      status.textContent = 'No pudimos guardar la respuesta. Abriendo WhatsApp para confirmar directamente.';
      if (!openWhatsApp(whatsappUrl, whatsappTarget)) status.textContent = 'No se pudo abrir WhatsApp. Habilita las ventanas emergentes e inténtalo de nuevo.';
    } finally {
      window.clearTimeout(timeout);
      busy = false;
      submit.disabled = false;
      submit.classList.remove('is-loading');
      submit.setAttribute('aria-label', 'Confirmar por WhatsApp');
      form.setAttribute('aria-busy', 'false');
      submitLabel.textContent = 'Confirmar por WhatsApp';
      for (const input of [attendance, countInput, namesInput, noteInput]) input.disabled = false;
      updateAttendance();
    }
  });
})();
