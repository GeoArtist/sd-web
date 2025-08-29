'use client'
import { MarkdownBlogContent } from "@/types/markdown";
import { BlogPostImg } from "@/types/blogPost";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { AnimatedLi } from "@/components/FrameMotion/FrameMotionList";
import styles from "./BlogCard.module.scss";

export default function BlogCard({
  post,
  thumbnail,
}: {
  post: MarkdownBlogContent;
  thumbnail: BlogPostImg | undefined;
}) {
  return (
    <AnimatedLi
      key={post.postName}
      className={styles.blogCard}
      variantType="fromTop"
    >
      <Link href={`/blog/${post.postName}`} className={styles.blogCard__link}>
        <h2 className={styles.blogCard__title}>{post.title}</h2>
      </Link>
      <p className={styles.blogCard__date}>
        {post.addTime.toLocaleDateString()}
      </p>
      {thumbnail && (
        <Link href={`/blog/${post.postName}`}>
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt}
            className={styles.blogCard__image}
          />
        </Link>
      )}
      <p
        className={styles.blogCard__summary}
        dangerouslySetInnerHTML={{ __html: post.summary }}
      />
      <Link href={`/blog/${post.postName}`}>
        <Button type="button">Czytaj więcej</Button>
      </Link>
    </AnimatedLi>
  );
}
