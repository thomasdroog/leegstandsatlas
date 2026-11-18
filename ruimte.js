// Oppervlakte en mogelijke invullingen per pand (tabblad "Oppervlakte & invulling") en de 3D-gebouwen op de kaart.
// De cijfers staan in data/gebouwen.js. Uitleg over de berekening: tools/gebouwen_berekenen.py en de README.

const LT = x => x == null ? "" : typeof x === "string" ? x : (x[TAAL] || x.nl || "");
const geb = p => (typeof GEBOUWEN !== "undefined" && GEBOUWEN[p.id]) || null;
const m2 = n => `${Math.round(n).toLocaleString(LOCALE)} m²`;
const meter = n => `${(Math.round(n * 10) / 10).toLocaleString(LOCALE)} m`;

// Hoogte per verdieping waarmee het aantal verdiepingen geschat wordt. Oude kastelen, kloosters en
// industriegebouwen hebben hogere verdiepingen dan een woning. Per pand te overschrijven met verdiepingHoogte.
const VERDIEPING = { kasteel: 3.5, religieus: 3.6, industrie: 4.5, spoorweg: 4, ruine: 3.5, hoeve: 3.2, woning: 3 };

// Daktype in woorden, bv. "zadeldak, 45°".
function dakTekst(d) {
  if (!d) return "";
  const naam = { plat: t("plat dak"), lessenaar: t("lessenaarsdak"), zadel: t("zadeldak"), schild: t("schilddak"), gemeten: t("samengesteld dak"), samengesteld: t("samengesteld dak") }[d.soort] || d.soort;
  const vl = d.soort === "samengesteld" && d.vlakken ? " " + t("({n} vlakken)", { n: d.vlakken }) : "";
  return d.helling ? `${naam}${vl}, ${d.helling}°` : naam + vl;
}

// Schatting per gebouw: verdiepingen onder de goot, plus een dakverdieping als het dak hoog genoeg is.
function schatting(p, g, info) {
  const h = (info && info.verdiepingHoogte) || g.verdiepingHoogte || VERDIEPING[g.categorie || p.categorie] || 3;
  const model = g.dak && g.dak.soort !== "gemeten" ? g.dak : null;  // samengestelde daken: percentielen blijven beter
  const goot = g.goot != null ? g.goot : model ? model.goot : g.mediaan;  // verdiepingen: LiDAR-percentiel blijft stabieler
  const nok = Math.max(goot, model ? model.nok : g.nok != null ? g.nok : goot);
  if (g.ruine || !goot || goot < 2) return { h, goot, nok, n: 0, dak: 0 };
  const n = g.verdiepingen != null ? g.verdiepingen : Math.max(1, Math.floor((goot + 0.6) / h));
  if (g.dak && g.dak.soort === "plat" && g.dakverdieping == null) return { h, goot, nok, n, dak: 0 };
  const dak = g.dakverdieping === false ? 0 : g.dakverdieping || nok - goot >= 2.8 ? g.oppervlakte * 0.5 : 0;
  return { h, goot, nok, n, dak };
}

function ruimteTotaal(p) {
  const info = geb(p);
  if (!info || !info.gebouwen || !info.gebouwen.length) return null;
  let grond = 0, vloer = 0, nmax = 0, nok = 0;
  info.gebouwen.forEach(g => {
    const s = schatting(p, g, info);
    grond += g.oppervlakte;
    vloer += g.oppervlakte * s.n + s.dak;
    nmax = Math.max(nmax, s.n);
    nok = Math.max(nok, s.nok || 0);
  });
  return { grond, vloer, nmax, nok };
}

