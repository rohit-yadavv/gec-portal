import React from "react";
import CountCard from "./CountCard";

interface Props {
  seats: number;
  appliedCount: number;
}
const Badges = ({ seats, appliedCount }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      <CountCard label="Total Seats" count={seats} isFirst={true} />
      <CountCard label="Total Applied" count={appliedCount} isFirst={false} />
      <CountCard
        label="Seats Left"
        count={seats - appliedCount}
        isFirst={false}
      />
      <CountCard label="For Sem" count={4} isFirst={false} />
      <CountCard label="Credit" count={4} isFirst={false} />

    </div>
  );
};

export default Badges;
