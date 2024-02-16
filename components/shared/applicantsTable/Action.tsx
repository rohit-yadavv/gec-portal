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
import {
  acceptEnrollment,
  isUserSelectedInEnrollment,
  rejectEnrollment,
} from "@/lib/actions/enrollment.action";
import { ObjectId } from "mongoose";
import { usePathname } from "next/navigation";

interface Props {
  userId: ObjectId;
  enrollmentId: ObjectId;
}
const Action = ({ userId, enrollmentId }: Props) => {
  const path = usePathname();
  const [isSelected, setIsSelected] = useState();

  const selected = async () => {
    const res = await isUserSelectedInEnrollment({ userId, enrollmentId });
    setIsSelected(res);
  };

  useEffect(() => {
    selected();
  }, []);

  const handleAccept = async () => {
    await acceptEnrollment({ path, userId, enrollmentId });
  };
  const handleReject = async () => {
    await rejectEnrollment({ path, userId, enrollmentId });
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
        <DropdownMenuItem onClick={handleReject}>Reject</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
