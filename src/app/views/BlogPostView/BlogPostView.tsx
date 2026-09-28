import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { BlogPost } from "@/types/blogPost";
import { createMarkdownComponents } from "@/components/BlogMarkdown/BlogMarkdownComponents";
import AnimatedSection from "@/components/FrameMotion/FrameMotionSection";
import BlogBackButton from "@/components/BlogBackButton/BlogBackButton";
import styles from "./BlogPostView.module.scss";

// Server component: the Markdown is rendered to HTML at build time, not in the browser
export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <AnimatedSection className={styles.blogPost}>
      <h2 className={styles.blogPost__title}>{post.title}</h2>
      <div className={styles.blogPost__content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={createMarkdownComponents(post.images)}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      <BlogBackButton />
    </AnimatedSection>
  );
}
