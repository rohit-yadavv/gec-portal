import HomeFilters from "@/components/shared/HomeFilters";
import MobileHomeFilters from "@/components/shared/MobileHomeFilters";
import NoResult from "@/components/shared/NoResult";
import SearchBar from "@/components/shared/SearchBar";
import CourseCard from "@/components/shared/card/CourseCard";
import { HomePageFilters } from "@/constants";
import { getSavedEnrollments } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types"; 
const page = async ({ searchParams }: SearchParamsProps) => {
  const savedEvents = JSON.parse(await getSavedEnrollments({ filter: searchParams.filter, searchQuery: searchParams.q }));
  
  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          Saved Events
        </h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchBar route="/saved-forms" />
        <MobileHomeFilters filters={HomePageFilters} />
      </div>
      <HomeFilters filters={HomePageFilters} />
      <div className="mt-10 flex w-full flex-col gap-6">
        {savedEvents?.length > 0 ? (
          savedEvents?.map((item: any) => (
            <CourseCard key={item._id} event={item} />
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
