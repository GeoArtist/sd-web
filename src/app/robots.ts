import type { MetadataRoute } from "next";

// Served at /robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/sitemap.xml`,
  };
}
