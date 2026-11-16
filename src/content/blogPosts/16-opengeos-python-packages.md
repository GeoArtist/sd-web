---
id: 16
title: Pakiety Python z opengeos - leafmap, whitebox, segment-geospatial, geoai i reszta. Do czego służą i czym różnią się od QGIS?
addDate: 2026-11-16
modifyDate: 2026-11-16
keywords:
    - geodezja
    - gis
    - python
    - opengeos
    - leafmap
    - geemap
    - whitebox
    - segment-geospatial
    - geoai
    - jupyter
    - qgis
summary: "Piętnaście pakietów Python z organizacji opengeos w jednym miejscu: do czego służy każdy z nich, jak go zainstalować, ile waży, czy jest trudny i kiedy opłaca się sięgnąć po niego zamiast po QGIS."
thumbnail: /images/blog/thumbnails/opengeos-python-thumbnail.jpg
thumbnailAlt: "cieniowanie NMT z WhiteboxTools i budynki wykryte modelem SAM na ortofotomapie miniaturka"
---

**Organizacja opengeos 🐍** to oprócz GeoLibre, RustGIS i terrio, które opisaliśmy w [poprzednim wpisie](/blog/15-qgis-geolibre-rustgis-terrio), także piętnaście pakietów Python: starszych i dojrzalszych, z leafmap i geemap liczącymi setki tysięcy pobrań rocznie i z kilkoma małymi narzędziami pomocniczymi. Wszystkie rozwija dr Qiusheng Wu z University of Tennessee, wszystkie są na licencji MIT (poza open-buildings na Apache 2.0) i wszystkie zakładają, że pracujesz w Jupyterze, a nie w okienku programu.

W tym wpisie omawiamy każdy z nich: do czego służy, jak go zainstalować, co potrafi w pracy analityka przestrzennego i czym różni się od QGIS. Trzy najważniejsze (leafmap, whitebox i segment-geospatial) przetestowaliśmy na danych GUGiK: zmierzyliśmy czasy WhiteboxTools względem GDAL i SAGA z QGIS oraz puściliśmy model SAM na ortofotomapie Kazimierza Dolnego.

![piętnaście pakietów opengeos w czterech grupach: mapy w Jupyterze, teren i hydrologia, AI i obrazy, instalatory i dane - wizualizacja poglądowa](/images/blog/images/16/opengeos-packages-map.jpg "full")
________________________________________

### 🗺️ Mapy w Jupyterze: leafmap, geemap, anymap, mapwidget
Jupyter to środowisko, w którym kod Pythona, jego wynik i opis leżą w jednym dokumencie (notatniku). Pakiety z tej grupy dokładają do niego interaktywną mapę, jak w QGIS, tylko sterowaną kodem.

- **leafmap 0.64** - najważniejszy pakiet w zestawie. Jedna linia `leafmap.Map()` daje mapę z podkładem, na którą dodaje się Shapefile, GeoPackage, GeoJSON, GeoTIFF, usługi WMS i XYZ, bazę PostGIS, dane z katalogów STAC i Planetary Computer, a nawet budynki Overture. Ma mapy z suwakiem porównawczym, animacje czasowe, edycję wektorów, przeglądarkę katalogu danych i wbudowane narzędzia WhiteboxTools. Działa z kilkoma silnikami map: ipyleaflet (domyślny), folium, MapLibre (z 3D), plotly, pydeck, kepler.gl i bokeh, przy czym dokumentacja uczciwie przyznaje, że nie dają równych możliwości. Około 34 tysięcy pobrań miesięcznie, 3800 gwiazdek. Powstał jako odgałęzienie geemap dla osób bez konta Google Earth Engine.
- **geemap 0.38** - ten sam pomysł, ale dla Google Earth Engine (GEE), czyli chmury Google z petabajtami zobrazowań satelitarnych. Konwertuje skrypty JavaScript z edytora GEE na Pythona, wyświetla warstwy GEE, liczy statystyki strefowe, eksportuje obrazy do GeoTIFF, robi animacje Landsat. Najpopularniejszy pakiet zestawu (70 tysięcy pobrań miesięcznie, 4100 gwiazdek), ale bez zatwierdzonego konta GEE nie zrobisz w nim nic. Wymaga Pythona 3.12 lub nowszego.
- **anymap 0.12** - nowsza, lżejsza biblioteka map na bazie anywidget: MapLibre, Mapbox, Leaflet, OpenLayers, deck.gl i kepler.gl pod jednym interfejsem podobnym do ipyleaflet. Wersja 0.x z lutego 2026 r., około 900 pobrań miesięcznie. Dla kogoś, kto chce MapLibre bez całego leafmapa.
- **mapwidget 0.2** - podobny eksperyment z 2025 r., oznaczony na PyPI jako pre-alpha. Dziś wchłonięty przez anymap i leafmap, w nowych projektach nie ma po co po niego sięgać.

