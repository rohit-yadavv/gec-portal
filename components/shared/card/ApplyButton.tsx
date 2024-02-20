"use client";

import { Button } from "@/components/ui/button";
import {
  registerForEvent,
  unRegisterForEvent,
} from "@/lib/actions/enrollment.action";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props {
  userId: string;
  isSelected:boolean;
  enrollmentId: string;
  hasApplied: string;
  isProfileComplete: boolean;
  selected: any;
}

const ApplyButton = ({
  selected,
  isSelected,
  userId,
  enrollmentId,
  hasApplied,
  isProfileComplete,
}: Props) => { 
  const path = usePathname();
  const applyNow = async () => {
    await registerForEvent({ path, userId, enrollmentId });
    toast("Applied Successfully");
  };
  const unregisterNow = async () => {
    await unRegisterForEvent({ path, userId, enrollmentId });
    toast("Unregister Successful");
  };

  if (!isProfileComplete) {
    return (
      <Link href="/user-profile/your-details">
        <Button className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900">
          Complete Your Profile to Apply
        </Button>
      </Link>
    );
  }
  if (isSelected) {
    return (
      <div className="cursor-not-allowed">
        <Button
          disabled
          className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900"
        >
          Selected
        </Button>
      </div>
    );
  }

  if (hasApplied) {
    return (
      <Button
        onClick={unregisterNow}
        className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900"
      >
        Unregister
      </Button>
    );
  }

  return (
    <Button
      onClick={applyNow}
      className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900"
    >
      Apply Now
    </Button>
  );
};

export default ApplyButton;
