import { geoOffer } from "@/constants/geoOffer"
import Link from "next/link";
import styles from "./OfferMenu.module.scss";
import { OfferMenuProps } from "@/types/offerMenu";



export  function OfferMenu(props:OfferMenuProps) {

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
                    <Link key={`${index}__${index}`} href={"/oferta/"+item.path}>{item.navName}</Link> 
                </li>
            )}
      
        </ul>
    </>
}