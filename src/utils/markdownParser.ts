import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MarkDownContent } from '@/types/markdown';
import { remark } from 'remark';
import html from 'remark-html';

function getPath(subfolder?:string):string {
  // Return the path of the content directory with the subfolder if provided
  const contentDir = path.join(process.cwd(),'src', 'content');
  if (subfolder)
    {return path.join(contentDir, subfolder);}
  else
    {return contentDir;}
}

export async function getAllContents(subfolder?:string):Promise<MarkDownContent[]> {
  const dir = getPath(subfolder)
  // Get file names under /posts
  const fileNames = fs.readdirSync(dir);
  const allPostsData = fileNames.map(filename => {
    // Remove ".md" from file name to get id
    const fileName = filename.replace(/\.md$/, '');
    // Read markdown file as string
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const {data: {title, description, time, legalBasis}, content}  = matter(fileContents);

    // Combine the data with the id
    return {
      fileName,
        title, 
        description, 
        time, 
        legalBasis,
        content,
    };
  });
  return allPostsData
}

export async function getSelectedContent(fileName:string, subfolder?:string):Promise<MarkDownContent> {
    const dir = getPath(subfolder)
    // All content fileNames
    const fileNames = fs.readdirSync(dir);
    const contentFileName = fileNames.find((file) => file.replace(/\.md$/, '') === fileName);

    if (!contentFileName) {
        return {} as MarkDownContent;
    }

    const fullPath = path.join(dir, contentFileName);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const {data: {title, description, time, legalBasis}, content} = matter(fileContent);
 
    return {
        fileName,
        title, 
        description, 
        time, 
        legalBasis,
        content,
      };
    }


export async function getContentFileNames(subfolder?:string):Promise<string[]> {
      const dir = getPath(subfolder)
      // All content fileNames
      const fileNames = fs.readdirSync(dir);
      return fileNames;
      }


// Read as html
export async function getSelectedContentHTML(fileName:string, subfolder?:string):Promise<string>{
  const dir = getPath(subfolder)
  // All content fileNames
  const fileNames = fs.readdirSync(dir);
  const contentFileName = fileNames.find((file) => file.replace(/\.md$/, '') === fileName);
  if (!contentFileName) {
        return ""
  }

  const fullPath = path.join(dir, contentFileName);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  
  // Parse frontmatter using gray-matter
  const { data, content } = matter(fileContent);

  // Convert Markdown to HTML using remark
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return contentHtml
}