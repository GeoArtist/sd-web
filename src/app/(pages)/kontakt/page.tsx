import { ContactView } from "@/views/ContactView/ContactView";
import { pagesMetadata } from "@/constants/metatags";
import { Metadata } from "next/types";

export const metadata: Metadata = pagesMetadata["kontakt"];

export default function KontaktPage() {
  return (
    <>
      <ContactView />
    </>
  );
}
