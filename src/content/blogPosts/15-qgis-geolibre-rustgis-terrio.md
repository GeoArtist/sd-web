---
id: 15
title: QGIS, GeoLibre, RustGIS i terrio - cztery narzędzia GIS w jednym zestawieniu. Co wybrać do jakiej pracy?
addDate: 2026-10-31
modifyDate: 2026-10-31
keywords:
    - geodezja
    - gis
    - qgis
    - geolibre
    - rustgis
    - terrio
    - gdal
    - open source
    - porównanie
summary: "QGIS 4.2.3, GeoLibre 3.5, RustGIS 0.4 i terrio 0.5 obok siebie: funkcje, zastosowania, szybkość w naszym teście, rozmiar instalacji, popularność i współpraca między programami. Przewodnik dla osoby pracującej w QGIS"
thumbnail: /images/blog/thumbnails/qgis-vs-geolibre-rustgis-terrio-thumbnail.jpg
thumbnailAlt: "cztery kafelki z QGIS 4.2, GeoLibre, RustGIS i terrio miniaturka"
---

**Cztery narzędzia GIS 🧭** w jednym zestawieniu: QGIS, czyli standard otwartego GIS-u na desktopie, oraz trzy projekty z organizacji opengeos, które w ciągu ostatnich miesięcy opisaliśmy osobno. Każdy z nich dostał właśnie nową wersję: RustGIS 0.4.0 wyszedł 25 października, terrio 0.5.0 dzień wcześniej, GeoLibre 3.5.2 28 października, a QGIS 4.4 był zapowiedziany na 30 października i w chwili pisania (31 października) jeszcze się nie pojawił.

Porównujemy funkcje, zastosowania, szybkość (z własnym testem), rozmiar instalacji, popularność i to, jak dane i projekty przechodzą między programami. Nie szukamy zwycięzcy, tylko odpowiedzi na pytanie, które narzędzie wybrać do osiągnięcia określonego celu.

![cztery kafelki: ekran powitalny QGIS 4.2, trójwymiarowe budynki Manhattanu w GeoLibre, globus i asystent AI w RustGIS oraz baner terrio - materiały projektów](/images/blog/images/15/four-tools-collage.jpg)
________________________________________

### 🗂️ Cztery narzędzia w jednym akapicie każde
- **QGIS 4.2.3** - kompletny desktopowy GIS rozwijany od 2002 r. na licencji GPL. Edycja, kartografia, kompozytor wydruku, ponad 1000 algorytmów z GDAL, GRASS i SAGA, ponad 4200 wtyczek w Pythonie, QGIS Server i aplikacje terenowe QField oraz Mergin Maps. Bieżąca wersja 4.2.3 jest z 25 września 2026 r. Długoterminowym wydaniem (LTR) pozostaje 3.44, a pierwszym LTR linii 4.x ma być dopiero 4.4.4 w marcu 2027 r.
- **GeoLibre 3.5.2** - GIS w przeglądarce, który ten sam kod uruchamia też na desktopie, telefonie i w Jupyterze. Dane zostają na komputerze użytkownika, analizy liczy Whitebox skompilowany do WebAssembly, SQL obsługuje DuckDB. Licencja MIT. Szczegóły w naszym wpisie [GeoLibre - GIS w przeglądarce](/blog/12-geolibre-vs-qgis).
- **RustGIS 0.4.0** - natywny desktopowy GIS napisany w Ruście, z interfejsem wstążkowym jak w ArcGIS Pro, wersją w przeglądarce i silnikiem poleceń, który pozwala sterować programem z wiersza poleceń, Pythona i asystenta AI. Licencja Apache 2.0. Opisaliśmy go we wpisie [RustGIS - lekki desktopowy GIS w Ruście](/blog/13-rustgis-vs-qgis).
- **terrio 0.5.0** - nie program, lecz biblioteka i narzędzie wiersza poleceń do czytania, konwersji i reprojekcji danych: zamiennik GDAL, PROJ i PDAL w ich najczęstszych zadaniach, bez bibliotek w C. Licencja MIT. Więcej we wpisie [terrio - GDAL bez GDAL](/blog/14-terrio-vs-qgis).

