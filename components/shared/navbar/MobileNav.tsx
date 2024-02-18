"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
 
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image"; 
import React from "react"; 
import MobileSideBarLinks from "./MobileSideBarLinks";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="">
        <Image
          className="invert dark:invert-0 sm:hidden"
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="menu"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className=" border-none bg-light-900 dark:bg-dark-100"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={33}
            height={33}
            alt="WebOverflow"
          />
          <p className="text-[30px] font-bold leading-[42px] text-dark-100 dark:text-light-900 max-sm:hidden">
            Gec <span className="text-primary-500">Portal</span>
          </p>
        </Link>
        <div>
          <MobileSideBarLinks />
          <SignedOut>
            <div className="flex flex-col gap-3 py-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button
                    className="flex  min-h-[41px] w-full flex-row
            items-center justify-center gap-1 rounded-lg border bg-light-900 text-[12px]  font-medium leading-[15.6px] shadow-none hover:bg-light-850 dark:bg-dark-100"
                  >
                    <span className="primary-text-gradient text-[16px] font-medium leading-[15.6px] ">
                      Log In
                    </span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button
                    className="flex  min-h-[41px] w-full flex-row
            items-center justify-center gap-1 rounded-lg border bg-light-900 text-[12px]  font-medium leading-[15.6px] shadow-none hover:bg-light-850 dark:bg-dark-100"
                  >
                    <span className="primary-text-gradient text-[16px] font-medium  leading-[15.6px]">
                      Sign Up
                    </span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
