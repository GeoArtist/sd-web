---
id: 14
title: terrio - GDAL bez GDAL. Biblioteka do danych przestrzennych w Ruście i jej miejsce obok QGIS
addDate: 2026-10-26
modifyDate: 2026-10-26
keywords:
    - geodezja
    - gis
    - terrio
    - qgis
    - gdal
    - rust
    - lidar
summary: "terrio 0.5 - darmowa biblioteka i narzędzie wiersza poleceń w czystym Ruście do czytania, konwersji i reprojekcji rastrów, wektorów i chmur punktów. Funkcje, instalacja, testy na polskich układach, wady i porównanie z QGIS"
thumbnail: /images/blog/thumbnails/terrio-vs-qgis-thumbnail.jpg
thumbnailAlt: "baner terrio z cieniowaną rzeźbą terenu miniaturka"
---

**terrio 🧰** to trzeci w ciągu dwóch tygodni projekt z tej samej stajni co [GeoLibre](/blog/12-geolibre-vs-qgis) i [RustGIS](/blog/13-rustgis-vs-qgis), ale zupełnie innego rodzaju. Nie jest programem z mapą i przyciskami. To **biblioteka i narzędzie wiersza poleceń do czytania, zapisu, konwersji i reprojekcji danych przestrzennych**: rastrów, wektorów i chmur punktów. Napisana w czystym Ruście, bez bibliotek w C, więc buduje się wszędzie tam, gdzie działa Rust, łącznie z przeglądarką.

Jeśli ta rola brzmi znajomo, to słusznie. Dokładnie to robi **GDAL**, biblioteka, na której stoi QGIS, ArcGIS, rasterio, PostGIS i większość świata GIS. terrio nie próbuje zastąpić całego GDAL-a. Chce dać jego najczęściej używane funkcje tam, gdzie zainstalowanie GDAL-a jest problemem, i mieć **dokładnie takie same wyniki**. 

W tym artykule sprawdzamy, co potrafi terrio, jak wypada na polskich układach współrzędnych, gdzie ma sens i czym różni się od QGIS. Tekst napisaliśmy 25 października dla wersji **0.5.0**.

![baner terrio: cieniowana rzeźba terenu i hasło „Geospatial data I/O in pure Rust” - źródło: repozytorium opengeos/terrio](/images/blog/images/14/terrio-banner.jpg)
________________________________________

### 🧭 Skąd się wziął terrio?
Autorem jest ponownie **Qiusheng Wu** z University of Tennessee, a projekt rozwija organizacja **opengeos** na licencji **MIT**. terrio powstał jako warstwa danych dla GeoLibre i RustGIS: oba programy potrzebowały czytników formatów, które działają bez GDAL-a, także w WebAssembly. Punktem wyjścia były biblioteki `wbraster`, `wbvector` i `wbprojection` z projektu whitebox_next_gen Johna Lindsaya (autora WhiteboxTools). Autor terrio pisze, że testy przeciwko GDAL-owi ujawniły w nich błędy dekodowania pikseli i gubienie georeferencji, więc dla kluczowych formatów napisał własne sterowniki, a problemy zgłosił do źródła.

Kalendarium:
- **14 października 2026 r.** - pierwszy commit i wersja 0.1.0,
- **15 października** - 0.1.1 (pierwsza na PyPI) i 0.2.0 z siatkami korekcyjnymi datum, plikami E57 i PLY, filtrami PDAL oraz API zgodnym z rasterio,
- **17 października** - 0.3.1: przetwarzanie strumieniowe dużych plików, zapis GeoParquet w wielu wątkach, pliki HDF-EOS5,
- **20 października** - 0.3.2, pierwsza wersja z gotowymi plikami wykonywalnymi i instalatorem w jednej linii,
- **22 października** - 0.4.0 i 0.4.2: serwer MCP dla agentów AI, własny czytnik WKT 2, kody ESRI w plikach `.prj`, kolejne odwzorowania przeniesione z PROJ-a, pakiety dla Arch Linuksa (AUR) i Fedory (COPR),
- **24 października** - **0.5.0**: sterownik GRIB, operacje geometryczne (bufor, nakładanie, agregacja, naprawa geometrii), warstwice, statystyki strefowe, zapytania SQL, wielowątkowe WebAssembly i pliki powyżej 4 GB w przeglądarce, więcej filtrów chmur punktów.

