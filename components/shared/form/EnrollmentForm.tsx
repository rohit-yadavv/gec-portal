"use client";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EnrollmentSchema } from "@/lib/validation";
import { usePathname } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { createEvent } from "@/lib/actions/enrollment.action"; 
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthProvider";
import { FormProps } from "@/types/components";

const EnrollmentForm = ({ onSubmitSuccess }: FormProps) => {
  const {user} = useAuth();
  const userId = user?._id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const path = usePathname();
  const form = useForm<z.infer<typeof EnrollmentSchema>>({
    resolver: zodResolver(EnrollmentSchema),
    defaultValues: {
      type: "",
      courseCode: "",
      courseName: "",
      desc: "",
      department: "",
      teacher: "",
      sem: 0,
      eligible: "",
      seats: 0,
      courseCredit: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof EnrollmentSchema>) {
    setIsSubmitting(true);
    try {
      await createEvent({
        path,
        eventData: {
          type: values?.type,
          courseCode: values?.courseCode,
          courseName: values?.courseName,
          desc: values?.desc,
          department: values?.department,
          teacher: values?.teacher,
          sem: values?.sem,
          eligible: values?.eligible,
          seats: values?.seats,
          applyBy: values?.applyBy,
          courseCredit: values?.courseCredit,
          uploadedBy: userId,
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
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Form for <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="gec">General Elective Course</SelectItem>
                  <SelectItem value="vac">Value Added Course</SelectItem>
                  {/* <SelectItem value="event">Event</SelectItem> */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Course Code
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus  min-h-[56px] border"
                  placeholder="Enter Course Code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Course Name
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus  min-h-[56px] border"
                  placeholder="Enter Course Name"
                  {...field}
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
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Department
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus  min-h-[56px] border"
                  placeholder="Enter Department"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Faculty
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus  min-h-[56px] border"
                  placeholder="Enter Faculy Name"
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
              <FormLabel className=" text-dark-400 dark:text-light-800">
                For Semester
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="no-focus  min-h-[56px] border"
                  placeholder="Enter Eligible Semester"
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
          name="eligible"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Eligible (Ug/Pg)
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ug">UG</SelectItem>
                  <SelectItem value="pg">PG</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seats"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Seats
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="no-focus  min-h-[56px] border"
                  placeholder="Enter total no of seats"
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
          name="courseCredit"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Course Credit
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="no-focus  min-h-[56px] border"
                  placeholder="Enter total no of credits"
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
          name="desc"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className=" text-dark-400 dark:text-light-800">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus  min-h-[56px] border"
                  placeholder="Write something about course?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="applyBy"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Choose Last Date to Apply</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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

export default EnrollmentForm;
