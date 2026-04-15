import { z } from "zod"

export const fraseSchema = z.object({
    text: z.string().min(5,"La frase debe tener al menos 5 caracteres"),
    author: z.string().min(2,"El autor es obligatorio"),
    image: z.union([
        z.literal(""),
        z.string().url("La imagen debe ser una URL valida")
    ])
})

export type FraseFormData = z.infer<typeof fraseSchema>

export interface Frase {
    _id: string;
    text: string;
    author: string;
    image?: string;
}