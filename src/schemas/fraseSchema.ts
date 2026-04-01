import { z } from "zod"

export const fraseSchema = z.object({
    text: z.string().min(5,"La frase debe tener al menos 5 caracteres"),
    author: z.string().min(2,"El autor es obligatorio")
})

export type FraseFormData = z.infer<typeof fraseSchema>

export interface Frase {
    _id: string;
    text: string;
    author: string;
}