Przetestowaliśmy leafmap na trzech scenariuszach. Mapa z suwakiem porównawczym (zdjęcie satelitarne Esri kontra OpenTopoMap) to trzy linie kodu:

![mapa z suwakiem porównawczym w leafmap: zdjęcie satelitarne Esri po lewej, OpenTopoMap po prawej, okolice Kazimierza Dolnego - zrzut z naszego testu](/images/blog/images/16/leafmap-split-map.jpg "full")

Lokalny GeoTIFF z NMT GUGiK o rozmiarze 256 MB (8000 na 8000 pikseli) i cieniowanie z WhiteboxTools trafiły na mapę metodą `add_raster` w 5 sekund, bez konwersji i bez piramid. W tle leafmap uruchamia lokalny serwer kafelków (localtileserver), który czyta plik fragmentami:

![NMT GUGiK w palecie wysokościowej z półprzezroczystym cieniowaniem na podkładzie OpenStreetMap, wyświetlony przez leafmap z lokalnego pliku GeoTIFF - zrzut z naszego testu](/images/blog/images/16/leafmap-local-dem.jpg "full")

Silnik MapLibre daje mapę pochyloną i obracaną, z terenem 3D po jednym wywołaniu `set_terrain`, i eksportuje całość do pojedynczego pliku HTML, który klient otwiera w przeglądarce:

![mapa MapLibre z leafmap pochylona pod kątem, z doliną Wisły i Kazimierzem Dolnym, wyeksportowana do HTML - zrzut z naszego testu](/images/blog/images/16/leafmap-maplibre-3d.jpg "full")

Na co uważać: usługi WMS GUGiK ładowały się w leafmap bardzo wolno (mapa prosi o kilkanaście kafli naraz, a po dwóch minutach wciąż brakowało połowy), więc do podglądu danych krajowych lepiej pobrać wycinek przez WCS i wyświetlić go lokalnie. Dodatek `leafmap[raster]` nie zainstalował się u nas na Windows (pakiet s3fs w starej wersji nie ma gotowego pliku binarnego); pomogło osobne `pip install localtileserver`. Dokumentacja sama ostrzega, że zależności opcjonalne na Windows bywają kłopotliwe.
________________________________________

### ⛰️ Teren i hydrologia: whitebox, whiteboxgui, lidar
- **whitebox 2.3.6** - interfejs Pythona do WhiteboxTools, biblioteki analiz terenu, hydrologii, LiDAR i teledetekcji autorstwa Johna Lindsaya z University of Guelph. Pakiet waży kilkaset kilobajtów, a przy pierwszym użyciu pobiera gotowy plik wykonywalny (u nas WhiteboxTools 2.4.0, 198 MB z danymi testowymi). W naszej instalacji lista narzędzi miała 484 pozycje: wypełnianie i przerywanie zagłębień, kierunki i akumulacja spływu, zlewnie, wskaźniki terenu, filtry, klasyfikacja chmur punktów LAS, statystyki strefowe. Każde narzędzie to jedna metoda, na przykład `wbt.fill_depressions()`. Około 64 tysięcy pobrań miesięcznie. Repozytorium WhiteboxTools jest oznaczone jako wersja zastępowana, bo autor przeniósł rozwój do komercyjnego Whitebox Workflows, a darmowa wersja nie dostaje już nowych narzędzi. Na dziś działa bez zarzutu.
- **whiteboxgui 2.3** - okno dialogowe do WhiteboxTools wewnątrz Jupytera: drzewo narzędzi, pola na pliki, przycisk uruchom. Dla kogoś, kto nie chce pisać kodu, a chce mieć Whitebox obok innych komórek notatnika. Ostatnie wydanie w 2023 r., ale nadal działa, bo cała logika siedzi w pakiecie whitebox.
- **lidar 0.8.4** - wbrew nazwie nie służy do chmur punktów, lecz do wyznaczania zagnieżdżonych zagłębień terenu w NMT metodą poziomic (level-set), opisaną w artykule autora w JAWRA i w JOSS. Przydatne w hydrologii obszarów bezodpływowych i przy analizie mokradeł. Niszowy (około 140 pobrań miesięcznie), zależy od GDAL, więc dokumentacja radzi instalować go przez conda-forge.

