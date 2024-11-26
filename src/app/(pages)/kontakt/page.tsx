'use client'
import { CompanyInfo } from '@/app/components/CompanyInfo/CompanyInfo';
import  {ContactForm}  from '@/app/components/ContactForm/ContactForm';
import styles from './page.module.scss'

import dynamic from 'next/dynamic'
 
const DynamicMap = dynamic(() => import('@/app/components/ContactMap/ContactMap'), {
  ssr: false,
})

export default function KontaktPage() {

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