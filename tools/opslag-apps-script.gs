/**
 * Gedeelde opslag voor de Leegstandatlas: aanpassingen aan soort en staat, reacties in de discussie,
 * en gebouwen of onderdelen die bezoekers zelf op de kaart zetten.
 *
 * Zo zet je het op (eenmalig, ongeveer 5 minuten):
 * 1. Maak in Google Drive een nieuwe Google Sheet, bv. "Leegstandatlas aanpassingen".
 * 2. Kies in die Sheet Extensies > Apps Script, wis wat er staat en plak deze hele code.
 * 3. Klik Implementeren > Nieuwe implementatie > type "Web-app".
 *    Uitvoeren als: ik. Wie heeft toegang: Iedereen (niet "Iedereen binnen ..."; dan kunnen bezoekers niets bewaren).
 *    Klik Implementeren en geef toestemming.
 * Nieuwe versie van deze code? Plak ze, bewaar, en kies Implementeren > Implementaties beheren > potlood >
 * Versie: Nieuwe versie > Implementeren. De URL blijft dan dezelfde.
 * 4. Kopieer de web-app-URL (eindigt op /exec) en zet die in index.html bij const OPSLAG = "...".
 *
 * Elke aanpassing komt als een nieuwe rij in het blad "aanpassingen". De site toont per pand de
 * laatste soort en staat, wie die aanpaste, en alle reacties met naam en datum. Een rij wissen in de Sheet maakt die aanpassing ongedaan.
 */
// De Sheet "Leegstandatlas aanpassingen". Nodig als het script niet vanuit de Sheet zelf (Extensies > Apps Script) gemaakt is.
const SHEET_ID = "1AolzfgM0V_v-3PxeigbfEeERXdPP-TkBZISIatQSnxc";
const BLAD = "aanpassingen";
const VERSIE = 2;
const KOP = ["tijd", "type", "id", "naam", "categorie", "score", "toelichting", "tekst", "titel", "adres", "lng", "lat"];
const TYPES = ["aanpassing", "reactie", "nieuw", "onderdeel", "plaats"];
const SOORTEN = ["ruine", "kasteel", "religieus", "hoeve", "woning", "industrie", "spoorweg"];

function blad_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(BLAD) || ss.insertSheet(BLAD);
  if (sh.getLastRow() === 0 || sh.getLastColumn() < KOP.length) { sh.getRange(1, 1, 1, KOP.length).setValues([KOP]); sh.setFrozenRows(1); }
  return sh;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// E-mailadressen en telefoonnummers weghalen; de site is openbaar.
function tekst_(v, max) {
  return String(v || "")
    .replace(/[^\s@<>()]+@[^\s@<>()]+\.[a-z]{2,}/gi, "[e-mail verwijderd]")
    .replace(/\+?\d[\d ./-]{7,}\d/g, m => (m.match(/\d/g) || []).length >= 9 ? "[nummer verwijderd]" : m)
    .replace(/\s+/g, " ").trim().slice(0, max);
}

function getal_(v, grens) {
  const n = Number(v);
  return v !== "" && v !== null && isFinite(n) && Math.abs(n) <= grens ? Math.round(n * 1e6) / 1e6 : "";
}

function doGet() {
  const rijen = blad_().getDataRange().getValues().slice(1)
    .filter(r => r[2] && r[3])
    .map(r => Object.fromEntries(KOP.map((k, i) => [k, r[i] instanceof Date ? r[i].toISOString() : (r[i] === undefined ? "" : r[i])])));
  return json_({ versie: VERSIE, rijen: rijen });
}

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false }); }
  const id = String(d.id || "");
  const type = TYPES.indexOf(d.type) >= 0 ? d.type : "aanpassing";
  const metStaat = type === "aanpassing" || type === "nieuw" || type === "onderdeel";
  const score = Number(d.score);
  const rij = [
    new Date(),
    type,
    /^[a-z0-9-]{1,80}$/.test(id) ? id : "",
    tekst_(d.naam, 60),
    metStaat && SOORTEN.indexOf(d.categorie) >= 0 ? d.categorie : "",
    metStaat && score >= 1 && score <= 5 ? score : "",
    metStaat ? tekst_(d.toelichting, 1000) : "",
    type === "reactie" ? tekst_(d.tekst, 1000) : "",
    type === "nieuw" || type === "onderdeel" || type === "plaats" ? tekst_(d.titel, 100) : "",
    type === "nieuw" ? tekst_(d.adres, 200) : "",
    type === "aanpassing" || type === "reactie" ? "" : getal_(d.lng, 180),
    type === "aanpassing" || type === "reactie" ? "" : getal_(d.lat, 90)
  ];
  if (!rij[2] || !rij[3]) return json_({ ok: false });
  if (type === "reactie" && !rij[7]) return json_({ ok: false });
  if (type === "aanpassing" && !rij[4] && !rij[5] && !rij[6]) return json_({ ok: false });
  if (type !== "aanpassing" && type !== "reactie" && (!rij[8] || rij[10] === "" || rij[11] === "")) return json_({ ok: false });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { blad_().appendRow(rij); } finally { lock.releaseLock(); }
  return json_({ ok: true });
}
