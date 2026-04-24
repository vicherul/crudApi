import { Navigate } from "react-router-dom";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/context/auth-context";
import { APP_ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  // Pantalla protegida: si no hay usuario, vuelve al login.
  if (!user) {
    return <Navigate to={APP_ROUTES.login} replace />;
  }

  // El dashboard recibe la accion de cierre de sesion desde el contexto.
  return <Dashboard onLogout={logout} />;
}