Po jedenastu dniach repozytorium ma około 180 gwiazdek i 17 forków, czyli wciąż o rząd wielkości mniej niż GeoLibre czy RustGIS. To narzędzie dla programistów i administratorów danych, nie dla każdego użytkownika GIS. Tak jak w tamtych projektach, autor deklaruje w README, że kod powstaje **głównie z pomocą modelu Claude Opus 5.5** pod nadzorem człowieka. Różnica jest taka, że tutaj każdy wynik jest porównywany z GDAL-em, PROJ-em i PDAL-em na prawdziwych plikach, a różnice traktuje się jak błędy.
________________________________________

### ⚙️ Jak to działa pod maską?
- **Czysty Rust** - żadnych zależności od C: nie trzeba instalować GDAL-a, PROJ-a, GEOS-a ani SQLite. Jeden plik wykonywalny, pakiet Pythona z jedną zależnością (NumPy) i pakiet npm dla przeglądarki.
- **Jeden model danych** - funkcja `open()` rozpoznaje format po zawartości pliku i czyta rastry oraz wektory do wspólnego modelu, więc konwersja między dowolnymi dwoma formatami to jedno wywołanie.
- **GDAL jako wzorzec** - każdy sterownik i operacja są porównywane w CI z GDAL 3.12 na rzeczywistych plikach (Natural Earth, USGS 3DEP, Sentinel-2, produkty NASA, OpenStreetMap). Raport zgodności obejmuje ponad 40 tysięcy przypadków: w wersji 0.5.0 39 999 identycznych, 65 w granicach tolerancji i 4 różne, wszystkie te ostatnie w testach transformacji współrzędnych. Tydzień wcześniej różnych było 48, więc poprawki idą szybko.
- **Własna tabela EPSG** - terrio wozi ze sobą 6354 układy geograficzne i odwzorowane z bazy EPSG razem z operacjami, które GDAL wybiera dla każdego z nich, oraz przeniesione do Rusta formuły odwzorowań z PROJ-a. Transformacje do i z WGS 84 zgadzają się z GDAL-em z dokładnością centymetra.
- **Siatki korekcyjne** - od wersji 0.2.0 terrio czyta siatki NTv2, GTX i GeoTIFF z PROJ CDN i stosuje je tak jak PROJ, również w WebAssembly, a od 0.5.0 pobiera je z sieci fragmentami i potrafi łączyć transformacje przez kilka pośrednich układów odniesienia, tak jak PROJ. Strona „Why terrio?” wciąż twierdzi, że siatek nie obsługuje, więc dokumentacja nie nadąża za kodem.
- **Dane chmurowe czytane na miejscu** - COG, PMTiles, Zarr, COPC i EPT są pobierane fragmentami przez HTTP, z S3, Google Cloud Storage i Azure. Pozostałe formaty są najpierw ściągane w całości.
- **Dwa wyraźne nie-cele** - terrio nie odwzorowuje API GDAL-a jeden do jednego i nie zawiera sterowników baz danych (PostGIS, Oracle, SQL Server). Formatów wymagających zamkniętych SDK (MrSID, ECW) też nie będzie.

Dla formatów, których terrio nie czyta (HDF4, NITF, File Geodatabase), istnieje opcjonalny **backend GDAL**: jedyna zależność od C, domyślnie wyłączona, wymaga zbudowania ze źródeł z zainstalowanym GDAL-em 3.4 lub nowszym.
________________________________________

### 📦 Instalacja
terrio ma cztery „twarze” i każdą instaluje się inaczej:
- **Wiersz poleceń** - jedna linia: na Linuksie i macOS `curl -LsSf https://terrio.opengeos.org/install.sh | sh`, na Windows `powershell -ExecutionPolicy ByPass -c "irm https://terrio.opengeos.org/install.ps1 | iex"`. Skrypt pobiera statyczny plik wykonywalny dla Twojej platformy (Linux x86_64 i ARM64, macOS Intel i Apple Silicon, Windows x64 i ARM64), sprawdza sumę SHA-256 i wkłada go do `~/.local/bin`. Nie trzeba mieć Rusta ani Pythona. Alternatywy: `pip install terrio` (też instaluje polecenie), `uv tool install terrio`, `cargo binstall terrio-cli` albo kompilacja `cargo install terrio-cli` (Rust 1.90 lub nowszy). Na Arch Linuksie jest pakiet `terrio-bin` w AUR, na Fedorze repozytorium COPR, oba aktualizowane z każdym wydaniem.
- **Python** - `pip install terrio`. Są gotowe paczki (wheels) dla Linuksa (glibc i musl), macOS i Windows, dla Pythona 3.10 lub nowszego. Potrzebny jest tylko NumPy i mały pakiet `affine`. Jest też paczka dla Pyodide, czyli Pythona w przeglądarce.
- **JavaScript** - `npm install terrio-js`: biblioteka skompilowana do WebAssembly dla przeglądarek i Node.js. Pliki otwiera się z bajtów, bo w WebAssembly nie ma systemu plików.
- **Rust** - `cargo add terrio`.

