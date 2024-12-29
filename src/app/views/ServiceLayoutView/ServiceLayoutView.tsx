import { OfferMenu } from '@/app/components/OfferMenu/OfferMenu'
import {OfferHeader} from '@/app/components/OfferHeader/OfferHeader'

import styles from './ServiceLayoutView.module.scss'

export default function ServiceLayoutView({children}:{children:React.ReactNode}) {
    return <>
    <div className={styles.grid}>
        <div className={styles.header}>
        <OfferHeader/>
        </div>
            {children}
        <div className={styles.menu}>
            <OfferMenu  menuType={'offerMenu'}></OfferMenu>
        </div>
        
    </div>
        
    </>
}