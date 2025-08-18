import { getAllPosts, getPostData } from "@/utils/markdownParser";
import { BlogView } from "@/app/views/BlogView/BlogView";
import { Metadata } from "next/types";
import { pagesMetadata } from "@/constants/metatags";
export const metadata: Metadata = pagesMetadata["blog"];

export default async function BlogList() {
  const slugs = getAllPosts();
  const posts = await Promise.all(
    slugs.map(({ postName }) => getPostData(postName))
  );

  return <BlogView posts={[...posts].reverse()} />;
}