Autorem trzech ostatnich projektów jest dr Qiusheng Wu z University of Tennessee, powstających głównie z pomocą modelu AI pod nadzorem człowieka, co autor deklaruje w każdym README. QGIS od października 2026 r. nie przyjmuje do głównego repozytorium kodu pisanego z pomocą AI. To dwa skrajnie różne modele rozwoju, co widać w tempie zmian i w dojrzałości.
________________________________________

### 📅 Co się zmieniło od naszych wpisów?
Artykuły sprzed tygodnia już wymagają dopisków:
- **GeoLibre 3.5.0 (25 października)** - mapa rysowana w innych układach współrzędnych, w tym w siatkach polarnych Arktyki i Antarktyki oraz Księżyca i Marsa; edycja danych ArcGIS z szablonami i wartościami warunkowymi; geokodery organizacji; interaktywne story mapy z autoodtwarzaniem; pakiety ArcGIS VTPK i TPKX, MBTiles w wersji webowej, chmury punktów COPC, LAZ i EPT z katalogów STAC; geoprzetwarzanie wielowątkowe w WebAssembly z SIMD; asystent AI może sam włączyć wtyczkę i użyć jej narzędzi. Wydanie zebrało 65 zmian od 13 osób. Dwa dni później wyszło 3.5.1 z pętlami i rozgałęzieniami w Model Builderze (iteracja po obiektach i rastrach, przełącznik warunkowy) oraz informacją o układzie mapy dla wtyczek, a 28 października poprawkowe 3.5.2 (adresy kafli w stylu TMS z `{-y}`, metody Pythona poza Jupyterem).
- **RustGIS 0.4.0 (25 października)** - mapa, którą można obracać i pochylać, z drapowaniem na terenie; Esri File Geodatabase czytana bez GDAL; odczyt tabel MySQL, MariaDB, SQL Server i Azure SQL na żywo; **otwieranie projektów QGIS jako map razem ze stylami warstw QML**; zapis COG; suwak czasu i kostki danych z trendami (test Manna-Kendalla, nachylenie Sena); **edycja wierzchołków**, złączenie przestrzenne, statystyki strefowe, IDW i kriging zwyczajny, bufory geodezyjne; klasy etykiet i etykiety wzdłuż linii; eksport kompozycji do SVG; agenci AI z umiejętnościami i podagentami. Dwie luki, które wytykaliśmy tydzień temu (brak edycji wierzchołków i brak spatial join), zostały zamknięte.
- **terrio 0.5.0 (24 października)** - operacje geometryczne (bufor, nakładanie, agregacja, naprawa geometrii), warstwice, statystyki strefowe, zapytania SQL, sterownik GRIB, wielowątkowe WebAssembly. Benchmarki względem GDAL zostały po krytyce wycofane i zastąpione skromniejszymi, zweryfikowanymi liczbami. Opisaliśmy to w aktualizacji wpisu nr 14.
- **QGIS** - wersja 4.4.0 była w harmonogramie na 30 października 2026 r., ale 31 października strona pobierania wciąż oferuje 4.2.3 i 3.44.15 LTR. Pierwszym LTR linii 4.x ma być 4.4.4 z marca 2027 r., do tego czasu do pracy produkcyjnej zalecane jest 3.44 LTR.
________________________________________

### 🧩 Funkcjonalność: kto co ma na pokładzie
Poniższa macierz to nasza ocena na podstawie dokumentacji projektów i poprzednich wpisów. Zielone kółko oznacza funkcję pełną, żółte częściową lub dostępną przez dodatki, szare brak.

![macierz funkcji czterech programów w czternastu kategoriach, od interfejsu graficznego po dojrzałość - wizualizacja poglądowa na podstawie dokumentacji](/images/blog/images/15/four-tools-feature-matrix.jpg "full")

