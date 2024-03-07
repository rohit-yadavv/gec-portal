import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <h1 className=" text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        My Events
      </h1>
      <div className="my-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" /> 
      </div>
      <div className="my-11 flex flex-wrap gap-6">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-[45px] w-[85px] rounded-3xl" />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-80 w-[500px] rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
