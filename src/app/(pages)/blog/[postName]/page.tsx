import BlogPostView from "@/views/BlogPostView/BlogPostView";
import { getAllPosts, getPostData } from "@/utils/markdownParser";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { GenerateMetatags } from "@/constants/metatags";

// Only prerendered posts exist; any other slug is a 404
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    postName: post.postName,
  }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[postName]">
): Promise<Metadata> {
  const { postName } = await props.params;
  const post = await getPostData(postName);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  return GenerateMetatags(
    `Blog - ${post.title} | Soft-Data`,
    post.summary ||
      "Przeczytaj nasze najnowsze artykuły na blogu, aby być na bieżąco z trendami w geodezji, GIS oraz w świecie data-science.",
    `${BASE_URL}/blog/${postName}`
  );
}



export default async function BlogPost(props: PageProps<"/blog/[postName]">) {
  // Get params, searchParams
  const { postName } = await props.params;
  const post = await getPostData(postName);
  if (!post || Object.keys(post).length === 0) {
    notFound();
  }
  return <BlogPostView post={post} />;
}
