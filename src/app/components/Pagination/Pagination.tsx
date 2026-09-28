"use client";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import { blogPageHref } from "@/constants/blog";
import styles from "./Pagination.module.scss";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();

  const handlePageClick = (data: { selected: number }) => {
    router.push(blogPageHref(data.selected + 1));
  };

  return (
    <div className={styles.pagination}>
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        disableInitialCallback={true}
        disabledClassName={styles.pagination__disabled}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        // Real hrefs so crawlers can reach every page; clicks still go through the router
        hrefBuilder={(page) => blogPageHref(page)}
        forcePage={currentPage - 1}
        containerClassName={styles.pagination__container}
        pageClassName={styles.pagination__page}
        pageLinkClassName={styles.pagination__link}
        activeClassName={styles.pagination__active}
        previousClassName={styles.pagination__previous}
        nextClassName={styles.pagination__next}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
