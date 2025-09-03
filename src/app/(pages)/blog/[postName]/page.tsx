
import BlogPostView from "@/views/BlogPostView/BlogPostView";
import { getPostData } from "@/utils/markdownParser";

export default async function BlogPost(props: PageProps<"/blog/[postName]">) {
  // Get params, searchParams
  const { postName } = await props.params;
  const post = await getPostData(postName);
  if (!post) {
    throw new Error("Post not found");
  }
  return <BlogPostView post={post} />;
}