Na NMT GUGiK 1 m z okolic Kazimierza Dolnego (wąwozy lessowe, idealny teren do testu) policzyliśmy cieniowanie, spadki, wypełnianie zagłębień i akumulację spływu:

![cztery panele: NMT GUGiK w palecie wysokościowej, cieniowanie z WhiteboxTools, spadki w stopniach i sieć cieków z akumulacji spływu D8 - wyniki naszego testu](/images/blog/images/16/whitebox-dem-outputs.jpg "full")

Pakiet whitebox najłatwiej porównać z QGIS, bo QGIS liczy teren narzędziami GDAL i SAGA. Zmierzyliśmy więc te same operacje w trzech silnikach (mediana z trzech uruchomień, Ryzen 7 5700X, Windows 11), na wycinku 4 na 4 km i 8 na 8 km:

![wykres słupkowy z czasami cieniowania, spadków, wypełniania zagłębień i akumulacji spływu w WhiteboxTools, GDAL i SAGA dla NMT 4000 i 8000 pikseli - nasz pomiar](/images/blog/images/16/whitebox-benchmark.jpg "full")

Co z tego wynika:
- **Cieniowanie i spadki: GDAL i Whitebox na równi.** Przy 16 milionach komórek oba mieszczą się w pół sekundy, przy 64 milionach GDAL jest szybszy w cieniowaniu (0,9 s wobec 1,9 s), a w spadkach wynik jest identyczny (1,5 s). SAGA potrzebowała 4,3 s i 7,6 s.
- **Hydrologia: Whitebox dziesięć razy szybszy od SAGA.** Wypełnianie zagłębień 1,7 s wobec 17,2 s, akumulacja spływu 0,8 s wobec 12,6 s; na większym pliku 10,8 s wobec 68 s i 3,2 s wobec 44 s. GDAL tych operacji nie ma, w QGIS robi się je właśnie przez SAGA lub GRASS.
- **Wyniki są zgodne tam, gdzie powinny.** Wypełnione NMT z Whitebox i SAGA (metoda Wanga i Liu) różnią się średnio o 1 cm i nigdzie o więcej niż metr. Spadki Whitebox i GDAL różnią się średnio o 0,4 stopnia, bo oba liczą inną maską sąsiedztwa. Akumulacja spływu różni się mocno na terenach płaskich, bo każdy silnik inaczej prowadzi wodę przez płaskie dno wąwozu; to normalne i dotyczy też GRASS.
- **Pułapka na start:** cieniowanie z Whitebox ma skalę 0-32767, a z GDAL 0-255. Jeśli ktoś przeniesie styl warstwy z QGIS, zobaczy biały prostokąt.
- **Ten sam hillshade przez `qgis_process`** z QGIS 3.40 trwał 24 s przy zimnym starcie i 5,8 s przy drugim uruchomieniu. To koszt uruchomienia środowiska QGIS, o którym pisaliśmy przy terrio: w skrypcie, który ma policzyć sto arkuszy, Whitebox lub GDAL z Pythona wygrywają samym brakiem narzutu.

Dla użytkownika QGIS, który zna wtyczkę WhiteboxTools for QGIS, to te same algorytmy, tylko z Pythona, bez okna i z możliwością zapętlenia po tysiącu plików. O pochodnych NMT i o zlewniach pisaliśmy w artykułach [DTM, DSM i nDSM](/blog/3-dtm-dsm-ndsm) i [Analiza zlewni](/blog/1-watershed-analysis).
________________________________________

