import NoResult from "@/components/shared/NoResult";
import CourseCard from "@/components/shared/card/CourseCard"; 
import { getAppliedEnrollments } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

const page = async () => {
  const { userId } = auth();
  const savedEvents = await getAppliedEnrollments({ clerkId: userId });    
  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Applied Events</h1> 
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"> 
      </div>
      HomeFilters
      <div className="mt-10 flex w-full flex-col gap-6">
        {savedEvents?.length > 0 ? (
          savedEvents?.map((item: any) => (
            <>
              <CourseCard event={item.registerFor} />
            </>
          ))
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Currently There is no GEC, VAC or any Event available to register"
          />
        )}
      </div> 
    </>
  );
};

export default page;
