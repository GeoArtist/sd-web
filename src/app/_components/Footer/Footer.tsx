import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'

export function Footer(){
  return <> 
    <footer className={styles.footer}>
        <div className={styles.footer__wrapper}>
            <section className={styles.card}>
                <div className={styles.logo}>LOGO</div>
                <p >© 2024 Soft-Data - geodeta Olsztyn</p>
            </section>
            <section className={styles.links}>
                <Link href="#"  className={styles.link}>Kontakt</Link>
                <p className={styles.divier}>|</p>
                <Link href="#" className={styles.link}>Polityka prywatności</Link>
            </section>
            <section className={styles.socials}>
                <p>Fb</p>
                <p>In</p>
                <p>Inst</p>
                <p>Yt</p>
            </section>
        </div>
    </footer>
    </>
}
   

