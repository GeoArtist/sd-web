import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";
import styles from "./page.module.scss";

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.blogView__header}>
          <SubPageHeader title={"Blog"} />
        </div>
        {children}
      </div>
    </>
  );
}