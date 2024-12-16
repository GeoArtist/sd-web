import styles from './OfferIconsCards.module.scss'
import Image from 'next/image'
import {offerIcons} from '@/constants/offerIcons'


export default function OfferIconCards(){

    return<>
        <div className={styles.offerIcons}>
        {offerIcons.map((icon) => {
            return <div key={icon.title} className={styles.offerIcons__wrapper}>
                <Image src={icon.icon} alt={icon.title} />
                <h3>{icon.title}</h3>
            </div>
        })}
        </div>
    </>
}