import { Button } from "@/components/ui/button";
import Link from "next/link";
import Accepted from "../acceptedTable/Accepted";
import DeleteForm from "./DeleteForm";
import { SignedIn, SignedOut } from "@clerk/nextjs"; 
import ApplyButtonEvent from "./ApplyButtonEvent";
import ViewEventApplicant from "../eventTable/ViewEventApplicants";

const EventCardButton = ({
  isRejected,
  isSelected,
  selected,
  viewApplicants,
  user,
  applicant,
  hasApplied,
  enrollmentId,
}: any) => {
  const mongoUser = JSON.parse(user); 
  return (
    <div className="flex gap-3"> 
      {mongoUser?.admin ? (
        viewApplicants && (
          <>
            <ViewEventApplicant enrollmentId={enrollmentId} applicant={applicant} />
            <Accepted isAdmin={true} selected={selected} />
            <DeleteForm enrollmentId={enrollmentId} type='event'/>
          </>
        )
      ) : (
        <>
          <SignedOut>
            <Link href="/sign-in">
              <Button className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900">
                Login To Apply
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <ApplyButtonEvent
              user={user} 
              isSelected={isSelected}
              isRejected={isRejected}
              eventId={enrollmentId}
              hasApplied={hasApplied}
              isProfileComplete={mongoUser?.isProfileComplete}
            />
            {selected?.length > 0 && (
              <Accepted isAdmin={false} selected={selected} />
            )}
          </SignedIn>
        </>
      )}
    </div>
  );
};
export default EventCardButton;