Na stronie projektu jest też **Playground**: terrio w przeglądarce, do którego można przeciągnąć własny plik GeoTIFF, GeoPackage, Shapefile w ZIP czy LAZ i obejrzeć jego opis, przekonwertować go albo przeliczyć współrzędne. Pierwsze wejście pobiera około 4 MB, a pliki nie opuszczają komputera.

![strona Playground w dokumentacji terrio: pole do przeciągnięcia pliku, przykładowe dane i formularz transformacji współrzędnych - zrzut z terrio.opengeos.org](/images/blog/images/14/terrio-playground-screenshot.jpg)
________________________________________

### 📂 Formaty
W wersji 0.5.0 polecenie `terrio formats` wypisuje 51 sterowników:
- **28 rastrowych** - GeoTIFF i COG (każda kompresja, także LERC, JPEG XL i LZMA), JPEG 2000, Zarr v2 i v3 z GeoZarr, netCDF (odczyt i zapis), HDF5 (odczyt), **GRIB 1 i 2** (odczyt, własny sterownik w Ruście od 0.5.0, ważny dla danych meteorologicznych), ERDAS Imagine (odczyt), kafle GeoPackage, PMTiles, MBTiles, VRT, mozaiki i kafelkowane zasoby STAC, ENVI, Esri BIL/FLT, **Esri ASCII Grid i XYZ** (formaty, w których GUGiK udostępnia NMT), siatki GRASS, Surfer, PCRaster, SAGA, Idrisi, ER Mapper, DTED, PNG i JPEG z plikiem world,
- **17 wektorowych** - GeoPackage (z filtrem przez R-tree i aktualizacją w miejscu), GeoParquet, FlatGeobuf, Shapefile, GeoJSON i GeoJSONSeq, TopoJSON, CSV z kolumnami XY lub WKT, KML/KMZ, GML, GPX, MapInfo TAB/MIF, OpenStreetMap PBF i XML (odczyt), kafle wektorowe PMTiles, MBTiles i MVT,
- **6 chmur punktów** - LAS 1.0-1.4 (wszystkie formaty punktów, extra bytes, przebiegi fal), LAZ, COPC, EPT (odczyt na miejscu, lokalnie i zdalnie), PLY i E57.

Wektory wymieniają się też z ekosystemem Arrow: warstwa zamienia się w tabelę GeoArrow i z powrotem bez pliku pośredniego, co łączy terrio z GeoPandas, Polars i DuckDB.

Czego brakuje w stosunku do GDAL-a: File Geodatabase, HDF4, NITF, MrSID, ECW oraz wszystkich baz danych. To część z ponad 200 sterowników GDAL-a, która zostaje za opcjonalnym backendem. Sterowniki DXF i DWG są już w kodzie na gałęzi głównej, ale nie weszły jeszcze do wydania 0.5.0.
________________________________________

### 🧮 Operacje: narzędzia GDAL-a pod nowymi nazwami
Polecenia terrio odpowiadają jeden do jednego narzędziom GDAL-a, a opcje mają te same nazwy zapisane z myślnikami:
- **`terrio info`** - `gdalinfo` i `ogrinfo`, z `--json`, `--stats` i histogramem,
- **`terrio convert`** - `ogr2ogr`: zmiana formatu, filtr `--where`, wybór kolumn `--select`, zasięg `--spat`, reprojekcja `--t-srs`, dopisywanie do istniejącego GeoPackage,
- **`terrio translate`** i **`terrio warp`** - `gdal_translate` i `gdalwarp`: wycinki, zmiana typu, skalowanie, piramidy, zapis COG, reprojekcja z resamplingiem (nearest, bilinear, cubic, average, mode), linia cięcia,
- **`terrio mosaic`** - `gdalbuildvrt` i `gdal_merge.py`,
- **`terrio rasterize`** i **`terrio polygonize`**,
- **`terrio dem`** - `gdaldem`: cieniowanie (także wielokierunkowe), spadki, ekspozycja, mapa hipsometryczna, TRI, TPI, szorstkość,
- **`terrio calc`**, **`terrio proximity`**, **`terrio sieve`** - algebra map, mapy odległości, czyszczenie klasyfikacji,
- **`terrio crs`** - `gdalsrsinfo` i `gdaltransform`, także z wysokościami i epokami współrzędnych,
- **`terrio grid`** - odpowiednik `writers.gdal` z PDAL: chmura punktów do rastra (max, min, średnia, IDW, TIN) z filtrem klas,
- **`terrio filter`** - filtry PDAL w Ruście: klasyfikacja gruntu SMRF, CSF i PMF, usuwanie odstających punktów, wysokość nad gruntem, przycinanie, normalne, a od 0.5.0 także klastrowanie DBSCAN, cechy kowariancji, współczynnik LOF, kolorowanie punktów z rastra i atrybuty z poligonów.

