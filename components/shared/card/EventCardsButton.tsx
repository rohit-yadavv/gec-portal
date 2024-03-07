import Accepted from "../acceptedTable/Accepted";
import DeleteForm from "./DeleteForm";
import ApplyButtonEvent from "./ApplyButtonEvent";
import ViewEventApplicant from "../eventTable/ViewEventApplicants";

const EventCardButton = ({
  isRejected,
  isSelected,
  selected,
  event,
  viewApplicants,
  user,
  applicant,
  hasApplied,
  enrollmentId,
}: any) => {
  if(!user) return
  return (
    <div className="flex items-center justify-center gap-3">
      {user?.teacher ? (
        viewApplicants && (
          <>
            <ViewEventApplicant
              enrollmentId={enrollmentId}
              applicant={applicant}
            />
            <Accepted isAdmin={true} selected={selected} />
            <DeleteForm enrollmentId={enrollmentId} type="event" />
          </>
        )
      ) : (
        <>
          <ApplyButtonEvent
            event={event}
            user={user}
            isSelected={isSelected}
            isRejected={isRejected}
            eventId={enrollmentId}
            hasApplied={hasApplied} 
          />
          {selected?.length > 0 && (
            <Accepted isAdmin={false} selected={selected} />
          )}
        </>
      )}
    </div>
  );
};
export default EventCardButton;
