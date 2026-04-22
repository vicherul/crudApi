// Devuelve el ano actual, reutilizable en componentes de pie de pagina o metadatos.
export const getCurrentYear = (date: Date = new Date()): number => {
	return date.getFullYear()
}