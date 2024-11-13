import Link from "next/link";
import styles from './Navbar.module.scss'

export function Navbar(){
    return <>
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">STRONA GŁÓWNA</Link>
                </li>
                <li>
                    <Link href="/">OFERTA</Link>
                </li>
                <li>
                    <Link href="/">O NAS</Link>
                </li>
                <li>
                    <Link href="/">CERTYFIKATY</Link>
                </li>
                <li>
                    <Link href="/kontakt">KONTAKT</Link>
                </li>
            </ul>
        </nav>
    </>
}