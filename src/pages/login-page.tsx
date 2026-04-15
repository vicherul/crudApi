import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "@/components/login";
import { useAuth } from "@/context/auth-context";
import { APP_ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(APP_ROUTES.dashboard, { replace: true });
    }
  }, [navigate, user]);

  return <Login onLogin={login} />;
}
