import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fraseSchema, type FraseFormData, type Frase } from "@/schemas/frase-schema";
import { useFrases } from "@/hooks/use-frases";
import { useFavorites } from "@/hooks/use-favorites";
import { useEscapeKey } from "@/hooks/use-escape-key";
import { Footer } from "@/components/footer/footer";
import relax from "@/assets/relax.jpg";
import Navbar from "@/components/navbar/navbar";

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { frases, cargando, agregarFrase, editarFrase, eliminarFrase } = useFrases();
  const [uiState, setUiState] = useState(() => ({
    editingId: null as string | null,
    selectedImage: null as string | null,
  }));
  const { toggleFavorite, isFavorite } = useFavorites();
  
  // useRef para el auto-scroll
  const formRef = useRef<HTMLElement>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FraseFormData>({
    resolver: zodResolver(fraseSchema),
  });

  const onSubmit = async (data: FraseFormData) => {
    if (uiState.editingId) {
      await editarFrase(uiState.editingId, data);
      setUiState((prev) => ({ ...prev, editingId: null }));
    } else {
      await agregarFrase(data);
    }
    reset();
  };

  const prepararEdicion = (frase: Frase) => {
    setUiState((prev) => ({ ...prev, editingId: frase._id }));
    setValue("text", frase.text);
    setValue("author", frase.author);
    setValue("image", frase.image ?? "");
    // Hacemos scroll suave hacia el formulario
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setUiState((prev) => ({ ...prev, editingId: null }));
    reset();
  };

  const closeImageModal = useCallback(() => {
    setUiState((prev) => ({ ...prev, selectedImage: null }));
  }, []);

  useEscapeKey(closeImageModal);

  return (
    <div className="min-h-screen bg-[#00969a] p-8">
      <Navbar onLogout={onLogout} />

      <div className="mx-auto max-w-5xl space-y-8 pt-24">
        <section id="about">
          <h1
            className="font-['Gorditas'] font-extrabold tracking-wide text-white"
            style={{ fontSize: "clamp(2.8rem, 6vw, 3.2rem)" }}
          >
            Cabanyal Vibes
          </h1>
          <p className="mt-2 text-white/80">Gestiona frases, imagenes y favoritos desde tu panel.</p>
        </section>

        {/* Tarjetas de Frases */}
        <section id="galeria" className="bg-[#c0ea7c] p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-['Gorditas'] mb-4">Lista de Frases</h2>
          {cargando ? <p>Cargando datos...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {frases.map(({ _id, image, text, author }) => (
                <article key={_id} className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#ffffff] shadow-sm">
                  <div className="group relative h-44 bg-slate-200">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(_id)}
                      aria-label="Marcar como favorita"
                      className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-white/90 p-2 shadow hover:scale-110 transition"
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={isFavorite(_id) ? "#ef4444" : "none"} stroke={isFavorite(_id) ? "#ef4444" : "#334155"} strokeWidth="2">
                        <path d="M12 21s-6.7-4.35-9.2-7.66C.65 10.5 1.3 6.9 4.26 5.28 6.57 4 8.96 4.62 10.5 6.33L12 8l1.5-1.67c1.54-1.71 3.93-2.33 6.24-1.05 2.96 1.62 3.61 5.22 1.46 8.06C18.7 16.65 12 21 12 21z" />
                      </svg>
                    </button>
                    {image ? (
                      <button
                        type="button"
                        onClick={() => setUiState((prev) => ({ ...prev, selectedImage: image }))}
                        className="h-full w-full cursor-pointer"
                        aria-label={`Ver imagen completa de ${author}`}
                      >
                        <img
                          src={image}
                          alt={`Imagen de la frase de ${author}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </button>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="italic text-slate-700 leading-relaxed">"{text}"</p>
                    <p className="mt-3 font-semibold text-slate-900">{author}</p>

                    <div className="mt-auto flex items-center gap-3 pt-5">
                      <button
                        onClick={() => prepararEdicion({ _id, image, text, author })}
                        aria-label="Editar frase"
                        title="Editar"
                        className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#fe5126] text-white shadow-sm transition hover:bg-[#e7471f]"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => eliminarFrase(_id)}
                        aria-label="Eliminar frase"
                        title="Eliminar"
                        className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#fe5126] text-white shadow-sm transition hover:bg-[#e7471f]"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M3 6h18" />
                          <path d="M8 6V4h8v2" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {uiState.selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center"
            onClick={closeImageModal}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={closeImageModal}
                className="absolute -top-3 -right-3 h-10 w-10 cursor-pointer rounded-full bg-white font-bold text-slate-800 shadow"
                aria-label="Cerrar imagen"
              >
                x
              </button>
              <img
                src={uiState.selectedImage}
                alt="Imagen ampliada"
                className="w-full max-h-[85vh] object-contain rounded-xl bg-black/30"
              />
            </div>
          </div>
        )}

        <section>
          <h2
            className="font-['Gorditas'] font-extrabold tracking-wide text-white"
            style={{ fontSize: "clamp(2.8rem, 6vw, 3.2rem)" }}
          >
            Tu Frase
          </h2>
          <p className="mt-2 text-white/80">
            Porque el Cabanyal no se lee, se escucha. Comparte tu rincon favorito.
          </p>
        </section>

        {/* Formulario conectado a useRef */}
        <section id="tu-frase" ref={formRef} className="rounded-xl bg-[#c0ea7c] p-6 shadow-md">
          <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
            <div>
              <h2 className="mb-4 font-['Gorditas'] text-xl font-bold text-slate-800">
                {uiState.editingId ? "Editar Frase" : "Nueva Frase"}
                
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Texto de la frase</label>
                  <input 
                    {...register("text")} 
                    className="w-full rounded-lg bg-slate-100 p-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-slate-400" 
                  />
                  {errors.text && <p className="mt-1 text-sm text-red-600">{errors.text.message}</p>}
                </>

                <>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Autor</label>
                  <input 
                    {...register("author")} 
                    className="w-full rounded-lg bg-slate-100 p-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-slate-400" 
                  />
                  {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>}
                </>

                <>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Imagen (URL)</label>
                  <input
                    {...register("image")}
                    placeholder="https://..."
                    className="w-full rounded-lg bg-slate-100 p-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-slate-400"
                  />
                  {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
                </>

                <div className="flex gap-4 pt-2">
                  <button type="submit" className="cursor-pointer rounded-full bg-slate-300 px-6 py-2 font-bold text-slate-900">
                    {uiState.editingId ? "Actualizar" : "Guardar"}
                  </button>
                  {uiState.editingId && (
                    <button type="button" onClick={cancelarEdicion} className="cursor-pointer rounded-full bg-slate-300 px-6 py-2 font-bold text-slate-900">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-slate-100">
              <img
                src={relax}
                alt="Ilustracion decorativa"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />
            </div>
          </div>
        </section>

        <Footer />

      </div>
    </div>
  );
}