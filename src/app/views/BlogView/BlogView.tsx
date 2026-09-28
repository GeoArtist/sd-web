import { BlogPostMeta } from "@/types/blogPost";
import Pagination from "@/components/Pagination/Pagination";
import BlogCards from "@/components/BlogCards/BlogCards";

export function BlogView({
  posts,
  currentPage,
  totalPages,
}: {
  posts: BlogPostMeta[]; // posts of the current page only
  currentPage: number;
  totalPages: number;
}) {
  return (
    <>
      <BlogCards currentPosts={posts} currentPage={currentPage} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
