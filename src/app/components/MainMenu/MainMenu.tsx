'use client'
import Link from "next/link";
import {OfferMenu} from '@/app/components/OfferMenu/OfferMenu'
import {useCurrentPath} from '@/contexts/CurrentPathContext'
import { useToogle } from '@/hooks/useToogle';
import {useMenu, useMenuUpdate} from '@/contexts/MenuContext'
import { MainMenuProps } from "@/types/mainMenu";

import styles from './MainMenu.module.scss'

export  function MainMenu({mode, showSidebar}:MainMenuProps) {
    const currentPath = useCurrentPath();
    const [openDropDown, toggleDropDown] = useToogle(false);
    const showSideBarMenu = useMenu();
    const showMenuUpdate = useMenuUpdate();

    // Mobile toggle function
    const mobileFn = mode==='mobile' ? showMenuUpdate : undefined

    return (
      <>
        <nav
          className={
            mode == "desktop"
              ? styles.desktopMenu
              : `${styles.mobileMenu} ${showSidebar ? "displayMenu" : ""}`
          }
        >
          {showSideBarMenu && (
            <div className={styles.sidebarBGC} onClick={showMenuUpdate}></div>
          )}
          <ul>
            <li>
              <Link
                onClick={mobileFn}
                href="/"
                className={currentPath === "/" ? styles.active : ""}
                prefetch={false}
              >
                STRONA GŁÓWNA
              </Link>
            </li>
            <li
              onClick={mobileFn}
              onMouseEnter={() => toggleDropDown(true)}
              onMouseLeave={() => toggleDropDown(false)}
              className={styles.dropDown}
            >
              <Link
                href="/oferta"
                className={currentPath.includes("/oferta") ? styles.active : ""}
                prefetch={false}
              >
                OFERTA
              </Link>
              {/* if sidebar dont render OfferMenu */}
              {mode == "desktop" && openDropDown && (
                <OfferMenu display={openDropDown} menuType={"dropdown"} />
              )}
            </li>
            <li>
              <Link
                onClick={mobileFn}
                href="/o-nas"
                className={currentPath === "/o-nas" ? styles.active : ""}
                prefetch={false}
              >
                O NAS
              </Link>
            </li>
            <li>
              <Link
                onClick={mobileFn}
                href="/technologie"
                className={currentPath === "/technologie" ? styles.active : ""}
                prefetch={false}
              >
                TECHNOLOGIE
              </Link>
            </li>
            <li>
              <Link
                onClick={mobileFn}
                href="/kontakt"
                className={currentPath === "/kontakt" ? styles.active : ""}
                prefetch={false}
              >
                KONTAKT
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
}