import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { adminSideLinks, userSideLinks } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import EnrollmentDialog from "../EnrollmentDialog";

const MobileSideBarLinks = ({ isAdmin, userId }: { isAdmin: any, userId:any }) => {
  const pathName = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 bg-light-900  pt-16 dark:bg-dark-100">
      {/* home route  */}
      <SheetClose asChild key="/">
        <Link
          key="home"
          href="/"
          className={`${
            pathName === "/"
              ? "primary-gradient text-light-900"
              : "text-dark-300 dark:text-light-900"
          } flex items-center justify-start gap-4 rounded-lg border border-transparent bg-transparent p-4 hover:border-[#FF7000]`}
        >
          <Image
            src="/assets/icons/home.svg"
            alt="home"
            width={20}
            height={20}
            className={`${pathName === "/" ? "" : "invert dark:invert-0"}`}
          />
          <p
            className={`${
              pathName === "/"
                ? "text-[18px] font-bold leading-[140%]"
                : "text-[18px] font-medium leading-[25.2px]"
            }`}
          >
            Home
          </p>
        </Link>
      </SheetClose>

      <SignedIn>
        {/* admin links  */}
        {isAdmin
          ? adminSideLinks.map((item) => {
              const isActive =
                (pathName.includes(item.route) && item.route.length > 1) ||
                pathName === item.route;

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
                    <p
                      className={`${
                        isActive
                          ? "text-[18px] font-bold leading-[140%]"
                          : "text-[18px] font-medium leading-[25.2px]"
                      }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </SheetClose>
              );
            })
          : userSideLinks.map((item) => {
              const isActive =
                (pathName.includes(item.route) && item.route.length > 1) ||
                pathName === item.route;

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
                    <p
                      className={`${
                        isActive
                          ? "text-[18px] font-bold leading-[140%]"
                          : "text-[18px] font-medium leading-[25.2px]"
                      }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </SheetClose>
              );
            })}
        {isAdmin && <EnrollmentDialog userId={userId} />}
      </SignedIn>

      <SignedOut>
        <SheetClose asChild key="/">
          <Link href="/sign-in">
            <Button
              className="h-[60px] w-full flex-row
            items-center justify-center gap-2 rounded-lg border bg-light-900 text-[12px]  font-medium leading-[15.6px] shadow-none hover:bg-light-850 dark:bg-dark-100"
            >
              <Image
                src="/assets/icons/account.svg"
                width={25}
                height={25}
                className="invert dark:invert-0"
                alt="login"
              />
              <span className="primary-text-gradient flex h-[60px] items-center text-[25px]">
                Sign In
              </span>
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild key="/">
          <Link href="/sign-up">
            <Button
              className="h-[60px] w-full flex-row
            items-center justify-center gap-2 rounded-lg border bg-light-900 text-[12px]  font-medium leading-[15.6px] shadow-none hover:bg-light-850 dark:bg-dark-100"
            >
              <Image
                src="/assets/icons/sign-up.svg"
                width={25}
                height={25}
                className="invert dark:invert-0"
                alt="signup"
              />
              <span className="primary-text-gradient flex h-[60px] items-center text-[25px] ">
                Sign Up
              </span>
            </Button>
          </Link>
        </SheetClose>
      </SignedOut>
    </section>
  );
};

export default MobileSideBarLinks;
