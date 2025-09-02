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
import { useForm } from "react-hook-form";
import { loginFormSchema, type LoginFormValues } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SignInForm = () => {
  const { signIn } = UseAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function handleLogin(formData: LoginFormValues) {
    setIsLoading(true);
    try {
      const res = await signIn(formData);

      if (res?.responseCode === "20000") {
        toast.success("Login Berhasil", {
          richColors: true,
          position: "top-right",
        });
      }
    } catch {
      toast.error("Login Gagal", {
        description: "Nomor handphone atau password salah",
        richColors: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
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

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <p>Sign In</p>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
