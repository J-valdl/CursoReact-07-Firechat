import { Button } from "@/components/ui/button";
import { useAuthActions } from "../../hooks/use-auth-actions";

const LoginPage = () => {
  const { loginWithGoogle } = useAuthActions();

  return (
    <>
      <h1 className="text-center">LoginPage</h1>
      <Button onClick={loginWithGoogle}>Login with Google</Button>
    </>
  );
};

export default LoginPage;
