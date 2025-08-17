
import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";
import { blogPostsImgs } from "@/constants/blogPostsImgs"; // Make sure this import is correct
import { MarkdownBlogContent } from "@/types/markdown";
import BlogCard from "@/app/components/BlogCard/BlogCard";
import styles from "./BlogLayoutView.module.scss";

export function BlogLayoutView({posts}:{posts: (MarkdownBlogContent)[]}) {
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.blogView__header}>
          <SubPageHeader title={"Blog"} />
        </div>
        <ul className={styles.blogList}>
          {posts.map((post) => {
            const thumbnail = blogPostsImgs.find(
              (img) => img.postId === post.id
            );
            return (
              <BlogCard key={post.postName} post={post} thumbnail={thumbnail} />
            );
          })}
        </ul>
      </div>
    </>
  );
}
