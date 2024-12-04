import styles from './AboutUsDescription.module.scss'
import aboutUs from '@/public/images/about-us.jpg'
import logoCut from '@/public/logo_cut.png'
import { getSelectedContentHTML } from '@/utils/markdownParser'
import Image from 'next/image'

export default async function AboutUsDescription(){

    const md_contentHTML  = await getSelectedContentHTML('aboutUs', 'aboutUs')

    return<>
    <div className={styles.aboutWrapper}>
    
        <Image src={logoCut} alt="logoCut" className={styles.logo} />
        <h1>GEODEZJA | GIS | GEOINFORMATYKA | PROGRAMOWANIE</h1>
        <Image src={aboutUs} alt="about-us" />
        <div dangerouslySetInnerHTML={{ __html: md_contentHTML }} className={styles.description}/>



    </div>
    </>
}