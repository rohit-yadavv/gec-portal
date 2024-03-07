"use client";
import { Button } from "@/components/ui/button";
import {
  registerForEnrollment,
  unRegisterForEnrollment, 
} from "@/lib/actions/enrollment.action"; 
import { ApplyButtonProps } from "@/types/components/card";
// import { sendMail } from "@/lib/mail";
// import { compileWelcomeTemplate } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ApplyButton = ({
  selected,
  isSelected,
  user,
  enrollmentId,
  hasApplied,
  event,
  isRejected,
}: ApplyButtonProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const path = usePathname();
  const applyNow = async () => {
    try {
      setIsSubmitting(true);
      await registerForEnrollment({ path, userId: user?._id, enrollmentId });
      toast("Applied");
      // await sendMail({
      //   to: user?.email,
      //   name: user?.name,
      //   subject: `Successfully Applied to ${event?.type} of ${event?.courseName}`,
      //   body: compileWelcomeTemplate({
      //     name: user?.name,
      //     type: event?.type,
      //     cName: event?.courseName,
      //     cId: event?.courseCode,
      //     cDept: event?.department,
      //     action: "register",
      //   }),
      // });
      // toast("Email sent successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const unregisterNow = async () => {
    try {
      setIsSubmitting(true);
      await unRegisterForEnrollment({ path, userId: user?._id, enrollmentId });
      toast("Unregistered");
      // await sendMail({
      //   to: user?.email,
      //   name: user?.name,
      //   subject: `Successfully unregistered from ${event?.type} of ${event?.courseName}`,
      //   body: compileWelcomeTemplate({
      //     name: user?.name,
      //     type: event?.type,
      //     cName: event?.courseName,
      //     cId: event?.courseCode,
      //     cDept: event?.department,
      //     action: "unregister",
      //   }),
      // });
      // toast("Email sent successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (isRejected) {
    return (
      <div className="cursor-not-allowed">
        <Button
          disabled
          className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900"
        >
          Not Selected
        </Button>
      </div>
    );
  }

  if (hasApplied) {
    return (
      <Button
      disabled={isSubmitting}
        onClick={unregisterNow}
        className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900"
      >
         {isSubmitting ? "Unregistering..." : "Unregister"}
      </Button>
    );
  }

  return (
    <Button
      disabled={isSubmitting}
      onClick={applyNow}
      className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900"
    >
      {isSubmitting ? "Applying..." : "Apply Now"}
    </Button>
  );
};

export default ApplyButton;
