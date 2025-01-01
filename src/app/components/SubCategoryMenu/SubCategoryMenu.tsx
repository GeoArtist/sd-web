'use client'
import { OfferCategories} from "@/constants/offerCategories"
import Link from "next/link";
import { useCurrentPath } from "@/app/contexts/CurrentPathContext";
import { OfferCategory } from "@/types/offerCategory";
import {useState, useEffect, use} from "react";
import styles from "./SubCategoryMenu.module.scss";

export function SubCategoryMenu({ item}:{item:OfferCategory}) {
    const currentPath = useCurrentPath()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (currentPath.includes(item.path)) {
            setOpen(true)}

        return ()=>{
            setOpen(false)
        }
    }, [currentPath])

    const toggleOpen = () => {
        setOpen(!open)
    }

    const category = item.name.toLowerCase()
    const offerServices = OfferCategories.filter(offer => offer.path.split("/")[2] === category)[0].subcategories

    return (
      <>
        <li
          key={item.name}
          className={`${styles.subCategoryMenu} ${open ? styles.open : ""}`}
          onClick={toggleOpen}
        >
          {item.name}
        </li>
        <ul className={`${styles.submenu} ${open ? styles.visible : ""}`}>
          {offerServices.map((item, index) => (
            <li key={index}>
              <Link
                key={`${index}__${index}`}
                href={`/oferta/${category}/` + item.path}
                className={currentPath.includes(item.path) ? styles.active : ""}
              >
                {item.navName}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
}