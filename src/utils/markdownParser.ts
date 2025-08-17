import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getContentPath } from "@/utils/paths";
import { MarkdownOfferContent } from "@/types/markdown";
import { MarkdownBlogContent } from "@/types/markdown"; // zakładam, że tu jest ten typ

/**
 * Universal function to get Markdown file content
 */
async function getMarkdownFile({
  subfolder,
  slug,
  toHtml = false,
}: {
  subfolder?: string;
  slug: string;
  toHtml?: boolean;
}) {
  const dir = getContentPath(subfolder);

  // Get  Markdown file name
  const fileNames = fs.readdirSync(dir);
  const contentFileName = fileNames.find(
    (file) => file.replace(/\.md$/, "") === slug
  );

  if (!contentFileName) {
    return null;
  }
  // Read file content elements
  const fullPath = path.join(dir, contentFileName);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);

  let processedContent = content;
  if (toHtml) {
    const processed = await remark().use(html).process(content);
    processedContent = processed.toString();
  }

  return { data, content: processedContent };
}

/**
 * Universal list of slugs
 */
export function getAllSlugs(subfolder?: string) {
  const dir = getContentPath(subfolder);
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * Offer Content (Markdown)
 */
export async function getOfferContent(
  fileName: string,
  subfolder?: string
): Promise<MarkdownOfferContent> {
  const result = await getMarkdownFile({
    subfolder,
    slug: fileName,
    toHtml: false,
  });

  if (!result) {
    return {} as MarkdownOfferContent;
  }

  return {
    fileName,
    title: result.data.title,
    description: result.data.description,
    time: result.data.time,
    legalBasis: result.data.legalBasis,
    content: result.content,
  };
}

/**
 * Read as HTML only
 */
export async function getSelectedContentHTML(
  fileName: string,
  subfolder?: string
): Promise<string> {
  const result = await getMarkdownFile({
    subfolder,
    slug: fileName,
    toHtml: true,
  });

  return result ? (result.content as string) : "";
}

/**
 * Blog – list all slugs
 */
export function getAllPosts() {
  return getAllSlugs("blogPosts").map((slug) => ({
    postName: slug,
  }));
}

/**
 * Blog – single post data
 */
export async function getPostData(
  postName: string
): Promise<MarkdownBlogContent> {
  const result = await getMarkdownFile({
    subfolder: "blogPosts",
    slug: postName,
    toHtml: true,
  });

  if (!result) {
    return {} as MarkdownBlogContent;
  }

  return {
    id: result.data.id,
    postName: postName,
    title: result.data.title,
    addTime: new Date(result.data.addDate),
    modTime: new Date(result.data.modifyDate),
    keywords: result.data.keywords || [],
    summary: result.data.summary || "",
    content: result.content as string,
  };
}
