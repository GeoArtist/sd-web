'use client'
import { CompanyInfo } from '@/app/components/CompanyInfo/CompanyInfo';
import  {ContactForm}  from '@/app/components/ContactForm/ContactForm';
import dynamic from 'next/dynamic'
import styles from './ContactView.module.scss'
import { SubPageHeader } from '@/app/components/SubPageHeader/SubPageHeader';
 
const DynamicMap = dynamic(() => import('@/app/components/ContactMap/ContactMap'), {
  ssr: false,
})

export default function ContactView() {
return <>
    <div className={styles.contactHeader}>
      <SubPageHeader title="Kontakt"/>
    </div>
    <div className={styles.contactLayout}>
      <div className={styles.contactLayout__wrapper}>
        <h1>Skontaktuj się z nami!</h1>
        <CompanyInfo/>
      </div>
      <div className={styles.contactLayout__wrapper}>
      <h2>Formularz kontaktowy</h2>
      <ContactForm/>
      </div>
    </div>
    <DynamicMap/>
    </>;

}