---
id: 12
title: GeoLibre - GIS w przeglądarce. Co potrafi i czym różni się od QGIS?
addDate: 2026-10-18
modifyDate: 2026-10-18
keywords:
    - geodezja
    - gis
    - geolibre
    - qgis
    - cloud-native
    - webgis
summary: "GeoLibre 3.4 - darmowy GIS w przeglądarce, na desktopie i telefonie. Funkcje, zastosowania, opinie i porównanie z QGIS 4.2"
thumbnail: /images/blog/thumbnails/geolibre-vs-qgis-thumbnail.jpg
thumbnailAlt: "trójwymiarowe budynki Manhattanu w GeoLibre miniaturka"
---

**GeoLibre 🌍** to nowy, darmowy i otwarty program GIS, który uruchomisz w zwykłej karcie przeglądarki, bez instalacji i bez zakładania konta. Ten sam program działa też jako aplikacja na Windows, macOS i Linux, na telefonie z Androidem lub iOS oraz wewnątrz notatnika Jupyter. Pierwsza wersja pojawiła się w maju 2026 r., a projekt rozwija się bardzo szybko: w połowie października 2026 r. aktualna jest wersja **3.4.0**, a repozytorium ma ponad 8 tysięcy gwiazdek na GitHubie.

Czy to już konkurencja dla QGIS, który właśnie przeszedł na linię 4.x? W tym artykule sprawdzamy, co GeoLibre potrafi, gdzie konkretnie można go użyć, co piszą o nim użytkownicy i czym różni się od QGIS 4.2.

![trójwymiarowe budynki Manhattanu pokolorowane według epoki budowy, linie metra i automatyczna legenda w GeoLibre - źródło: README projektu opengeos/GeoLibre](/images/blog/images/12/geolibre-nyc-buildings-3d.jpg)
________________________________________

### 🧭 Skąd się wziął GeoLibre?
Autorem GeoLibre jest **Qiusheng Wu**, profesor geografii na University of Tennessee i twórca popularnych bibliotek Pythona: geemap, leafmap i segment-geospatial. To także autor wtyczek OpenGeoAgent i GeoAI, które opisaliśmy w artykule [Sztuczna inteligencja w QGIS](/blog/11-ai-plugins-qgis). Projekt rozwija organizacja **opengeos**, a kod jest dostępny na licencji **MIT**, czyli jednej z najbardziej liberalnych licencji otwartego oprogramowania. Można go używać komercyjnie, modyfikować i wbudowywać we własne produkty.

Tempo prac widać po datach:
- **27 maja 2026 r.** - pierwszy commit w repozytorium,
- **10 czerwca 2026 r.** - wersja 1.0, ogłoszona na blogu autora,
- **14 lipca 2026 r.** - wersja 2.0 z obsługą warstw wektorowych przez DuckDB,
- **14 września 2026 r.** - wersja 3.0 z globusem 3D CesiumJS,
- **11 października 2026 r.** - wersja 3.4.0, aktualna w chwili pisania artykułu.

Nowe wydania pojawiają się mniej więcej co tydzień. To zaleta, bo błędy są szybko poprawiane, ale też wyzwanie: opis funkcji sprzed miesiąca może być już nieaktualny.
________________________________________

### ⚙️ Jak to działa pod maską?
Pod spodem GeoLibre pracuje zestaw technologii webowych:
- **MapLibre GL JS** - silnik renderowania map (opcjonalnie także Mapbox GL JS, CesiumJS dla globusa 3D i ArcGIS Maps SDK),
- **DuckDB-WASM Spatial** - baza danych z rozszerzeniem przestrzennym, która działa w przeglądarce. Odpowiada za wczytywanie formatów wektorowych, konwersje i zapytania SQL,
- **WebAssembly** - technologia, dzięki której skompilowany kod (np. narzędzia analityczne) działa w przeglądarce z prędkością zbliżoną do programów natywnych,
- **Tauri (Rust)** - lekka powłoka aplikacji desktopowej. Według autora instalator ma około 30 MB,
- **deck.gl** - wizualizacja dużych zbiorów danych na karcie graficznej.

