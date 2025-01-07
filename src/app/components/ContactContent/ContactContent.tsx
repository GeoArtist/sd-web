import { CompanyInfo } from "@/app/components/CompanyInfo/CompanyInfo";
import { ContactForm } from "@/app/components/ContactForm/ContactForm";
import styles from "./ContactContent.module.scss";

export function ContactContent() {
  return (
    <>
      <div className={styles.contactLayout__wrapper}>
        <h2>Skontaktuj się z nami!</h2>
        <CompanyInfo />
      </div>
      <div className={styles.contactLayout__wrapper}>
        <h3>Formularz kontaktowy</h3>
        <ContactForm />
      </div>
    </>
  );
}
