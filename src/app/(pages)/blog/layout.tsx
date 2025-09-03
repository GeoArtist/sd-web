import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";
import styles from "./page.module.scss";
import AnimatedSection from "@/app/components/FrameMotion/FrameMotionSection";

export default function BlogPostLayout(props: LayoutProps<"/blog">) {
  return (
    <>
      <AnimatedSection className={styles.grid}>
        <div className={styles.blogView__header}>
          <SubPageHeader title={"Blog"} />
        </div>
        {props.children}
      </AnimatedSection>
    </>
  );
}