import { featureCards } from "@/constants/featureCards";
import { Card } from "@/components/FeatureCard/FeatureCard";
import bgc from "@/public/images/feature_cards_bgc-min.jpg";
import Image from "next/image";

import styles from "./FeatureCards.module.scss";
import { AnimatedUl } from "@/components/FrameMotion/FrameMotionList";

export function FeatureCards() {
  return (
    <>
      <AnimatedUl className={styles.cards} amount={0.4}>
        <Image
          className={styles.cards__background}
          src={bgc}
          alt="feature cards background"
        />
        {featureCards.map((card) => {
          return (
            <Card
              key={card.title}
              title={card.title}
              icon={card.icon}
              description={card.description}
            />
          );
        })}
      </AnimatedUl>
    </>
  );
}
