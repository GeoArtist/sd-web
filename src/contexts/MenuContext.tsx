'use client'
import { useState, createContext, useContext } from "react";

type MenuContextType = {
  showMenu: boolean;
  toggleMenu: () => void;
};

const MenuContext = createContext<MenuContextType>({
  showMenu: false,
  toggleMenu: () => {},
});

export function useMenu() {
  return useContext(MenuContext).showMenu;
}

export function useMenuUpdate() {
  return useContext(MenuContext).toggleMenu;
}

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return <MenuContext value={{ showMenu, toggleMenu }}>{children}</MenuContext>;
};
