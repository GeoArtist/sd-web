---
id: 13
title: RustGIS - lekki desktopowy GIS w Ruście. Co potrafi i czym różni się od QGIS?
addDate: 2026-10-21
modifyDate: 2026-10-21
keywords:
    - geodezja
    - gis
    - rustgis
    - qgis
    - rust
    - open source
summary: "RustGIS 0.3 - darmowy GIS napisany w Ruście, z interfejsem wstążkowym, wersją w przeglądarce i asystentem AI. Funkcje, instalacja, wady, opinie i porównanie z QGIS 4.2"
thumbnail: /images/blog/thumbnails/rustgis-vs-qgis-thumbnail.jpg
thumbnailAlt: "globus 3D i panel asystenta AI w RustGIS miniaturka"
---

**RustGIS 🦀** to kolejny nowy, darmowy program GIS od autora GeoLibre, tym razem napisany w całości w języku Rust. Instaluje się jako jeden plik o rozmiarze kilkudziesięciu megabajtów skompilowany do WebAssembly, ma interfejs wstążkowy znany z ArcGIS Pro i działa również w przeglądarce. Każdy przycisk interfejsu jest poleceniem, które można uruchomić z wiersza poleceń, z Pythona albo zlecić asystentowi AI.

Projekt jest bardzo młody: repozytorium powstało 10 października 2026 r., a w chwili pisania artykułu aktualna jest wersja **0.3.0** z 16 października. Niedawno opisywaliśmy [GeoLibre](/blog/12-geolibre-vs-qgis), dziś sprawdzamy jego „rodzeństwo”: co RustGIS potrafi, jak się go instaluje, gdzie ma sens i czym różni się od QGIS 4.2.

![RustGIS z włączonym globusem 3D, panelem warstw i otwartym panelem asystenta AI - źródło: README projektu opengeos/RustGIS](/images/blog/images/13/rustgis-globe-ai-assistant.jpg)
________________________________________

### 🧭 Skąd się wziął RustGIS?
Za projektem stoi **Qiusheng Wu** z University of Tennessee, twórca bibliotek geemap i leafmap oraz programu GeoLibre. RustGIS rozwija ta sama organizacja **opengeos**, a kod jest na licencji **Apache 2.0**. To licencja liberalna, podobnie jak MIT w GeoLibre: pozwala używać programu komercyjnie i wbudowywać jego biblioteki (w Ruście zwane crates) we własne, także zamknięte produkty.

Tempo prac jest jeszcze szybsze niż przy GeoLibre:
- **10 października 2026 r.** - pierwszy commit,
- **12 października 2026 r.** - wersja 0.1.0: aplikacja desktopowa, wersja webowa i 15 języków interfejsu,
- **13 października 2026 r.** - wersja 0.2.0: GeoPackage, GeoParquet, FlatGeobuf, KML, GPX, PMTiles, serwer MCP dla agentów AI,
- **16 października 2026 r.** - wersja 0.3.0: katalogi otwartych danych, rendering na karcie graficznej (beta), pakiet Pythona, chmury punktów LiDAR, PostGIS.

Po dziesięciu dniach repozytorium miało ponad 1700 gwiazdek na GitHubie. Autor pisze wprost w pliku README, że RustGIS powstaje **głównie z pomocą modelu AI Claude Opus 5.5**, pod kierunkiem i kontrolą człowieka, i prosi o zgłaszanie błędów. Dla porównania: 7 października 2026 r. projekt QGIS przyjął propozycję QEP 428, która zakazuje wnoszenia do głównego repozytorium kodu tworzonego z pomocą AI. Te dwa projekty wybrały więc skrajnie różne drogi.
________________________________________

### ⚙️ Jak to działa pod maską?
W odróżnieniu od GeoLibre, który jest aplikacją webową opakowaną w okno, RustGIS to **jeden natywny program bez silnika przeglądarki w środku**. Interfejs rysuje sam, na karcie graficznej:
- **egui** - biblioteka interfejsu użytkownika,
- **wgpu** - warstwa grafiki, która używa Direct3D 12 na Windows, Metal na macOS, Vulkan na Linuksie, a w razie problemów OpenGL,
- **tiny-skia** - renderer map 2D i eksportu do PNG,
- **geo, proj4rs, Apache Arrow i Parquet, rusqlite** - geometria, odwzorowania, GeoParquet i GeoPackage,
- **wasmi** - maszyna wirtualna WebAssembly dla wtyczek.

