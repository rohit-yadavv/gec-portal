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
  isRejected,
  hasApplied,
  event,
}: any) => { 
  return (
    <div className="flex gap-3">
      {user?.teacher ? (
        viewApplicants && (
          <>
            <ViewApplicant enrollmentId={enrollmentId} applicant={applicant} />
            <Accepted isAdmin={true} selected={selected} />
            <DeleteForm enrollmentId={enrollmentId} type="enrollment" />
          </>
        )
      ) : (
        <>  
          <ApplyButton
            user={user}
            event={event}
            isRejected={isRejected}
            isSelected={isSelected}
            selected={selected}
            enrollmentId={enrollmentId}
            hasApplied={hasApplied} 
          />
          {selected.length > 0 && (
            <Accepted isAdmin={false} selected={selected} />
          )} 
        </>
      )}
    </div>
  );
};

export default CardButtons;
