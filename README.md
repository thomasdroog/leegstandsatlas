# Leegstandatlas

Interactieve wereldbol met leegstaande gebouwen en ruïnes in Plombières, aangeduid in het rood. Klik op een pand voor foto's, Street View, luchtbeelden, grondplannen, 3D-model, historische foto's en materialen.

De site is een statische pagina en draait op GitHub Pages. Er is geen build-stap nodig.

## Structuur

- `index.html`: de pagina (MapLibre GL met globe-weergave).
- `data/panden.js`: alle panden met naam, type, status, adres, coördinaten en paden naar de beelden.
- `media/<pand-id>/fotos|streetview|luchtbeeld/`: de beelden per pand.
- `data/landen.geojson`, `data/grenzen.geojson`, `tiles/sat/`: ingebouwde reservekaart, alleen gebruikt als de live kaarten niet laden.

## Kaarten

- Kaart: OpenStreetMap, in grijstinten weergegeven. © OpenStreetMap-bijdragers.
- Satelliet: Esri World Imagery. © Esri, Maxar, Earthstar Geographics.
- Reservekaart: Natural Earth (publiek domein).

## Een pand toevoegen

1. Zet de beelden in `media/<pand-id>/fotos/` (en eventueel `streetview/`, `luchtbeeld/`).
2. Voeg in `data/panden.js` een blok toe met dezelfde velden als de bestaande panden. Coördinaten staan als `[lengtegraad, breedtegraad]`.
3. Lijsten voor `grondplannen`, `model3d`, `historisch` en `materialen` mogen leeg blijven; het tabblad toont dan dat er nog niets is aangeleverd.
