import styles from './LegalBasisInfo.module.scss';
import Link from "next/link";
import {legalBasisLinks} from "@/constants/legalBasisLinks";



export default function LegalBasisInfo({legalBasis}:{legalBasis: string[]}) {
    return <>
        <div className={styles.legalBasisWrapper}>
            <h3 className={styles.name}>Podstawa prawna:</h3>
            <ul>
                {legalBasis.map((basis, index) => 
                <li key={index}>
                    {<Link href={legalBasisLinks.filter((legalBasis)=>legalBasis.name == basis)[0].link} target="_blank" rel="noopener noreferrer" >{basis}</Link>}
                
                </li>)}
            </ul>

        </div>
    </>
}