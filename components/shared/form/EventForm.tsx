"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface Props {
  onSubmitSuccess: () => void;
  userId: string;
}

const EventForm = ({ onSubmitSuccess, userId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [department, setDepartment] = useState("");
  const [eventPoster, setEventPoster] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("eventName", eventName);
      formData.append("eventDesc", eventDesc);
      formData.append("department", department);
      formData.append("eventPoster", eventPoster);
      console.log(formData);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/event`,
        formData
      );
      console.log(response);
      toast("Event has been created.");
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
      toast("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-9 flex w-full flex-col gap-9">
      <Input
        onChange={(e) => setEventName(e.target.value)}
        className="no-focus  min-h-[56px] border"
        placeholder="Enter Event Name"
        required
      />
      <Textarea
        onChange={(e) => setEventDesc(e.target.value)}
        className="no-focus  min-h-[56px] border"
        placeholder="Enter Event Description"
        required
      />
      <Input
        onChange={(e) => setDepartment(e.target.value)}
        className="no-focus  min-h-[56px] border"
        placeholder="Enter Department"
        required
      />
      <Input
        type="file"
        accept="image/*"
        // @ts-ignore
        onChange={(e) => setEventPoster(e.target.files[0])}
        className="no-focus  min-h-[56px] border"
        placeholder="Event Poster"
        required
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
  );
};

export default EventForm;
