'use client'
import { BlogPostMeta } from "@/types/blogPost";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { AnimatedLi } from "@/components/FrameMotion/FrameMotionList";
import styles from "./BlogCard.module.scss";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  const href = `/blog/${post.slug}`;
  return (
    <AnimatedLi
      key={post.slug}
      className={styles.blogCard}
      variantType="fromTop"
    >
      <Link href={href} className={styles.blogCard__link}>
        <h2 className={styles.blogCard__title}>{post.title}</h2>
      </Link>
      <p className={styles.blogCard__date}>
        {post.addDate.toLocaleDateString("pl-PL")}
      </p>
      {post.thumbnail && (
        <Link href={href}>
          <Image
            src={post.thumbnail.src}
            alt={post.thumbnail.alt}
            width={post.thumbnail.width}
            height={post.thumbnail.height}
            sizes="300px"
            className={styles.blogCard__image}
          />
        </Link>
      )}
      <p className={styles.blogCard__summary}>{post.summary}</p>
      <Link href={href}>
        <Button type="button">Czytaj więcej</Button>
      </Link>
    </AnimatedLi>
  );
}
