import {FeatureCards} from '@/components/FeatureCards/FeatureCards';
import {Carousel} from '@/components/Carousel/Carousel';
import {OfferIconsCards} from '@/components/OfferIconsCards/OfferIconsCards';
import {MainServicesBar} from '@/components/MainServicesBar/MainServicesBar'; 
import {ContactBar} from '@/components/ContactBar/ContactBar'; 

export function MainView() {
 
    return <>
    <Carousel/>
    <MainServicesBar/>
    <OfferIconsCards/>   
    <FeatureCards/>
    <ContactBar/>
   
    </>
}