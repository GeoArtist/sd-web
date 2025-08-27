import { OfferMenu } from "@/components/OfferMenu/OfferMenu";
import { SubPageHeader } from "@/components/SubPageHeader/SubPageHeader";
import { OfferFooter } from "@/components/OfferFooter/OfferFooter";

import styles from "./ServiceLayoutView.module.scss";
import AnimatedSection from "@/components/FrameMotion/FrameMotionSection";

export function ServiceLayoutView({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedSection>
        <div className={styles.grid}>
          <div className={styles.header}>
            <SubPageHeader title={"OFERTA"} />
          </div>
          {children}
          <div className={styles.menu}>
            <OfferMenu menuType={"offerMenu"}></OfferMenu>
          </div>
          <div className={styles.footerDescription}>
            <OfferFooter />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
