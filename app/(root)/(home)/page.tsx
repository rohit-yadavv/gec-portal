// import Enrollment from "@/components/shared/Enrollment";
import EnrollmentDialog from "@/components/shared/EnrollmentDialog";
import NoResult from "@/components/shared/NoResult";
import CourseCard from "@/components/shared/card/CourseCard"; 
import { getAllEvents } from "@/lib/actions/enrollment.action"; 
import { getUserById } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";  

export const metadata: Metadata = {
  title: "Home | Web Overflow",
  description:
    "A community driven platform for asking and answeing programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
};
  // {
  //   _id: new ObjectId('65c8a02f25bc80c7e0f69df5'),
  //   type: 'vac',
  //   desc: 'its an vac',
  //   courseCode: 'bt cs 302',
  //   courseName: 'vac for oops',
  //   department: 'cse',
  //   teacher: 'anant sir',
  //   sem: 2,
  //   eligible: 'pg',
  //   seats: '20',
  //   applicant: [],
  //   uploadedAt: 2024-02-11T10:23:43.921Z,
  //   __v: 0
  // }

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth(); 
  const mongoUser=await getUserById({userId});   
  console.log(mongoUser)

  let result = JSON.parse(await getAllEvents());  

  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Opportunities</h1> 
        <div className="flex justify-end max-sm:w-full">
          {/* <Enrollment /> */}
          {mongoUser?.admin && <EnrollmentDialog userId={userId}/>}
        </div>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        {/* <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="assets/icons/search.svg"
          placeholder="search for questions"
          otherClasses="flex-1"
        /> */}
        {/* <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        /> */}
      </div>
      HomeFilters
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.length > 0 ? (
          result?.map((item:any) => (
            <>
              <CourseCard event={item} />
            </>
          ))
        ) : (
          <NoResult
            title="Nothing to Show 🙄"
            desc="Currently There is no GEC, VAC or any Event available to register"
          />
        )}
      </div>
      <div className="mt-10">
        {/* <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        /> */}
      </div>
    </>
  );
}
