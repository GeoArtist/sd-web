
import { Footer } from '../Footer/Footer';
import { TopBar } from '../TopBar/TopBar';
import { MainContent } from '../MainContent/MainContent';

type LayoutProps= {
    children: React.ReactNode;
  }

export function Layout({children}:LayoutProps) {

    return (
        <>
        <TopBar  />
            <MainContent>{children}</MainContent>
        <Footer />
        </>
    );
}
