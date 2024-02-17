import NoResult from "@/components/shared/NoResult";
import CourseCard from "@/components/shared/card/CourseCard";   
import { getOnlyVac} from "@/lib/actions/enrollment.action";

const page = async () => { 
  const result = JSON.parse(await getOnlyVac());     
  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">All VACs</h1> 
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"> 
      </div>
      HomeFilters
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.length > 0 ? (
          result?.map((item: any) => (
            <>
              <CourseCard viewApplicants={false} event={item} />
            </>
          ))
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Currently There is no Value Added Course to Apply"
          />
        )}
      </div> 
    </>
  );
};

export default page;
