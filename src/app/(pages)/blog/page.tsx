import { getBlogPage } from "@/utils/blog";
import { BlogView } from "@/views/BlogView/BlogView";
import { Metadata } from "next/types";
import { pagesMetadata } from "@/constants/metatags";

export const metadata: Metadata = pagesMetadata["blog"];

export default async function BlogList() {
  const { posts, currentPage, totalPages } = (await getBlogPage(1))!;

  return <BlogView posts={posts} currentPage={currentPage} totalPages={totalPages} />;
}
