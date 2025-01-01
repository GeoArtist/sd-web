
import styles from './MainView.module.scss';
import FeatureCards from '@/components/FeatureCards/FeatureCards';
import Carousel from '@/app/components/Carousel/Carousel';
import OfferIconsCards from '@/app/components/OfferIconsCards/OfferIconsCards';
import MainServicesBar from '@/app/components/MainServicesBar/MainServicesBar'; 
import ContactBar from '@/app/components/ContactBar/ContactBar'; 

export function MainView() {
 
    return <>
    <Carousel/>
    <MainServicesBar/>
    <OfferIconsCards/>   
    <FeatureCards/>
    <ContactBar/>
   
    </>
}