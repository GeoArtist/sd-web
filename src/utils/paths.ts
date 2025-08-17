import path from 'path';

export function getContentPath(subfolder?: string): string {
  // Return the path of the content directory with the subfolder if provided
  const contentDir = path.join(process.cwd(), "src", "content");
  if (subfolder) {
    return path.join(contentDir, subfolder);
  } else {
    return contentDir;
  }
}