### 🤖 AI i obrazy: segment-geospatial, geoai, GeoAgent, HyperCoast
- **segment-geospatial 1.4.2** (importowany jako `samgeo`) - owija model Segment Anything (SAM) Meta w wersjach 1, 2 i 3 oraz odmiany HQ-SAM i FastSAM tak, żeby na wejściu był georeferencjonowany GeoTIFF, a na wyjściu GeoPackage, Shapefile lub GeoJSON. Potrafi segmentować bez wskazówek (każdy obiekt osobno), z punktami i prostokątami oraz z promptem tekstowym przez Grounding DINO (dodatek `text`). Pobiera też kafle z usług XYZ i skleja je w GeoTIFF. Dokumentacja zaleca kartę graficzną z co najmniej 8 GB pamięci; SAM 3 wymaga NVIDII z CUDA i dostępu do modelu na Hugging Face, o który trzeba poprosić. Opisany w JOSS (2023) i w International Journal of Applied Earth Observation and Geoinformation. Około 6800 pobrań miesięcznie, 4200 gwiazdek, najwięcej w zestawie.
- **geoai 0.43** (na PyPI jako `geoai-py`, bo nazwa `geoai` jest zajęta przez martwy pakiet z 2018 r.) - pełny warsztat uczenia maszynowego dla danych przestrzennych: pobieranie zobrazowań (Sentinel, Landsat, NAIP, Planetary Computer), cięcie na próbki, trening modeli segmentacji, detekcji i klasyfikacji, inferencja i wizualizacja w leafmap. Ma katalog 20 modeli bazowych do teledetekcji (Prithvi, TESSERA, AlphaEarth, DINOv3, SAM 3, RF-DETR i inne) i około stu notatników z przykładami: od budynków i dróg po zmiany w zabudowie i parkingi. Ciągnie za sobą PyTorch 2.10, torchgeo i transformers, więc to instalacja na gigabajty. Wymaga Pythona 3.12 (dokumentacja mówi o 3.10, PyPI o 3.12). Opisany w JOSS w 2026 r. Do każdego modelu trzeba sprawdzić licencję wag osobno; sam pakiet jej nie podsumowuje.
- **GeoAgent 1.9** - warstwa agenta AI dla pozostałych pakietów: funkcje leafmap, geoai, geemap, Whitebox czy katalogów STAC stają się narzędziami, które wywołuje model językowy, w notatniku, w aplikacji webowej lub w QGIS. Obsługuje OpenAI, Anthropic, Gemini, OpenRouter, Bedrock oraz modele lokalne przez Ollama i serwery zgodne z OpenAI. Z dostawcą chmurowym potrzebny jest klucz API i trzeba pamiętać, że nazwy warstw i odczytane wiersze lecą do dostawcy. Pyta o potwierdzenie przed usunięciem warstwy lub zapisem pliku.
- **HyperCoast 0.27** - do danych hiperspektralnych: EMIT, PACE, AVIRIS, NEON, DESIS, PRISMA, EnMAP, ECOSTRESS i Tanager. Wyszukuje i pobiera sceny z NASA Earthdata (potrzebne konto), wyświetla widma pikseli, robi kompozycje i podstawowe analizy wód przybrzeżnych. W Polsce zastosowanie wąskie, ale jedyne takie narzędzie w otwartym Pythonie.

Model SAM sprawdziliśmy na ortofotomapie GUGiK 25 cm (500 na 500 m centrum Kazimierza Dolnego), na karcie RTX 4070 Ti z 12 GB:

![trzy panele: ortofotomapa GUGiK, 359 masek z automatycznej segmentacji SAM w losowych kolorach oraz 23 budynki wykryte promptem tekstowym building - wyniki naszego testu](/images/blog/images/16/samgeo-segmentation.jpg "full")

