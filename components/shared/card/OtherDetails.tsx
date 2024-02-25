import React from "react";
import CountCard from "./CountCard";

interface Props {
  seats: number;
  appliedCount: number;
  sem:number;
  credit:number;
}
const OtherDetails = ({ seats, appliedCount, sem, credit }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      <CountCard label="Total Seats" count={seats} isFirst={true} />
      <CountCard label="Total Applied" count={appliedCount} isFirst={false} />
      <CountCard
        label="Seats Left"
        count={seats - appliedCount}
        isFirst={false}
      />
      <CountCard label="For Sem" count={sem} isFirst={false} />
      <CountCard label="Credit" count={credit} isFirst={false} />

    </div>
  );
};

export default OtherDetails;