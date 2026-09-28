import BlogPostView from "@/views/BlogPostView/BlogPostView";
import { getAllPostsMeta, getPost } from "@/utils/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import { GenerateMetatags } from "@/constants/metatags";
import BlogPostJsonLd from "@/components/BlogPostJsonLd/BlogPostJsonLd";

// Only prerendered posts exist; any other slug is a 404
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({
    postName: post.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[postName]">
): Promise<Metadata> {
  const { postName } = await props.params;
  const post = await getPost(postName);
  if (!post) notFound();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  return GenerateMetatags(
    `Blog - ${post.title} | Soft-Data`,
    post.summary ||
      "Przeczytaj nasze najnowsze artykuły na blogu, aby być na bieżąco z trendami w geodezji, GIS oraz w świecie data-science.",
    `${BASE_URL}/blog/${postName}`,
    {
      publishedTime: post.addDate,
      modifiedTime: post.modifyDate,
      keywords: post.keywords,
      image: post.thumbnail && {
        url: post.thumbnail.src,
        width: post.thumbnail.width,
        height: post.thumbnail.height,
        alt: post.thumbnail.alt,
      },
    }
  );
}

export default async function BlogPost(props: PageProps<"/blog/[postName]">) {
  const { postName } = await props.params;
  const post = await getPost(postName);
  if (!post) notFound();

  return (
    <>
      <BlogPostJsonLd post={post} />
      <BlogPostView post={post} />
    </>
  );
}