function ruimteTab(p) {
  const info = geb(p), parts = [];
  if (!info || !info.gebouwen || !info.gebouwen.length) {
    parts.push(meldingHtml());
    parts.push(`<div class="empty"><b>${t(info && info.opmerking ? "Geen gebouw om te meten." : "Nog geen oppervlakte berekend voor dit pand.")}</b><span>${esc(LT(info && info.opmerking) || t("De contour en hoogte worden berekend uit de GRB (Vlaanderen) of PICC (Wallonië) en de LiDAR-hoogtekaart. Dat gebeurt bij de volgende update."))}${kanTekenen() && p.lngLat ? " " + t("Je kan het gebouw ook zelf tekenen.") : ""}</span></div>`);
    if (kanTekenen() && p.lngLat) parts.push(`<div class="knoppen"><button type="button" class="knop hoofd" data-teken="">${t("Gebouw tekenen")}</button></div>`);
  } else {
    const tot = ruimteTotaal(p);
    parts.push(`<div class="rm-kop"><div class="iso" id="iso" role="img" aria-label="${esc(t("3D-weergave van het gebouw. Sleep om te draaien."))}"></div>
      <dl class="rm-cijfers">
        <div><dt>${t("Grondoppervlakte")}</dt><dd>${m2(tot.grond)}</dd></div>
        <div><dt>${t("Hoogte tot de nok")}</dt><dd>${tot.nok ? meter(tot.nok) : "?"}</dd></div>
        <div><dt>${t("Verdiepingen")}</dt><dd>${tot.nmax ? t("± {n}", { n: tot.nmax }) : "–"}</dd></div>
        <div><dt>${t("Vloeroppervlakte")}</dt><dd>${tot.vloer ? "± " + m2(tot.vloer) : "–"}</dd></div>
      </dl></div>`);
    if (info.opmerking) parts.push(`<p class="note">${esc(LT(info.opmerking))}</p>`);
    parts.push(meldingHtml());
    parts.push(`<div class="knoppen"><button type="button" class="knop" id="bekijk3d">${t("Bekijk in 3D op de kaart")}</button>${kanTekenen() ? `<button type="button" class="knop" data-teken="">${t("Gebouw tekenen")}</button>` : ""}</div>`);
    parts.push(`<h3>${t("Per gebouw")} <small>${info.gebouwen.length}</small></h3><ul class="rm-geb">${info.gebouwen.map((g, i) => {
      const s = schatting(p, g, info);
      const lagen = [];
      for (let k = 0; k < s.n; k++) lagen.push([k === 0 ? t("Gelijkvloers") : t("{n}e verdieping", { n: k }), g.oppervlakte]);
      if (s.dak) lagen.push([t("Dakverdieping"), s.dak]);
      const max = g.oppervlakte;
      return `<li data-geb="${i}"><div class="rm-gk"><b>${esc(LT(g.naam) || t("Gebouw {n}", { n: i + 1 }))}</b><span>${m2(g.oppervlakte)}</span></div>
        ${g.getekend ? `<small>${t("Zelf getekend door {naam}, {tijd}. Hoogte uit het aantal bouwlagen.", { naam: esc(g.getekend.naam), tijd: wanneer(g.getekend.tijd) })}</small>` : ""}
        <small>${[g.dak && dakTekst(g.dak), s.goot != null && t("goot ± {h}", { h: meter(s.goot) }), s.nok != null && t("nok ± {h}", { h: meter(s.nok) }), s.n && t("{n} × {h} per verdieping", { n: s.n, h: meter(s.h) })].filter(Boolean).join(" · ")}</small>
        ${kanTekenen() ? `<small><button type="button" class="linkknop" data-teken="${esc(LT(g.naam) || t("Gebouw {n}", { n: i + 1 }))}">${t("Opnieuw tekenen")}</button></small>` : ""}
        ${lagen.length ? `<div class="rm-lagen">${lagen.reverse().map(([l, a]) => `<div><span>${esc(l)}</span><i style="--w:${Math.max(4, a / max * 100)}%"></i><span>${m2(a)}</span></div>`).join("")}</div>` : `<p class="note">${t("Geen bruikbare verdiepingen meer (ruïne). Alleen de grondoppervlakte telt.")}</p>`}
      </li>`;
    }).join("")}</ul>`);
    parts.push(`<p class="note">${t("Schatting. De grondoppervlakte komt uit de gebouwcontour ({c}), de hoogte uit de LiDAR-hoogtekaart ({h}): goot ≈ 25e percentiel, nok ≈ 90e percentiel boven het maaiveld. Verdiepingen = hoogte tot de goot gedeeld door ± {v} per verdieping; een dakverdieping telt voor de helft. Muren en trappen zijn niet afgetrokken (bruto).", { c: esc(LT(info.bronContour) || "GRB / PICC"), h: esc(LT(info.bronHoogte) || "DHM / LiDAR"), v: meter(schatting(p, info.gebouwen[0], info).h) })}${info.gebouwen.some(g => g.dak) ? " " + t("Het dak is per gebouw opgebouwd uit dakvlakken die in de LiDAR-hoogtes gezocht zijn (vlakdetectie met RANSAC); nokken en kepers zijn de snijlijnen van die vlakken. Goot en nok komen uit dat dakmodel.") : ""}${info.berekend ? " " + t("Berekend op {d}.", { d: datum(info.berekend) }) : ""}</p>`);
  }
  const inv = (info && info.invullingen) || [];
  parts.push(`<h3>${t("Mogelijke invullingen")} <small>${inv.length}</small></h3>`);
  if (inv.length) parts.push(`<ul class="rm-inv">${inv.map(x => `<li><b>${esc(LT(x.titel))}</b><span>${esc(LT(x.uitleg))}</span></li>`).join("")}</ul>`);
  parts.push(`<p class="note">${t("Voorstellen om over na te denken, op basis van de grootte, de ligging en het soort gebouw. Nog niet getoetst aan bestemming of erfgoedregels.")} <button type="button" class="linkknop" id="naarDiscussie">${t("Eigen idee? Schrijf het in de Discussie.")}</button></p>`);
  return parts.join("");
}

