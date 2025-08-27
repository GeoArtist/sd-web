import { ServiceDescription } from "@/components/ServiceDescription/ServiceDescription";
import { pagesMetadata } from "@/constants/metatags";
import { offerServices } from "@/constants/offerCategories";

import { getOfferContent } from "@/utils/markdownParser";
import { Metadata } from "next/types";

// export async function generateStaticParams() {
//   return offerServices.map((service) => ({
//     params: { service: service.path, category: service.category },
//   }));
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; category: string }>;
}): Promise<Metadata> {
  const { service, category } = await params;
  const categoryService = `${category}/${service}`;

  return pagesMetadata[categoryService];
}

export default async function Offer({
  params,
}: {
  params: Promise<{ service: string; category: string }>;
}) {
  // Retrieve the category, service from the params
  const { service, category } = await params;

  // Get the markdown file name from the service (query param)
  const offer = offerServices.filter((offer) => offer.path === service)[0];

  if (!offer) {
    throw new Error("Service not found");
  }
  const md_content = await getOfferContent(
    offer.mdFileName,
    "offer/" + category
  );

  return (
    <>
      <ServiceDescription md_content={md_content} offer={offer} />
    </>
  );
}
