---
id: 3
title: NMT, NMPT, zNMPT
addDate: 2025-03-30
modifyDate: 2025-08-16
keywords:
    - geodezja
    - it
summary: "Czym różnią się: NMT, NMPT, zNMPT? Który model wysokościowy wybrać do konkretnego zadania?"
---

NMT, NMPT i zNMPT – Kluczowe Narzędzia w Analizie Danych Przestrzennych
Nowoczesna geoinformatyka zapewnia nam narzędzia do precyzyjnego modelowania powierzchni ziemi oraz wszystkich obiektów się na niej znajdujących. Interesujące dane, szczególnie dane geoprzestrzenne w postaci różnych modeli terenu, stanowią podstawę prac analitycznych w geodezji/GiS, planowaniu miast, inżynierii, monitorowaniu środowiskowym i wielu innych dziedzinach
Numeryczne modele terenu potrzebują danych wejściowych – współrzędnych charakterystycznych punktów terenu poziomych X, Y oraz wysokości. Dane te mogą zostać pozyskane bezpośrednio, lub potrzebują specjalnego przetworzenia, aby mogły służyć do generowania modeli pokrycia terenu.
Źródłami danych do tworzenia modeli terenu są m.in.:
•	LIDAR (Light Detection and Ranging) – pozyskiwany z różnych platform:
    o	drony (UAV LiDAR),
    o	helikoptery (ALS – Airborne Laser Scanning),
    o	samoloty (np. skanowanie w ramach projektów krajowych),
    o	satelity (np. ICESat-2, GEDI).
•	Pomiary bezpośrednie wykonywane przez geodetów:
    o	tachimetry,
    o	GNSS RTK,
    o	niwelacja precyzyjna.
•	Dane fotogrametryczne:
    o	ortofotomapy z dronów i helikopterów,
    o	zdjęcia lotnicze z samolotów,
    o	obrazy satelitarne o wysokiej rozdzielczości.
•	Dane radarowe (SAR – Synthetic Aperture Radar):
    o	misje satelitarne (np. SRTM, TanDEM-X).
•	Zasoby archiwalne:
    o	mapy topograficzne i wysokościowe w wersji cyfrowej,
    o	dane z wcześniejszych pomiarów terenowych
     
Rodzaje Modeli Pokrycia Terenu
Wyróżniamy trzy podstawowe rodzaje modeli pokrycia terenu:
•	Numeryczny Model Terenu (NMT)
•	Numeryczny Model Pokrycia Terenu (NMPT)
•	Znormalizowany Model Pokrycia Terenu (zNMPT)
Każdy z nich dostarcza unikalnych informacji, a ich wybór zależy od charakteru projektu i celu analizy.


