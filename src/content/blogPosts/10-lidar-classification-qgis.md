---
id: 10
title: Klasyfikacja chmur punktów LiDAR w QGIS z pomocą AI
addDate: 2026-09-28
modifyDate: 2026-09-28
keywords:
    - geodezja
    - gis
    - lidar
    - qgis
    - ai
summary: "Aerial LiDAR Classifier - darmowa wtyczka QGIS do klasyfikacji chmury punktów"
thumbnail: /images/blog/thumbnails/lidar-classification-thumbnail.jpg
thumbnailAlt: "sklasyfikowana chmura punktów LiDAR miniaturka"
---

**Chmura punktów LiDAR ☁️** to miliony punktów zmierzonych laserem z samolotu lub drona. Każdy z nich ma dokładne położenie i wysokość, ale sam z siebie nie mówi, czy leży na dachu, na koronie drzewa, czy na drodze. Żeby dane stały się użyteczne, każdy punkt trzeba przypisać do klasy. Ten krok to **klasyfikacja**, jeden z najbardziej pracochłonnych etapów pracy z danymi LiDAR.

Nowa, darmowa wtyczka do QGIS, **Aerial LiDAR Classifier**, robi to automatycznie przy pomocy sztucznej inteligencji 🤖. W tym artykule pokazujemy, co potrafi i na co przy niej uważać.

![chmura punktów LiDAR przed i po klasyfikacji - wizualizacja poglądowa](/images/blog/images/10/lidar-before-after-classification.jpg)
________________________________________

### 🧩 Po co klasyfikować chmurę punktów?
Z surowej chmury punktów trudno cokolwiek policzyć. Dopiero punkty podzielone na klasy pozwalają, np.:
- wygenerować **Numeryczny Model Terenu** z samych punktów gruntu (więcej w artykule [DTM, DSM i nDSM](/blog/3-dtm-dsm-ndsm)),
- zbudować **model wysokości roślinności** i policzyć drzewa (zobacz [Canopy Height Model](/blog/8-canopy-height-model) i [wykrywanie drzew z CHM](/blog/9-trees-detection)),
- wyodrębnić **budynki** do modeli 3D miast i inwentaryzacji,
- sprawdzić **linie energetyczne**, np. czy gałęzie nie zbliżają się do przewodów.

Ręczna klasyfikacja dużego obszaru to często dni lub tygodnie pracy. Model AI jest w stanie automatycznie wykonać większość tej pracy z dużą skutecznością. 
Po stronie użytkownika pozostaje oczywiście weryfikacja.
________________________________________

### 🔎 Co rozpoznaje wtyczka?
Aerial LiDAR Classifier przypisuje każdemu punktowi jedną z klas:
- 🟫 **grunt**
- 🌳 **roślinność**
- 🏠 **budynki**
- ⚡ **linie energetyczne**
- 🗼 **słupy**
- 🚗 **pojazdy** i 🚧 **ogrodzenia**

Wynik jest zapisywany w standardowych kodach klas **ASPRS LAS 1.4**, dzięki czemu plik otworzą bez problemu QGIS, CloudCompare, PDAL, LAStools czy Potree. Standard ASPRS nie ma osobnych kodów dla pojazdów i ogrodzeń, więc domyślnie trafiają one do klasy „nieklasyfikowane”. Jeśli są potrzebne, wtyczka może zapisać wynik w osobnym polu i wtedy te klasy pozostają rozróżnione.

Plik wynikowy ma tyle samo punktów, te same współrzędne, układ odniesienia i wszystkie pozostałe atrybuty. Domyślnie wtyczka nadpisuje jednak dotychczasową klasyfikację. Jeśli plik był już sklasyfikowany, a chcesz zachować oryginalne klasy, zapisz wynik w osobnym polu.
________________________________________

### 🧠 Dwa modele sztucznej inteligencji
Pod maską pracują dwie sieci neuronowe, które nauczyły się rozpoznawać obiekty na wcześniej opisanych danych:
- **LitePT-L** to model domyślny. Opracowano go na politechnice ETH w Zurychu, a na zbiorze DALES (lotniczy LiDAR z USA) wytrenował go autor wtyczki. Pracuje w rozdzielczości 10 cm, rozróżnia 8 klas i wymaga karty graficznej NVIDIA. Na karcie RTX 3090 przetwarza około 60 tys. punktów na sekundę.
- **SegFormer 3D** pochodzi z projektu TreeAIBox kanadyjskiej agencji Natural Resources Canada. Pracuje w rozdzielczości 30 cm, rozróżnia 7 klas i **działa także na zwykłym procesorze**, bez karty graficznej. Na samym procesorze liczy wyraźnie wolniej niż na karcie graficznej, ale uruchomisz go na każdym komputerze.