Najważniejsza konsekwencja tej architektury jest taka, że **dane zostają na Twoim komputerze**. Plik wczytany z dysku jest przetwarzany w pamięci karty przeglądarki, nie trafia na żaden serwer. Polityka prywatności projektu mówi wprost, że aplikacja nie zbiera telemetrii ani danych użytkowania. Do sieci wychodzą tylko zapytania, które sam wywołasz: pobranie kafli mapy podkładowej, wyszukanie adresu, pytanie do asystenta AI (razem z nazwami warstw i pól) albo udostępnienie projektu przez serwis share.geolibre.app.

Na desktopie część narzędzi (konwersje formatów, narzędzia rastrowe, segmentacja AI, połączenie z PostGIS) korzysta z opcjonalnego **procesu pomocniczego w Pythonie**, który również działa lokalnie, na adresie 127.0.0.1.
________________________________________

### 📱 Gdzie to działa?
- **Przeglądarka** - adres web.geolibre.app. Aplikację można zainstalować jako PWA (aplikacja webowa działająca jak program) i używać offline po pierwszym załadowaniu. Jest też funkcja pobierania kafli podkładu dla bieżącego widoku.
- **Desktop** - Windows, macOS i Linux, także przez Microsoft Store, Mac App Store, Flatpak czy AUR. Wersja z Mac App Store jest okrojona: nie ma procesu Pythona, lokalnego Jupytera ani zewnętrznych wtyczek.
- **Telefon i tablet** - natywne aplikacje w Google Play i App Store. Na urządzeniach mobilnych ukryte są narzędzia rastrowe, konwersje, segmentacja AI i PostgreSQL. Zostaje natomiast cały zestaw narzędzi Whitebox.
- **Jupyter i Python** - pakiet `geolibre` (pip lub conda) osadza całą aplikację w komórce notatnika, z dwukierunkową synchronizacją stanu. Działa w lokalnym Jupyterze, VS Code i Google Colab.
- **R** - osobny pakiet do RStudio, Quarto i Shiny.
- **Własny serwer** - obraz Dockera albo dowolny hosting statyczny. Jest też wariant budowany bez zewnętrznych CDN dla zamkniętych sieci.

![interfejs GeoLibre na ekranie telefonu z legendą i widokiem 3D budynków - zrzut z wersji webowej przy szerokości 430 px](/images/blog/images/12/geolibre-mobile-screenshot.jpg)
________________________________________

### 📂 Dane i formaty
GeoLibre wczytuje przez przeciągnięcie pliku lub podanie adresu URL:
- **wektory** - GeoJSON, GeoPackage, GeoParquet, FlatGeobuf, Shapefile (także w ZIP), KML/KMZ, GML, GPX, DXF, MapInfo TAB, CSV/TSV i Excel. Na desktopie również Esri File Geodatabase i DWG,
- **rastry** - GeoTIFF i Cloud Optimized GeoTIFF (COG) na każdej platformie. Formaty takie jak IMG, ASC, JP2 czy NetCDF tylko na desktopie, przez narzędzia konwersji,
- **chmury punktów** - LAS, LAZ, COPC (strumieniowo) i EPT,
- **3D** - OGC 3D Tiles, Esri I3S, glTF/GLB, Gaussian splats,
- **usługi sieciowe** - WMS, WMTS, WFS, XYZ, OGC API Features i Tiles, usługi ArcGIS (FeatureServer, MapServer, ImageServer),
- **kafle i chmura** - PMTiles, MBTiles (desktop), Zarr, katalogi STAC, prywatne zasobniki S3,
- **bazy danych** - DuckDB, PostgreSQL/PostGIS i SQL Server (desktop), Apache Iceberg, a nawet PostGIS działający w przeglądarce (PGlite).

Program **importuje projekty QGIS** (`.qgs`, `.qgz`) z warstwami, grupami, kolejnością i stylami, a także projekty ArcGIS Pro (`.aprx`, `.mapx`). Style można wymieniać w formatach SLD, QML i Mapbox GL JSON. Eksport warstw obejmuje GeoJSON, GeoParquet, GeoPackage, Shapefile, CSV, KML/KMZ, a konwertery tworzą pliki COG, PMTiles i FlatGeobuf.

