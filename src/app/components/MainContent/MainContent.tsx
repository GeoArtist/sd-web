
import FeatureCards from '@/components/FeatureCards/FeatureCards';
import styles from './MainContent.module.scss'

type MainContentProps = {
    children: React.ReactNode; }

export function MainContent({children}: MainContentProps) {

    
    return <>
        <div className={styles.mainContent}>
            {children}
            <FeatureCards/>
        </div>
    </>
}