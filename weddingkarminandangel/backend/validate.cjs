// No live requests or real guest data: Apps Script and the network are simulated.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { randomUUID } = require('node:crypto');
const headers = ['Nombres de los invitados', 'Cupos de la invitación', 'Personas confirmadas', 'Estado', 'Mensaje'];
const values = [headers];
const notes = new Map();
let canLock = true;
let locked = false;
let failNextWrite = false;
let maxRows = 20;
const sheet = {
  getLastRow: () => values.length,
  getMaxRows: () => maxRows,
  insertRowsAfter: (_, count) => { maxRows += count; },
  getRange(row, column, rows = 1, columns = 1) {
    const read = () => Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) => values[row - 1 + r]?.[column - 1 + c] ?? ''));
    return {
      getDisplayValues: read, getValues: read,
      getNotes: () => Array.from({ length: rows }, (_, i) => [notes.get(row + i) || '']),
      setNote: value => { notes.set(row, value); },
      setValues(data) {
        if (failNextWrite) { failNextWrite = false; throw new Error('Temporary write failure'); }
        for (let r = 0; r < rows; r++) {
          values[row - 1 + r] ??= [];
          for (let c = 0; c < columns; c++) {
            const value = data[r][c];
            values[row - 1 + r][column - 1 + c] = typeof value === 'string' && value.startsWith("'") ? value.slice(1) : value;
          }
        }
      }
    };
  }
};
const server = vm.createContext({
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
  SpreadsheetApp: { openById(id) { assert.equal(id, '1ogqNS8Zvr41IcYi4Rwm2t_s1MlrmgO_rZFcVCFc8-YM'); return { getSheets: () => [sheet] }; }, flush() {} },
  LockService: { getScriptLock: () => ({ tryLock: () => (locked = canLock), hasLock: () => locked, releaseLock: () => { locked = false; } }) }
});
vm.runInContext(fs.readFileSync(path.join(__dirname, 'Code.gs'), 'utf8'), server);
const valid = (override = {}) => ({ event: 'weddingangelandkarmin', requestId: randomUUID(), names: 'María & José', guests: '5', confirmed: '2', attendance: 'yes', message: '¡Nos vemos! ♥', website: '', ...override });
const post = data => server.doPost({ postData: { length: 500 }, parameter: data });
assert.equal(server.doGet().service, 'weddingangelandkarmin-rsvp');
assert.equal(Object.hasOwn(server.doGet(), 'guests'), false);
const first = valid();
assert.equal(post(first).ok, true);
assert.deepEqual(values[1], ['María & José', 5, 2, 'Confirmado', '¡Nos vemos! ♥']);
assert.equal(post(first).duplicate, true);
assert.equal(values.length, 2, 'Retry must not add a second row');
assert.equal(post({ ...first, confirmed: '3' }).code, 'CONFLICT');
assert.equal(post(valid({ attendance: 'no', confirmed: '0' })).ok, true);
assert.equal(values[2][3], 'No asistirá');
for (const override of [{ guests: '6' }, { confirmed: '6' }, { guests: '1', confirmed: '2' }, { confirmed: '0' }, { attendance: 'no', confirmed: '1' }, { names: ' ' }, { attendance: 'pending' }, { website: 'spam' }, { names: 'x'.repeat(401) }, { message: 'x'.repeat(1001) }, { requestId: 'invalid' }, { event: 'another-wedding' }]) {
  const before = values.length;
  assert.equal(post(valid(override)).code, 'INVALID');
  assert.equal(values.length, before);
}
const literal = valid({ names: '=IMPORTXML("https://example.invalid","//p")', message: '+SUM(1,2)' });
assert.equal(post(literal).ok, true);
assert.equal(values.at(-1)[0], literal.names);
assert.equal(post(literal).duplicate, true);
assert.ok(server.textCell_(literal.names).startsWith("'="));
canLock = false;
assert.equal(post(valid()).code, 'BUSY');
canLock = true;
headers[0] = 'Changed header';
assert.equal(post(valid()).code, 'SHEET_SETUP');
headers[0] = 'Nombres de los invitados';
// Recover a write interrupted after its row reservation, without creating a duplicate.
const interrupted = valid();
failNextWrite = true;
assert.equal(post(interrupted).code, 'SAVE_FAILED');
const other = valid({ names: 'Otra familia' });
assert.equal(post(other).ok, true);
assert.equal(post(interrupted).ok, true);
assert.equal(post(interrupted).duplicate, true);
assert.equal(locked, false);

