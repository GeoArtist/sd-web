import clock from '@/public/icons/featureCards/clock.svg'
import hand from '@/public/icons/featureCards/hand.svg'
import experience from '@/public/icons/featureCards/experience.svg'
import agile from '@/public/icons/featureCards/agile.svg'
import software from '@/public/icons/featureCards/software.svg'
import { FeatureCard } from '@/types/featureCard';

export const featureCards:FeatureCard[] = [
    {title: 'Szybka realizacja', icon: clock, description:'Oferujemy krótkie oraz rzeczywiste terminy realizacji' },
    {title: 'Wieloletnie doświadczenie', icon: experience, description:'W pracy wykorzystujemy zdobyte przez lata doświadczenie branżowe' },
    {title: 'Potwierdzona rzetelność', icon: hand, description:'Zlecenia zawsze realizujemy zgodnie z przepisami oraz standardami' },
    {title: 'Elastyczność', icon: agile, description:'Nasze produkty i usługi dostosowujemy do indywidualnych potrzeb oraz wymagań klienta' },
    {title: 'Nowoczesne technologie', icon: software, description:'W pracy wykorzystujemy zaawansowany sprzęt oraz najnowsze, najwydajniejsze rozwiązania' },

]