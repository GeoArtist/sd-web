
export type MarkdownContent = {
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