Liczby z testu:
- **Segmentacja bez wskazówek**: 359 masek w 20 s, szczytowe użycie pamięci karty 7,9 GB. Model wycina pojedyncze korony drzew, dachy, place i fragmenty dróg, ale nie wie, co jest czym. Z domyślnymi parametrami generatora dostaliśmy jedną maskę na cały obraz; dopiero podanie `points_per_side=32` i progów jakości dało sensowny wynik, więc warto zacząć od przykładowych notatników, a nie od wartości domyślnych.
- **Prompt tekstowy „building”**: 28 ramek z Grounding DINO i 23 poligony budynków w 1,7 s, od razu w układzie PL-1992 w GeoPackage. Pominął kilka budynków w cieniu drzew, a część poligonów zahacza o otoczenie dachu. Prompt „tree” zwrócił tylko 4 ramki, bo pojedyncze drzewo w zwartym lesie przy 25 cm to zadanie, do którego model nie był trenowany. O detekcji budynków sieciami uczonymi na polskich danych pisaliśmy we wpisie [Detekcja budynków z użyciem AI](/blog/6-ai-buildings-detections).
- **Instalacja**: środowisko z PyTorch dla CUDA i samgeo zajęło 4,7 GB, a model SAM ViT-H kolejne 2,5 GB pobrane przy pierwszym uruchomieniu. Dodatek `text` (groundingdino-py) nie zadziałał z aktualnym transformers 5 i wymagał przypięcia wersji 4.46. Autorzy sami zalecają na Windows instalację przez pixi lub conda zamiast pip.

Różnica względem QGIS: wtyczki opisane w artykule [Sztuczna inteligencja w QGIS](/blog/11-ai-plugins-qgis) dają klikanie po mapie, ale wsadowe przetworzenie stu arkuszy ortofotomapy z zapisem do bazy to już skrypt. opengeos utrzymuje też własne wtyczki QGIS dla samgeo, geoai, leafmap i GeoAgenta, więc ten sam kod da się uruchomić w obu światach.
________________________________________

### 📦 Instalatory zbiorcze i dane: geospatial, geospatial-ml, pygis, open-buildings
- **geospatial 0.12** - metapakiet: jedno `pip install geospatial` ciągnie około 80 bibliotek (GeoPandas, Rasterio, xarray, DuckDB, leafmap, geemap, whitebox, Dask, OSMnx, Sedona, PySAL i wiele innych). Wygodne na zajęciach, ryzykowne w produkcji: każda z 80 zależności może zepsuć instalację, a część z nich (Earth Engine, Earthdata, Copernicus) i tak wymaga kont.
- **geospatial-ml 0.1.2** - to samo plus PyTorch, TensorFlow, torchgeo i scikit-learn. Ostatnie wydanie w kwietniu 2022 r., deklarowany Python 3.7, więc w praktyce martwy.
- **pygis 0.10** - zależności opcjonalne dla leafmap i geemap (DuckDB, solara, voila, pmtiles, whiteboxgui) plus obraz Dockera z gotowym Jupyterem. Przydatny głównie na warsztatach autora.
- **open-buildings 0.10** - narzędzie wiersza poleceń do pobierania budynków Google Open Buildings i Overture z Source Cooperative przez DuckDB. README mówi wprost, że kod nie jest utrzymywany, i odsyła do oficjalnego narzędzia Overture Maps.
________________________________________

### 📈 Kto tego używa
Liczby z 31 października 2026 r.:

![dwa wykresy: pobrania z PyPI w ostatnim miesiącu i gwiazdki na GitHubie dla piętnastu pakietów opengeos - dane pypistats i GitHub](/images/blog/images/16/opengeos-popularity.jpg "full")

Rozkład jest wyraźny: geemap, whitebox, leafmap i whiteboxgui mają po kilkadziesiąt tysięcy pobrań miesięcznie (część to automaty CI i instalacje przez metapakiety, bo whiteboxgui jest zależnością leafmapa). Pakiety AI mają po kilka tysięcy pobrań, ale najwięcej gwiazdek, czyli zainteresowania. Reszta to narzędzia niszowe lub porzucone. Dla porównania: QGIS ma około 14 700 gwiazdek, a GeoLibre z tej samej organizacji 8300.
________________________________________

