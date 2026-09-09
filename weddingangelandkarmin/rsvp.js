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
  const whatsapp = document.getElementById('rsvpWhatsapp');
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
  form.addEventListener('input', () => { if (!busy) { status.textContent = ''; whatsapp.hidden = true; } });

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
      attendance.value === 'yes' ? '¡Hola! Confirmo asistencia a la boda de Ángel y Karmin.' : '¡Hola! No podremos asistir a la boda de Ángel y Karmin.',
      'Sábado 7 de noviembre de 2026 · Jardín Tierra Linda.', '',
      `Personas confirmadas: ${confirmed}.`, `Nombre(s): ${names}`,
      `Cupos de la invitación: ${guestLimit}.`,
      ...(note ? ['', `Mensaje: ${note}`] : [])
    ].join('\n');
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${config.whatsappPhone}&text=${encodeURIComponent(message)}`;
    whatsapp.href = whatsappUrl;

    // Never report a successful Sheets write without a positive server receipt.
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(config.rsvpEndpoint || '')) {
      status.textContent = 'El registro automático aún no está disponible. Puedes enviar tu respuesta por WhatsApp.';
      status.dataset.state = 'error';
      whatsapp.hidden = false;
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
    form.setAttribute('aria-busy', 'true');
    status.dataset.state = 'pending';
    status.textContent = 'Guardando tu respuesta…';
    submit.textContent = 'Guardando…';
    for (const input of [attendance, countInput, namesInput, noteInput]) input.disabled = true;
    whatsapp.hidden = true;
    try {
      const response = await fetch(config.rsvpEndpoint, {
        method: 'POST', body: new URLSearchParams({ ...data, requestId: receipt.requestId }),
        credentials: 'omit', redirect: 'follow', signal: controller.signal
      });
      if (!response.ok) throw new Error('SAVE_FAILED');
      const result = await response.json();
      if (result.ok !== true || result.requestId !== receipt.requestId) throw new Error(result.code || 'SAVE_FAILED');
      status.dataset.state = 'success';
      status.textContent = 'Tu respuesta quedó registrada. Ya puedes enviarla también por WhatsApp.';
      whatsapp.hidden = false;
      // A direct link avoids mobile popup blockers after the asynchronous save.
      whatsapp.focus({ preventScroll: true });
    } catch (_) {
      status.dataset.state = 'error';
      status.textContent = 'No pudimos comprobar que tu respuesta se guardó. Intenta de nuevo o envíala por WhatsApp.';
      whatsapp.hidden = false;
    } finally {
      window.clearTimeout(timeout);
      busy = false;
      submit.disabled = false;
      form.setAttribute('aria-busy', 'false');
      submit.textContent = 'Enviar respuesta';
      for (const input of [attendance, countInput, namesInput, noteInput]) input.disabled = false;
      updateAttendance();
    }
  });
})();
