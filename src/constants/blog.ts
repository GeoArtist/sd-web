export const POSTS_PER_PAGE = 6;

// Every list page, including the first, is prerendered under /blog/strona/<n>; /blog redirects to page 1
export function blogPageHref(page: number): string {
  return `/blog/strona/${page}`;
}
