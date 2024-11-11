'use client'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import styles from './page.module.scss';
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

export default function KontaktPage() {
    const {register, handleSubmit, formState} = useForm<FormValues>({
        resolver: zodResolver(schema)
    });
    const {errors}= formState;
    console.log(errors)
    const [sendStatus, setSendStatus] = useState({status:0, message:""})
    async function onSubmit(formData:FormValues){
        const status = await sendMail(formData)
        setSendStatus(status)
    }

 
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Imię: </label>
            <input id="name" type="text" placeholder="Podaj Twoje imię" {...register("name")}  />
            <p className={styles.error}>{errors.name?.message}</p>

            <label htmlFor="email">e-mail: </label>
            <input id="email" type="text"placeholder="Podaj Twój adres e-mail" {...register("email")}  />
            <p className={styles.error}>{errors.telephoneOremail?.message || errors.email?.message}</p>

            <label htmlFor="telephone">Telefon: </label>
            <input id="telephone" type="text" placeholder="Podaj Twój numer telefonu" {...register("telephone")}  />
            <p className={styles.error}>{errors.telephone?.message}</p>

            <label htmlFor="message">Wiadomość: </label>
            <textarea id="message" placeholder="Wpisz treść wiadomości" {...register("message")}  />
            <p className={styles.error}>{errors.message?.message}</p>
            
            <input type="checkbox"  id='rodo-permission' {...register("rodo_permission")}/>
            <label htmlFor="rodo-permission">Dane kontaktowe podaję dobrowolnie oraz wyrażam zgodę na kontakt i przetwarzanie danych w celu uzyskania odpowiedzi od SOFT-DATA Marek Szczepkowski, ul. Marii Dąbrowskiej 13/52, 10-685 Olsztyn, zgodnie z regulaminem</label>
            <p className={styles.error}>{errors.rodo_permission?.message}</p>

            <button>Wyślij</button>

        </form>
        {/* Send status */}
        {sendStatus.status!==0 && <p className={sendStatus.status===200 ? styles.success : styles.error}>{sendStatus.message}</p>}
        
        </>
    );
}