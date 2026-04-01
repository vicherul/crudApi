import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fraseSchema, type FraseFormData, type Frase } from "../schemas/fraseSchema";
import { useFrases } from "../hooks/useFrases";

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { frases, cargando, agregarFrase, editarFrase, eliminarFrase } = useFrases();
  const [idEditando, setIdEditando] = useState<string | null>(null);
  
  // useRef para el auto-scroll
  const formRef = useRef<HTMLElement>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FraseFormData>({
    resolver: zodResolver(fraseSchema),
  });

  const onSubmit = async (data: FraseFormData) => {
    if (idEditando) {
      await editarFrase(idEditando, data);
      setIdEditando(null);
    } else {
      await agregarFrase(data);
    }
    reset();
  };

  const prepararEdicion = (frase: Frase) => {
    setIdEditando(frase._id);
    setValue("text", frase.text);
    setValue("author", frase.author);
    // Hacemos scroll suave hacia el formulario
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setIdEditando(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navbar */}
        <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
          <h1 className="text-2xl font-black text-slate-800">📚 Gestor de Frases</h1>
          <button onClick={onLogout} className="text-red-600 font-bold hover:underline">
            Cerrar Sesión
          </button>
        </header>

        {/* Tabla de Frases */}
        <section className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-bold mb-4">Lista de Frases</h2>
          {cargando ? <p>Cargando datos...</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-3 border-b">Frase</th>
                    <th className="p-3 border-b">Autor</th>
                    <th className="p-3 border-b text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {frases.map(frase => (
                    <tr key={frase._id} className="hover:bg-slate-50">
                      <td className="p-3 border-b italic">"{frase.text}"</td>
                      <td className="p-3 border-b font-semibold">{frase.author}</td>
                      <td className="p-3 border-b text-center space-x-3">
                        <button onClick={() => prepararEdicion(frase)} title="Editar" className="hover:scale-125 transition">
                          ✏️
                        </button>
                        <button onClick={() => eliminarFrase(frase._id)} title="Eliminar" className="hover:scale-125 transition">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Formulario conectado a useRef */}
        <section ref={formRef} className="bg-slate-800 p-6 rounded-xl shadow-lg text-white">
          <h2 className="text-xl font-bold mb-4">
            {idEditando ? "✏️ Editar Frase" : "➕ Nueva Frase"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-slate-300">Texto de la frase</label>
              <input 
                {...register("text")} 
                className="w-full p-2 rounded bg-slate-700 border border-slate-600 outline-none focus:ring-2 focus:ring-blue-400" 
              />
              {errors.text && <p className="text-red-400 text-sm mt-1">{errors.text.message}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm text-slate-300">Autor</label>
              <input 
                {...register("author")} 
                className="w-full p-2 rounded bg-slate-700 border border-slate-600 outline-none focus:ring-2 focus:ring-blue-400" 
              />
              {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>}
            </div>

            <div className="flex gap-4 pt-2">
              <button type="submit" className="bg-blue-600 px-6 py-2 rounded font-bold hover:bg-blue-500 transition">
                {idEditando ? "Actualizar" : "Guardar"}
              </button>
              {idEditando && (
                <button type="button" onClick={cancelarEdicion} className="bg-slate-600 px-6 py-2 rounded font-bold hover:bg-slate-500 transition">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

      </div>
    </div>
  );
}