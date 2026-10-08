---
id: 11
title: Sztuczna inteligencja w QGIS - przegląd wtyczek AI
addDate: 2026-10-08
modifyDate: 2026-10-08
keywords:
    - geodezja
    - gis
    - qgis
    - ai
    - llm
    - wtyczki
summary: "Przykłady wtyczek AI w QGIS: LLM, agenci, segmentacja, klasyfikacja"
thumbnail: /images/blog/thumbnails/ai-qgis-plugins-thumbnail.jpg
thumbnailAlt: "robotyczna dłoń trzymająca kulę ziemską miniaturka"
---

**Wtyczki QGIS 🤖** to już nie tylko zwykłe, dodatkowe przyciski w menu. Coraz częściej są łącznikiem między światem GIS, a całą sztuczną inteligencją: dużymi modelami językowymi (LLM), algorytmami uczenia maszynowego oraz sieciami neuronowymi. Dzięki takim nowoczesnym narzędziom w tym samym, darmowym oprogamowaniu QGIS, można rozmawiać z projektem jak z asystentem, oddelegowywać część zadań, zlecić wykrywanie obiektów na zdjęciach lotniczych albo przeprowadzenie klasyfikacji chmury punktów LiDAR.

W tym artykule przedstawimy 5 przykładów takich rozwiązań: co robią, czego potrzebują i na co przy nich uważać.

![ilustracja: robotyczna dłoń trzymająca kulę ziemską otoczoną siecią połączeń](/images/blog/images/11/qgis-ai-plugins.jpg)
________________________________________

