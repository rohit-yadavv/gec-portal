// import NoResult from "@/components/shared/NoResult";
import SearchBar from "@/components/shared/SearchBar"; 
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
// import { getAllEvents } from "@/lib/actions/event.action";
// import EventCard from "@/components/shared/card/EventCard";

export const metadata: Metadata = {
  title: "Home | Gec-Portal",
  description: "Portal to register for GEC designed for CUH students",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  // let events = [];

  // try {
  //   const response = await getAllEvents({searchQuery:searchParams.q});
  //   events = JSON.parse(response);
  // } catch (error) {
  //   console.error("Error fetching events:", error); 
  // }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          Upcoming Events
        </h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchBar route="/all-events" />
        {/* <MobileHomeFilters filters={HomePageFilters} /> */}
      </div>
      {/* <HomeFilters /> */}
      <div className="mt-10 flex w-full flex-wrap justify-evenly gap-6 max-sm:p-5">
        {/* {events.length > 0 ? (
          events.map((item: any) => <EventCard key={item._id} event={item} />)
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Currently, there is no GEC, VAC, or any event available to register."
          />
        )} */}
      </div>
      <div className="mt-10"></div>
    </>
  );
}
