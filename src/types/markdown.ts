
export type MarkdownOfferContent = {
  fileName: string;
  title: string;
  description: string[];
  time: string;
  legalBasis: string[];
  content: string;
};

export type MarkdownPaths = {
  path: string;
  mdFileName: string;
  navName: string;
};

export type MarkdownBlogContent = {
  id: number;
  postName: string;
  title: string;
  addTime: Date;
  modTime: Date;
  keywords: string[];
  summary: string;
  content: string;
};

