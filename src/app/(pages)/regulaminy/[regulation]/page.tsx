import { RegulationView } from "@/views/RegulationView/RegulationView";
import { pagesMetadata } from "@/constants/metatags";
import { regulations } from "@/constants/regulations";

import { getSelectedContentHTML } from "@/utils/markdownParser";
import { Metadata } from "next/types";

// export async function generateStaticParams() {
//   return regulations.map((reg) => ({ regulation: reg.path }));
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ regulation: string }>;
}): Promise<Metadata> {
  const regulation = (await params).regulation;

  return pagesMetadata[regulation];
}

export default async function RegulationsPage(
  props: PageProps<"/regulaminy/[regulation]">
) {
  const regulation = (await props.params).regulation;

  const md_filename = regulations.filter((reg) => reg.path === regulation)[0]
    ?.mdFileName;

  const md_contentHTML = await getSelectedContentHTML(
    md_filename,
    "regulations"
  );

  return <RegulationView md_contentHTML={md_contentHTML} />;
}
