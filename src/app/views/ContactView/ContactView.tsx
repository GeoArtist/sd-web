import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";

import styles from "./ContactView.module.scss";
import { ContactContent } from "@/app/components/ContactContent/ContactContent";
import { DynamicContactMap } from "@/app/components/ContactMap/ContactMap";

// const DynamicMap = dynamic(
//   () => import("@/app/components/ContactMap/ContactMap"),
//   {
//     ssr: false,
//   }
// );

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
