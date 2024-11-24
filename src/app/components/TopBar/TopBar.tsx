import styles from './TopBar.module.scss'
import { Navbar } from "../Navbar/Navbar";
import Image from 'next/image'
import logo from '@/public/logo_cut.png'
export function TopBar(){
    return <>
       <div className={styles.topbar}>
        <div className={styles.topbar__wrapper}>

            <Image className={styles.topbar__logo} src={logo} alt="logo" />
     
            <Navbar/>
        </div>

       </div>
    </>
}