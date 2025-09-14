
import { Footer } from "@/components/Footer/Footer";
import { TopBar } from "@/components/TopBar/TopBar";
import { MainContent } from "@/components/MainContent/MainContent";
import {CurrentPathProvider} from '@/contexts/CurrentPathContext';
import { CookieBanner } from "@/components/CookieBanner/CookieBanner";
import { CookieConsentProvider } from "@/hooks/useCookie";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CurrentPathProvider>
        <CookieConsentProvider>
          <TopBar />

          <MainContent>{children}</MainContent>
          <CookieBanner />
          <Footer />
        </CookieConsentProvider>
      </CurrentPathProvider>
    </>
  );
}
