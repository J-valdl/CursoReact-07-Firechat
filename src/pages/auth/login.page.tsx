import { Button } from "@/components/ui/button";
import { useAuthActions } from "../../hooks/use-auth-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const LoginPage = () => {
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
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Sign in to your account or continue with Google
          </CardDescription>
        </CardHeader>
        <CardContent>...</CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLoginWithGoogle}>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginPage;
