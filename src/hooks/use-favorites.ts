import { useState } from "react";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      if (prev.has(id)) {
        return new Set([...prev].filter((itemId) => itemId !== id));
      }

      return new Set([...prev, id]);
    });
  };

  const isFavorite = (id: string) => favoriteIds.has(id);

  return { favoriteIds, toggleFavorite, isFavorite };
}
