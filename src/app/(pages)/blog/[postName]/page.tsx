
import BlogPostView from "@/views/BlogPostView/BlogPostView";
import { getPostData } from "@/utils/markdownParser";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ postName: string }>;
}) {
  // Get params, searchParams
  const { postName } = await params;
  const post = await getPostData(postName);
  if (!post) {
    throw new Error("Post not found");
  }
  return <BlogPostView post={post} />;
}
