import type { Metadata } from "next";
import "../styles/reset.scss";
import "../styles/theme.scss";
import { roboto } from "../fonts/fonts";
import { Toaster } from "sonner";
import { Layout } from "@/components/Layout/Layout";
import { pagesMetadata } from "@/constants/metatags";

export const metadata: Metadata = pagesMetadata["home"];

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="pl">
      <body className={roboto.variable}>
        <Layout>{props.children}</Layout>
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
