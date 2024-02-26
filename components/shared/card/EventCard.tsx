// import Image from "next/image";
import React from "react";
import { formatDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import CardBadge from "./CardBadge";
import EventCardButton from "./EventCardsButton";
import BookMark from "../BookMark";
import ApplicationStatus from "./ApplicationStatus";

const EventCard = async ({ event }: any) => {
  const { _id, applicant, selected, rejected, uploadedBy } = event;
  if (!event) return;
  const { userId } = auth();
  const time = formatDate(event?.eventTime);
  const user = await getUserById({ userId });
  const mongoUser = JSON.parse(user);
  const hasApplied = mongoUser?.appliedEvent.includes(_id);
  const hasSaved = mongoUser?.savedEvents.includes(_id);
  const isAdmin = mongoUser?.admin;
  // @ts-ignore
  const isSelected = selected?.some((user) => user._id === mongoUser?._id);
  const isRejected = rejected?.includes(mongoUser?._id);
  const isUploader = uploadedBy === mongoUser?._id;

  return (
    <>
      <div className="card-wrapper relative flex w-full flex-col gap-3 rounded-md border p-2 sm:max-w-[500px] ">
        <ApplicationStatus
          isAdmin={isAdmin}
          hasApplied={hasApplied}
          isSelected={isSelected}
          isRejected={isRejected}
        />
        <div className="relative mt-6 flex w-full flex-col items-center justify-center overflow-hidden rounded-md ">
          <div className=" relative flex h-80 w-full items-center justify-center">
            <img
              src={`/api/event/image/${event?._id}`}
              // layout="fill"
              // objectFit="fill"
              alt="image"
              className="w-full fill-current object-fill text-gray-800 "
            />
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
              userId={mongoUser?._id}
              hasSaved={hasSaved}
              enrollmentId={_id}
              size={20}
            />
          </div>
          <div className="flex justify-end">
            {isAdmin ? (
              isUploader ? (
                <EventCardButton
                  event={event}
                  selected={selected}
                  applicant={applicant}
                  enrollmentId={_id}
                  user={user}
                  viewApplicants={true}
                  hasApplied={hasApplied}
                  hasSaved={hasSaved}
                />
              ) : (
                <EventCardButton
                  event={event}
                  enrollmentId={_id}
                  user={user}
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
                user={user}
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
