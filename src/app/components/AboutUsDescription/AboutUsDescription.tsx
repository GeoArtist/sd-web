import { getSelectedContentHTML } from '@/utils/markdownParser'
import CertificatesImage from '../CertificatesImages/CertificatesImage'

import styles from './AboutUsDescription.module.scss'

export default async function AboutUsDescription(){

    const descriptionPart1  = await getSelectedContentHTML('aboutUsP1', 'aboutUs')
    const descriptionPart2  = await getSelectedContentHTML('aboutUsP2', 'aboutUs')

    return<>
    <div className={styles.aboutWrapper}>
         <div  dangerouslySetInnerHTML={{ __html: descriptionPart1 }} className={styles.description}/>
        <CertificatesImage />
        <div dangerouslySetInnerHTML={{ __html: descriptionPart2 }} className={styles.description}/>
    </div>
    </>
}