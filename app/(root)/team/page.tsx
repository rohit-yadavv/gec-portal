// import TeamCard from "@/components/shared/card/TeamCard";
import TeamCard from "@/components/shared/card/TeamCard";
import { MentorDetails, TeamDetails } from "@/constants";
import React from "react";

const page = async () => {
  return (
    <>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        The Team
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Meet the incredible team behind GEC Portal
      </p>
      <section className="mt-12 flex flex-col flex-wrap gap-6">
        {/* <div className="flex flex-wrap items-center justify-center gap-6">
          {MentorDetails.map((user) => (
            <TeamCard key={user.name} user={user} />
          ))}
        </div> */}
        <div className="flex flex-wrap items-center justify-start gap-6">
          {MentorDetails.map((user) => (
            <TeamCard key={user.name} user={user} />
          ))}
          {TeamDetails.map((user) => (
            <TeamCard key={user.name} user={user} />
          ))}
        </div>
      </section>
      <section className="mt-12 rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-dark-100 dark:text-light-900">
          Project Spotlight: GEC Portal
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          The GEC Portal was created by Rohit Yadav, a B.Tech CSE student in
          their 2nd year, with invaluable mentorship from Anant Rajee Bara. The
          portal is designed to streamline the management of the GEC community,
          efficiently serving over 5000 students.
        </p>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          It was awarded Best Working Model at Science Day 2024 at the district
          level, showcasing its innovative approach and effectiveness.
        </p>
      </section>
    </>
  );
};

export default page;
