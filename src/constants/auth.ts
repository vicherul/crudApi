// Credenciales locales usadas por el login del proyecto.
export const userCredentials = {
	admin: "admin123",
	alumno: "victor",
	profesor: "alberto",
} as const;

// Union de usuarios validos, derivada automaticamente de la lista de credenciales.
export type AllowedUser = keyof typeof userCredentials;
