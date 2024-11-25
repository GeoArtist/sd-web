import styles from './FeatureCard.module.scss';
import {FeatureCard} from '@/types/featureCard'
import Image from 'next/image'
export default function FeatureCard({title, description, icon}:FeatureCard){

    return <>
    <div className={styles.card}>
        <div className={styles.icon}>
            <Image src={icon} alt={title}/>
        </div>
        <div className={styles.title}>
            {title}
        </div>
        <div className={styles.description}>
            {description}
        </div>
    </div></>
}