import Image from "next/image";
import { offerIcons } from "@/constants/offerIcons";
import wordmap from "@/public/images/world_map-min.jpg";
import {
  AnimatedLi,
  AnimatedUl,
} from "@/components/FrameMotion/FrameMotionList";
import styles from "./OfferIconsCards.module.scss";

export function OfferIconsCards() {
  return (
    <>
      <AnimatedUl className={styles.offerIcons}>
        <Image src={wordmap} alt="world-map" className={styles.background} />
        {offerIcons.map((icon) => {
          return (
            <AnimatedLi
              variantType="fromTop"
              key={icon.title}
              className={styles.offerIcons__wrapper}
            >
              <Image src={icon.icon} alt={icon.title} />
              <h3>{icon.title}</h3>
            </AnimatedLi>
          );
        })}
      </AnimatedUl>
    </>
  );
}
