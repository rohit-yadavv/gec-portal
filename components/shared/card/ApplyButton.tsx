"use client";

import { Button } from "@/components/ui/button";
import { registerForEvent } from "@/lib/actions/enrollment.action";
import { ObjectId } from "mongoose";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props {
  userId: ObjectId;
  enrollmentId: ObjectId;
  hasApplied: ObjectId;
  isProfileComplete: boolean;
}

const ApplyButton = ({
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

  if (!userId) {
    return (
      <Link href="/sign-in">
        <Button className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          Login To Apply
        </Button>
      </Link>
    );
  }
  if (!isProfileComplete) {
    return (
      <Link href="/details">
        <Button 
          className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
        >
          Complete Your Profile to Apply
        </Button>
      </Link>
    );
  } 

  if (hasApplied) {
    return (
      <div className="cursor-not-allowed">
        <Button
          disabled
          className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
        >
          Applied
        </Button>
      </div>
    );
  }
  return (
    <Button
      onClick={applyNow}
      className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
    >
      Apply Now
    </Button>
  );
};

export default ApplyButton;
