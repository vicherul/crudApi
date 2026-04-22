import { z } from "zod"

// Reglas de validacion para el formulario de frases.
export const fraseSchema = z.object({
    text: z.string().min(5,"La frase debe tener al menos 5 caracteres"),
    author: z.string().min(2,"El autor es obligatorio"),
    image: z.union([
        z.literal(""),
        z.string().url("La imagen debe ser una URL valida")
    ])
})

// Tipo inferido a partir del esquema para reutilizar las mismas reglas en TypeScript.
export type FraseFormData = z.infer<typeof fraseSchema>

// Modelo de datos que representa una frase persistida en la API.
export interface Frase {
    _id: string;
    text: string;
    author: string;
    image?: string;
}