import AboutUsDescription from '@/app/components/AboutUsDescription/AboutUsDescription'
import aboutUs from '@/public/images/about-us.jpg'
import logoCut from '@/public/logos/logo_cut.png'
import Image from 'next/image'

import styles from './AboutUsView.module.scss'

export default function AboutUsView(){
    return <>
        <div className={styles.aboutView}>
        <Image src={logoCut} alt="logoCut" className={styles.logo} />
        <h1>GEODEZJA | GIS | GEOINFORMATYKA | PROGRAMOWANIE</h1>
        <Image src={aboutUs} alt="about-us" />  
        <AboutUsDescription />
        
        </div>
    </>
}