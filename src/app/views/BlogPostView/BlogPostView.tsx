import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";

import { BlogPost } from "@/types/blogPost";
import { createBlogMdxComponents } from "@/components/BlogMarkdown/BlogMdxComponents";
import AnimatedSection from "@/components/FrameMotion/FrameMotionSection";
import BlogBackButton from "@/components/BlogBackButton/BlogBackButton";
import styles from "./BlogPostView.module.scss";

// Server component: the post is compiled and rendered to HTML at build time.
// No onError: a broken .mdx post fails the build instead of shipping an error box.
export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <AnimatedSection className={styles.blogPost}>
      <h2 className={styles.blogPost__title}>{post.title}</h2>
      <div className={styles.blogPost__content}>
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { format: post.format, remarkPlugins: [remarkGfm] } }}
          components={createBlogMdxComponents(post.images)}
        />
      </div>
      <BlogBackButton />
    </AnimatedSection>
  );
}
