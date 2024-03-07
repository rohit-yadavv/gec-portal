"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { FormProps } from "@/types/components";
import { useAuth } from "@/context/AuthProvider";

const EventForm = ({ onSubmitSuccess }: FormProps) => {
  const {user} = useAuth();
  const userId = user?._id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [department, setDepartment] = useState("");
  const [venue, setVenue] = useState("");
  const [eventPoster, setEventPoster] = useState(""); 

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("eventName", eventName);
      formData.append("eventDesc", eventDesc);
      formData.append("venue", venue);
      formData.append("department", department);
      formData.append("eventTime", eventTime);
      formData.append("eventPoster", eventPoster);
      formData.append("uploadedBy", userId);
      
      await axios.post(
        '/api/event',
        formData
      );
      
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
        onChange={(e) => setVenue(e.target.value)}
        className="no-focus  min-h-[56px] border"
        placeholder="Enter Venue"
        required
      />
      <Input
        type="date"
        onChange={(e) => setEventTime(e.target.value)}
        className="no-focus  min-h-[56px] border"
        placeholder="Enter Venue"
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
          {isSubmitting ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
