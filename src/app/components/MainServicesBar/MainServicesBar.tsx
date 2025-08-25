import bgcBlue from "@/public/images/bgc-blue-min.jpg";
import Image from "next/image";
import styles from "./MainServicesBar.module.scss";
import {
  AnimatedUl,
  AnimatedLi,
} from "@/components/FrameMotion/FrameMotionList";

export function MainServicesBar() {
  return (
    <>
      <div className={styles.MainServicesBar}>
        <Image
          src={bgcBlue}
          alt="rtk-background"
          className={styles.MainServicesBar__img}
        />
        <AnimatedUl className={styles.MainServicesBar__wrapper}>
          <AnimatedLi>Pozyskiwanie</AnimatedLi>
          <AnimatedLi>Przetwarzanie</AnimatedLi>
          <AnimatedLi>Analizowanie</AnimatedLi>
          <AnimatedLi>Wizualizacja</AnimatedLi>
        </AnimatedUl>
      </div>
    </>
  );
}
