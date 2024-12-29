
import { MarkdownPaths, OfferCategory } from '@/types/offerCategory';

export const offerServices: MarkdownPaths[] = [
    {path: 'mapa-do-celow-projektowych', mdFileName: 'mdcp', navName: 'Mapa do celów projektowych', category: 'geodezja'},
    {path: 'tyczenia-obiektow-budowlanych', mdFileName: 'tyczenia', navName: 'Tyczenie obiektów budowlanych', category: 'geodezja'},
    {path: 'pomiary-inwentaryzacyjne', mdFileName: 'inwentaryzacje', navName: 'Pomiary inwentaryzacyjne', category: 'geodezja'},
    {path: 'wznowienia-granic', mdFileName: 'wznowienia', navName: 'Wznowienie / wyznaczenie granic', category: 'geodezja'},
    {path: 'podzialy-nieruchomosci', mdFileName: 'podzialy', navName: 'Podziały nieruchomości', category: 'geodezja'},
    {path: 'rozgraniczenie-nieruchomosci', mdFileName: 'rozgraniczenie', navName: 'Rozgraniczenie nieruchomości', category: 'geodezja'},
    {path: 'mapa-do-celow-prawnych', mdFileName: 'prawne', navName: 'Mapa do celów prawnych', category: 'geodezja'},
    {path: 'inne-opracowania', mdFileName: 'inne', navName: 'Inne opracowania', category: 'geodezja'},
    {path: 'gis', mdFileName: 'gis', navName: 'gis', category: 'gis'},
    {path: 'data-analysis', mdFileName: 'data-analysis', navName: 'data-analysis', category: 'data-analysis'},
]

export const  OfferCategories: OfferCategory[] = [
    {name: 'Geodezja',path:"/oferta/geodezja", subcategories: offerServices.filter(offer => offer.category === 'geodezja')},
    {name: 'GIS', path: '/oferta/gis', subcategories: offerServices.filter(offer => offer.category === 'gis')},
    {name: 'Data-Analysis',path:'/oferta/data-analysis', subcategories: offerServices.filter(offer => offer.category === 'data-analysis')},
]