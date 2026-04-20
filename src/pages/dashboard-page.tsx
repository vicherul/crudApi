import { Navigate } from "react-router-dom";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/context/auth-context";
import { APP_ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to={APP_ROUTES.login} replace />;
  }

  return <Dashboard onLogout={logout} />;
}
