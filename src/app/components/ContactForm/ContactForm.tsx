'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import { sendMail } from '@/api/send_email';
import {contactFormSchema, ContactFormValues} from '@/schemas/contactForm'
import styles from './ContactForm.module.scss'
import { toast } from 'sonner';
import {useForm} from 'react-hook-form'
import Button from '../Button/Button';

export function ContactForm() {

    const {register, handleSubmit, formState, getValues, reset} = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        mode:"onChange"

    });
    const {errors,isDirty, isSubmitting}= formState;
    
    async function onSubmit(formData:ContactFormValues){
        toast.info('Wysyłanie wiadomości...')
        const status = await sendMail(formData)
        if(status.status===200){
            reset()
            toast.success('Wiadomość została wysłana')}
        else{
            toast.error('Wysłanie wiadomości nie powiodło się')
        }
    }
    

    console.log(isDirty)
    const isEmailOrTelephone = getValues('email')?.length==0 && getValues('telephone')?.length==0   
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
                <label htmlFor="name" className={styles.form__label}>Imię: </label>
                <input id="name" type="text" placeholder="" {...register("name")} className={`${styles.form__input} ${errors.name ? styles.invalid : styles.valid }`} />
                <p className={styles.error}>{errors.name?.message}</p>
            </div>  
            <div>
                <label htmlFor="email" className={styles.form__label}>Email: </label>
                <input id="email" type="text" placeholder="" {...register("email")}  className={`${styles.form__input} ${(errors.email || isEmailOrTelephone && errors.telephoneOremail) ? styles.invalid : styles.valid }`} />
                <p className={styles.error}>{errors.email?.message}</p>
            </div>
            <div>
                <label htmlFor="telephone" className={styles.form__label}>Telefon: </label>
                <input id="telephone" type="text" placeholder="" {...register("telephone")} className={`${styles.form__input} ${(errors.telephone || isEmailOrTelephone && errors.telephoneOremail) ? styles.invalid : styles.valid }`} />
                <p className={styles.error}>{errors.telephone?.message}</p>
                <p className={styles.error}>{(isEmailOrTelephone || !errors.telephoneOremail ? errors.telephoneOremail?.message: '') }</p>
            </div>
             <div>
                <label htmlFor="message" className={styles.form__label}>Wiadomość: </label>
                <textarea id="message" placeholder="" {...register("message")} className={`${styles.form__textarea} ${errors.message ? styles.invalid : styles.valid }`} />
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

            <Button type="submit" disabled={!isDirty || isSubmitting}>Wyślij</Button>

        </form>

        
        </>
    );
}