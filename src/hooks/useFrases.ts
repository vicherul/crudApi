import { useState, useEffect, useCallback } from "react";
import type { Frase, FraseFormData } from '../../schemas/fraseSchema'; 

const API_URL = 'https://api-frases23032026.vercel.app/api/frases'

export function useFrases(){
    const [frases, setFrases] = useState<Frase[]>([])
    const [cargando, setCargando] = useState(true)
    
    const cargarFrases = useCallback(async () => {
        try{
            setCargando(true)
            const res = await fetch(API_URL)
            const data = await res.json()
            setFrases(data);

        }finally{
            setCargando(false)
        }
    },[])

    const agregarFrase = async (data:FraseFormData)=>{
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        await cargarFrases();
    }

    const editarFrase = async(id:string, data: FraseFormData) =>{
        await fetch(`${API_URL}/${id}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
        await cargarFrases();
    }

    const eliminarFrase = async(id:string) =>{
        if(!window.confirm("¿Seguro que quieres borrar esta frase?")) return;
        await fetch(`${API_URL}/${id}`, {method: "DELETE"})
        await cargarFrases();
    }

    useEffect(()=>{
        cargarFrases();
    },[cargarFrases])
    return { frases, cargando, agregarFrase, editarFrase, eliminarFrase }
}