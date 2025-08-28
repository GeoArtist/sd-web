import { MarkdownOfferContent } from "@/types/markdown";
import { OfferSubCategory } from "@/types/offerCategory";
import Image from "next/image";
import { LegalBasisInfo } from "@/components/LegalBasisInfo/LegalBasisInfo";
import AnimatedSection from "@/components/FrameMotion/FrameMotionSection";

import styles from "./ServiceDescription.module.scss";

export function ServiceDescription({
  md_content,
  offer,
}: {
  md_content: MarkdownOfferContent;
  offer: OfferSubCategory;
}) {
  const { title, description, time, legalBasis } = md_content;
  const { imgUrl, imgAlt } = offer;
  return (
    <>
      <AnimatedSection
        className={styles.serviceDescription}
        animateOnlyFirst={true}
      >
        <h2>{title}</h2>
        <Image src={imgUrl} alt={imgAlt} placeholder="blur" />
        <div className={styles.serviceDescription__wrapper}>
          <h3 className={styles.serviceDescription__name}>Opis usługi:</h3>
          {description.map((line, index) => {
            const boldTextMatch = /\*\*(.*?)\*\*/.exec(line);
            if (boldTextMatch) {
              const parts = line.split(/\*\*(.*?)\*\*/).filter(Boolean);
              return (
                <p
                  key={index}
                  className={
                    line.startsWith("-") ? styles.listItem : styles.paragraph
                  }
                >
                  {parts.map((part, i) =>
                    boldTextMatch[1] === part ? (
                      <span key={i} className={styles.bold}>
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            }
            if (line.startsWith("-")) {
              return (
                <p key={index} className={styles.listItem}>
                  {line}
                </p>
              );
            }
            return (
              <p key={index} className={styles.paragraph}>
                {line}
              </p>
            );
          })}
          {time && (
            <>
              <h3 className={styles.serviceDescription__name}>
                Czas realizacji:
              </h3>
              <p className={styles.paragraph}>{time}</p>
            </>
          )}

          {legalBasis && <LegalBasisInfo legalBasis={legalBasis} />}
        </div>
      </AnimatedSection>
    </>
  );
}
