import { getAllPosts, getPostData } from "@/utils/markdownParser";
import { BlogView } from "@/views/BlogView/BlogView";
import { Metadata } from "next/types";
import { pagesMetadata } from "@/constants/metatags";

export const metadata: Metadata = pagesMetadata["blog"];

export default async function BlogList() {
  const slugs = getAllPosts();
  const posts = await Promise.all(
    slugs.map(({ postName }) => getPostData(postName))
  );

  // Newest first; `readdir` order is lexical and not guaranteed, so sort explicitly
  const sortedPosts = [...posts].sort(
    (a, b) => b.addTime.getTime() - a.addTime.getTime() || b.id - a.id
  );

  return <BlogView posts={sortedPosts} />;
}
