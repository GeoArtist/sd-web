import styles from './TopBar.module.scss'
import { Navbar } from "../Navbar/Navbar";

export function TopBar(){
    return <>
       <div className={styles.topbar}>
        <div className={styles.topbar__wrapper}>
            <div className={styles.topbar__logo}>
                LOGO
            </div>
            <Navbar/>
        </div>

       </div>
    </>
}