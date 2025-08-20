"use client";
import { blogPostsImgs } from "@/constants/blogPostsImgs"; // Make sure this import is correct
import { MarkdownBlogContent } from "@/types/markdown";
import BlogCard from "@/app/components/BlogCard/BlogCard";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/components/Pagination/Pagination";
import styles from "./BlogView.module.scss";

const POSTS_PER_PAGE = 3;

export function BlogView({ posts }: { posts: MarkdownBlogContent[] }) {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return (
    <>
      <ul className={styles.blogList}>
        {currentPosts.map((post) => {
          const thumbnail = blogPostsImgs.find((img) => img.postId === post.id);
          return (
            <BlogCard key={post.postName} post={post} thumbnail={thumbnail} />
          );
        })}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
