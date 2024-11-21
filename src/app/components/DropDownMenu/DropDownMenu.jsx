import { geoOffer } from "@/constants/geoOffer"
import Link from "next/link";
import styles from "./DropDownMenu.module.scss";

export  function DropDownMenu({display}) {
  


    return <>
        <ul className={display ? `${styles.dropDownMenu} ${styles.open}` : styles.dropDownMenu}>
           

            {geoOffer.map((item, index) => 
                
                <li key={index} className={styles.dropDownLink} >
                    <Link key={`${index}__${index}`} href={"/oferta/"+item.path}>{item.navName}</Link> 
                </li>
                
            )}
      
        </ul>
    </>
}