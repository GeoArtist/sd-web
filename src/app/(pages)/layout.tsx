import type { Metadata } from "next";
import "../styles/reset.scss";
import "../styles/theme.scss";
import { roboto } from "../fonts/fonts";
import { Toaster } from "sonner";
import { Layout } from "../components/Layout/Layout";
import { pagesMetadata } from "@/constants/metatags";

import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";

export const metadata: Metadata = pagesMetadata["home"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-FYJF1529CR" />
      <body className={roboto.variable}>
        <Layout>{children}</Layout>
        <Toaster
          richColors
          position={"top-right"}
          closeButton
          expand={false}
          duration={10000}
          className="custom-toaster"
        />
      </body>
    </html>
  );
}