// Kleine 3D-weergave (axonometrie) in het tabblad. Sleep om te draaien.
let isoHoek = -0.5;
function tekenIso(p) {
  const el = document.getElementById("iso"), info = geb(p);
  if (!el || !info) return;
  const alle = info.gebouwen.flatMap(g => g.contour);
  const lat0 = alle.reduce((s, c) => s + c[1], 0) / alle.length, lng0 = alle.reduce((s, c) => s + c[0], 0) / alle.length;
  const kx = 111320 * Math.cos(lat0 * Math.PI / 180), ky = 110540;
  const cs = Math.cos(isoHoek), sn = Math.sin(isoHoek);
  const vlakken = [];
  const proj = (x, y, z) => { const xr = x * cs - y * sn, yr = x * sn + y * cs; return [xr, -yr * 0.55 - z, yr]; };
  info.gebouwen.forEach((g, gi) => {
    const s = schatting(p, g, info);
    const goot = s.goot || 3, nok = Math.max(s.nok || goot, goot);
    const pts = g.contour.slice(0, g.contour[0][0] === g.contour[g.contour.length - 1][0] && g.contour[0][1] === g.contour[g.contour.length - 1][1] ? -1 : undefined)
      .map(c => [(c[0] - lng0) * kx, (c[1] - lat0) * ky]);
    const lagen = [[0, goot, "muur"], ...(nok - goot > 0.5 ? [[goot, nok, "dak"]] : [])];
    lagen.forEach(([z0, z1, soort]) => {
      pts.forEach((a, i) => {
        const b = pts[(i + 1) % pts.length];
        const q = [proj(a[0], a[1], z0), proj(b[0], b[1], z0), proj(b[0], b[1], z1), proj(a[0], a[1], z1)];
        // Licht: muren die naar het zuidwesten kijken zijn lichter.
        const nx = b[1] - a[1], ny = a[0] - b[0], len = Math.hypot(nx, ny) || 1;
        const licht = 0.55 + 0.45 * Math.max(0, (nx * -0.6 + ny * -0.8) / len);
        const lijnen = soort === "muur" && s.n > 1 ? Array.from({ length: s.n - 1 }, (_, k) => [proj(a[0], a[1], (k + 1) * s.h), proj(b[0], b[1], (k + 1) * s.h)]) : [];
        vlakken.push({ d: (q[0][2] + q[1][2]) / 2 - z0 * 0.001, q, licht, soort, lijnen, gi });
      });
      vlakken.push({ d: Math.min(...pts.map(c => proj(c[0], c[1], 0)[2])) - 0.01 + z1 * 0.001, q: pts.map(c => proj(c[0], c[1], z1)), licht: 1.12, soort: soort === "dak" ? "dakvlak" : "top", gi });
    });
  });
  vlakken.sort((a, b) => b.d - a.d);
  const xs = vlakken.flatMap(v => v.q.map(c => c[0])), ys = vlakken.flatMap(v => v.q.map(c => c[1]));
  const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
  const pad = 6, w = maxx - minx || 1, hgt = maxy - miny || 1;
  const kleurC = soortKleur(p.categorie);
  const kleurG = i => soortKleur(info.gebouwen[i].categorie || p.categorie);
  const pt = c => `${(c[0] - minx + pad).toFixed(2)},${(c[1] - miny + pad).toFixed(2)}`;
  el.innerHTML = `<svg viewBox="0 0 ${(w + 2 * pad).toFixed(1)} ${(hgt + 2 * pad).toFixed(1)}" preserveAspectRatio="xMidYMid meet" style="--c:${kleurC}">
    ${vlakken.map(v => {
      const dak = v.soort === "dak" || v.soort === "dakvlak";
      const f = `color-mix(in srgb, ${kleurG(v.gi)} ${Math.round(Math.min(1, v.licht) * (dak ? 40 : 85))}%, var(--surface))`;
      return `<polygon points="${v.q.map(pt).join(" ")}" fill="${f}" stroke="var(--fg)" stroke-opacity="${dak ? .25 : .5}" stroke-width="${(w / 500).toFixed(3)}" stroke-linejoin="round"${dak ? ` stroke-dasharray="${(w / 120).toFixed(2)}"` : ""}/>` +
        (v.lijnen || []).map(l => `<line x1="${pt(l[0]).split(",")[0]}" y1="${pt(l[0]).split(",")[1]}" x2="${pt(l[1]).split(",")[0]}" y2="${pt(l[1]).split(",")[1]}" stroke="var(--fg)" stroke-opacity=".25" stroke-width="${(w / 700).toFixed(3)}"/>`).join("");
    }).join("")}</svg>`;
}
(() => {
  let sleep = null;
  document.addEventListener("pointerdown", e => { const el = e.target.closest("#iso"); if (el && !el.classList.contains("drie")) { sleep = { x: e.clientX, h: isoHoek }; el.setPointerCapture(e.pointerId); e.preventDefault(); } });
  document.addEventListener("pointermove", e => { if (sleep && current) { isoHoek = sleep.h + (e.clientX - sleep.x) / 90; tekenIso(current); } });
  document.addEventListener("pointerup", () => { sleep = null; });
})();

