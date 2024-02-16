"use client";
import { sidebarLinks, userSideLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";

const SideBarLinks = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-6">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        return (
          <Link
            key={item.route}
            href={item.route}
            className={`${
              isActive
                ? "primary-gradient text-light-900"
                : "text-dark-300 dark:text-light-900"
            } bg-transparent11 flex items-center justify-start gap-4 rounded-lg p-4 hover:border`}
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
              } max-lg:hidden `}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
      <SignedIn>
        {userSideLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900"
                  : "text-dark-300 dark:text-light-900"
              } flex items-center justify-start gap-4 rounded-lg border-red-500 bg-transparent p-4 hover:border-black`}
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
                } max-lg:hidden `}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </SignedIn>
    </div>
  );
};

export default SideBarLinks;