### 🧭 Trzy rodzaje narzędzi
Wtyczki AI do QGIS można podzielić na trzy grupy:
- **asystenci oparci na dużych modelach językowych (LLM)** - takich jak ChatGPT, Claude czy Gemini. Rozumieją polecenia pisane zwykłym językiem i zamieniają je na operacje w QGIS albo kod w Pythonie. Model może działać w chmurze dostawcy - wtedy potrzebne jest konto lub klucz API (płatny dostęp do modelu przez internet). Część wtyczek obsługuje też modele uruchamiane lokalnie na własnym komputerze, np. przez Ollamę lub LM Studio, takie jak Qwen czy polski [Bielik](https://bielik.ai/).
- **modele do analizy obrazu i chmury punktów** - sieci neuronowe uruchamiane lokalnie na komputerze. Wykrywają obiekty na ortofotomapach lub przypisują punkty LiDAR do klas.
- **klasyczne uczenie maszynowe** - algorytmy takie jak lasy losowe (Random Forest) czy regresja, które uczą się zależności na przykładowych danych. Służą m.in. do klasyfikacji pokrycia terenu ze zdjęć satelitarnych albo do przewidywania wartości w przestrzeni.

W tym przeglądzie skupiamy się na dwóch pierwszych grupach.
________________________________________

### 💬 QChatGPT - czat z OpenAI w oknie QGIS
**QChatGPT** dodaje do QGIS panel czatu połączony z API OpenAI. Ma kilka trybów rozmowy: ogólny, pytania do dokumentu PDF, generowanie obrazów, tryb **QGIS** i **QCode**, w których prosi się o kod PyQGIS (Python sterujący QGIS). Przycisk **Add/Execute** pozwala od razu uruchomić wygenerowany kod. Wtyczka obsługuje też polecenia głosowe i odczytywanie odpowiedzi.

Na zrzucie poniżej prosimy o pustą warstwę punktową w układzie EPSG:2177, czyli w jednej ze stref polskiego układu PL-2000.

- **Koszt** - wtyczka jest darmowa (licencja EUPL-1.2), ale wymaga własnego, płatnego klucza API OpenAI.
- **Instalacja** - poza samą wtyczką trzeba samodzielnie doinstalować do Pythona w QGIS kilka pakietów (m.in. `openai`).
- **Link** - [QChatGPT w repozytorium wtyczek QGIS](https://plugins.qgis.org/plugins/QChatGPT/)

![okno czatu QChatGPT w trybie QGIS z poleceniem utworzenia warstwy punktowej w EPSG:2177](/images/blog/images/11/qchatgpt-chat-screenshot.png)
________________________________________

### 🔌 QGIS MCP - QGIS sterowany przez agenta AI
**MCP (Model Context Protocol)** to otwarty standard, przez który asystent AI może korzystać z zewnętrznych programów. Wtyczka **QGIS MCP** autorstwa Nicolasa Karasiaka udostępnia asystentowi ponad 100 narzędzi QGIS: zarządzanie projektem i warstwami, edycję obiektów i atrybutów, stylizację, algorytmy Processing, zapytania SQL, połączenia z PostgreSQL, kompozycje wydruku i renderowanie map.

W praktyce wpisuje się polecenie zwykłym językiem, np. „wczytaj warstwę działek i pokoloruj je według powierzchni”, a agent sam wywołuje odpowiednie narzędzia w otwartym QGIS.

- **Klienci AI** - wtyczka nie jest związana z jednym dostawcą. Działa m.in. z Claude Desktop, Claude Code, Cursor, VS Code, Gemini CLI, Codex CLI i LM Studio.
- **Instalacja** - wtyczkę instaluje się z repozytorium QGIS (QGIS 3.28 lub nowszy, także QGIS 4). Do tego potrzebny jest serwer MCP uruchamiany przez narzędzie `uv`. Okno konfiguracji podpowiada polecenie dla wybranego klienta.
- **Koszt** - kod jest otwarty i darmowy. Płaci się za wybranego asystenta AI.
- **Link** - [QGIS MCP na GitHubie](https://github.com/nkarasiak/qgis-mcp)

![okno Setup & Configurator wtyczki QGIS MCP z wyborem klienta AI i poleceniem konfiguracji](/images/blog/images/11/qgis-mcp-configurator-screenshot.png)
________________________________________

### 🛰️ OpenGeoAgent - multimodalny agent do analiz przestrzennych
**OpenGeoAgent** (autor: Qiusheng Wu, projekt opengeos) to agent AI z panelem czatu w QGIS. Jest **multimodalny**, czyli rozumie zarówno tekst, jak i obrazy: można dołączyć zrzut ekranu mapy i zapytać, co na nim widać. Agent potrafi:
- **opisać bieżący projekt** - warstwy, zasięg, nawigacja po mapie,
- **wczytać dane** wektorowe, rastrowe i kafle XYZ, również zdalne pliki Cloud Optimized GeoTIFF,
- **wyszukać zobrazowania satelitarne** w katalogach STAC (domyślnie Microsoft Planetary Computer) dla aktualnego widoku mapy,
- **uruchomić algorytmy Processing**, a gdy brakuje gotowego narzędzia, napisać skrypt PyQGIS, który wykona się dopiero po potwierdzeniu użytkownika.

Opcjonalne pakiety dodają m.in. katalogi Google Earth Engine i dane NASA Earthdata.

- **Modele AI** - OpenAI (także w ramach subskrypcji ChatGPT), Anthropic, Google Gemini, Amazon Bedrock albo lokalny serwer Ollama.
- **Instalacja** - z repozytorium QGIS (QGIS 3.28 lub nowszy, Python 3.11 lub nowszy). Biblioteki instaluje się przyciskiem **Install Dependencies** do osobnego środowiska, bez zmian w Pythonie QGIS.
- **Koszt** - kod jest darmowy (licencja MIT), ale potrzebna jest subskrypcja ChatGPT lub klucz API wybranego dostawcy.
- **Link** - [OpenGeoAgent na GitHubie](https://github.com/opengeos/GeoAgent)

![zakładka Dependencies w ustawieniach OpenGeoAgent z listą pakietów dostawców AI](/images/blog/images/11/opengeoagent-settings-screenshot.png)
________________________________________

### 🗺️ GeoAI - modele głębokiego uczenia do zdjęć lotniczych
Wtyczka **GeoAI** (również Qiusheng Wu) zbiera w jednym menu gotowe modele do analizy zdjęć lotniczych, ortofotomap i obrazów satelitarnych:
- **Segment Anything (SAM 1, 2 i 3)** - wydzielanie obiektów wskazanych punktem, prostokątem albo opisem tekstowym, np. „building”,
- **DeepForest** - wykrywanie koron pojedynczych drzew (o innym podejściu pisaliśmy w artykule [Wykrywanie drzew z CHM](/blog/9-trees-detection)),
- **OmniWaterMask** - wykrywanie wód, z wynikiem rastrowym lub wektorowym,
- **Moondream** - model, który opisuje obraz i odpowiada na pytania o jego treść,
- **segmentacja semantyczna i segmentacja instancji (Mask R-CNN)** - z możliwością wytrenowania własnego modelu na swoich danych i uruchomienia go na nowym obrazie.

Do segmentacji semantycznej potrzebny jest wytrenowany model (plik `.pth`). Na zrzucie poniżej widać zakładkę **Inference**, w której się go wskazuje. Przykładowe dane do nauki dotyczą m.in. budynków i granic pól. Więcej o wykrywaniu budynków przeczytasz w artykule [Detekcja obrysów budynków z ortofotomapy](/blog/6-ai-buildings-detections).

- **Instalacja** - z repozytorium QGIS. Przy pierwszym uruchomieniu wtyczka sama instaluje biblioteki, także obsługę GPU, do osobnego folderu (zwykle 10-15 minut). Działa na Windows, macOS i Linux.
- **Sprzęt** - zalecana karta graficzna z CUDA (NVIDIA). SAM 3 jej wymaga, pozostałe modele działają też na procesorze, choć wolniej.
- **Koszt** - wtyczka jest darmowa, na licencji MIT.
- **Link** - [GeoAI - dokumentacja wtyczki QGIS](https://opengeoai.org/qgis_plugin/)

![zakładka Inference okna GeoAI Semantic Segmentation z ustawieniami modelu i rastra](/images/blog/images/11/geoai-semantic-segmentation-screenshot.png)
________________________________________

### ☁️ Aerial LiDAR Classifier - klasyfikacja chmury punktów
**Aerial LiDAR Classifier** automatycznie przypisuje punkty z lotniczego skaningu laserowego do klas: grunt, roślinność, budynki, linie energetyczne, słupy, pojazdy i ogrodzenia. Wynik zapisuje w standardzie ASPRS LAS 1.4. Sklasyfikowana chmura to punkt wyjścia do Numerycznego Modelu Terenu czy modelu wysokości roślinności.

Wtyczka ma dwa modele: **LitePT-L** (wymaga karty NVIDIA) i **SegFormer 3D** (działa też na zwykłym procesorze). Biblioteki instaluje sama, a duże pliki przetwarza w tle.

- **Koszt** - wtyczka jest darmowa (GPL), ale wytrenowane modele mają licencję **CC BY-NC 4.0**, czyli tylko do użytku niekomercyjnego.
- **Więcej** - szczegółowo opisaliśmy ją w artykule [Klasyfikacja chmury punktów LiDAR w QGIS z pomocą AI](/blog/10-lidar-classification-qgis).

![panel Aerial LiDAR Classifier z wybranym modelem LitePT-L i ustawieniami plików wynikowych](/images/blog/images/11/aerial-lidar-classifier-screenshot.png)
________________________________________

### 🚀 Jak zacząć?
1. W QGIS otwórz **Wtyczki > Zarządzaj wtyczkami** i wyszukaj nazwę wtyczki.
2. Przy pierwszym uruchomieniu zainstaluj zależności. OpenGeoAgent, GeoAI i Aerial LiDAR Classifier robią to z okna wtyczki, przy QChatGPT pakiety Pythona trzeba doinstalować ręcznie.
3. Dla asystentów LLM wpisz klucz API albo połącz konto wybranego dostawcy (w QGIS MCP: skonfiguruj klienta AI).
4. Zacznij od kopii danych i małego obszaru testowego.
________________________________________

### ⚠️ O czym warto pamiętać
- **Koszty i dane** - asystenci LLM wysyłają polecenia i fragmenty projektu do chmury dostawcy, a każde zapytanie kosztuje. Wyjątkiem są modele uruchamiane lokalnie, np. przez Ollamę lub LM Studio: dane zostają na komputerze i nie płaci się za zapytania. Lokalny model może jednak działać słabiej niż chmurowy - autor OpenGeoAgent zauważa, że przez Ollamę odpowiedzi są wolniejsze, a wywoływanie narzędzi mniej skuteczne.
- **Wykonywanie kodu** - QGIS MCP, OpenGeoAgent i QChatGPT potrafią uruchamiać kod Pythona w QGIS. QGIS MCP ma narzędzie `execute_code`, które wykonuje dowolny kod PyQGIS. Pracuj na kopii projektu i czytaj, co agent zamierza zrobić.
- **Aktualność** - QChatGPT nie był aktualizowany od 2023 r. Pozostałe wtyczki rozwijają się szybko, więc ich funkcje mogą się zmieniać.
- **Licencje modeli** - przed użyciem komercyjnym sprawdź licencję modeli, nie tylko samej wtyczki (np. CC BY-NC w Aerial LiDAR Classifier).
- **Kontrola wyników** - odpowiedzi LLM i wyniki detekcji trzeba sprawdzić. Odpowiedzialność za wynik zostaje po Twojej stronie.
________________________________________

### Podsumowanie 🎯
Wtyczki AI w QGIS obejmują dziś bardzo różne zadania:
- **QChatGPT** - czat i generowanie kodu PyQGIS, choć wtyczka nie była aktualizowana od 2023 r.,
- **QGIS MCP** - sterowanie QGIS z wielu asystentów AI przez standard MCP,
- **OpenGeoAgent** - multimodalny agent z wyszukiwaniem danych satelitarnych,
- **GeoAI** - segmentacja i detekcja obiektów na zdjęciach lotniczych,
- **Aerial LiDAR Classifier** - klasyfikacja chmury punktów.

Wszystkie znajdziesz w [repozytorium wtyczek QGIS](https://plugins.qgis.org/).

**Soft-Data** wykonuje analizy przestrzenne, opracowania rastrowe i wektorowe oraz przetwarzanie danych. Jeśli chcesz sprawdzić, czy narzędzia AI przyspieszą Twój projekt, zapraszamy do kontaktu.
