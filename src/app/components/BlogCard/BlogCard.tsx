'use client'
import { MarkdownBlogContent } from "@/types/markdown";
import { BlogPostImg } from "@/types/blogPost";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import styles from "./BlogCard.module.scss";


export default function BlogCard({
  post,
  thumbnail,
}: {
  post: MarkdownBlogContent;
  thumbnail: BlogPostImg | undefined;
}) {

  return (
    <li key={post.postName} className={styles.blogCard}>
      <Link href={`/blog/${post.postName}`} className={styles.blogCard__link}>
        <h2 className={styles.blogCard__title}>{post.title}</h2>
      </Link>
      <p className={styles.blogCard__date}>
        {post.addTime.toLocaleDateString()}
      </p>
      {thumbnail && (
        <Image
          src={thumbnail.url}
          alt={thumbnail.alt}
          className={styles.blogCard__image}
        />
      )}
      <p className={styles.blogCard__summary}>{post.summary}</p>
      <Link href={`/blog/${post.postName}`} >
        <Button type="button">Czytaj więcej</Button>
      </Link>
    </li>
  );
}
