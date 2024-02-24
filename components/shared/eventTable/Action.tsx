"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"; 
import { ObjectId } from "mongoose";
import { usePathname } from "next/navigation";
import { acceptEvent, isUserRejectedInEvent, isUserSelectedInEvent, rejectEvent } from "@/lib/actions/event.action";
import { sendAcceptedEventMail } from "@/lib/utils";

interface Props {
  userId: ObjectId;
  enrollmentId: ObjectId;
}
const Action = ({ userId, enrollmentId }: Props) => {
  const path = usePathname();
  const [isSelected, setIsSelected] = useState();
  const [isRejected, setIsRejected] = useState(); 

  const selected = async () => {
    const res = await isUserSelectedInEvent({ userId, enrollmentId });
    setIsSelected(res);
  };
  const rejected = async () => {
    const res = await isUserRejectedInEvent({ userId, enrollmentId });
    setIsRejected(res);
  };


  useEffect(() => {
    selected();
    rejected(); 
  }, []);

  const handleAccept = async () => {
    await acceptEvent({ path, userId, enrollmentId });
    await sendAcceptedEventMail({userId, enrollmentId, type:"accept"}) 
  };
  const handleReject = async () => {
    await rejectEvent({ path, userId, enrollmentId });
    await sendAcceptedEventMail({userId, enrollmentId, type:"reject"}) 
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAccept}>
          {isSelected ? "Accepted" : "Accept"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleReject}>
          {" "}
          {isRejected ? "Rejected" : "Reject"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
