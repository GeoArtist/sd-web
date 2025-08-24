import { OfferMenu } from '@/app/components/OfferMenu/OfferMenu'
import {SubPageHeader} from '@/app/components/SubPageHeader/SubPageHeader'
import { OfferFooter } from "@/app/components/OfferFooter/OfferFooter";

import styles from "./ServiceLayoutView.module.scss";
import FrameMotionSection from "@/app/components/FrameMotion/FrameMotionSection";

export function ServiceLayoutView({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FrameMotionSection>
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
      </FrameMotionSection>
    </>
  );
}