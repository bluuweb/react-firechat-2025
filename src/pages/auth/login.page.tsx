import CardFooterAuth from "@/components/card-footer-auth";

import { useAuthActions } from "@/hooks/use-auth-actions";
import { loginZodSchema, type LoginZodSchemaType } from "@/lib/zod.schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
    if (!response.success) {
      console.log(response);
      if (response.error?.code === "auth/invalid-login-credentials") {
        form.setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });

        form.setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
      return;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account using email and password or with Google.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth
        type="login"
        loading={loading}
      />
    </Card>
  );
};
export default LoginPage;
