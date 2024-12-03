'use client'
import React, { Fragment } from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/icons/feather_white.svg'
import {regulations} from '@/constants/regulations'
import {socialLinks} from '@/constants/socialLinks'
import {useCurrentPath} from '@/contexts/CurrentPathContext'

export function Footer(){
    const year = new Date().getFullYear() 
    const currentPath = useCurrentPath()
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
                    <Link href="/kontakt"  className={`${styles.footer__link} ${ currentPath === "/kontakt" ? styles.active: ""}`}>Kontakt</Link>
                    {regulations.map((regulation, index )=> {
                       return <Fragment key={index}>
                        <p  className={styles.divider}>|</p>
                        <Link href={`/regulaminy/${regulation.path}`}  className={`${styles.footer__link} ${ currentPath === `/regulaminy/${regulation.path}` ? styles.active: ""}`}>{regulation.navName}</Link>
                       </Fragment>
                        
                    })}
                 
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
   

