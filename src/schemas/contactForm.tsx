
import {z} from 'zod'

export const contactFormSchema = z.object({
    name: z.string().min(1, "Podaj swoje imię"),
    telephone: z.union([z.string().min(9, "Numer telefonu musi mieć przynajmniej 9 cyfr"), z.literal("")]),
    email: z.union([z.string().email("Nieprawidłowy format adresu email"), z.literal("")]),
    message: z.string().min(1, "Wprowadź treść wiadomości"),
    rodo_permission: z.boolean().refine(data => data===true, {message:"Zgoda jest wymagana"})
}).refine(data => data.telephone|| data.email,
    {message:"Podaj email lub nr telefonu", path:["telephoneOremail"]}
)

export type ContactFormValues = z.infer<typeof contactFormSchema> & {telephoneOremail?:string}