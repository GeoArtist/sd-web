---
id: 17
title: GeoLens - własny katalog danych przestrzennych
addDate: 2026-11-23
modifyDate: 2026-11-23
keywords:
    - geodezja
    - gis
    - geolens
    - katalog danych
    - postgis
    - ogc api
    - stac
    - qgis
    - geoportal
    - open source
summary: "GeoLens 1.31 to otwarty katalog danych przestrzennych i kreator map do postawienia na własnym serwerze. Zbiera pliki, tabele PostGIS, usługi i zasoby STAC w jednej wyszukiwarce, zapisuje pochodzenie każdego zbioru i pilnuje, czy źródło jest aktualne."
thumbnail: /images/blog/thumbnails/geolens-catalog-thumbnail.jpg
thumbnailAlt: "kreator map GeoLens z trójwymiarowymi budynkami Manhattanu miniaturka"
---

**GeoLens 🔎** to otwarty katalog danych przestrzennych połączony z kreatorem map, który stawia się na własnym serwerze. Odpowiada na pytanie znane każdemu zespołowi GIS: gdzie leży aktualna wersja tej warstwy, skąd ją mamy i kiedy ktoś ją ostatnio odświeżał?

Dane przestrzenne w firmie czy urzędzie rzadko leżą w jednym miejscu. Część jest na dysku sieciowym, część w bazie PostGIS, część przychodzi z usług sieciowych, a zobrazowania satelitarne z katalogów STAC. GeoLens zbiera to wszystko w jednej wyszukiwarce, przy każdym zbiorze zapisuje jego pochodzenie, a QGIS, skrypty i agenci AI czytają te same dane przez otwarte standardy. Opisujemy wersję 1.31.0 z 10 listopada 2026 r. i dokładamy własny test API na publicznym demo.

![kreator map GeoLens: budynki Manhattanu wyciągnięte do wysokości dachów i pokolorowane według epoki budowy, sieć metra, lista warstw i legenda - zrzut z README projektu](/images/blog/images/17/geolens-map-builder-manhattan.jpg "full")
________________________________________

### 🧭 Czym jest GeoLens, a czym nie jest
GeoLens nie jest kolejnym programem GIS. W poprzednich wpisach opisywaliśmy [GeoLibre](/blog/12-geolibre-vs-qgis), w którym dane zostają na komputerze użytkownika, i porównywaliśmy [cztery narzędzia do pracy na danych](/blog/15-qgis-geolibre-rustgis-terrio). GeoLens to inna kategoria: serwer dla całego zespołu, który przechowuje dane, opisuje je i udostępnia innym programom.

Składa się z trzech części:
- **katalog** - wyszukiwarka zbiorów z metadanymi, pochodzeniem i historią wersji,
- **kreator map** - mapy w przeglądarce ze stylami, 3D, prostymi analizami, story mapami i dashboardami,
- **otwarte API** - te same dane dla QGIS, skryptów i innych portali.

Projekt jest na licencji Apache 2.0, nie wysyła telemetrii i działa w Docker Compose. Pierwsza wersja 1.0.0 wyszła 3 maja 2026 r., a od tego czasu wydań było ponad sześćdziesiąt.

![schemat w trzech kolumnach: źródła danych (pliki, tabele PostGIS, usługi, katalogi STAC), GeoLens (katalog, kreator map, otwarte API) i odbiorcy (przeglądarka, programy GIS, kod, agenci AI) - wizualizacja poglądowa](/images/blog/images/17/geolens-architecture-diagram.jpg "full")
________________________________________

### 📥 Skąd bierze dane
- **Pliki** - Shapefile, GeoPackage, GeoJSON, GeoParquet, FlatGeobuf, KML/KMZ, spakowana File Geodatabase, CSV, Excel i GeoTIFF, który jest zamieniany na Cloud-Optimized GeoTIFF (COG, czyli GeoTIFF ułożony tak, żeby dało się czytać jego fragmenty przez sieć). Chmury punktów COPC i modele 3D Tiles są hostowane dla CesiumJS, QGIS i Potree.
- **Tabele PostGIS** - tabele leżące już w bazie GeoLens są serwowane w miejscu, bez kopiowania.
- **Usługi** - warstwy WFS, ArcGIS i OGC API Features są importowane jako kopia, którą odświeża się na żądanie. Przed importem GeoLens pokazuje kolumny i pierwsze wiersze.
- **STAC** - zasoby ze zdalnych katalogów zobrazowań są dołączane przez odwołanie. Obraz zostaje tam, gdzie jest, a kafle powstają na żądanie.
- **SQL Server** - od wersji 1.31 administrator może wskazać bazy SQL Server, z których użytkownicy importują tabele przestrzenne.
- **Rysowanie** - nowy zbiór można też narysować w przeglądarce.

