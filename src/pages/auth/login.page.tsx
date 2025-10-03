import { useAuthActions } from "../../hooks/use-auth-actions";

const LoginPage = () => {
  const { loginWithGoogle } = useAuthActions();

  return (
    <>
      <h1>LoginPage</h1>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </>
  );
};

export default LoginPage;