Nie ma w środku Pythona, Qt ani GDAL. Dzięki temu instalator ma, według strony projektu, od 18 do 30 MB w zależności od systemu (serwis Frontier Now zmierzył 23-26 MB dla obrazów macOS i 36 MB dla AppImage na Linuksa). Ta sama cecha ma drugą stronę: formaty, których RustGIS nie czyta własnym kodem, dostaje tylko wtedy, gdy na komputerze są zainstalowane programy GDAL (`ogr2ogr`) albo DuckDB. Czyli zamiast je bezpośrednio zawierać, RustGIS po prostu je wywołuje.

Autor podkreśla też, że kod nie zawiera bloków `unsafe`, każdy plik i parametr traktuje jako potencjalnie błędny, a zestaw testów uruchamia wszystkie polecenia i narzędzia z losowymi danymi, żeby sprawdzić, czy program się nie wysypie.

**Dane zostają na komputerze.** Polityka prywatności mówi, że aplikacja nie zbiera telemetrii. Do sieci wychodzą tylko: pobranie kafli podkładu, wyszukiwanie miejsc (Nominatim), wyznaczanie trasy (serwer Valhalla, po potwierdzeniu), dane dodane z adresu URL, wtyczki oraz zapytania do wybranego modelu AI. Strona dokumentacji i aplikacja webowa używają Google Analytics, ale bez dostępu do danych z mapy.
________________________________________

### 📱 Gdzie to działa i jak się instaluje?
- **Windows** - instalator `setup.exe` bez uprawnień administratora, `.msi` dla całej maszyny (także przez `msiexec /qn` do wdrożeń zbiorczych), archiwum przenośne ZIP, Microsoft Store oraz `winget install OpenGeos.RustGIS`. Pliki spoza sklepu nie są jeszcze podpisane, więc SmartScreen pokaże ostrzeżenie o nieznanym wydawcy.
- **macOS** - obrazy DMG dla Apple Silicon i Intel, podpisane i notaryzowane przez Apple, albo `brew install --cask opengeos/rustgis/rustgis`.
- **Linux** - pakiety `.deb` i `.rpm`, AppImage z automatyczną aktualizacją, archiwum `.tar.gz`, AUR (`rustgis-bin`) i Fedora COPR. Obsługa X11 i Wayland.
- **Przeglądarka** - web.rustgis.app, wymaga WebGPU lub WebGL2. Tę samą aplikację można zainstalować jako PWA na iPhonie, Androidzie i komputerze. Po instalacji działa offline, ale bez podkładów z sieci, danych webowych, wtyczek i asystenta AI. Dokumentacja ostrzega, że iOS daje stronie mniej pamięci, więc bardzo duże rastry mogą się nie otworzyć.
- **Ze źródeł** - `cargo run --release -p rustgis` z Rustem 1.90 lub nowszym.
- **Przez agenta AI** - w repozytorium jest tzw. skill, dzięki któremu asystent (np. Claude Code) sam dobierze platformę, zainstaluje program i narzędzie `rustgis-cli` oraz zarejestruje serwer MCP.

Razem z aplikacją instaluje się **rustgis-cli**, narzędzie wiersza poleceń. Osobno jest pakiet Pythona `rustgis` (pip, Python 3.12 lub nowszy).

Jeśli program nie startuje, dokumentacja podpowiada przełączenie backendu graficznego, np. `rustgis --backend gl`. Na Windows Vulkan jest używany tylko na wyraźne życzenie, bo niektóre sterowniki Intel UHD 600 powodują awarię przy starcie.

![strona startowa RustGIS w przeglądarce: wstążka z kartą Home, panel warstw i mapa World Atlas - zrzut z web.rustgis.app](/images/blog/images/13/rustgis-web-home-screenshot.jpg)
________________________________________

### 🖥️ Interfejs: wstążka w kolejności pracy
Po uruchomieniu RustGIS otwiera przykładowy projekt **World Atlas** z danymi Natural Earth. Interfejs to wstążka z kartami ułożonymi w kolejności pracy: **Home, Data, Style, Edit, Analyze, View, Publish**, plus Plugins, Settings i Help. Po lewej są panele **Layers, Browser i Data Sources**, tabelę atrybutów otwiera Ctrl+T, a **Command Search (Ctrl+K)** znajduje każde polecenie i narzędzie po nazwie. Każda zmiana ma cofnięcie.

