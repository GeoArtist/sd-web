import type { Components } from "react-markdown";
import BlogImage from "@/components/BlogMarkdown/BlogImage";
import { BlogImageSizes } from "@/types/blogPost";

// Markdown element overrides; local images go through next/image with build-time dimensions
export function createMarkdownComponents(images: BlogImageSizes): Components {
  return {
    // `node` is react-markdown's AST node; it must not reach the DOM
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    img: ({ node, src, alt, ...props }) => {
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
