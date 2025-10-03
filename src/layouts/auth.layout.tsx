import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  // Mostrar loading mientras se verifica el estado
  if (status === "loading" || !hasEmitted) {
    return <div>Loading....</div>;
  }

  //Redirigir si el usuario esta autenticado
  if (status === "success" && signInCheckResult.signedIn) {
    return <Navigate to="/admin" replace></Navigate>;
  }

  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default AuthLayout;
