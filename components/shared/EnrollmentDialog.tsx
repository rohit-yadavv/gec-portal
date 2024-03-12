"use client";
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
import Image from "next/image";

const EnrollmentDialog = () => { 
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
            src="/assets/icons/create-form.svg"
            alt="post form"
            width={25}
            height={25}
            className="invert dark:invert-0"
          />
          <p className="block text-[18px] font-medium leading-[25.2px] sm:hidden lg:block">
            Create Gec / Vac
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill Form</DialogTitle>
          <DialogDescription>
            <EnrollmentForm
              onSubmitSuccess={handleFormSubmitSuccess}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentDialog;
