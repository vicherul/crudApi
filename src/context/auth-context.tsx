import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "frases_user";

type AuthContextValue = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

  const login = (username: string) => {
    localStorage.setItem(STORAGE_KEY, username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, logout }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
