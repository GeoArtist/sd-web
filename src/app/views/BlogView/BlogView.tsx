import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";
import { blogPostsImgs } from "@/constants/blogPostsImgs"; // Make sure this import is correct
import { MarkdownBlogContent } from "@/types/markdown";
import BlogCard from "@/app/components/BlogCard/BlogCard";
import styles from "./BlogView.module.scss";

export function BlogView({ posts }: { posts: MarkdownBlogContent[] }) {
  return (
    <>
      <ul className={styles.blogList}>
        {[...posts].reverse().map((post) => {
          const thumbnail = blogPostsImgs.find((img) => img.postId === post.id);
          return (
            <BlogCard key={post.postName} post={post} thumbnail={thumbnail} />
          );
        })}
      </ul>
    </>
  );
}
