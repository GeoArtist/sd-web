import { StaticImageData } from "next/image";

export type BlogPostImg = {
  postId: number;
  url: StaticImageData;
  alt: string;
  type: "thumbnail" | "featured";
};