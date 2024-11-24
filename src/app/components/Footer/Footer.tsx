import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/icons/feather_white.svg'
import fb from '@/public/icons/facebook.svg'
import li from '@/public/icons/linkedin.svg'


export function Footer(){
  return <> 
    <footer className={styles.footer}>
        <div className={styles.footer__wrapper}>
            <section className={styles.footer__card}>
                <Image className={styles.footer__logo} src={logo} alt="logo" />
                <p >© 2024 Soft-Data - geodeta Olsztyn</p>
            </section>
            <section className={styles.footer__links}>
                <Link href="/kontakt"  className={styles.footer__link}>Kontakt</Link>
                <p className={styles.divier}>|</p>
                <Link href="#" className={styles.link}>Polityka prywatności</Link>
            </section>
            <section className={styles.footer__socials}>
                <Link href="https://www.facebook.com/profile.php?id=61568871523118" target="_blank" rel="noopener noreferrer" >
                    <Image  src={fb} alt="facebook link" />
                </Link>
               
                <Link href=" https://www.linkedin.com/in/marekszczepkowski/" target="_blank" rel="noopener noreferrer" >
                    <Image  src={li} alt="linkedin link" />
                </Link>


            </section>
        </div>
    </footer>
    </>
}
   

