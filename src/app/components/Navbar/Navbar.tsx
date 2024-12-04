'use client'
import Link from "next/link";
import styles from './Navbar.module.scss'
import {OfferMenu} from '@/app/components/OfferMenu/OfferMenu'
import Hamburger from "@/components/Hamburger/Hamburger";
import {useCurrentPath} from '@/contexts/CurrentPathContext'
import { useToogle } from '@/hooks/useToogle';
import {useMenu, useMenuUpdate} from '@/contexts/MenuContext'


export function Navbar(){
    const currentPath = useCurrentPath();
    const [value, toggleValue] = useToogle(false);
    const showMenu = useMenu();
    const showMenuUpdate = useMenuUpdate();

   
// 
    return <>
        <nav className={styles.navbar} >
            {showMenu && <div className={styles.sidebarBGC} onClick={showMenuUpdate}></div>}
            <ul className={styles.navbar__list}>
                <li><Link href="/" className={currentPath === '/' ? styles.active : "" }>STRONA GŁÓWNA</Link></li>
                {/* Dropdown Offer Menu */}
                <li onMouseEnter={()=>toggleValue(true)} onMouseLeave={()=>toggleValue(false)} className={styles.dropDown} >
                    <Link href="/oferta" className={currentPath.includes('/oferta') ? styles.active : "" } >OFERTA</Link>
                    {/* if sidebar dont render OfferMenu */}
                    {!showMenu && <OfferMenu display={value} menuType={'dropdown'}/>} 
                    {/* {display ? `${styles.dropDownMenu} ${styles.open}` : styles.dropDownMenu */}
                </li>
                <li><Link href="/o-nas" className={currentPath === '/o-nas' ? styles.active : "" }>O NAS</Link></li>
                <li><Link href="/certyfikaty" className={currentPath === '/certyfikaty' ? styles.active : "" }>CERTYFIKATY</Link></li>
                <li><Link href="/kontakt" className={currentPath === '/kontakt' ? styles.active : "" }>KONTAKT</Link></li>
            </ul>
            <Hamburger />
        </nav>
    </>
}