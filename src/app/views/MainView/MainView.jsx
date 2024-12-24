
import styles from './MainView.module.scss';
import FeatureCards from '@/components/FeatureCards/FeatureCards';
import Carousel from '@/app/components/Carousel/Carousel';
import OfferIconsCards from '@/app/components/OfferIconsCards/OfferIconsCards';
import MainServicesBar from '@/app/components/MainServicesBar/MainServicesBar'; 

export function MainView() {
 
    return <>
    <Carousel/>
    <MainServicesBar/>
    <OfferIconsCards/>   
    <FeatureCards/>
   
    </>
}