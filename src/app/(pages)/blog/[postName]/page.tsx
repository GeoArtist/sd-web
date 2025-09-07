import BlogPostView from "@/views/BlogPostView/BlogPostView";
import { getPostData } from "@/utils/markdownParser";
import { notFound } from "next/navigation";

export default async function BlogPost(props: PageProps<"/blog/[postName]">) {
  // Get params, searchParams
  const { postName } = await props.params;
  const post = await getPostData(postName);
  if (!post || Object.keys(post).length === 0) {
    notFound();
  }
  return <BlogPostView post={post} />;
}
