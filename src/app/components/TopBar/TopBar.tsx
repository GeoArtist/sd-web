import styles from './TopBar.module.scss'
import { Navbar } from "../Navbar/Navbar";
import Image from 'next/image'
import logo from '@/public/logo_cut.png'
import { MenuProvider } from '@/contexts/MenuContext';
export function TopBar(){
    return <>
       <div className={styles.topbar}>
        <div className={styles.topbar__wrapper}>

            <Image className={styles.topbar__logo} src={logo} alt="logo" />
     
            <MenuProvider>
                <Navbar/>
            </MenuProvider>
        </div>

       </div>
    </>
}