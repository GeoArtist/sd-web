'use client'
import { useState, createContext, useContext } from "react";


const MenuContext = createContext(false)
const MenuUpdateContext= createContext(()=>{});

export function useMenu(){
  return useContext(MenuContext);
}

export function useMenuUpdate(){
  return useContext(MenuUpdateContext);
}
export const MenuProvider= ({ children }:{children:React.ReactNode}) => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleState = () => {
    setShowMenu(!showMenu);
  };
  return (
    <MenuContext.Provider value={showMenu}>
      <MenuUpdateContext.Provider value={toggleState}>
        {children}
      </MenuUpdateContext.Provider>
    </MenuContext.Provider>
  );
}
