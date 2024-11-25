// import { GeoOffer } from '@/types/geoOffer';
import clock from '@/public/icons/clock.svg'
import hand from '@/public/icons/hand.svg'
import experience from '@/public/icons/experience.svg'
import agile from '@/public/icons/agile.svg'
import { FeatureCard } from '@/types/featureCard';

export const featureCards:FeatureCard[] = [
    {title: 'Szybka realizacja', icon: clock, description:'Oferujemy krótkie terminy realizacji' },
    {title: 'Wieloletnie doświadczenie', icon: experience, description:'W pracy wykorzystujemy zdobyte przez lata doświadczenie' },
    {title: 'Potwierdzona rzetelność', icon: hand, description:'Wszystkie prace wykonujemy zgodnie z obowiązującymi przepisami i standardami' },
    {title: 'Elastyczność', icon: agile, description:'Dostosowujemy się do potrzeb oraz wymagań' },

]