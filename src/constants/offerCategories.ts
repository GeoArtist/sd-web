
import { MarkdownPaths, OfferCategory } from '@/types/offerCategory';

export const geoOffer: MarkdownPaths[] = [
    {path: 'mapa-do-celow-projektowych', mdFileName: 'mdcp', navName: 'Mapa do celów projektowych'},
    {path: 'tyczenia-obiektow-budowlanych', mdFileName: 'tyczenia', navName: 'Tyczenie obiektów budowlanych'},
    {path: 'pomiary-inwentaryzacyjne', mdFileName: 'inwentaryzacje', navName: 'Pomiary inwentaryzacyjne'},
    {path: 'wznowienia-granic', mdFileName: 'wznowienia', navName: 'Wznowienie / wyznaczenie granic'},
    {path: 'podzialy-nieruchomosci', mdFileName: 'podzialy', navName: 'Podziały nieruchomości'},
    {path: 'rozgraniczenie-nieruchomosci', mdFileName: 'rozgraniczenie', navName: 'Rozgraniczenie nieruchomości'},
    {path: 'mapa-do-celow-prawnych', mdFileName: 'prawne', navName: 'Mapa do celów prawnych'},
    {path: 'inne-opracowania', mdFileName: 'inne', navName: 'Inne opracowania'},
]

export const  OfferCategories: OfferCategory[] = [
    {name: 'Geodezja',path:"/oferta/geodezja", subcategories: geoOffer},
    {name: 'GIS', path: '/oferta/gis'},
    {name: 'Data Analysis',path:'/oferta/data-analysis'},
]