import { useAuthActions } from "@/hooks/use-auth-actions";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}

const CardFooterAuth = ({ type, loading }: Props) => {
  const isLogin = type === "login";

  const { loginWithGoogle } = useAuthActions();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      console.log("Login successful");
      toast.success("Login successful"); // Mostrar notificación de éxito
    } else {
      console.error("Login failed:", result.error);
      toast.error(`Login failed: ${result.error}`); // Mostrar notificación de error
    }
  };

  return (
    <CardFooter className="flex flex-col items-center gap-4">
      <Button
        className="w-full"
        onClick={handleLoginWithGoogle}
        disabled={loading}
      >
        <Mail className="mr-2" />
        {isLogin ? "Login with Google" : "Register with Google"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link to={isLogin ? "/auth/register" : "/auth/login"}>
          <Button variant="link" className="p-0 h-auto font-normal">
            {isLogin ? "Register" : "Sign in"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  );
};

export default CardFooterAuth;
