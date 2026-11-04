# Leegstandatlas

Interactieve wereldbol met leegstaande gebouwen en ruïnes in Plombières. Elke soort pand heeft een eigen kleur (rood = ruïne, blauw = kasteel, ...); met de legende linksonder kleur je de panden ook volgens hun staat en verberg of toon je groepen. Klik op een pand voor foto's, Street View, luchtbeelden, grondplannen, 3D-model, geschiedenis en materialen. De teller rechtsboven opent een lijst van alle panden, ook die waarvan de locatie nog niet bekend is.

De site is een statische pagina en draait op GitHub Pages. Er is geen build-stap nodig.

## Structuur

- `index.html`: de pagina (MapLibre GL met globe-weergave).
- `export.html`: A3-export. Kies panden, bekijk het voorbeeld en druk af of bewaar als pdf. De voorpagina is de grijze kaart met de gekozen panden. Per pand volgt een pagina met een satellietbeeld uit de kaart en de vijf beste foto's (veld `uitgelicht` in `data/panden.js`), een pagina met geschiedenis, materialen en extra foto's, en daarna eventueel plannen en historische foto's. De keuze staat in de link (`export.html#panden=id1,id2`).
- `data/panden.js`: alle panden met naam, type, status, adres, coördinaten, geschiedenis en paden naar de beelden. Een pand met `lngLat: null` staat niet op de bol, wel in de lijst en de zoekfunctie.
- `media/<pand-id>/fotos|streetview|luchtbeeld/`: de beelden per pand.
- `data/landen.geojson`, `data/grenzen.geojson`, `tiles/sat/`: ingebouwde reservekaart, alleen gebruikt als de live kaarten niet laden.

## Soort en staat

Elk pand in `data/panden.js` heeft een `categorie` (de kleur op de kaart) en een `staat`.

| `categorie` | Op de site | Kleur |
| --- | --- | --- |
| `ruine` | Ruïne | rood |
| `kasteel` | Kasteel of burcht | blauw |
| `religieus` | Klooster, kerk of kapel | paars |
| `hoeve` | Hoeve of landbouw | groen |
| `woning` | Woning of villa | oranje |
| `industrie` | Industrie of bedrijf (fabriek, molen, centrale, garage, winkel) | bruin |
| `spoorweg` | Spoorweg (station, wagons) | blauwgroen |

`staat` is `{ "score": 1-5, "toelichting", "bron" }`: 1 ruïne (ingestort), 2 slecht (dak of structuur zwaar beschadigd), 3 matig (verwaarloosd, structuur intact), 4 redelijk (kleine gebreken), 5 goed (onderhouden of in gebruik). De eerste scores zijn een inschatting op basis van de foto's.

## Aanpassen op de site

In het tabblad Staat van een pand staat de knop “Aanpassen of aanvullen”. Bezoekers kiezen daar de soort, de staat (1 tot 5), een toelichting en een aanvulling.

- Zolang `OPSLAG` in `index.html` leeg is, opent “Opslaan” een vooraf ingevuld voorstel (issue) op GitHub. Daarvoor is een GitHub-account nodig.
- Met een gedeelde opslag wordt een aanpassing meteen bewaard en ziet iedereen ze. Gebruik daarvoor `tools/opslag-apps-script.gs` (een Google Sheet met een klein script; de stappen staan bovenaan in het bestand) en zet de web-app-URL in `const OPSLAG`. Elke aanpassing wordt een rij in de Sheet; een rij wissen maakt ze ongedaan.

## Kaarten

- Kaart: OpenStreetMap, in grijstinten weergegeven. © OpenStreetMap-bijdragers.
- Satelliet: Esri World Imagery. © Esri, Maxar, Earthstar Geographics.
- Oude kaarten (knop “Oude kaarten” onderaan): Ferraris-kaart (1777), Vandermaelen-kaart (1846–1854), Dépôt de la Guerre (1865–1880) en luchtfoto's van 1971, 1978–1990 en 1994–2000. Ze komen live van de Waalse overheid (geoservices.wallonie.be, WalOnMap) en dekken alleen Wallonië. Een schuifbalk regelt hoe sterk de oude kaart over de huidige ligt. © Service public de Wallonie.
- Reservekaart: Natural Earth (publiek domein).

## Aanleveren via Google Drive

Alles komt uit de gedeelde Drive-map “leegstand”. Elke submap is één pand. Wat erin staat, komt zo op de site:

| In de map van het pand | Op de site |
| --- | --- |
| Document “Coördinaten” met `breedte, lengte` (bv. `50.72319, 5.91306`) | Het pand verschijnt op de bol |
| Document “geschiedenis” | Tabblad Geschiedenis, als korte samenvatting met de bron |
| Eigen foto's (JPG of HEIC van de gsm) | Foto's |
| Schermafbeeldingen van Street View of een luchtbeeld | Street View en Luchtbeeld |
| Submap “Plannen” of “grondplannen” (pdf of beeld) | Tabblad Grondplannen, als beeld en als pdf om te openen of te downloaden. Namen, e-mailadressen en telefoonnummers worden er eerst uit gehaald. |
| Submappen “3d-model”, “historisch”, “materialen” | De gelijknamige tabbladen |

De site wordt dagelijks bijgewerkt vanuit die map.

## Een pand met de hand toevoegen

1. Zet de beelden in `media/<pand-id>/fotos/` (en eventueel `streetview/`, `luchtbeeld/`).
2. Voeg in `data/panden.js` een blok toe met dezelfde velden als de bestaande panden, ook `categorie` en `staat`. Coördinaten staan als `[lengtegraad, breedtegraad]`.
3. Lijsten voor `grondplannen`, `model3d`, `historisch` en `materialen` mogen leeg blijven; het tabblad toont dan dat er nog niets is aangeleverd. `geschiedenis` is optioneel: `{ "tekst": [alinea's], "bronnen": [{ "titel", "url" }] }`. Bij plannen geeft `planinfo` per beeld de titel, een kleine versie en de pdf: `{ "<beeld>": { "titel", "klein", "pdf", "grootte" } }`, met `planBron` en `planMaker` voor de bronvermelding.
