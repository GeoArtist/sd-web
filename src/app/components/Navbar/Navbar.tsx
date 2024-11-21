'use client'
import Link from "next/link";
import styles from './Navbar.module.scss'
import { usePathname } from 'next/navigation';
import { useToogle } from '@/hooks/useToogle';
import {DropDownMenu} from '@/components/DropDownMenu/DropDownMenu'

export function Navbar(){
    const currentPath = usePathname();
    const [value, toggleValue] = useToogle(false);
    
    return <>
        <nav className={styles.navbar}>
            <ul >
                <li><Link href="/" className={currentPath === '/' ? styles.active : "" }>STRONA GŁÓWNA</Link></li>
                {/* Dropdown Offer Menu */}
                <li onMouseEnter={()=>toggleValue(true)} onMouseLeave={()=>toggleValue(false)} className={styles.dropDown} >
                    <Link href="/oferta" className={currentPath === '/oferta' ? styles.active : "" }>OFERTA</Link>
                    <DropDownMenu display={value}/>
                </li>
                <li><Link href="/" className={currentPath === '/o-nas' ? styles.active : "" }>O NAS</Link></li>
                <li><Link href="/" className={currentPath === '/certyfikaty' ? styles.active : "" }>CERTYFIKATY</Link></li>
                <li><Link href="/kontakt" className={currentPath === '/kontakt' ? styles.active : "" }>KONTAKT</Link></li>
            </ul>
        </nav>
    </>
}