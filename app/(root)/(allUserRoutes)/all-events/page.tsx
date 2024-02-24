import NoResult from "@/components/shared/NoResult";
import SearchBar from "@/components/shared/SearchBar";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import { getAllEvents } from "@/lib/actions/event.action";
import EventCard from "@/components/shared/card/EventCard"; 
import HomeFilters from "@/components/shared/HomeFilters";
import MobileHomeFilters from "@/components/shared/MobileHomeFilters";
import { EventPageFilters } from "@/constants";

export const metadata: Metadata = {
  title: "Home | Gec-Portal",
  description: "Portal to register for GEC designed for CUH students",
};

export default async function Home({ searchParams }: SearchParamsProps) { 
  const events = JSON.parse(
    await getAllEvents({ filter: searchParams.filter, searchQuery: searchParams.q })
  );

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          All Events
        </h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchBar route="/all-events" />
        <MobileHomeFilters filters={EventPageFilters} />
      </div>
      <HomeFilters filters={EventPageFilters}/>
      <div className="mt-11 flex w-full flex-wrap justify-evenly gap-6">
        {events.length > 0 ? (
          events.map((item: any) => <EventCard key={item._id} event={item} />)
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Currently, there is no GEC, VAC, or any event available to register."
          />
        )}
      </div>
      <div className="mt-10"></div>
    </>
  );
}
