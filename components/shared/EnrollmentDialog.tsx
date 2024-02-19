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

const EnrollmentDialog = ({userId}:any) => {
  const [open, setOpen] = useState(false);

  const handleFormSubmitSuccess = () => {
    setOpen(false);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="card-wrapper min-h-[46px] rounded-lg border px-4 py-3 text-dark-200 hover:border-[#FF7000] hover:bg-light-850 dark:text-light-900 dark:hover:bg-dark-100">
          Post Form
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill Form</DialogTitle>
          <DialogDescription>
            <EnrollmentForm onSubmitSuccess={handleFormSubmitSuccess} userId={userId}/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentDialog;
