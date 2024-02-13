"use client";

import { getUserById, removeSaveEvent, saveEvent } from "@/lib/actions/user.action";
import { ObjectId } from "mongoose";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props {
  userId: ObjectId;
  hasSaved: boolean;
  enrollmentId: ObjectId;
}

const BookMark = ({ userId, enrollmentId, hasSaved }: Props) => {
  const path = usePathname();
  const data = { userId, enrollmentId };
  const handleSave = async () => {

    if(!userId){
        toast("Login in to save it to your collection")
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
    <Image
      src={
        hasSaved
          ? "/assets/icons/star-filled.svg"
          : "/assets/icons/star-red.svg"
      }
      width={18}
      height={18}
      alt="upvote"
      className="cursor-pointer"
      onClick={handleSave}
    />
  );
};

export default BookMark;