// 3D-gebouwen op de kaart: muren tot de goot, het dak (tot de nok) lichter erboven.
function gebouwenGeojson() {
  const features = [];
  PANDEN.forEach(p => {
    const info = geb(p);
    if (!info) return;
    (info.gebouwen || []).forEach(g => {
      const s = schatting(p, g, info);
      const ring = g.contour.slice();
      const a = ring[0], b = ring[ring.length - 1];
      if (a[0] !== b[0] || a[1] !== b[1]) ring.push(a);
      const goot = s.goot || 3;
      features.push({ type: "Feature", properties: { id: p.id, kleur: css(`--c-${g.categorie || p.categorie}`) || css("--red"), goot, nok: Math.max(s.nok || goot, goot) }, geometry: { type: "Polygon", coordinates: [ring] } });
    });
  });
  return { type: "FeatureCollection", features };
}
let gebouwenAan = true;
function voegGebouwenToe() {
  if (!map.getStyle || !map.getStyle() || map.getSource("gebouwen")) return;
  map.addSource("gebouwen", { type: "geojson", data: gebouwenGeojson() });
  const zicht = gebouwenAan ? "visible" : "none";
  map.addLayer({ id: "geb-muur", type: "fill-extrusion", source: "gebouwen", minzoom: 14, layout: { visibility: zicht },
    paint: { "fill-extrusion-color": ["get", "kleur"], "fill-extrusion-height": ["get", "goot"], "fill-extrusion-base": 0, "fill-extrusion-opacity": 0.85 } });
  map.addLayer({ id: "geb-dak", type: "fill-extrusion", source: "gebouwen", minzoom: 14, layout: { visibility: zicht },
    paint: { "fill-extrusion-color": ["get", "kleur"], "fill-extrusion-height": ["get", "nok"], "fill-extrusion-base": ["get", "goot"], "fill-extrusion-opacity": 0.45 } });
  map.on("click", "geb-muur", e => { if (tekenen) return; const f = e.features && e.features[0]; if (f) { tab = "ruimte"; openPand(f.properties.id, false); } });
  map.on("mouseenter", "geb-muur", () => { map.getCanvas().style.cursor = "pointer"; });
  map.on("mouseleave", "geb-muur", () => { map.getCanvas().style.cursor = ""; });
}
function zetGebouwen(aan) {
  gebouwenAan = aan;
  const drie = !!(map.getLayer && map.getLayer("geb-3d"));
  ["geb-muur", "geb-dak"].forEach(id => map.getLayer(id) && map.setLayoutProperty(id, "visibility", aan && !drie ? "visible" : "none"));
  if (drie) map.triggerRepaint();
}
if (map.loaded && map.loaded()) voegGebouwenToe(); else map.on("load", voegGebouwenToe);
const herkleur = () => { const s = map.getSource && map.getSource("gebouwen"); if (s) s.setData(gebouwenGeojson()); if (typeof herbouwDrie === "function") herbouwDrie(); };
new MutationObserver(herkleur).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", herkleur);

