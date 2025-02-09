import Link from "next/link";
import { BiMailSend } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";

import styles from "./ContactInfo.module.scss";

export function ContactInfo() {
  return (
    <>
      <section className={styles.contact}>
        <h4>Zadzwoń do nas lub wyślij e-mail</h4>
        <span className={styles.contact__wrapper}>
          <Link href="tel:+48535154251">
            <FaPhoneAlt />
            +48 535 154 251
          </Link>
        </span>
        <span className={styles.contact__wrapper}>
          <Link href="mailto:kontakt@soft-data.pl">
            <BiMailSend />
            kontakt@soft-data.pl
          </Link>
        </span>
      </section>
    </>
  );
}
