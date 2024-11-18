import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type ContentType ={
    fileName: string,
    data: {
        [key: string]: string;
    },
        
    content: string
}

const CONTENT_DIRECTORY = path.join(process.cwd(),'src', 'content');

export async function getAllContents() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(CONTENT_DIRECTORY);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const filename = fileName.replace(/\.md$/, '');
    // Read markdown file as string
    const fullPath = path.join(CONTENT_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log(fileNames)
    // Use gray-matter to parse the post metadata section
    const {data, content} = matter(fileContents);

    // Combine the data with the id
    return {
      filename,
      ...data,
      content
    };
  });
  return allPostsData
}

export async function getContent(fileName:string):Promise<ContentType> {
    
    // All content fileNames
    const fileNames = fs.readdirSync(CONTENT_DIRECTORY);
    const contentFileName = fileNames.find((file) => file.replace(/\.md$/, '') === fileName);

    if (!contentFileName) {
        return {
            fileName: '',
            data: {},
            content: ''
        };
    }

    const fullPath = path.join(CONTENT_DIRECTORY, contentFileName);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const {data, content} = matter(fileContent);

        
    return {
        fileName,
        data,
        content
      };
    }