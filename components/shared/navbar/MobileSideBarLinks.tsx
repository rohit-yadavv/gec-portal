import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks, userSideLinks } from "@/constants";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileSideBarLinks = () => {
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
              <p
                className={`${
                  isActive ? "text-[18px] font-bold" : "text-[18px] font-medium"
                }`}
              >
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}

      <SignedIn>
        {userSideLinks.map((item) => {
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
      </SignedIn>
      
    </section>
  );
};

export default MobileSideBarLinks;