Najważniejsze różnice dla użytkownika QGIS:
- **Układy współrzędnych** - QGIS ma pełny PROJ: każdy układ, transformacje datum, siatki korekcyjne, warstwy w ich własnych układach. RustGIS nadal trzyma wektory w WGS 84 i przelicza tylko rastry i widok mapy po kodzie EPSG, a sam pisze, że to wystarcza „do kartografii i większości analiz, ale nie do prac pomiarowych w lokalnym układzie”. GeoLibre od wersji 3.5 potrafi rysować mapę w innych układach, ale projekt sam przyznaje, że QGIS prowadzi w przypadkach brzegowych odwzorowań. terrio jako biblioteka ma 6354 układy z bazy EPSG i siatki korekcyjne, a w naszym teście z wpisu nr 14 wyniki dla PL-1992 i PL-2000 były identyczne z PROJ-em.
- **Formaty i bazy danych** - QGIS czyta wszystko, co obsługuje GDAL/OGR, i edytuje dane bezpośrednio w PostGIS, SpatiaLite, Oracle i SQL Server. GeoLibre ma PostGIS i SQL Server na desktopie, RustGIS czyta bazy tylko do odczytu, terrio baz nie obsługuje wcale. Za to wszystkie trzy nowe narzędzia czytają formaty chmurowe (COG, GeoParquet, FlatGeobuf, PMTiles, Zarr) własnym kodem, także w przeglądarce.
- **Edycja** - QGIS ma kompletną digitalizację z edycją topologiczną i sprawdzaniem geometrii. GeoLibre i RustGIS mają podstawy: tworzenie, przesuwanie, dzielenie, łączenie, od wersji 0.4 również wierzchołki w RustGIS. terrio nie edytuje, tylko przetwarza.
- **Kartografia i wydruk** - kompozytor QGIS z atlasem, renderery regułowe i nadpisania sterowane danymi pozostają poza zasięgiem reszty. GeoLibre i RustGIS mają kompozycje z legendą, podziałką i seriami map, RustGIS od 0.4 także klasy etykiet i eksport do SVG, ale to pierwsze wersje.
- **Analizy** - QGIS, GeoLibre i RustGIS mają po ponad 1000 narzędzi, ale z innych źródeł: QGIS z GDAL, GRASS i SAGA, dwa pozostałe z Whitebox. Siła Whitebox to teren, hydrologia, LiDAR i obrazy; siła QGIS to analizy wektorowe, sieciowe i statystyka przestrzenna. terrio ma to, co GDAL i PDAL, plus od wersji 0.5 podstawowe operacje geometryczne.
- **Skrypty i rozszerzenia** - QGIS to PyQGIS, konsola Pythona i tysiące wtyczek. RustGIS i terrio projektowano od początku tak, żeby każda funkcja działała z wiersza poleceń, z Pythona i przez serwer MCP dla agentów AI. GeoLibre ma wtyczki w TypeScript i widżet Jupytera. Wtyczek QGIS nie uruchomi żaden z trzech nowych programów.
- **Asystent AI** - GeoLibre i RustGIS mają go wbudowanego (z własnym kluczem API), terrio ma serwer MCP. W QGIS to rola wtyczek, które opisaliśmy w artykule [Sztuczna inteligencja w QGIS](/blog/11-ai-plugins-qgis).
________________________________________

