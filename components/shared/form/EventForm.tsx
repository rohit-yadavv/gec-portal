"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import axios from "axios";
import { FormProps } from "@/types/components";
import { useAuth } from "@/context/AuthProvider";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const EventForm = ({ onSubmitSuccess }: FormProps) => {
  const { user } = useAuth();
  const userId = user?._id;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  // const [eventTime, setEventTime] = useState("");
  const [eventTime, setEventTime] = React.useState<Date | undefined>(
    new Date()
  );
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
      // @ts-ignore
      formData.append("eventTime", eventTime);
      formData.append("eventPoster", eventPoster);
      formData.append("uploadedBy", userId);

      await axios.post("/api/event", formData);

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
      <div>
        <Label htmlFor="name">Event Name</Label>
        <Input
          id="name"
          onChange={(e) => setEventName(e.target.value)}
          className="no-focus  min-h-[56px] border"
          placeholder="Enter Event Name"
          required
        />
      </div>
      <div>
        <Label htmlFor="desc">Event Description</Label>
        <Textarea
          id="desc"
          onChange={(e) => setEventDesc(e.target.value)}
          className="no-focus  min-h-[56px] border"
          placeholder="Write something about event"
          required
        />
      </div>
      <div>
        <Label htmlFor="department">Organizer</Label>
        <Input
          id="department"
          onChange={(e) => setDepartment(e.target.value)}
          className="no-focus  min-h-[56px] border"
          placeholder="enter department (organizer)"
          required
        />
      </div>
      <div>
        <Label htmlFor="venue">Venue</Label>
        <Input
          id="venue"
          onChange={(e) => setVenue(e.target.value)}
          className="no-focus  min-h-[56px] border"
          placeholder="Place of event"
          required
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="date">Event Date</Label>
        {/* <Input
          type="date"
          onChange={(e) => setEventTime(e.target.value)}
          className="no-focus  min-h-[56px] border"
          placeholder="Enter Time For Event"
          required
        />
       */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              aria-required
              variant={"outline"}
              className="w-[240px] pl-3 text-left font-normal"
            >
              {/* {eventTime || <span>Select Event Date</span>} */}
              {eventTime ? format(eventTime, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto size-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              id="date"
              mode="single"
              selected={eventTime}
              onSelect={setEventTime}
              disabled={(date) => date < new Date()}
              initialFocus
              required
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="file">Upload </Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          // @ts-ignore
          onChange={(e) => setEventPoster(e.target.files[0])}
          className="no-focus  min-h-[56px] border"
          placeholder="Event Poster"
          required
        />
      </div>
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