Użytkownicy ArcGIS Pro poczują się jak w domu. Sam projekt przyznaje, że osoby przyzwyczajone do pasków narzędzi QGIS mogą tego nie chcieć i że to kwestia gustu. Dla użytkowników QGIS strona porównania ma słowniczek: 
- Processing Toolbox to panel Tools, 
- Graphical Modeler to ModelBuilder, 
- Print Layout i Atlas to Layouts i Map Series, 
- `qgis_process` to `rustgis-cli run`.
________________________________________

### 📂 Dane i formaty
Własnym kodem (a więc także w przeglądarce) RustGIS czyta:
- **wektory** - GeoJSON, CSV/TSV z kolumnami współrzędnych lub WKT, arkusze Excel i OpenDocument, Shapefile (także w ZIP, z układem z pliku `.prj`), GeoPackage, GeoParquet, FlatGeobuf, KML/KMZ ze stylami, GPX, GML, MapInfo MIF/MID, OSM PBF, TopoJSON, DXF, LandXML, zdjęcia z geotagami,
- **chmury punktów** - LAS, LAZ i COPC jako warstwy punktowe,
- **rastry** - GeoTIFF i COG (każdy typ piksela, kafelkowany lub paskowy, skompresowany), siatki ASCII, magazyny Zarr 2 i 3,
- **kafle i usługi** - XYZ/TMS/WMS, WMTS, OGC API Tiles, Mapbox Vector Tiles i style MapLibre, PMTiles i MBTiles, WFS, WCS, OGC API Features, usługi ArcGIS REST, katalogi CSW,
- **bazy danych** (desktop) - PostgreSQL/PostGIS, MySQL i MariaDB, **tylko do odczytu**; pliki i zapytania DuckDB, jeśli DuckDB jest zainstalowany.

Formaty takie jak File Geodatabase, DWG, JPEG 2000, NetCDF czy HDF działają tylko wtedy, gdy na komputerze jest GDAL. Eksport obejmuje GeoJSON, CSV, GeoPackage, GeoParquet, Shapefile, FlatGeobuf, KML/KMZ, GPX i WKT. Wersja w przeglądarce nie zapisuje GeoPackage.

Duże pliki są czytane **„na miejscu”**, widok po widoku: COG pobiera tylko potrzebne kafle, FlatGeobuf swój indeks i obiekty w zasięgu, GeoParquet stopkę i potrzebne grupy wierszy. Działa to także przez HTTP i z zasobników S3, również prywatnych.

Od wersji 0.3.0 panel **Web Data** zbiera otwarte dane świata: katalogi STAC (w tym Microsoft Planetary Computer), Overture Maps, OpenStreetMap po obszarze (Overpass), granice administracyjne geoBoundaries, Source Cooperative oraz portale CKAN, Socrata i ArcGIS Hub.

**Ważne ograniczenie:** RustGIS przechowuje dane wektorowe w układzie **WGS 84 (długość i szerokość geograficzna)**. Nie ma pełnej biblioteki PROJ, więc nie ma transformacji między układami odniesienia ani siatek korekcyjnych. Rastry i sama mapa są przeliczane na podstawie kodu EPSG. Mapę można wyświetlić np. w układzie **PL-1992 (EPSG:2180)**, co sprawdziliśmy w przeglądarce (zrzut poniżej), ale do prac geodezyjnych w PL-2000, gdzie liczy się dokładność centymetrowa, to narzędzie się nie nadaje. Projekt mówi o tym sam: „obejmuje kartografię i większość analiz, ale nie prace pomiarowe w lokalnym układzie odniesienia”.

![mapa Polski i sąsiadów w RustGIS w przeglądarce z układem EPSG:2180 widocznym na pasku stanu - zrzut z web.rustgis.app](/images/blog/images/13/rustgis-web-pl1992-screenshot.jpg)
________________________________________

