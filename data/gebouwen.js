// Oppervlakte, hoogte en mogelijke invullingen per pand (sleutel = id uit panden.js). Tabblad "Oppervlakte & invulling".
// Niet met de hand aanpassen: gemaakt door maak_gebouwen_js.py uit de berekening en de keuze per pand (map leegstand-sync/gebouwen).
// gebouwen: per gebouw de contour ([lengte, breedte], buitenring), oppervlakte (m², grondvlak), maaiveld (m TAW),
//   goot en nok (m boven het maaiveld: 25e en 90e percentiel van de LiDAR-hoogte binnen de contour), mediaan, bron.
//   Optioneel: categorie, verdiepingen (vast aantal), dakverdieping (true/false), ruine (true: geen bruikbare verdiepingen).
// verdiepingHoogte (optioneel): hoogte per verdieping voor de schatting; standaard volgens de soort (zie ruimte.js).
// invullingen: mogelijke nieuwe functies, { titel, uitleg }, als tekst of { nl, fr, en }.
const GEBOUWEN = {
 "brico-jardin": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Winkelhal",
    "dakverdieping": false,
    "oppervlakte": 1149,
    "maaiveld": 213.7,
    "goot": 3.5,
    "mediaan": 4.1,
    "nok": 5.4,
    "bron": "BE.WL.GEOREF.CD9E1E6F-0414-452B-88B3-FF42A630D76A",
    "contour": [
     [
      5.853301,
      50.6923
     ],
     [
      5.853497,
      50.692296
     ],
     [
      5.853696,
      50.692292
     ],
     [
      5.853687,
      50.692009
     ],
     [
      5.853486,
      50.692011
     ],
     [
      5.853487,
      50.692035
     ],
     [
      5.853488,
      50.692057
     ],
     [
      5.853395,
      50.692058
     ],
     [
      5.85329,
      50.69206
     ],
     [
      5.85329,
      50.69209
     ],
     [
      5.853091,
      50.692094
     ],
     [
      5.8531,
      50.692304
     ],
     [
      5.853301,
      50.6923
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Overdekte markt of hoevewinkel",
     "fr": "Marché couvert ou magasin à la ferme",
     "en": "Covered market or farm shop"
    },
    "uitleg": {
     "nl": "Eén grote open hal van ruim 1.100 m² met een parking ervoor: ideaal voor lokale producenten die samen verkopen.",
     "fr": "Une grande halle ouverte de plus de 1 100 m² avec un parking devant : idéale pour des producteurs locaux qui vendent ensemble.",
     "en": "One large open hall of over 1,100 m² with parking in front: ideal for local producers selling together."
    }
   },
   {
    "titel": {
     "nl": "Sport- of klimhal",
     "fr": "Salle de sport ou d'escalade",
     "en": "Sports or climbing hall"
    },
    "uitleg": {
     "nl": "De vrije overspanning laat sporten toe waarvoor je weinig binnenmuren nodig hebt (padel, bouldering, turnen).",
     "fr": "La grande portée libre convient aux sports qui demandent peu de murs intérieurs (padel, bloc, gymnastique).",
     "en": "The free span suits sports that need few inner walls (padel, bouldering, gymnastics)."
    }
   },
   {
    "titel": {
     "nl": "Werkplaatsen en opslag voor makers",
     "fr": "Ateliers et stockage pour artisans",
     "en": "Workshops and storage for makers"
    },
    "uitleg": {
     "nl": "De hal is op te delen in kleine units voor ambachtslui of een repair café, met gedeelde laad- en loszone.",
     "fr": "La halle peut être divisée en petites unités pour artisans ou un repair café, avec une zone de chargement commune.",
     "en": "The hall can be split into small units for craftspeople or a repair café, with a shared loading area."
    }
   }
  ]
 },
 "gensterbloem-klooster": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "verdiepingHoogte": 3.0,
  "gebouwen": [
   {
    "naam": "Kloostergebouw",
    "oppervlakte": 366,
    "maaiveld": 318.3,
    "goot": 6.0,
    "mediaan": 7.1,
    "nok": 9.3,
    "bron": "BE.WL.GEOREF.DA3327EC-FE20-4659-84D5-1706E589F073",
    "contour": [
     [
      5.907672,
      50.690119
     ],
     [
      5.907609,
      50.690043
     ],
     [
      5.907604,
      50.690045
     ],
     [
      5.907596,
      50.690036
     ],
     [
      5.907513,
      50.689935
     ],
     [
      5.907517,
      50.689933
     ],
     [
      5.907418,
      50.689831
     ],
     [
      5.907407,
      50.689834
     ],
     [
      5.90729,
      50.689879
     ],
     [
      5.907329,
      50.689919
     ],
     [
      5.907389,
      50.68998
     ],
     [
      5.907555,
      50.690159
     ],
     [
      5.907672,
      50.690119
     ]
    ]
   },
   {
    "naam": "Kapel",
    "categorie": "religieus",
    "verdiepingen": 1,
    "dakverdieping": false,
    "oppervlakte": 165,
    "maaiveld": 318.7,
    "goot": 8.6,
    "mediaan": 10.1,
    "nok": 12.8,
    "bron": "BE.WL.GEOREF.1E8C5F81-BD1E-40C3-9857-B70FCA74ADAD",
    "contour": [
     [
      5.907666,
      50.689749
     ],
     [
      5.907668,
      50.689748
     ],
     [
      5.907686,
      50.689712
     ],
     [
      5.907688,
      50.689708
     ],
     [
      5.907641,
      50.689675
     ],
     [
      5.907573,
      50.689687
     ],
     [
      5.907434,
      50.689773
     ],
     [
      5.907502,
      50.689818
     ],
     [
      5.90753,
      50.689837
     ],
     [
      5.907666,
      50.689749
     ]
    ]
   },
   {
    "naam": "Hoevevleugel",
    "categorie": "hoeve",
    "oppervlakte": 387,
    "maaiveld": 317.6,
    "goot": 8.0,
    "mediaan": 8.7,
    "nok": 9.9,
    "bron": "BE.WL.GEOREF.762FE3E3-38AD-475D-8CBB-73FD18C0DB8C",
    "contour": [
     [
      5.908151,
      50.690133
     ],
     [
      5.908077,
      50.690056
     ],
     [
      5.908007,
      50.689984
     ],
     [
      5.907786,
      50.690071
     ],
     [
      5.907726,
      50.690003
     ],
     [
      5.907609,
      50.690043
     ],
     [
      5.907672,
      50.690119
     ],
     [
      5.907719,
      50.690103
     ],
     [
      5.907783,
      50.69017
     ],
     [
      5.907952,
      50.690103
     ],
     [
      5.907989,
      50.690089
     ],
     [
      5.908064,
      50.690169
     ],
     [
      5.908151,
      50.690133
     ]
    ]
   },
   {
    "naam": "Bijgebouw 1",
    "dakverdieping": false,
    "oppervlakte": 68,
    "maaiveld": 317.6,
    "goot": 4.4,
    "mediaan": 9.0,
    "nok": 11.8,
    "bron": "BE.WL.GEOREF.C9F85FD5-9918-46D8-9F08-2B96483244C4",
    "contour": [
     [
      5.908007,
      50.689984
     ],
     [
      5.907991,
      50.689968
     ],
     [
      5.907911,
      50.689997
     ],
     [
      5.907788,
      50.690044
     ],
     [
      5.90774,
      50.689985
     ],
     [
      5.907596,
      50.690036
     ],
     [
      5.907604,
      50.690045
     ],
     [
      5.907609,
      50.690043
     ],
     [
      5.907726,
      50.690003
     ],
     [
      5.907786,
      50.690071
     ],
     [
      5.908007,
      50.689984
     ]
    ]
   },
   {
    "naam": "Bijgebouw 2",
    "oppervlakte": 78,
    "maaiveld": 318.7,
    "goot": 3.2,
    "mediaan": 3.4,
    "nok": 4.9,
    "bron": "BE.WL.GEOREF.6374F001-37BE-40CC-86F8-40F4061C934B",
    "contour": [
     [
      5.907559,
      50.689914
     ],
     [
      5.907479,
      50.689831
     ],
     [
      5.907502,
      50.689818
     ],
     [
      5.907434,
      50.689773
     ],
     [
      5.90737,
      50.689813
     ],
     [
      5.907407,
      50.689834
     ],
     [
      5.907418,
      50.689831
     ],
     [
      5.907517,
      50.689933
     ],
     [
      5.907559,
      50.689914
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Retraite- en vormingshuis",
     "fr": "Maison de retraite spirituelle et de formation",
     "en": "Retreat and training centre"
    },
    "uitleg": {
     "nl": "De kloosterindeling met cellen en een kapel past bij een plek voor stilte, workshops of schrijversresidenties.",
     "fr": "Le plan conventuel avec cellules et chapelle convient à un lieu de silence, d'ateliers ou de résidences d'écriture.",
     "en": "The convent layout with cells and a chapel suits a place for silence, workshops or writers' residencies."
    }
   },
   {
    "titel": {
     "nl": "Zorgwonen of kleinschalig cohousing",
     "fr": "Habitat accompagné ou cohabitat",
     "en": "Supported living or small cohousing"
    },
    "uitleg": {
     "nl": "Het was tot 2002 een rusthuis voor 38 bewoners; met gedeelde ruimtes in de hoevevleugel kan dat opnieuw.",
     "fr": "Jusqu'en 2002, c'était une maison de repos pour 38 résidents ; avec des espaces communs dans l'aile agricole, c'est à nouveau possible.",
     "en": "Until 2002 it was a care home for 38 residents; with shared rooms in the farm wing that could work again."
    }
   },
   {
    "titel": {
     "nl": "Kapel als gemeenschapszaal",
     "fr": "Chapelle comme salle communautaire",
     "en": "Chapel as community hall"
    },
    "uitleg": {
     "nl": "De hoge kapelruimte (± 165 m²) leent zich voor concerten, lezingen of feesten voor het dorp.",
     "fr": "Le volume élevé de la chapelle (± 165 m²) se prête aux concerts, conférences ou fêtes de village.",
     "en": "The tall chapel space (± 165 m²) lends itself to concerts, talks or village events."
    }
   }
  ]
 },
 "kasteel-graaf-streversdorp": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Kasteel",
    "categorie": "kasteel",
    "oppervlakte": 527,
    "maaiveld": 228.7,
    "goot": 11.4,
    "mediaan": 12.6,
    "nok": 17.0,
    "bron": "BE.WL.GEOREF.BC7E9041-97E3-4F38-B808-B0E28708AD96",
    "contour": [
     [
      5.944828,
      50.699662
     ],
     [
      5.944897,
      50.699577
     ],
     [
      5.944922,
      50.699546
     ],
     [
      5.944845,
      50.699521
     ],
     [
      5.944822,
      50.699551
     ],
     [
      5.944779,
      50.699538
     ],
     [
      5.944593,
      50.699476
     ],
     [
      5.944595,
      50.69947
     ],
     [
      5.944588,
      50.699454
     ],
     [
      5.944575,
      50.699445
     ],
     [
      5.944553,
      50.699439
     ],
     [
      5.944526,
      50.69944
     ],
     [
      5.944514,
      50.699445
     ],
     [
      5.944503,
      50.699457
     ],
     [
      5.9445,
      50.699467
     ],
     [
      5.944505,
      50.699479
     ],
     [
      5.944513,
      50.699486
     ],
     [
      5.944513,
      50.699489
     ],
     [
      5.944458,
      50.699559
     ],
     [
      5.944449,
      50.699558
     ],
     [
      5.944437,
      50.699558
     ],
     [
      5.944424,
      50.69956
     ],
     [
      5.944413,
      50.699565
     ],
     [
      5.944404,
      50.699571
     ],
     [
      5.944397,
      50.699581
     ],
     [
      5.944396,
      50.699588
     ],
     [
      5.9444,
      50.699599
     ],
     [
      5.944408,
      50.699609
     ],
     [
      5.944424,
      50.699615
     ],
     [
      5.944442,
      50.699617
     ],
     [
      5.944458,
      50.699616
     ],
     [
      5.944471,
      50.699612
     ],
     [
      5.944477,
      50.699608
     ],
     [
      5.944531,
      50.699627
     ],
     [
      5.944783,
      50.699718
     ],
     [
      5.944828,
      50.699662
     ]
    ]
   },
   {
    "naam": "Ruïne 1",
    "categorie": "ruine",
    "ruine": true,
    "oppervlakte": 62,
    "maaiveld": 229.3,
    "goot": 5.9,
    "mediaan": 6.7,
    "nok": 8.2,
    "bron": "BE.WL.GEOREF.E1A34899-ED90-4397-A356-E0726AABA55D",
    "contour": [
     [
      5.945096,
      50.699312
     ],
     [
      5.945055,
      50.699367
     ],
     [
      5.945147,
      50.699395
     ],
     [
      5.945196,
      50.699397
     ],
     [
      5.945217,
      50.699369
     ],
     [
      5.945189,
      50.699347
     ],
     [
      5.9451,
      50.699313
     ],
     [
      5.945096,
      50.699312
     ]
    ]
   }
  ],
  "opmerking": {
   "nl": "Ruïne 2 staat niet in het PICC en heeft dus geen contour.",
   "fr": "La ruine 2 n'est pas reprise au PICC et n'a donc pas de contour.",
   "en": "Ruin 2 is not in the PICC and therefore has no outline."
  },
  "invullingen": [
   {
    "titel": {
     "nl": "Kasteelhotel of gastenkamers",
     "fr": "Hôtel-château ou chambres d'hôtes",
     "en": "Castle hotel or guest rooms"
    },
    "uitleg": {
     "nl": "Drie bouwlagen plus zolder geven ruimte voor een tiental kamers; het verwilderde domein wordt de tuin.",
     "fr": "Trois niveaux plus les combles offrent la place pour une dizaine de chambres ; le domaine devient le jardin.",
     "en": "Three floors plus attic leave room for about ten rooms; the overgrown estate becomes the garden."
    }
   },
   {
    "titel": {
     "nl": "Trouw- en feestlocatie",
     "fr": "Lieu de mariages et de fêtes",
     "en": "Wedding and event venue"
    },
    "uitleg": {
     "nl": "Salons op het gelijkvloers voor ontvangsten, de ruïnes als decor voor ceremonies buiten.",
     "fr": "Salons au rez-de-chaussée pour les réceptions, les ruines comme décor pour les cérémonies en plein air.",
     "en": "Ground-floor salons for receptions, the ruins as a backdrop for outdoor ceremonies."
    }
   },
   {
    "titel": {
     "nl": "Erfgoedcentrum met wandelroute",
     "fr": "Centre du patrimoine avec promenade",
     "en": "Heritage centre with walking route"
    },
    "uitleg": {
     "nl": "De geschiedenis van Streversdorp/Belderbusch vertellen, met een pad langs de ruïnes.",
     "fr": "Raconter l'histoire de Streversdorp/Belderbusch, avec un sentier le long des ruines.",
     "en": "Telling the story of Streversdorp/Belderbusch, with a path along the ruins."
    }
   }
  ]
 },
 "huis-met-stallen-merckhof": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Woonhuis",
    "categorie": "woning",
    "oppervlakte": 347,
    "maaiveld": 284.2,
    "goot": 5.6,
    "mediaan": 6.7,
    "nok": 8.9,
    "bron": "BE.WL.GEOREF.9620B6B0-9B9A-4639-9107-7EF6E0976AD5",
    "contour": [
     [
      5.885553,
      50.710742
     ],
     [
      5.885599,
      50.710711
     ],
     [
      5.885518,
      50.710661
     ],
     [
      5.885505,
      50.71067
     ],
     [
      5.885406,
      50.710609
     ],
     [
      5.88541,
      50.710607
     ],
     [
      5.885338,
      50.710565
     ],
     [
      5.885331,
      50.710569
     ],
     [
      5.885296,
      50.710552
     ],
     [
      5.885205,
      50.710618
     ],
     [
      5.885299,
      50.710669
     ],
     [
      5.885278,
      50.710686
     ],
     [
      5.885317,
      50.710708
     ],
     [
      5.885305,
      50.710719
     ],
     [
      5.885343,
      50.71074
     ],
     [
      5.885355,
      50.710733
     ],
     [
      5.885377,
      50.710745
     ],
     [
      5.885389,
      50.710751
     ],
     [
      5.885376,
      50.710762
     ],
     [
      5.885456,
      50.710808
     ],
     [
      5.885553,
      50.710742
     ]
    ]
   },
   {
    "naam": "Stallen",
    "categorie": "hoeve",
    "dakverdieping": false,
    "oppervlakte": 197,
    "maaiveld": 283.6,
    "goot": 2.3,
    "mediaan": 2.7,
    "nok": 3.5,
    "bron": "BE.WL.GEOREF.35590AA9-77EE-472D-B950-E26168948F13",
    "contour": [
     [
      5.885965,
      50.710922
     ],
     [
      5.885908,
      50.710884
     ],
     [
      5.885721,
      50.710752
     ],
     [
      5.885661,
      50.710787
     ],
     [
      5.885764,
      50.710859
     ],
     [
      5.885725,
      50.710881
     ],
     [
      5.885812,
      50.710939
     ],
     [
      5.88587,
      50.710978
     ],
     [
      5.885965,
      50.710922
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Woning met atelier",
     "fr": "Habitation avec atelier",
     "en": "House with studio"
    },
    "uitleg": {
     "nl": "Het woonhuis opnieuw bewonen en de lage stallen (± 200 m²) ombouwen tot atelier of werkplaats.",
     "fr": "Réhabiter la maison et transformer les étables basses (± 200 m²) en atelier.",
     "en": "Live in the house again and turn the low stables (± 200 m²) into a studio or workshop."
    }
   },
   {
    "titel": {
     "nl": "Vakantiewoning of gîte",
     "fr": "Gîte rural",
     "en": "Holiday cottage"
    },
    "uitleg": {
     "nl": "Landelijke ligging; de stallen kunnen een tweede, kleinere gîte of een gemeenschappelijke ruimte worden.",
     "fr": "Situation rurale ; les étables peuvent devenir un second gîte plus petit ou un espace commun.",
     "en": "Rural setting; the stables can become a second, smaller cottage or a shared room."
    }
   },
   {
    "titel": {
     "nl": "Kleinschalige zorgboerderij",
     "fr": "Petite ferme thérapeutique",
     "en": "Small care farm"
    },
    "uitleg": {
     "nl": "Dieren en moestuin in en rond de stallen, met dagopvang in het woonhuis.",
     "fr": "Animaux et potager dans et autour des étables, accueil de jour dans la maison.",
     "en": "Animals and a vegetable garden in and around the stables, day care in the house."
    }
   }
  ]
 },
 "garage-rue-du-cheval-blanc": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Garage / tankstation",
    "dakverdieping": false,
    "oppervlakte": 90,
    "maaiveld": 215.0,
    "goot": 4.0,
    "mediaan": 4.1,
    "nok": 4.5,
    "bron": "BE.WL.GEOREF.8D08F37E-F6F1-4223-AA36-FF32B46B7D1B",
    "contour": [
     [
      5.931986,
      50.727711
     ],
     [
      5.931859,
      50.727629
     ],
     [
      5.931788,
      50.727672
     ],
     [
      5.931872,
      50.727728
     ],
     [
      5.931906,
      50.72775
     ],
     [
      5.931913,
      50.727755
     ],
     [
      5.931986,
      50.727711
     ]
    ]
   },
   {
    "naam": "Werkplaats",
    "dakverdieping": false,
    "oppervlakte": 373,
    "maaiveld": 214.8,
    "goot": 6.0,
    "mediaan": 6.8,
    "nok": 7.9,
    "bron": "BE.WL.GEOREF.26A1058A-9CB7-44A4-A45A-4D965FEF6576",
    "contour": [
     [
      5.932293,
      50.727604
     ],
     [
      5.932286,
      50.727599
     ],
     [
      5.93224,
      50.727569
     ],
     [
      5.932177,
      50.727528
     ],
     [
      5.931868,
      50.727624
     ],
     [
      5.931859,
      50.727629
     ],
     [
      5.931986,
      50.727711
     ],
     [
      5.932054,
      50.727751
     ],
     [
      5.932293,
      50.727604
     ]
    ]
   },
   {
    "naam": "Woning",
    "categorie": "woning",
    "oppervlakte": 291,
    "maaiveld": 214.7,
    "goot": 3.5,
    "mediaan": 4.1,
    "nok": 5.5,
    "bron": "BE.WL.GEOREF.A0CB8804-A567-46A8-ADAA-B4FE18CA3985",
    "contour": [
     [
      5.931612,
      50.727853
     ],
     [
      5.931634,
      50.727842
     ],
     [
      5.931647,
      50.727841
     ],
     [
      5.93166,
      50.727845
     ],
     [
      5.931667,
      50.727842
     ],
     [
      5.931771,
      50.727773
     ],
     [
      5.931783,
      50.727781
     ],
     [
      5.93183,
      50.727753
     ],
     [
      5.931872,
      50.727728
     ],
     [
      5.931788,
      50.727672
     ],
     [
      5.931762,
      50.727656
     ],
     [
      5.931757,
      50.727658
     ],
     [
      5.931511,
      50.727733
     ],
     [
      5.931577,
      50.727778
     ],
     [
      5.931567,
      50.727783
     ],
     [
      5.931574,
      50.727793
     ],
     [
      5.931574,
      50.727802
     ],
     [
      5.931554,
      50.727819
     ],
     [
      5.931551,
      50.727825
     ],
     [
      5.931554,
      50.727831
     ],
     [
      5.931592,
      50.727856
     ],
     [
      5.931602,
      50.727856
     ],
     [
      5.931612,
      50.727853
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Fietspunt langs de N608",
     "fr": "Point vélo le long de la N608",
     "en": "Cycle hub on the N608"
    },
    "uitleg": {
     "nl": "Het voormalige tankstation als herstelpunt en café voor fietsers, met de werkplaats als fietsenstalling.",
     "fr": "L'ancienne station-service comme atelier de réparation et café pour cyclistes, l'atelier comme parking vélos.",
     "en": "The former filling station as a repair point and café for cyclists, with the workshop as bike storage."
    }
   },
   {
    "titel": {
     "nl": "Laadstation met buurtwinkel",
     "fr": "Borne de recharge avec épicerie",
     "en": "Charging station with local shop"
    },
    "uitleg": {
     "nl": "Op dezelfde plek blijven tanken, maar dan elektrisch, met een kleine winkel in het gebouw.",
     "fr": "Continuer à faire le plein au même endroit, mais en électrique, avec une petite épicerie.",
     "en": "Keep refuelling on the same spot, but electric, with a small shop in the building."
    }
   },
   {
    "titel": {
     "nl": "Werkwoning",
     "fr": "Habitation avec atelier",
     "en": "Live-work unit"
    },
    "uitleg": {
     "nl": "Wonen in de woning, werken in de werkplaats van ± 370 m² (schrijnwerker, garage voor oldtimers).",
     "fr": "Habiter la maison, travailler dans l'atelier de ± 370 m² (menuisier, garage d'ancêtres).",
     "en": "Live in the house, work in the ± 370 m² workshop (joiner, classic-car garage)."
    }
   }
  ]
 },
 "villa-montzen": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Villa",
    "categorie": "woning",
    "oppervlakte": 205,
    "maaiveld": 216.0,
    "goot": 6.6,
    "mediaan": 8.0,
    "nok": 11.2,
    "bron": "BE.WL.GEOREF.2E42F557-0AAF-4703-ADBC-84EF4F4CA13B",
    "contour": [
     [
      5.961747,
      50.708428
     ],
     [
      5.961723,
      50.708431
     ],
     [
      5.961723,
      50.708432
     ],
     [
      5.961729,
      50.708454
     ],
     [
      5.961731,
      50.708462
     ],
     [
      5.961755,
      50.70846
     ],
     [
      5.961833,
      50.708452
     ],
     [
      5.961825,
      50.708422
     ],
     [
      5.961843,
      50.70842
     ],
     [
      5.961842,
      50.708418
     ],
     [
      5.961833,
      50.708382
     ],
     [
      5.961847,
      50.708381
     ],
     [
      5.961804,
      50.708212
     ],
     [
      5.96179,
      50.708213
     ],
     [
      5.961772,
      50.708215
     ],
     [
      5.961693,
      50.708223
     ],
     [
      5.961707,
      50.708279
     ],
     [
      5.961713,
      50.708299
     ],
     [
      5.961723,
      50.708333
     ],
     [
      5.961738,
      50.708392
     ],
     [
      5.961747,
      50.708428
     ]
    ]
   },
   {
    "naam": "Aanbouw",
    "categorie": "woning",
    "dakverdieping": false,
    "oppervlakte": 115,
    "maaiveld": 216.1,
    "goot": 3.3,
    "mediaan": 3.3,
    "nok": 3.6,
    "bron": "BE.WL.GEOREF.73A7A8F1-5849-47DE-96D3-3EBB352E76A3",
    "contour": [
     [
      5.961546,
      50.708351
     ],
     [
      5.961551,
      50.708371
     ],
     [
      5.961692,
      50.708357
     ],
     [
      5.961687,
      50.708337
     ],
     [
      5.961723,
      50.708333
     ],
     [
      5.961717,
      50.708313
     ],
     [
      5.961714,
      50.708302
     ],
     [
      5.961714,
      50.708302
     ],
     [
      5.961708,
      50.708284
     ],
     [
      5.961707,
      50.708279
     ],
     [
      5.961673,
      50.708283
     ],
     [
      5.961673,
      50.708283
     ],
     [
      5.961641,
      50.708268
     ],
     [
      5.961559,
      50.708276
     ],
     [
      5.961532,
      50.708296
     ],
     [
      5.961532,
      50.708297
     ],
     [
      5.961546,
      50.708351
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Opnieuw bewonen, opgedeeld",
     "fr": "Réhabiter, en appartements",
     "en": "Lived in again, split up"
    },
    "uitleg": {
     "nl": "Twee bouwlagen plus zolder: genoeg voor twee of drie appartementen zonder de gevel aan te tasten.",
     "fr": "Deux niveaux plus combles : assez pour deux ou trois appartements sans toucher à la façade.",
     "en": "Two floors plus attic: enough for two or three flats without altering the facade."
    }
   },
   {
    "titel": {
     "nl": "Praktijkhuis",
     "fr": "Maison médicale",
     "en": "Practice house"
    },
    "uitleg": {
     "nl": "Groepspraktijk of kinderopvang dicht bij het centrum van Montzen.",
     "fr": "Cabinet de groupe ou crèche près du centre de Montzen.",
     "en": "Group practice or childcare close to the centre of Montzen."
    }
   },
   {
    "titel": {
     "nl": "Bed and breakfast",
     "fr": "Chambres d'hôtes",
     "en": "Bed and breakfast"
    },
    "uitleg": {
     "nl": "De natuurstenen villa als karaktervolle gastenkamers, de aanbouw als ontbijtruimte.",
     "fr": "La villa en pierre comme chambres de caractère, l'annexe comme salle de petit-déjeuner.",
     "en": "The stone villa as characterful guest rooms, the extension as breakfast room."
    }
   }
  ]
 },
 "station-montzen": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Spoorhal",
    "categorie": "spoorweg",
    "dakverdieping": false,
    "oppervlakte": 12115,
    "maaiveld": 213.3,
    "goot": 5.3,
    "mediaan": 6.4,
    "nok": 8.8,
    "bron": "BE.WL.GEOREF.DFD53315-95F1-4450-87A0-3329868DA1AE",
    "contour": [
     [
      5.956389,
      50.7205
     ],
     [
      5.956359,
      50.720463
     ],
     [
      5.956454,
      50.72043
     ],
     [
      5.956445,
      50.72042
     ],
     [
      5.956432,
      50.720406
     ],
     [
      5.956631,
      50.72034
     ],
     [
      5.956696,
      50.720418
     ],
     [
      5.959709,
      50.719405
     ],
     [
      5.959418,
      50.719054
     ],
     [
      5.955906,
      50.720236
     ],
     [
      5.956133,
      50.720506
     ],
     [
      5.956185,
      50.720568
     ],
     [
      5.956389,
      50.7205
     ]
    ]
   }
  ],
  "opmerking": {
   "nl": "Het PICC tekent de hal als één grote contour van ruim 12.000 m²; mogelijk zitten daar ook overkappingen in.",
   "fr": "Le PICC dessine la halle comme un seul grand contour de plus de 12 000 m² ; des auvents y sont peut-être inclus.",
   "en": "The PICC draws the hall as one large outline of over 12,000 m²; canopies may be included."
  },
  "invullingen": [
   {
    "titel": {
     "nl": "Overdekt park of evenementenhal",
     "fr": "Parc couvert ou halle événementielle",
     "en": "Covered park or event hall"
    },
    "uitleg": {
     "nl": "De open structuur laten staan zonder glas: een overdekte buitenruimte voor markten, festivals of skaten.",
     "fr": "Garder la structure ouverte sans vitrage : un espace extérieur couvert pour marchés, festivals ou skate.",
     "en": "Keep the open structure without glass: a covered outdoor space for markets, festivals or skating."
    }
   },
   {
    "titel": {
     "nl": "Spoorwegmuseum en werkplaats",
     "fr": "Musée du rail et atelier",
     "en": "Railway museum and workshop"
    },
    "uitleg": {
     "nl": "Montzen was een groot rangeerstation; de hal is groot genoeg voor locomotieven en een restauratieatelier.",
     "fr": "Montzen était une grande gare de triage ; la halle est assez grande pour des locomotives et un atelier de restauration.",
     "en": "Montzen was a major marshalling yard; the hall is large enough for locomotives and a restoration shop."
    }
   },
   {
    "titel": {
     "nl": "Logistiek of circulaire bouwhub",
     "fr": "Logistique ou hub de réemploi",
     "en": "Logistics or reuse hub"
    },
    "uitleg": {
     "nl": "Aan het spoor: opslag en verdeling van herbruikbare bouwmaterialen voor de streek.",
     "fr": "Le long du rail : stockage et distribution de matériaux de réemploi pour la région.",
     "en": "On the railway: storage and distribution of reclaimed building materials for the region."
    }
   }
  ]
 },
 "verlaten-wagons-station-homburg": {
  "gebouwen": [],
  "opmerking": {
   "nl": "Spoorwagons, geen gebouw: er is geen contour of vloeroppervlakte om te berekenen.",
   "fr": "Des wagons, pas un bâtiment : il n'y a ni contour ni surface de plancher à calculer.",
   "en": "Railway wagons, not a building: there is no outline or floor area to calculate."
  },
  "invullingen": [
   {
    "titel": {
     "nl": "Wagons als tiny houses of trekkershutten",
     "fr": "Wagons en tiny houses ou refuges",
     "en": "Wagons as tiny houses or hikers' huts"
    },
    "uitleg": {
     "nl": "Opgeknapte wagons op het oude stationsterrein kunnen overnachting bieden aan wandelaars en fietsers.",
     "fr": "Des wagons rénovés sur l'ancien site de la gare peuvent héberger randonneurs et cyclistes.",
     "en": "Refurbished wagons on the old station site could host walkers and cyclists overnight."
    }
   },
   {
    "titel": {
     "nl": "Pop-upcafé of expo op het spoor",
     "fr": "Café éphémère ou expo sur rails",
     "en": "Pop-up café or exhibition on the rails"
    },
    "uitleg": {
     "nl": "Eén wagon als bar, een andere als tentoonstelling over de geschiedenis van station Homburg.",
     "fr": "Un wagon comme bar, un autre comme exposition sur l'histoire de la gare de Hombourg.",
     "en": "One wagon as a bar, another as an exhibition on the history of Hombourg station."
    }
   }
  ]
 },
 "waterkrachtcentrale-plombieres": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Centrale",
    "categorie": "industrie",
    "dakverdieping": false,
    "oppervlakte": 601,
    "maaiveld": 147.2,
    "goot": 4.3,
    "mediaan": 7.8,
    "nok": 9.3,
    "bron": "BE.WL.GEOREF.BDD7D755-9A75-42A0-B9B6-039824DA12E2",
    "contour": [
     [
      5.963584,
      50.737423
     ],
     [
      5.963591,
      50.737421
     ],
     [
      5.963589,
      50.737418
     ],
     [
      5.963438,
      50.737163
     ],
     [
      5.963435,
      50.737159
     ],
     [
      5.963181,
      50.737221
     ],
     [
      5.963331,
      50.737481
     ],
     [
      5.963584,
      50.737423
     ]
    ]
   }
  ],
  "opmerking": {
   "nl": "De plek van dit pand is geschat uit het adres. De contour is die van het industriegebouw in de buurt dat het best past bij de beschrijving (één hoge bouwlaag met zadeldak); kijk dit na.",
   "fr": "L'emplacement est estimé à partir de l'adresse. Le contour est celui du bâtiment industriel voisin qui correspond le mieux à la description ; à vérifier.",
   "en": "The location was estimated from the address. The outline is that of the nearby industrial building that best fits the description; please check."
  },
  "invullingen": [
   {
    "titel": {
     "nl": "Opnieuw stroom maken, met bezoekerscentrum",
     "fr": "Produire à nouveau de l'électricité, avec centre d'accueil",
     "en": "Generate power again, with a visitor centre"
    },
    "uitleg": {
     "nl": "Een nieuwe kleine turbine in de kelder en uitleg over waterkracht in de hal erboven.",
     "fr": "Une nouvelle petite turbine au sous-sol et une exposition sur l'hydroélectricité au-dessus.",
     "en": "A new small turbine in the basement and an exhibition on hydropower in the hall above."
    }
   },
   {
    "titel": {
     "nl": "Brouwerij of ambachtelijke productie",
     "fr": "Brasserie ou production artisanale",
     "en": "Brewery or craft production"
    },
    "uitleg": {
     "nl": "Eén hoge ruimte van ± 600 m² met rondboogramen: plaats voor ketels en een proeflokaal.",
     "fr": "Un grand volume de ± 600 m² avec fenêtres en plein cintre : place pour des cuves et une salle de dégustation.",
     "en": "One tall space of ± 600 m² with arched windows: room for vats and a tasting room."
    }
   },
   {
    "titel": {
     "nl": "Repetitie- en cultuurruimte",
     "fr": "Lieu de répétition et de culture",
     "en": "Rehearsal and culture space"
    },
    "uitleg": {
     "nl": "De gemeente is eigenaar; een open hal voor muziek, theater of tentoonstellingen.",
     "fr": "La commune est propriétaire ; une halle ouverte pour musique, théâtre ou expositions.",
     "en": "The municipality owns it; an open hall for music, theatre or exhibitions."
    }
   }
  ]
 },
 "moulins-meyers": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "verdiepingHoogte": 3.2,
  "gebouwen": [
   {
    "naam": "Molenhuis",
    "oppervlakte": 151,
    "maaiveld": 214.7,
    "goot": 6.9,
    "mediaan": 7.7,
    "nok": 8.8,
    "bron": "BE.WL.GEOREF.D78197BB-A76B-4640-BBFC-9E2F1EDB29BC",
    "contour": [
     [
      5.914765,
      50.715415
     ],
     [
      5.914683,
      50.715365
     ],
     [
      5.914559,
      50.715312
     ],
     [
      5.914494,
      50.715372
     ],
     [
      5.914608,
      50.715421
     ],
     [
      5.914603,
      50.715427
     ],
     [
      5.914678,
      50.715468
     ],
     [
      5.914686,
      50.71547
     ],
     [
      5.914765,
      50.715415
     ]
    ]
   },
   {
    "naam": "Maalderij",
    "oppervlakte": 289,
    "maaiveld": 214.5,
    "goot": 8.1,
    "mediaan": 9.8,
    "nok": 17.4,
    "bron": "BE.WL.GEOREF.58E5B275-60DD-4A74-B3CA-2E1A1BD4A291",
    "contour": [
     [
      5.914934,
      50.715363
     ],
     [
      5.914955,
      50.715347
     ],
     [
      5.915022,
      50.7153
     ],
     [
      5.914958,
      50.715262
     ],
     [
      5.914954,
      50.715259
     ],
     [
      5.914885,
      50.715219
     ],
     [
      5.91482,
      50.715267
     ],
     [
      5.914746,
      50.715321
     ],
     [
      5.914724,
      50.715308
     ],
     [
      5.914704,
      50.715323
     ],
     [
      5.914727,
      50.715337
     ],
     [
      5.914683,
      50.715365
     ],
     [
      5.914765,
      50.715415
     ],
     [
      5.914816,
      50.715446
     ],
     [
      5.914934,
      50.715363
     ]
    ]
   },
   {
    "naam": "Loods",
    "dakverdieping": false,
    "oppervlakte": 386,
    "maaiveld": 214.8,
    "goot": 4.9,
    "mediaan": 5.8,
    "nok": 7.3,
    "bron": "BE.WL.GEOREF.A7C8A83D-981B-419B-86D7-2AFBE2B540AA",
    "contour": [
     [
      5.914665,
      50.715232
     ],
     [
      5.914712,
      50.715239
     ],
     [
      5.914723,
      50.715208
     ],
     [
      5.914768,
      50.715214
     ],
     [
      5.914786,
      50.715163
     ],
     [
      5.914767,
      50.71516
     ],
     [
      5.914802,
      50.715064
     ],
     [
      5.914755,
      50.715057
     ],
     [
      5.914771,
      50.715012
     ],
     [
      5.914636,
      50.714993
     ],
     [
      5.914585,
      50.715132
     ],
     [
      5.914575,
      50.715132
     ],
     [
      5.914525,
      50.715274
     ],
     [
      5.914639,
      50.715292
     ],
     [
      5.914665,
      50.715232
     ]
    ]
   }
  ],
  "opmerking": {
   "nl": "De molen is nog in gebruik (Les Moulins du Val-Dieu).",
   "fr": "Le moulin est toujours en activité (Les Moulins du Val-Dieu).",
   "en": "The mill is still in use (Les Moulins du Val-Dieu)."
  },
  "invullingen": [
   {
    "titel": {
     "nl": "Molen blijft molen, met bezoekers",
     "fr": "Le moulin reste moulin, ouvert aux visiteurs",
     "en": "The mill stays a mill, with visitors"
    },
    "uitleg": {
     "nl": "Ambachtelijk meel malen en in de loods een bakkerij, winkel en rondleidingen onderbrengen.",
     "fr": "Moudre de la farine artisanale et installer boulangerie, boutique et visites dans le hangar.",
     "en": "Keep milling flour and house a bakery, shop and tours in the shed."
    }
   },
   {
    "titel": {
     "nl": "Bakschool",
     "fr": "École de boulangerie",
     "en": "Baking school"
    },
    "uitleg": {
     "nl": "Cursussen bakken met eigen meel, in het molenhuis op twee bouwlagen.",
     "fr": "Cours de boulangerie avec la farine du moulin, dans la maison du meunier sur deux niveaux.",
     "en": "Baking courses with the mill's own flour, in the two-storey mill house."
    }
   }
  ]
 },
 "kasteel-eyneburg": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Kasteel",
    "categorie": "kasteel",
    "oppervlakte": 2061,
    "maaiveld": 217.7,
    "goot": 7.8,
    "mediaan": 9.8,
    "nok": 17.3,
    "bron": "BE.WL.GEOREF.5F7EF94B-5DC1-4958-810A-49C29A8621C2",
    "contour": [
     [
      6.016053,
      50.705736
     ],
     [
      6.016068,
      50.7057
     ],
     [
      6.016069,
      50.705698
     ],
     [
      6.016039,
      50.705683
     ],
     [
      6.016084,
      50.705649
     ],
     [
      6.01609,
      50.705645
     ],
     [
      6.016148,
      50.705597
     ],
     [
      6.016039,
      50.705539
     ],
     [
      6.016033,
      50.705536
     ],
     [
      6.015965,
      50.705599
     ],
     [
      6.016012,
      50.705621
     ],
     [
      6.015985,
      50.705644
     ],
     [
      6.015963,
      50.705669
     ],
     [
      6.015991,
      50.705674
     ],
     [
      6.015964,
      50.705715
     ],
     [
      6.015949,
      50.705758
     ],
     [
      6.015912,
      50.70575
     ],
     [
      6.015922,
      50.70573
     ],
     [
      6.01587,
      50.705715
     ],
     [
      6.015852,
      50.705737
     ],
     [
      6.015821,
      50.705729
     ],
     [
      6.015777,
      50.70579
     ],
     [
      6.01574,
      50.705783
     ],
     [
      6.015743,
      50.705775
     ],
     [
      6.015736,
      50.70576
     ],
     [
      6.015722,
      50.705755
     ],
     [
      6.015696,
      50.705751
     ],
     [
      6.015706,
      50.705726
     ],
     [
      6.015701,
      50.705719
     ],
     [
      6.015363,
      50.705681
     ],
     [
      6.01537,
      50.70566
     ],
     [
      6.015382,
      50.705617
     ],
     [
      6.015385,
      50.705617
     ],
     [
      6.015403,
      50.705549
     ],
     [
      6.015418,
      50.705493
     ],
     [
      6.015442,
      50.7054
     ],
     [
      6.015505,
      50.705388
     ],
     [
      6.015733,
      50.705342
     ],
     [
      6.015758,
      50.705387
     ],
     [
      6.016029,
      50.705333
     ],
     [
      6.016013,
      50.705295
     ],
     [
      6.016242,
      50.705343
     ],
     [
      6.016246,
      50.70533
     ],
     [
      6.016355,
      50.705364
     ],
     [
      6.016324,
      50.70542
     ],
     [
      6.016285,
      50.705408
     ],
     [
      6.01624,
      50.7054
     ],
     [
      6.016223,
      50.705426
     ],
     [
      6.016217,
      50.705425
     ],
     [
      6.016181,
      50.705497
     ],
     [
      6.016172,
      50.705493
     ],
     [
      6.016149,
      50.705542
     ],
     [
      6.016289,
      50.705567
     ],
     [
      6.016353,
      50.705449
     ],
     [
      6.016423,
      50.705307
     ],
     [
      6.016273,
      50.70526
     ],
     [
      6.016269,
      50.705266
     ],
     [
      6.016241,
      50.705261
     ],
     [
      6.016115,
      50.705236
     ],
     [
      6.016038,
      50.705221
     ],
     [
      6.015974,
      50.705224
     ],
     [
      6.01571,
      50.705275
     ],
     [
      6.01571,
      50.705273
     ],
     [
      6.015683,
      50.705279
     ],
     [
      6.015476,
      50.70532
     ],
     [
      6.01531,
      50.70533
     ],
     [
      6.015278,
      50.705434
     ],
     [
      6.015265,
      50.705476
     ],
     [
      6.015228,
      50.705595
     ],
     [
      6.015208,
      50.70564
     ],
     [
      6.01521,
      50.705641
     ],
     [
      6.015183,
      50.70572
     ],
     [
      6.015178,
      50.705735
     ],
     [
      6.015578,
      50.705781
     ],
     [
      6.015573,
      50.705791
     ],
     [
      6.015571,
      50.7058
     ],
     [
      6.015573,
      50.705812
     ],
     [
      6.015579,
      50.70582
     ],
     [
      6.015593,
      50.705828
     ],
     [
      6.015588,
      50.705836
     ],
     [
      6.015616,
      50.705841
     ],
     [
      6.015621,
      50.705833
     ],
     [
      6.015638,
      50.705833
     ],
     [
      6.015653,
      50.705829
     ],
     [
      6.015669,
      50.705822
     ],
     [
      6.015676,
      50.705816
     ],
     [
      6.015675,
      50.705818
     ],
     [
      6.015778,
      50.705838
     ],
     [
      6.015775,
      50.705845
     ],
     [
      6.015975,
      50.705887
     ],
     [
      6.016053,
      50.705736
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Hotel en seminariecentrum",
     "fr": "Hôtel et centre de séminaires",
     "en": "Hotel and conference centre"
    },
    "uitleg": {
     "nl": "Met ruim 2.000 m² grondvlak het grootste pand in de atlas; geschikt voor kamers, zalen en restaurant.",
     "fr": "Avec plus de 2 000 m² d'emprise, le plus grand bâtiment de l'atlas ; convient pour chambres, salles et restaurant.",
     "en": "With over 2,000 m² footprint the largest building in the atlas; suited to rooms, halls and a restaurant."
    }
   },
   {
    "titel": {
     "nl": "Woonproject in het kasteel",
     "fr": "Logements dans le château",
     "en": "Housing in the castle"
    },
    "uitleg": {
     "nl": "Opdelen in appartementen rond de binnenplaats, met het domein als gedeelde tuin.",
     "fr": "Diviser en appartements autour de la cour, avec le domaine comme jardin commun.",
     "en": "Split into flats around the courtyard, with the estate as a shared garden."
    }
   },
   {
    "titel": {
     "nl": "Grensoverschrijdend cultuurhuis",
     "fr": "Maison de la culture transfrontalière",
     "en": "Cross-border culture house"
    },
    "uitleg": {
     "nl": "Vlak bij de grens met Duitsland en Nederland: residenties, concerten en een café.",
     "fr": "Tout près des frontières allemande et néerlandaise : résidences, concerts et café.",
     "en": "Right by the German and Dutch borders: residencies, concerts and a café."
    }
   }
  ]
 },
 "burcht-raaf": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Burcht",
    "categorie": "ruine",
    "ruine": true,
    "oppervlakte": 383,
    "maaiveld": 278.7,
    "goot": 6.2,
    "mediaan": 7.0,
    "nok": 8.5,
    "bron": "BE.WL.GEOREF.75B2A575-9620-4C80-A357-3AE36A97F17C",
    "contour": [
     [
      6.103372,
      50.698016
     ],
     [
      6.103376,
      50.698011
     ],
     [
      6.103314,
      50.697987
     ],
     [
      6.103134,
      50.697917
     ],
     [
      6.102848,
      50.697802
     ],
     [
      6.102783,
      50.697868
     ],
     [
      6.103069,
      50.697982
     ],
     [
      6.103177,
      50.698025
     ],
     [
      6.103174,
      50.69803
     ],
     [
      6.10331,
      50.698082
     ],
     [
      6.103372,
      50.698016
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Geconsolideerde ruïne als uitkijkpunt",
     "fr": "Ruine consolidée comme belvédère",
     "en": "Stabilised ruin as a viewpoint"
    },
    "uitleg": {
     "nl": "De donjon stabiliseren en een trap of platform inbouwen, als halte op een wandelroute.",
     "fr": "Stabiliser le donjon et y intégrer un escalier ou une plateforme, comme étape d'une promenade.",
     "en": "Stabilise the keep and add a stair or platform, as a stop on a walking route."
    }
   },
   {
    "titel": {
     "nl": "Openluchtpodium",
     "fr": "Scène en plein air",
     "en": "Open-air stage"
    },
    "uitleg": {
     "nl": "De muurresten als decor voor zomertheater of concerten.",
     "fr": "Les vestiges comme décor pour du théâtre d'été ou des concerts.",
     "en": "The wall remains as a backdrop for summer theatre or concerts."
    }
   },
   {
    "titel": {
     "nl": "Nieuw volume in de ruïne",
     "fr": "Nouveau volume dans la ruine",
     "en": "New volume inside the ruin"
    },
    "uitleg": {
     "nl": "Een lichte, moderne constructie binnen de oude muren, bv. een kleine bezoekersruimte.",
     "fr": "Une construction légère et contemporaine dans les anciens murs, p. ex. un petit espace d'accueil.",
     "en": "A light modern structure within the old walls, e.g. a small visitor room."
    }
   }
  ]
 },
 "kasteel-commanderie": {
  "berekend": "2026-11-17",
  "bronContour": "GRB (Digitaal Vlaanderen)",
  "bronHoogte": "DHM Vlaanderen II",
  "gebouwen": [
   {
    "naam": "Kasteel",
    "categorie": "kasteel",
    "oppervlakte": 774,
    "maaiveld": 154.1,
    "goot": 10.6,
    "mediaan": 13.0,
    "nok": 18.0,
    "bron": "GRB-OIDN 4048241",
    "contour": [
     [
      5.822481,
      50.73635
     ],
     [
      5.822581,
      50.736413
     ],
     [
      5.822229,
      50.736642
     ],
     [
      5.822252,
      50.736658
     ],
     [
      5.822155,
      50.736717
     ],
     [
      5.822185,
      50.736738
     ],
     [
      5.822018,
      50.736848
     ],
     [
      5.822058,
      50.736872
     ],
     [
      5.821979,
      50.736924
     ],
     [
      5.821898,
      50.736873
     ],
     [
      5.821938,
      50.736844
     ],
     [
      5.821767,
      50.736742
     ],
     [
      5.821815,
      50.73671
     ],
     [
      5.821848,
      50.736689
     ],
     [
      5.821945,
      50.736748
     ],
     [
      5.822071,
      50.736664
     ],
     [
      5.822076,
      50.736668
     ],
     [
      5.822171,
      50.736607
     ],
     [
      5.82219,
      50.736617
     ],
     [
      5.822219,
      50.736598
     ],
     [
      5.822158,
      50.736562
     ],
     [
      5.822481,
      50.73635
     ]
    ]
   },
   {
    "naam": "Vleugel",
    "categorie": "kasteel",
    "oppervlakte": 649,
    "maaiveld": 154.4,
    "goot": 7.3,
    "mediaan": 8.8,
    "nok": 11.9,
    "bron": "GRB-OIDN 4048240",
    "contour": [
     [
      5.822162,
      50.736149
     ],
     [
      5.821631,
      50.736496
     ],
     [
      5.821745,
      50.736567
     ],
     [
      5.821822,
      50.736615
     ],
     [
      5.821746,
      50.736668
     ],
     [
      5.82167,
      50.736623
     ],
     [
      5.82147,
      50.736501
     ],
     [
      5.821487,
      50.73649
     ],
     [
      5.822064,
      50.736108
     ],
     [
      5.822078,
      50.736099
     ],
     [
      5.822162,
      50.736149
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Toeristisch onthaal voor de Voerstreek",
     "fr": "Accueil touristique des Fourons",
     "en": "Visitor centre for the Voer region"
    },
    "uitleg": {
     "nl": "Onthaal, streekproducten en fietsverhuur in de vleugel, tentoonstellingen in het kasteel.",
     "fr": "Accueil, produits régionaux et location de vélos dans l'aile, expositions dans le château.",
     "en": "Reception, local produce and bike rental in the wing, exhibitions in the castle."
    }
   },
   {
    "titel": {
     "nl": "Kasteelhotel",
     "fr": "Hôtel-château",
     "en": "Castle hotel"
    },
    "uitleg": {
     "nl": "Samen ruim 1.400 m² grondvlak op drie bouwlagen: genoeg voor een hotel met restaurant.",
     "fr": "Plus de 1 400 m² d'emprise sur trois niveaux : assez pour un hôtel avec restaurant.",
     "en": "Over 1,400 m² footprint on three floors: enough for a hotel with restaurant."
    }
   },
   {
    "titel": {
     "nl": "Kunstenaarsresidentie",
     "fr": "Résidence d'artistes",
     "en": "Artists' residency"
    },
    "uitleg": {
     "nl": "Ateliers in de vleugel, woon- en expoplekken in het kasteel.",
     "fr": "Ateliers dans l'aile, logements et lieux d'exposition dans le château.",
     "en": "Studios in the wing, living and exhibition spaces in the castle."
    }
   }
  ]
 },
 "braesberg": {
  "berekend": "2026-11-17",
  "bronContour": "PICC (Service public de Wallonie)",
  "bronHoogte": "LiDAR Wallonië 2021-2022",
  "gebouwen": [
   {
    "naam": "Woonhuis",
    "categorie": "woning",
    "oppervlakte": 290,
    "maaiveld": 159.7,
    "goot": 4.4,
    "mediaan": 5.4,
    "nok": 6.7,
    "bron": "BE.WL.GEOREF.87742868-7DFA-4AA5-9BB6-14447FE62A6E",
    "contour": [
     [
      5.961116,
      50.742766
     ],
     [
      5.960959,
      50.742725
     ],
     [
      5.960952,
      50.74274
     ],
     [
      5.960833,
      50.742709
     ],
     [
      5.960839,
      50.742696
     ],
     [
      5.96077,
      50.742679
     ],
     [
      5.960726,
      50.742735
     ],
     [
      5.960736,
      50.742738
     ],
     [
      5.960802,
      50.742755
     ],
     [
      5.960776,
      50.742796
     ],
     [
      5.960773,
      50.742801
     ],
     [
      5.961049,
      50.742872
     ],
     [
      5.961116,
      50.742766
     ]
    ]
   },
   {
    "naam": "Stallen",
    "categorie": "hoeve",
    "dakverdieping": false,
    "oppervlakte": 252,
    "maaiveld": 161.3,
    "goot": 2.5,
    "mediaan": 3.0,
    "nok": 4.0,
    "bron": "BE.WL.GEOREF.15F6EE34-6C78-47B0-B473-86482FAF3CBC",
    "contour": [
     [
      5.961224,
      50.742686
     ],
     [
      5.961231,
      50.742689
     ],
     [
      5.961261,
      50.742646
     ],
     [
      5.961253,
      50.742644
     ],
     [
      5.961305,
      50.742569
     ],
     [
      5.961114,
      50.74252
     ],
     [
      5.961064,
      50.742597
     ],
     [
      5.9611,
      50.742607
     ],
     [
      5.961047,
      50.742687
     ],
     [
      5.961197,
      50.74273
     ],
     [
      5.961224,
      50.742686
     ]
    ]
   },
   {
    "naam": "Bijgebouw",
    "categorie": "hoeve",
    "dakverdieping": false,
    "oppervlakte": 53,
    "maaiveld": 160.0,
    "goot": 4.8,
    "mediaan": 5.2,
    "nok": 5.9,
    "bron": "BE.WL.GEOREF.ED16BC45-7EBD-49EF-B1A4-9895E659DF2E",
    "contour": [
     [
      5.961303,
      50.742798
     ],
     [
      5.961199,
      50.742771
     ],
     [
      5.961163,
      50.742826
     ],
     [
      5.961268,
      50.742853
     ],
     [
      5.961303,
      50.742798
     ]
    ]
   },
   {
    "naam": "Schuur (deels afgebroken)",
    "categorie": "ruine",
    "ruine": true,
    "oppervlakte": 154,
    "maaiveld": 160.8,
    "goot": 0.1,
    "mediaan": 1.0,
    "nok": 7.6,
    "bron": "BE.WL.GEOREF.66BACADB-0AFF-4241-B507-75199CC6C8D8",
    "contour": [
     [
      5.9615,
      50.742582
     ],
     [
      5.961359,
      50.742547
     ],
     [
      5.961283,
      50.742667
     ],
     [
      5.961424,
      50.742702
     ],
     [
      5.9615,
      50.742582
     ]
    ]
   }
  ],
  "invullingen": [
   {
    "titel": {
     "nl": "Centrum voor regeneratieve landbouw",
     "fr": "Centre d'agriculture régénératrice",
     "en": "Regenerative farming centre"
    },
    "uitleg": {
     "nl": "Dit plan ligt al op tafel: in 2026 liep een openbaar onderzoek voor restauratie tot productie- en innovatiecentrum.",
     "fr": "Ce projet est déjà sur la table : une enquête publique a eu lieu en 2026 pour une restauration en centre de production et d'innovation.",
     "en": "This plan already exists: a public inquiry ran in 2026 for restoring it as a production and innovation centre."
    }
   },
   {
    "titel": {
     "nl": "Hoevewoningen en gedeelde schuur",
     "fr": "Logements à la ferme et grange partagée",
     "en": "Farm housing with shared barn"
    },
    "uitleg": {
     "nl": "Het natuurstenen woonhuis bewonen, de schuren zonder dak als overdekte tuin of werkplaats.",
     "fr": "Habiter la maison en pierre, les granges sans toit comme jardin couvert ou atelier.",
     "en": "Live in the stone farmhouse, use the roofless barns as a covered garden or workshop."
    }
   }
  ]
 }
};
