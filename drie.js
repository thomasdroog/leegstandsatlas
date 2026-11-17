// Echte 3D-gebouwen met dak (three.js): op de kaart (custom layer van MapLibre) en in het tabblad Oppervlakte & invulling.
// Gebouwen met een dakmodel (mesh in data/gebouwen.js) krijgen hun gereconstrueerde dak; de andere een volume tot de goot.
// Lukt three.js niet (geen internet of geen WebGL), dan blijven de eenvoudige volumes van ruimte.js staan.
let DRIE = null;
const laadDrie = () => DRIE || (DRIE = import("three").catch(e => { DRIE = null; throw e; }));

// Oorsprong van een pand: uit de dakberekening, anders het midden van de contouren.
function oorsprong(info) {
  if (info.oorsprong) return info.oorsprong;
  const alle = info.gebouwen.flatMap(g => g.contour);
  return [alle.reduce((s, c) => s + c[0], 0) / alle.length, alle.reduce((s, c) => s + c[1], 0) / alle.length];
}
const kleurCss = (naam, fallback) => (css(naam) || fallback).trim();

// Bouwt een THREE.Group in meter rond de oorsprong: x = oost, y = op, z = zuid (zoals MapLibre het verwacht).
function bouwGroep(THREE, p, info) {
  const o = oorsprong(info), kx = 111320 * Math.cos(o[1] * Math.PI / 180), ky = 110540;
  const groep = new THREE.Group();
  info.gebouwen.forEach(g => {
    const kleur = new THREE.Color(kleurCss(`--c-${g.categorie || p.categorie}`, "#d42b2b"));
    const muurKleur = kleur.clone().lerp(new THREE.Color("#f4f1ea"), 0.55);
    const dakKleur = kleur.clone().lerp(new THREE.Color("#3a3d40"), 0.45);
    const delen = [];
    if (g.mesh && g.mesh.v && g.mesh.v.length) {
      const v = g.mesh.v, mo = g.mesh.o || o, dx = (mo[0] - o[0]) * kx, dy = (mo[1] - o[1]) * ky;
      const pos = new Float32Array(v.length);
      for (let i = 0; i < v.length; i += 3) { pos[i] = v[i] + dx; pos[i + 1] = v[i + 2]; pos[i + 2] = -(v[i + 1] + dy); }
      delen.push([pos, g.mesh.dak, dakKleur], [pos, g.mesh.muur, muurKleur]);
    } else {
      const s = schatting(p, g, info), h = s.goot || 3;
      let ring = g.contour.map(c => [(c[0] - o[0]) * kx, (c[1] - o[1]) * ky]);
      const a = ring[0], b = ring[ring.length - 1];
      if (a[0] === b[0] && a[1] === b[1]) ring = ring.slice(0, -1);
      if (THREE.ShapeUtils.isClockWise(ring.map(c => new THREE.Vector2(c[0], c[1])))) ring.reverse();
      const n = ring.length, pos = new Float32Array(n * 2 * 3);
      ring.forEach((c, i) => { pos.set([c[0], 0, -c[1]], i * 3); pos.set([c[0], h, -c[1]], (n + i) * 3); });
      const top = THREE.ShapeUtils.triangulateShape(ring.map(c => new THREE.Vector2(c[0], c[1])), []).flatMap(t => [n + t[0], n + t[1], n + t[2]]);
      const muur = [];
      for (let i = 0; i < n; i++) { const j = (i + 1) % n; muur.push(i, j, n + j, i, n + j, n + i); }
      delen.push([pos, top, g.ruine ? muurKleur : dakKleur], [pos, muur, muurKleur]);
    }
    delen.forEach(([pos, idx, kl]) => {
      if (!idx || !idx.length) return;
      let geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setIndex(idx);
      geo = geo.toNonIndexed();
      geo.computeVertexNormals();
      const mat = new THREE.MeshLambertMaterial({ color: kl, side: THREE.DoubleSide, transparent: !!g.ruine, opacity: g.ruine ? 0.6 : 1 });
      groep.add(new THREE.Mesh(geo, mat));
      const randen = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 28), new THREE.LineBasicMaterial({ color: 0x1e2220, transparent: true, opacity: 0.35 }));
      groep.add(randen);
    });
  });
  return groep;
}
function lichten(THREE, scene) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8f86, 1.6));
  const zon = new THREE.DirectionalLight(0xffffff, 1.6);
  zon.position.set(-60, 120, 80);
  scene.add(zon);
}

