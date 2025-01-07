import AboutUsDescription from "@/app/components/AboutUsDescription/AboutUsDescription";
import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";

import styles from "./AboutUsView.module.scss";

export default function AboutUsView() {
  return (
    <>
      <div className={styles.aboutView__header}>
        <SubPageHeader
          title={"GEODEZJA | GIS | GEOINFORMATYKA | PROGRAMOWANIE"}
        />
      </div>
      <div className={styles.aboutView__content}>
        <AboutUsDescription />
      </div>
    </>
  );
}
