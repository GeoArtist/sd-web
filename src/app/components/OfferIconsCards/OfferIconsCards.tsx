import Image from 'next/image'
import {offerIcons} from '@/constants/offerIcons'
import wordmap from '@/public/images/world_map.jpg'
import styles from './OfferIconsCards.module.scss'

export default function OfferIconCards(){

    return<>
        <div className={styles.offerIcons}>
            <Image src={wordmap} alt='world-map' className={styles.background}/>
        {offerIcons.map((icon) => {
            return <div key={icon.title} className={styles.offerIcons__wrapper}>
                <Image src={icon.icon} alt={icon.title} />
                <h3>{icon.title}</h3>
            </div>
        })}
        </div>
    </>
}