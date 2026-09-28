import { getAllPostsMeta } from "@/utils/blog";
import { BlogView } from "@/views/BlogView/BlogView";
import { Metadata } from "next/types";
import { pagesMetadata } from "@/constants/metatags";

export const metadata: Metadata = pagesMetadata["blog"];

export default async function BlogList() {
  const posts = await getAllPostsMeta();

  return <BlogView posts={posts} />;
}
