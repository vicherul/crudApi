import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

// Clave persistente para recordar la sesion del usuario en localStorage.
const STORAGE_KEY = "frases_user";

type AuthContextValue = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

// Contexto global de autenticacion consumido por login y dashboard.
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Hidrata usuario guardado para mantener sesion tras recargar la app.
  const [user, setUser] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

  const login = (username: string) => {
    localStorage.setItem(STORAGE_KEY, username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  // Memoiza el valor para evitar renders innecesarios en consumidores.
  const value = useMemo(
    () => ({ user, login, logout }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  // Garantiza que el hook se use dentro de AuthProvider.
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
