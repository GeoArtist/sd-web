export type BlogPostThumbnail = {
  src: string; // absolute public path, e.g. /images/blog/thumbnails/x.jpg
  alt: string;
  width: number;
  height: number;
};

// Everything the list needs; no post body, so the list payload stays small
export type BlogPostMeta = {
  slug: string; // file name without .md, used as the URL segment
  id?: number;
  title: string;
  addDate: Date;
  modifyDate: Date;
  keywords: string[];
  summary: string;
  thumbnail?: BlogPostThumbnail;
};

export type BlogPost = BlogPostMeta & {
  content: string; // raw Markdown body
};
