// Behavior checks without opening WhatsApp or sending a confirmation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const configSource = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');
const appSource = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const rsvpSource = fs.readFileSync(path.join(__dirname, 'rsvp.js'), 'utf8');
const rsvpStylesSource = fs.readFileSync(path.join(__dirname, 'rsvp.css'), 'utf8');
const stylesSource = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const indexSource = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

function setup(pathname, search = '', now = '2026-11-06T22:30:00Z', userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)') {
  const elements = new Map();
  function element() {
    const classes = new Set();
    return {
      value: '', textContent: '', children: [], events: {}, attributes: {}, dataset: {}, clientWidth: 400, scrollLeft: 0,
      get options() { return this.children; },
      inert: true, paused: true, currentTime: 0, volume: 1,
      classList: {
        add(...names) { for (const name of names) classes.add(name); },
        remove(...names) { for (const name of names) classes.delete(name); },
        toggle(name, force) { const active = force === undefined ? !classes.has(name) : force; active ? classes.add(name) : classes.delete(name); return active; },
        contains(name) { return classes.has(name); }
      },
      addEventListener(name, callback) { this.events[name] = callback; },
      setAttribute(name, value) { this.attributes[name] = value; },
      reset() { this.resetCalled = true; },
      replaceChildren(...children) { this.children = children; this.value = children[0]?.value; },
      setCustomValidity(value) { this.invalid = value; },
      focus() { this.focused = true; }, remove() { this.removed = true; },
      play() { this.paused = false; this.events.playing?.(); return Promise.resolve(); },
      pause() { this.paused = true; this.events.pause?.(); },
      scrollTo({ left }) { this.scrollLeft = left; this.events.scroll?.(); },
      querySelector() { return this.span ??= element(); },
      querySelectorAll() { return this.numbers ??= Array.from({ length: 4 }, element); },
      reportValidity() { return !get('attendeeNames').invalid; },
    };
  }
  function get(id) { if (!elements.has(id)) elements.set(id, element()); return elements.get(id); }
  get('carouselTrack').children = Array.from({ length: 7 }, element);
  get('attendance').value = 'yes';
  get('confirmationRecipient').value = 'karmin';
  get('rsvpForm').elements = { website: { value: '' } };
  const timers = [];
  const intervals = new Map();
  let intervalId = 0;
  const storage = new Map();
  const openedTabs = [];
  const window = {
    location: { pathname, search, href: '' }, history: {}, matchMedia: () => ({ matches: false }),
    open(url, target) {
      const popup = { opener: window, closed: false, location: { href: url }, document: { title: '', body: { innerHTML: '' } }, target };
      openedTabs.push(popup);
      return popup;
    },
    setTimeout: callback => timers.push(callback), clearTimeout() {},
    setInterval: callback => { intervals.set(++intervalId, callback); return intervalId; },
    clearInterval: id => intervals.delete(id), scrollTo() {}
  };
  const document = { getElementById: get, createElement: element, body: element(), hidden: false, addEventListener() {} };
  class FakeDate extends Date { static now() { return new Date(now).getTime(); } }
  const context = vm.createContext({
    window, document, navigator: { userAgent }, Date: FakeDate, URLSearchParams, AbortController,
    crypto: { randomUUID },
    sessionStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
    fetch: async (_url, options) => {
      const requestId = new URLSearchParams(options.body).get('requestId');
      return { ok: true, json: async () => ({ ok: true, requestId }) };
    },
    ResizeObserver: class { observe() {} },
    IntersectionObserver: class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } },
    requestAnimationFrame: callback => callback(), cancelAnimationFrame() {}
  });
  vm.runInContext(configSource, context);
  vm.runInContext(appSource, context);
  vm.runInContext(rsvpSource, context);
  return { get, window, timers, intervals, openedTabs };
}

