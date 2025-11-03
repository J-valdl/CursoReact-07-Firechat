import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  // Mostrar loading mientras se verifica el estado
  if (status === "loading" || !hasEmitted) {
    return <div>Loading....</div>;
  }

  //Redirigir si el usuario no esta autenticado
  if (status === "success" && !signInCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace></Navigate>;
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthenticatedLayout />
      </Suspense>
    </>
  );
};

export default AdminLayout;

const AuthenticatedLayout = () => {
  useUser({
    suspense: true,
  });

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