Największy atut to **strumieniowanie danych chmurowych**. Plik COG lub GeoParquet leżący na serwerze nie jest pobierany w całości: przeglądarka ściąga tylko te fragmenty, które są potrzebne dla aktualnego widoku. Autor pokazuje w materiałach wideo pracę na zbiorze budynków Overture Maps o rozmiarze 180 GB bez pobierania go na dysk. Poniżej nasz własny test: scena **Sentinel-2 z 28 września 2026 r.** nad centralną Polską (kafel 34UDC, od Łodzi po Warszawę), otwarta w przeglądarce bezpośrednio z publicznego archiwum AWS przez podanie adresu w parametrze URL. Żaden plik nie został pobrany na komputer.

![scena Sentinel-2 nad centralną Polską wczytana w GeoLibre jako COG prosto z AWS - zrzut z przeglądarki](/images/blog/images/12/geolibre-sentinel2-warsaw-screenshot.jpg)
________________________________________

### 🧮 Analizy: ponad 1000 narzędzi w przeglądarce
Sercem analiz jest **Whitebox Toolbox**, czyli zestaw narzędzi geoprzetwarzania skompilowany do WebAssembly. W aktualnej wersji webowej lista zawiera 1069 narzędzi, w tym 313 wektorowych, 256 rastrowych, 154 teledetekcyjne, 100 hydrologicznych, 99 do analizy rzeźby terenu i 65 do chmur punktów LiDAR. Każde narzędzie ma własny adres URL (parametr `?tool=`), więc można je podlinkować z gotowymi parametrami.

Poza tym GeoLibre oferuje:
- **menu Vector i Raster** - bufory, przecięcia, złączenia, statystyki strefowe, kalkulator rastrów, cieniowanie, spadki, izolinie,
- **SQL Workspace** - zapytania przestrzenne w DuckDB (również na zdalnych plikach GeoParquet), PGlite/PostGIS i Apache Sedona,
- **analizy sieciowe** - izochrony, obszary obsługi, macierze kosztów, nawigacja krok po kroku,
- **statystyki przestrzenne** - analiza hot spotów (Getis-Ord Gi*), wskaźniki spektralne, takie jak NDVI czy EVI (więcej o nich w artykule [Wskaźniki roślinności](/blog/5-vegetation-indexes)),
- **Model Builder** - łączenie narzędzi w graf, np. NMT, wypełnienie zagłębień, kierunki spływu, sieć cieków,
- **asystent AI** - zamienia polecenia w języku naturalnym na operacje, które można obejrzeć i cofnąć. Wymaga własnego klucza API dostawcy modelu,
- **GeoAI** - segmentacja obiektów modelem SAM, detekcja obiektów ONNX w przeglądarce, a od wersji 3.4 także **analiza obiektowa obrazu (OBIA)** z segmentacją, klasyfikacją lasem losowym i importem zestawów reguł z eCognition,
- **georeferencję** skanowanych map oraz **regularyzację obrysów budynków**, przydatną po detekcji AI, którą opisaliśmy w artykule [Detekcja obrysów budynków](/blog/6-ai-buildings-detections).

Historia przetwarzania zapisuje każde uruchomienie i pozwala skopiować je jako kod Pythona.

![okno Whitebox Toolbox w GeoLibre z narzędziem Slope i zaznaczoną opcją uruchomienia lokalnie w WebAssembly - zrzut z przeglądarki](/images/blog/images/12/geolibre-whitebox-slope-screenshot.jpg)
________________________________________

