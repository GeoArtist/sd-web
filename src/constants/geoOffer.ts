// export enum GeoOfferService {
//     mdcp = 'mapa-do-celow-projektowych',
//     inne = 'inne-opracowania-geodezyjne',
//     intentaryzacje = 'pomiary-inwentaryzacyjne',
//     podzialy = 'podzialy-nieruchomosci',
//     prawne = 'mapy-do-celow-pranwych',
//     rozgraniczenia = 'rozgraniczenia-nieruchomosci',
//     tyczenia = 'tyczenia-obiektow-budowlanych',
//     wznowienia = 'wznowienia-granic',
// }
interface Dictionary {
    [key: string]: string; 
}
export const geoOfferMap:Dictionary = {
 'mapa-do-celow-projektowych':'mdcp',
 'inne-opracowania-geodezyjne': 'inne',
 'pomiary-inwentaryzacyjne': 'intentaryzacje',
 'podzialy-nieruchomosci': 'podzialy',
 'mapy-do-celow-pranwych':'prawne',
 'rozgraniczenia-nieruchomosci': 'rozgraniczenia',
 'tyczenia-obiektow-budowlanych': 'tyczenia',
 'wznowienia-granic': 'wznowienia',
}