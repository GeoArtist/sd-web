import { ContactInfo } from "../ContactInfo/ContactInfo";
import Link from "next/link";

import styles from "./OfferFooter.module.scss";

export default function OfferFooter() {
  return (
    <>
      <div className={styles.wrapper}>
        <h3>Jesteś zainteresowny tą, lub zupełnie inną usługą?</h3>
        <Link href="/kontakt">Skontaktuj się z nami!</Link>

        <ContactInfo color="blue" />
      </div>
    </>
  );
}
