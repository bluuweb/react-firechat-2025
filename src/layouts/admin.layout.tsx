import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  // Mostrar loading mientras se verifica el estado de inicio de sesión
  if (status === "loading" || !hasEmitted) {
    return <div>Loading...</div>;
  }

  // Redirigir si el usuario no está autenticado
  if (status === "success" && !signInCheckResult.signedIn) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <AuthenticatedLayout />
    </Suspense>
  );
};
export default AdminLayout;

const AuthenticatedLayout = () => {
  useUser({
    suspense: true,
  });

  return (
    <div className="min-h-screen bg-slate-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};
