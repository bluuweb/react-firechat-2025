import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

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
    <div>
      <Outlet />
    </div>
  );
};
export default AdminLayout;
