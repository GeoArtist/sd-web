import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";
import { TechnologyDescription } from "@/app/components/TechnologyDescription/TechnologyDescription";

import styles from "./TechnologyView.module.scss";
import FrameMotionSection from "@/app/components/FrameMotion/FrameMotionSection";

export function TechnologyView() {
  return (
    <>
      <div className={styles.technologyView}>
        <div className={styles.technology__header}>
          <SubPageHeader title={"TECHNOLOGIE"} />
        </div>
        <div className={styles.technology__content}>
          <TechnologyDescription />
        </div>
      </div>
    </>
  );
}