### 🎨 Kartografia, wydruk i prezentacja
- **Symbolizacja** - renderer pojedynczy, kategoryzowany, skalowany (kilka metod klasyfikacji), regułowy, proporcjonalny, mapy ciepła i klastry, diagramy, własne markery z obrazków.
- **Etykiety** - sterowane wyrażeniami, z kontrolą rozmieszczenia i usuwaniem duplikatów.
- **Legenda** - generowana automatycznie z symbolizacji, edytowalna i zapisywana w projekcie.
- **Kompozycja wydruku** - legenda, skala, tytuł, tabele i wykresy, eksport do PNG, PDF i SVG, a także **atlas** (jedna strona na obiekt).
- **Story maps i dashboardy** - narracja przewijana po mapie oraz panele z wykresami i wskaźnikami, które filtrują się nawzajem.
- **Udostępnianie** - projekt jako link, osadzenie na stronie przez iframe z trybem „sama mapa” albo eksport całego projektu do **jednego pliku HTML**, który działa bez serwera.
- **3D** - wyciąganie budynków, 3D Tiles, globus CesiumJS, animacje w czasie (Time Slider) i nagrywanie wideo z mapy.
________________________________________

### 💼 Gdzie konkretnie można to wykorzystać?
Na podstawie dokumentacji i naszych testów w przeglądarce widzimy kilka scenariuszy, w których GeoLibre ma realną przewagę nad klasycznym desktopem:
- **Mapa dla klienta lub urzędu bez instalowania czegokolwiek** - wynik inwentaryzacji, projekt podziału czy analiza zasięgu wysyłana jako link albo jeden plik HTML, który odbiorca otwiera w przeglądarce. Dotąd wymagało to geoportalu lub eksportu przez wtyczkę qgis2web.
- **Szybki podgląd danych chmurowych** - zobrazowania Sentinel-2 i Landsat z archiwów AWS lub Planetary Computer, dane Overture Maps czy ortofotomapy w formacie COG oglądane bez pobierania gigabajtów. Wtyczka Sentinel-2 Explorer dodana w wersji 3.4 ma suwak czasu.
- **Podstawowe analizy terenu w terenie** - spadki, cieniowanie, sieć cieków czy zlewnie liczone na laptopie bez QGIS, z pliku GeoTIFF. Jeśli pracujesz z NMT z GUGiK, zasady są takie same jak w artykułach [NMT i jego zastosowania](/blog/2-dtm-usage) oraz [Analiza zlewni](/blog/1-watershed-analysis).
- **Chmury punktów LiDAR** - podgląd plików LAZ i COPC, w tym danych z GUGiK, oraz 65 narzędzi Whitebox do filtrowania i klasyfikacji. O klasyfikacji z pomocą AI pisaliśmy w artykule [Klasyfikacja chmury punktów LiDAR](/blog/10-lidar-classification-qgis).
- **Zbieranie danych w terenie** - moduł Field Collection z formularzami i zdjęciami, zapis śladu GPS, obsługa zewnętrznych odbiorników NMEA przez Web Serial lub Web Bluetooth, a także pobranie kafli offline przed wyjazdem.
- **Dydaktyka i szkolenia** - jeden link zamiast instalacji na każdym komputerze w pracowni. Taki scenariusz autor wskazuje wprost w materiałach projektu.
- **Analityk danych w Jupyterze** - mapa w notatniku, a nie w osobnym programie: wczytanie GeoDataFrame, uruchomienie narzędzia Whitebox, odczyt zaznaczonych obiektów z powrotem do Pythona.
- **Publikacja danych w formatach chmurowych** - konwersja Shapefile czy GeoPackage do GeoParquet, PMTiles lub COG, które potem wystarczy wrzucić na dowolny hosting statyczny, bez serwera mapowego.
- **Osadzenie mapy we własnej aplikacji** - GeoLibre ma API komunikatów (postMessage) i klienta npm, więc strona nadrzędna może dodawać warstwy, uruchamiać narzędzia i odczytywać narysowane obiekty.

![demonstracja 3D Tiles w GeoLibre - budynki biurowe w modelu fotogrametrycznym na mapie - źródło: README projektu opengeos/GeoLibre](/images/blog/images/12/geolibre-3d-tiles-demo.jpg)
________________________________________

