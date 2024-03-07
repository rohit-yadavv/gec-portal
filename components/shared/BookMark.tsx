"use client";

import {
  removeSaveEnrollment,
  removeSavedEvent,
  saveEnrollment,
  saveEvent,
} from "@/lib/actions/user.action";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { BookMarkProps } from "@/types/components";


const BookMark = ({
  userId,
  enrollmentId,
  hasSaved,
  size,
  formType,
}: BookMarkProps) => {
  const path = usePathname();
  const data = { userId, enrollmentId };
  const handleSave = async () => {
    if (!userId) {
      toast("Login in to save it to your collection");
      return;
    }
    if (!hasSaved) {
      hasSaved = !hasSaved;
      formType === "enrollment" && (await saveEnrollment({ path, data }));
      formType === "event" && (await saveEvent({ path, data }));
      toast("Event successfully saved in your collection");
    } else {
      hasSaved = !hasSaved;
      formType === "enrollment" && (await removeSaveEnrollment({ path, data }));
      formType === "event" && (await removeSavedEvent({ path, data }));
      toast("Event successfully removed from your collection");
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            src={
              hasSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
            width={size}
            height={size}
            alt="upvote"
            className="cursor-pointer"
            onClick={handleSave}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>click to save it in your collection</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookMark;
