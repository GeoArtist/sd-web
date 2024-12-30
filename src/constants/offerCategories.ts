
import { OfferCategory, OfferSubCategory } from "@/types/offerCategory";

// IMAGES
import inne from "@/public/images/offer/inne.jpg";
import inwentaryzacje from "@/public/images/offer/inwentaryzacje.jpg";
import prawne from "@/public/images/offer/prawne.jpg";
import mdcp from "@/public/images/offer/mdcp.jpg";
import podzialy from "@/public/images/offer/podzialy.jpg";
import rozgraniczenie from "@/public/images/offer/rozgraniczenia.jpg";
import tyczenia from "@/public/images/offer/tyczenia.jpg";
import wznowienia from "@/public/images/offer/wznowienia.jpg";
import gis from "@/public/images/offer/world_map.jpg";

export const offerServices: OfferSubCategory[] = [
  {
    path: "mapa-do-celow-projektowych",
    mdFileName: "mdcp",
    navName: "Mapa do celów projektowych",
    category: "geodezja",
    imgUrl: mdcp,
    imgAlt: "mapa-do-celow-projektowych image",
  },
  {
    path: "tyczenia-obiektow-budowlanych",
    mdFileName: "tyczenia",
    navName: "Tyczenie obiektów budowlanych",
    category: "geodezja",
    imgUrl: tyczenia,
    imgAlt: "tyczenia image",
  },
  {
    path: "pomiary-inwentaryzacyjne",
    mdFileName: "inwentaryzacje",
    navName: "Pomiary inwentaryzacyjne",
    category: "geodezja",
    imgUrl: inwentaryzacje,
    imgAlt: "inwentaryzacje image",
  },
  {
    path: "wznowienia-granic",
    mdFileName: "wznowienia",
    navName: "Wznowienie / wyznaczenie granic",
    category: "geodezja",
    imgUrl: wznowienia,
    imgAlt: "wznowienia image",
  },
  {
    path: "podzialy-nieruchomosci",
    mdFileName: "podzialy",
    navName: "Podziały nieruchomości",
    category: "geodezja",
    imgUrl: podzialy,
    imgAlt: "podzialy image",
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
    imgAlt: "mapy do celów prawnych image",
  },
  {
    path: "inne-opracowania",
    mdFileName: "inne",
    navName: "Inne opracowania",
    category: "geodezja",
    imgUrl: inne,
    imgAlt: "inne opracowania image",
  },
  {
    path: "gis",
    mdFileName: "gis",
    navName: "gis",
    category: "gis",
    imgUrl: gis,
    imgAlt: "gis image",
  },
  {
    path: "data-analysis",
    mdFileName: "data-analysis",
    navName: "Data analysis",
    category: "data-analysis",
    imgUrl: gis,
    imgAlt: "data analysis image",
  },
];

export const OfferCategories: OfferCategory[] = [
  {
    name: "Geodezja",
    path: "/oferta/geodezja",
    subcategories: offerServices.filter(
      (offer) => offer.category === "geodezja"
    ),
  },
  {
    name: "GIS",
    path: "/oferta/gis",
    subcategories: offerServices.filter((offer) => offer.category === "gis"),
  },
  {
    name: "Data-Analysis",
    path: "/oferta/data-analysis",
    subcategories: offerServices.filter(
      (offer) => offer.category === "data-analysis"
    ),
  },
];

