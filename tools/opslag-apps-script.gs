/**
 * Gedeelde opslag voor aanpassingen op de Leegstandatlas (soort, staat, aanvullingen).
 *
 * Zo zet je het op (eenmalig, ongeveer 5 minuten):
 * 1. Maak in Google Drive een nieuwe Google Sheet, bv. "Leegstandatlas aanpassingen".
 * 2. Kies in die Sheet Extensies > Apps Script, wis wat er staat en plak deze hele code.
 * 3. Klik Implementeren > Nieuwe implementatie > type "Web-app".
 *    Uitvoeren als: ik. Wie heeft toegang: iedereen. Klik Implementeren en geef toestemming.
 * 4. Kopieer de web-app-URL (eindigt op /exec) en zet die in index.html bij const OPSLAG = "...".
 *
 * Elke aanpassing komt als een nieuwe rij in het blad "aanpassingen". De site toont per pand de
 * laatste soort en staat, en alle aanvullingen. Een rij wissen in de Sheet maakt die aanpassing ongedaan.
 */
const BLAD = "aanpassingen";
const KOP = ["tijd", "id", "categorie", "score", "toelichting", "opmerking"];
const SOORTEN = ["ruine", "kasteel", "religieus", "hoeve", "woning", "industrie", "spoorweg"];

function blad_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(BLAD) || ss.insertSheet(BLAD);
  if (sh.getLastRow() === 0) sh.appendRow(KOP);
  return sh;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const rijen = blad_().getDataRange().getValues().slice(1)
    .filter(r => r[1])
    .map(r => Object.fromEntries(KOP.map((k, i) => [k, r[i] instanceof Date ? r[i].toISOString() : r[i]])));
  return json_(rijen);
}

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false }); }
  const tekst = v => String(v || "").replace(/\s+/g, " ").trim().slice(0, 1000);
  const id = String(d.id || "");
  const score = Number(d.score);
  const rij = [
    new Date(),
    /^[a-z0-9-]{1,80}$/.test(id) ? id : "",
    SOORTEN.indexOf(d.categorie) >= 0 ? d.categorie : "",
    score >= 1 && score <= 5 ? score : "",
    tekst(d.toelichting),
    tekst(d.opmerking)
  ];
  if (!rij[1] || (!rij[2] && !rij[3] && !rij[4] && !rij[5])) return json_({ ok: false });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { blad_().appendRow(rij); } finally { lock.releaseLock(); }
  return json_({ ok: true });
}