async function frontendChecks() {
  const elements = new Map();
  const get = id => {
    if (!elements.has(id)) elements.set(id, {
      value: '', dataset: {}, events: {}, disabled: false, hidden: false, options: Array(5),
      addEventListener(name, cb) { this.events[name] = cb; }, setCustomValidity(message) { this.invalid = message; },
      reportValidity() { return !get('attendeeNames').invalid; }, setAttribute() {}, focus() {},
      querySelector() { return this.label ??= { textContent: '' }; }
    });
    return elements.get(id);
  };
  get('rsvpForm').elements = { website: { value: '' } };
  get('attendance').value = 'yes';
  get('attendeeCount').value = '3';
  get('attendeeNames').value = 'Familia de prueba';
  get('guestMessage').value = 'Mensaje de prueba';
  const requests = [];
  const endpoint = 'https://script.google.com/macros/s/TEST_DEPLOYMENT/exec';
  const storage = new Map();
  let networkMode = 'success';
  let fetchResolve;
  const browserWindow = { WEDDING_CONFIG: { whatsappPhone: '50255138916', rsvpEndpoint: endpoint }, location: { href: '' }, setTimeout, clearTimeout };
  const context = vm.createContext({
    document: { getElementById: get },
    window: browserWindow,
    sessionStorage: { getItem: k => storage.get(k) || null, setItem: (k, v) => storage.set(k, v) },
    crypto: { randomUUID }, AbortController, URLSearchParams,
    fetch: async (url, options) => {
      assert.equal(url, endpoint);
      const payload = Object.fromEntries(options.body);
      requests.push(payload);
      if (networkMode === 'failure') throw new Error('offline');
      if (networkMode === 'blocked') await new Promise(resolve => { fetchResolve = resolve; });
      return { ok: true, json: async () => networkMode === 'wrongReceipt' ? { ok: true, requestId: 'wrong' } : post(payload) };
    }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../rsvp.js'), 'utf8'), context);
  const submit = () => get('rsvpForm').events.submit({ preventDefault() {} });
  await submit();
  assert.equal(get('rsvpStatus').dataset.state, 'success');
  const destination = new URL(browserWindow.location.href);
  assert.equal(destination.searchParams.get('phone'), '50255138916');
  assert.match(destination.searchParams.get('text'), /Personas confirmadas: 3/);
  browserWindow.location.href = '';
  const previous = values.length;
  await submit();
  assert.equal(requests[0].requestId, requests[1].requestId);
  assert.equal(values.length, previous);
  get('attendance').value = 'no';
  get('attendance').events.change();
  assert.equal(get('attendeeCount').disabled, true);
  await submit();
  assert.equal(requests.at(-1).confirmed, '0');
  assert.equal(values.at(-1)[3], 'No asistirá');
  get('guestMessage').value = 'Otra respuesta para probar un fallo';
  networkMode = 'failure';
  await submit();
  assert.equal(get('rsvpStatus').dataset.state, 'error');
  assert.equal(get('rsvpSubmit').disabled, false);
  assert.equal(new URL(browserWindow.location.href).origin, 'https://api.whatsapp.com');
  const retryId = requests.at(-1).requestId;
  networkMode = 'success';
  await submit();
  assert.equal(requests.at(-1).requestId, retryId);
  assert.equal(get('rsvpStatus').dataset.state, 'success');
  networkMode = 'wrongReceipt';
  await submit();
  assert.equal(get('rsvpStatus').dataset.state, 'error');
  networkMode = 'blocked';
  const pending = submit();
  const requestCount = requests.length;
  await submit();
  assert.equal(requests.length, requestCount, 'Double clicks must not submit twice');
  assert.equal(get('rsvpSubmit').disabled, true);
  fetchResolve();
  await pending;
  assert.equal(get('rsvpSubmit').disabled, false);
  console.log('PASS: five-column writes, declines, limits, escaped formulas, retries, interrupted writes, locks, receipt verification, network failures and double clicks.');
}
frontendChecks().catch(error => { console.error(error); process.exitCode = 1; });
