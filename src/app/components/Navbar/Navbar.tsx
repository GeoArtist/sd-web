'use client'
import Hamburger from "@/components/Hamburger/Hamburger";
import { useState, useEffect } from "react";
import { WindowSizeType } from "@/types/window";
import { MainMenu } from "@/components/MainMenu/MainMenu";
import { useMenu, useMenuUpdate } from "@/app/contexts/MenuContext";

export function Navbar(){
    const showSidebarMenu = useMenu();
    const showMenuUpdate = useMenuUpdate();
    const [windowSize, setWindowSize] = useState<WindowSizeType>({width:undefined, height:undefined});
   
    // MEDIA QUERY
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    },[]);

    // Close sidebar menu if window size is bigger than 1000px
    useEffect(() => {
      if (windowSize.width && windowSize.width > 1000 && showSidebarMenu) {
        showMenuUpdate();
      }
    }, [windowSize.width, showSidebarMenu, showMenuUpdate]);


    return <>
        { windowSize.width ?  windowSize.width < 1000 ?
        <Hamburger />
        :

        <MainMenu mode="desktop" /> : null
         }
         {<MainMenu mode="mobile" showSidebar={showSidebarMenu} />  }
    </>
}