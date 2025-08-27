
import { blogPostsImgs } from "@/constants/blogPostsImgs"; // Make sure this import is correct

import BlogCard from "@/components/BlogCard/BlogCard";
import { MarkdownBlogContent } from "@/types/markdown";

import { AnimatedUl } from "@/components/FrameMotion/FrameMotionList";
import styles from "./BlogCards.module.scss";

export default function BlogCards({
  currentPosts,
  currentPage,
}: {
  currentPosts: MarkdownBlogContent[];
  currentPage: number;
}) {
  return (
    <AnimatedUl key={currentPage} className={styles.blogList}>
      {currentPosts.map((post) => {
        const thumbnail = blogPostsImgs.find((img) => img.postId === post.id);
        return (
          <BlogCard key={post.postName} post={post} thumbnail={thumbnail} />
        );
      })}
    </AnimatedUl>
  );
}