Numeryczny Model Terenu (NMT) 🌍
NMT to cyfrowe odwzorowanie powierzchni ziemi w jej „czystej” postaci – pozbawione wszelkich obiektów znajdujących się nad gruntem, takich jak budynki, mosty, drzewa. Odwzorowuje wyłącznie naturalne ukształtowanie terenu: góry, doliny, równiny, stoki.
Jak powstaje NMT?
Pozyskane dane źródłowe podlegają wstępnemu przetworzeniu, np.:
•	Oczyszczaniu z szumów i błędnych pomiarów.
•	Klasyfikacji punktów (teren, roślinność, budynki, obiekty techniczne).
•	Korekcji georeferencji (dopasowaniu do odpowiedniego układu współrzędnych).
•	Filtracji i interpolacji brakujących punktów.
Zastosowania NMT:
•	🌊 Modelowanie odpływu wód i analiza zagrożenia powodziowego.
•	🚧 Planowanie infrastruktury transportowej i przesyłowej.
•	🏔️ Analiza stabilności stoków i projektowanie zabezpieczeń przeciwosuwiskowych.
________________________________________
2. Numeryczny Model Pokrycia Terenu (NMPT) 🏙️
NMPT obejmuje ukształtowanie terenu wraz ze wszystkimi obiektami znajdującymi się na jego powierzchni – budynkami, drzewami, mostami, masztami itp. Dzięki temu daje pełny obraz rzeczywistej przestrzeni.
Jak powstaje NMPT?
•	LIDAR (zachowanie wszystkich punktów odbicia, w tym od koron drzew i dachów budynków).
•	Fotogrametria (modele 3D z dronów, helikopterów, samolotów, a nawet satelitów).
•	Chmury punktów z radarów SAR w trybie interferometrycznym.
•	Modele 3D z technologii skanowania mobilnego (MMS – Mobile Mapping System).
Zastosowania NMPT:
•	🏗️ Planowanie urbanistyczne i analiza zacienienia.
•	📡 Modelowanie propagacji sygnałów radiowych i telekomunikacyjnych.
•	🌾 Monitorowanie zmian w zagospodarowaniu terenu.
________________________________________
3. Znormalizowany Model Pokrycia Terenu (zNMPT) 🌲
zNMPT powstaje poprzez odjęcie NMT od NMPT, co pozwala otrzymać wysokości obiektów ponad gruntem. Jest to kluczowy model, gdy interesuje nas struktura przestrzenna obiektów, a nie ich absolutne położenie względem poziomu morza.
Zastosowania zNMPT:
•	🌳 Analiza wysokości drzewostanu i struktury lasów.
•	🏘️ Ocena zagęszczenia zabudowy miejskiej.
•	🍃 Szacowanie ilości biomasy i badania ekologiczne.
________________________________________
Model terenu jako raster – jak to działa?
Numeryczne modele terenu i pokrycia terenu często zapisuje się w formacie rastrowym.
Raster to nic innego jak siatka kwadratów (tzw. pikseli) o jednakowej długości boku – np. 1 m, 5 m czy 30 m – które wspólnie pokrywają cały analizowany obszar.
Każdy piksel ma przypisaną wartość opisującą daną cechę terenu.
W przypadku NMT, NMPT czy zNMPT tą cechą jest wysokość (najczęściej w metrach nad poziomem morza).
Dzięki temu możemy w prosty sposób wykonywać obliczenia, analizy przestrzenne i wizualizacje – bo komputer może traktować taki raster jak „mapę wysokości” i wykonywać na nim operacje matematyczne.
Przykładowo:
•	Piksel (50, 100) może mieć wartość 128,5 m – co oznacza, że w tym fragmencie terenu wysokość wynosi 128,5 m n.p.m.
•	W zNMPT ta wartość oznaczałaby wysokość obiektu nad powierzchnią gruntu – np. 15,3 m, co mogłoby odpowiadać koronowi drzewa.
Im mniejszy rozmiar piksela, tym dokładniejszy model (więcej szczegółów), ale też większy rozmiar pliku i większe wymagania obliczeniowe.




 
Dlaczego te modele są tak istotne?
Każdy z modeli dostarcza innych informacji:
•	NMT – czysta topografia, niezbędna w analizach geomorfologicznych i hydrologicznych.
•	NMPT – pełny obraz terenu wraz z elementami pokrycia.
•	zNMPT – analiza wysokości względnych obiektów.
W praktyce często łączy się te modele, aby uzyskać kompleksową analizę i maksymalną wartość informacyjną.
________________________________________
Porównanie źródeł danych do Numerycznego Modelu Terenu (NMT)
Źródło danych	Platforma	Dokładność wysokościowa (typowa)	Rozdzielczość przestrzenna	Dostępność / Koszt	Uwagi
LIDAR – drony (UAV LiDAR)	Bezzałogowy statek powietrzny (do 120 m AGL)	3–5 cm	5–20 cm	Wysoki koszt operacji, pełna kontrola nad danymi	Idealny dla małych i średnich obszarów, możliwość lotów niskich i precyzyjnego mapowania.
LIDAR – helikoptery / samoloty (ALS)	Załogowy statek powietrzny (300–1500 m AGL)	5–15 cm	0,25–1 m	Wysoki koszt, wymaga zlecenia misji	Standard w mapach krajowych, duży obszar w krótkim czasie.
LIDAR – satelity (ICESat-2, GEDI)	Orbita ok. 500 km	0,5–1,0 m	Punkty wzdłuż ścieżki satelity (kilka m–km przerwy)	Publiczne dane darmowe	Bardziej do analiz globalnych niż lokalnych, niepełne pokrycie.
Fotogrametria – drony	UAV z aparatem RGB	5–15 cm	2–10 cm	Średni koszt, szybka realizacja	Wymaga dobrego oświetlenia i tekstury terenu, problematyczne w gęstej roślinności.
Fotogrametria – samoloty / helikoptery	Załogowy statek powietrzny	10–30 cm	10–50 cm	Średni–wysoki koszt	Lepsza do większych obszarów, mniej dokładna niż dron.
Fotogrametria – satelity (komercyjne)	Orbita ok. 500–700 km	1–5 m	0,3–1 m	Wysoki koszt komercyjnych scen	Dobre do aktualizacji i obszarów trudno dostępnych.
SAR – satelity (SRTM, TanDEM-X)	Orbita ok. 500–700 km	5–10 m (SRTM), 1–2 m (TanDEM-X)	30 m (SRTM), 12 m (TanDEM-X)	SRTM darmowy, TanDEM-X komercyjny	Nie zależy od pogody i światła, przydatny w dużej skali.
Pomiary bezpośrednie – GNSS RTK	Statyczny lub mobilny odbiornik GNSS	1–3 cm	Punktowe	Wysoki koszt sprzętu, czasochłonne	Bardzo dokładne, ale mały zasięg.
Pomiary bezpośrednie – tachimetria / niwelacja	Pomiar geodezyjny naziemny	1–2 mm (niwelacja), 2–5 mm (tachimetr)	Punktowe	Wysoki koszt robocizny	Najwyższa precyzja, stosowana głównie do kalibracji i kontroli.
Mapy topograficzne / archiwalne	Zdigitalizowane materiały papierowe	Zależna od źródła (1–10 m)	Zależna od źródła	Często darmowe/tanie	Do analiz historycznych i porównawczych.
________________________________________
💡 Jak czytać tabelę:
•	Dokładność wysokościowa – błąd pomiaru wysokości w typowych warunkach.
•	Rozdzielczość przestrzenna – odległość między próbkowanymi punktami w siatce NMT.
•	Dostępność / Koszt – określa łatwość pozyskania danych i ich cenę rynkową (orientacyjnie).



Soft-Data – Twój partner w analizie danych wysokościowych
Najlepsze efekty są osiągane, gdy proces tworzenia modeli terenu jest w pełni zautomatyzowany – od wczytania danych, przez filtrację i interpolację, aż po generowanie map i raportów. Dzięki Python-owi (GDAL, PDAL, PyLiDAR, Rasterio) oraz narzędziom GIS możliwe jest skrócenie czasu przetwarzania z dni do godzin.
W Soft-Data tworzymy, przetwarzamy i analizujemy modele wysokościowe, korzystając z nowoczesnych technologii i źródeł danych. Łączymy wiedzę z zakresów: geodezji, GIS, data science i programowania, aby dostarczać kompleksowe, lekkie rozwiązania skrojone na miarę.
Od pozyskania danych, przez przetwarzanie danych, po integrację z geoportal*ami i bazami danych – zapewniamy pełne wsparcie w każdym etapie projektu.
