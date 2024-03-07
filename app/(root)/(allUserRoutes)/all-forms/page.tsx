import HomeFilters from "@/components/shared/HomeFilters";
import MobileHomeFilters from "@/components/shared/MobileHomeFilters";
import NoResult from "@/components/shared/NoResult";
import CourseCard from "@/components/shared/card/CourseCard";
import SearchBar from "@/components/shared/SearchBar";
import { HomePageFilters } from "@/constants";
import { getAllEvents } from "@/lib/actions/enrollment.action"; 
import { SearchParamsProps } from "@/types"; 
import { Metadata } from "next";  

export const metadata: Metadata = {
  title: "Home | Gec-Portal",
  description: "Portal to register for gec designed for cuh students",
};

export default async function Home({ searchParams }: SearchParamsProps) {  
  const result = JSON.parse(
    await getAllEvents({ filter: searchParams.filter, searchQuery:searchParams.q })
  );

  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        All Opportunities
        </h1> 
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchBar route="/all-forms" />
        <MobileHomeFilters filters={HomePageFilters} />
      </div>
      <HomeFilters filters={HomePageFilters}/>
      <div className="mt-10 flex w-full flex-col gap-8"> 
        {result?.length > 0 ? (
          result?.map((item: any) => ( 
            <CourseCard key={item._id} event={item} />
          ))
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Currently There is no GEC, VAC or any Event available to register"
          />
        )}
      </div>
      <div className="mt-10"></div>
    </>
  );
}
