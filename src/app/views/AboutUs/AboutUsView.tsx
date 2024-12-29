import AboutUsDescription from '@/app/components/AboutUsDescription/AboutUsDescription'
import aboutUs from '@/public/images/about-us.jpg'
import Image from 'next/image'
import { SubPageHeader } from '@/app/components/SubPageHeader/SubPageHeader'

import styles from './AboutUsView.module.scss'

export default function AboutUsView(){
    return <>
        <div className={styles.aboutView__header}>
            <SubPageHeader title={"GEODEZJA | GIS | GEOINFORMATYKA | PROGRAMOWANIE"} />
        </div>
        <div className={styles.aboutView__content}>
        <Image src={aboutUs} alt="about-us" />  
        <AboutUsDescription />
        
        </div>
    </>
}