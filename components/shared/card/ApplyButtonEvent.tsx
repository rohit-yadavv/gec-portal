'use client'
import { Button } from "@/components/ui/button"; 
import { eventRegistration, eventUnRegistration } from "@/lib/actions/event.action"; 
import { ApplyButtonEventProps } from "@/types/components/card";
// import { sendMail } from "@/lib/mail";
// import { compileEventTemplate, formatDate } from "@/lib/utils";
// import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { toast } from "sonner";


const ApplyButtonEvent = ({
  isRejected,
  isSelected,
  user,
  event,
  eventId,
  hasApplied, 
}: ApplyButtonEventProps) => { 
 
  const path = usePathname();
  
  const applyNow = async () => {
    // const EventTime=formatDate(event?.eventTime)
    await eventRegistration({ path, userId:user?._id, eventId });  
    toast("Applied & Email sent successfully");
    // await sendMail({
    //   to: user?.email,
    //   name: user?.name, 
    //   subject: `Successfully Applied to ${event?.eventName} event`,
    //   body: compileEventTemplate({name:user?.name, type:"register", eName:event?.eventName, eTime:EventTime, eVenue:event?.venue}),
    // }); 
  };
  const unregisterNow = async () => { 
    // const EventTime=formatDate(event?.eventTime)
    await eventUnRegistration({ path, userId:user?._id, eventId });
    toast("Unregistered & Email sent successfully");

    // await sendMail({
    //   to: user?.email,
    //   name: user?.name, 
    //   subject: `Successfully UnRegistered for ${event?.eventName} event`,
    //   body: compileEventTemplate({name:user?.name, type:"unregister", eName:event?.eventName, eTime:EventTime, eVenue:event?.venue}),
    // }); 

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
