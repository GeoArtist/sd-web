
import { OfferCategory, OfferSubCategory } from "@/types/offerCategory";

// IMAGES
import mdcp from "@/public/images/offer/mdcp-min.jpg";
import tyczenia from "@/public/images/offer/tyczenia-min.jpg";
import inwentaryzacje from "@/public/images/offer/inwentaryzacje-min.jpg";
import wznowienia from "@/public/images/offer/wznowienia-min.jpg";
import podzialy from "@/public/images/offer/podzialy-min.jpg";
import rozgraniczenie from "@/public/images/offer/rozgraniczenia-min.jpg";
import prawne from "@/public/images/offer/prawne-min.jpg";
import inne from "@/public/images/offer/inne-min.jpg";
import obiektowanie from "@/public/images/offer/obiektowanie-min.jpg";
import raster from "@/public/images/offer/raster-min.jpg";
import vector from "@/public/images/offer/vector-min.jpg";
import spatialAnalysis from "@/public/images/offer/spatial-analysis-min.jpg";
import spatialDB from "@/public/images/offer/spatialDB-min.jpg";
import geoportale from "@/public/images/offer/geoportale-min.jpg";
import przetwarzanie from "@/public/images/offer/przetwarzanie-min.jpg";
import harmonizacja from "@/public/images/offer/harmonizacja-min.jpg";
import wizualizacje from "@/public/images/offer/wizualizacje-min.jpg";

export const offerServices: OfferSubCategory[] = [
  {
    path: "mapa-do-celow-projektowych",
    mdFileName: "mdcp",
    navName: "Mapa do celów projektowych",
    category: "geodezja",
    imgUrl: mdcp,
    imgAlt: "mapa do celow projektowych",
  },
  {
    path: "tyczenia-obiektow-budowlanych",
    mdFileName: "tyczenia",
    navName: "Tyczenie obiektów budowlanych",
    category: "geodezja",
    imgUrl: tyczenia,
    imgAlt: "tyczenie",
  },
  {
    path: "pomiary-inwentaryzacyjne",
    mdFileName: "inwentaryzacje",
    navName: "Pomiary inwentaryzacyjne",
    category: "geodezja",
    imgUrl: inwentaryzacje,
    imgAlt: "inwentaryzacje",
  },
  {
    path: "wznowienia-granic",
    mdFileName: "wznowienia",
    navName: "Wznowienie / wyznaczenie granic",
    category: "geodezja",
    imgUrl: wznowienia,
    imgAlt: "wznowienia",
  },
  {
    path: "podzialy-nieruchomosci",
    mdFileName: "podzialy",
    navName: "Podziały nieruchomości",
    category: "geodezja",
    imgUrl: podzialy,
    imgAlt: "podzialy",
  },
  {
    path: "rozgraniczenie-nieruchomosci",
    mdFileName: "rozgraniczenie",
    navName: "Rozgraniczenie nieruchomości",
    category: "geodezja",
    imgUrl: rozgraniczenie,
    imgAlt: "rozgraniczenie image",
  },
  {
    path: "mapa-do-celow-prawnych",
    mdFileName: "prawne",
    navName: "Mapa do celów prawnych",
    category: "geodezja",
    imgUrl: prawne,
    imgAlt: "mapy do celów prawnych",
  },
  {
    path: "inne-opracowania",
    mdFileName: "inne",
    navName: "Inne opracowania",
    category: "geodezja",
    imgUrl: inne,
    imgAlt: "inne opracowania",
  },
  {
    path: "obiektowanie-map",
    mdFileName: "obiektowanie",
    navName: "Obiektowanie Map",
    category: "geodezja",
    imgUrl: obiektowanie,
    imgAlt: "Obiektowanie map",
  },
  {
    path: "opracowania-rastrowe",
    mdFileName: "rastrowe",
    navName: "Opracowania rastrowe",
    category: "gis",
    imgUrl: raster,
    imgAlt: "przykład danych rastrowych",
  },
  {
    path: "opracowania-wektorowe",
    mdFileName: "wektorowe",
    navName: "Opracowania wektorowe",
    category: "gis",
    imgUrl: vector,
    imgAlt: "przykład danych wektorowych",
  },
  {
    path: "analizy-przestrzenne",
    mdFileName: "analizyPrzestrzenne",
    navName: "Analizy Przestrzenne",
    category: "gis",
    imgUrl: spatialAnalysis,
    imgAlt: "przykład analiz przestrzennych",
  },
  {
    path: "przestrzenne-bazy-danych",
    mdFileName: "spatialDB",
    navName: "Przestrzenne Bazy Danych",
    category: "gis",
    imgUrl: spatialDB,
    imgAlt: "przykład przestrzennych baz danych",
  },
  {
    path: "geoportale",
    mdFileName: "geoportale",
    navName: "Geoportale",
    category: "gis",
    imgUrl: geoportale,
    imgAlt: "przykład geoportalu",
  },

  {
    path: "przetwarzanie-danych",
    mdFileName: "przetwarzanie",
    navName: "Przetwarzanie Danych",
    category: "analiza-danych",
    imgUrl: przetwarzanie,
    imgAlt: "przykładowy schemat przetwarzania danych",
  },
  {
    path: "harmonizacja-danych",
    mdFileName: "harmonizacja",
    navName: "Harmonizacja Danych",
    category: "analiza-danych",
    imgUrl: harmonizacja,
    imgAlt: "przykładowy schemat harmonizacji danych",
  },
  {
    path: "wizualizacje-danych",
    mdFileName: "wizualizacje",
    navName: "Wizualizacje Danych",
    category: "analiza-danych",
    imgUrl: wizualizacje,
    imgAlt: "przykładowa wizualizacja danych ",
  },
];

export const OfferCategories: OfferCategory[] = [
  {
    name: "Geodezja",
    path: "/oferta/geodezja",
    mainCategoryPage: "mapa-do-celow-projektowych",
    subcategories: offerServices.filter(
      (offer) => offer.category === "geodezja"
    ),
  },
  {
    name: "GIS",
    path: "/oferta/gis",
    mainCategoryPage: "opracowania-rastrowe",
    subcategories: offerServices.filter((offer) => offer.category === "gis"),
  },
  {
    name: "Analiza-Danych",
    path: "/oferta/analiza-danych",
    mainCategoryPage: "przetwarzanie-danych",
    subcategories: offerServices.filter(
      (offer) => offer.category === "analiza-danych"
    ),
  },
];

