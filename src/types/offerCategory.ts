
export type MarkdownPaths = 
    { path: string, mdFileName: string, navName: string,category:string;}

export type OfferCategory = {
    name: string;
    path: string;
    subcategories: MarkdownPaths[]}