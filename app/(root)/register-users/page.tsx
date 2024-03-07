import RegisterUserForm from "@/components/shared/form/RegisterUserForm";
import React from "react";

export default function page() {
  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="mb-4 text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          Register Users
        </h1>
      </div>
      <RegisterUserForm />
    </>
  );
}
