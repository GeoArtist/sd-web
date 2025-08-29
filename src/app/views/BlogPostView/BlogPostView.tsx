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

  const handleBack = () => {
    router.back(); // cofa do poprzedniej strony w historii
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

        <Button onClick={handleBack} type="submit">
          Powrót
        </Button>
      </AnimatedSection>
    </>
  );
}
