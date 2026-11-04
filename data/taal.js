// Taalkeuze: Nederlands (standaard), Frans of Engels. De vertalingen staan in data/vertalingen.js.
// Kies met ?lang=fr of ?lang=en in de link, of met de knop NL · FR · EN; de keuze wordt in de browser onthouden.
const TALEN = ["nl", "fr", "en"];
const TAAL = (() => {
  let l = "";
  try { l = new URLSearchParams(location.search).get("lang") || ""; } catch (e) {}
  if (TALEN.includes(l)) { try { localStorage.setItem("taal", l); } catch (e) {} return l; }
  try { l = localStorage.getItem("taal") || ""; } catch (e) {}
  return TALEN.includes(l) ? l : "nl";
})();
const LOCALE = { nl: "nl-BE", fr: "fr-BE", en: "en-GB" }[TAAL];
document.documentElement.lang = TAAL;

// t("Dutch text {x}", { x }) geeft de vertaling, of de Nederlandse tekst als er (nog) geen vertaling is.
const ONTBREEKT = new Set();
function t(s, v) {
  let r = s;
  if (TAAL !== "nl") {
    const d = (typeof VERTALING !== "undefined" && VERTALING.ui[TAAL]) || {};
    if (d[s] != null) r = d[s]; else ONTBREEKT.add(s);
  }
  return v ? r.replace(/\{(\w+)\}/g, (m, k) => (k in v ? v[k] : m)) : r;
}
// Weergavenaam van een pand of onderdeel. De Nederlandse naam (naam) blijft intern de sleutel.
const nm = o => o.naamTaal || o.naam;

// Vaste teksten in de HTML: elementen met data-t krijgen hun vertaalde tekst, en aria-label, placeholder,
// alt en title worden vertaald. Ook de paginatitel en de beschrijving.
function vertaalPagina() {
  if (TAAL === "nl") return;
  document.querySelectorAll("[data-t]").forEach(el => { el.textContent = t(el.dataset.t || el.textContent.trim()); });
  document.querySelectorAll("[data-th]").forEach(el => { el.innerHTML = t(el.innerHTML.trim()); });
  ["aria-label", "placeholder", "alt"].forEach(a => document.querySelectorAll(`body [${a}]`).forEach(el => {
    const w = el.getAttribute(a);
    if (w && !el.closest("[data-niet-vertalen]")) el.setAttribute(a, t(w));
  }));
  document.title = t(document.title);
  const m = document.querySelector('meta[name="description"]');
  if (m) m.content = t(m.content);
}

// Inhoud per pand (geschiedenis, toelichting, materialen, ...) in de gekozen taal.
// Wat bezoekers zelf schrijven, blijft zoals het geschreven is.
function vertaalPanden(lijst) {
  if (TAAL === "nl" || typeof VERTALING === "undefined") return;
  const T = (VERTALING.panden || {})[TAAL] || {};
  lijst.forEach(p => {
    const x = T[p.id];
    if (!x) return;
    if (x.naam) p.naamTaal = x.naam;
    if (x.type) p.type = x.type;
    if (x.toelichting && p.staat) p.staat.toelichting = x.toelichting;
    if (p.geschiedenis) {
      if (x.geschiedenis) p.geschiedenis.tekst = x.geschiedenis;
      if (x.bronTekst) p.geschiedenis.bronTekst = x.bronTekst;
    }
    if (x.materialen) p.materialen = x.materialen;
    if (x.planBron) p.planBron = x.planBron;
    if (x.plannen && p.planinfo) Object.entries(p.planinfo).forEach(([src, pi], i) => { if (x.plannen[i]) pi.titel = x.plannen[i]; });
    if (x.onderdelen) (p.onderdelen || []).forEach(o => {
      const v = x.onderdelen[o.naam];
      if (!v) return;
      if (v[0]) o.naamTaal = v[0];
      if (v[1] && o.staat) o.staat.toelichting = v[1];
    });
  });
}

// Knop NL · FR · EN. Wisselen herlaadt de pagina in de nieuwe taal; de link naar een pand (#...) blijft.
function taalKnop() {
  const g = document.createElement("div");
  g.className = "seg taal";
  g.setAttribute("role", "group");
  g.setAttribute("aria-label", t("Taal"));
  g.innerHTML = TALEN.map(l => `<button type="button" lang="${l}" data-taal="${l}" aria-pressed="${l === TAAL}" title="${{ nl: "Nederlands", fr: "Français", en: "English" }[l]}">${l.toUpperCase()}</button>`).join("");
  g.addEventListener("click", e => {
    const b = e.target.closest("button[data-taal]");
    if (!b || b.dataset.taal === TAAL) return;
    e.stopPropagation();
    const l = b.dataset.taal;
    try { localStorage.setItem("taal", l); } catch (err) {}
    const u = new URL(location.href);
    if (l === "nl") u.searchParams.delete("lang"); else u.searchParams.set("lang", l);
    location.replace(u.href);
  });
  return g;
}
