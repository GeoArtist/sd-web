'use client'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import styles from './ContactForm.module.scss'
import {useState} from 'react';
import { sendMail } from '@/app/api/send_email';

const schema = z.object({
    name: z.string().min(1, "Podaj swoje imię"),
    telephone: z.union([z.string().min(9, "Numer telefonu musi mieć przynajmniej 9 cyfr"), z.literal("")]),
    email: z.union([z.string().email("Nieprawidłowy format adresu email"), z.literal("")]),
    message: z.string().min(1, "Wprowadź treść wiadomości"),
    rodo_permission: z.boolean().refine(data => data===true, {message:"Zgoda na kontakt i przetwarzanie danych jest wymagana"})
}).refine(data => data.telephone|| data.email,
    {message:"Podaj przynajmniej jeden sposób kontaktu", path:["telephoneOremail"]}
)

type FormValues = z.infer<typeof schema> & {telephoneOremail?:string}

export function ContactForm() {
    const {register, handleSubmit, formState} = useForm<FormValues>({
        resolver: zodResolver(schema)
    });
    const {errors}= formState;
    const [sendStatus, setSendStatus] = useState({status:0, message:""})
    async function onSubmit(formData:FormValues){
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