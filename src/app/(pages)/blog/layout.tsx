import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";
import styles from "./page.module.scss";
import FrameMotionSection from "@/app/components/FrameMotion/FrameMotionSection";

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FrameMotionSection className={styles.grid}>
        <div className={styles.blogView__header}>
          <SubPageHeader title={"Blog"} />
        </div>
        {children}
      </FrameMotionSection>
    </>
  );
}