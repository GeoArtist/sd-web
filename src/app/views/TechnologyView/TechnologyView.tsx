import AboutUsDescription from '@/app/components/AboutUsDescription/AboutUsDescription';
import InfitnieHorizontalScroll from '@/components/InfitnieHorizontalScroll/InfitnieHorizontalScroll'
import { imgsTechData, imgsTechDb, imgsTechGeo, imgsTechTech, imgsTechWeb} from '@/constants/InfiniteScrollImgs';
import logoCut from '@/public/logos/logo_cut.png'
import Image from 'next/image'

import styles from './TechnologyView.module.scss'
import { SubPageHeader } from '@/app/components/SubPageHeader/SubPageHeader';

export default function TechnologyView(){
    return <>
        <div className={styles.technologyView}>
            <div className={styles.technology__header}>
                <SubPageHeader title={"TECHNOLOGIE"}/>
            </div>

            <div className={styles.technology__content}>
                
                <h2>Geodezja</h2>
                <InfitnieHorizontalScroll imgs={imgsTechGeo}/>
                <hr/>
                
                <h2>Bazy Danych</h2>
                <InfitnieHorizontalScroll imgs={imgsTechDb}/>
                <hr/>
                
                <h2>Analiza i Przetwarzanie Danych</h2>
                <InfitnieHorizontalScroll imgs={imgsTechData}/>
                <hr/>
                
                <h2>Wizualizacje</h2>
                <InfitnieHorizontalScroll imgs={imgsTechWeb}/> 
                <hr/>
                
                <h2>Narzędzia</h2>
                <InfitnieHorizontalScroll imgs={imgsTechTech}/>
                <hr/>
              
            </div>
        </div>
    </>
}