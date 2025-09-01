import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseAppContext } from "@/context/UseAppContext";
import React from "react";
import { useForm } from "react-hook-form";
import { loginFormSchema, type LoginFormValues } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const SignInForm = () => {
  const { signIn } = UseAppContext();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function handleLogin(formData: LoginFormValues) {
    try {
      await signIn(formData);
    } catch (error) {
      console.error("Login Failed", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
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
                <Input type="password" placeholder="Your Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