Wersja 0.5.0 dodała to, czego w pierwszej wersji artykułu brakowało najbardziej, czyli **operacje wektorowe i analizy łączące rastry z wektorami**. Powstały na prośbę użytkownika zgłoszoną 23 października i trafiły do wydania dzień później:
- **`terrio buffer`, `overlay`, `dissolve`** - bufor (planarny, w jednostkach układu warstwy), nakładanie poligonów (przecięcie, suma, różnica, różnica symetryczna) i agregacja po atrybutach,
- **`terrio centroid`, `singlepart`, `vertices`** - centroidy, rozbicie geometrii wieloczęściowych, wierzchołki jako punkty,
- **`terrio is-valid`, `make-valid`, `clean`** - raport poprawności geometrii, naprawa i czyszczenie topologii (przyciąganie do siatki, duplikaty, domykanie pierścieni),
- **`terrio contour`** - warstwice z rastra, ten sam algorytm co w GDAL,
- **`terrio zonal-stats`** - statystyki strefowe dla poligonów z wielu pasm i rastrów, z przeliczaniem układów,
- **`terrio sample`** i **`terrio footprint`** - próbkowanie rastrów w punktach i dokładny obrys ważnych danych rastra,
- **`terrio sql`** - zapytania SELECT z WHERE, ORDER BY i LIMIT na warstwach wektorowych.

Autor porównał każdą z tych operacji z GDAL-em i GEOS-em: nakładanie i agregacja mieszczą się w tolerancji względnej 1e-7, bufory w 5e-4 (bo łuki są przybliżane odcinkami). Operacje są planarne, więc bufor na warstwie w WGS 84 liczy się w stopniach.

Z Pythona te same operacje są funkcjami z argumentami nazwanymi jak opcje CLI. Dla osób piszących w rasterio jest moduł `terrio.rio`: skrypty działają po zmianie jednej linii importu, a od 0.5.0 jest też polecenie `terrio-rio`, odpowiednik `rio` z rasterio. Dla xarray jest `terrio.xarray` z metodami znanymi z rioxarray. Jest też **serwer MCP** (`terrio mcp`), dzięki któremu asystent AI (Claude Code, Cursor, VS Code) może wywoływać te polecenia na Twoich plikach, pytając przed każdą operacją zapisu.
________________________________________

### 🧪 Nasz test: Warszawa, PL-1992 i PL-2000
Zainstalowaliśmy terrio 0.3.2 przez `pip` na zwykłym laptopie z Windows i sprawdziliśmy to, co dla polskiego użytkownika najważniejsze: układy współrzędnych.
- **Transformacja punktu w Warszawie** (21,0122° E, 52,2297° N) z WGS 84 do **PL-1992 (EPSG:2180)** i do **PL-2000 strefy 7 (EPSG:2177)**. Wyniki terrio i biblioteki pyproj (czyli PROJ-a) zgodziły się **co do ostatniej cyfry po przecinku**, na poziomie dziesiątych części mikrometra.
- **`terrio info`** na scenie Sentinel-2 z 28 września 2026 r., leżącej jako COG w publicznym archiwum AWS: pełny opis pliku (10980 na 10980 pikseli, EPSG:32634, piramidy, nodata) w 1,3 sekundy, bez pobierania obrazu.
- **`terrio translate --projwin`** wyciął z tego pliku prostokąt nad centrum Warszawy (2398 na 2339 pikseli). Trwało to 37 sekund, bo kafle wycinka (17 MB po zapisie) musiały przyjść z serwera w USA.
- **`terrio warp --t-srs EPSG:2180`** przeliczył wycinek do PL-1992 w **0,4 sekundy**, a **`terrio convert -f COG`** zapisał go jako COG z kompresją Deflate w 0,5 sekundy.

Wynik warpu widać poniżej. Zwróćcie uwagę na lekki obrót obrazu: to właśnie różnica między strefą UTM 34N a PL-1992.

Po wyjściu wersji 0.5.0 powtórzyliśmy test. Współrzędne w PL-1992 i PL-2000 wyszły co do cyfry takie same jak wcześniej, a warp tego samego wycinka zajął 0,3 sekundy.

