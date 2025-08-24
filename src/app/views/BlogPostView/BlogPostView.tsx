"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { MarkdownBlogContent } from "@/types/markdown";
import styles from "./BlogPostView.module.scss";
import { createMarkdownComponents } from "./BlogMarkdownComponents";
import MotionWrapper from "@/app/components/FrameMotion/FrameMotionSection";

export default function BlogPostView({ post }: { post: MarkdownBlogContent }) {
  return (
    <MotionWrapper className={styles.blogPost}>
      <h2 className={styles.blogPost__title}>{post.title}</h2>
      <div className={styles.blogPost__content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={createMarkdownComponents()}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </MotionWrapper>
  );
}
