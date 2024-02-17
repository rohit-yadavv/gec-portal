import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import ApplyButton from "./ApplyButton";
import Accepted from "../acceptedTable/Accepted";
import BookMark from "../BookMark";
import ViewApplicant from "../applicantsTable/ViewApplicant";
import DeleteForm from "./DeleteForm";

const CardButtons = ({
  enrollmentId,
  selected,
  viewApplicants,
  user,
  applicant,
  hasSaved,
  hasApplied,
}: any) => {
  const mongoUser = JSON.parse(user);

  return (
    <>
      <div className="hidden gap-3 sm:flex">
        {mongoUser?.admin ? (
          viewApplicants && (
            <>
              <ViewApplicant
                enrollmentId={enrollmentId}
                applicant={applicant}
              />
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

      {/* ==================================================================================== */}
      {/* for mobile  */}
      {/* ==================================================================================== */}
      <div className="flex w-full flex-row items-center justify-between sm:hidden">
        <BookMark
          userId={mongoUser?._id}
          hasSaved={hasSaved}
          enrollmentId={enrollmentId}
          size={25}
        />
        {mongoUser?.admin ? (
          viewApplicants && (
            <>
              <ViewApplicant
                enrollmentId={enrollmentId}
                applicant={applicant}
              />
              <Accepted selected={selected} />
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
    </>
  );
};

export default CardButtons;