![scena Sentinel-2 nad Warszawą po reprojekcji do układu PL-1992 narzędziem terrio warp - nasz wynik](/images/blog/images/14/terrio-warp-warsaw-pl1992.jpg)
________________________________________

### ⚡ Wydajność: lekcja pokory w cztery dni
Pierwsza wersja tego artykułu zawierała wykres z benchmarków projektu: konwersja 800-megabajtowego GeoTIFF-a do COG w 1,5 s zamiast 21 s, warp w 2,2 s zamiast 16,4 s, cieniowanie w 0,6 s zamiast 4,6 s, czyli przewaga od 1,1 do 13,6 razy nad GDAL 3.12.2. **Usunęliśmy ten wykres, bo autor wycofał te tabele.** Co się stało:
- **23 października** użytkownik o nicku julsbreakdown zauważył, że GDAL był mierzony z domyślnymi ustawieniami, czyli w większości operacji jednowątkowo, podczas gdy terrio używał wszystkich 40 wątków. Po wyrównaniu liczby wątków czas GDAL-a dla konwersji do COG spadł z 21,4 s do 2,35 s i zrównał się z terrio (2,45 s).
- **24 października** użytkownik geoffhtaylor3d dołożył trzy zarzuty: GDAL był mierzony przy liczbie wątków, przy której (według notatek samego autora) jest wolniejszy, skrypt nigdy nie porównywał wyników obu narzędzi, więc „szybko i źle” też liczyło się jako sukces, a opcja `--threads` nie ograniczała wszystkich wątków terrio.
- Tego samego dnia autor wycofał tabele i opublikował nową metodę: każde narzędzie jest strojone osobno przy budżecie 1, 2, 4, 8, 16 i 40 procesorów, wyniki są porównywane piksel po pikselu i obiekt po obiekcie **przed** zaliczeniem czasu, a wiersze zmierzone przy obciążonej maszynie nie dostają współczynnika.

Nowe liczby (GDAL 3.13.3, terrio 0.5.0) są dużo skromniejsze. Z 22 przypadków tylko 8 przeszło wszystkie bramki, a w nich terrio jest szybszy **od 1,2 do 1,65 razy**: wycinek rastra 1,21, warp najbliższym sąsiadem 1,48, mozaika czterech kafli 1,45, GeoPackage do GeoParquet 1,48, GeoJSON do Shapefile 1,60, opis zdalnego COG 1,32, okno z dużej mozaiki 1,65. Kilka spektakularnych wyników, jak cieniowanie w 0,5 s zamiast 4 s, zostało wykluczonych, bo piksele wyniku różnią się od GDAL-a. Te różnice (nakładki COG, warp dwuliniowy, spadki) autor zebrał w osobnym zgłoszeniu do wyjaśnienia. W dwóch przypadkach szybszy był GDAL, m.in. przy wektoryzacji rastra.

Dla czytelnika wniosek jest podwójny. terrio jest realnie szybki, zwłaszcza w pamięci, ale nie o rząd wielkości, a wątek z benchmarkami to najlepszy dowód, że projekt reaguje na krytykę w ciągu godzin i poprawia się publicznie.
________________________________________

### 💼 Gdzie konkretnie można to wykorzystać?
- **Konwersje w CI i na serwerach bez GDAL-a** - zamiana Shapefile na GeoPackage lub GeoParquet, przycięcie i reprojekcja w potoku GitHub Actions, w funkcji serverless albo w małym kontenerze Dockera. Jeden statyczny plik o rozmiarze kilkunastu megabajtów zamiast obrazu z GDAL-em i jego zależnościami.
- **Publikacja danych w formatach chmurowych** - `terrio convert -f COG` i zapis PMTiles z rastrów lub wektorów to droga do map, które wyświetla się bez serwera mapowego, np. w GeoLibre albo na własnej stronie.
- **LiDAR z GUGiK bez PDAL-a** - plik LAZ z klasyfikacją: `terrio grid --class 2 --stat idw` zrobi NMT z punktów gruntu, `--stat max` ze wszystkich punktów NMPT, a różnica (`terrio calc`) da model wysokości roślinności. O tych produktach pisaliśmy w artykułach [DTM, DSM i nDSM](/blog/3-dtm-dsm-ndsm) i [Canopy Height Model](/blog/8-canopy-height-model). Nieklasyfikowaną chmurę można wcześniej przepuścić przez `terrio filter smrf`, czyli klasyczny (nie AI) algorytm klasyfikacji gruntu. Podejście z sieciami neuronowymi opisaliśmy w artykule [Klasyfikacja chmury punktów LiDAR](/blog/10-lidar-classification-qgis).
- **NMT z GUGiK** - pliki ASCII Grid i XYZ terrio czyta natywnie, więc cieniowanie, spadki i mozaiki arkuszy (`terrio dem`, `terrio mosaic`) idą bez konwersji w QGIS. Więcej o zastosowaniach NMT w artykule [NMT i jego zastosowania](/blog/2-dtm-usage).
- **Wskaźniki roślinności w skrypcie** - `terrio calc` z pasmami Sentinel-2 policzy NDVI dokładnie tak jak `gdal_calc.py`, a STAC pozwala wskazać scenę adresem zamiast pobierać ją ręcznie. Teoria w artykule [Wskaźniki roślinności](/blog/5-vegetation-indexes).
- **Aplikacje w przeglądarce** - pakiet `terrio-js` pozwala wczytać Shapefile w ZIP, GeoPackage czy GeoTIFF po stronie użytkownika, bez wysyłania pliku na serwer, i od razu przeliczyć współrzędne. To ciekawa opcja dla geoportali z funkcją „wgraj swoje dane”.
- **Python bez konfliktów wersji GDAL-a** - kto walczył z instalacją rasterio i fiony w jednym środowisku, doceni paczkę zależną tylko od NumPy. Skrypty rasterio uruchomi się po zmianie importu.
- **Asystenci AI pracujący na plikach** - serwer MCP daje agentowi zestaw bezpiecznych, dobrze opisanych narzędzi zamiast dowolnego kodu Pythona. O agentach w QGIS pisaliśmy w artykule [Sztuczna inteligencja w QGIS](/blog/11-ai-plugins-qgis).
________________________________________

