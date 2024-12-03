'use client'
import {createContext, useContext } from "react";
import { usePathname } from 'next/navigation'
const CurrentPath = createContext("/")


export function useCurrentPath(){
  return useContext(CurrentPath);
}

export const CurrentPathProvider = ({ children }:{children:React.ReactNode}) => {
  const currentPath = usePathname();
  return (
    <CurrentPath.Provider value={currentPath}>
        {children}
    </CurrentPath.Provider>
  );
}
