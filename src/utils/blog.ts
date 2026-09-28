import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import sharp from "sharp";
import { z } from "zod";
import { getContentPath } from "@/utils/paths";
import { BlogImageSizes, BlogPost, BlogPostMeta, BlogPostThumbnail } from "@/types/blogPost";
import { POSTS_PER_PAGE } from "@/constants/blog";

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

type PostFile = { fileName: string; format: BlogPost["format"] };

// slug -> file; `.md` is plain Markdown, `.mdx` may also use JSX components
function listPostFiles(): Map<string, PostFile> {
  const files = new Map<string, PostFile>();
  for (const fileName of fs.readdirSync(POSTS_DIR)) {
    const match = fileName.match(/^(.+)\.(mdx?)$/);
    if (!match) continue;
    const [, slug, format] = match;
    if (files.has(slug)) {
      throw new Error(`Blog post "${slug}" exists as both .md and .mdx`);
    }
    files.set(slug, { fileName, format: format as PostFile["format"] });
  }
  return files;
}

async function readImageSize(slug: string, src: string) {
  const filePath = path.join(PUBLIC_DIR, src);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post "${slug}": image not found: public${src}`);
  }
  const { width, height } = await sharp(filePath).metadata();
  return { width: width ?? 0, height: height ?? 0 };
}

// Local images referenced as ![alt](/path.jpg "optional title") in the body
async function readBodyImages(slug: string, content: string): Promise<BlogImageSizes> {
  const srcs = new Set(
    [...content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)/g)].map((match) => match[1])
  );
  const entries = await Promise.all(
    [...srcs].map(async (src) => [src, await readImageSize(slug, src)] as const)
  );
  return Object.fromEntries(entries);
}

async function readThumbnail(
  slug: string,
  frontmatter: Frontmatter
): Promise<BlogPostThumbnail | undefined> {
  if (!frontmatter.thumbnail) return undefined;

  return {
    src: frontmatter.thumbnail,
    alt: frontmatter.thumbnailAlt ?? frontmatter.title,
    ...(await readImageSize(slug, frontmatter.thumbnail)),
  };
}

const readPost = cache(async (slug: string): Promise<(BlogPost & { draft: boolean }) | null> => {
  // Only known file names: the slug comes from the URL and must not become an arbitrary path
  const file = listPostFiles().get(slug);
  if (!file) return null;

  const filePath = path.join(POSTS_DIR, file.fileName);
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
    format: file.format,
    images: await readBodyImages(slug, content),
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
  const posts = await Promise.all([...listPostFiles().keys()].map(readPost));
  return posts
    .filter((post): post is BlogPost & { draft: boolean } => post !== null && isPublished(post))
    .sort((a, b) => b.addDate.getTime() - a.addDate.getTime() || (b.id ?? 0) - (a.id ?? 0))
    .map(({ content: _content, format: _format, images: _images, draft: _draft, ...meta }) => meta);
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

/**
 * One page of the post list (1-based), or null when the page does not exist.
 */
export async function getBlogPage(page: number) {
  const posts = await getAllPostsMeta();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  if (!Number.isInteger(page) || page < 1 || page > totalPages) return null;

  const start = (page - 1) * POSTS_PER_PAGE;
  return { posts: posts.slice(start, start + POSTS_PER_PAGE), currentPage: page, totalPages };
}
