---
id: 8
title: Canopy Height Model (CHM)
addDate: 2025-09-07
modifyDate: 2025-09-07
keywords:
    - geodezja
    - it
summary: "Numeryczny model roślinności - tworzenie i zastosowanie w GiS"
---

**Canopy Height Model (CHM)** to cyfrowa mapa wysokości roślinności nad powierzchnią terenu. CHM pokazuje, jak wysoko sięgają drzewa lub inna roślinność w danym obszarze. 
Jest to kluczowy produkt w analizach lasów, planowaniu przestrzennym, monitoringu zmian środowiskowych i badaniach ekologicznych .

![canopy heigh model kolorowy](/images/blog/images/8/canopy-height-model-colorized.jpg)
________________________________________

### Źródła danych📡
Najczęściej CHM tworzy się na podstawie chmur punktów LiDAR (Light Detection and Ranging), które mierzą odległość od urządzenia do obiektów za pomocą laserów 🔦.
Typowe źródła danych:
1. Publiczne bazy LiDAR:
    - [USGS 3DEP](https://www.usgs.gov/core-science-systems/ngp/3dep)
    - [OpenTopography](https://opentopography.org)
    - [Geoportal krajowy]( https://mapy.geoportal.gov.pl/imap/?gpmap=gp0) 
2. Pomiary własne: 
    - drony z LiDAR, 
    - skanery naziemne TLS, 
    - samoloty ALS 
3. Pomiary satelitarne: niektóre satelity (np. GEDI na ISS, ICESat-2) dostarczają profili wysokości lasu 
4. Dane radiowe / radarowe: SAR (Synthetic Aperture Radar) może dawać przybliżone informacje o wysokości roślinności  (mniej dokładne niż LiDAR, ale przydatne na dużych obszarach)


**Format danych lidarowych** najczęściej wykorzystywane w GiS to:
- LAS – standardowy format chmur punktów, nieskompresowany.
- LAZ – skompresowana wersja LAS, mniejszy rozmiar pliku.

**Pliki LAS/LAZ** zawierają wiele informacji, lecz na potrzeby tworzenia CHM najbardziej kluczowe są:
- Współrzędne XYZ punktów,
- Intensywność odbicia (intensity),
- Klasyfikacje punktów (ground, low vegetation, high vegetation, buildings itp.) 


Dzięki temu LAS/LAZ są standardem w GIS i leśnictwie, umożliwiającym filtrowanie punktów wg klasy i tworzenie produktów takich jak DTM, DSM i CHM.


________________________________________

### Jak stworzyć?🛠️

**Proces tworzenia CHM** w uproszczeniu składa się z kilku kroków:
1. Wczytanie chmury punktów – np. z pliku LAS/LAZ.
2. Filtracja punktów – używamy punktów wegetacji (klasy 3–5) i gruntowych (klasa 2).
3. Budowa DTM (Digital Terrain Model) – interpolacja wysokości gruntu z punktów klasy ground.
4. Obliczenie HAG (Height Above Ground) – wysokość roślinności nad terenem:
5. Rasteryzacja – interpolacja wartości HAG do siatki pikseli (np. 0.5 m).
6. Zapis do GeoTIFF – wynikowy CHM można wczytać w QGIS, ArcGIS lub użyć w dalszych analizach.

Przykład tworzenia CHM w Pythonie: [CHM - Soft-Data - Kaggle notebook](https://www.kaggle.com/code/marekszczepkowski/chm-generator-soft-data)

________________________________________

### Wizualizacja 🎨
Po utworzeniu CHM zwykle zapisujemy go jako raster GeoTIFF. Domyślnie taki raster jest czarno-biały – każdy piksel odpowiada wysokości roślinności w metrach.
- Ciemne piksele → wyższe drzewa 🌳
- Jasne piksele → niższa roślinność 🌿

Aby raster był bardziej czytelny, można go "pokolorować" w programach GIS lub w Python-ie:
- QGIS / ArcGIS – możliwość zastosowania gradientu kolorów (np. jasnozielony → ciemnozielony)
- Python – używając bibliotek takich jak matplotlib lub plotly, można stworzyć kolorowe wizualizacje 2D i 3D:

Kolorowanie rastra ułatwia interpretację wysokości roślinności i identyfikację wysokich drzew, klastrów czy obszarów z niską roślinnością.
![canopy heigh model czarno biały](/images/blog/images/8/canopy-height-model-bc.jpg)

________________________________________

### Zastosowania🌱 
Canopy Height Model posiada bardzo szerokie zastosowanie w wielu dziedzinach, t.j.:
- Leśnictwo: ocena wysokości drzew, struktury lasu, biomasy.
- Ekologia: badanie siedlisk zwierząt, monitoring sukcesji roślinności.
- Planowanie przestrzenne: identyfikacja terenów zielonych, ocena cienia drzew w miastach.
- Zarządzanie katastrofami: analiza skutków wichur i pożarów lasów.
- Rolnictwo: wysokość upraw, struktura sadów.


CHM może być też podstawą do dalszych analiz przestrzennych, np.: 
- wyznaczania zasięgu koron drzew, 
- klasteryzacji drzew, 
- modelowania widoczności w krajobrazie,
- analizy zmian roślinności w czasie.

________________________________________

**Canopy Height Model** to jeden z najważniejszych produktów pochodnych danych LiDAR, który umożliwia ocenę wysokości i struktury roślinności w sposób precyzyjny i cyfrowy. 
Dzięki publicznym danym LiDAR, pomiarom satelitarnym i radarowym, a także narzędziom open-source, tworzenie CHM staje się coraz łatwiejsze i szeroko stosowane w nauce, leśnictwie i GIS.

**Soft-Data** specjalizuje się w przygotowywaniu, tworzeniu Canopy Height Model - numerycznych modeli roślinności oraz wykonywaniu różnorodnych analiz przestrzennych.

