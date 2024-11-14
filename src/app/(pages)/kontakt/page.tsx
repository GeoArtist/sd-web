'use client'
import { CompanyInfo } from '@/components/CompanyInfo/CompanyInfo';
import  {ContactForm}  from '@/components/ContactForm/ContactForm';


import dynamic from 'next/dynamic'
 
const DynamicMap = dynamic(() => import('@/components/ContactMap/ContactMap'), {
  ssr: false,
})

export default function KontaktPage() {

    return <>
    <CompanyInfo/>
    <ContactForm/>

    <DynamicMap/>
    </>;
}