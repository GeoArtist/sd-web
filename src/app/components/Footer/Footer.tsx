import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/icons/feather_white.svg'

import {socialLinks} from '@/constants/socialLinks'

export function Footer(){
    const year = new Date().getFullYear() 
    return <> 
        <footer className={styles.footer}>
            <div className={styles.footer__wrapper}>
                <section className={styles.footer__card}>
                    <Link href="/">
                        <Image className={styles.footer__logo} src={logo} alt="logo" />
                    </Link>
                    <Link href="/">SOFT-DATA</Link>
                    <p> © {year}</p>
                </section>
                <section className={styles.footer__links}>
                    <Link href="/kontakt"  className={styles.footer__link}>Kontakt</Link>
                    <p className={styles.divier}>|</p>
                    <Link href="#" className={styles.link}>Polityka prywatności</Link>
                </section>
                <section className={styles.footer__socials}>
                    {socialLinks.map((socialLink) => (
                        <Link href={socialLink.url} target="_blank" rel="noopener noreferrer" key={socialLink.url}>
                            <Image src={socialLink.icon} alt={socialLink.alt} />
                        </Link>
                    ))}
                </section>
            </div>
        </footer>
    </>
}
   

