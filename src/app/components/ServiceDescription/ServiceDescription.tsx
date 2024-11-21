import { MarkDownContent } from "@/types/markdown";
import styles from './ServiceDescription.module.scss'

export default function ServiceDescription({md_content}:{md_content:MarkDownContent}){
    
    const {title, description, time, legalBasis} = md_content

    return<>
    <div className={styles.wrapper}>
        <h2>{title}</h2>
            <h3 className={styles.name}>Opis usługi:</h3>
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