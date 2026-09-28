import { BlogPostMeta } from "@/types/blogPost";

// schema.org BlogPosting for rich results; rendered as an inert JSON script
export default function BlogPostJsonLd({ post }: { post: BlogPostMeta }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${BASE_URL}/blog/${post.slug}`;
  const organization = {
    "@type": "Organization",
    name: "Soft-Data",
    url: BASE_URL,
    logo: `${BASE_URL}/logos/social_logo.png`,
  };

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary || undefined,
    image: post.thumbnail ? `${BASE_URL}${post.thumbnail.src}` : undefined,
    datePublished: post.addDate.toISOString(),
    dateModified: post.modifyDate.toISOString(),
    keywords: post.keywords.length ? post.keywords.join(", ") : undefined,
    inLanguage: "pl-PL",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: organization,
    publisher: organization,
  };

  return (
    <script
      type="application/ld+json"
      // `<` is escaped so frontmatter text cannot close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
