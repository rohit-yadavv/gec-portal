// @ts-nocheck
"use client";
import * as z from "zod";
import { toast } from "sonner";
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
import { ChangePassword } from "@/lib/validation";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/lib/actions/user.action";
import { FormProps } from "@/types/components";

const ChangePasswordForm = ({ onSubmitSuccess }: FormProps) => {
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof ChangePassword>>({
    resolver: zodResolver(ChangePassword),
  });

  async function onSubmit(values: z.infer<typeof ChangePassword>) {
    setIsSubmitting(true);
    try {
      const res = await changePassword({
        userId: user?._id,
        currentPassword: values?.currentPassword,
        newPassword: values?.newPassword,
      });
      if (res.success) {
        toast(res.message);
        onSubmitSuccess();
      } else {
        toast(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-400 dark:text-light-800">
                Current Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="no-focus min-h-[56px] border"
                  placeholder="Enter Your Current Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          type="password"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-400 dark:text-light-800">
                New Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="no-focus min-h-[56px] border"
                  placeholder="Enter Your New Password"
                  {...field}
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
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-400 dark:text-light-800">
                Confirm New Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="no-focus min-h-[56px] border"
                  placeholder="Enter Your New Password Again to Confirm"
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
            {isSubmitting ? "Changing..." : "Change Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
