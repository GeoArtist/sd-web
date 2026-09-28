import BlogCard from "@/components/BlogCard/BlogCard";
import { BlogPostMeta } from "@/types/blogPost";

import { AnimatedUl } from "@/components/FrameMotion/FrameMotionList";
import styles from "./BlogCards.module.scss";

export default function BlogCards({
  currentPosts,
  currentPage,
}: {
  currentPosts: BlogPostMeta[];
  currentPage: number;
}) {
  return (
    <AnimatedUl key={currentPage} className={styles.blogList}>
      {currentPosts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </AnimatedUl>
  );
}
