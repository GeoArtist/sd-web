'use client'
import Link from "next/link";
import styles from './Navbar.module.scss'
import {DropDownMenu} from '@/components/DropDownMenu/DropDownMenu'
import Hamburger from "@/components/Hamburger/Hamburger";
import { usePathname } from 'next/navigation';
import { useToogle } from '@/hooks/useToogle';
import {useMenu, useMenuUpdate} from '@/contexts/MenuContext'


export function Navbar(){
    const currentPath = usePathname();
    const [value, toggleValue] = useToogle(false);
    const showMenu = useMenu();
    const showMenuUpdate = useMenuUpdate();

   
// 
    return <>
        <nav className={styles.navbar} >
            {showMenu && <div className={styles.sidebarBGC} onClick={showMenuUpdate}></div>}
            <ul className={styles.navbar__list}>
                <li><Link href="/" className={currentPath === '/' ? styles.active : "" } onClick={showMenuUpdate}>STRONA GŁÓWNA</Link></li>
                {/* Dropdown Offer Menu */}
                <li onMouseEnter={()=>toggleValue(true)} onMouseLeave={()=>toggleValue(false)} className={styles.dropDown} >
                    <Link href="/oferta" className={currentPath === '/oferta' ? styles.active : "" } onClick={showMenuUpdate}>OFERTA</Link>
                    {/* if sidebar dont render DropDownMenu */}
                    {!showMenu && <DropDownMenu display={value}/>} 
                </li>
                <li><Link href="/" className={currentPath === '/o-nas' ? styles.active : "" } onClick={showMenuUpdate}>O NAS</Link></li>
                <li><Link href="/" className={currentPath === '/certyfikaty' ? styles.active : "" } onClick={showMenuUpdate}>CERTYFIKATY</Link></li>
                <li><Link href="/kontakt" className={currentPath === '/kontakt' ? styles.active : "" } onClick={showMenuUpdate}>KONTAKT</Link></li>
            </ul>
            <Hamburger />
        </nav>
    </>
}