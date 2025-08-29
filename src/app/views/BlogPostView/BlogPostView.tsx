"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { MarkdownBlogContent } from "@/types/markdown";
import { createMarkdownComponents } from "@/components/BlogMarkdown/BlogMarkdownComponents";
import AnimatedSection from "@/components/FrameMotion/FrameMotionSection";
import { Button } from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import styles from "./BlogPostView.module.scss";

export default function BlogPostView({ post }: { post: MarkdownBlogContent }) {
  const router = useRouter();


  const handleBackClick = () => {
    // Use document.referrer to check if user has a previous page
    if (document.referrer) {
      router.back();
    } else {
      router.push("/blog"); // default fallback
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <AnimatedSection className={styles.blogPost}>
        <h2 className={styles.blogPost__title}>{post.title}</h2>
        <div className={styles.blogPost__content}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={createMarkdownComponents()}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <Button onClick={handleBackClick} type="submit">
          Powrót
        </Button>
      </AnimatedSection>
    </>
  );
}
