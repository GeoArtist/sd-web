import { featureCards } from '@/constants/featureCards';
import styles from './FeatureCards.module.scss';
import Card from '@/components/FeatureCard/FeatureCard';


export default function FeatureCards(){

    return <>
    <div className={styles.cards__wrapper}>
        {featureCards.map((card) => {
                    return <Card key={card.title} title={card.title} icon={card.icon} description={card.description}/>
                })}
    </div>
        </>
}