### 🧑‍💻 Czy to trudne?
Zależy od tego, z którego końca się zacznie:
- **leafmap i whitebox** - nie. Jeśli ktoś pisał już cokolwiek w konsoli Pythona QGIS, przesiadka to godzina z notatnikiem z dokumentacji. Metody nazywają się tak jak narzędzia w QGIS, a wynik widać od razu na mapie.
- **geemap** - sam pakiet jest prosty, trudniejsze jest samo Earth Engine: trzeba zrozumieć leniwe obliczenia w chmurze i ograniczenia eksportu.
- **segment-geospatial i geoai** - instalacja jest trudniejsza niż użycie. Dobrać wersję PyTorch do sterownika karty, dopilnować wersji transformers, pobrać gigabajty modeli. Gdy środowisko działa, samo wywołanie to kilka linii. Bez karty NVIDIA z 8 GB pamięci trzeba liczyć się z minutami zamiast sekund albo z błędem.
- **GeoAgent** - najprostszy w użyciu (rozmawia się z nim po ludzku), ale wymaga klucza API lub lokalnego modelu i zaufania do tego, co agent zrobi z danymi.

Wspólny próg wejścia to środowisko Pythona na Windows. Co nam pomogło w tym teście: osobne środowisko wirtualne na każdy projekt (my użyliśmy `uv venv`), conda-forge tam, gdzie dokumentacja o to prosi, i sprawdzenie zmiennych środowiskowych, bo u nas zmienna PROJ_LIB pozostawiona przez instalator PostGIS psuła układy współrzędnych w rasterio, dopóki nie wskazaliśmy jej na katalog z pakietu.
________________________________________

### ⚖️ Czym to się różni od QGIS
- **Interfejs** - QGIS to program z oknem, warstwami i kompozytorem wydruku. Pakiety opengeos to kod w notatniku z mapą jako wynikiem. Nie ma w nich edycji topologicznej, układów wydruku, stylów regułowych ani wtyczek QGIS.
- **Powtarzalność** - notatnik z kodem jest dokumentacją analizy: ta sama komórka policzy to samo za rok i na innym komputerze. W QGIS odpowiednikiem jest Model Builder i `qgis_process`, ale z narzutem uruchomienia, który zmierzyliśmy wyżej.
- **Skala** - sto arkuszy NMT, tysiąc zdjęć, cała ortofotomapa powiatu: pętla w Pythonie z whitebox lub samgeo. W QGIS to przetwarzanie wsadowe, które działa, ale trudniej je włączyć w większy potok (baza, serwer, harmonogram).
- **Dane w chmurze** - leafmap i geoai czytają COG, STAC i Planetary Computer natywnie. QGIS też potrafi, ale przez więcej klikania.
- **AI** - segment-geospatial i geoai są o krok przed wtyczkami QGIS, bo dostają nowe modele (SAM 3, DINOv3) w ciągu tygodni od publikacji.
- **Układy współrzędnych** - oba światy korzystają z PROJ przez pyproj i rasterio, więc PL-1992 i PL-2000 działają tak samo. To różnica wobec RustGIS z poprzedniego wpisu.

Nasz układ pracy: QGIS do digitalizacji, kontroli i map do druku; leafmap i whitebox w notatniku do przetwarzania seryjnego i raportów, które można oddać klientowi jako HTML; samgeo do pierwszego, szybkiego wycięcia obiektów, które potem poprawia się w QGIS.
________________________________________

### ⚠️ Na co uważać
- **Jedna osoba** - wszystkie piętnaście pakietów utrzymuje w praktyce jeden autor, który równolegle rozwija GeoLibre, RustGIS i terrio. Wydania są częste, ale dokumentacja nie zawsze nadąża (geoai: Python 3.10 w dokumentacji, 3.12 na PyPI; różne listy silników map w README i w przewodniku leafmap).
- **WhiteboxTools zamrożony** - darmowa wersja nie dostaje nowych narzędzi; nowe idą do komercyjnego Whitebox Workflows i do przeglądarkowego GeoLibre.
- **Zależności na Windows** - dodatki `raster` w leafmap i `text` w samgeo wymagały u nas ręcznych poprawek. Dokumentacja obu pakietów o tym uprzedza.
- **Konta i klucze** - geemap bez konta Earth Engine, HyperCoast bez konta Earthdata, GeoAgent bez klucza API lub lokalnego modelu nie zrobią nic. SAM 3 wymaga zgody na Hugging Face.
- **Pamięć karty graficznej** - SAM ViT-H na obrazie 2000 na 2000 pikseli zajął u nas 7,9 GB. Na kartach z 8 GB trzeba ciąć obraz na kafle (samgeo ma do tego tryb `batch`) lub brać mniejszy model.
- **Pakiety do pominięcia** - mapwidget, geospatial-ml i open-buildings to projekty zakończone; ich funkcje mają dziś anymap, geoai i narzędzie Overture.
________________________________________

