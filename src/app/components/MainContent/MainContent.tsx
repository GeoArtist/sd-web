import FeatureCard from '../FeatureCard/FeatureCard';
import styles from './MainContent.module.scss'
import {featureCards} from '@/constants/featureCards'

type MainContentProps = {
    children: React.ReactNode; }

export function MainContent({children}: MainContentProps) {

    
    return <>
        <div className={styles.mainContent}>
            {children}
            {featureCards.map((card) => {
            return <FeatureCard key={card.title} title={card.title} icon={card.icon} description={card.description}/>
        })}
        </div>
    </>
}