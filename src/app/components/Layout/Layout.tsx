
import { Footer } from '../Footer/Footer';
import { TopBar } from '../TopBar/TopBar';
import { MainContent } from '../MainContent/MainContent';
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
