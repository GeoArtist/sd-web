
import styles from './MainServicesBar.module.scss';
import bgcBlue from '@/public/images/bgc-blue.jpg'
import Image from 'next/image';

export function MainServicesBar(){

return <>
    <div className={styles.MainServicesBar}>
        <Image src={bgcBlue} alt='rtk-background'
                   className={styles.MainServicesBar__img}
                   

                    />
        <div className={styles.MainServicesBar__wrapper}>
            <h3>Pozyskiwanie</h3>
            <h3>Przetwarzanie</h3>
            <h3>Analizowanie</h3>
            <h3>Wizualizacja</h3>
        </div>
    </div>
</>
}