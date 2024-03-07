import { ApplicationStatusProps } from "@/types/components/card";
import React from "react";

const ApplicationStatus = ({
  hasApplied,
  isSelected,
  isRejected,
  isTeacher,
}: ApplicationStatusProps) => {
  if (isTeacher) {
    return null;
  }

  if (isSelected) {
    return (
      <div className="rounded-md border border-[#2ec971] bg-light-900 px-4 py-2 text-[10px] font-medium leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
        <p className="text-[#2ec971]">Accepted</p>
      </div>
    );
  }
  if (isRejected) {
    return (
      <div className="rounded-md border border-[#fb5e5e] bg-light-900 px-4 py-2 text-[10px] font-medium uppercase leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
        <p className="text-[#fb5e5e]">Rejected</p>
      </div>
    );
  }

  if (hasApplied) {
    return (
      <div className="rounded-md border border-[#b838cc] bg-light-900 px-4 py-2 text-[10px] font-medium uppercase leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
        <p className="text-[#b838cc]">Status Pending</p>
      </div>
    );
  }
  return (
    <div className="rounded-md border border-[#445ee2] bg-light-900 px-4 py-2 text-[10px] font-medium uppercase leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
      <p className="text-[#445ee2]">Not Applied</p>
    </div>
  );
};

export default ApplicationStatus;
