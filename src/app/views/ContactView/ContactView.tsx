import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";
import { ContactContent } from "@/app/components/ContactContent/ContactContent";

import styles from "./ContactView.module.scss";
import { DynamicContactMap } from "@/app/components/ContactMap/DynamicContactMap";

export default function ContactView() {
  return (
    <>
      <div className={styles.contactHeader}>
        <SubPageHeader title="Kontakt" />
      </div>

      <div className={styles.contactLayout}>
        <ContactContent />
      </div>
      <DynamicContactMap />
    </>
  );
}
