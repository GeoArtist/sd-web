import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import telephone from '@/public/icons/telephone.svg'
import email from '@/public/icons/email.svg'
import styles from './CompanyInfo.module.scss'

export function CompanyInfo() {
    return <>
    <article className={styles.companyInfo}>
        <section className={styles.contact}>
            <h3>Zadzwoń do nas lub wyślij e-mail</h3>
            <span className={styles.contactWay}>
                <Image src={telephone} alt="phone"/>
                <Link href="tel:+48535154251">+48 535 154 251</Link>
            </span>
            <span className={styles.contactWay}>
                <Image src={email} alt="email"/>
                <Link href="mailto:kontakt@soft-data.pl">kontakt@soft-data.pl</Link>
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
