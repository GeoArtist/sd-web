"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { MarkdownBlogContent } from "@/types/markdown";
import { createMarkdownComponents } from "@/app/components/BlogMarkdown/BlogMarkdownComponents";
import AnimatedSection from "@/app/components/FrameMotion/FrameMotionSection";
import styles from "./BlogPostView.module.scss";

export default function BlogPostView({ post }: { post: MarkdownBlogContent }) {
  return (
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
    </AnimatedSection>
  );
}
