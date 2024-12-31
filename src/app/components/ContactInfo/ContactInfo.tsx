import Image from "next/image";
import Link from "next/link";
import telephone from "@/public/icons/telephone.svg";
import email from "@/public/icons/email.svg";
import telephoneWhite from "@/public/icons/telephone-white.svg";
import emailWhite from "@/public/icons/email-white.svg";

import styles from "./ContactInfo.module.scss";

export function ContactInfo({ color = "blue" }: { color: "blue" | "white" }) {
  let images = [];
  if (color === "white") {
    images = [telephoneWhite, emailWhite];
  } else {
    images = [telephone, email];
  }

  return (
    <>
      <section className={styles.contact}>
        <h4>Zadzwoń do nas lub wyślij e-mail</h4>
        <span className={styles.contactWay}>
          <Link href="tel:+48535154251">
            <Image src={images[0]} alt="phone" />
            +48 535 154 251
          </Link>
        </span>
        <span className={styles.contactWay}>
          <Link href="mailto:kontakt@soft-data.pl">
            <Image src={images[1]} alt="email" />
            kontakt@soft-data.pl
          </Link>
        </span>
      </section>
    </>
  );
}
