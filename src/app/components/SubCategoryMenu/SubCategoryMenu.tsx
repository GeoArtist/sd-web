'use client'
import { geoOffer} from "@/constants/offerCategories"
import Link from "next/link";
import { useCurrentPath } from "@/app/contexts/CurrentPathContext";
import { OfferCategory } from "@/types/offerCategory";

import styles from "./SubCategoryMenu.module.scss";

export function SubCategoryMenu({display,onClickHandler, item}:{display:boolean, onClickHandler:()=>void, item:OfferCategory}) {
    const currentPath = useCurrentPath()
    
    return <>
        <li key={item.name} className={`${styles.subCategoryMenu} ${display ? styles.open : ""}`} onClick={onClickHandler} >
            {item.name}
        </li>
       <ul className={`${styles.submenu} ${display ? styles.visible : ""}`}>
            {geoOffer.map((item, index) => 
                <li key={index}  >
                    <Link 
                        key={`${index}__${index}`} 
                        href={'/oferta/geodezja/' + item.path}
                        className={currentPath.includes(item.path) ? styles.active : ''}
                        >{item.navName}
                    </Link> 
                </li>
            )}
        </ul>
    </>
}