### 🟩 A co słychać w QGIS 4?
Żeby porównanie było uczciwe, przypomnijmy, gdzie dziś jest QGIS:
- **QGIS 4.0 „Norrköping”** (6 marca 2026 r.) przeniósł program na bibliotekę **Qt6**. To największa zmiana technologiczna od lat: przeprojektowana strona powitalna, własne menu i paski narzędzi, digitalizacja krzywych Béziera, ale też konieczność dostosowania wtyczek. Repozytorium wtyczek prowadzi osobną kategorię „QGIS 4 Ready”, bo nie wszystkie wtyczki zostały już przeniesione.
- **QGIS 4.2 „Belém do Pará”** (3 lipca 2026 r.) dodał m.in. materiały PBR z teksturami i instancjonowanie modeli w 3D, efekty bloom i MSAA, obsługę implicit tiling i kafli złożonych w 3D Tiles, format wirtualnej chmury punktów `.vpz`, cieniowanie wysokościowe per warstwa, eksport STL, zarządzanie warstwami w geoprzestrzennym PDF, elementy wykresów w wydruku pobierające style z renderera, algorytmy Processing w menu i paskach narzędzi, układ topocentryczny, SensorThings 2.0 oraz odczyt zasobów STAC z Azure i Google Cloud. Ustawienia QGIS 4 trafiły do osobnego katalogu, z jednorazową migracją z QGIS 3.
- **Wersja bieżąca** to 4.2.3 z 25 września 2026 r. Wydanie 4.4 zaplanowano na 30 października 2026 r.
- **Zmiana planów LTR** - 3 października 2026 r. zespół QGIS ogłosił, że 4.2 **nie** zostanie wersją długoterminową (LTR), bo w buildach 4.x wciąż jest zbyt wiele błędów. Pierwszym LTR z linii 4.x ma być 4.4.4, z celem na 5 marca 2027 r. Do tego czasu stabilnym wyborem pozostaje QGIS 3.44 LTR.

W repozytorium wtyczek QGIS jest obecnie ponad 4200 pozycji. Oficjalne instalatory są dostępne dla Windows, macOS i Linux, a w terenie QGIS wspierają osobne aplikacje, takie jak QField czy Mergin Maps.

![ekran powitalny QGIS 4.2 Belém do Pará - źródło: repozytorium qgis/QGIS](/images/blog/images/12/qgis-42-splash.jpg)
________________________________________

### ⚖️ GeoLibre a QGIS 4.2 - czym się różnią?
Sam autor GeoLibre porównuje oba programy do aparatu w smartfonie i aparatu profesjonalnego: ten pierwszy nie zastąpił drugiego, ale zmienił to, kto i kiedy robi zdjęcia. Jego własna dokumentacja przyznaje, że QGIS „wyraźnie prowadzi” w głębi wtyczek, specjalistycznych narzędziach, przypadkach brzegowych odwzorowań i topologii oraz stabilności na bardzo dużych projektach. Najważniejsze różnice:
- **Instalacja i dostęp** - GeoLibre działa z linku, QGIS trzeba zainstalować. Na komputerze firmowym bez uprawnień administratora albo na Chromebooku to różnica decydująca.
- **Platformy** - GeoLibre to jedna aplikacja na przeglądarkę, desktop, telefon i Jupyter. QGIS to desktop plus osobne aplikacje mobilne i konsola PyQGIS.
- **Formaty** - QGIS czyta wszystko, co obsługuje biblioteka GDAL/OGR, i to jest najszerszy zestaw w branży. GeoLibre obsługuje większość popularnych formatów, ale część tylko na desktopie, a niektórych (np. HDF4, OBJ) wcale. Za to formaty chmurowe i strumieniowanie są w GeoLibre domyślnym trybem pracy, a nie dodatkiem.
- **Analizy** - oba programy mają ponad 1000 narzędzi. QGIS dokłada do tego GRASS, SAGA i tysiące wtyczek, GeoLibre ma Whitebox w przeglądarce i SQL w DuckDB. Zaawansowane analizy sieciowe, geostatystyka czy topologia są w QGIS dojrzalsze.
- **Kartografia** - kompozytor wydruku QGIS z atlasem, etykietowaniem i stylami to standard branżowy do map drukowanych. GeoLibre ma już atlas i eksport PDF/SVG, ale do wydawnictw kartograficznych jest mu daleko.
- **Rozszerzanie** - QGIS to Python i PyQGIS, GeoLibre to wtyczki w TypeScript oraz konsola Pythona (w przeglądarce przez Pyodide). Dla kogoś z zapleczem webowym próg wejścia w GeoLibre jest niższy, dla analityka GIS odwrotnie.
- **Duże dane lokalne** - GeoLibre ogranicza pamięć karty przeglądarki: zdalne pliki wektorowe do 2 GiB, lokalne COG do 2 GiB, a przy dużych zbiorach wyświetla ostrzeżenia. QGIS pracuje na dysku i radzi sobie z większymi plikami.
- **Bazy danych i edycja wielodostępna** - QGIS edytuje PostGIS, Oracle, SQL Server czy SpatiaLite i współpracuje z geobazami korporacyjnymi. GeoLibre ma PostGIS i SQL Server na desktopie, a wersjonowanie i replikację uznaje za poza zakresem.
- **Licencja** - MIT (GeoLibre) i GPL-2.0+ (QGIS). Obie darmowe, ale MIT pozwala zamknąć kod pochodny, co ma znaczenie dla firm wbudowujących GIS we własne produkty.
- **Dojrzałość** - QGIS ma ponad 20 lat, dokumentację w wielu językach i ogromną społeczność. GeoLibre ma pięć miesięcy.

