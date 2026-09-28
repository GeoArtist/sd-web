import { getBlogPage } from "@/utils/blog";
import { BlogView } from "@/views/BlogView/BlogView";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { GenerateMetatags } from "@/constants/metatags";
import { blogPageHref } from "@/constants/blog";

// Pages 1..n are prerendered; anything else is a 404
export const dynamicParams = false;

export async function generateStaticParams() {
  const { totalPages } = (await getBlogPage(1))!;
  return Array.from({ length: totalPages }, (_, index) => ({
    page: String(index + 1),
  }));
}

export async function generateMetadata(
  props: PageProps<"/blog/strona/[page]">
): Promise<Metadata> {
  const { page } = await props.params;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  return GenerateMetatags(
    page === "1" ? "Blog - Soft-Data" : `Blog - strona ${page} | Soft-Data`,
    "Przeczytaj nasze najnowsze artykuły na blogu, aby być na bieżąco z trendami w geodezji, GIS oraz w świecie data-science.",
    `${BASE_URL}${blogPageHref(Number(page))}`
  );
}

export default async function BlogListPage(props: PageProps<"/blog/strona/[page]">) {
  const { page } = await props.params;
  const blogPage = await getBlogPage(Number(page));
  if (!blogPage || page !== String(blogPage.currentPage)) notFound();

  return (
    <BlogView
      posts={blogPage.posts}
      currentPage={blogPage.currentPage}
      totalPages={blogPage.totalPages}
    />
  );
}
