import HomeFilters from "@/components/shared/HomeFilters";
import MobileHomeFilters from "@/components/shared/MobileHomeFilters";
import NoResult from "@/components/shared/NoResult";
import SearchBar from "@/components/shared/SearchBar";
import EventCard from "@/components/shared/card/EventCard";
import { EventPageFilters } from "@/constants";
import { getSavedEvents } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types"; 

const page = async ({searchParams}:SearchParamsProps) => { 
  const savedEvents = JSON.parse(await getSavedEvents({ searchQuery:searchParams.q ,filter: searchParams.filter}));
  console.log(savedEvents)
  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">Saved Events</h1> 
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"> 
      <SearchBar route="/saved-events/" />
      <MobileHomeFilters filters={EventPageFilters} />
      </div>
      <HomeFilters filters={EventPageFilters}/>
      <div className="mt-10 flex w-full flex-col gap-6">
        {savedEvents?.length > 0 ? (
          savedEvents?.map((item: any) => ( 
            <EventCard key={item._id} event={item} />
          ))
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Click on Star to saved events for later"
          />
        )}
      </div> 
    </>
  );
};

export default page;
