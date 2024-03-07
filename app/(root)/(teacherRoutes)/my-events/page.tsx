import HomeFilters from "@/components/shared/HomeFilters";
import MobileHomeFilters from "@/components/shared/MobileHomeFilters";
import NoResult from "@/components/shared/NoResult";
import SearchBar from "@/components/shared/SearchBar";
import EventCard from "@/components/shared/card/EventCard";
import { EventPageFilters } from "@/constants"; 
import { getUserEvent } from "@/lib/actions/event.action";
import { SearchParamsProps } from "@/types"; 

const page = async ({ searchParams }: SearchParamsProps) => {
  // @ts-ignore
  const userForms = JSON.parse(await getUserEvent({ searchQuery: searchParams.q }));
  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          Manage Your Events
        </h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <MobileHomeFilters filters={EventPageFilters} />
      </div>
      <SearchBar route="/forms" />
      <HomeFilters filters={EventPageFilters} />
      <div className="mt-10 flex w-full flex-col gap-6">
        {userForms?.length > 0 ? (
          userForms?.map((item: any) => (
            <EventCard key={item._id} event={item} />
          ))
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="You haven't created any form yet "
          />
        )}
      </div>
    </>
  );
};

export default page;