function bekijk3d(p) {
  const info = geb(p);
  if (!info || !info.gebouwen.length) return;
  const alle = info.gebouwen.flatMap(g => g.contour);
  const bb = alle.reduce((b, c) => b.extend(c), new maplibregl.LngLatBounds(alle[0], alle[0]));
  zetGebouwen(true);
  if (mode !== "satelliet") setMode("satelliet");
  const span = Math.max((bb.getEast() - bb.getWest()) * 71000, (bb.getNorth() - bb.getSouth()) * 111000, 30);
  const zoom = Math.min(19, Math.max(16, 17.2 - Math.log2(span / 80)));
  map.flyTo({ center: bb.getCenter(), zoom, pitch: 60, bearing: -25, speed: 1.2, essential: true, padding: panelPadding() });
  if (typeof toonBediening === "function") toonBediening(true);
}

$("pBody").addEventListener("click", e => {
  if (e.target.id === "bekijk3d" && current) bekijk3d(current);
  if (e.target.id === "naarDiscussie") showTab("discussie");
});

// Kaartlagen: 3D-gebouwen van de panden, gebouwcontouren en perceelsgrenzen (live van de Waalse en Vlaamse overheid).
// Wallonië: PICC en kadaster via geoservices.wallonie.be; Vlaanderen (Voeren): GRB via geo.api.vlaanderen.be.
const VL_WMS = "https://geo.api.vlaanderen.be/GRB/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&STYLES=&CRS=EPSG:3857&WIDTH=512&HEIGHT=512&BBOX={bbox-epsg-3857}&LAYERS=";
const WAL_EXPORT = (pad, lagen) => `${WAL}${pad}/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=3857&imageSR=3857&size=512,512&format=png32&transparent=true&f=image${lagen ? "&layers=show:" + lagen : ""}`;
const KAARTLAGEN = [
  { id: "contouren", naam: "Gebouwcontouren", uitleg: "PICC (Wallonië) · GRB (Vlaanderen)",
    bronnen: [{ tiles: WAL_EXPORT("TOPOGRAPHIE/PICC_VDIFF", "9,11"), bounds: WALLONIE }, { tiles: VL_WMS + "GRB_GBG", bounds: [2.5, 50.67, 5.95, 51.51] }] },
  { id: "percelen", naam: "Perceelsgrenzen", uitleg: "Kadaster (Wallonië) · GRB (Vlaanderen)",
    bronnen: [{ tiles: WAL_EXPORT("PLAN_REGLEMENT/CADMAP_2025_PARCELLES", "0"), bounds: WALLONIE }, { tiles: VL_WMS + "GRB_ADP_GRENS", bounds: [2.5, 50.67, 5.95, 51.51] }] }
];
const lagenAan = new Set();
const lagenMenu = document.getElementById("lagenMenu"), lagenBtn = document.getElementById("lagenBtn");
function renderLagen() {
  const knop = (id, b, s, aan) => `<button type="button" role="menuitemcheckbox" data-laag="${id}" aria-checked="${aan}"><span class="r vk"></span><b>${esc(t(b))}</b><small>${esc(s)}</small></button>`;
  lagenMenu.innerHTML = `<div class="kop">${t("Kaartlagen")}</div>` +
    knop("gebouwen", "Panden in 3D", t("oppervlakte en hoogte"), gebouwenAan) +
    KAARTLAGEN.map(l => knop(l.id, l.naam, l.uitleg, lagenAan.has(l.id))).join("") +
    `<p>${t("Zoom in tot op straatniveau om de lijnen te zien. Bron: Service public de Wallonie (PICC, kadaster) en Digitaal Vlaanderen (GRB).")}</p>`;
}
function toggleLagen(open) {
  if (open) { renderLagen(); toggleOud(false); }
  lagenMenu.hidden = !open;
  lagenBtn.setAttribute("aria-expanded", open);
}
function zetLaag(id, aan) {
  const l = KAARTLAGEN.find(x => x.id === id);
  if (!l || !map.getStyle || !map.getStyle()) return;
  if (aan) lagenAan.add(id); else lagenAan.delete(id);
  l.bronnen.forEach((b, i) => {
    const sid = `laag-${id}-${i}`;
    if (aan && !map.getSource(sid)) {
      map.addSource(sid, { type: "raster", tiles: [b.tiles], tileSize: 512, bounds: b.bounds, minzoom: 14, maxzoom: 20,
        attribution: i === 0 ? "© Service public de Wallonie" : "© Digitaal Vlaanderen" });
      map.addLayer({ id: sid, type: "raster", source: sid, minzoom: 14, paint: { "raster-fade-duration": 150, "raster-opacity": id === "percelen" ? 0.9 : 1 } }, map.getLayer("geb-muur") ? "geb-muur" : "grens");
    }
    if (map.getLayer(sid)) map.setLayoutProperty(sid, "visibility", aan ? "visible" : "none");
  });
  lagenBtn.classList.toggle("on", lagenAan.size > 0);
}
lagenBtn.onclick = e => { e.stopPropagation(); toggleLagen(lagenMenu.hidden); };
lagenMenu.addEventListener("click", e => {
  e.stopPropagation();
  const b = e.target.closest("button[data-laag]");
  if (!b) return;
  if (b.dataset.laag === "gebouwen") zetGebouwen(!gebouwenAan);
  else zetLaag(b.dataset.laag, !lagenAan.has(b.dataset.laag));
  renderLagen();
});
document.addEventListener("click", e => { if (!e.target.closest(".oud")) toggleLagen(false); });
oudBtn.addEventListener("click", () => toggleLagen(false));

