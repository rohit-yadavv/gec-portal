"use client";
import { formatDate } from "@/lib/utils";
import CardBadge from "./CardBadge";
import EventCardButton from "./EventCardsButton";
import BookMark from "../BookMark";
import ApplicationStatus from "./ApplicationStatus";
import { getUserByToken } from "@/lib/actions/user.action";
import { EventCardProps } from "@/types/components/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EventCard = ({ event }: EventCardProps) => {
  const { _id, applicant, selected, rejected, uploadedBy } = event;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [parsedUser, setParsedUser] = useState<any>(false);

  useEffect(() => {
    const fetchData = async () => {
      const mongoUser = await getUserByToken();
      if (!mongoUser) return;
      const user = JSON.parse(mongoUser);
      setParsedUser(user);
      const image = new Image();
      image.src = `/api/event/image/${event?._id}`;
      image.onload = () => {
        setImageLoaded(true);
      };
    };

    fetchData();
  }, [event]);

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
          <div className="relative flex h-80 w-full items-center justify-center">
            {imageLoaded ? (
              <picture>
                <img
                  src={`/api/event/image/${event?._id}`}
                  alt="image"
                  className="w-full fill-current object-fill text-gray-800"
                />
              </picture>
            ) : (
              <Skeleton className="size-full" />
            )}
            <div className="custom-scrollbar absolute left-0 top-0 box-border size-full overflow-y-scroll rounded-none bg-light-900 p-5 text-dark-200 opacity-0 transition-all duration-200 ease-in hover:opacity-100 dark:bg-dark-100 dark:text-light-900">
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
