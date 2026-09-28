---
id: 9
title: Wykrywanie drzew z CHM
addDate: 2025-10-05
modifyDate: 2025-10-05
keywords:
    - geodezja
    - it
summary: "Wykrywanie drzew na podstawie CHM - Numerycznego Modelu Roślinności"
thumbnail: /images/blog/thumbnails/trees-detection-thumbnail.jpg
thumbnailAlt: "model wykrywania drzew miniaturka"
---

**Wykrywanie drzew 🌳**  jest kluczowe w leśnictwie, ekologii, planowaniu miejskim czy monitoringu środowiska. 
Dzięki nowoczesnym technologiom zdalnego wykrywania mamy dostęp do bogatych danych, które umożliwiają analizę lasów. 
Jednym z najskuteczniejszych źródeł danych do detekcji drzew jest Canopy Height Model (CHM), czyli model wysokości koron drzew. 
W tym artykule krok po kroku wyjaśnimy, jak wykrywa się drzewa z CHM, a także porównamy tę metodę z innymi podejściami, takimi jak LiDAR, obrazowanie optyczne czy metody sztucznej inteligencji.

![canopy heigh model kolorowy](/images/blog/images/9/trees-detection.jpg)
________________________________________

### Canopy Height Model (CHM)
CHM to raster, w którym każda komórka reprezentuje wysokość roślinności nad poziomem gruntu. CHM najczęściej powstaje na podstawie danych LiDAR, poprzez odjęcie Digital Terrain Model (DTM) od Digital Surface Model (DSM):
- DSM pokazuje wysokość wszystkich powierzchni – drzew, budynków, terenu.
- DTM reprezentuje wyłącznie teren bez roślinności i budowli.
- CHM izoluje wysokość roślinności, co jest idealne do wykrywania pojedynczych drzew.

CHM można także tworzyć na podstawie fotogrametrii (metoda Structure-from-Motion) lub zdjęć satelitarnych stereo, jednak LiDAR pozostaje najdokładniejszym źródłem.
![canopy heigh model czarno biały](/images/blog/images/8/canopy-height-model-bc.jpg)
________________________________________

### Wykrywanie drzew z CHM?🛠️

**1. Wstępne przetwarzanie CHM** 
CHM często zawiera szumy: drobne nierówności liści, podszyt czy cienie. Przetwarzanie wstępne redukuje te zakłócenia.Proces ten polega m.in. na:
- Downsampling 📉 - CHM o wysokiej rozdzielczości (np. 0,25 m/piksel) może być bardzo dużym plikiem. Zmniejszenie rozdzielczości redukuje czas obliczeń przy zachowaniu istotnych wierzchołków drzew.
- Wygładzanie 🌀 - najczęściej stosuje się filtr Gaussa, który wygładza drobne nierówności, np. sigma 2–3 piksele, aby połączyć małe piki liści w jeden szczyt drzewa.

**2. Detekcja lokalnych maksimów** 
Wygładzony CHM jest analizowany pod kątem lokalnych maksimów, które odpowiadają czubkom drzew.
- Maximum filter 🔍 - każdy piksel jest porównywany z sąsiednimi w oknie o rozmiarze odpowiadającym minimalnej odległości między drzewami.
- Próg minimalnej wysokości 📏 - piki poniżej określonej wysokości (np. 5 m) są ignorowane, co eliminuje podszyt i niskie krzewy.

Wynikiem tego etapu jest lista punktów odpowiadających prawdopodobnym czubkom drzew.

**3. Segmentacja koron drzew** 
Czasami lokalne maksima nie wystarczą, szczególnie gdy korony drzew zachodzą na siebie. Stosuje się wtedy segmentację:
- Watershed 🌊 - traktuje CHM jako powierzchnię, gdzie wierzchołki drzew to „szczyty”. Segmentacja przypisuje piksele do poszczególnych koron.
- Filtracja małych segmentów 🗑 - Segementy o powierzchni mniejszej niż ustalony próg (np. 3 m²) są odrzucane, co eliminuje fałszywe detekcje.

W przypadku prostszych zastosowań można ograniczyć się do samych punktów wierzchołków bez tworzenia poligonów koron.

![canopy heigh model kolorowy](/images/blog/images/9/trees-detection-zoom.jpg)

Przykład tworzenia CHM w Pythonie: [Trees Detection from CH - Soft-Data - Kaggle notebook](https://www.kaggle.com/code/marekszczepkowski/tree-tops-detector-soft-data)
________________________________________

### Porównanie metod detekcji drzew
Istnieje kilka sposobów wykrywania drzew, każdy z własnymi zaletami i ograniczeniami:
- 🌳 CHM / LiDAR - najdokładniejsza metoda do wykrywania czubków drzew i pomiaru ich wysokości. Dobrze sprawdza się w lasach naturalnych i zróżnicowanych strukturach. Wymaga danych LiDAR, które są kosztowne, ale dają wysoką precyzję.
- 🛰 Obrazowanie optyczne - wykorzystuje zdjęcia satelitarne lub z dronów. Pozwala na szybkie pokrycie dużych obszarów. Wadą jest brak informacji o wysokości drzew oraz trudności w gęstych lasach, gdzie cienie i nachylenie terenu mogą powodować błędy.
- 🤖 AI / Deep Learning - metody uczenia maszynowego potrafią automatycznie wykrywać drzewa i ich gatunki na podstawie obrazów RGB, multispektralnych lub CHM. Są bardzo obiecujące, ale wymagają danych treningowych i mogą nie działać dobrze w nowym środowisku, jeśli model nie był wcześniej nauczony na podobnych lasach.
- 📡 Klasyczny LiDAR - detekcja na podstawie chmur punktów LiDAR. Pozwala na pełną segmentację koron, analizę struktury lasu i dokładne pomiary wysokości. Wymaga jednak zaawansowanego przetwarzania i specjalistycznego oprogramowania.
________________________________________

### Podsumowanie 🎨
Wykrywanie drzew z CHM to efektywna metoda dla lasów naturalnych i miejskich:
- CHM umożliwia detekcję punktów czubków drzew oraz segmentację koron.
- Wstępne wygładzenie i filtrowanie minimalnej wysokości pozwalają ograniczyć fałszywe detekcje.
- Metoda jest bardziej precyzyjna niż detekcja tylko z obrazów optycznych i pozwala uzyskać wysokość drzew, czego nie dają tradycyjne zdjęcia.
- Połączenie CHM z metodami AI lub klasycznym LiDAR pozwala jeszcze dokładniej analizować strukturę lasu i zdrowotność drzew.


**Soft-Data** specjalizuje się w detekcji, segmentacji, klasyfikacji drzew, krzewów oraz przeprowadzaniu analiz i symulacji drzewostanu.

