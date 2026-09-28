import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getContentPath } from "@/utils/paths";
import { MarkdownOfferContent } from "@/types/markdown";
import remarkGfm from "remark-gfm";
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
    const processed = await remark().use(remarkGfm).use(html).process(content);
    processedContent = processed.toString();
  }

  return { data, content: processedContent };
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
