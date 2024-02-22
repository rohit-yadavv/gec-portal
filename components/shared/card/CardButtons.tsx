import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import ApplyButton from "./ApplyButton";
import Accepted from "../acceptedTable/Accepted";
import ViewApplicant from "../applicantsTable/ViewApplicant";
import DeleteForm from "./DeleteForm";

const CardButtons = ({
  enrollmentId,
  isSelected,
  selected,
  viewApplicants,
  user,
  applicant,
  hasSaved,
  hasApplied,
  event
}: any) => {
  const mongoUser = JSON.parse(user); 
  console.log(selected)
  return (
    <div className="flex gap-3">
      {mongoUser?.admin ? (
        viewApplicants && (
          <>
            <ViewApplicant enrollmentId={enrollmentId} applicant={applicant} />
            <Accepted isAdmin={true} selected={selected} />
            <DeleteForm enrollmentId={enrollmentId} />
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
            <ApplyButton
              user={user}
              event={event}
              isSelected={isSelected}
              selected={selected} 
              enrollmentId={enrollmentId}
              hasApplied={hasApplied}
              isProfileComplete={mongoUser?.isProfileComplete}
            />
            {selected.length > 0 && (
              <Accepted isAdmin={false} selected={selected} />
            )}
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CardButtons;
