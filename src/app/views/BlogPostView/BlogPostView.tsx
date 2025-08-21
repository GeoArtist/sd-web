import { MarkdownBlogContent } from "@/types/markdown";
import styles from "./BlogPostView.module.scss";

export default function BlogPostView({ post }: { post: MarkdownBlogContent }) {
  return (
    <>
      <div className={styles.blogPost}>
        <h2 className={styles.blogPost__title}>{post.title}</h2>
        <div
          className={styles.blogPost__content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </>
  );
}
