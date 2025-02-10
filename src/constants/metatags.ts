import { MetaTagsCollection } from "@/types/metatags";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const GenerateMetatags = (
  title: string,
  description: string,
  url: string
): Metadata => {
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: "Soft-Data",
      url: url,
      type: "website",
      images: [
        {
          url: `/logos/social_logo.png`,
          width: 800,
          height: 600,
        },
      ],
      locale: "pl_PL",
    },
    twitter: {
      card: "summary",
      title: title,
      description: description,
      images: [`/logos/social_logo.png`],
      site: "@softdatageo",
      creator: "@softdatageo",
    },
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  };
};

export const pagesMetadata: MetaTagsCollection = {
  home: GenerateMetatags(
    "Soft-Data - Geodezja, GIS, Analiza Danych, Przetwarzanie Danych",
    "Soft-Data oferuje usługi z zakresów: geodezji klasycznej, GIS, analizy danych oraz przetwarzania danych. Sprawdź naszą ofertę!",
    `${BASE_URL}`
  ),
  "o-nas": GenerateMetatags(
    "O nas - kim jesteśmy - Soft-Data",
    "SOFT-DATA to nowoczesna, szybko rozwijającą się firma, świadczącą zarówno klasyczne usługi geodezyjno-kartograficzne, jak również zaawansowane usługi programistyczno-geoinformatyczne",
    `${BASE_URL}/o-nas`
  ),
  kontakt: GenerateMetatags(
    "Kontakt - skontaktuj się z nami - Soft-Data",
    "Skontaktuj się z nami, aby dowiedzieć się więcej o naszych usługach: kontakt@soft-data.pl lub (+48) 545-154-251",
    `${BASE_URL}/kontakt`
  ),
  technologie: GenerateMetatags(
    "Technologie - poznaj nasz stack technologiczny - Soft-Data",
    "Zobacz, z jakich narzędzi i technologii korzystamy na co dzień, aby zapewnić najwyższą jakość naszych usług.",
    `${BASE_URL}/technologie`
  ),
  "polityka-prywatnosci": GenerateMetatags(
    "Polityka Prywatności - Soft-Data",
    "Zapoznaj się z naszą polityką prywatności, aby dowiedzieć się, jakie dane zbieramy i w jaki sposób je przetwarzamy.",
    `${BASE_URL}/polityka-prywatnosci`
  ),
  "polityka-cookies": GenerateMetatags(
    "Polityka Cookies - Soft-Data",
    "Zapoznaj się z naszą polityką cookies, aby dowiedzieć się, jakie pliki cookies używamy i w jaki sposób je przetwarzamy.",
    `${BASE_URL}/polityka-cookies`
  ),

  "geodezja/mapa-do-celow-projektowych": GenerateMetatags(
    "Mapa do celów projektowych - oferta geodeta Olsztyn - Soft-Data",
    "Mapa do celów projektowych jest bazowym opracowaniem, niezbędnym do realizacji każdej inwestycji budowlanych. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/mapa-do-celow-projektowych`
  ),
  "geodezja/tyczenia-obiektow-budowlanych": GenerateMetatags(
    "Tyczenie obiektów - oferta geodeta Olsztyn - Soft-Data",
    "Tyczenie obiektów budowlanych, rozpoczyna proces budowlany poprzez wyniesienie projektu w teren. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/tyczenia-obiektow-budowlanych`
  ),
  "geodezja/pomiary-inwentaryzacyjne": GenerateMetatags(
    "Pomiary inwentaryzacyjne - oferta geodeta Olsztyn - Soft-Data",
    "Pomiar inwentaryzacyjny / powykonawczy, kończy proces inwestycyjny poprzez naniesienie nowo wybudowanych obiektów na mapę. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/pomiary-inwentaryzacyjne`
  ),
  "geodezja/wznowienia-granic": GenerateMetatags(
    "Wznowienia, wyznaczenia granic - oferta geodeta Olsztyn - Soft-Data",
    "Wznowienie / wyznaczenie granic ma na celu oznaczenie granic działki w terenie oraz sporządzenie odpowiedniej dokumentacji. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/wznowienia-granic`
  ),
  "geodezja/podzialy-nieruchomosci": GenerateMetatags(
    "Podziały nieruchomości - oferta geodeta Olsztyn - Soft-Data",
    "Podział nieruchomości to proces, który ma na celu podział jednej nieruchomości na dwie lub więcej odrębnych działek. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/podzialy-nieruchomosci`
  ),
  "geodezja/rozgraniczenie-nieruchomosci": GenerateMetatags(
    "Rozgraniczenie nieruchomości - oferta geodeta Olsztyn - Soft-Data",
    "Rozgraniczenie nieruchomości to proces, który ma na celu protokolarne ustalenie granic działek. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/rozgraniczenie-nieruchomosci`
  ),
  "geodezja/mapa-do-celow-prawnych": GenerateMetatags(
    "Mapa do celów prawnych - oferta geodeta Olsztyn - Soft-Data",
    "Mapa do celów prawnych to opracowanie, zawierające informacje o stanie prawnym nieruchomości, sporządzane w wielu procedurach administracyjno-prawnych. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/mapa-do-celow-prawnych`
  ),
  "geodezja/inne-opracowania": GenerateMetatags(
    "Inne opracowania - oferta geodeta Olsztyn - Soft-Data",
    "Soft-Data oferuje również inne opracowania geodezyjne, takie jak: pomiary fotogrametryczne, pomiary specjalistyczne, opracowania kartograficzne. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/inne-opracowania`
  ),
  "geodezja/obiektowanie-map": GenerateMetatags(
    "Obiektowanie map - oferta geodeta Olsztyn - Soft-Data",
    "Obiektowanie map to proces tworzenia cyfrowej mapy zasadniczej na podstawie pomiarów geodezyjnych lub innych źródeł danych. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/geodezja/obiektowanie-map`
  ),

  "gis/opracowania-rastrowe": GenerateMetatags(
    "Opracowania rastrowe - oferta GIS - Soft-Data",
    "Opracowania rastrowe to cyfrowe mapy, które zawierają informacje o obiektach geograficznych w postaci pikseli. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/gis/opracowania-rastrowe`
  ),
  "gis/opracowania-wektorowe": GenerateMetatags(
    "Opracowania wektorowe - oferta GIS - Soft-Data",
    "Opracowania wektorowe to cyfrowe mapy, które zawierają informacje o obiektach geograficznych w postaci wektorów. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/gis/opracowania-wektorowe`
  ),
  "gis/analizy-przestrzenne": GenerateMetatags(
    "Analizy przestrzenne - oferta GIS - Soft-Data",
    "Analizy przestrzenne to proces analizy danych, który pozwala na zrozumienie zależności przestrzennych pomiędzy obiektami otaczającego świata. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/gis/analizy-przestrzenne`
  ),
  "gis/przestrzenne-bazy-danych": GenerateMetatags(
    "Przestrzenne bazy danych - oferta GIS - Soft-Data",
    "Przestrzenne bazy danych to specjalistyczne bazy danych, które przechowują dane geograficzne i umożliwiają ich przetwarzanie. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/gis/przestrzenne-bazy-danych`
  ),
  "gis/geoportale": GenerateMetatags(
    "Geoportale - oferta GIS - Soft-Data",
    "Geoportale to specjalistyczne portale internetowe, które umożliwiają dostęp do danych geograficznych oraz ich wizualizację. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/gis/geoportale`
  ),

  "analiza-danych/przetwarzanie-danych": GenerateMetatags(
    "Przetwarzanie danych - oferta analiza danych - Soft-Data",
    "Przetwarzanie danych to proces obróbki danych, który ma na celu wydobycie informacji użytecznych / decyzyjnych z surowych danych. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/analiza-danych/przetwarzanie-danych`
  ),
  "analiza-danych/harmonizacja-danych": GenerateMetatags(
    "Harmonizacja danych - oferta analiza danych - Soft-Data",
    "Harmonizacja danych to proces standaryzacji danych, który ma na celu usunięcie niezgodności i błędów w danych. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/analiza-danych/harmonizacja-danych`
  ),
  "analiza-danych/wizualizacje-danych": GenerateMetatags(
    "Wizualizacje danych - oferta analiza danych - Soft-Data",
    "Wizuazlizacje danych to proces prezentacji danych w formie graficznej, statycznej lub interaktywnej. Jesteś zainteresowany? Skontaktuj się z nami!",
    `${BASE_URL}/oferta/analiza-danych/wizualizacje-danych`
  ),
};
