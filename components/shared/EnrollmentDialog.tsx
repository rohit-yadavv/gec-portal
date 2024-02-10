'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EnrollmentForm from "./form/EnrollmentForm";
import { useState } from "react";

const EnrollmentDialog = ({ user }: { user: string }) => {
  const [open, setOpen] = useState(false);

  const handleFormSubmitSuccess = () => {
    setOpen(false);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          Post Event
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill Form</DialogTitle>
          <DialogDescription>
            <EnrollmentForm onSubmitSuccess={handleFormSubmitSuccess} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentDialog;
