import { useState, useEffect, useCallback } from "react";
import type { Frase, FraseFormData } from "@/schemas/frase-schema";
import { API_ENDPOINTS } from "@/constants/api";

// Endpoint remoto del CRUD de frases.
const apiUrl = API_ENDPOINTS.frases;

export function useFrases(){
    // Estado local de datos y carga.
    const [frases, setFrases] = useState<Frase[]>([])
    const [cargando, setCargando] = useState(true)
    
    // Lee frases desde la API y normaliza imagen para la UI.
    const cargarFrases = useCallback(async () => {
        try{
            setCargando(true)
            const res = await fetch(apiUrl)
            const data = await res.json()
            setFrases(
                data.map((frase: Frase) => ({
                    ...frase,
                    image: frase.image ?? "",
                }))
            );

        }finally{
            setCargando(false)
        }
    },[])

    // Crea una frase y actualiza la lista local.
    const agregarFrase = async (data:FraseFormData)=>{
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        await cargarFrases();
    }

    // Edita una frase existente y refresca el estado.
    const editarFrase = async(id:string, data: FraseFormData) =>{
        await fetch(`${apiUrl}/${id}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
        await cargarFrases();
    }

    // Pide confirmacion antes de borrar y luego recarga la coleccion.
    const eliminarFrase = async(id:string) =>{
        if(!window.confirm("¿Seguro que quieres borrar esta frase?")) return;
        await fetch(`${apiUrl}/${id}`, {method: "DELETE"})
        await cargarFrases();
    }

    // Carga inicial al montar el hook.
    useEffect(()=>{
        cargarFrases();
    },[cargarFrases])
    return { frases, cargando, agregarFrase, editarFrase, eliminarFrase }
}