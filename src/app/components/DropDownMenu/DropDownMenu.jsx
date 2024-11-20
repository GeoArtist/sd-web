'use client'
import { geoOffer } from "@/constants/geoOffer"
import Link from "next/link";
import styles from "./DropDownMenu.module.scss";

export  function DropDownMenu(){

    return <>
        <ul key={'dropDownMenu'} className={styles.dropDownMenu}>

            {geoOffer.map((item, index) => 
                <>
                <li key={index} className={styles.dropDownLink} >
                    <Link key={index} href={"/oferta/"+item.path}>{item.navName}</Link> 
                </li>
                </>
            )}
      
        </ul>
    </>
}