// Behavior checks without opening WhatsApp or sending a confirmation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const configSource = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');
const appSource = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

function setup(pathname, search = '', now = '2026-11-06T22:30:00Z') {
  const elements = new Map();
  function element() {
    return {
      value: '', textContent: '', children: [], events: {}, attributes: {}, clientWidth: 400, scrollLeft: 0,
      inert: true, paused: true, classList: { add() {}, toggle() {} },
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
  const timers = [];
  const window = { location: { pathname, search, href: '' }, history: {}, matchMedia: () => ({ matches: true }), setTimeout: callback => timers.push(callback), setInterval() {}, scrollTo() {} };
  const document = { getElementById: get, createElement: element, body: element() };
  class FakeDate extends Date { static now() { return new Date(now).getTime(); } }
  const context = vm.createContext({ window, document, Date: FakeDate, URLSearchParams, ResizeObserver: class { observe() {} }, requestAnimationFrame: callback => callback(), cancelAnimationFrame() {} });
  vm.runInContext(configSource, context);
  vm.runInContext(appSource, context);
  return { get, window, timers };
}

for (let guests = 1; guests <= 5; guests++) {
  const { get, window } = setup(`/weddingangelandkarmin/${guests}/`);
  assert.equal(get('attendeeCount').children.length, guests);
  get('attendeeCount').value = String(guests);
  get('attendeeNames').value = '  María & José  ';
  get('guestMessage').value = '¡Nos vemos! ♥';
  get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: get('rsvpForm') });
  const destination = new URL(window.location.href);
  assert.equal(destination.origin, 'https://api.whatsapp.com');
  assert.equal(destination.searchParams.get('phone'), '50255138916');
  assert.match(destination.searchParams.get('text'), /Nombre\(s\): María & José/);
  assert.match(destination.searchParams.get('text'), /Ángel y Karmin/);
  assert.match(destination.searchParams.get('text'), new RegExp(`Invitación válida para: ${guests}`));
  window.location.href = '';
  get('attendeeCount').value = String(guests + 1);
  get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: get('rsvpForm') });
  assert.equal(window.location.href, '', 'Over-limit RSVP must be rejected');
}
const base = setup('/weddingangelandkarmin/');
assert.equal(base.get('attendeeCount').children.length, 5);
assert.equal(setup('/weddingangelandkarmin/', '?invitados=3').get('attendeeCount').children.length, 3);
assert.equal(setup('/weddingangelandkarmin/2/', '?invitados=5').get('attendeeCount').children.length, 2);
for (const invalid of ['0', '6', '-1', '1.5', 'abc']) assert.equal(setup('/weddingangelandkarmin/', `?invitados=${invalid}`).get('attendeeCount').children.length, 5);
base.get('attendeeNames').value = '   ';
base.get('rsvpForm').events.submit({ preventDefault() {}, currentTarget: base.get('rsvpForm') });
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
base.get('previousPhoto').events.click();
assert.equal(base.get('photoCounter').textContent, '07 / 07');
base.get('nextPhoto').events.click();
assert.equal(base.get('photoCounter').textContent, '01 / 07');
base.get('carouselTrack').events.keydown({ key: 'ArrowRight', preventDefault() {} });
assert.equal(base.get('photoCounter').textContent, '02 / 07');
console.log('PASS: 1–5 guest routes, query limits, WhatsApp recipient/encoding, validation, Guatemala countdown, opening, music controls, gallery navigation.');