### Podsumowanie 🎯
- **leafmap i whitebox** to dwa pakiety, które warto znać niezależnie od tego, czy używa się QGIS: pierwszy pokazuje każde dane w notatniku i w HTML dla klienta, drugi liczy teren i hydrologię w naszym teście **do dziesięciu razy szybciej niż SAGA w QGIS** i na równi z GDAL.
- **segment-geospatial** wycina obiekty z ortofotomapy GUGiK w sekundy i zapisuje je w GeoPackage w układzie PL-1992, ale wymaga karty NVIDIA i cierpliwości przy instalacji. **geoai** to warsztat dla tych, którzy chcą trenować własne modele.
- **geemap** jest największy, ale tylko dla posiadaczy konta Google Earth Engine; **GeoAgent** dokłada do wszystkiego asystenta AI, z klasycznymi zastrzeżeniami o kluczach i danych.
- **anymap, HyperCoast, lidar, whiteboxgui, geospatial i pygis** to narzędzia pomocnicze i niszowe; **mapwidget, geospatial-ml i open-buildings** można pominąć.
- Pakiety nie zastępują QGIS, lecz uzupełniają go tam, gdzie QGIS jest najsłabszy: w powtarzalnym, seryjnym przetwarzaniu i w szybkim dostępie do nowych modeli AI.
________________________________________

### 📚 Źródła
- [strona opengeos.org](https://opengeos.org) z listą pakietów, wtyczek QGIS i katalogów danych,
- dokumentacja i repozytoria: [leafmap](https://leafmap.org), [geemap](https://geemap.org), [anymap](https://github.com/opengeos/anymap), [mapwidget](https://github.com/opengeos/mapwidget), [whitebox](https://github.com/opengeos/whitebox-python) i [WhiteboxTools](https://github.com/jblindsay/whitebox-tools), [whiteboxgui](https://github.com/opengeos/whiteboxgui), [lidar](https://github.com/opengeos/lidar), [segment-geospatial](https://samgeo.gishub.org), [geoai](https://opengeoai.org), [GeoAgent](https://github.com/opengeos/GeoAgent), [HyperCoast](https://hypercoast.org), [geospatial](https://github.com/opengeos/geospatial), [geospatial-ml](https://github.com/opengeos/geospatial-ml), [pygis](https://github.com/opengeos/pygis), [open-buildings](https://github.com/opengeos/open-buildings),
- artykuły: [Wu 2026, GeoAI, JOSS](https://doi.org/10.21105/joss.09605); [Wu i Osco 2023, samgeo, JOSS](https://doi.org/10.21105/joss.05663); [Osco i in. 2023, SAM w teledetekcji, IJAEOG](https://doi.org/10.1016/j.jag.2023.103540); [Wu 2021, lidar, JOSS](https://doi.org/10.21105/joss.02965),
- wersje i zależności z [PyPI](https://pypi.org), pobrania z [pypistats](https://pypistats.org), gwiazdki z API GitHuba (31 października 2026 r.),
- dane testowe: NMT 1 m i ortofotomapa 25 cm z usług WCS i WMS [Geoportalu GUGiK](https://www.geoportal.gov.pl), granice województw z [Natural Earth](https://www.naturalearthdata.com/),
- nasz test: GDAL 3.9.3 i SAGA 9.5.1 z instalacji QGIS 3.40.2, WhiteboxTools 2.4.0 przez pakiet whitebox 2.3.6, segment-geospatial 1.4.2 z PyTorch 2.14 (CUDA 12.6) na karcie RTX 4070 Ti.
- Zrzuty map leafmap i panele z wynikami pochodzą z naszych skryptów; diagram pakietów i wykresy są wizualizacjami poglądowymi na podstawie dokumentacji i naszych pomiarów.
