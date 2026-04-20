//credenciales de usuario para el login
export const userCredentials = {
	admin: "admin123",
	alumno: "victor",
	profesor: "alberto",
} as const;

export type AllowedUser = keyof typeof userCredentials;