Wyszukiwarka działa na dwa sposoby: rozmyty (toleruje literówki) oraz według znaczenia, jeśli administrator podłączy model do embeddingów. W przykładzie z README zapytanie „where storms hit the coast” znajduje trasy huraganów i warstwy narażenia wybrzeża, choć żadna z nich nie ma tych słów w tytule.

![wyszukiwarka katalogu GeoLens dla zapytania where storms hit the coast: sześć wyników z typem, źródłem, liczbą obiektów i układem współrzędnych oraz filtry zbiorów po lewej - zrzut z README projektu](/images/blog/images/17/geolens-catalog-search.jpg "full")
________________________________________

### 🧾 Pochodzenie i świeżość: najciekawsza część
Każdy zbiór ma zapisane, jak trafił do katalogu: jako wgrany plik, tabela w bazie, warstwa z usługi, element STAC albo rysunek z przeglądarki. Dla zbiorów importowanych GeoLens pamięta też, kiedy ostatnio je odświeżono.

- **Świeżość** - po ustawieniu częstotliwości aktualizacji zbiór dostaje etykietę: aktualny, do odświeżenia albo przeterminowany.
- **Stan źródła** - dla usług i STAC GeoLens sprawdza, czy źródło wciąż odpowiada.
- **Zmiana schematu** - dla usług wykrywa zmianę kolumn u dostawcy, zanim trafi ona na mapy.
- **Gdy usługa zniknie** - zaimportowana kopia działa dalej.
- **Historia wersji** - każda podmiana pliku zostaje w historii, a poprzednią wersję da się przywrócić.

![zakładka Source zbioru z trzęsieniami ziemi USGS w GeoLens: typ usługi ArcGIS FeatureServer, adres źródła, czas ostatniego odświeżenia i sprawdzenia, 1912 obiektów oraz etykiety Healthy, Fresh i No drift - zrzut z README projektu](/images/blog/images/17/geolens-provenance-source-tab.jpg "full")

![historia wersji zbioru w GeoLens: trzy wersje pliku GeoJSON z datami i liczbą obiektów, bieżąca oznaczona etykietą Current, przy poprzedniej przycisk Restore - zrzut z README projektu](/images/blog/images/17/geolens-version-history.jpg "full")
________________________________________

### 🗺️ Kreator map
- **Warstwy** - punkty, symbole, mapy cieplne, klastry, linie, strzałki, wypełnienia, bryły 3D, rastry i cieniowanie, ze stylami sterowanymi danymi, etykietami, filtrami i oknami z informacją o obiekcie.
- **Teren 3D** - z własnych modeli wysokościowych. O tym, czym jest NMT, pisaliśmy we wpisie [DTM, DSM i nDSM](/blog/3-dtm-dsm-ndsm).
- **Analizy** - bufor, centroid, przycinanie, agregacja, złączenie przestrzenne, wybór przez lokalizację, pomiar i przecięcie. Każdy wynik zapisuje się jako nowy zbiór w katalogu.
- **Story mapy i dashboardy** - opowieść prowadzona scena po scenie albo wskaźniki i wykresy obok mapy.
- **Udostępnianie** - mapa prywatna, dla zespołu albo publiczna, z linkiem i kodem do osadzenia na innej stronie.

![kreator map GeoLens z trójwymiarowym modelem Matterhornu z danych swissALTI3D, podpisanymi szczytami, drogami wspinaczkowymi, listą warstw i legendą - zrzut z README projektu](/images/blog/images/17/geolens-matterhorn-terrain.jpg "full")
________________________________________

