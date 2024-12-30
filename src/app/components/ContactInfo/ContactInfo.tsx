import styles from "./ContactInfo.module.scss";
import Image from "next/image";
import Link from "next/link";
import telephone from "@/public/icons/telephone.svg";
import email from "@/public/icons/email.svg";

export function ContactInfo() {
  return (
    <>
      <section className={styles.contact}>
        <h4>Zadzwoń do nas lub wyślij e-mail</h4>
        <span className={styles.contactWay}>
          <Image src={telephone} alt="phone" />
          <Link href="tel:+48535154251">+48 535 154 251</Link>
        </span>
        <span className={styles.contactWay}>
          <Image src={email} alt="email" />
          <Link href="mailto:kontakt@soft-data.pl">kontakt@soft-data.pl</Link>
        </span>
      </section>
    </>
  );
}
