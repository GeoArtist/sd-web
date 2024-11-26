'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import { sendMail } from '@/api/send_email';
import {contactFormSchema, ContactFormValues} from '@/schemas/contactForm'
import styles from './ContactForm.module.scss'

import {useForm} from 'react-hook-form'
import {useState} from 'react';
import Button from '../Button/Button';

export function ContactForm() {
    const [sendStatus, setSendStatus] = useState({status:0, message:""})
    const {register, handleSubmit, formState, getValues} = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        mode:"onChange"

    });
    const {errors}= formState;
    
    async function onSubmit(formData:ContactFormValues){
        const status = await sendMail(formData)
        setSendStatus(status)
    }
 

    console.log(errors)
    const isEmailOrTelephone = getValues('email')?.length==0 && getValues('telephone')?.length==0   
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
                <label htmlFor="name" className={styles.form__label}>Imię: </label>
                <input id="name" type="text" placeholder="Podaj Twoje imię" {...register("name")} className={`${styles.form__input} ${errors.name ? styles.invalid : styles.valid }`} />
                <p className={styles.error}>{errors.name?.message}</p>
            </div>  
            <div>
                <label htmlFor="email" className={styles.form__label}>Email: </label>
                <input id="email" type="text"placeholder="Podaj Twój adres e-mail" {...register("email")}  className={`${styles.form__input} ${(errors.email || isEmailOrTelephone) ? styles.invalid : styles.valid }`} />
                <p className={styles.error}>{errors.email?.message}</p>
            </div>
            <div>
                <label htmlFor="telephone" className={styles.form__label}>Telefon: </label>
                <input id="telephone" type="text" placeholder="Podaj Twój numer telefonu" {...register("telephone")} className={`${styles.form__input} ${(errors.telephone || isEmailOrTelephone) ? styles.invalid : styles.valid }`} />
                <p className={styles.error}>{errors.telephone?.message}</p>
                <p className={styles.error}>{(isEmailOrTelephone || !errors.telephoneOremail ? errors.telephoneOremail?.message: '') }</p>
            </div>
             <div>
                <label htmlFor="message" className={styles.form__label}>Wiadomość: </label>
                <textarea id="message" placeholder="Wpisz treść wiadomości" {...register("message")} className={`${styles.form__textarea} ${errors.message ? styles.invalid : styles.valid }`} />
                <p className={styles.error}>{errors.message?.message}</p>
            </div>
           
            
           
            {/* RODO PERMISSIONS */}
            <div className={styles.form__rodo}>
                <div>
                    <input type="checkbox"  id='rodo-permission' {...register("rodo_permission")} /> 
                <label htmlFor="rodo-permission">
                    Wyrażam zgodę na przetwarzanie danych osobowych do celów marketingowych
                </label>
                </div>
            <p className={styles.error}>{errors.rodo_permission?.message}</p>
            </div>    

            <Button type="submit">Wyślij</Button>
        </form>

        {/* Send status */}
        {sendStatus.status!==0 && <p className={sendStatus.status===200 ? styles.success : styles.error}>{sendStatus.message}</p>}
        
        </>
    );
}