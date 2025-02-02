import { StaticImageData } from "next/image";

export type ImgsLinks = {
  url: StaticImageData;
  alt: string;
  priority: boolean;
  href?: string;
};