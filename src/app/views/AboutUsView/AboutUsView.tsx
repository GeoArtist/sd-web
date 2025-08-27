import { AboutUsDescription } from "@/app/components/AboutUsDescription/AboutUsDescription";
import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";

import AnimatedSection from "@/app/components/FrameMotion/FrameMotionSection";
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
