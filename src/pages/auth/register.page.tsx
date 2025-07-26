import CardFooterAuth from "@/components/card-footer-auth";
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
import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  registerZodSchema,
  type RegisterZodSchemaType,
} from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterPage = () => {
  const { register, loading } = useAuthActions();

  const form = useForm<RegisterZodSchemaType>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      // photoURL: undefined,
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterZodSchemaType) => {
    const response = await register(values);
    if (response.error) {
      toast.error("Problema al crear la cuenta");
      console.log(response.error.code);
      if (response.error.code === "auth/email-already-in-use") {
        form.setError("email", {
          type: "manual",
          message: "Email is already in use.",
        });
      } else {
        console.error("Registration error:", response.error);
      }
    } else {
      // Handle successful registration, e.g., redirect or show a success message
      console.log("Registration successful", values);
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your display name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
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
                      {...field}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Confirm your password"
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
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth
        type="register"
        loading={loading}
      />
    </Card>
  );
};
export default RegisterPage;