### 💼 Zastosowania: które narzędzie do której pracy
Jeśli pracujesz w QGIS, nie musisz nic zmieniać. Są jednak sytuacje, w których jedno z trzech nowych narzędzi załatwi sprawę szybciej:
- **Pokazanie wyniku klientowi lub urzędowi** - GeoLibre: projekt jako link albo jeden plik HTML, który odbiorca otwiera w przeglądarce. Importuje projekty `.qgz` ze stylami, więc mapa przygotowana w QGIS nie wymaga ponownego stylowania.
- **Komputer bez uprawnień administratora, Chromebook, tablet** - GeoLibre lub RustGIS w przeglądarce. Nic się nie instaluje, dane nie opuszczają urządzenia.
- **Szybki podgląd danych chmurowych** - sceny Sentinel-2 z AWS, budynki Overture, ortofotomapa w COG: wszystkie trzy nowe narzędzia czytają je fragmentami, bez pobierania. W QGIS też się da (GDAL przez `/vsicurl/`), ale wymaga więcej klikania.
- **Seryjne mapy i konwersje w skryptach** - RustGIS (`rustgis-cli render`) do map PNG i PDF bez okna programu, terrio do konwersji, reprojekcji i COG w potoku CI lub na serwerze bez GDAL. W QGIS odpowiednikiem jest `qgis_process`, który w naszym teście niżej potrzebował kilku sekund na sam start.
- **LiDAR i NMT z GUGiK w skrypcie** - terrio: `terrio grid` zrobi NMT z punktów gruntu, `terrio dem` cieniowanie i spadki z arkuszy ASCII Grid. W QGIS to te same operacje przez PDAL i GDAL, tylko z interfejsem. O produktach z chmur punktów pisaliśmy w artykułach [DTM, DSM i nDSM](/blog/3-dtm-dsm-ndsm) i [Klasyfikacja chmury punktów LiDAR](/blog/10-lidar-classification-qgis).
- **Przesiadka z ArcGIS Pro** - RustGIS ze wstążką, ModelBuilderem i słownictwem Esri. Dla kogoś, kto traci licencję ArcGIS, próg wejścia może być niższy niż w QGIS.
- **Agenci AI pracujący na danych** - RustGIS i terrio przez MCP dają asystentowi zestaw opisanych poleceń zamiast dowolnego kodu Pythona, z historią i cofaniem.

I odwrotnie, do czego zostajemy przy QGIS: operaty i prace w PL-2000, edycja w PostGIS, mapy do druku, analizy sieciowe, wszystko, co opiera się na wtyczkach, oraz każda praca, która musi wyglądać tak samo za rok.
________________________________________

### ⚡ Szybkość: nasz test GDAL kontra terrio
Z czterech narzędzi tylko terrio da się uczciwie zmierzyć w taki sam sposób jak QGIS, bo QGIS do przetwarzania używa GDAL. Porównaliśmy więc **GDAL 3.9.3 z instalacji QGIS 3.40.2** (z PROJ 9.5.0) z **terrio 0.5.0** na komputerze z procesorem Ryzen 7 5700X (16 wątków), dyskiem SSD i Windows 11. GDAL dostał wielowątkowość (`-multi`, `NUM_THREADS=ALL_CPUS`), każde polecenie uruchomiliśmy trzy razy i wzięliśmy medianę. Dane: wycinek sceny Sentinel-2 nad Warszawą (2398 na 2339 pikseli, trzy pasma) z naszego testu we wpisie nr 14 oraz warstwa Natural Earth z granicami jednostek administracyjnych świata (4596 poligonów, 36 MB w Shapefile).

![wykres słupkowy z czasami ośmiu operacji w GDAL i terrio: warp, konwersja do COG, konwersje Shapefile do GeoPackage i GeoParquet oraz info - nasz pomiar](/images/blog/images/15/gdal-vs-terrio-benchmark.jpg "full")

Co z tego wynika:
- **Rastry: terrio szybsze o 50-120 procent.** Warp do PL-1992 najbliższym sąsiadem 0,26 s zamiast 0,40 s, konwersja do COG 0,17 s zamiast 0,38 s. Wyniki warpu najbliższym sąsiadem i COG były **identyczne co do piksela** (sprawdzone sumami kontrolnymi `gdalinfo -checksum`). Jedyna różnica w COG: piramidy terrio mają o jeden piksel inne wymiary.
- **Warp dwuliniowy daje inne piksele.** Czas 0,28 s wobec 0,46 s, ale sumy kontrolne się różnią, a średnie jasności pasm odbiegają na czwartym miejscu po przecinku. To ta sama rozbieżność, którą nowe benchmarki autora wykryły i opisały w zgłoszeniu nr 253.
- **Wektory: remis.** Shapefile do GeoPackage 0,30 s wobec 0,33 s, do GeoParquet 0,32 s wobec 0,27 s, szesnaście województw do PL-1992 0,23 s wobec 0,17 s. Przy plikach rzędu dziesiątek megabajtów start procesu i zapis na dysk liczą się bardziej niż silnik. Liczby obiektów i zasięgi były identyczne, choć terrio zapisuje w GeoPackage typ geometrii „dowolny” zamiast „poligon”.
- **Opis pliku ze statystykami: GDAL szybszy** (0,07 s wobec 0,19 s).
- **Ten sam warp przez `qgis_process`** z QGIS 3.40.2 trwał 6,6 s, a reprojekcja warstwy wektorowej narzędziem `native:reprojectlayer` od 6,7 do 13 s. Wynik był identyczny z czystym GDAL. Różnica to czas uruchomienia środowiska QGIS, który przy pojedynczym zadaniu dominuje, a przy modelu z dziesiątkami kroków przestaje mieć znaczenie.

