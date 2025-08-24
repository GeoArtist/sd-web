import FrameMotionSection from "@/app/components/FrameMotion/FrameMotionSection";
import styles from "./RegulationView.module.scss";

export function RegulationView({ md_contentHTML }: { md_contentHTML: string }) {
  return (
    <FrameMotionSection className={styles.regulation}>
      <div dangerouslySetInnerHTML={{ __html: md_contentHTML }} />
    </FrameMotionSection>
  );
}
