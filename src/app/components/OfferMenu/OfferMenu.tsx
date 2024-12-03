'use client'
import { geoOffer } from "@/constants/geoOffer"
import Link from "next/link";
import styles from "./OfferMenu.module.scss";
import { OfferMenuProps } from "@/types/offerMenu";
import { useCurrentPath } from "@/app/contexts/CurrentPathContext";


export  function OfferMenu(props:OfferMenuProps) {
    const currentPath = useCurrentPath()

    let classNames = ''
    switch (props.menuType) {
        case 'dropdown':
            classNames = props.display ? `${styles.dropDownMenu} ${styles.open}` : styles.dropDownMenu
            break;
        case 'sidebar':
            classNames = styles.sideBar
            break;
        default:
            classNames = styles.sideBar
            break;
    }
    

    return <>
        <ul className={classNames}>
            {geoOffer.map((item, index) => 
                <li key={index} className={styles.dropDownLink} >
                    <Link 
                        key={`${index}__${index}`} 
                        href={"/oferta/"+item.path}
                        className={currentPath.includes(item.path) ? styles.active : ''}
                        >{item.navName}
                    </Link> 
                </li>
            )}
      
        </ul>
    </>
}