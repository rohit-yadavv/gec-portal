'use client'
import { Button } from "@/components/ui/button"; 
import { eventRegistration, eventUnRegistration } from "@/lib/actions/event.action"; 
import { sendMail } from "@/lib/mail";
import { compileEventTemplate, formatDate } from "@/lib/utils";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props {
  user: any;
  event:any;
  isSelected:boolean;
  isRejected: boolean; 
  eventId: string;
  hasApplied: string;
  isProfileComplete: boolean;
}

const ApplyButtonEvent = ({
  isRejected,
  isSelected,
  user,
  event,
  eventId,
  hasApplied,
  isProfileComplete, 
}: Props) => { 

  const parsedUser=JSON.parse(user);
  const path = usePathname();
  
  const applyNow = async () => {
    const EventTime=formatDate(event?.eventTime)
    await eventRegistration({ path, userId:parsedUser?._id, eventId });  
    toast("Applied & Email sent successfully");
    await sendMail({
      to: parsedUser?.email,
      name: parsedUser?.name, 
      subject: `Successfully Applied to ${event?.eventName} event`,
      body: compileEventTemplate({name:parsedUser?.name, type:"register", eName:event?.eventName, eTime:EventTime, eVenue:event?.venue}),
    }); 
  };
  const unregisterNow = async () => { 
    const EventTime=formatDate(event?.eventTime)
    await eventUnRegistration({ path, userId:parsedUser?._id, eventId });
    toast("Unregistered & Email sent successfully");

    await sendMail({
      to: parsedUser?.email,
      name: parsedUser?.name, 
      subject: `Successfully UnRegistered for ${event?.eventName} event`,
      body: compileEventTemplate({name:parsedUser?.name, type:"unregister", eName:event?.eventName, eTime:EventTime, eVenue:event?.venue}),
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

export default ApplyButtonEvent;
