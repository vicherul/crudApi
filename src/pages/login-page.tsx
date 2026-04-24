import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "@/components/Login";
import { useAuth } from "@/context/auth-context";
import { APP_ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // Si ya hay sesion activa, evita mostrar el login y manda al dashboard.
  useEffect(() => {
    if (user) {
      navigate(APP_ROUTES.dashboard, { replace: true });
    }
  }, [navigate, user]);

  // El formulario de login recibe el callback de autenticacion desde el contexto.
  return <Login onLogin={login} />;
}
