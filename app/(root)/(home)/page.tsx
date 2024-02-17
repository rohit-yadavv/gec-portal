// import Enrollment from "@/components/shared/Enrollment";
import EnrollmentDialog from "@/components/shared/EnrollmentDialog";
import NoResult from "@/components/shared/NoResult";
import CourseCard from "@/components/shared/card/CourseCard";
import { getAllEvents } from "@/lib/actions/enrollment.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Gec-Portal",
  description: "Portal to register for gec designed for cuh students",
};

export default async function Home() {
  const { userId } = auth();
  const mongoUser = JSON.parse(await getUserById({ userId }));
  const result = await getAllEvents();

  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          Opportunities
        </h1>
        <div className="flex justify-end gap-3 max-sm:w-full">
          {mongoUser?.admin && <EnrollmentDialog userId={mongoUser._id} />}
          {/* @ts-ignore */}
          {mongoUser?.admin && (
            <Link
              href="/forms"
              className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900"
            >
              Your Forms
            </Link>
          )}
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
          result?.map((item: any) => <CourseCard key={item._id} event={item} viewApplicants={false} /> )
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