### ⚖️ terrio a QGIS - czym się różnią?
To porównanie młotka z warsztatem, więc najpierw ustalmy, co porównujemy. **QGIS** to kompletny program z mapą, edycją, kartografią i tysiącami wtyczek, który do czytania danych używa GDAL-a, do układów PROJ-a, a do chmur punktów PDAL-a. **terrio** to zamiennik tych trzech bibliotek w wąskim zakresie, bez żadnego interfejsu graficznego. Z tego wynika wszystko inne:
- **Interfejs** - QGIS ma mapę, panele i okna dialogowe. terrio ma wiersz poleceń, Pythona, JavaScript, Rusta i serwer MCP. Nie zobaczysz w nim danych, chyba że przez Playground albo w GeoLibre czy RustGIS, które z niego korzystają.
- **Formaty** - QGIS przez GDAL czyta ponad 200 formatów i bazy danych. terrio ma 51 sterowników i żadnych baz. Za to większość z nich działa też w przeglądarce.
- **Układy współrzędnych** - QGIS ma pełny PROJ. terrio ma 6354 układy EPSG z operacjami GDAL-a, siatki korekcyjne i geoidy, w naszym teście identyczne z PROJ-em dla PL-1992 i PL-2000. Zgłoszone tydzień temu błędy brzegowe (kody ESRI w plikach `.prj`, układy bez kodu w WKT, zapis WKT) naprawiono w wersji 0.4.0.
- **Analizy** - QGIS ma GRASS, SAGA, własne algorytmy i wtyczki. terrio ma to, co GDAL i PDAL (konwersje, warp, mozaiki, rasteryzację, terrain, algebrę map, filtry chmur punktów), a od 0.5.0 także podstawowe operacje wektorowe: bufor, nakładanie, agregację, naprawę geometrii, warstwice, statystyki strefowe i próbkowanie. To operacje planarne na jednej lub dwóch warstwach, bez głębi GRASS-a czy wtyczek QGIS.
- **Automatyzacja** - QGIS ma `qgis_process`, PyQGIS i Model Designer, ale wymaga zainstalowanego QGIS, czyli setek megabajtów z Qt i Pythonem. terrio to jeden plik i działa tam, gdzie QGIS-a nie da się postawić: w funkcji serverless, na routerze z ARM-em, w przeglądarce.
- **Wydajność** - po poprawionych benchmarkach przewaga terrio nad GDAL-em (a więc i nad narzędziami GDAL w Processing QGIS) w zweryfikowanych przypadkach wynosi 1,2-1,65 razy, a nie 5-13 razy jak w pierwszych tabelach. Na laptopie z kilkoma rdzeniami różnica będzie jeszcze mniejsza.
- **Dojrzałość** - QGIS ma 24 lata, GDAL ponad 25. terrio ma niecałe dwa tygodnie. Dziesiątki tysięcy testów zgodności to dużo, ale „zgodny z GDAL-em na plikach testowych” to nie to samo co „sprawdzony na danych z całego świata”.
- **Licencja** - QGIS jest na GPL, GDAL na MIT/X, terrio na MIT. Dla kogoś, kto wbudowuje bibliotekę we własny produkt, terrio i GDAL są pod tym względem równoważne.

