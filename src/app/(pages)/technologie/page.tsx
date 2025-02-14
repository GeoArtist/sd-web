import { TechnologyView } from "@/app/views/TechnologyView/TechnologyView";

import { pagesMetadata } from "@/constants/metatags";
import { Metadata } from "next/types";

export const metadata: Metadata = pagesMetadata["technologie"];

export default function TechnologyPage() {
  return (
    <>
      <TechnologyView />
    </>
  );
}
