import { getSelectedContentHTML } from '@/utils/markdownParser'
import { CertificatesImage } from "@/components/CertificatesImages/CertificatesImage";
import aboutUs from "@/public/images/about-us-min.jpg";
import Image from "next/image";

import styles from "./AboutUsDescription.module.scss";

export async function AboutUsDescription() {
  const descriptionPart1 = await getSelectedContentHTML("aboutUsP1", "aboutUs");
  const descriptionPart2 = await getSelectedContentHTML("aboutUsP2", "aboutUs");

  return (
    <div className={styles.about}>
      <Image src={aboutUs} alt="niebieskie pióro przed komputerem" />
      <div className={styles.about__wrapper}>
        <div
          dangerouslySetInnerHTML={{ __html: descriptionPart1 }}
          className={styles.about__description}
        />
        <CertificatesImage />
        <div
          dangerouslySetInnerHTML={{ __html: descriptionPart2 }}
          className={styles.about__description}
        />
      </div>
    </div>
  );
}