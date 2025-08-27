import { AboutUsDescription } from "@/components/AboutUsDescription/AboutUsDescription";
import { SubPageHeader } from "@/components/SubPageHeader/SubPageHeader";

import AnimatedSection from "@/components/FrameMotion/FrameMotionSection";
import styles from "./AboutUsView.module.scss";

export function AboutUsView() {
  return (
    <>
      <AnimatedSection className={styles.aboutView}>
        <div className={styles.aboutView__header}>
          <SubPageHeader
            title={"GEODEZJA | GIS | GEOINFORMATYKA | PROGRAMOWANIE"}
          />
        </div>
        <div className={styles.aboutView__content}>
          <AboutUsDescription />
        </div>
        {/* </FrameMotionSection> */}
      </AnimatedSection>
    </>
  );
}