Najciekawszy wynik przyniosła reprojekcja całego świata do układu równoodległościowego walcowego **EPSG:4087**: liczby obiektów się zgadzały, ale współrzędna Y Warszawy różniła się o **25 kilometrów**. Powód nie leży w błędzie żadnego z narzędzi. PROJ do wersji 9.7 liczył to odwzorowanie wzorem sferycznym, a w wersji 9.8.0 dodał wzór elipsoidalny zgodny z metodą EPSG 1028, a terrio od 21 października odwzorowuje właśnie PROJ 9.8.1. Nasz GDAL z QGIS 3.40.2 ma PROJ 9.5.0. Wniosek dla użytkownika QGIS: **ten sam kod EPSG może dać inne współrzędne w zależności od wersji PROJ w Twojej instalacji**, a przy wymianie danych między programami warto sprawdzić kilka punktów kontrolnych. Dla PL-1992 i PL-2000 obie wersje liczą tak samo.

Zastrzeżenia: to pomiar na jednym komputerze, z GDAL starszym niż ten w QGIS 4.2 i o cztery wersje starszym niż w harnessie autora terrio (3.13.3). Przewaga terrio w rastrach pokrywa się z jego własnymi, poprawionymi benchmarkami (1,2-1,65 raza na 40-rdzeniowym Xeonie), a u nas wyszła nieco większa prawdopodobnie dlatego, że starszy GDAL gorzej wykorzystuje wątki.

GeoLibre i RustGIS działają głównie w przeglądarce i na karcie graficznej, więc nie da się ich zmierzyć tym samym skryptem. Z dokumentacji i wcześniejszych testów: GeoLibre 3.5 przyspieszył geoprzetwarzanie dzięki wielowątkowemu WebAssembly z SIMD, a granicą pozostaje pamięć karty przeglądarki (zdalne pliki wektorowe i lokalne COG do 2 GiB). RustGIS sam pisze, że nie publikuje benchmarków względem QGIS i radzi „sprawdź na własnych danych w obu”.
________________________________________

### 📦 Rozmiar i instalacja
Dla administratora i dla kogoś z wolnym łączem to ma znaczenie:

![wykres słupkowy z rozmiarami instalatorów na Windows: QGIS 610 MB, GeoLibre 45 MB, RustGIS 33 MB, terrio 16 MB - dane z serwerów pobierania](/images/blog/images/15/installer-sizes.jpg)

- **QGIS 4.2.3** - instalator MSI dla Windows ma 610 MB, obraz DMG dla macOS 1,6 GB, a po instalacji program zajmuje około 2,9 GB (zmierzyliśmy dla QGIS 3.40.2). W środku są Python, Qt, GDAL, GRASS i SAGA, dzięki czemu po instalacji „umie wszystko”.
- **GeoLibre 3.5.2** - instalator na Windows 45 MB, aplikacja na Androida 55 MB, a wersja webowa nie wymaga pobierania niczego. Część narzędzi (konwersje, segmentacja AI, PostGIS) korzysta na desktopie z opcjonalnego procesu w Pythonie.
- **RustGIS 0.4.0** - instalator na Windows 33 MB, przenośny ZIP 47 MB, pakiet Pythona 18 MB. Formaty, których nie czyta sam, dostaje po doinstalowaniu GDAL lub DuckDB.
- **terrio 0.5.0** - jeden plik wykonywalny w archiwum o rozmiarze 16 MB, pakiet Pythona zależny tylko od NumPy, biblioteka JavaScript 4 MB po kompresji.