### 🧮 Analizy
Karta **Analyze** zbiera:
- **narzędzia wbudowane** - bufor, przycięcie (Clip), wymazanie (Erase), agregacja (Dissolve), Summarize Within, statystyki, geometria, selekcja atrybutowa klauzulą SQL `WHERE` i selekcja przestrzenna,
- **ponad 1000 narzędzi GeoLibre i Whitebox** - rzeźba terenu, hydrologia, LiDAR, teledetekcja, narzędzia wektorowe i rastrowe, te same, które opisaliśmy przy GeoLibre, działające natywnie i w przeglądarce,
- **prowadzone przepływy pracy** - analiza widoczności (viewshed), linia widzenia, interpolacja IDW, najkrótsza ścieżka, analiza przydatności terenu,
- **funkcje rastrowe** - działania na pasmach, wskaźniki, detekcja zmian, klasyfikacja pikseli (k-średnich, minimalna odległość, prosta sieć neuronowa do wytrenowania),
- **ModelBuilder** - łączenie narzędzi w graf na płótnie, także zbudowany z historii uruchomień,
- **panel SQL** - zapytania DuckDB Spatial na plikach, adresach i bazach (desktop, wymaga DuckDB),
- **AI Assistant** - omówiony niżej.

Czego brakuje na dzisiaj: **złączenia przestrzennego (spatial join), przecięcia i sumy warstw (intersect, union)**, analiz sieciowych na prawdziwych grafach dróg i statystyki przestrzennej. Projekt wymienia je w planach jako następne, a do tego czasu trzeba polegać na narzędziach Whitebox albo QGIS.

![karta Analyze w RustGIS z galerią narzędzi, panelem Tools i narzędziem Buffer: 300-kilometrowe bufory wokół miast Afryki - źródło: README projektu opengeos/RustGIS](/images/blog/images/13/rustgis-analyze-buffer.jpg)
________________________________________

### 🎨 Kartografia, wydruk i publikacja
- **Symbolizacja** - pojedynczy symbol, wartości unikalne, kolory skalowane, symbole proporcjonalne, agregacja do heksagonów i kwadratów, wyciąganie 2.5D ze światłem i cieniem, dla rastrów rozciągnięcie, RGB, klasyfikacja, mapa kolorów i cieniowanie rzeźby. Rampy kolorów można importować z QGIS, GDAL i GMT.
- **Etykiety** - bezkolizyjne rozmieszczenie, zakresy skal, adnotacje.
- **Mapa** - wiele map i kompozycji w projekcie, globus 3D, dowolne odwzorowanie (Equal Earth, Robinson, Winkel Tripel lub kod EPSG), teren z nachyleniem widoku, podkłady Księżyca, Marsa i dziewięciu innych ciał niebieskich, suwak czasu.
- **Kompozycje (Publish)** - ramki map, legendy, podziałki, siatki, strzałka północy, **serie map** (odpowiednik atlasu), eksport do PDF i PNG w dowolnej rozdzielczości.
- **Raporty i prezentacje** - raporty z grupowaniem, statystykami i wykresami, prezentacje jako pokaz HTML lub PDF, notatniki z komórkami tekstu i poleceń (import i eksport `.ipynb`).
- **Udostępnianie** - strona mapy w jednym pliku HTML, kolekcje OGC API Features, style MapLibre, sceny glTF, paczki projektu `.rgispkg` z danymi w środku.

Projekt zapisuje się jako otwarty plik JSON `.rgis`. Co ważne dla użytkowników QGIS: **RustGIS nie otwiera projektów `.qgz` ani pełnych stylów `.qml`**, czyta z nich tylko rampy kolorów. Dane trzeba przenieść (najłatwiej przez GeoPackage) i ostylować od nowa.

![karta Publish w RustGIS z kompozycją A4: ramka mapy, legenda, strzałka północy i podziałka - źródło: README projektu opengeos/RustGIS](/images/blog/images/13/rustgis-publish-layout.jpg)
________________________________________

### 🤖 Wszystko jest poleceniem: CLI, Python, MCP i asystent AI
To najbardziej odróżniająca cecha RustGIS. Każdy przycisk wstążki ma identyfikator i parametry w JSON. Te same identyfikatory działają z:
- **rustgis-cli** - np. `rustgis-cli render dzialki.geojson mapa.png --basemap ocean` wyrenderuje mapę bez otwierania okna, a `rustgis-cli run` wykona łańcuch poleceń i zapisze projekt,
- **pakietu Pythona** `rustgis` - ten sam silnik w procesie Pythona, z przejściem do GeoPandas i podglądem aplikacji w Jupyterze (`rustgis.Map`),
- **serwera MCP** (`rustgis-cli mcp`) - agent taki jak Claude Code, Cursor czy VS Code może sam robić mapy w RustGIS,
- **AI Assistant** w aplikacji - panel czatu, który rozumie polecenia w zwykłym języku („oznacz miasta etykietami i przybliż do Tokio”) i wykonuje je przez te same polecenia. Każdy krok trafia do historii i da się go cofnąć, a operacje na plikach, sieci i wtyczkach czekają na zgodę użytkownika.

