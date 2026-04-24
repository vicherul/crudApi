import { useEffect } from "react";

// Ejecuta un callback cuando el usuario pulsa la tecla Escape.
export function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    // Listener global que cierra modales o paneles flotantes.
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onEscape]);
}
