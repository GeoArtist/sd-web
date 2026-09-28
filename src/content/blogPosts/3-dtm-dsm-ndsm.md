---
id: 3
title: NMT, NMPT, zNMPT
addDate: 2025-03-30
modifyDate: 2025-08-16
keywords:
    - geodezja
    - it
summary: "Czym różnią się: NMT, NMPT, zNMPT? Który model wysokościowy wybrać do konkretnego zadania?"
thumbnail: /images/blog/thumbnails/dtm-dsm-ndsm-thumbnail.jpg
thumbnailAlt: "numeryczne modele powierzchni terenu miniaturka"
---

**NMT, NMPT i zNMPT** – Kluczowe Narzędzia w Analizie Danych Przestrzennych
Nowoczesna geoinformatyka zapewnia nam narzędzia do precyzyjnego modelowania powierzchni ziemi oraz wszystkich obiektów się na niej znajdujących. Interesujące dane, szczególnie dane geoprzestrzenne w postaci różnych modeli terenu, stanowią podstawę prac analitycznych w geodezji/GiS, planowaniu miast, inżynierii, monitorowaniu środowiskowym i wielu innych dziedzinach.

________________________________________

### Źródła danych
Numeryczne modele terenu potrzebują danych wejściowych – współrzędnych charakterystycznych punktów terenu poziomych X, Y oraz wysokości. Dane te mogą zostać pozyskane bezpośrednio lub potrzebują specjalnego przetworzenia, aby mogły służyć do generowania modeli pokrycia terenu. Źródłami danych do tworzenia modeli terenu są m.in.:
1. **LIDAR (Light Detection and Ranging)** – pozyskiwany z różnych platform:
    - drony (UAV LiDAR),
    - helikoptery (ALS – Airborne Laser Scanning),
    - samoloty (np. skanowanie w ramach projektów krajowych),
    - satelity (np. ICESat-2, GEDI).
2. **Pomiary bezpośrednie** wykonywane przez geodetów:
    - tachimetry,
    - GNSS RTK,
    - niwelacja precyzyjna.
3. **Dane fotogrametryczne:**
    - ortofotomapy z dronów i helikopterów,
    - zdjęcia lotnicze z samolotów,
    - obrazy satelitarne o wysokiej rozdzielczości.
4. **Dane radarowe (SAR – Synthetic Aperture Radar):**
    - misje satelitarne (np. SRTM, TanDEM-X).
5. **Zasoby archiwalne:**
    - mapy topograficzne i wysokościowe w wersji cyfrowej,
    - dane z wcześniejszych pomiarów terenowych
________________________________________

### Rodzaje Modeli Pokrycia Terenu
Wyróżniamy trzy podstawowe rodzaje modeli pokrycia terenu:
- Numeryczny Model Terenu (NMT)
- Numeryczny Model Pokrycia Terenu (NMPT)
- Znormalizowany Model Pokrycia Terenu (zNMPT)

Każdy z nich dostarcza unikalnych informacji, a ich wybór zależy od charakteru projektu i celu analizy.

![porównanie modeli pokrycia terenu](/images/blog/images/3/compare_terrain_models.jpg)

________________________________________

### Numeryczny Model Terenu (NMT) 🌍
NMT to cyfrowe odwzorowanie powierzchni ziemi w jej „czystej” postaci – pozbawione wszelkich obiektów znajdujących się nad gruntem, takich jak budynki, mosty, drzewa. Odwzorowuje wyłącznie naturalne ukształtowanie terenu: góry, doliny, równiny, stoki.
Jak powstaje NMT?
Pozyskane dane źródłowe podlegają wstępnemu przetworzeniu, np.:
- Oczyszczaniu z szumów i błędnych pomiarów.
- Klasyfikacji punktów (teren, roślinność, budynki, obiekty techniczne).
- Korekcji georeferencji (dopasowaniu do odpowiedniego układu współrzędnych).
- Filtracji i interpolacji brakujących punktów.

![numeryczny model terenu](/images/blog/images/3/dtm.jpg)

