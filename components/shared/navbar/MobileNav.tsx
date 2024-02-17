"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const NavContent = () => {
  const pathName = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 bg-light-900  pt-16 dark:bg-dark-100">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;
        // todo
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark-300 dark:text-light-900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert dark:invert-0"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
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
          <p className="h2-bold text-dark-100 dark:text-light-900 max-sm:hidden">
            Gec <span className="text-primary-500">Portal</span>
          </p>
        </Link>
        <div>
          <NavContent />
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
