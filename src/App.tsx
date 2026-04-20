import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "@/constants/routes";

const LoginPage = lazy(() => import("@/pages/login-page"));
const DashboardPage = lazy(() => import("@/pages/dashboard-page"));

function App() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-slate-700">Cargando vista...</p>}>
      <Routes>
        <Route path={APP_ROUTES.home} element={<Navigate to={APP_ROUTES.login} replace />} />
        <Route path={APP_ROUTES.login} element={<LoginPage />} />
        <Route path={APP_ROUTES.dashboard} element={<DashboardPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.login} replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;