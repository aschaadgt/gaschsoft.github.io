/** Receives RSVPs for this wedding only. Deploy as an Apps Script web app. */
const RSVP_SHEET_ID = '1ogqNS8Zvr41IcYi4Rwm2t_s1MlrmgO_rZFcVCFc8-YM';
const RSVP_HEADERS = ['Nombres de los invitados', 'Cupos de la invitación', 'Personas confirmadas', 'Estado', 'Mensaje'];

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

// Health check only: never expose guest information through the public endpoint.
function doGet() {
  return jsonResponse_({ ok: true, service: 'weddingangelandkarmin-rsvp', version: 1 });
}

function validateRsvp_(p) {
  if (!p || p.website || p.event !== 'weddingangelandkarmin') throw new Error('INVALID');
  if (typeof p.requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(p.requestId)) throw new Error('INVALID');
  if (typeof p.names !== 'string' || !p.names.trim() || p.names.length > 400) throw new Error('INVALID');
  if (typeof p.message !== 'string' || p.message.length > 1000) throw new Error('INVALID');
  if (!/^[1-5]$/.test(String(p.guests)) || !/^[0-5]$/.test(String(p.confirmed))) throw new Error('INVALID');
  const guests = Number(p.guests);
  const confirmed = Number(p.confirmed);
  if (!['yes', 'no'].includes(p.attendance) || confirmed > guests) throw new Error('INVALID');
  if (p.attendance === 'no' ? confirmed !== 0 : confirmed < 1) throw new Error('INVALID');
  return {
    requestId: p.requestId.toLowerCase(),
    names: p.names.trim(), guests: guests, confirmed: confirmed,
    status: p.attendance === 'yes' ? 'Confirmado' : 'No asistirá',
    message: p.message.trim()
  };
}

function textCell_(value) {
  // A name or message must never become a spreadsheet formula.
  return /^[=+@'\-]/.test(value) ? "'" + value : value;
}

function findGuestSheet_() {
  const sheets = SpreadsheetApp.openById(RSVP_SHEET_ID).getSheets();
  const matches = sheets.filter(function (sheet) {
    const headers = sheet.getRange(1, 1, 1, 5).getDisplayValues()[0];
    return RSVP_HEADERS.every(function (header, index) { return headers[index].trim() === header; });
  });
  // Do not guess a tab, create a second table or overwrite the user's headers.
  if (matches.length !== 1) throw new Error('SHEET_SETUP');
  return matches[0];
}

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.length > 20000) throw new Error('INVALID');
    const data = validateRsvp_(e.parameter);
    const rowValues = [textCell_(data.names), data.guests, data.confirmed, data.status, textCell_(data.message)];
    const marker = 'RSVP:' + data.requestId;
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return jsonResponse_({ ok: false, code: 'BUSY' });
    const sheet = findGuestSheet_();
    const lastRow = sheet.getLastRow();
    // Request references live in cell notes, keeping exactly the five visible columns.
    // Notes move with their rows if the couple sorts the table.
    const notes = sheet.getMaxRows() > 1 ? sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).getNotes() : [];
    const existingIndex = notes.findIndex(function (note) { return note[0] === marker; });
    if (existingIndex >= 0) {
      const stored = sheet.getRange(existingIndex + 2, 1, 1, 5).getValues()[0];
      if (stored.every(function (value) { return value === ''; })) {
        sheet.getRange(existingIndex + 2, 1, 1, 5).setValues([rowValues]);
        SpreadsheetApp.flush();
        return jsonResponse_({ ok: true, requestId: data.requestId });
      }
      // getValues returns literal text without its apostrophe escape.
      const expected = [data.names, data.guests, data.confirmed, data.status, data.message];
      if (!stored.every(function (value, i) { return String(value) === String(expected[i]); })) {
        return jsonResponse_({ ok: false, code: 'CONFLICT' });
      }
      return jsonResponse_({ ok: true, requestId: data.requestId, duplicate: true });
    }
    const lastReservedRow = notes.reduce(function (last, note, index) { return /^RSVP:/.test(note[0]) ? index + 2 : last; }, 1);
    const row = Math.max(2, lastRow + 1, lastReservedRow + 1);
    if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 1);
    // Reserve before writing; a retry can recover a blank row after an interrupted write.
    sheet.getRange(row, 1).setNote(marker);
    sheet.getRange(row, 1, 1, 5).setValues([rowValues]);
    SpreadsheetApp.flush();
    return jsonResponse_({ ok: true, requestId: data.requestId });
  } catch (error) {
    const code = ['INVALID', 'SHEET_SETUP'].includes(error.message) ? error.message : 'SAVE_FAILED';
    return jsonResponse_({ ok: false, code: code });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
