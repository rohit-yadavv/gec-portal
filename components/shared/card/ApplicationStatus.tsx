import React from "react";

interface Props {
  hasApplied: boolean; 
  isSelected: boolean;
  isRejected: boolean;
  isAdmin: boolean;
}

const ApplicationStatus = ({
  hasApplied, 
  isSelected,
  isRejected,
  isAdmin,
}: Props) => {
  if (isAdmin) { 
    return null;
  }

  return (
    // <div className="absolute right-[30px] top-[-15px]">
    <>
      {hasApplied ? (
        isSelected ? (
          <div className="rounded-md border border-[#2ec971] bg-light-900 px-4 py-2 text-[10px] font-medium leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
            <p className="text-[#2ec971]">Accepted</p>
          </div>
        ) : isRejected ? (
          <div className="rounded-md border border-[#fb5e5e] bg-light-900 px-4 py-2 text-[10px] font-medium uppercase leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
            <p className="text-[#fb5e5e]">Rejected</p>
          </div>
        ) : (
          <div className="rounded-md border border-[#b838cc] bg-light-900 px-4 py-2 text-[10px] font-medium uppercase leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
            <p className="text-[#b838cc]">Status Pending</p>
          </div>
        )
      ) : (
        <div className="rounded-md border border-[#445ee2] bg-light-900 px-4 py-2 text-[10px] font-medium uppercase leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
          <p className="text-[#445ee2]">Not Applied</p>
        </div>
      )}
    {/* </div> */}
      </>
  );
};

export default ApplicationStatus;
