import Enrollment from "@/components/shared/Enrollment";
import NoResult from "@/components/shared/NoResult";
import CourseCard from "@/components/shared/card/CourseCard";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/enrollment.action";
import { gec } from "@/temp";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";
import result from "postcss/lib/result";
import { title } from "process";

export const metadata: Metadata = {
  title: "Home | Web Overflow",
  description:
    "A community driven platform for asking and answeing programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  let result;
  // if (searchParams?.filter === "recommended") {
  //   if (userId) {
  //     result = await getRecommendedQuestions({
  //       userId,
  //       searchQuery: searchParams.q,
  //       page: searchParams.page ? +searchParams.page : 1,
  //     });
  //   } else {
  //     result = {
  //       questions: [],
  //       isNext: false,
  //     };
  // }
  // } else {
  result = await getAllEvents();

  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Opportunities</h1>
        {/* <Link className="flex justify-end max-sm:w-full" href="/ask-question"> */}
        <div className="flex justify-end max-sm:w-full">
          {/* <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button> */}
          <Enrollment />
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
        {result.length > 0 ? (
          result.map((item) => (
            <>
              <CourseCard
                key={item.courseCode}
                courseName={item.courseName}
                department={item.department}
                courseCode={item.courseCode}
              />
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
