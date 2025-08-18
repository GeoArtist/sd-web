
import BlogPostView from "@/app/views/BlogPostView/BlogPostView";
import { getAllPosts, getPostData } from "@/utils/markdownParser";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ postName: string }>;
}) {
  // Get params, searchParams
  const { postName } = await params;

  // Get posts data
  const slugs = getAllPosts();
  const posts = await Promise.all(
    slugs.map(({ postName }) => getPostData(postName))
  );
  const post = await getPostData(postName);
  if (!post) {
    throw new Error("Post not found");
  }
  return <BlogPostView post={post} />;
}
