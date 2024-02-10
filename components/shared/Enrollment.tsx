import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "../ui/button";
import EnrollmentForm from "./form/EnrollmentForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";

const Enrollment = async() => {


    // <Profile 
    // clerkId={userId}
    // user={JSON.stringify(mongoUser)}

    const {userId} = auth();
    if(!userId) return null;
    const mongoUser=await getUserById({userId});  
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          Post Event
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill Form</DialogTitle>
          <DialogDescription>
            <EnrollmentForm clerkId={userId} user={JSON.stringify(mongoUser)}/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Enrollment;
