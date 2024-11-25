import styles from './FeatureCard.module.scss';
import {FeatureCard} from '@/types/featureCard'
import Image from 'next/image'


export default function Card({title, description, icon}:FeatureCard){

    return <>
    <div className={styles.card}>

        <Image src={icon} alt={title} className={styles.icon}/>

        <p className={styles.title}>
            {title}
        </p>
        <p className={styles.description}>
            {description}
        </p>
    </div></>
}