import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import sharp from "sharp";
import { z } from "zod";
import { getContentPath } from "@/utils/paths";
import { BlogPost, BlogPostMeta, BlogPostThumbnail } from "@/types/blogPost";

const POSTS_DIR = getContentPath("blogPosts");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// A broken frontmatter fails the build instead of rendering "undefined" or "Invalid Date"
const frontmatterSchema = z.object({
  id: z.number().int().optional(),
  title: z.string().min(1),
  addDate: z.coerce.date({ error: "expected a date (YYYY-MM-DD)" }),
  modifyDate: z.coerce.date({ error: "expected a date (YYYY-MM-DD)" }).optional(),
  keywords: z.array(z.string()).default([]),
  summary: z.string().default(""),
  thumbnail: z.string().startsWith("/").optional(),
  thumbnailAlt: z.string().optional(),
  draft: z.boolean().default(false),
});

type Frontmatter = z.infer<typeof frontmatterSchema>;

function listSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

async function readThumbnail(
  slug: string,
  frontmatter: Frontmatter
): Promise<BlogPostThumbnail | undefined> {
  if (!frontmatter.thumbnail) return undefined;

  const filePath = path.join(PUBLIC_DIR, frontmatter.thumbnail);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post "${slug}": thumbnail not found: public${frontmatter.thumbnail}`);
  }
  const { width, height } = await sharp(filePath).metadata();
  return {
    src: frontmatter.thumbnail,
    alt: frontmatter.thumbnailAlt ?? frontmatter.title,
    width: width ?? 0,
    height: height ?? 0,
  };
}

const readPost = cache(async (slug: string): Promise<(BlogPost & { draft: boolean }) | null> => {
  // Only known file names: the slug comes from the URL and must not become an arbitrary path
  if (!listSlugs().includes(slug)) return null;

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Blog post "${slug}": invalid frontmatter\n${z.prettifyError(parsed.error)}`);
  }
  const frontmatter = parsed.data;

  return {
    slug,
    id: frontmatter.id,
    title: frontmatter.title,
    addDate: frontmatter.addDate,
    modifyDate: frontmatter.modifyDate ?? frontmatter.addDate,
    keywords: frontmatter.keywords,
    summary: frontmatter.summary,
    thumbnail: await readThumbnail(slug, frontmatter),
    draft: frontmatter.draft,
    content,
  };
});

// Drafts are visible in `next dev` only
function isPublished(post: { draft: boolean }): boolean {
  return !post.draft || process.env.NODE_ENV !== "production";
}

/**
 * Published posts without their body, newest first.
 */
export const getAllPostsMeta = cache(async (): Promise<BlogPostMeta[]> => {
  const posts = await Promise.all(listSlugs().map(readPost));
  return posts
    .filter((post): post is BlogPost & { draft: boolean } => post !== null && isPublished(post))
    .sort((a, b) => b.addDate.getTime() - a.addDate.getTime() || (b.id ?? 0) - (a.id ?? 0))
    .map(({ content: _content, draft: _draft, ...meta }) => meta);
});

/**
 * A single published post, or null when the slug does not exist.
 */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const post = await readPost(slug);
  if (!post || !isPublished(post)) return null;
  const { draft: _draft, ...rest } = post;
  return rest;
}