Małe pliki mają cenę: GeoLibre i RustGIS rozkładają funkcje na „własny kod” i „jeśli masz zainstalowany GDAL”, więc przed wdrożeniem trzeba sprawdzić listę formatów dla swojej platformy. QGIS tego problemu nie ma.
________________________________________

### 📈 Wykorzystanie: kto tego używa
Liczby z 31 października 2026 r. (GitHub, PyPI):
- **QGIS** - około 14 700 gwiazdek na GitHubie, około 840 osób w historii repozytorium, 24 lata wydań, ponad 4200 wtyczek, dokumentacja tłumaczona na kilkadziesiąt języków, w tym częściowo na polski.
- **GeoLibre** - około 8300 gwiazdek po pięciu miesiącach, 85 współautorów, około 2400 pobrań pakietu Pythona w ostatnim tygodniu, 21 otwartych zgłoszeń, 21 języków interfejsu bez polskiego.
- **RustGIS** - około 2200 gwiazdek po trzech tygodniach, 47 współautorów, około 500 pobrań pakietu Pythona tygodniowo, 66 otwartych zgłoszeń, 18 języków interfejsu bez polskiego.
- **terrio** - około 220 gwiazdek po siedemnastu dniach, 12 współautorów, około 1000 pobrań z PyPI w ostatnim tygodniu (w dużej części automaty CI), 12 otwartych zgłoszeń.

