import AboutUsDescription from '@/app/components/AboutUsDescription/AboutUsDescription'
import styles from './AboutUsView.module.scss'

export default function AboutUsView(){
    return <>
        <div className={styles.aboutView}>
        <AboutUsDescription />
        </div>
    </>
}