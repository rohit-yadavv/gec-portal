"use client";

import { 
  removeSaveEvent,
  saveEvent,
} from "@/lib/actions/user.action";
import { ObjectId } from "mongoose";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface Props {
  userId: ObjectId;
  hasSaved: boolean;
  enrollmentId: ObjectId;
  size: number;
}

const BookMark = ({ userId, enrollmentId, hasSaved, size }: Props) => {
  const path = usePathname();
  const data = { userId, enrollmentId };
  const handleSave = async () => {
    if (!userId) {
      toast("Login in to save it to your collection");
      return;
    }
    if (!hasSaved) {
      hasSaved = !hasSaved;
      await saveEvent({ path, data });
      toast("Event successfully saved in your collection");
    } else {
      await removeSaveEvent({ path, data });
      hasSaved = !hasSaved;
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
