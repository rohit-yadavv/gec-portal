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
import { RegistrationSchema } from "@/lib/validation";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";
import { toast } from "sonner";

interface Params {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Params) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parsedUser = JSON.parse(user);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      name: parsedUser?.name || "",
      rollNo: parsedUser?.rollNo || 0,
      department: parsedUser?.department || "",
      course: parsedUser?.course || "",
      sem: parsedUser?.sem || 0,
    },
  });

  async function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setIsSubmitting(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values?.name,
          rollNo: values?.rollNo,
          department: values?.department,
          course: values?.course,
          sem: values?.sem,
          isProfileComplete: true,
        },
        path: pathname,
      });
      toast("Profile Updated");
      router.push('/');
    } catch (error) {
      console.log(error);
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
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-200 ">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus min-h-[56px] border"
                  placeholder="Enter Your Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rollNo"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-200 ">
                Roll No <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="no-focus min-h-[56px] border"
                  placeholder="Enter Your Roll No"
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(parseInt(event.target.value, 10))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-200 ">
                Department <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus min-h-[56px] border"
                  placeholder="Enter Your Department"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-200 ">
                Course <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus min-h-[56px] border"
                  placeholder="Enter Your Course"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sem"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-200  ">
                Sem <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="no-focus min-h-[56px] border"
                  placeholder="Enter Your Semester"
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(parseInt(event.target.value, 10))
                  }
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
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