To nie jest wybór „albo-albo”. Autor projektu, blog Geopera i porównania w sieci proponują tę samą ścieżkę: analizy i mapy do druku w QGIS, podgląd, udostępnianie i praca w chmurze w GeoLibre. Import projektów QGIS i wymiana stylów przez QML/SLD ułatwiają takie łączenie.
________________________________________

### 💬 Co piszą użytkownicy?
Niezależnych, pogłębionych recenzji jest wciąż niewiele, a większość materiałów pochodzi od autora. Polskojęzycznych opinii nie znaleźliśmy. Z tego, co udało się zebrać:
- **Hacker News (czerwiec 2026)** - obok pochwał („terribly convenient” w porównaniu z QGIS, kandydat na darmowy zamiennik Map Viewera z ArcGIS Online) pojawiły się konkretne problemy: jeden z użytkowników dostawał błędy wejścia/wyjścia w wersji webowej, a plik większy niż 1 GB zawiesił aplikację i wyczyścił warstwy. Inni krytykowali marketing i pytali, czy tak duży projekt powstały w kilka tygodni z pomocą AI da się długofalowo utrzymać.
- **Google Play** - oceny są bardzo wysokie, ale jedna z recenzji mówi wprost, że aplikacja „wciąż dojrzewa, ma błędy i braki w funkcjach”, choć w ocenie autora i tak wyprzedza konkurencję.
- **Społeczność QGIS** - w dyskusji na X pojawił się zarzut, że osobny projekt rozprasza społeczność otwartego GIS. Autor odpowiedział analogią z aparatami i podkreślił, że traktuje oba projekty jako uzupełniające się.
- **Blogi branżowe** - Geopera opisuje GeoLibre jako „wart obserwacji”, ale nie jako zamiennik QGIS. Szwajcarski spatialists.ch odnotował wersję 2.0 neutralnie, bez testów.
- **Stan projektu** - w repozytorium otwartych jest kilkanaście zgłoszeń błędów, a sam autor opisuje współpracę w czasie rzeczywistym jako MVP, czyli pierwszą działającą wersję.
________________________________________

