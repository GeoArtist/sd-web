import { OfferMenu } from '@/app/components/OfferMenu/OfferMenu'
import {SubPageHeader} from '@/app/components/SubPageHeader/SubPageHeader'

import styles from './ServiceLayoutView.module.scss'

export default function ServiceLayoutView({children}:{children:React.ReactNode}) {
    return <>
    <div className={styles.grid}>
        <div className={styles.header}>
        <SubPageHeader title={"OFERTA"}/>
        </div>
            {children}
        <div className={styles.menu}>
            <OfferMenu  menuType={'offerMenu'}></OfferMenu>
        </div>
        
    </div>
        
    </>
}