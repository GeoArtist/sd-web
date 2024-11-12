import React from 'react'
import Image from 'next/image'
import telephone from '../../../../public/icons/telephone.svg'
import email from '../../../../public/icons/email.svg'
import styles from './CompanyInfo.module.scss'

export const CompanyInfo= () => {
    return <>
    <article className={styles.companyInfo}>
        <section className={styles.contact}>
            <h3>Zadzwoń do nas lub wyślij e-mail</h3>
            <span className={styles.contactWay}>
                <Image src={telephone} alt="phone"/>
                <p>+48 535 154 251</p>
            </span>
            <span className={styles.contactWay}>
                <Image src={email} alt="email"/>
                <p>kontakt@soft-data.pl</p>
            </span>
        </section>
        <section className={styles.address}>
            <h4>SOFT-DATA Marek Szczepkowski</h4>
            <p>ul. Marii Dąbrowskiej 13/52</p>
            <p>10-685 Olsztyn</p>
            <p>NIP: 739-387-00-60</p>
            <p>REGON: 281628752</p>
        </section>


    </article>
    </>
  
}
