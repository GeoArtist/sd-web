
import { Footer } from "@/components/Footer/Footer";
import { TopBar } from "@/components/TopBar/TopBar";
import { MainContent } from "@/components/MainContent/MainContent";
import {CurrentPathProvider} from '@/contexts/CurrentPathContext';
import { CookieBanner } from "@/components/CookieBanner/CookieBanner";


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CurrentPathProvider>
        <TopBar />

        <MainContent>{children}</MainContent>
        <CookieBanner />
        <Footer />
      </CurrentPathProvider>
    </>
  );
}
