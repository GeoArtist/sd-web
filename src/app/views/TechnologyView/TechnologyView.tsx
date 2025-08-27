import { SubPageHeader } from "@/components/SubPageHeader/SubPageHeader";
import { TechnologyDescription } from "@/components/TechnologyDescription/TechnologyDescription";
import AnimatedSection from "@/components/FrameMotion/FrameMotionSection";

import styles from "./TechnologyView.module.scss";

export function TechnologyView() {
  return (
    <>
      <AnimatedSection className={styles.technologyView}>
        <div className={styles.technology__header}>
          <SubPageHeader title={"TECHNOLOGIE"} />
        </div>
        <div className={styles.technology__content}>
          <TechnologyDescription />
        </div>
      </AnimatedSection>
    </>
  );
}
