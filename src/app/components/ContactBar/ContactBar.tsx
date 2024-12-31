"use client";
import contact from "@/public/images/contact.jpg";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { ContactInfo } from "@/components/ContactInfo/ContactInfo";

import styles from "./ContactBar.module.scss";
import { redirect } from "next/navigation";

export default function ContactBar() {
  return (
    <>
      <div className={styles.contactBar}>
        <Image src={contact} alt="contact-image" />
        <div className={styles.contactBar__info}>
          <ContactInfo color="white" />
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
