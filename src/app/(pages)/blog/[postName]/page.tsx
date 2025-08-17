
import BlogPostView from "@/app/views/BlogPostView/BlogPostView";
import { MarkdownBlogContent } from "@/types/markdown";
import {  getPostData } from "@/utils/markdownParser";
   

// }


// export default async function BlogPost({
//   params,
// }: {
//   params: Promise<{ postName: string }>;
// }) {
//   // Retrieve the postName from the params
//   // const { postName } = await params;
  
//   console.log(await params);

//     // Get the markdown file name from the service (query param)
//   const post = await getPostData(postName);

//   if (!post) {
//     throw new Error("Post not found");
//   }
//   return <BlogPost post={post} />;
// }

export default async function BlogPost({ params }: { params: Promise<{ postName: string }> }) {
  // Retrieve the category, service from the params
  const { postName } = await params;

  const post = await getPostData(postName);
  if (!post) {
    throw new Error("Post not found");
  }
  return <BlogPostView post={post} />;
}