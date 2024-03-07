"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoginSchema } from "@/lib/validation";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { getUserByToken, userVerification } from "@/lib/actions/user.action"; 
import { toast } from "sonner";

const SignIn = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsSubmitting(true);
    try {
      const user = {
        email: values?.email,
        password: values?.password,
      };
      const verified = await userVerification(user);
      
      if (verified) {
        const res = await getUserByToken();   
        // @ts-ignore
        const parsedUser = JSON.parse(res);
        setUser(parsedUser);
      } else {
        toast("Invalid Credentials")
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          Login Now
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-9 flex w-full flex-col gap-9"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark-200 dark:text-light-900">
                  Email <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="no-focus min-h-[56px] border"
                    placeholder="Enter Your Email"
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
              <FormItem className="space-y-3.5">
                <FormLabel className="text-dark-200 dark:text-light-900">
                  Password <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="no-focus min-h-[56px] border"
                    placeholder="Enter Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-7 flex justify-end">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="primary-gradient w-fit !text-light-900"
            >
              {isSubmitting ? "Signing..." : "Sign In"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignIn;
