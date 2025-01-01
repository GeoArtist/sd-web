'use client'
import { CompanyInfo } from '@/app/components/CompanyInfo/CompanyInfo';
import  {ContactForm}  from '@/app/components/ContactForm/ContactForm';
import dynamic from "next/dynamic";
import { SubPageHeader } from "@/app/components/SubPageHeader/SubPageHeader";

import styles from "./ContactView.module.scss";
 
const DynamicMap = dynamic(() => import('@/app/components/ContactMap/ContactMap'), {
  ssr: false,
})

export default function ContactView() {
return (
  <>
    <div className={styles.contactHeader}>
      <SubPageHeader title="Kontakt" />
    </div>
    <div className={styles.contactLayout}>
      <div className={styles.contactLayout__wrapper}>
        <h2>Skontaktuj się z nami!</h2>
        <CompanyInfo />
      </div>
      <div className={styles.contactLayout__wrapper}>
        <h3>Formularz kontaktowy</h3>
        <ContactForm />
      </div>
    </div>
    <DynamicMap />
  </>
);

}