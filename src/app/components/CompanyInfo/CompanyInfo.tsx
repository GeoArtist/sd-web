import React from 'react'
import { ContactInfo } from "@/components/ContactInfo/ContactInfo";

import styles from "./CompanyInfo.module.scss";

export function CompanyInfo() {
  return (
    <>
      <article className={styles.companyInfo}>
        <ContactInfo />
        <section className={styles.address}>
          <h4>SOFT-DATA Marek Szczepkowski</h4>
          <p>ul. Marii Dąbrowskiej 13/52</p>
          <p>10-685 Olsztyn</p>
          <p>NIP: 739-387-00-60</p>
          <p>REGON: 281628752</p>
        </section>
      </article>
    </>
  );
}
