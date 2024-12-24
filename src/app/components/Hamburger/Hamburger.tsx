
import styles from './Hamburger.module.scss'
import {useMenu, useMenuUpdate} from '@/contexts/MenuContext'

export default function Hamburger(){
    const showMenu = useMenu();
    const showMenuUpdate = useMenuUpdate();

    return  <>

        <div className={styles.hamburger} tabIndex={0}>
            <div className={`${styles.hamburger__icon} ${showMenu ? 'showMenuSidebar': ''}`} onClick={showMenuUpdate} tabIndex={1}>

            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 200 200"  >
                <g strokeWidth="8.5" strokeLinecap="round">
                    <path
                    d="M72 82.286h28.75"
                    fill="#0992e1"
                    fillRule="evenodd"
                    stroke="#0992e1"
                    />
                    <path
                    d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                    fill="none"
                    stroke="#0992e1"
                    />
                    <path
                    d="M72 125.143h28.75"
                    fill="#0992e1"
                    fillRule="evenodd"
                    stroke="#0992e1"

                    />
                    <path
                    d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                    fill="none"
                    stroke="#0992e1"
                    />
                    <path
                    d="M100.75 82.286h28.75"
                    fill="#0992e1"
                    fillRule="evenodd"
                    stroke="#0992e1"
                    />
                    <path
                    d="M100.75 125.143h28.75"
                    fill="#0992e1"
                    fillRule="evenodd"
                    stroke="#0992e1"
                    />
                </g>
            </svg>
             </div>
            
        </div>
         
    </>
}