Wtyczka sama sprawdza, który model zadziała na danym komputerze. Jeśli wybrany model nie może się uruchomić, wyjaśnia dlaczego i jednym kliknięciem przełącza na drugi.
________________________________________

### ⚙️ Najważniejsze funkcje
- **Instalacja jednym kliknięciem** - przy pierwszym uruchomieniu wtyczka sama pobiera potrzebne biblioteki AI (1-3 GB, zwykle 5-15 minut) do osobnego folderu. Nie są potrzebne uprawnienia administratora, a QGIS działa w tym czasie normalnie.
- **Obsługa formatów LAS, LAZ i COPC** - pliki wystarczy przeciągnąć do panelu albo wybrać warstwy już wczytane do projektu.
- **Duże pliki** - dane są dzielone na kafle z zakładką, a tryb strumieniowy przetwarza nawet pliki większe niż pamięć RAM komputera.
- **Praca w tle** - QGIS się nie zawiesza, widać postęp, a zadanie można w każdej chwili anulować.
- **Automatyzacja** - klasyfikację można uruchomić z Przybornika Processing, wpiąć w Modelarz graficzny albo wywołać z wiersza poleceń (`qgis_process`) i przetwarzać całe serie plików.
- **Bezpieczny zapis** - wynik trafia do nowego pliku dopiero po zakończeniu obliczeń, więc oryginalne dane nigdy nie zostaną nadpisane.
- **Podgląd 3D** - sklasyfikowane pliki można od razu wczytać do QGIS jako warstwy pokolorowane według klas, gotowe do oglądania w widoku 3D.

![okno algorytmu Classify Aerial LiDAR Point Cloud w QGIS](/images/blog/images/10/lidar-gui-screenshot.jpg)
________________________________________

### 🚀 Jak zacząć?
1. W QGIS (wersja 3.34 lub nowsza, także QGIS 4) otwórz **Wtyczki > Zarządzaj wtyczkami** i wyszukaj **Aerial LiDAR Classifier**.
2. Przy pierwszym uruchomieniu kliknij **Install Dependencies** i poczekaj na zakończenie instalacji.
3. Przeciągnij pliki `.las` / `.laz` do panelu, wskaż folder wynikowy i kliknij **Run classification**.

Po zakończeniu QGIS pokaże czas obliczeń i przycisk otwierający folder z wynikami.

![wtyczka Aerial LiDAR Classifier w menedżerze wtyczek QGIS](/images/blog/images/10/lidar-plugin-screenshot.jpg)
________________________________________

### ⚠️ O czym warto pamiętać
- **Licencja modeli** - sama wtyczka jest darmowa i otwarta (GPL), ale wytrenowane modele AI udostępniono na licencji **CC BY-NC 4.0**, czyli wyłącznie do użytku niekomercyjnego. Zastosowanie komercyjne wymaga osobnej zgody autorów modeli.
- **Dane treningowe** - model LitePT-L uczono na danych z USA. Na własnym zbiorze testowym osiąga bardzo dobre wyniki (ok. 98% poprawnie sklasyfikowanych punktów), ale na danych o innej gęstości czy innym typie zabudowy, np. polskich, wynik może być słabszy. Najsłabiej rozpoznaje ciężarówki.
- **Sprzęt** - model LitePT-L wymaga karty NVIDIA. Na najnowszych kartach RTX 50 na razie działa tylko SegFormer 3D, a obsługa komputerów Mac nie została jeszcze przetestowana.
- **Kontrola jakości** - jak każda automatyczna klasyfikacja, wynik warto przejrzeć i poprawić tam, gdzie AI się pomyliła.

Polskie dane LiDAR z zasobu GUGiK są zapisane w metrach, w formatach LAS/LAZ, więc wtyczka przyjmie je bez dodatkowej konwersji. Przyda się zwłaszcza przy danych z własnych nalotów, np. z dronów, które zwykle trzeba sklasyfikować samodzielnie.
________________________________________

### Podsumowanie 🎯
Aerial LiDAR Classifier pozwala klasyfikować chmury punktów w darmowym QGIS:
- rozpoznaje grunt, roślinność, budynki, linie energetyczne i słupy,
- działa z kartą graficzną lub bez niej,
- sam instaluje wszystko, czego potrzebuje,
- zapisuje wynik w standardzie, który rozumieją inne programy.

Wtyczkę i jej dokumentację znajdziesz na [GitHubie](https://github.com/akharroubi/AerialLidarClassifier).