// Zelf een gebouw tekenen: voor gebouwen zonder contour (of om een contour te verbeteren). Klik de hoeken aan op de
// kaart, geef het aantal bouwlagen en eventueel de nokhoogte. Bewaard in de gedeelde opslag (type "contour", script v3).
const kanTekenen = () => opslagVersie >= 3 && !zonderBol && !!OPSLAG;
function oppervlakteVan(c) {
  const lat0 = c.reduce((s, x) => s + x[1], 0) / c.length * Math.PI / 180;
  const kx = 111320 * Math.cos(lat0), ky = 110540;
  let a = 0;
  c.forEach((x, i) => { const y = c[(i + 1) % c.length]; a += x[0] * kx * y[1] * ky - y[0] * kx * x[1] * ky; });
  return Math.abs(a / 2);
}
window.verwerkContouren = () => {
  const rijen = window.wachtendeContouren || [];
  window.wachtendeContouren = [];
  rijen.forEach(({ p, r, naam }) => {
    let d;
    try { d = typeof r.tekst === "string" ? JSON.parse(r.tekst) : r.tekst; } catch (e) { return; }
    if (!d || !Array.isArray(d.c) || d.c.length < 3 || !r.titel) return;
    const c = d.c.map(x => [Number(x[0]), Number(x[1])]).filter(x => isFinite(x[0]) && isFinite(x[1]));
    if (c.length < 3) return;
    const cat = SOORTEN.some(x => x[0] === r.categorie) ? r.categorie : "";
    const n = d.n === "" || d.n == null ? null : Number(d.n);
    const h = VERDIEPING[cat || p.categorie] || 3;
    const goot = n ? n * h : Number(d.nok) || 2;
    const g = { naam: String(r.titel), categorie: cat || undefined, oppervlakte: oppervlakteVan(c), contour: c,
      goot, nok: Math.max(Number(d.nok) || goot, goot), verdiepingen: n, ruine: n === 0, dakverdieping: false, getekend: { naam, tijd: r.tijd } };
    if (!GEBOUWEN[p.id]) GEBOUWEN[p.id] = { gebouwen: [], invullingen: [], bronContour: { nl: "eigen tekening", fr: "dessin d'un visiteur", en: "drawn by a visitor" }, bronHoogte: { nl: "aantal bouwlagen", fr: "nombre de niveaux", en: "number of floors" } };
    const lijst = GEBOUWEN[p.id].gebouwen, i = lijst.findIndex(x => LT(x.naam) === g.naam);
    if (i >= 0) lijst[i] = g; else lijst.push(g);
  });
  if (rijen.length) {
    herkleur();
    if (current && tab === "ruimte" && document.getElementById("pBody")) showTab("ruimte");
  }
};
if (typeof GEBOUWEN === "undefined") window.GEBOUWEN = {};
window.verwerkContouren();