W praktyce terrio nie konkuruje z QGIS-em, tylko z tym, co QGIS ma pod maską. Rozsądny układ wygląda tak: terrio przygotowuje dane (konwersja, reprojekcja, COG, NMT z LAZ) w skryptach i na serwerze, a QGIS je ogląda, edytuje i składa do mapy. Oba czytają te same GeoPackage, GeoParquet, FlatGeobuf i GeoTIFF-y, a kto zna opcje `gdalwarp` i `ogr2ogr`, zna już opcje terrio.
________________________________________

### 💬 Co piszą użytkownicy?
Projekt nie trafił na Hacker News ani na Reddita, ale w repozytorium zaczęła się rozmowa, i to konkretna:
- **Prośba o funkcje** (23 października) - użytkownik MayureshPadalkar poprosił o warstwice, centroidy, bufory, nakładanie, agregację, naprawę geometrii, statystyki strefowe i próbkowanie rastrów. Cała lista weszła do wersji 0.5.0 następnego dnia.
- **Krytyka benchmarków** (23 i 24 października) - dwóch użytkowników wykazało, że porównanie z GDAL-em było nieuczciwe (wątki, brak weryfikacji wyników). Autor podziękował, wycofał tabele i w ciągu kilku godzin opublikował nową metodę z dużo skromniejszymi liczbami. Szczegóły w sekcji o wydajności.
- **Zgłoszenie o wydajności** (autor, 15 października) - uczciwa lista słabości wersji 0.2.0: 25 razy wolniejsze `info` na dużym GeoPackage, 16 GB pamięci przy zapisie GeoJSON, brak obsługi 15-bitowych próbek GeoTIFF z Sentinel-2. Wszystko naprawione w 0.3 i 0.4.
- **Otwarte zgłoszenia** - 3, w tym zbiorcze o różnicach wyników względem GDAL-a wykrytych przez nowe benchmarki. Tydzień wcześniej było ich 11, głównie o układach współrzędnych, i wszystkie zamknięto.
- **Dokumentacja** - bardzo obszerna jak na dwa tygodnie istnienia (strony o każdym formacie, benchmarki z surowymi próbkami w JSON, raport zgodności, migracja z GDAL-a i rasterio), ale miejscami sprzeczna, jak w sprawie siatek korekcyjnych.
- **Konkurencja** - sam autor wskazuje **OxiGeo** (dawniej OxiGDAL), inną czystą implementację GDAL-a w Ruście, oraz biblioteki GeoRust jako „doskonałe klocki” bez warstwy, która je spina.

Polskojęzycznych opinii nie ma. Nasz test polskich układów jest, o ile wiemy, pierwszym opisanym.
________________________________________

### ⚠️ Ograniczenia, o których trzeba wiedzieć
- **To nie jest program GIS** - nie ma mapy, edycji ani kartografii. Do tego służą QGIS, GeoLibre albo RustGIS.
- **Brak baz danych** - PostGIS, Oracle i SQL Server są poza zakresem projektu.
- **Analizy geometryczne tylko podstawowe** - bufor, nakładanie i agregacja są planarne i działają na jednej lub dwóch warstwach poligonowych. Złączeń przestrzennych z atrybutami, analiz sieciowych i geodezyjnych buforów w metrach na danych w WGS 84 nie ma.
- **Formaty zamknięte i egzotyczne** - File Geodatabase, HDF4, NITF, MrSID, ECW tylko przez opcjonalny backend GDAL budowany ze źródeł.
- **Różnice wyników względem GDAL-a** - nowe benchmarki wykryły rozbieżności pikseli w nakładkach COG, warpie dwuliniowym i spadkach oraz różnice typów pól przy konwersji Shapefile do GeoPackage. Autor je bada, ale do wyjaśnienia warto porównywać wyniki krytycznych operacji z GDAL-em.
- **WebAssembly** - brak klienta HTTP w Pyodide (pliki trzeba pobrać samemu). Pełny moduł `terrio-js` waży 16 MB (4 MB po kompresji Brotli), odchudzony `terrio-js/core` bez GeoParquet, chmur punktów i formatów naukowych 9 MB. Wielowątkowość działa tylko na stronach z izolacją cross-origin, a pliki powyżej 4 GB wymagają osobnego modułu memory64.
- **Tempo zmian** - dziewięć wydań w jedenaście dni. Dokumentacja i benchmarki starzeją się w dniach, czego sami doświadczyliśmy przy tym artykule.
- **Jeden autor i AI** - prawie cały kod pochodzi od jednej osoby pracującej z modelem AI. Testy zgodności są rozbudowane, ale długofalowe utrzymanie takiego projektu to otwarte pytanie.
________________________________________

