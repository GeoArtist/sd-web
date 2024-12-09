import styles from './AboutUsDescription.module.scss'
import aboutUs from '@/public/images/about-us.jpg'
import logoCut from '@/public/logos/logo_cut.png'
import { getSelectedContentHTML } from '@/utils/markdownParser'
import Image from 'next/image'
import CertificatesImage from '../CertificatesImages/CertificatesImage'
import InfitnieHorizontalScroll from '../InfitnieHorizontalScroll/InfitnieHorizontalScroll'
import { imgsTechData, imgsTechDb, imgsTechGeo, imgsTechTech, imgsTechWeb} from '@/constants/InfiniteScrollImgs';
export default async function AboutUsDescription(){

    const descriptionPart1  = await getSelectedContentHTML('aboutUsP1', 'aboutUs')
    const descriptionPart2  = await getSelectedContentHTML('aboutUsP2', 'aboutUs')

    return<>
    <div className={styles.aboutWrapper}>
    
        <Image src={logoCut} alt="logoCut" className={styles.logo} />
        <h1>GEODEZJA | GIS | GEOINFORMATYKA | PROGRAMOWANIE</h1>
        <Image src={aboutUs} alt="about-us" />  
         <div  dangerouslySetInnerHTML={{ __html: descriptionPart1 }} className={styles.description}/>
        <CertificatesImage />
        
        <div dangerouslySetInnerHTML={{ __html: descriptionPart2 }} className={styles.description}/>

        <InfitnieHorizontalScroll imgs={imgsTechData}/>
        <InfitnieHorizontalScroll imgs={imgsTechDb}/>
        <InfitnieHorizontalScroll imgs={imgsTechGeo}/>
        <InfitnieHorizontalScroll imgs={imgsTechTech}/>
        <InfitnieHorizontalScroll imgs={imgsTechWeb}/> 

    </div>
    </>
}