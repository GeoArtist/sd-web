import AboutUsDescription from '@/app/components/AboutUsDescription/AboutUsDescription';
import styles from './TechnologyView.module.scss'
import InfitnieHorizontalScroll from '@/components/InfitnieHorizontalScroll/InfitnieHorizontalScroll'
import { imgsTechData, imgsTechDb, imgsTechGeo, imgsTechTech, imgsTechWeb} from '@/constants/InfiniteScrollImgs';
import logoCut from '@/public/logos/logo_cut.png'
import Image from 'next/image'


export default function TechnologyView(){
    return <>
        <div className={styles.technologyView}>
  
           <div className={styles.technologyWrapper}>
              <Image src={logoCut} alt="logoCut" className={styles.logo} />
                <h1>TECHNOLOGIE</h1>

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