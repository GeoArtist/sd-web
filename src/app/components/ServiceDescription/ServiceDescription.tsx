import { MarkDownContent } from "@/types/markdown";
import styles from './ServiceDescription.module.scss'
import Image from 'next/image'
import { ImgsLinks } from "@/types/imgsLinks";

import LegalBasisInfo from "@/components/LegalBasisInfo/LegalBasisInfo";


export default function ServiceDescription({md_content, img}:{md_content:MarkDownContent, img:ImgsLinks}){
    
    const {title, description, time, legalBasis} = md_content

    return<>
    <div className={styles.wrapper}>
            <h2>{title}</h2>
            <Image src={img.url} alt={img.alt}/>
            <div className={styles.innerWrapper}>
                <h3 className={styles.name}>Opis usługi:</h3>
                {description.map((line, index) => <p key={index}>{line}</p>)}
                {time && (
                    <>
                    <h3 className={styles.name}>Czas realizacji:</h3>
                        <p>{time}</p>
                    </>
                )}
            
                {legalBasis && <LegalBasisInfo legalBasis={legalBasis}/>}
            </div>
            

           
        </div>
    </>
}