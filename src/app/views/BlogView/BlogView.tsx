"use client";
import { MarkdownBlogContent } from "@/types/markdown";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import BlogCards from "@/components/BlogCards/BlogCards";

const POSTS_PER_PAGE = 5;

export function BlogView({ posts }: { posts: MarkdownBlogContent[] }) {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return (
    <>
      <BlogCards currentPosts={currentPosts} currentPage={currentPage} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
