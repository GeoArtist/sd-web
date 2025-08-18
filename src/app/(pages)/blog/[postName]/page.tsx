
import BlogPostView from "@/app/views/BlogPostView/BlogPostView";
import { MarkdownBlogContent } from "@/types/markdown";
import {  getPostData } from "@/utils/markdownParser";
   
export default async function BlogPost({
  params,
}: {
  params: Promise<{ postName: string }>;
}) {
  const { postName } = await params;

  const post = await getPostData(postName);
  if (!post) {
    throw new Error("Post not found");
  }
  return <BlogPostView post={post} />;
}