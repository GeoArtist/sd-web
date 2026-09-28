export const POSTS_PER_PAGE = 6;

// Page 1 is /blog itself; later pages are prerendered under /blog/strona/<n>
export function blogPageHref(page: number): string {
  return page <= 1 ? "/blog" : `/blog/strona/${page}`;
}
