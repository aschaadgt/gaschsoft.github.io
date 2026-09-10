// Behavior checks without opening WhatsApp or sending a confirmation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const configSource = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');
const appSource = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const rsvpSource = fs.readFileSync(path.join(__dirname, 'rsvp.js'), 'utf8');
const stylesSource = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

function setup(pathname, search = '', now = '2026-11-06T22:30:00Z') {
  const elements = new Map();
  function element() {
    return {
      value: '', textContent: '', children: [], events: {}, attributes: {}, dataset: {}, clientWidth: 400, scrollLeft: 0,
      get options() { return this.children; },
      inert: true, paused: true, classList: { add() {}, remove() {}, toggle() {} },
      addEventListener(name, callback) { this.events[name] = callback; },
      setAttribute(name, value) { this.attributes[name] = value; },
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
  get('rsvpForm').elements = { website: { value: '' } };
  const timers = [];
  const intervals = new Map();
  let intervalId = 0;
  const storage = new Map();
  const window = {
    location: { pathname, search, href: '' }, history: {}, matchMedia: () => ({ matches: false }),
    setTimeout: callback => timers.push(callback), clearTimeout() {},
    setInterval: callback => { intervals.set(++intervalId, callback); return intervalId; },
    clearInterval: id => intervals.delete(id), scrollTo() {}
  };
  const document = { getElementById: get, createElement: element, body: element(), hidden: false, addEventListener() {} };
  class FakeDate extends Date { static now() { return new Date(now).getTime(); } }
  const context = vm.createContext({
    window, document, Date: FakeDate, URLSearchParams, AbortController,
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
  return { get, window, timers, intervals };
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
  assert.match(html, />Plateado<\//, `${route} must block plateado`);
  assert.match(html, />Café<\//, `${route} must block café`);
  assert.doesNotMatch(html, />Negro<\/|>Terracota<\//, `${route} blocks a color that should now be available`);
  assert.match(html, /class="kicker location-intro">Nos vemos en<\/p><h2 class="venue">Tierra Linda<\/h2>/, `${route} needs the revised venue hierarchy`);
  assert.match(html, /Adoramos a los más pequeños de nuestras vidas/, `${route} needs the revised adults-only copy`);
  assert.match(html, /Su compañía en el momento de dar el 'sí'/, `${route} needs the revised gift copy`);
  assert.equal((html.match(/class="site-footer"/g) || []).length, 1, `${route} needs one final credit footer`);
  assert.match(html, /© 2026 Diseñado y creado por <a href="https:\/\/gaschsoft\.com\/"[^>]*>GaschSoft<\/a>\. Todos los derechos reservados\./, `${route} needs the linked GaschSoft credit`);
}
assert.match(stylesSource, /--terracotta-soft: #c4937d;/, 'The softened terracotta palette must be defined');
for (const selector of ['date-section', 'moments', 'gift-section']) {
  assert.match(stylesSource, new RegExp(`\\.${selector} \\{[^}]*background: var\\(--terracotta-soft\\);`), `${selector} must use the softened terracotta background`);
}
assert.match(stylesSource, /\.carousel__slide \{[^}]*background: var\(--terracotta-soft\);/, 'Carousel slides must continue the softened terracotta background');
for (let guests = 1; guests <= 5; guests++) {
  const { get, window } = setup(`/weddingkarminandangel/${guests}/`);
  assert.equal(get('attendeeCount').children.length, guests);
  get('attendeeCount').value = String(guests);
  get('attendeeNames').value = '  María & José  ';
  get('guestMessage').value = '¡Nos vemos! ♥';
  await get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: get('rsvpForm') });
  const destination = new URL(window.location.href);
  assert.equal(destination.origin, 'https://api.whatsapp.com');
  assert.equal(destination.searchParams.get('phone'), '50255138916');
  assert.match(destination.searchParams.get('text'), /Nombre\(s\): María & José/);
  assert.match(destination.searchParams.get('text'), /Karmín y Angel/);
  assert.match(destination.searchParams.get('text'), new RegExp(`Cupos de la invitación: ${guests}`));
  window.location.href = '';
  get('attendeeCount').value = String(guests + 1);
  await get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: get('rsvpForm') });
  assert.equal(window.location.href, '', 'Over-limit RSVP must be rejected');
}
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
