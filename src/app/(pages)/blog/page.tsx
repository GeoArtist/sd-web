import { getAllPosts, getPostData } from "@/utils/markdownParser";
import { BlogLayoutView } from "@/app/views/BlogLayoutView/BlogLayoutView";
import { Metadata } from "next/types";
import { pagesMetadata } from "@/constants/metatags";

export const metadata: Metadata = pagesMetadata["blog"];

export default async function BlogList() {
  const slugs = getAllPosts();
  const posts = await Promise.all(
    slugs.map(({ postName }) => getPostData(postName))
  );

  return (
    <BlogLayoutView posts={posts} />
  );
}
