import styles from './FeatureCard.module.scss';
import {FeatureCard} from '@/types/featureCard'
import Image from 'next/image'


export function Card({title, description, icon}:FeatureCard){

    return (
      <>
        <div className={styles.card}>
          <Image
            src={icon}
            alt={title}
            className={styles.card__icon}
            quality={75}
          />
          <p className={styles.card__title}>{title}</p>
          <p className={styles.card__description}>{description}</p>
        </div>
      </>
    );
}