import { MarkdownBlogContent } from "@/types/markdown";
import Link from "next/link";
import styles from "./BlogPostView.module.scss";


export default function BlogPostView({ post }: { post: MarkdownBlogContent }) {
  return (
    <>
      <div className={styles.blogPost}>
        <h1 className={styles.blogPost__title}>{post.title}</h1>
        <Link href={`/blog/${post.postName}`} className={styles.blogPost__link}>
          <h2 className={styles.blogPost__title}>{post.title}</h2>
        </Link>
        <div className={styles.blogPost__content} dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </>
  );
}