'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import { sendMail } from '@/api/send_email';
import {contactFormSchema, ContactFormValues} from '@/schemas/contactForm'
import styles from './ContactForm.module.scss'

import {useForm} from 'react-hook-form'
import {useState} from 'react';

export function ContactForm() {
    const {register, handleSubmit, formState} = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema)
    });
    const {errors}= formState;
    const [sendStatus, setSendStatus] = useState({status:0, message:""})
    async function onSubmit(formData:ContactFormValues){
        const status = await sendMail(formData)
        setSendStatus(status)
    }

 
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h3>Masz pytania?</h3>
            <h4>Skontaktuj się z nami</h4>
            <label htmlFor="name" className={styles.form__label}>Imię: </label>
            <input id="name" type="text" placeholder="Podaj Twoje imię" {...register("name")} className={styles.form__input} />
            <p className={styles.error}>{errors.name?.message}</p>

            <label htmlFor="email" className={styles.form__label}>Email: </label>
            <input id="email" type="text"placeholder="Podaj Twój adres e-mail" {...register("email")} className={styles.form__input} />
            <p className={styles.error}>{errors.telephoneOremail?.message || errors.email?.message}</p>

            <label htmlFor="telephone" className={styles.form__label}>Telefon: </label>
            <input id="telephone" type="text" placeholder="Podaj Twój numer telefonu" {...register("telephone")} className={styles.form__input} />
            <p className={styles.error}>{errors.telephone?.message}</p>

            <label htmlFor="message" className={styles.form__label}>Wiadomość: </label>
            <textarea id="message" placeholder="Wpisz treść wiadomości" {...register("message")} className={styles.form__textarea} />
            <p className={styles.error}>{errors.message?.message}</p>
            
           
            {/* RODO PERMISSIONS */}
            <div className={styles.form__rodo}>
                <input type="checkbox"  id='rodo-permission' {...register("rodo_permission")} /> 
                <label htmlFor="rodo-permission">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji kontaktu z firmą 
                    <span>SOFT-DATA Marek Szczepkowski</span> 
                    (zgodnie z ustawą z dnia 10 maja 2018r. o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) 
                    oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016r. 
                    w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)). 
                </label>
            <p className={styles.error}>{errors.rodo_permission?.message}</p>
            </div>    
          
            <button>Wyślij</button>
        </form>

        {/* Send status */}
        {sendStatus.status!==0 && <p className={sendStatus.status===200 ? styles.success : styles.error}>{sendStatus.message}</p>}
        
        </>
    );
}