import TeamCard from "@/components/shared/card/TeamCard";
import { MentorDetails, TeamDetails } from "@/constants";
import React from "react";

const page = async () => {
  return (
    <>
      <h1 className=" text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        The Team
      </h1>
      <section className="mt-12 flex flex-col flex-wrap gap-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {MentorDetails.map((user) => (
            <TeamCard key={user.name} user={user} />
          ))}
        </div>
        <div className="flex flex-wrap items-center  justify-center gap-6">
          {TeamDetails.map((user) => (
            <TeamCard key={user.name} user={user} />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
