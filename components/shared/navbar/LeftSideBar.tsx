import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs"; 
import SideBarLinks from "./SideBarLinks";
const LeftSideBar = async () => {
  return (
    <section className="custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r border-light-800 p-6 pt-32 dark:border-dark-200 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <SideBarLinks />
      <SignedOut>
        <div className="my-3 flex flex-col gap-3">
          <Link href="/sign-in">
            <Button
              className="min-h-[41px] w-full flex-row
            items-center justify-center gap-1 rounded-lg border  bg-light-900 text-[12px] font-medium leading-[15.6px] shadow-none hover:bg-light-850 dark:bg-dark-100 lg:flex"
            >
              <Image
                src="/assets/icons/account.svg"
                width={16}
                height={16}
                className="invert dark:invert-0"
                alt="login"
              />
              <span className="primary-text-gradient text-[14px] max-lg:hidden">
                Sign In
              </span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              className="flex  min-h-[41px] w-full flex-row
            items-center justify-center gap-1 rounded-lg border bg-light-900 text-[12px]  font-medium leading-[15.6px] shadow-none hover:bg-light-850 dark:bg-dark-100"
            >
              <Image
                src="/assets/icons/sign-up.svg"
                width={16}
                height={16}
                className="invert dark:invert-0"
                alt="signup"
              />
              <span className="primary-text-gradient text-[14px] max-lg:hidden">
                Sign Up
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSideBar;