let tekenen = null;
const tekenGeojson = () => {
  const c = tekenen ? tekenen.punten : [];
  const f = c.map(x => ({ type: "Feature", properties: {}, geometry: { type: "Point", coordinates: x } }));
  if (c.length >= 2) f.push({ type: "Feature", properties: {}, geometry: c.length >= 3 ? { type: "Polygon", coordinates: [[...c, c[0]]] } : { type: "LineString", coordinates: c } });
  return { type: "FeatureCollection", features: f };
};
function tekenKaart() {
  if (!map.getSource("teken")) {
    map.addSource("teken", { type: "geojson", data: tekenGeojson() });
    map.addLayer({ id: "teken-vlak", type: "fill", source: "teken", filter: ["==", ["geometry-type"], "Polygon"], paint: { "fill-color": css("--accent"), "fill-opacity": 0.25 } });
    map.addLayer({ id: "teken-lijn", type: "line", source: "teken", filter: ["!=", ["geometry-type"], "Point"], paint: { "line-color": css("--accent"), "line-width": 2.5 } });
    map.addLayer({ id: "teken-punt", type: "circle", source: "teken", filter: ["==", ["geometry-type"], "Point"], paint: { "circle-radius": 5, "circle-color": "#fff", "circle-stroke-color": css("--accent"), "circle-stroke-width": 2.5 } });
  } else map.getSource("teken").setData(tekenGeojson());
  const n = tekenen ? tekenen.punten.length : 0;
  $("tekenTxt").textContent = n < 3 ? t("Klik de hoeken van het gebouw aan op de kaart ({n} van minstens 3).", { n }) : t("{n} hoeken, ± {m}. Klik verder of kies Klaar.", { n, m: m2(oppervlakteVan(tekenen.punten)) });
  $("tekenKlaar").disabled = n < 3;
  $("tekenTerug").disabled = n < 1;
}
function startTekenen(p, titel) {
  tekenen = { p, titel: titel || "", punten: [] };
  $("teken").hidden = false;
  document.body.classList.add("kiezen");
  $("panel").hidden = true;
  zetGebouwen(true);
  if (mode !== "satelliet") setMode("satelliet");
  if (!lagenAan.has("contouren")) zetLaag("contouren", true);
  const info = geb(p), alle = info && info.gebouwen.length ? info.gebouwen.flatMap(g => g.contour) : null;
  const midden = alle ? alle.reduce((b, c) => b.extend(c), new maplibregl.LngLatBounds(alle[0], alle[0])).getCenter() : p.lngLat;
  map.easeTo({ center: midden, zoom: Math.max(map.getZoom(), 18), pitch: 0, bearing: 0, padding: { top: 0, bottom: 0, left: 0, right: 0 }, duration: reduce ? 0 : 600 });
  tekenKaart();
}
function stopTekenen(terug) {
  const k = tekenen;
  tekenen = null;
  $("teken").hidden = true;
  document.body.classList.remove("kiezen");
  if (map.getSource("teken")) map.getSource("teken").setData(tekenGeojson());
  if (terug && k) { tab = "ruimte"; openPand(k.p.id, false); }
}
map.on("click", e => {
  if (!tekenen || $("nieuw").open) return;
  tekenen.punten.push([Number(e.lngLat.lng.toFixed(7)), Number(e.lngLat.lat.toFixed(7))]);
  tekenKaart();
});
$("tekenTerug").onclick = () => { if (tekenen) { tekenen.punten.pop(); tekenKaart(); } };
$("tekenWeg").onclick = () => stopTekenen(true);
$("tekenKlaar").onclick = () => { if (tekenen && tekenen.punten.length >= 3) tekenFormulier(); };
document.addEventListener("keydown", e => {
  if (!tekenen || $("nieuw").open) return;
  if (e.key === "Escape") stopTekenen(true);
  if (e.key === "Enter" && tekenen.punten.length >= 3) tekenFormulier();
  if (e.key === "Backspace") { tekenen.punten.pop(); tekenKaart(); }
});
function tekenFormulier() {
  const k = tekenen, dlg = $("nieuw"), opp = oppervlakteVan(k.punten);
  const bestaand = k.titel && geb(k.p) && geb(k.p).gebouwen.find(g => LT(g.naam) === k.titel);
  dlg.innerHTML = `<form class="edit" id="tekenForm">
    <h2 id="nieuwKop">${esc(t("Gebouw bij {pand}", { pand: nm(k.p) }))}</h2>
    <p class="note">${t("Getekende oppervlakte: ± {m}. Klopt de vorm niet? Kies Annuleren en teken verder.", { m: m2(opp) })}</p>
    <label>${t("Naam van het gebouw")}<input type="text" name="titel" required maxlength="100" value="${esc(k.titel)}" placeholder="${t("Bv. Schuur, Ruïne 2, Kapel")}"></label>
    <label>${t("Soort")}<select name="soort">${SOORTEN.map(([id, l]) => `<option value="${id}"${id === ((bestaand && bestaand.categorie) || k.p.categorie) ? " selected" : ""}>${esc(l)}</option>`).join("")}</select></label>
    <label>${t("Aantal bouwlagen (zonder dak; 0 = ruïne)")}<input type="number" name="n" required min="0" max="30" step="1" inputmode="numeric" value="${bestaand && bestaand.verdiepingen != null ? bestaand.verdiepingen : ""}"></label>
    <label>${t("Hoogte tot de nok in meter (optioneel)")}<input type="number" name="nok" min="0" max="120" step="0.1" inputmode="decimal"></label>
    ${naamVeld()}
    ${privacy}
    <div class="knoppen"><button type="submit" class="knop hoofd">${t("Opslaan")}</button><button type="button" class="knop" id="nieuwWeg">${t("Annuleren")}</button></div>
  </form>`;
  dlg.showModal();
  dlg.querySelector(k.titel ? "input[name=n]" : "input[name=titel]").focus();
  dlg.querySelector("#nieuwWeg").onclick = () => dlg.close();
  dlg.querySelector("form").onsubmit = async e => {
    e.preventDefault();
    const f = e.target, naam = wis(f.naam.value).slice(0, 60), titel = wis(f.titel.value).slice(0, 100);
    if (!titel) return f.titel.focus();
    if (!naam) return f.naam.focus();
    if (f.n.value === "") return f.n.focus();
    mijnNaam = naam;
    try { localStorage.setItem("naam", naam); } catch (err) {}
    const c = k.punten, mid = [c.reduce((s, x) => s + x[0], 0) / c.length, c.reduce((s, x) => s + x[1], 0) / c.length];
    const d = { type: "contour", id: k.p.id, naam, titel, categorie: f.soort.value, lng: Number(mid[0].toFixed(6)), lat: Number(mid[1].toFixed(6)),
      contour: c, verdiepingen: Number(f.n.value), nok: f.nok.value === "" ? "" : Number(f.nok.value) };
    f.querySelector("button[type=submit]").disabled = true;
    try {
      await fetch(OPSLAG, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(d) });
    } catch (err) {
      f.querySelector("button[type=submit]").disabled = false;
      return alert(t("Opslaan lukte niet. Probeer het later opnieuw."));
    }
    dlg.close();
    stopTekenen(false);
    pasToe([{ ...d, tekst: JSON.stringify({ c, n: d.verdiepingen, nok: d.nok }), tijd: new Date().toISOString() }]);
    melding = t("Opgeslagen. Iedereen ziet het gebouw nu op de kaart.");
    tab = "ruimte";
    openPand(k.p.id, false);
  };
}
$("pBody").addEventListener("click", e => {
  const b = e.target.closest("[data-teken]");
  if (b && current) startTekenen(current, b.dataset.teken);
});
