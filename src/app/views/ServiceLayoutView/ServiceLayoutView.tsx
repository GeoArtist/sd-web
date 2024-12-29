import { OfferMenu } from '@/app/components/OfferMenu/OfferMenu'
import Image from 'next/image'
import logoCut from '@/public/logos/logo_cut.png'

import styles from './ServiceLayoutView.module.scss'

export default function ServiceLayoutView({children}:{children:React.ReactNode}) {
    return <>
    <div className={styles.grid}>
        <div className={styles.header}>
            <Image src={logoCut} alt="logoCut" className={styles.logo} />
            <h1>Oferta</h1>
        </div>
        <div>
            <OfferMenu  menuType={'offerMenu'}></OfferMenu>
        </div>
        {children}
    </div>
        
    </>
}