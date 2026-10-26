"use client";
import { OfferCategories } from "@/constants/offerCategories";
import Link from "next/link";
import { useCurrentPath } from "@/contexts/CurrentPathContext";
import { OfferCategory } from "@/types/offerCategory";
import { useState } from "react";
import styles from "./SubCategoryMenu.module.scss";

export function SubCategoryMenu({ item }: { item: OfferCategory }) {
  const currentPath = useCurrentPath();
  // The menu of the current category is open; a click overrides that until the path changes
  const [toggled, setToggled] = useState<{
    path: string;
    open: boolean;
  } | null>(null);
  const open =
    toggled?.path === currentPath
      ? toggled.open
      : currentPath.includes(item.path);

  const toggleOpen = () => {
    setToggled({ path: currentPath, open: !open });
  };

  const category = item.name.toLowerCase();
  const offerServices = OfferCategories.filter(
    (offer) => offer.path.split("/")[2] === category,
  )[0].subcategories;

  return (
    <>
      <li
        key={item.name}
        className={`${styles.subCategoryMenu} ${open ? styles.open : ""}`}
        onClick={toggleOpen}
      >
        {item.name.replace("-", " ")}
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
