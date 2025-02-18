"use client";
import contact from "@/public/images/contact-bgc-min.jpg";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { ContactInfo } from "@/components/ContactInfo/ContactInfo";
import { redirect } from "next/navigation";

import styles from "./ContactBar.module.scss";

export function ContactBar() {
  return (
    <>
      <div className={styles.contactBar}>
        <Image src={contact} alt="contact-image" />
        <div className={styles.contactBar__info}>
          <ContactInfo />
          <Button
            type="button"
            onClick={() => redirect("/kontakt")}
            disabled={false}
          >
            Napisz do nas
          </Button>
        </div>
      </div>
    </>
  );
}