// 3D-weergave in het tabblad: slepen = draaien, scrollen of knijpen = zoomen.
let viewer = null;
function stopViewer() {
  if (!viewer) return;
  viewer.weg = true;
  viewer.renderer.dispose();
  viewer = null;
}
async function toonViewer(p) {
  stopViewer();
  const el = document.getElementById("iso"), info = geb(p);
  if (!el || !info || !info.gebouwen.length) return;
  let THREE;
  try { THREE = await laadDrie(); } catch (e) { return; }
  if (!document.body.contains(el) || current !== p) return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
  const scene = new THREE.Scene(), groep = bouwGroep(THREE, p, info);
  scene.add(groep); lichten(THREE, scene);
  const box = new THREE.Box3().setFromObject(groep), midden = box.getCenter(new THREE.Vector3()), grootte = box.getSize(new THREE.Vector3());
  const straal = Math.max(grootte.x, grootte.z, grootte.y * 1.5, 10);
  const grond = new THREE.Mesh(new THREE.CircleGeometry(straal * 1.1, 48).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: new THREE.Color(kleurCss("--surface-2", "#f4f5f3")).lerp(new THREE.Color("#888"), 0.12) }));
  grond.position.set(midden.x, -0.02, midden.z);
  scene.add(grond);
  const camera = new THREE.PerspectiveCamera(35, 4 / 3, 0.5, straal * 20);
  const v = { renderer, el, az: -0.6, el_: 0.55, afstand: straal * 2.1, weg: false };
  viewer = v;
  el.innerHTML = "";
  el.appendChild(renderer.domElement);
  el.classList.add("drie");
  renderer.setPixelRatio(Math.min(2, devicePixelRatio));
  const teken = () => {
    if (v.weg) return;
    if (!document.body.contains(el)) return stopViewer();
    const w = el.clientWidth, h = el.clientHeight;
    if (renderer.domElement.width !== Math.round(w * renderer.getPixelRatio())) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    camera.position.set(midden.x + v.afstand * Math.cos(v.el_) * Math.sin(v.az), midden.y + v.afstand * Math.sin(v.el_), midden.z + v.afstand * Math.cos(v.el_) * Math.cos(v.az));
    camera.lookAt(midden);
    renderer.render(scene, camera);
  };
  v.teken = teken;
  const wijzers = new Map();
  let vorige = null;
  renderer.domElement.style.touchAction = "none";
  renderer.domElement.addEventListener("pointerdown", e => { wijzers.set(e.pointerId, [e.clientX, e.clientY]); renderer.domElement.setPointerCapture(e.pointerId); vorige = null; });
  renderer.domElement.addEventListener("pointermove", e => {
    if (!wijzers.has(e.pointerId)) return;
    const oud = wijzers.get(e.pointerId);
    wijzers.set(e.pointerId, [e.clientX, e.clientY]);
    if (wijzers.size === 1) {
      v.az -= (e.clientX - oud[0]) / 120;
      v.el_ = Math.min(1.5, Math.max(0.08, v.el_ + (e.clientY - oud[1]) / 160));
    } else if (wijzers.size === 2) {
      const [a, b] = [...wijzers.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (vorige) v.afstand = Math.min(straal * 8, Math.max(straal * 0.5, v.afstand * vorige / d));
      vorige = d;
    }
    teken();
  });
  const los = e => { wijzers.delete(e.pointerId); vorige = null; };
  renderer.domElement.addEventListener("pointerup", los);
  renderer.domElement.addEventListener("pointercancel", los);
  renderer.domElement.addEventListener("wheel", e => { e.preventDefault(); v.afstand = Math.min(straal * 8, Math.max(straal * 0.5, v.afstand * Math.exp(e.deltaY / 400))); teken(); }, { passive: false });
  teken();
  new ResizeObserver(teken).observe(el);
}