Gwiazdki mierzą zainteresowanie, nie użycie produkcyjne. Polskojęzycznych opinii o żadnym z trzech nowych narzędzi nadal nie znaleźliśmy, a recenzje anglojęzyczne (GIS Tuto, It's FOSS, Hacker News) zgodnie mówią: ciekawe, szybkie w rozwoju, jeszcze nie produkcyjne.
________________________________________

### 🔀 Jak to łączyć z QGIS
Dobra wiadomość: wszystkie cztery narzędzia czytają i zapisują te same otwarte formaty, więc dane przechodzą między nimi bez konwersji: GeoPackage, GeoParquet, FlatGeobuf, Shapefile, GeoJSON, KML, GPX, CSV i GeoTIFF (w tym COG). Gorzej z projektami i stylami:
- **GeoLibre** importuje projekty `.qgs` i `.qgz` z warstwami, grupami i stylami oraz wymienia style przez QML i SLD. W drugą stronę nie zapisuje.
- **RustGIS 0.4** otwiera projekt QGIS jako mapę i stosuje style QML, wypisując, co narysował inaczej. Nie zapisuje projektów QGIS. Strona porównania projektu w sekcji pytań wciąż twierdzi, że projektów QGIS otworzyć nie można, bo nie nadążyła za wydaniem.
- **terrio** nie ma projektów ani stylów, ale ma te same nazwy opcji co `gdalwarp` i `ogr2ogr`, więc polecenia z zakładki Processing w QGIS przenosi się prawie jeden do jednego.

Rozsądny układ, który sami stosujemy: QGIS do pracy właściwej, terrio do przygotowania danych w skryptach, GeoLibre do pokazywania wyników, RustGIS jako poligon doświadczalny dla automatyzacji i agentów AI.
________________________________________

### ⚠️ Na co uważać
- **Tempo zmian** - GeoLibre wydaje nową wersję co tydzień, RustGIS i terrio co kilka dni. Dokumentacja nie nadąża (sami znaleźliśmy sprzeczności w RustGIS i terrio), a szkolenie sprzed miesiąca może być nieaktualne.
- **Układy współrzędnych w RustGIS** - wektory w WGS 84 bez siatek korekcyjnych. Do prac geodezyjnych w PL-2000 to dyskwalifikujące.
- **Różnice wyników** - warp dwuliniowy w terrio daje inne piksele niż GDAL, a EPSG:4087 pokazuje, że nawet dwie wersje PROJ potrafią się różnić o kilometry. Krytyczne operacje porównuj między narzędziami.
- **Pamięć przeglądarki** - GeoLibre i webowy RustGIS mają sufit w postaci pamięci karty. Duże pliki lokalne to nadal domena desktopu.
- **Klucze API** - asystenci AI w GeoLibre i RustGIS wysyłają nazwy warstw, pól i odczytane wiersze do dostawcy modelu. W RustGIS, według recenzji wersji 0.3, klucz leżał na dysku bez szyfrowania.
- **Brak polskiego interfejsu** we wszystkich trzech nowych narzędziach.
- **Kod pisany głównie przez AI** - autor to deklaruje i testuje, ale długofalowe utrzymanie trzech dużych projektów przez jedną osobę to otwarte pytanie.
________________________________________

### Podsumowanie 🎯
- **QGIS 4.2** pozostaje narzędziem pierwszego wyboru: pełny PROJ, edycja w bazach, kartografia, wtyczki i 24 lata dojrzałości. Żadne z trzech nowych narzędzi nie próbuje go zastąpić i każde pisze to wprost.
- **GeoLibre 3.5.2** to najlepszy sposób, żeby pokazać wynik pracy z QGIS bez instalowania czegokolwiek, i jedyny z czterech, który działa na telefonie bez osobnej aplikacji.
- **RustGIS 0.4** nadrobił w tydzień dwie duże luki (wierzchołki, spatial join) i otwiera projekty QGIS, ale wektory w WGS 84 nadal wykluczają go z prac pomiarowych.
- **terrio 0.5** w naszym teście był **o 50-120 procent szybszy od GDAL w operacjach rastrowych** przy identycznych pikselach, a w wektorowych na równi. To kandydat na zamiennik GDAL w skryptach i na serwerach, nie na zamiennik QGIS.
- Instalatory nowych narzędzi mają 16-45 MB wobec 610 MB QGIS, ale część funkcji dostają dopiero po doinstalowaniu GDAL lub w wersji desktopowej.
- Najlepsza strategia na dziś: zostań w QGIS, a nowe narzędzia dobieraj do konkretnych zadań. Za kwartał, po QGIS 4.4 i kolejnych wydaniach opengeos, to zestawienie będzie wymagało aktualizacji.
________________________________________

### 📚 Źródła
- nasze wpisy: [GeoLibre](/blog/12-geolibre-vs-qgis), [RustGIS](/blog/13-rustgis-vs-qgis) i [terrio](/blog/14-terrio-vs-qgis),
- [notatki do wydań GeoLibre 3.5.0-3.5.2](https://github.com/opengeos/GeoLibre/releases) i [porównanie GeoLibre z innymi programami](https://geolibre.app/comparison/),
- [notatki do wydania RustGIS 0.4.0](https://github.com/opengeos/RustGIS/releases/tag/v0.4.0), [RustGIS i QGIS - porównanie autorów](https://rustgis.app/comparison/qgis/) oraz [dokumentacja danych RustGIS](https://rustgis.app/user-guide/data/) (układy współrzędnych),
- [notatki do wydania terrio 0.5.0](https://github.com/opengeos/terrio/releases/tag/v0.5.0), [benchmarki terrio po korekcie](https://terrio.opengeos.org/benchmarks/), zgłoszenia [nr 149 o odwzorowaniach elipsoidalnych](https://github.com/opengeos/terrio/issues/149) i [nr 253 o różnicach względem GDAL](https://github.com/opengeos/terrio/issues/253),
- [harmonogram wydań QGIS](https://qgis.org/resources/roadmap/) i [blog QGIS o zmianie harmonogramu LTR](https://blog.qgis.org/2026/10/03/release-schedule-changes-for-next-qgis-ltr/),
- [serwer pobierania QGIS](https://download.qgis.org/downloads/) (rozmiary instalatorów), [statystyki PyPI](https://pypistats.org/) i API GitHuba (gwiazdki, współautorzy, zgłoszenia),
- dane testowe: [Natural Earth, Admin 1 - States, Provinces](https://www.naturalearthdata.com/) oraz scena Sentinel-2 (Copernicus) z archiwum AWS Earth Search.
- Kolaż na górze składa się z materiałów projektów (ekran powitalny QGIS 4.2 z repozytorium qgis/QGIS, zrzuty z README GeoLibre i RustGIS, baner terrio). Wykres testu, macierz funkcji i wykres rozmiarów zaktualizowaliśmy 31 października 2026 r.
