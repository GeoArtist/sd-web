import { AboutUsView } from "@/views/AboutUsView/AboutUsView";
import { pagesMetadata } from "@/constants/metatags";
import { Metadata } from "next/types";

export const metadata: Metadata = pagesMetadata["o-nas"];

export default function AboutUs() {
  return (
    <>
      <AboutUsView />
    </>
  );
}
