import styles from './OfferHeader.module.scss'
import Image from 'next/image'
import logoCut from '@/public/logos/logo_cut.png'

export function OfferHeader(){
    return<><div className={styles.wrapper}>
            <Image src={logoCut} alt="logoCut" className={styles.logo} />
            <h1>Oferta</h1>

    </div>

    </>
}