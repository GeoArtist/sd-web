import styles from './TopBar.module.scss'
import { Navbar } from "../Navbar/Navbar";
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo_cut.png'
import { MenuProvider } from '@/contexts/MenuContext';

export function TopBar(){
    return <>
       <div className={styles.topbar}>
        <div className={styles.topbar__wrapper}>
            <Link href="/">
                <Image className={styles.topbar__logo} src={logo} alt="logo" />
            </Link>
            <MenuProvider>
                <Navbar/>
            </MenuProvider>
        </div>

       </div>
    </>
}