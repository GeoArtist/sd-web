import { geoOffer } from "@/constants/geoOffer"
import Link from "next/link";
import styles from "./OfferMenu.module.scss";
import { OfferMenuProps } from "@/types/offerMenu";



export  function OfferMenu(props:OfferMenuProps) {

    let classNames = ''
    if (props.menuType === 'dropdown') {
        classNames = props.display ? `${styles.dropDownMenu} ${styles.open}` : styles.dropDownMenu
    } else {classNames = styles.sideBar}


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