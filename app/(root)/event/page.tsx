import NoResult from "@/components/shared/NoResult";
import CourseCard from "@/components/shared/card/CourseCard";   
import { getOnlyEvents } from "@/lib/actions/enrollment.action"; 

const page = async () => { 
  const result = JSON.parse(await getOnlyEvents());     
  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Events</h1> 
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"> 
      </div>
      HomeFilters
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.length > 0 ? (
          result?.map((item: any) => (
            <>
              <CourseCard event={item} />
            </>
          ))
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Currently There is no Event available to register"
          />
        )}
      </div> 
    </>
  );
};

export default page;
