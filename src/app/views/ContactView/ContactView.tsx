'use client'
import { CompanyInfo } from '@/app/components/CompanyInfo/CompanyInfo';
import  {ContactForm}  from '@/app/components/ContactForm/ContactForm';
import dynamic from 'next/dynamic'
import styles from './ContactView.module.scss'
 
const DynamicMap = dynamic(() => import('@/app/components/ContactMap/ContactMap'), {
  ssr: false,
})

export default function ContactView() {
return <>
    <div className={styles.contact__layout}>
      <div>
        <h1>Skontaktuj się z nami!</h1>
        <CompanyInfo/>
      </div>
      <div>
      <h2>Formularz kontaktowy</h2>
      <ContactForm/>
      </div>
    </div>
    <DynamicMap/>
    </>;

}