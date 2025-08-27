import { SubPageHeader } from "@/components/SubPageHeader/SubPageHeader";
import { ContactContent } from "@/components/ContactContent/ContactContent";

import styles from "./ContactView.module.scss";
import { DynamicContactMap } from "@/components/ContactMap/DynamicContactMap";
import AnimatedSection from "@/components/FrameMotion/FrameMotionSection";

export function ContactView() {
  return (
    <>
      <AnimatedSection>
        <div className={styles.contactHeader}>
          <SubPageHeader title="Kontakt" />
        </div>

        <div className={styles.contactLayout}>
          <ContactContent />
        </div>
        <DynamicContactMap />
      </AnimatedSection>
    </>
  );
}
