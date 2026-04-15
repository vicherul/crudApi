import { useState, useEffect, useCallback } from "react";
import type { Frase, FraseFormData } from "@/schemas/frase-schema";
import { API_ENDPOINTS } from "@/constants/api";

const apiUrl = API_ENDPOINTS.frases;

export function useFrases(){
    const [frases, setFrases] = useState<Frase[]>([])
    const [cargando, setCargando] = useState(true)
    
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

    const agregarFrase = async (data:FraseFormData)=>{
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        await cargarFrases();
    }

    const editarFrase = async(id:string, data: FraseFormData) =>{
        await fetch(`${apiUrl}/${id}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
        await cargarFrases();
    }

    const eliminarFrase = async(id:string) =>{
        if(!window.confirm("¿Seguro que quieres borrar esta frase?")) return;
        await fetch(`${apiUrl}/${id}`, {method: "DELETE"})
        await cargarFrases();
    }

    useEffect(()=>{
        cargarFrases();
    },[cargarFrases])
    return { frases, cargando, agregarFrase, editarFrase, eliminarFrase }
}