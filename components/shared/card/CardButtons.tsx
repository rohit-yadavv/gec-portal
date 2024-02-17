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
}: any) => {
  const mongoUser = JSON.parse(user);

  return (
    <div className="flex gap-3">
      {mongoUser?.admin ? (
        viewApplicants && (
          <>
            <ViewApplicant enrollmentId={enrollmentId} applicant={applicant} />
            <Accepted selected={selected} />
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
              isSelected={isSelected}
              selected={selected}
              userId={mongoUser?._id}
              enrollmentId={enrollmentId}
              hasApplied={hasApplied}
              isProfileComplete={mongoUser?.isProfileComplete}
            />
            {selected.length > 0 && <Accepted selected={selected} />}
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CardButtons;