// 3D-gebouwen op de kaart als custom layer. Gebouwen met een eigen 3D-vorm verdwijnen uit de eenvoudige volumes.
const drieLaag = {
  id: "geb-3d", type: "custom", renderingMode: "3d",
  onAdd(m, gl) {
    this.THREE = DRIE_MOD;
    this.renderer = new this.THREE.WebGLRenderer({ canvas: m.getCanvas(), context: gl, antialias: true });
    this.renderer.autoClear = false;
    this.camera = new this.THREE.Camera();
    this.bouw();
  },
  bouw() {
    const THREE = this.THREE;
    this.scenes = [];
    PANDEN.forEach(p => {
      const info = geb(p);
      if (!info || !info.gebouwen || !info.gebouwen.length) return;
      const scene = new THREE.Scene();
      scene.add(bouwGroep(THREE, p, info));
      lichten(THREE, scene);
      this.scenes.push({ scene, o: oorsprong(info) });
    });
  },
  render(gl, args) {
    if (!gebouwenAan || map.getZoom() < 14) return;
    const THREE = this.THREE, b = map.getBounds().toArray(), marge = 0.01;
    const hoofd = new THREE.Matrix4().fromArray(args.defaultProjectionData.mainMatrix);
    this.scenes.forEach(s => {
      if (s.o[0] < b[0][0] - marge || s.o[0] > b[1][0] + marge || s.o[1] < b[0][1] - marge || s.o[1] > b[1][1] + marge) return;
      const model = new THREE.Matrix4().fromArray(map.transform.getMatrixForModel(s.o, 0));
      this.camera.projectionMatrix = hoofd.clone().multiply(model);
      this.renderer.resetState();
      this.renderer.render(s.scene, this.camera);
    });
  }
};
let DRIE_MOD = null;
async function drieOpKaart() {
  try { DRIE_MOD = await laadDrie(); } catch (e) { return; }
  const zet = () => {
    if (!map.getLayer || !map.getStyle()) return;
    if (!map.getLayer("geb-3d")) map.addLayer(drieLaag);
    // Alles wat nu door three.js getekend wordt, uit de eenvoudige volumes halen.
    ["geb-muur", "geb-dak"].forEach(id => map.getLayer(id) && map.setLayoutProperty(id, "visibility", "none"));
    if (!map.getLayer("geb-klik") && map.getSource("gebouwen")) {
      map.addLayer({ id: "geb-klik", type: "fill", source: "gebouwen", minzoom: 14, paint: { "fill-color": "#000", "fill-opacity": 0.01 } }, "geb-3d");
      map.on("click", "geb-klik", e => { if (tekenen) return; const f = e.features && e.features[0]; if (f) { tab = "ruimte"; openPand(f.properties.id, false); } });
      map.on("mouseenter", "geb-klik", () => { if (!tekenen) map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "geb-klik", () => { map.getCanvas().style.cursor = ""; });
    }
    map.triggerRepaint();
  };
  if (map.getSource && map.getSource("gebouwen")) zet(); else map.on("load", () => setTimeout(zet, 0));
}
if (!zonderBol) drieOpKaart();
function herbouwDrie() { if (map.getLayer && map.getLayer("geb-3d")) { drieLaag.bouw(); map.triggerRepaint(); } }

// Bediening in 3D: draaien per 45°, ronddraaien, kantelen.
let draaien = 0;
function stopRond() { if (draaien) cancelAnimationFrame(draaien); draaien = 0; const b = document.getElementById("d3Rond"); if (b) b.setAttribute("aria-pressed", false); }
function rond() {
  if (draaien) return stopRond();
  const b = document.getElementById("d3Rond"); if (b) b.setAttribute("aria-pressed", true);
  let t0 = performance.now();
  const stap = t => { map.setBearing(map.getBearing() + (t - t0) * 0.012); t0 = t; draaien = requestAnimationFrame(stap); };
  draaien = requestAnimationFrame(stap);
}
function toonBediening(aan) { const el = document.getElementById("d3"); if (el) el.hidden = !aan; if (!aan) stopRond(); }
document.getElementById("d3Links").onclick = () => { stopRond(); map.easeTo({ bearing: map.getBearing() - 45, duration: 500 }); };
document.getElementById("d3Rechts").onclick = () => { stopRond(); map.easeTo({ bearing: map.getBearing() + 45, duration: 500 }); };
document.getElementById("d3Rond").onclick = rond;
document.getElementById("d3Kantel").onclick = () => { stopRond(); map.easeTo({ pitch: map.getPitch() > 30 ? 0 : 60, duration: 500 }); };
document.getElementById("d3Weg").onclick = () => { stopRond(); toonBediening(false); map.easeTo({ pitch: 0, bearing: 0, duration: 600 }); };
["mousedown", "touchstart", "wheel"].forEach(ev => map.on(ev, stopRond));
map.on("pitchend", () => { if (map.getPitch() > 5 && map.getZoom() >= 14) toonBediening(true); });
try { map.setMaxPitch(70); } catch (e) {}