### 🔌 Dane w QGIS i w kodzie
GeoLens nie zamyka danych w sobie. Zbiory wektorowe są kolekcjami OGC API Features (następcy WFS, który odpowiada zwykłym GeoJSON-em), sam katalog jest dostępny jako OGC API Records i STAC, a metadane także w DCAT i GeoDCAT-AP, czyli w formatach zbieranych przez krajowe i unijne portale otwartych danych. Każda warstwa ma adres kafli dla MapLibre, OpenLayers i Leaflet.

QGIS dodaje GeoLens jak zwykłe połączenie OGC API Features, bez wtyczki. Osobna wtyczka GeoLens dla QGIS (licencja MIT) dokłada wyszukiwanie w katalogu, zbiory prywatne i edycję, która wraca na serwer.

![QGIS 4 z demo GeoLens dodanym jako połączenie OGC API Features: w panelu przeglądarki lista kolekcji, na mapie świata trzęsienia ziemi, erupcje wulkanów, granice płyt tektonicznych i państwa - zrzut z README projektu](/images/blog/images/17/geolens-qgis-ogc-api.jpg "full")

Dla programistów są narzędzie wiersza poleceń `geolens`, biblioteki dla Pythona i TypeScriptu oraz serwer MCP dla agentów AI. Serwer MCP działa tylko do odczytu: agent może szukać zbiorów, czytać ich strukturę i obiekty oraz liczyć statystyki, ale niczego nie zmieni.

**Nasz test na publicznym demo (13 listopada 2026 r.):**
- Katalog demo zawierał 42 pozycje. Zapytanie „volcanic eruptions” zwróciło dwie: zbiór znaczących erupcji wulkanicznych i kolekcję, do której należy.
- Filtr CQL2 `vei >= 6` (wskaźnik eksplozywności erupcji co najmniej 6) na tym zbiorze dopasował 41 erupcji w 0,9 sekundy. Pierwsze na liście były Tambora z 1815 r. i Santoryn z ok. 1610 r. p.n.e.
- Serwer deklaruje 17 klas zgodności: OGC API Features z filtrowaniem CQL2 oraz OGC API Records.
- **API oddaje współrzędne wyłącznie w WGS 84.** Prośba o układ PL-1992 (EPSG:2180) skończyła się błędem 400 z informacją, że obsługiwany jest tylko CRS84. Układ docelowy można natomiast podać przy eksporcie pliku (parametr `target_crs` z kodem EPSG), poza GeoParquet i PMTiles, które mają układ stały.
________________________________________

### 🤖 Opcjonalna sztuczna inteligencja
GeoLens potrafi odpowiadać na pytania o zbiór, edytować mapę na podstawie polecenia zapisanego zwykłym językiem, szkicować metadane i szukać według znaczenia. Współpracuje z dowolnym serwerem zgodnym z API OpenAI, w tym z lokalnym modelem przez Ollama, oraz z Claude przez Anthropic, Microsoft Foundry, Amazon Bedrock i Google Vertex AI.

AI jest wyłączona, dopóki administrator nie skonfiguruje dostawcy, i każda funkcja programu działa bez niej. Przy dostawcy chmurowym pytania i fragmenty danych trafiają do niego, więc dla danych wrażliwych zostaje model lokalny.

![panel Ask AI przy zbiorze tras huraganów w GeoLens: na pytanie, ile huraganów dotarło do lądu, odpowiedź 119 z 202 z tabelą i opisanym założeniem dotyczącym kolumny landfall - zrzut z README projektu](/images/blog/images/17/geolens-ask-ai.jpg "full")
________________________________________

