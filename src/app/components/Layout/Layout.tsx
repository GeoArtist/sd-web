
import { Footer } from "@/components/Footer/Footer";
import { TopBar } from "@/components/TopBar/TopBar";
import { MainContent } from "@/components/MainContent/MainContent";
import {CurrentPathProvider} from '@/contexts/CurrentPathContext';
type LayoutProps= {
    children: React.ReactNode;
  }

export function Layout({children}:LayoutProps) {

    return (
        <>
            <CurrentPathProvider>
                <TopBar  />
                    <MainContent>{children}</MainContent>
                <Footer />    
            </CurrentPathProvider>   
        </>
    );
}
