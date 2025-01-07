import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";

import styles from "./TechnologyView.module.scss";
import { TechnologyDescription } from "@/app/components/TechnologyDescription/TechnologyDescription";

export default function TechnologyView() {
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
