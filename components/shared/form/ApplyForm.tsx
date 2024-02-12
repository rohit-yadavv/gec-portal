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

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RegistrationSchema } from "@/lib/validation";
import { usePathname } from "next/navigation"; 
import { createRegistration } from "@/lib/actions/registration.action";
import { ObjectId } from "mongoose";

interface Props {
  onSubmitSuccess: () => void;
  userId: ObjectId; 
  registerFor:ObjectId;
}

// name: { type: String },
// rollNo: { type: Number },
// department: { type: String },
// course: { type: String },
// sem: { type: Number },
// registerFor: { type: Schema.Types.ObjectId, ref: "Enrollment" },
// registeredAt: { type: Date, default: Date.now()}, 

const ApplyForm = ({ onSubmitSuccess, userId, registerFor }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const path = usePathname();

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      name: "",
      rollNo: 0,
      department: "",
      course: "",
      sem: 0,
    },
  });
  
  async function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setIsSubmitting(true);
    try { 
      await createRegistration({
        path,
        userId:userId, 
        registrationData: {
          name: values?.name, 
          rollNo: values?.rollNo,
          department: values?.department,
          course: values?.course,
          sem: values?.sem,
          registerFor:registerFor,
        },
      });
      toast("Event has been created.");
      onSubmitSuccess();
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
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
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
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Roll No
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
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
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Department
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
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
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Course
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
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
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Sem
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
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

export default ApplyForm;
