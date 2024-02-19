import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import RightSideBar from "@/components/shared/HomeRegistration";

export const metadata: Metadata = {
  title: "Home | Gec-Portal",
  description: "Portal to register for gec designed for cuh students",
};

export default async function Home({ searchParams }: SearchParamsProps) {


  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          Home
        </h1>
      </div>
      
      <div className="flex flex-col sm:flex-row">
        <div className="mt-10 w-full flex-col gap-8">
          
          
        </div> 
        <RightSideBar />
      </div>
      <div className="mt-10"></div>
    </>
  );
}
