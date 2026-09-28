import type { MetadataRoute } from "next";
import { offerServices } from "@/constants/offerCategories";
import { regulations } from "@/constants/regulations";
import { blogPageHref } from "@/constants/blog";
import { getAllPostsMeta, getBlogPage } from "@/utils/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

// Served at /sitemap.xml; regenerated on every build
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsMeta();
  const { totalPages } = (await getBlogPage(1))!;
  const lastPostChange = posts.reduce<Date | undefined>(
    (latest, post) => (!latest || post.modifyDate > latest ? post.modifyDate : latest),
    undefined
  );

  const staticPages = ["", "/o-nas", "/kontakt", "/technologie"].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));
  const offerPages = offerServices.map((service) => ({
    url: `${BASE_URL}/oferta/${service.category}/${service.path}`,
  }));
  const regulationPages = regulations.map((regulation) => ({
    url: `${BASE_URL}/regulaminy/${regulation.path}`,
  }));
  const blogListPages = Array.from({ length: totalPages }, (_, index) => ({
    url: `${BASE_URL}${blogPageHref(index + 1)}`,
    lastModified: lastPostChange,
  }));
  const postPages = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.modifyDate,
  }));

  return [...staticPages, ...offerPages, ...regulationPages, ...blogListPages, ...postPages];
}
