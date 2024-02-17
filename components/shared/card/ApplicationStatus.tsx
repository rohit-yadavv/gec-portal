const ApplicationStatus = ({ hasApplied, userId, selected }: any) => {
  console.log(userId);
  console.log(selected);
  return (
    <div className="absolute right-[50px] top-[-15px]">
      {hasApplied ? (
        selected ? (
          selected.includes(userId) ? (
            <div className="rounded-md border border-[#2ec971] bg-light-900 px-4 py-2 text-[14px] font-medium text-dark-200  dark:bg-dark-100">
              <p className="text-[#2ec971]">Accepted</p>
            </div>
          ) : (
            <div className="rounded-md border border-[#fb5e5e] bg-light-900 px-4 py-2 text-[14px] font-medium uppercase  text-dark-200  dark:bg-dark-100">
              <p className="text-[#fb5e5e]"> Rejected</p>
            </div>
          )
        ) : (
          <div className="rounded-md border border-[#ff9142] bg-light-900 px-4 py-2 text-[14px] font-medium uppercase leading-[13px] text-dark-200  dark:bg-dark-100">
            <p className="text-[#ff9142]"> Status Pending</p>
          </div>
        )
      ) : (
        <div className="rounded-md border border-[#445ee2] bg-light-900 px-4 py-2 text-[14px] font-medium uppercase text-dark-200  dark:bg-dark-100">
          <p className="text-[#445ee2]"> Not Applied</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;
