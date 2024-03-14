import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Web Overflow",
};

const Loading = () => {
  return (
    <>
      <h1 className=" text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        The Team
      </h1>

      <section className="mt-12 flex flex-col flex-wrap gap-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Skeleton className="h-60 w-full rounded-2xl sm:w-[260px]" />
        </div>
        <div className="flex flex-wrap items-center  justify-center gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton
              key={item}
              className="h-60 w-full rounded-2xl sm:w-[260px]"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Loading;