Asystent obsługuje modele Anthropic, OpenAI (klucz API albo logowanie planem ChatGPT), Gemini, OpenRouter, lokalną Ollamę i dowolny serwer zgodny z API OpenAI. Potrzebny jest własny klucz. Do dostawcy trafiają: treść pytania, nazwy warstw i pól oraz wiersze, które asystent odczyta, żeby odpowiedzieć. Recenzent serwisu GIS Tuto zwraca uwagę, że klucz API jest przechowywany na dysku w postaci niezaszyfrowanej.

**Wtyczki** to moduły WebAssembly z zadeklarowanymi uprawnieniami (edycja projektu, odczyt plików, sieć). Ten sam plik wtyczki działa na desktopie, w CLI i w przeglądarce. Rejestr jest nowy i mały. Nie ma wtyczek w Pythonie ani konsoli Pythona w aplikacji, co dla wielu użytkowników QGIS będzie dużą różnicą.
________________________________________

### 💼 Gdzie konkretnie można to wykorzystać?
Na podstawie dokumentacji, recenzji i naszych testów w przeglądarce widzimy kilka sensownych zastosowań:
- **Komputer bez uprawnień administratora** - instalator `setup.exe` lub ZIP przenośny instaluje się w profilu użytkownika, a w ostateczności zostaje wersja w przeglądarce.
- **Seryjne mapy z wiersza poleceń** - `rustgis-cli render` i `rustgis-cli run` pozwalają co noc wygenerować PNG lub PDF z aktualnymi danymi, bez okna programu. W QGIS robi się to przez `qgis_process` i PyQGIS, co wymaga więcej konfiguracji.
- **Szybki podgląd otwartych danych** - panel Web Data pobierze budynki OSM dla gminy przez Overpass, znajdzie najczystsze sceny Sentinel-2 w katalogu STAC albo wczyta budynki Overture dla bieżącego widoku. O analizach na takich zobrazowaniach pisaliśmy w artykule [Wskaźniki roślinności](/blog/5-vegetation-indexes).
- **Analizy terenu i hydrologii** - narzędzia Whitebox na NMT w GeoTIFF: spadki, cieniowanie, wypełnienie zagłębień, sieć cieków i zlewnie, jak w artykułach [NMT i jego zastosowania](/blog/2-dtm-usage) oraz [Analiza zlewni](/blog/1-watershed-analysis). Recenzent GIS Tuto chwalił szybkość tych operacji.
- **Podgląd chmur punktów** - pliki LAZ i COPC, np. z GUGiK, jako warstwy punktowe. O klasyfikacji chmur pisaliśmy w artykule [Klasyfikacja chmury punktów LiDAR](/blog/10-lidar-classification-qgis).
- **Przesiadka z ArcGIS Pro** - wstążka, ModelBuilder, domeny, podtypy i reguły atrybutów używają słownictwa Esri. Dla kogoś, kto traci licencję ArcGIS, próg wejścia jest niższy niż w QGIS.
- **Agenci AI robiący mapy** - serwer MCP i polecenia z identyfikatorami to dziś najprostszy sposób, żeby asystent AI wygenerował mapę w powtarzalny, audytowalny sposób. O podobnych wtyczkach do QGIS pisaliśmy w artykule [Sztuczna inteligencja w QGIS](/blog/11-ai-plugins-qgis).
- **Własne produkty** - licencja Apache 2.0 pozwala wbudować silnik renderowania lub czytniki formatów w komercyjne oprogramowanie.

Czego byśmy nim nie robili: operatów geodezyjnych i prac w PL-2000, edycji wierzchołków istniejących obiektów, map do druku w wydawnictwach kartograficznych i czegokolwiek, co wymaga wtyczek QGIS.
________________________________________

