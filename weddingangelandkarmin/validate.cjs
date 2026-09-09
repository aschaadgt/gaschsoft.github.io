// Behavior checks without opening WhatsApp or sending a confirmation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const configSource = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');
const appSource = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const rsvpSource = fs.readFileSync(path.join(__dirname, 'rsvp.js'), 'utf8');

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
      focus() {}, remove() { this.removed = true; },
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
for (let guests = 1; guests <= 5; guests++) {
  const { get, window } = setup(`/weddingangelandkarmin/${guests}/`);
  assert.equal(get('attendeeCount').children.length, guests);
  get('attendeeCount').value = String(guests);
  get('attendeeNames').value = '  María & José  ';
  get('guestMessage').value = '¡Nos vemos! ♥';
  await get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: get('rsvpForm') });
  const destination = new URL(window.location.href);
  assert.equal(destination.origin, 'https://api.whatsapp.com');
  assert.equal(destination.searchParams.get('phone'), '50251232754');
  assert.match(destination.searchParams.get('text'), /Nombre\(s\): María & José/);
  assert.match(destination.searchParams.get('text'), /Ángel y Karmin/);
  assert.match(destination.searchParams.get('text'), new RegExp(`Cupos de la invitación: ${guests}`));
  window.location.href = '';
  get('attendeeCount').value = String(guests + 1);
  await get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: get('rsvpForm') });
  assert.equal(window.location.href, '', 'Over-limit RSVP must be rejected');
}
const base = setup('/weddingangelandkarmin/');
assert.equal(base.get('attendeeCount').children.length, 5);
assert.equal(setup('/weddingangelandkarmin/', '?invitados=3').get('attendeeCount').children.length, 3);
assert.equal(setup('/weddingangelandkarmin/2/', '?invitados=5').get('attendeeCount').children.length, 2);
for (const invalid of ['0', '6', '-1', '1.5', 'abc']) assert.equal(setup('/weddingangelandkarmin/', `?invitados=${invalid}`).get('attendeeCount').children.length, 5);
base.get('attendeeNames').value = '   ';
await base.get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: base.get('rsvpForm') });
assert.equal(base.window.location.href, '');
assert.ok(base.get('attendeeNames').invalid);
assert.deepEqual(base.get('countdown').querySelectorAll().map(n => n.textContent), ['01', '00', '00', '00']);
const expired = setup('/weddingangelandkarmin/', '', '2026-11-08T00:00:00Z');
assert.deepEqual(expired.get('countdown').querySelectorAll().map(n => n.textContent), ['00', '00', '00', '00']);
assert.equal(expired.get('countdownLabel').textContent, '¡Llegó el gran día!');
base.get('openInvitation').events.click();
while (base.timers.length) base.timers.shift()();
assert.equal(base.get('invitation').inert, false);
assert.equal(base.get('opening').removed, true);
assert.equal(base.get('musicToggle').attributes['aria-pressed'], 'true');
base.get('songToggle').events.click();
assert.equal(base.get('musicToggle').attributes['aria-pressed'], 'false');
const track = base.get('carouselTrack');
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
console.log('PASS: 1–5 guest routes, WhatsApp recipient/encoding, validation, Guatemala countdown, opening, music controls, and automatic touch-paused gallery loop.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
