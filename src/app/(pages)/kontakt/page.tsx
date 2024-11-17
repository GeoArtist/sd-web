'use client'
import { CompanyInfo } from '@/app/components/CompanyInfo/CompanyInfo';
import  {ContactForm}  from '@/app/components/ContactForm/ContactForm';


import dynamic from 'next/dynamic'
 
const DynamicMap = dynamic(() => import('@/app/components/ContactMap/ContactMap'), {
  ssr: false,
})

export default function KontaktPage() {

    return <>
    <CompanyInfo/>
    <ContactForm/>

    <DynamicMap/>
    </>;
}