### 🟩 Stan QGIS w październiku 2026
Dla przypomnienia (szczegóły w [artykule o GeoLibre](/blog/12-geolibre-vs-qgis)):
- **QGIS 4.0 „Norrköping”** (6 marca 2026 r.) przeniósł program na Qt6, a **QGIS 4.2 „Belém do Pará”** (3 lipca 2026 r.) rozbudował 3D, chmury punktów i kompozycje wydruku.
- Wersja bieżąca to **4.2.3** z 25 września 2026 r. Wydanie 4.4 zaplanowano na 30 października 2026 r.
- Wersja 4.2 **nie** zostanie LTR. Pierwszym wydaniem długoterminowym linii 4.x ma być 4.4.4 z celem na 5 marca 2027 r. Do tego czasu stabilnym wyborem pozostaje QGIS 3.44 LTR.
- W repozytorium wtyczek QGIS jest ponad 4200 pozycji, ale część wciąż nie ma wersji zgodnej z QGIS 4.

Strona RustGIS pokazuje zresztą ten sam zestaw danych World Atlas w obu programach, żeby łatwo było porównać interfejsy.

![QGIS z tymi samymi danymi World Atlas na globusie ortograficznym: paski narzędzi oraz panele Browser i Layers - źródło: strona porównania rustgis.app](/images/blog/images/13/qgis-world-atlas-same-data.jpg)
________________________________________

### ⚖️ RustGIS a QGIS 4.2 - czym się różnią?
Sam projekt pisze: „RustGIS nie jest zamiennikiem QGIS i nie chce nim być. Jeśli Twoja praca zależy od tego, co QGIS robi najlepiej, zostań przy QGIS”. Najważniejsze różnice:
- **Rozmiar i instalacja** - RustGIS to jeden program o rozmiarze kilkudziesięciu megabajtów bez Pythona, Qt i GDAL. QGIS instaluje je wszystkie i waży setki megabajtów. Za to QGIS po instalacji „umie wszystko”, a RustGIS część formatów dostaje dopiero po doinstalowaniu GDAL i DuckDB.
- **Przeglądarka** - RustGIS działa jako cała aplikacja w karcie przeglądarki. QGIS nie ma wersji przeglądarkowej, publikuje mapy przez QGIS Server i wtyczkę qgis2web.
- **Układy współrzędnych** - QGIS ma pełny PROJ: każdy układ, transformacje datum, siatki korekcyjne i warstwy w ich własnych układach. RustGIS trzyma wektory w WGS 84 i przelicza tylko rastry i mapę po kodzie EPSG. Dla geodety to różnica zasadnicza.
- **Formaty i bazy** - QGIS czyta i zapisuje wszystko, co obsługuje jego GDAL/OGR, i edytuje dane w PostGIS, SpatiaLite, Oracle i SQL Server. RustGIS czyta bazy tylko do odczytu, a projektów `.qgz` nie otwiera wcale.
- **Edycja** - QGIS ma kompletny zestaw digitalizacji: edycję wierzchołków, przekształcanie, krzywe równoległe, edycję topologiczną, sprawdzanie geometrii. RustGIS tworzy, przesuwa, obraca, skaluje, dzieli i łączy obiekty z przyciąganiem, ale **nie edytuje jeszcze wierzchołków istniejących obiektów**. Strona główna projektu twierdzi inaczej niż dokumentacja porównawcza i plan prac, więc uznajemy to za funkcję w przygotowaniu.
- **Analizy** - oba mają ponad 1000 narzędzi, ale QGIS łączy własne algorytmy z GDAL, GRASS i SAGA i ma to, czego RustGIS nie ma: złączenia przestrzenne, intersect i union, analizy sieciowe, statystykę przestrzenną. Siła RustGIS to Whitebox: teren, hydrologia, LiDAR, obrazy.
- **Kartografia i wydruk** - QGIS ma najbogatszą symbolizację w otwartym GIS: renderery regułowe, nadpisania sterowane danymi, tryby mieszania, generatory geometrii, dopracowane etykietowanie i dojrzały kompozytor z atlasem. W RustGIS są popularne renderery, bezkolizyjne etykiety i kompozycje z seriami map, ale w pierwszych wersjach.
- **Skrypty i rozszerzenia** - QGIS: PyQGIS, konsola Pythona, tysiące wtyczek z pełnym dostępem do systemu. RustGIS: każde polecenie dostępne z CLI, Pythona, notatnika i MCP, wtyczki WebAssembly w piaskownicy, ale bez Pythona w aplikacji i z małym rejestrem.
- **AI** - RustGIS ma asystenta i serwer MCP wbudowane. QGIS ma to przez wtyczki, a sam kod QGIS od października 2026 r. nie przyjmuje wkładu pisanego z pomocą AI.
- **Dojrzałość** - QGIS ma 24 lata, cykl LTR, dokumentację, kursy, książki i wsparcie komercyjne. RustGIS ma dwa tygodnie i wiele funkcji w pierwszej wersji. Recenzent GIS Tuto podsumował: „obiecujący projekt, nie narzędzie produkcyjne”.

