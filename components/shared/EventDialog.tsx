"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
import { useState } from "react"; 
import Image from "next/image";
import EventForm from "./form/EventForm";
import { useAuth } from "@/context/AuthProvider";

const EventDialog = () => {
  const {user} = useAuth();
  const userId = user?._id;
  const [open, setOpen] = useState(false);

  const handleFormSubmitSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {/* <div className="card-wrapper min-h-[46px] rounded-lg border px-4 py-3 text-dark-200 hover:border-[#FF7000] hover:bg-light-850 dark:text-light-900 dark:hover:bg-dark-200"> */}
        <div className="flex items-center justify-start gap-4 rounded-lg border border-transparent bg-transparent p-4 hover:border-[#FF7000]">
          <Image
            src="/assets/icons/create-event.svg"
            alt="post form"
            width={25}
            height={25}
            className="invert dark:invert-0"
          />
          <p className="block text-[18px] font-medium leading-[25.2px] sm:hidden lg:block">
            Post Event
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill Form</DialogTitle>
          <DialogDescription>
            <EventForm
              onSubmitSuccess={handleFormSubmitSuccess}
              userId={userId}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
