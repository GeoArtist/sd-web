'use client'
import {OfferCategories } from "@/constants/offerCategories"
import Link from "next/link";
import { OfferMenuProps } from "@/types/offerMenu";
import { useCurrentPath } from "@/contexts/CurrentPathContext";
import { SubCategoryMenu } from "@/components/SubCategoryMenu/SubCategoryMenu";

import styles from "./OfferMenu.module.scss";

export function OfferMenu(props:OfferMenuProps) {
    const currentPath = useCurrentPath()
    
    let classNames = ''
    switch (props.menuType) {
        case 'dropdown':
            classNames = props.display ? `${styles.dropDownMenu} ${styles.open}` : styles.dropDownMenu
            break;
        case 'offerMenu':
            classNames = styles.offerMenu
            break;
        default:
            classNames = styles.offerMenu
            break;
    }

    return (
      <ul className={classNames}>
        {OfferCategories.map((item, index) =>
          props.menuType === "dropdown" ? (
            <li key={index} className={styles.dropDownLink}>
              <Link
                key={`${index}__${index}`}
                href={`${item.path}/${item.mainCategoryPage}`}
                className={currentPath.includes(item.path) ? styles.active : ""}
              >
                {item.name.replace("-", " ")}
              </Link>
            </li>
          ) : (
            <SubCategoryMenu item={item} key={`${item.name}Submenu`} />
          )
        )}
      </ul>
    );

}

