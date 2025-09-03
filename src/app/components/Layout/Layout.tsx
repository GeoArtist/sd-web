
import { Footer } from "@/components/Footer/Footer";
import { TopBar } from "@/components/TopBar/TopBar";
import { MainContent } from "@/components/MainContent/MainContent";
import {CurrentPathProvider} from '@/contexts/CurrentPathContext';
import { CookieBanner } from "@/components/CookieBanner/CookieBanner";

export function Layout(props: LayoutProps<"/">) {
  return (
    <>
      <CurrentPathProvider>
        <TopBar />

        <MainContent>{props.children}</MainContent>
        <CookieBanner />
        <Footer />
      </CurrentPathProvider>
    </>
  );
}
