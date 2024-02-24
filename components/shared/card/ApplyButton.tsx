'use client'
import { Button } from "@/components/ui/button";
import {
  registerForEvent,
  unRegisterForEvent,
} from "@/lib/actions/enrollment.action";
import {  sendMail } from "@/lib/mail";
import { compileWelcomeTemplate } from "@/lib/utils";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props {
  user: any;
  isSelected:boolean;
  isRejected:boolean;
  enrollmentId: string;
  hasApplied: string;
  isProfileComplete: boolean;
  selected: any;
  event:any;
}

const ApplyButton = ({
  selected,
  isSelected,
  user,
  enrollmentId,
  hasApplied,
  isProfileComplete,
  event,
  isRejected
}: Props) => { 
console.log(event)
  const parsedUser=JSON.parse(user);
  const path = usePathname();
  const applyNow = async () => {
    await registerForEvent({ path, userId:parsedUser?._id, enrollmentId }); 
    toast("Applied & Email sent successfully");
    await sendMail({
      to: parsedUser?.email,
      name: parsedUser?.name,
      subject: `Successfully Applied to ${event?.type} of ${event?.courseName}`,
      body: compileWelcomeTemplate({name:parsedUser?.name, type:event?.type, cName:event?.courseName, cId:event?.courseCode, cDept:event?.department, action:"register"}),
    }); 
  };
  const unregisterNow = async () => { 
    await unRegisterForEvent({ path, userId:parsedUser?._id, enrollmentId });
    toast("Unregisterd & Email sent successfully");
    await sendMail({
      to: parsedUser?.email,
      name: parsedUser?.name,
      subject: `Successfully unregistered from ${event?.type} of ${event?.courseName}`,
      body: compileWelcomeTemplate({name:parsedUser?.name, type:event?.type, cName:event?.courseName, cId:event?.courseCode, cDept:event?.department, action:"unregister"}),
    }); 
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
