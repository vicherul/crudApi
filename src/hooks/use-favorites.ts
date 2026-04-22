import { useState } from "react";

export function useFavorites() {
  // Conjunto de ids favoritos en memoria del navegador.
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());

  // Agrega o quita un elemento de la lista de favoritos.
  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      if (prev.has(id)) {
        return new Set([...prev].filter((itemId) => itemId !== id));
      }

      return new Set([...prev, id]);
    });
  };

  // Consulta rapida para saber si una frase esta marcada como favorita.
  const isFavorite = (id: string) => favoriteIds.has(id);

  return { favoriteIds, toggleFavorite, isFavorite };
}
