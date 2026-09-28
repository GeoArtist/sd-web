import type { MDXComponents } from "next-mdx-remote-client/rsc";
import BlogImage from "@/components/BlogMarkdown/BlogImage";
import { BlogImageSizes } from "@/types/blogPost";

/**
 * Components available to blog posts.
 * - Overrides of Markdown elements (img) apply to both .md and .mdx posts.
 * - Any other component added here can be used as JSX in .mdx posts,
 *   e.g. `<MyChart data="..." />`, without importing it in the post.
 */
export function createBlogMdxComponents(images: BlogImageSizes): MDXComponents {
  return {
    // Local images go through next/image with build-time dimensions
    img: ({ src, alt, ...props }) => {
      const size = typeof src === "string" ? images[src] : undefined;
      if (!size) {
        // External image: no known dimensions, keep a plain lazy <img>
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt ?? ""} loading="lazy" {...props} />;
      }
      return <BlogImage src={src as string} alt={alt ?? ""} {...size} />;
    },
  };
}
