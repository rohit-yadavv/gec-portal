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
import ApplyForm from "./form/ApplyForm";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

const ApplyDialog = ({
  userId,
  registerFor, 
}: any) => {
  const [open, setOpen] = useState(false);

  const handleFormSubmitSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      {/* {userId ? ( */}
        <div className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          Apply Now
        </div>
      {/* // ) : ( */}
      {/* //   <Link */}
      {/* //     href="/sign-in" */}
      {/* //     className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900" */}
      {/* //   > */}
      {/* //     LogIn to Apply */}
      {/* //   </Link> */}
      {/* // )} */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill Details to Apply</DialogTitle>
          <DialogDescription>
            <ApplyForm
              onSubmitSuccess={handleFormSubmitSuccess}
              userId={userId}
              registerFor={registerFor}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;