### 🚀 Jak zacząć?
1. Zainstaluj polecenie jedną linią (skrypt dla swojego systemu) albo `pip install terrio`.
2. Sprawdź plik, który masz pod ręką: `terrio info dane.gpkg` albo `terrio info plik.tif --stats`.
3. Wypróbuj dane zdalne bez pobierania: `terrio info` z adresem dowolnego COG, np. sceny Sentinel-2 z AWS.
4. Przelicz współrzędne znanego punktu do swojego układu: `terrio crs EPSG:4326 --to EPSG:2180 21.0122 52.2297` i porównaj z QGIS-em lub pyproj.
5. Zrób pierwszą konwersję: `terrio convert dane.shp dane.gpkg --t-srs EPSG:2180`.
6. Jeśli masz LAZ z GUGiK: `terrio info plik.laz --stats`, potem `terrio grid plik.laz nmt.tif --tr 1 --stat idw --class 2`.
7. Otwórz wyniki w QGIS i porównaj z tym, co daje tam GDAL. To wciąż wersja 0.x, a nowe benchmarki pokazały, że wyniki części operacji różnią się od GDAL-a.
________________________________________

### Podsumowanie 🎯
- **terrio** to biblioteka i narzędzie wiersza poleceń w czystym Ruście do czytania, konwersji i reprojekcji rastrów, wektorów i chmur punktów, na licencji MIT, bez GDAL-a i innych bibliotek w C.
- Ma **51 sterowników, polecenia zgodne z GDAL-em i PDAL-em, 6354 układy EPSG z siatkami korekcyjnymi**, a od wersji 0.5.0 także bufory, nakładanie warstw, warstwice i statystyki strefowe, oraz pakiety dla Pythona, JavaScriptu i agentów AI przez MCP.
- W naszym teście **transformacje do PL-1992 i PL-2000 były identyczne z PROJ-em**, a warp sceny Sentinel-2 do PL-1992 trwał 0,3-0,4 sekundy.
- Słabe strony: **brak interfejsu i baz danych, tylko podstawowe analizy geometryczne**, węższy zestaw formatów niż GDAL, dwa tygodnie istnienia, kod pisany głównie przez AI i benchmarki, które po krytyce społeczności skurczyły się z „13 razy szybciej” do „1,2-1,65 razy szybciej”.
- Względem QGIS to nie konkurent, tylko **kandydat na zamiennik GDAL-a tam, gdzie GDAL-a nie da się zainstalować**: w CI, serverless i przeglądarce. QGIS zostaje do oglądania, edycji i map.
________________________________________

### 📚 Źródła
- [repozytorium opengeos/terrio](https://github.com/opengeos/terrio),
- [dokumentacja terrio.opengeos.org](https://terrio.opengeos.org/), w tym strony [Why terrio?](https://terrio.opengeos.org/why-terrio/), [Installation](https://terrio.opengeos.org/installation/), [Formats](https://terrio.opengeos.org/formats/), [Coordinate Systems](https://terrio.opengeos.org/crs/) i [Coming from GDAL](https://terrio.opengeos.org/gdal/),
- [benchmarki projektu po korekcie z 24 października](https://terrio.opengeos.org/benchmarks/) i [raport zgodności z GDAL](https://terrio.opengeos.org/conformance/),
- zgłoszenia na GitHubie: [nr 67 o wydajności na dużych plikach](https://github.com/opengeos/terrio/issues/67), [nr 212 o liczbie wątków GDAL-a](https://github.com/opengeos/terrio/issues/212), [nr 246 o zawyżonych benchmarkach](https://github.com/opengeos/terrio/issues/246), [nr 253 o różnicach wyników względem GDAL-a](https://github.com/opengeos/terrio/issues/253) i [nr 211 z prośbą o operacje wektorowe](https://github.com/opengeos/terrio/issues/211),
- [notatki do wydań 0.1.0-0.5.0](https://github.com/opengeos/terrio/releases),
- [Playground terrio w przeglądarce](https://terrio.opengeos.org/playground/),
- [projekt OxiGeo](https://github.com/conbrad/oxigeo), inna implementacja GDAL-a w Ruście.
- Baner pochodzi z repozytorium projektu, zrzut Playground z dokumentacji. Obraz Warszawy to nasz wynik przetwarzania sceny Sentinel-2 (Copernicus, archiwum AWS Earth Search) w terrio 0.3.2 z 21 października 2026 r., powtórzony w terrio 0.5.0 25 października.
