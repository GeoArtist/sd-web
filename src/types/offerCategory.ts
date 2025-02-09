import { StaticImageData } from "next/image";
import { MarkdownPaths } from "@/types/markdown";

export type OfferSubCategory = MarkdownPaths & {
  category: string;
  imgUrl: StaticImageData;
  imgAlt: string;
};

export type OfferCategory = {
  name: string;
  path: string;
  subcategories: OfferSubCategory[];
};
