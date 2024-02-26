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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { BroadcastSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import {
  getAdminForms,  
  getSelectedGecMail,  
} from "@/lib/actions/enrollment.action";
import { sendMail } from "@/lib/mail";
import { compileBroadcastMail } from "@/lib/utils";
import { getAdminEvents, getSelectedMailEvents } from "@/lib/actions/event.action";

interface Props {
  onSubmitSuccess: () => void;
  userId: string;
}

const BroadcastForm = ({ onSubmitSuccess, userId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allForms, setAllForms] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const getForms = async () => {
    const res = await getAdminForms({ userId });
    const ans = await getAdminEvents({ userId });
    setAllForms(res);
    setAllEvents(ans);
  };

  useEffect(() => {
    getForms();
  }, []);

  const form = useForm<z.infer<typeof BroadcastSchema>>({
    resolver: zodResolver(BroadcastSchema),
    defaultValues: {
      mailToStudentsOf: "",
      subject: "",
      body: "",
    },
  });

  // async function onSubmit(values: z.infer<typeof BroadcastSchema>) {
  //   setIsSubmitting(true);
  //   try {
  //     let resMail;
  //     if (values.mailToStudentsOf.startsWith("event_")) {
  //       // If an event is selected
  //       resMail = await getSelectedEventMail({
  //         eventId: values.mailToStudentsOf,
  //       });
  //     } else {
  //       // If a GEC/VAC is selected
  //       resMail = await getSelectedGecMail({
  //         gecId: values.mailToStudentsOf,
  //       });
  //     }

  //     await sendMail({
  //       name: "GEC PORTAL",
  //       subject: values.subject,
  //       body: compileBroadcastMail(values.body),
  //       to: resMail,
  //     });
  //     toast("Event has been created.");
  //     onSubmitSuccess();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }

  async function onSubmit(values: z.infer<typeof BroadcastSchema>) {
    setIsSubmitting(true);
    try {
      const selectedValue = values.mailToStudentsOf;

      const eventId = selectedValue.replace(/^\D+/g, "");

      let resMail;
      if (selectedValue.startsWith("event_")) {
        resMail = await getSelectedMailEvents({
          eventId,
        });
      } else {
        resMail = await getSelectedGecMail({
          enrollmentId: eventId,
        });
      }

      await sendMail({
        name: "GEC PORTAL",
        subject: values.subject,
        body: compileBroadcastMail(values.body),
        to: resMail,
      });

      toast("Event has been created.");
      onSubmitSuccess();
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
          name="mailToStudentsOf"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-400 dark:text-light-800">
                Mail to Students of: <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <p className="p-3">GECs/VACs : </p>
                  <hr />
                  {allForms.length === 0 ? (
                    <SelectItem disabled>No forms available</SelectItem>
                  ) : (
                    allForms.map((form) => (
                      <SelectItem
                        key={form?.courseId}
                        value={`gec_${form?.courseId}`}
                      >
                        {form?.courseName}
                      </SelectItem>
                    ))
                  )}

                  <p className="p-3">Events : </p>
                  <hr />
                  {allEvents.length !== 0 &&
                    allEvents.map((event) => (
                      <SelectItem
                        key={event?.eventId}
                        value={`event_${event?.eventId}`}
                      >
                        {event?.eventName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-400 dark:text-light-800">
                Subject
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus min-h-[56px] border"
                  placeholder="Write Subject of Message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-dark-400 dark:text-light-800">
                Body
              </FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus min-h-[56px] border"
                  placeholder="Write body of message"
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
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BroadcastForm;
