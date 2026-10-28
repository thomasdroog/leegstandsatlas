// Panden uit de map "leegstand" (Plombières). Paden zijn relatief aan de hoofdmap van de site.
// lngLat is [lengte, breedte]. Een pand zonder lngLat (null) staat niet op de kaart, maar wel in de lijst en de zoekfunctie.
// geschiedenis: korte samenvatting in eigen woorden van het document "geschiedenis" in de map van het pand, met de bron.
const PANDEN = [
 {
  "id": "brico-jardin",
  "naam": "Brico-Jardin (ex-winkelpand)",
  "type": "handelspand / winkel",
  "status": "leegstaand",
  "gemeente": "Plombières (Blieberg)",
  "lngLat": [
   5.853333,
   50.692222
  ],
  "fotos": [],
  "luchtbeeld": [
   "media/brico-jardin/luchtbeeld/luchtbeeld-01.jpg"
  ],
  "streetview": [
   "media/brico-jardin/streetview/streetview-01.jpg"
  ],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": []
 },
 {
  "id": "gensterbloem-klooster",
  "naam": "Klooster Gensterbloem",
  "type": "klooster / hoevecomplex",
  "status": "leegstaand",
  "adres": "Rue du Mémorial Américain, Plombières",
  "gemeente": "Plombières (Blieberg)",
  "fotosGenomen": "2026-10-22",
  "lngLat": [
   5.907722,
   50.689889
  ],
  "fotos": [
   "media/gensterbloem-klooster/fotos/fotos-01.jpg",
   "media/gensterbloem-klooster/fotos/fotos-02.jpg",
   "media/gensterbloem-klooster/fotos/fotos-03.jpg",
   "media/gensterbloem-klooster/fotos/fotos-04.jpg",
   "media/gensterbloem-klooster/fotos/fotos-05.jpg",
   "media/gensterbloem-klooster/fotos/fotos-06.jpg",
   "media/gensterbloem-klooster/fotos/fotos-07.jpg",
   "media/gensterbloem-klooster/fotos/fotos-08.jpg",
   "media/gensterbloem-klooster/fotos/fotos-09.jpg",
   "media/gensterbloem-klooster/fotos/fotos-10.jpg",
   "media/gensterbloem-klooster/fotos/fotos-11.jpg",
   "media/gensterbloem-klooster/fotos/fotos-12.jpg",
   "media/gensterbloem-klooster/fotos/fotos-13.jpg",
   "media/gensterbloem-klooster/fotos/fotos-14.jpg",
   "media/gensterbloem-klooster/fotos/fotos-15.jpg",
   "media/gensterbloem-klooster/fotos/fotos-16.jpg",
   "media/gensterbloem-klooster/fotos/fotos-17.jpg"
  ],
  "luchtbeeld": [
   "media/gensterbloem-klooster/luchtbeeld/luchtbeeld-01.jpg"
  ],
  "streetview": [],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": [],
  "geschiedenis": {
   "tekst": [
    "In 1875 vestigden Franciscanessen, op de vlucht voor de Kulturkampf in Duitsland, zich in Hombourg op het landgoed van graaf Bourcieu de Montereux. Het domein met bijgebouwen is meer dan een hectare groot. In 1908 liet de eigenaar het na aan de Franciscanessen van de Heilige Familie, die in 1910 een kapel aan Sint-Antonius wijdden.",
    "Na de Eerste Wereldoorlog stopten de zusters met lesgeven en werd het klooster een rusthuis voor ouderen. Verbouwingen konden het afgelegen huis, met plaats voor hoogstens 38 bewoners, niet rendabel houden.",
    "In september 2002 verhuisde de congregatie naar Banneux en werd het pand verkocht aan een particulier. Enkele weken later werd het verwoest door een zware brand. Sindsdien is het een ruïne, naar verluidt door een geschil tussen de eigenaar en de verzekeraar."
   ],
   "bronnen": [
    {
     "titel": "Gensterbloem, La Berwinne",
     "url": "https://vop4600.wixsite.com/la-berwinne/gensterbloem"
    }
   ]
  }
 },
 {
  "id": "kasteel-graaf-streversdorp",
  "naam": "Kasteel Graaf (Streversdorp)",
  "type": "kasteel",
  "status": "leegstaand",
  "adres": "Rue du Château de Graaf, 4850 Plombières",
  "gemeente": "Plombières (Blieberg)",
  "fotosGenomen": "2026-10-22",
  "lngLat": [
   5.9452,
   50.6994
  ],
  "fotos": [
   "media/kasteel-graaf-streversdorp/fotos/fotos-01.jpg",
   "media/kasteel-graaf-streversdorp/fotos/fotos-02.jpg",
   "media/kasteel-graaf-streversdorp/fotos/fotos-03.jpg",
   "media/kasteel-graaf-streversdorp/fotos/fotos-04.jpg",
   "media/kasteel-graaf-streversdorp/fotos/fotos-05.jpg",
   "media/kasteel-graaf-streversdorp/fotos/fotos-06.jpg",
   "media/kasteel-graaf-streversdorp/fotos/fotos-07.jpg",
   "media/kasteel-graaf-streversdorp/fotos/fotos-08.jpg",
   "media/kasteel-graaf-streversdorp/fotos/fotos-09.jpg"
  ],
  "luchtbeeld": [
   "media/kasteel-graaf-streversdorp/luchtbeeld/luchtbeeld-01.jpg"
  ],
  "streetview": [],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": [],
  "geschiedenis": {
   "tekst": [
    "De naam Streversdorp verwijst naar de oudst bekende eigenaar, Goswin van Treversdorp, die in de 14e eeuw als heer van het domein wordt vermeld.",
    "Later kreeg het kasteel nog twee namen: Kasteel Belderbusch, naar de adellijke familie die het eeuwenlang bezat, en Kasteel de Graaf, naar een graventitel die teruggaat op een gebeurtenis in de 18e eeuw."
   ],
   "bronnen": [
    {
     "titel": "Het verhaal van kasteel Streversdorp, KastelenBlog.nl",
     "url": "https://www.kastelenblog.nl/kasteel/kasteel-streversdorp/verhaal"
    }
   ]
  }
 },
 {
  "id": "huis-met-stallen-merckhof",
  "naam": "Leegstaand huis met stallen",
  "type": "woning met stallen (hoeve)",
  "status": "leegstaand",
  "adres": "Merckhof, Plombières",
  "gemeente": "Plombières (Blieberg)",
  "fotosGenomen": "2026-10-22",
  "lngLat": [
   5.88575,
   50.71075
  ],
  "fotos": [
   "media/huis-met-stallen-merckhof/fotos/fotos-01.jpg",
   "media/huis-met-stallen-merckhof/fotos/fotos-02.jpg",
   "media/huis-met-stallen-merckhof/fotos/fotos-03.jpg",
   "media/huis-met-stallen-merckhof/fotos/fotos-04.jpg",
   "media/huis-met-stallen-merckhof/fotos/fotos-05.jpg",
   "media/huis-met-stallen-merckhof/fotos/fotos-06.jpg",
   "media/huis-met-stallen-merckhof/fotos/fotos-07.jpg",
   "media/huis-met-stallen-merckhof/fotos/fotos-08.jpg",
   "media/huis-met-stallen-merckhof/fotos/fotos-09.jpg"
  ],
  "luchtbeeld": [
   "media/huis-met-stallen-merckhof/luchtbeeld/luchtbeeld-01.jpg"
  ],
  "streetview": [
   "media/huis-met-stallen-merckhof/streetview/streetview-01.jpg"
  ],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": []
 },
 {
  "id": "garage-rue-du-cheval-blanc",
  "naam": "Leegstaande garage",
  "type": "garage / tankstation met woning",
  "status": "leegstaand",
  "adres": "Rue du Cheval Blanc (N608), Plombières",
  "gemeente": "Plombières (Blieberg)",
  "lngLat": [
   5.931861,
   50.727667
  ],
  "fotos": [],
  "luchtbeeld": [
   "media/garage-rue-du-cheval-blanc/luchtbeeld/luchtbeeld-01.jpg"
  ],
  "streetview": [
   "media/garage-rue-du-cheval-blanc/streetview/streetview-01.jpg"
  ],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": []
 },
 {
  "id": "villa-montzen",
  "naam": "Villa in Montzen",
  "type": "villa / woning (natuursteen)",
  "status": "leegstaand",
  "adres": "Montzen, Plombières",
  "gemeente": "Plombières (Blieberg)",
  "lngLat": [
   5.961722,
   50.708361
  ],
  "fotos": [],
  "luchtbeeld": [
   "media/villa-montzen/luchtbeeld/luchtbeeld-01.jpg"
  ],
  "streetview": [
   "media/villa-montzen/streetview/streetview-01.jpg",
   "media/villa-montzen/streetview/streetview-02.jpg"
  ],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": []
 },
 {
  "id": "station-montzen",
  "naam": "Station Montzen",
  "type": "stationsgebouw / spoorwegterrein",
  "status": "leegstaand",
  "adres": "Rue de la Gare 85, 4850 Plombières",
  "gemeente": "Plombières (Blieberg)",
  "fotosGenomen": "2026-10-22",
  "lngLat": [
   5.9563,
   50.7204
  ],
  "fotos": [
   "media/station-montzen/fotos/fotos-01.jpg",
   "media/station-montzen/fotos/fotos-02.jpg",
   "media/station-montzen/fotos/fotos-03.jpg",
   "media/station-montzen/fotos/fotos-04.jpg",
   "media/station-montzen/fotos/fotos-05.jpg"
  ],
  "luchtbeeld": [
   "media/station-montzen/luchtbeeld/luchtbeeld-01.jpg"
  ],
  "streetview": [],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": [],
  "geschiedenis": {
   "tekst": [
    "De wijk Montzen-Station ontstond tussen 1914 en 1918, toen spoorlijn 24 werd aangelegd. Vanaf 1919 nam het goederenverkeer sterk toe, onder meer door Duitse leveringen als herstelbetaling voor de oorlogsschade, en de Belgische Staat werkte het rangeerstation af en breidde het uit. In de jaren dertig beleefde het station zijn hoogtepunt.",
    "Het geheel van rangeersporen, kantoren en stelplaats beslaat vandaag ongeveer 80 hectare: 3,5 kilometer lang en 240 meter breed. Voor de oorlog won Montzen meermaals de prijs voor de mooiste bloemenperken van de Belgische stations, de verdienste van één man, Eugène Lemlijn.",
    "De locomotiefstelplaats was altijd klein. Ze werd in 1918 gebouwd en kreeg haar eerste locomotieven in 1922. Van de eerste stationsgebouwen is vandaag niets meer te zien."
   ],
   "bronnen": []
  }
 },
 {
  "id": "verlaten-wagons-station-homburg",
  "naam": "Verlaten wagons Station Homburg",
  "type": "spoorwagons / stationsterrein",
  "status": "verlaten",
  "adres": "Oud station Hombourg (lijn 24), Plombières",
  "gemeente": "Plombières (Blieberg)",
  "fotosGenomen": "2026-10-22",
  "lngLat": [
   5.913063,
   50.723191
  ],
  "fotos": [
   "media/verlaten-wagons-station-homburg/fotos/fotos-01.jpg",
   "media/verlaten-wagons-station-homburg/fotos/fotos-02.jpg",
   "media/verlaten-wagons-station-homburg/fotos/fotos-03.jpg",
   "media/verlaten-wagons-station-homburg/fotos/fotos-04.jpg"
  ],
  "luchtbeeld": [],
  "streetview": [],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": [],
  "geschiedenis": {
   "tekst": [
    "Het oude station van Hombourg ligt aan spoorlijn 24, op een helling buiten de dorpskern. Iets verderop lag van 1902 tot 1920 de halte Merckhof.",
    "Toen nazi-Duitsland in mei 1940 Eupen, Malmedy en Moresnet bij het Reich voegde, kwam de grens tussen Aubel en Hombourg te liggen. Hombourg werd een station van de Duitse Reichsbahn, met een pendeldienst naar Aken via Montzen. Na de oorlog werden de Duitse seinen aangepast aan het Belgische systeem.",
    "Met de laatste trein verdween ook de laatste bediende en werd het station een bijgebouw van Montzen. In januari 1983 werd het gebouw verkocht aan een eigenaar die er een museum over de lijn wilde maken. Hij kocht ook de kilometer spoor tot Montzen, om er af en toe wagons te kunnen ontvangen."
   ],
   "bronnen": [
    {
     "titel": "Het oud station van Hombourg, V.V.V. Drie Grenzen",
     "url": "https://trois-frontieres.be/N/rail_homb.php"
    },
    {
     "titel": "Historypark",
     "url": "https://historypark.be/"
    }
   ]
  }
 },
 {
  "id": "waterkrachtcentrale-plombieres",
  "naam": "Voormalige waterkrachtcentrale",
  "type": "waterkrachtcentrale / industrieel erfgoed",
  "status": "leegstaand",
  "adres": "Rue du Casino 21, 4850 Plombières",
  "gemeente": "Plombières (Blieberg)",
  "lngLat": null,
  "fotos": [
   "media/waterkrachtcentrale-plombieres/fotos/fotos-01.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-02.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-03.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-04.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-05.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-06.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-07.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-08.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-09.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-10.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-11.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-12.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-13.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-14.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-15.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-16.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-17.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-18.jpg",
   "media/waterkrachtcentrale-plombieres/fotos/fotos-19.jpg"
  ],
  "luchtbeeld": [],
  "streetview": [],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": [],
  "geschiedenis": {
   "tekst": [
    "Deze voormalige waterkrachtcentrale is eigendom van de gemeente. Het gebouw dateert uit het industriële tijdperk (19e eeuw) en is nooit gerestaureerd, waardoor het zijn oorspronkelijke karakter heeft behouden.",
    "In de Waalse erfgoedinventaris (IPIC) staat het als voormalig mijnbouwgebouw, later gebruikt als fabriek voor staalwerk: een neoklassiek bakstenen gebouw van één bouwlaag met vijf rondbogen in beide hoofdgevels, grote oculi, sierlijsten, verschillende dichtgemetselde openingen en een leien zadeldak (fiche 63088-INV-0121-01).",
    "Het technische gedeelte van de centrale zit in de kelder. Op de begane grond waren kantoren, die nu niet meer gebruikt worden."
   ],
   "bronnen": [],
   "bronTekst": "Mail van de gemeente Plombières en de IPIC-inventaris"
  }
 },
 {
  "id": "moulins-meyers",
  "naam": "Moulins Meyers",
  "type": "maalderij / industrieel",
  "status": "niet leegstaand",
  "adres": "Gulpen 11, 4852 Plombières",
  "gemeente": "Plombières (Blieberg)",
  "lngLat": null,
  "fotos": [],
  "luchtbeeld": [
   "media/moulins-meyers/luchtbeeld/luchtbeeld-01.jpg"
  ],
  "streetview": [
   "media/moulins-meyers/streetview/streetview-01.jpg",
   "media/moulins-meyers/streetview/streetview-02.jpg"
  ],
  "grondplannen": [],
  "model3d": [],
  "historisch": [],
  "materialen": [],
  "geschiedenis": {
   "tekst": [
    "De molen van Gulpermeule, vlak bij het kruispunt La Bach in Hombourg, wordt al in 1749 vermeld en staat op de Ferrariskaart van 1777 als ‘Gulp Meulen’. Vroeger dreef de Gulp er een waterrad aan. Onder het Ancien Régime was het waarschijnlijk de banmolen van het leengoed Vieljaeren.",
    "Minstens drie generaties Meyers (Guillaume, Guy en Philippe) baatten de molen uit. In de tweede helft van de 20e eeuw koos hij voor bakmeel en werd hij een van de weinige bakmeelmolens van België.",
    "Na een zware overstroming op 28 juli 2012 kampte de molen met financiële problemen. Hij is overgenomen door het nieuwe bedrijf Les Moulins du Val-Dieu, dat er ambachtelijk meel uit duurzame landbouw en korte keten wil blijven malen."
   ],
   "bronnen": [
    {
     "titel": "Le Moulin Meyers de Hombourg, Les Moulins du Val-Dieu",
     "url": "https://lesmoulinsduvaldieu.be/le-moulin-meyers-de-hombourg/"
    }
   ]
  }
 }
];
