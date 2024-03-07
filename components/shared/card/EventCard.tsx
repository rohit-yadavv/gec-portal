import { formatDate } from "@/lib/utils";
import CardBadge from "./CardBadge";
import EventCardButton from "./EventCardsButton";
import BookMark from "../BookMark";
import ApplicationStatus from "./ApplicationStatus";
import { getUserByToken } from "@/lib/actions/user.action";
import { EventCardProps } from "@/types/components/card";
const EventCard = async ({ event }: EventCardProps) => {
  const { _id, applicant, selected, rejected, uploadedBy } = event;

  const user = await getUserByToken();
  if (!event && !user) return;
  // @ts-ignore
  const parsedUser = JSON.parse(user);
  const time = formatDate(event?.eventTime);
  const hasApplied = parsedUser?.appliedEvent?.includes(_id);
  const hasSaved = parsedUser?.savedEvents?.includes(_id);
  const isTeacher = parsedUser?.teacher;
  const isSelected = selected?.some(
    // @ts-ignore
    (parsedUser) => parsedUser._id === parsedUser?._id
  );
  const isRejected = rejected?.includes(parsedUser?._id);
  const isUploader = uploadedBy === parsedUser?._id;

  return (
    <>
      <div className="card-wrapper relative flex w-full flex-col gap-3 rounded-md border p-2 sm:max-w-[500px] ">
        <div className="absolute right-[30px] top-[-15px] flex w-max flex-row gap-3">
          <ApplicationStatus
            isTeacher={isTeacher}
            hasApplied={hasApplied}
            isSelected={isSelected}
            isRejected={isRejected}
          />
        </div>
        <div className="relative mt-6 flex w-full flex-col items-center justify-center overflow-hidden rounded-md ">
          <div className=" relative flex h-80 w-full items-center justify-center">
            <picture>
              <img
                src={`/api/event/image/${event?._id}`}
                // layout="fill"
                // objectFit="fill"
                alt="image"
                className="w-full fill-current object-fill text-gray-800 "
              />
            </picture>
            <div className="custom-scrollbar absolute left-1/2 top-1/2 box-border size-full -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] overflow-y-scroll  bg-light-900 p-5 text-dark-200 opacity-0 transition-all duration-200 ease-in hover:rotate-0 hover:opacity-100 dark:bg-dark-100 dark:text-light-900 ">
              <h1 className="m-0 text-2xl font-bold">{event?.eventName}</h1>
              <div className="flex gap-3">
                <CardBadge
                  value={event?.venue}
                  desc={`venue - ${event?.venue}`}
                />
                <CardBadge value={time} desc={`Time - ${time}`} />
                <CardBadge
                  value={event?.department}
                  desc={`Organized By - ${event?.department}`}
                />
              </div>
              <div className="mt-2 max-h-32 text-base leading-5 ">
                <p>{event?.eventDesc}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="hidden items-center justify-center sm:flex">
            <BookMark
              formType="event"
              userId={parsedUser?._id}
              hasSaved={hasSaved}
              enrollmentId={_id}
              size={20}
            />
          </div>
          <div className="flex justify-end">
            {isTeacher ? (
              isUploader ? (
                <EventCardButton
                  event={event}
                  selected={selected}
                  applicant={applicant}
                  enrollmentId={_id}
                  user={parsedUser}
                  viewApplicants={true}
                  hasApplied={hasApplied}
                  hasSaved={hasSaved}
                />
              ) : (
                <EventCardButton
                  event={event}
                  enrollmentId={_id}
                  user={parsedUser}
                  hasSaved={hasSaved}
                />
              )
            ) : (
              <EventCardButton
                event={event}
                isSelected={isSelected}
                isRejected={isRejected}
                selected={selected}
                applicant={applicant}
                enrollmentId={_id}
                user={parsedUser}
                viewApplicants={false}
                hasApplied={hasApplied}
                hasSaved={hasSaved}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