Zastosowania NMT:
- 🌊 Modelowanie odpływu wód i analiza zagrożenia powodziowego.
- 🚧 Planowanie infrastruktury transportowej i przesyłowej.
- 🏔️ Analiza stabilności stoków i projektowanie zabezpieczeń przeciwosuwiskowych.
________________________________________
### Numeryczny Model Pokrycia Terenu (NMPT) 🏙️
NMPT obejmuje ukształtowanie terenu wraz ze wszystkimi obiektami znajdującymi się na jego powierzchni – budynkami, drzewami, mostami, masztami itp. Dzięki temu daje pełny obraz rzeczywistej przestrzeni.
Jak powstaje NMPT?
- LIDAR (zachowanie wszystkich punktów odbicia, w tym od koron drzew i dachów budynków).
- Fotogrametria (modele 3D z dronów, helikopterów, samolotów, a nawet satelitów).
- Chmury punktów z radarów SAR w trybie interferometrycznym.
- Modele 3D z technologii skanowania mobilnego (MMS – Mobile Mapping System).

![numeryczny model pokrycia terenu](/images/blog/images/3/dsm.jpg)

Zastosowania NMPT:
- 🏗️ Planowanie urbanistyczne i analiza zacienienia.
- 📡 Modelowanie propagacji sygnałów radiowych i telekomunikacyjnych.
- 🌾 Monitorowanie zmian w zagospodarowaniu terenu.
________________________________________
### Znormalizowany Model Pokrycia Terenu (zNMPT) 🌲
zNMPT powstaje poprzez odjęcie NMT od NMPT, co pozwala otrzymać wysokości obiektów ponad gruntem. Jest to kluczowy model, gdy interesuje nas struktura przestrzenna obiektów, a nie ich absolutne położenie względem poziomu morza.

![znormalizowany numeryczny model pokrycia terenu](/images/blog/images/3/ndsm.jpg)


Zastosowania zNMPT:
- 🌳 Analiza wysokości drzewostanu i struktury lasów.
- 🏘️ Ocena zagęszczenia zabudowy miejskiej.
- 🍃 Szacowanie ilości biomasy i badania ekologiczne.
________________________________________
### Model terenu jako raster – jak to działa?
Numeryczne modele terenu i pokrycia terenu często zapisuje się w formacie rastrowym.
Raster to nic innego jak siatka kwadratów (tzw. pikseli) o jednakowej długości boku – np. 1m, 5m czy 30m – które wspólnie pokrywają cały analizowany obszar.
Każdy piksel ma przypisaną wartość opisującą daną cechę terenu.
W przypadku NMT, NMPT czy zNMPT tą cechą jest wysokość (najczęściej w metrach nad poziomem morza).
Dzięki temu możemy w prosty sposób wykonywać obliczenia, analizy przestrzenne i wizualizacje – bo komputer może traktować taki raster jak „mapę wysokości” i wykonywać na nim operacje matematyczne.
Przykładowo:
- Piksel (50, 100) może mieć wartość 128,5 m – co oznacza, że w tym fragmencie terenu wysokość wynosi 128,5 m n.p.m.
- W zNMPT ta wartość oznaczałaby wysokość obiektu nad powierzchnią gruntu – np. 15,3 m, co mogłoby odpowiadać wysokości drzewa.
Im mniejszy rozmiar piksela, tym dokładniejszy model (więcej szczegółów), ale też większy rozmiar pliku i większe wymagania obliczeniowe.

________________________________________

### Dlaczego te modele są tak istotne?
Każdy z modeli dostarcza innych informacji:
- **NMT** – czysta topografia, niezbędna w analizach geomorfologicznych i hydrologicznych.
- **NMPT** – pełny obraz terenu wraz z elementami pokrycia.
- **zNMPT** – analiza wysokości względnych obiektów.
W praktyce często łączy się te modele, aby uzyskać kompleksową analizę i maksymalną wartość informacyjną.

________________________________________
Najlepsze efekty są osiągane, gdy proces tworzenia modeli terenu jest w pełni zautomatyzowany – od wczytania danych, przez filtrację i interpolację, aż po generowanie map i raportów. Dzięki Python-owi (GDAL, PDAL, PyLiDAR, Rasterio) oraz narzędziom GIS możliwe jest skrócenie czasu przetwarzania z dni do godzin.

W **Soft-Data** tworzymy, przetwarzamy i analizujemy modele wysokościowe, korzystając z nowoczesnych technologii i źródeł danych. Łączymy wiedzę z zakresów: geodezji, GIS, data science i programowania, aby dostarczać kompleksowe, lekkie rozwiązania skrojone na miarę.
Od pozyskania danych, przez przetwarzanie danych, po integrację z geoportalami i bazami danych – zapewniamy pełne wsparcie w każdym etapie projektu.
