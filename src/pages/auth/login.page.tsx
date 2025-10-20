import CardFooterAuth from "@/components/card-footer-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { loginZodSchema, type LoginZodSchemaType } from "@/lib/zod.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { loading, login } = useAuthActions();

  const form = useForm<LoginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginZodSchemaType) => {
    const response = await login(data);
    if (response.error) {
      console.log(response.error.code);
      if (response.error.code === "auth/invalid-login-credentials") {
        toast.error("Invalid email or password.");
        form.setError("email", {
          type: "manual",
          message: "Invalid email or password.",
        });
        form.setError("password", {
          type: "manual",
          message: "Invalid email or password.",
        });
      } else {
        toast.error("An error occurred while logging in.");
      }
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
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loggin in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooterAuth type="login" loading={loading} />
      </Card>
    </>
  );
};

export default LoginPage;
