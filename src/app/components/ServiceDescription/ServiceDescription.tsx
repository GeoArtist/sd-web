import { MarkDownContent } from "@/types/markdown";
import styles from './ServiceDescription.module.scss'
import Image from 'next/image'
import { ImgsLinks } from "@/types/imgsLinks";

export default function ServiceDescription({md_content, img}:{md_content:MarkDownContent, img:ImgsLinks}){
    
    const {title, description, time, legalBasis} = md_content

    return<>
    <div className={styles.wrapper}>
        <h2>{title}</h2>
            <h3 className={styles.name}>Opis usługi:</h3>
            <Image src={img.url} alt={img.alt}/>
            {description.map((line, index) => <p key={index}>{line}</p>)}
            {time && (
                <>
                   <h3 className={styles.name}>Czas realizacji:</h3>
                    <p>{time}</p>
                </>
            )}
         
            {legalBasis && (
                <>
                    <h3 className={styles.name}>Podstawa prawna:</h3>
                    <ul>
                        {legalBasis.map((basis, index) => <li key={index}>{basis}</li>)}
                    </ul>
                </>
            )}
            

           
        </div>
    </>
}