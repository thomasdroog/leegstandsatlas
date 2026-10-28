# Leegstandatlas

Interactieve wereldbol met leegstaande gebouwen en ruïnes in Plombières, aangeduid in het rood. Klik op een pand voor foto's, Street View, luchtbeelden, grondplannen, 3D-model, geschiedenis en materialen. De teller rechtsboven opent een lijst van alle panden, ook die waarvan de locatie nog niet bekend is.

De site is een statische pagina en draait op GitHub Pages. Er is geen build-stap nodig.

## Structuur

- `index.html`: de pagina (MapLibre GL met globe-weergave).
- `export.html`: A3-export. Kies panden, bekijk het voorbeeld en druk af of bewaar als pdf. De voorpagina is de grijze kaart met de gekozen panden. Per pand volgt een pagina met een satellietbeeld uit de kaart en de vijf beste foto's (veld `uitgelicht` in `data/panden.js`), een pagina met geschiedenis, materialen en extra foto's, en daarna eventueel plannen en historische foto's. De keuze staat in de link (`export.html#panden=id1,id2`).
- `data/panden.js`: alle panden met naam, type, status, adres, coördinaten, geschiedenis en paden naar de beelden. Een pand met `lngLat: null` staat niet op de bol, wel in de lijst en de zoekfunctie.
- `media/<pand-id>/fotos|streetview|luchtbeeld/`: de beelden per pand.
- `data/landen.geojson`, `data/grenzen.geojson`, `tiles/sat/`: ingebouwde reservekaart, alleen gebruikt als de live kaarten niet laden.

## Kaarten

- Kaart: OpenStreetMap, in grijstinten weergegeven. © OpenStreetMap-bijdragers.
- Satelliet: Esri World Imagery. © Esri, Maxar, Earthstar Geographics.
- Reservekaart: Natural Earth (publiek domein).

## Aanleveren via Google Drive

Alles komt uit de gedeelde Drive-map “leegstand”. Elke submap is één pand. Wat erin staat, komt zo op de site:

| In de map van het pand | Op de site |
| --- | --- |
| Document “Coördinaten” met `breedte, lengte` (bv. `50.72319, 5.91306`) | Het pand verschijnt op de bol |
| Document “geschiedenis” | Tabblad Geschiedenis, als korte samenvatting met de bron |
| Eigen foto's (JPG of HEIC van de gsm) | Foto's |
| Schermafbeeldingen van Street View of een luchtbeeld | Street View en Luchtbeeld |
| Submappen “grondplannen”, “3d-model”, “historisch”, “materialen” | De gelijknamige tabbladen |

De site wordt dagelijks bijgewerkt vanuit die map.

## Een pand met de hand toevoegen

1. Zet de beelden in `media/<pand-id>/fotos/` (en eventueel `streetview/`, `luchtbeeld/`).
2. Voeg in `data/panden.js` een blok toe met dezelfde velden als de bestaande panden. Coördinaten staan als `[lengtegraad, breedtegraad]`.
3. Lijsten voor `grondplannen`, `model3d`, `historisch` en `materialen` mogen leeg blijven; het tabblad toont dan dat er nog niets is aangeleverd. `geschiedenis` is optioneel: `{ "tekst": [alinea's], "bronnen": [{ "titel", "url" }] }`.