### 🚀 Jak zacząć
Najprościej wejść na [demo](https://demo.getgeolens.com), które nie wymaga instalacji ani konta (kreator map wymaga zalogowania kontem Google, GitHub lub Microsoft). Dane demo mogą zostać w każdej chwili wyczyszczone.

Do własnej instalacji potrzeba Gita, curla i Dockera z wtyczką Compose. Skrypt instalacyjny pobiera obrazy, generuje hasła i uruchamia całość pod adresem `localhost:8080`. Ostrzega też, gdy Docker ma mniej niż 8 GB pamięci. W środku pracują PostgreSQL z PostGIS i pgvector, GDAL i PROJ, TiTiler do kafli rastrowych, FastAPI oraz MapLibre i deck.gl w przeglądarce.

Dane zostają czytelne bez GeoLens: zbiory wektorowe to zwykłe tabele PostGIS, a rastry to pliki COG na własnym dysku, w S3 lub w Azure Blob. Baza ma codzienną kopię zapasową.
________________________________________

### ⚠️ Na co uważać
- **Jeden opiekun** - dokument o zarządzaniu projektem mówi wprost, że utrzymuje go jedna osoba, a wsparcie społeczności nie ma gwarantowanych terminów. Prawa autorskie należą do firmy Carto Concepts, LLC i współautorów. 13 listopada repozytorium miało 297 gwiazdek, czyli to projekt młody i niszowy.
- **Tempo zmian** - od 24 października do 10 listopada wyszło dziewięć wydań. Własne API REST może się zmieniać między wersjami; punkty końcowe standardów trzymają się specyfikacji, a zmiany łamiące zgodność są zapowiadane w CHANGELOG-u.
- **Część funkcji jest płatna** - SAML, kontrola dostępu oparta na atrybutach, akceptacja publikacji, zapisane poświadczenia do źródeł i **automatyczne odświeżanie według harmonogramu** należą do wydania Enterprise. W wersji darmowej zbiory odświeża się ręcznie. Autorzy deklarują, że funkcje już wydane jako darmowe takie zostaną.
- **Układy współrzędnych** - API tylko w WGS 84 (nasz test wyżej). Do przeglądania i map to wystarcza, do prac pomiarowych w PL-2000 dane trzeba pobrać eksportem we właściwym układzie.
- **Brak WMS i WMTS wśród źródeł** - dokumentacja wymienia import z WFS, ArcGIS i OGC API Features. Importu z usług polskiego Geoportalu nie testowaliśmy.
- **Jedna organizacja i jeden serwer** - wspierana instalacja Docker Compose działa na jednym hoście. Wysoka dostępność wymaga własnej konfiguracji z zewnętrzną bazą i wspólnym magazynem plików.
- **Teren w metrach** - modele wysokościowe w innych jednostkach wyświetlą się z przewyższeniem.
- **Mapy podkładowe z internetu** - domyślny podkład pochodzi z serwera OpenFreeMap. W sieci odciętej od internetu trzeba go podmienić na własny, co opisuje dokument EGRESS.
- **Brak polskiego interfejsu** - są angielski, hiszpański, francuski, niemiecki i chiński uproszczony.
________________________________________

### Podsumowanie 🎯
- **GeoLens 1.31** to katalog danych przestrzennych i kreator map na własny serwer, na licencji Apache 2.0, bez telemetrii.
- Wyróżnia go **śledzenie pochodzenia**: przy każdym zbiorze widać źródło, datę odświeżenia, stan usługi i zmiany schematu, a poprzednią wersję można przywrócić.
- Dane wychodzą przez **OGC API, STAC i DCAT**, więc QGIS czyta je bez wtyczki, a po wyłączeniu GeoLens zostają zwykłe tabele PostGIS i pliki COG.
- W naszym teście demo odpowiedziało na zapytanie z filtrem CQL2 w 0,9 sekundy, ale **API zwraca tylko WGS 84**.
- To młody projekt jednej osoby z szybkim cyklem wydań i płatnym harmonogramem odświeżania. Warto go sprawdzić na demo, a przed wdrożeniem produkcyjnym przeczytać listę ograniczeń.
________________________________________

### 📚 Źródła
- [repozytorium GeoLens](https://github.com/geolens-io/geolens): README, CHANGELOG (wersja 1.31.0 z 10 listopada 2026 r.), EDITIONS, GOVERNANCE i EGRESS,
- [dokumentacja GeoLens](https://docs.getgeolens.com) i [przewodnik dla QGIS](https://docs.getgeolens.com/guides/api/qgis/),
- [wtyczka GeoLens dla QGIS](https://github.com/geolens-io/qgis-geolens-plugin),
- [publiczne demo](https://demo.getgeolens.com), na którym 13 listopada 2026 r. wykonaliśmy zapytania do API (przeszukanie katalogu, filtr CQL2, klasy zgodności, układ współrzędnych),
- liczba gwiazdek i wydań z API GitHuba (13 listopada 2026 r.); parametr `target_crs` eksportu sprawdziliśmy w kodzie źródłowym.
- Zrzuty ekranu pochodzą z README projektu GeoLens (licencja Apache 2.0). Schemat w trzech kolumnach jest wizualizacją poglądową na podstawie README.