Oba programy czytają i zapisują GeoPackage, GeoParquet, FlatGeobuf, Shapefile, GeoJSON, KML, GPX, CSV i GeoTIFF, więc dane między nimi przenosi się bez konwersji. Style trzeba odtworzyć.

A jak RustGIS ma się do GeoLibre? To ten sam zestaw narzędzi geoprzetwarzania i ta sama filozofia „dane zostają u Ciebie”, ale GeoLibre sięga dalej po dane (formaty chmurowe, bazy, usługi OGC i Esri), ma aplikacje na Androida i iOS, widżet Jupytera i współpracę w czasie rzeczywistym. RustGIS jest za to jednym natywnym programem z klasyczną wstążką i w pełni skryptowalnym silnikiem poleceń.
________________________________________

### 💬 Co piszą użytkownicy?
Projekt ma kilka dni, więc opinii jest mało i większość to pierwsze wrażenia:
- **It's FOSS (13 października)** - opis bez krytyki: lekki instalator, znajomy interfejs wstążkowy, 1000 narzędzi, streaming dużych plików.
- **GIS Tuto / giscrack.com (14 października)** - najbardziej krytyczny tekst. Chwali wstążkę, ModelBuilder i szybkość narzędzi na NMT (wypełnianie, kierunki spływu, akumulacja). Ale test asystenta AI przy wyznaczaniu sieci cieków zawiódł: wynik to „rozproszone piksele zamiast połączonych kanałów”, a część poleceń została wykonana połowicznie lub zignorowana. Autor wylicza też: brak edycji wierzchołków, brak edycji wieloosobowej, spatial join i intersect „w budowie”, wektory w WGS 84 bez pełnego systemu odwzorowań, klucz API bez szyfrowania. Odnotowuje podział w społeczności: entuzjazm wobec pomysłu i dorobku autora, ale też podejrzenia, że to kopia ArcGIS Pro, i wątpliwości co do jakości kodu pisanego głównie przez AI (w cztery dni powstało 174 commitów i około 107 tysięcy linii kodu).
- **Frontier Now (17 października)** - neutralnie: „powtarzalne polecenia, dostęp z przeglądarki i wiele interfejsów danych to konkretne zalety”, ale lista formatów nie dowodzi stabilności na dużych projektach produkcyjnych.
- **LinkedIn i X** - entuzjazm wokół wersji webowej i serwera MCP. Powtarzają się pytania o duże zbiory danych, zachowanie układów współrzędnych i powtarzalność przetwarzania. Pod filmem z premiery jeden z widzów zgłaszał problem z wczytaniem Shapefile w niestandardowym odwzorowaniu.
- **GitHub** - 30 otwartych zgłoszeń przy 1750 gwiazdkach, 14 nowych współautorów w wersji 0.3.0.

Polskojęzycznych opinii nie znaleźliśmy. Nasz własny test: ta sama scena Sentinel-2 w formacie COG, którą bez problemu otworzyliśmy w GeoLibre, w RustGIS w przeglądarce bez karty graficznej nie wczytała się w limicie 30 sekund. Środowisko testowe było nietypowe, więc nie traktujemy tego jako wyroku, raczej jako sygnał, że warto testować na własnych danych.
________________________________________

