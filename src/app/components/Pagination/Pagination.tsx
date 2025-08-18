// app/components/Pagination.tsx
"use client";
import ReactPaginate from "react-paginate";
import { useRouter} from "next/navigation";
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
    const selectedPage = data.selected + 1;
    router.push(`/blog?page=${selectedPage}`);
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
