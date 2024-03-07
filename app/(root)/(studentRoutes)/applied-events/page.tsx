import HomeFilters from "@/components/shared/HomeFilters";
import MobileHomeFilters from "@/components/shared/MobileHomeFilters";
import NoResult from "@/components/shared/NoResult";
import SearchBar from "@/components/shared/SearchBar"; 
import EventCard from "@/components/shared/card/EventCard";
import { HomePageFilters } from "@/constants";
import { getAppliedEvents } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

const page = async ({ searchParams }: SearchParamsProps) => {

  const appliedEvents = JSON.parse(
    await getAppliedEvents({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
    })
  );
  
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          All Applied Events
        </h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchBar route="/applied" />
        <MobileHomeFilters filters={HomePageFilters} />
      </div>
      <HomeFilters filters={HomePageFilters} /> 
      <div className="mt-11 flex w-full flex-wrap justify-evenly gap-6">
        {appliedEvents?.length > 0 ? (
          appliedEvents?.map((item: any) => (
            <>
              <EventCard event={item} />
            </>
          ))
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Applied Events by you will be shown here "
          />
        )}
      </div>
    </>
  );
};

export default page;