### ⚠️ Ograniczenia, o których trzeba wiedzieć
- **Układy współrzędnych** - wektory tylko w WGS 84, brak transformacji datum. Do prac geodezyjnych w PL-2000 to dyskwalifikujące.
- **Edycja** - brak edycji wierzchołków istniejących obiektów, brak edycji wieloosobowej i wersjonowania.
- **Analizy wektorowe** - brak spatial join, intersect, union, analiz sieciowych i statystyki przestrzennej.
- **Bazy danych** - tylko odczyt, tylko na desktopie.
- **Zależności zewnętrzne** - GDAL i DuckDB trzeba doinstalować samemu, inaczej część formatów i panel SQL nie działają.
- **Brak serwera i aplikacji mobilnej** - jest tylko statyczna wersja webowa do samodzielnego hostowania.
- **Podpisy cyfrowe** - pliki na Windows nie są podpisane (poza Microsoft Store).
- **Rendering GPU** - oznaczony jako beta; na starszych kartach Intel może być potrzebny tryb OpenGL.
- **Brak polskiego interfejsu** - 16 języków, polskiego wśród nich nie ma.
- **Tempo zmian** - trzy wydania w pięć dni. Opisy funkcji starzeją się w tygodnie.
- **Kod pisany przez AI** - autor to deklaruje i testuje, ale użytkownik powinien weryfikować wyniki, zwłaszcza w analizach.
________________________________________

### 🚀 Jak zacząć?
1. Otwórz **web.rustgis.app** albo zainstaluj aplikację: na Windows `winget install OpenGeos.RustGIS` lub Microsoft Store, na macOS Homebrew, na Linuksie AppImage.
2. Poklikaj w projekcie **World Atlas**: karta Style i Symbology, **Home > Select By Attributes** z warunkiem `continent = 'Europe'`, **Analyze > Buffer** na warstwie miast.
3. Dodaj własne dane przez **Home > Add Data** lub przeciągnięcie pliku. Zacznij od GeoPackage lub GeoJSON.
4. Wypróbuj **Home > Web Data**: OpenStreetMap dla swojej gminy albo sceny Sentinel-2 z katalogu STAC.
5. Jeśli potrzebujesz GDAL (np. do DWG lub NetCDF) lub panelu SQL, zainstaluj osobno GDAL i DuckDB.
6. Dla automatyzacji sprawdź `rustgis-cli commands`, a dla agentów AI `rustgis-cli mcp`.
7. Pracuj na kopii danych i porównuj wyniki z QGIS. To wersja 0.3.
________________________________________

### Podsumowanie 🎯
- **RustGIS** to darmowy GIS na licencji Apache 2.0, napisany w Ruście, z interfejsem wstążkowym, instalatorem rzędu 20-30 MB i wersją w przeglądarce.
- Jego wyróżnikiem jest to, że **każdy przycisk jest poleceniem**: to samo działa z CLI, Pythona, serwera MCP i asystenta AI, z historią i cofaniem.
- Mocne strony to **lekkość, otwarte dane w panelu Web Data, narzędzia Whitebox i automatyzacja**. Słabe: **wektory tylko w WGS 84, brak edycji wierzchołków, brak spatial join i intersect, bazy tylko do odczytu**.
- **QGIS 4.2** pozostaje narzędziem pierwszego wyboru do analiz wektorowych, kartografii, pracy w polskich układach współrzędnych i wszystkiego, co opiera się na wtyczkach.
- Dziś RustGIS ma sens jako lekki podgląd, generator map z wiersza poleceń i poligon doświadczalny dla agentów AI. Za pół roku warto sprawdzić go ponownie.
________________________________________

### 📚 Źródła
- [repozytorium opengeos/RustGIS](https://github.com/opengeos/RustGIS),
- [dokumentacja rustgis.app](https://rustgis.app/),
- [RustGIS i QGIS - porównanie autorów projektu](https://rustgis.app/comparison/qgis/),
- [instrukcja instalacji](https://rustgis.app/installation/),
- [notatki do wydania 0.3.0](https://github.com/opengeos/RustGIS/releases/tag/v0.3.0),
- [film „Introducing RustGIS v0.1.0, the first release!”](https://www.youtube.com/watch?v=JPVNDwrc530) (kanał Open Geospatial Solutions, Qiusheng Wu),
- [recenzja GIS Tuto](https://giscrack.com/rustgis-is-this-the-free-arcgis-pro-esri-users-have-been-waiting-for/),
- [It's FOSS](https://itsfoss.com/rustgis-open-source-gis-tool/),
- [Frontier Now](https://frontiernow.dev/en/github/rustgis/),
- [blog QGIS o zmianie harmonogramu LTR](https://blog.qgis.org/2026/10/03/release-schedule-changes-for-next-qgis-ltr/).
- Zrzuty ekranu podpisane jako pochodzące z README lub strony projektu są materiałami autorów RustGIS, pozostałe wykonaliśmy sami w wersji webowej 21 października 2026 r.