async function run() {
for (const route of ['index.html', '1/index.html', '2/index.html', '3/index.html', '4/index.html', '5/index.html']) {
  const html = fs.readFileSync(path.join(__dirname, route), 'utf8');
  assert.equal((html.match(/id="carouselDots"/g) || []).length, 1, `${route} needs one carousel indicator row`);
  assert.doesNotMatch(html, />Nuestra canción</, `${route} still shows the removed song title`);
  assert.doesNotMatch(html, /id="songStatus"/, `${route} still contains the removed song status`);
  assert.doesNotMatch(html, /id="songToggle"/, `${route} still contains the removed inline music control`);
  assert.equal((html.match(/music-control__note"/g) || []).length, 3, `${route} needs three animated music notes`);
  assert.match(html, /assets\/apple-calendar\.webp/, `${route} needs the iOS calendar logo`);
  assert.match(html, /assets\/google-calendar\.png/, `${route} needs the Android calendar logo`);
  assert.match(html, /calendar\.google\.com\/calendar\/render/, `${route} needs the Google Calendar action`);
  assert.match(html, /Karmín <span>&amp;<\/span> Angel/, `${route} must show Karmín before Angel`);
  assert.doesNotMatch(html, /Ángel|>Karmin</, `${route} contains an obsolete name spelling`);
  assert.match(html, /social-preview-karmin-angel-v2\.jpg/, `${route} must use the exact-layout social preview URL`);
  assert.doesNotMatch(html, /weddingangelandkarmin/, `${route} still references the previous public route`);
  assert.doesNotMatch(html, /Reserva este día|Noviembre · 2026/, `${route} contains removed date copy`);
  assert.doesNotMatch(html, /schedule__number/, `${route} still shows schedule numbering`);
  assert.match(html, /En nuestro gran día, todos los colores están invitados\.\.\. excepto el blanco y los tonos parecidos, que pertenecen exclusivamente a la novia\./, `${route} needs the revised dress-code guidance`);
  assert.equal((html.match(/class="swatch--reserved"/g) || []).length, 1, `${route} must show one reserved white swatch`);
  assert.match(html, /Blanco y tonos similares<\/strong><small>Reservados para la novia/, `${route} must clearly reserve white for the bride`);
  assert.doesNotMatch(html, />Rojo<\/|>Beige<\/|>Crema<\/|>Plateado<\/|>Café<\/|>Negro<\/|>Terracota<\//, `${route} still blocks colors other than white`);
  assert.equal((html.match(/class="whatsapp-typing"/g) || []).length, 1, `${route} needs one WhatsApp typing indicator`);
  assert.match(html, /<label for="confirmationRecipient">¿A quién deseas confirmar\?<\/label><select id="confirmationRecipient"[^>]*required>[\s\S]*<option value="karmin">Karmín<\/option><option value="angel">Angel<\/option><\/select>[\s\S]*id="rsvpSubmit"/, `${route} needs the recipient selector immediately before the confirmation button`);
  assert.match(html, /Puedes subir aquí tus fotografías durante y después de la boda\./, `${route} must explain when guests can upload photos`);
  assert.match(html, /https:\/\/photos\.app\.goo\.gl\/vASwgueT3ygmjexQA/, `${route} must use the client's Google Photos album`);
  assert.doesNotMatch(html, /StUzRjaKuormLkBZ7/, `${route} still references the previous Google Photos album`);
  assert.match(html, /class="kicker location-intro">Nos vemos en<\/p><h2 class="venue">Tierra Linda<\/h2>/, `${route} needs the revised venue hierarchy`);
  assert.match(html, /Adoramos a los más pequeños de nuestras vidas/, `${route} needs the revised adults-only copy`);
  assert.match(html, /Su compañía en el momento de dar el 'sí'/, `${route} needs the revised gift copy`);
  assert.match(html, /love-note__quote--open">“<\/span>De tu mano,<br \/><em>todos los caminos son hogar\.<span class="love-note__quote love-note__quote--close">”<\/span><\/em>/, `${route} needs the two-color quotation marks`);
  assert.equal((html.match(/class="site-footer"/g) || []).length, 1, `${route} needs one final credit footer`);
  assert.match(html, /© 2026 Diseñado y creado por <a href="https:\/\/gaschsoft\.com\/"[^>]*>GaschSoft<\/a>\. Todos los derechos reservados\./, `${route} needs the linked GaschSoft credit`);
}
for (const selector of ['date-section', 'moments', 'gift-section']) {
  assert.match(stylesSource, new RegExp(`\\.${selector} \\{[^}]*background: var\\(--terracotta\\);`), `${selector} must use the original terracotta background`);
}
assert.doesNotMatch(stylesSource, /terracotta-soft/, 'The softened terracotta must no longer be used');
assert.match(stylesSource, /--terracotta-deep: #744638;/, 'The darker photo-stage terracotta must be defined');
assert.match(stylesSource, /\.carousel__slide \{[^}]*background: var\(--terracotta-deep\);/, 'Vertical carousel photos must show the darker terracotta at their sides');
assert.match(stylesSource, /\.love-note__quote--close \{[^}]*margin-left: -\.16em;/, 'The closing quote must sit directly after the period');
assert.match(stylesSource, /\.music-control \{[^}]*background: var\(--terracotta\);/, 'The music control must use the original terracotta');
assert.match(stylesSource, /\.button--forest \{[^}]*background: var\(--terracotta\);/, 'The WhatsApp button must use the original terracotta');
assert.match(stylesSource, /\.closing::after \{[^}]*linear-gradient\(#995c4610 20%, #995c46d0 95%\)/, 'The closing photo must use the terracotta gradient');
assert.match(stylesSource, /\.swatch--reserved > span::after \{[^}]*rotate\(-45deg\)/, 'The white swatch must have a visible prohibition slash');
assert.match(stylesSource, /\.photo-moment::after \{[^}]*linear-gradient\(transparent 30%, #995c46b3\)/, 'The photo moment must use a terracotta gradient');
assert.match(stylesSource, /\.album-section \{[^}]*background: var\(--terracotta\);/, 'The shared memories section must use the original terracotta');
assert.match(stylesSource, /--paper: #f8f3ea;/, 'The paper tone must be shifted seven percent toward beige');
assert.doesNotMatch(stylesSource, /#faf6ef|#fffdf8|#fffaf5(?:4d)?/, 'Old cooler paper backgrounds must no longer be used');
assert.doesNotMatch(rsvpSource, /whatsapp-popup|prepareWhatsAppTarget/, 'Typing feedback must remain inside the confirmation button');
assert.match(rsvpSource, /Hemos registrado tu respuesta\./, 'A successful RSVP must show the final confirmation message');
assert.match(rsvpStylesSource, /\.rsvp-status \{[^}]*text-align: center;/, 'RSVP feedback must remain centered');
assert.match(rsvpStylesSource, /\.rsvp-status\[data-state="success"\][^}]*background: #995c4610;/, 'The confirmation message must use a subtle on-palette treatment');
assert.doesNotMatch(indexSource, /Al confirmar, guardaremos tu respuesta/, 'The old explanatory RSVP note must be removed');
assert.match(configSource, /karmin: '50248373171'/, 'Karmín must receive confirmations at her configured number');
assert.match(configSource, /angel: '50255138916'/, 'Angel must receive confirmations at his configured number');
for (let guests = 1; guests <= 5; guests++) {
  const { get, window, openedTabs } = setup(`/weddingkarminandangel/${guests}/`);
  const recipient = guests % 2 === 0 ? 'angel' : 'karmin';
  get('confirmationRecipient').value = recipient;
  assert.equal(get('attendeeCount').children.length, guests);
  get('attendeeCount').value = String(guests);
  get('attendeeNames').value = '  María & José  ';
  get('guestMessage').value = '¡Nos vemos! ♥';
  await get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: get('rsvpForm') });
  assert.equal(window.location.href, '', 'Desktop must keep the invitation open');
  assert.equal(openedTabs.length, 1, 'Desktop must open one WhatsApp tab');
  assert.equal(openedTabs[0].target, '_blank');
  assert.equal(openedTabs[0].opener, null, 'Desktop WhatsApp tab must not retain an opener');
  assert.equal(openedTabs[0].document.body.innerHTML, '', 'Desktop must open WhatsApp directly without an intermediate loading page');
  const destination = new URL(openedTabs[0].location.href);
  assert.equal(destination.origin, 'https://api.whatsapp.com');
  assert.equal(destination.searchParams.get('phone'), recipient === 'karmin' ? '50248373171' : '50255138916');
  assert.equal(get('rsvpStatus').textContent, 'Hemos registrado tu respuesta.');
  assert.equal(get('rsvpForm').resetCalled, true, 'A successful RSVP must reset the form');
  assert.equal(get('rsvpForm').classList.contains('is-complete'), false, 'A successful RSVP must keep the form layout unchanged');
  assert.equal(get('rsvpSubmit').disabled, false, 'The confirmation button must return to its original visual state');
  assert.equal(get('rsvpSubmit').querySelector().textContent, 'Confirmar por WhatsApp');
  assert.match(destination.searchParams.get('text'), /Nombre\(s\): María & José/);
  assert.match(destination.searchParams.get('text'), /Karmín y Angel/);
  assert.match(destination.searchParams.get('text'), new RegExp(`Cupos de la invitación: ${guests}`));
  openedTabs[0].location.href = '';
  get('attendeeCount').value = String(guests + 1);
  await get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: get('rsvpForm') });
  assert.equal(openedTabs.length, 1, 'Over-limit RSVP must not open another tab');
  assert.equal(openedTabs[0].location.href, '', 'Over-limit RSVP must be rejected');
}
const mobile = setup('/weddingkarminandangel/1/', '', '2026-11-06T22:30:00Z', 'Mozilla/5.0 (Linux; Android 15; Mobile)');
mobile.get('attendeeNames').value = 'Invitado móvil';
mobile.get('confirmationRecipient').value = 'angel';
await mobile.get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: mobile.get('rsvpForm') });
assert.equal(mobile.openedTabs.length, 0, 'Mobile must not open a browser tab');
assert.equal(new URL(mobile.window.location.href).origin, 'https://api.whatsapp.com', 'Mobile must launch WhatsApp in the current context');
assert.equal(new URL(mobile.window.location.href).searchParams.get('phone'), '50255138916', 'Mobile must use the selected recipient number');
const base = setup('/weddingkarminandangel/');
assert.equal(base.get('attendeeCount').children.length, 5);
assert.equal(setup('/weddingkarminandangel/1/').get('openingGuests').textContent, 'Invitación para 1 persona');
assert.equal(setup('/weddingkarminandangel/', '?invitados=3').get('attendeeCount').children.length, 3);
assert.equal(setup('/weddingkarminandangel/2/', '?invitados=5').get('attendeeCount').children.length, 2);
for (const invalid of ['0', '6', '-1', '1.5', 'abc']) assert.equal(setup('/weddingkarminandangel/', `?invitados=${invalid}`).get('attendeeCount').children.length, 5);
base.get('attendeeNames').value = '   ';
await base.get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: base.get('rsvpForm') });
assert.equal(base.window.location.href, '');
assert.ok(base.get('attendeeNames').invalid);
assert.deepEqual(base.get('countdown').querySelectorAll().map(n => n.textContent), ['01', '00', '00', '00']);
const expired = setup('/weddingkarminandangel/', '', '2026-11-08T00:00:00Z');
assert.deepEqual(expired.get('countdown').querySelectorAll().map(n => n.textContent), ['00', '00', '00', '00']);
assert.equal(expired.get('countdownLabel').textContent, '¡Llegó el gran día!');
base.get('openInvitation').events.click();
while (base.timers.length) base.timers.shift()();
assert.equal(base.get('invitation').inert, false);
assert.equal(base.get('opening').removed, true);
assert.equal(Boolean(base.get('coupleNames').focused), false, 'The hero title should not receive a visible focus rectangle');
assert.equal(base.get('musicToggle').attributes['aria-pressed'], 'true');
assert.equal(base.get('backgroundMusic').volume, .7, 'Music must start at 70% internal volume');
base.get('backgroundMusic').currentTime = 5;
base.get('backgroundMusic').events.timeupdate();
assert.ok(Math.abs(base.get('backgroundMusic').volume - .85) < Number.EPSILON, 'Music must reach 85% after five seconds');
base.get('backgroundMusic').currentTime = 10;
base.get('backgroundMusic').events.timeupdate();
assert.equal(base.get('backgroundMusic').volume, 1, 'Music must reach 100% after ten seconds');
base.get('backgroundMusic').currentTime = 0;
base.get('backgroundMusic').events.timeupdate();
assert.equal(base.get('backgroundMusic').volume, 1, 'The volume fade must run only once');
base.get('musicToggle').events.click();
assert.equal(base.get('musicToggle').attributes['aria-pressed'], 'false');
const track = base.get('carouselTrack');
assert.equal(base.get('carouselDots').children.length, 7, 'Carousel should expose one indicator for each photo');
assert.equal(base.intervals.size, 2, 'Countdown and visible carousel should be running');
let carouselTick = [...base.intervals.values()][1];
carouselTick();
assert.equal(track.scrollLeft, 400, 'Carousel should advance automatically');
track.events.pointerdown();
assert.equal(base.intervals.size, 1, 'Touching the carousel should pause it');
track.events.pointerup();
assert.equal(base.intervals.size, 2, 'Carousel should resume after touch');
carouselTick = [...base.intervals.values()][1];
for (let i = 0; i < 6; i++) carouselTick();
assert.equal(track.scrollLeft, 0, 'Carousel should loop from the last photo to the first');
track.events.keydown({ key: 'ArrowRight', preventDefault() {} });
assert.equal(track.scrollLeft, 400, 'Keyboard navigation should remain available');
console.log('PASS: 1–5 guest routes, WhatsApp recipient/encoding, validation, opening without title focus box, music controls, and automatic gallery with synchronized indicators.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
