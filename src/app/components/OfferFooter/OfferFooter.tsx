import { ContactInfo } from "../ContactInfo/ContactInfo";
import Link from "next/link";

import styles from "./OfferFooter.module.scss";

export default function OfferFooter() {
  return (
    <>
      <div className={styles.offerFooter__wrapper}>
        <h3>Jesteś zainteresowany naszą ofertą? Masz pytania? </h3>
        <Link href="/kontakt">Skontaktuj się z nami!</Link>

        <ContactInfo />
      </div>
    </>
  );
}
