'use client'
import Link from "next/link";
import styles from './Navbar.module.scss'
import { usePathname } from 'next/navigation';

export function Navbar(){
    const currentPath = usePathname();

    return <>
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/" className={currentPath === '/' ? styles.active : "" }>STRONA GŁÓWNA</Link>
                </li>
                <li>
                    <Link href="/oferta" className={currentPath === '/oferta' ? styles.active : "" }>OFERTA</Link>
                </li>
                <li>
                    <Link href="/" className={currentPath === '/o-nas' ? styles.active : "" }>O NAS</Link>
                </li>
                <li>
                    <Link href="/" className={currentPath === '/certyfikaty' ? styles.active : "" }>CERTYFIKATY</Link>
                </li>
                <li>
                    <Link href="/kontakt" className={currentPath === '/kontakt' ? styles.active : "" }>KONTAKT</Link>
                </li>
            </ul>
        </nav>
    </>
}