### ⚠️ Ograniczenia, o których trzeba wiedzieć
- **Pamięć przeglądarki** - to realny sufit. Projekt sam pisze, że granicą nie jest rozmiar zbioru, lecz liczba obiektów trzymanych naraz w pamięci karty.
- **Różnice między platformami** - to, co działa na desktopie z procesem Pythona, nie zadziała na telefonie ani w wersji z Mac App Store. Przed wdrożeniem sprawdź listę ograniczeń dla swojej platformy.
- **Zależność od CDN** - część silników (Pyodide, PGlite, GDAL w WebAssembly) jest pobierana z serwisu jsDelivr. W sieciach zamkniętych potrzebny jest wariant bez CDN i własny hosting.
- **Usługi płatne** - teren świata w CesiumJS wymaga własnego tokenu Cesium Ion, Mapbox własnego tokenu, a asystent AI klucza API.
- **Udostępnianie** - funkcja Share wysyła projekt (z osadzonymi warstwami z plików lokalnych) na serwer projektu i wymaga zalogowania.
- **Tempo zmian** - cotygodniowe wydania oznaczają, że interfejs i funkcje mogą się zmieniać między szkoleniem a wdrożeniem.
- **Brak polskiego interfejsu** - program ma 21 wersji językowych, ale polskiej jeszcze wśród nich nie ma. Dodanie tłumaczenia sprowadza się do przetłumaczenia jednego pliku JSON.
________________________________________

### 🚀 Jak zacząć?
1. Otwórz **web.geolibre.app** i przeciągnij na mapę dowolny plik GeoJSON, GeoPackage lub GeoTIFF.
2. Wypróbuj dane chmurowe: w menu **Add Data** wklej adres pliku COG lub GeoParquet albo wybierz katalog STAC.
3. Uruchom narzędzie z **Processing > Whitebox Toolbox** z zaznaczoną opcją „Run locally (WASM)”.
4. Zaimportuj istniejący projekt QGIS (plik `.qgz` lub `.qgs`) i sprawdź w raporcie importu, które warstwy przeszły bez uwag.
5. Jeśli chcesz pracować z PostGIS, formatami desktopowymi lub narzędziami rastrowymi, pobierz wersję desktopową ze strony geolibre.app/downloads.
6. Pracuj na kopii danych i testuj na małym obszarze. To młody program.
________________________________________

### Podsumowanie 🎯
- **GeoLibre** to darmowy GIS na licencji MIT, który działa w przeglądarce, na desktopie, telefonie i w Jupyterze, a dane trzyma lokalnie.
- Jego mocne strony to **brak instalacji, formaty chmurowe ze strumieniowaniem, ponad 1000 narzędzi Whitebox w WebAssembly i łatwe udostępnianie** mapy linkiem lub jednym plikiem HTML.
- **QGIS 4.2** pozostaje narzędziem pierwszego wyboru do zaawansowanych analiz, kartografii drukowanej, pracy z bazami danych i dużymi plikami lokalnymi. Pierwszy LTR linii 4.x ma pojawić się dopiero w marcu 2027 r.
- Użytkownicy chwalą wygodę, ale zgłaszają błędy przy dużych plikach i zwracają uwagę na młody wiek projektu.
- Najrozsądniejsza strategia na dziś: **QGIS do pracy, GeoLibre do pokazywania wyników i szybkiego podglądu**.

________________________________________

Źródła: 
- [repozytorium opengeos/GeoLibre](https://github.com/opengeos/GeoLibre), 
- [dokumentacja i porównanie z innymi programami](https://geolibre.app/comparison/), 
- [ogłoszenie wersji 1.0 na blogu autora](https://gishub.org/blog/geolibre/), 
- [film „GeoLibre 1.0: A Free, Open-Source Cloud-Native GIS That Runs Anywhere”](https://youtu.be/87Cm0QagtxI) i [nagranie webinaru o pracy z danymi chmurowymi](https://youtu.be/RgNoKsvZ5Hk) (oba: kanał Open Geospatial Solutions, Qiusheng Wu),
- [dyskusja na Hacker News](https://news.ycombinator.com/item?id=48479852), 
- [GeoLibre w Google Play](https://play.google.com/store/apps/details?id=org.geolibre.app), 
- [changelog QGIS 4.2](https://changelog.qgis.org/en/version/4.2/), 
- [zmiana harmonogramu LTR na blogu QGIS](https://blog.qgis.org/2026/10/03/release-schedule-changes-for-next-qgis-ltr/). 
- Zrzuty ekranu z GeoLibre pochodzą z README projektu oraz część wykonaliśmy sami w wersji webowej z 18 października 2026 r.
