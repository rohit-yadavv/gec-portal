"use client";

import { Button } from "@/components/ui/button";
import { registerForEvent } from "@/lib/actions/enrollment.action";
import { ObjectId } from "mongoose";
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
  const applyNow = async () => {
    await registerForEvent({ userId, enrollmentId });
    toast("Applied Successfully");
  };

  if (isProfileComplete) {
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
    } else {
      return (
        <Button
          onClick={applyNow}
          className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
        >
          Apply Now
        </Button>
      );
    }
  }else{
    return (
      <Button
        onClick={applyNow}
        className="rounded-lg primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
      >
        Complete Your Profile to Apply
      </Button>
    );
  }
};

export default ApplyButton;
