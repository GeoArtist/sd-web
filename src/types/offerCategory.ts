import { StaticImageData } from "next/image";

export type OfferSubCategory = {
  path: string;
  mdFileName: string;
  navName: string;
  category: string;
  imgUrl: StaticImageData;
  imgAlt: string;
};

export type OfferCategory = {
  name: string;
  path: string;
  subcategories: OfferSubCategory[];
};
