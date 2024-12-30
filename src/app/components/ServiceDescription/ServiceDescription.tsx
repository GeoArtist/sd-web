import { MarkDownContent } from "@/types/markdown";
import { OfferSubCategory } from "@/types/offerCategory";
import Image from 'next/image'
import LegalBasisInfo from "@/components/LegalBasisInfo/LegalBasisInfo";

import styles from './ServiceDescription.module.scss'

export default function ServiceDescription({md_content, offer}:{md_content:MarkDownContent, offer:OfferSubCategory}) {
    
    const {title, description, time, legalBasis} = md_content
    const {imgUrl, imgAlt} = offer
    return<>
    <div className={styles.wrapper}>
            <h2>{title}</h2>
            <Image src={imgUrl} alt={imgAlt}/>
            <div className={styles.innerWrapper}>
                <h3 className={styles.name}>Opis usługi:</h3>
                {description.map((line, index) => {
                    if (line.startsWith('-')) {
                        return <p key={index} className={styles.listItem}>{line}</p>
                    }
                    return <p key={index}  className={styles.paragraph}>{line}</p>
                
                }
            )
                
                }
                {time && (
                    <>
                    <h3 className={styles.name}>Czas realizacji:</h3>
                        <p className={styles.paragraph}>{time}</p>
                    </>
                )}
            
                {legalBasis && <LegalBasisInfo legalBasis={legalBasis}/>}
            </div>
            

           
        </div>
    </>
}