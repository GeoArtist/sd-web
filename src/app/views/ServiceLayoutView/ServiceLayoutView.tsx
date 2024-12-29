import styles from './ServiceLayoutView.module.scss'
import { OfferMenu } from '@/app/components/OfferMenu/OfferMenu'


export default function ServiceLayoutView({children}:{children:React.ReactNode}) {
    return <>
    <div className={styles.grid}>
        <div>
            {/* <h1>Oferta</h1> */}
            <OfferMenu  menuType={'offerMenu'}></OfferMenu>
        </div>
        {children}
    </div>
        
    </>
}