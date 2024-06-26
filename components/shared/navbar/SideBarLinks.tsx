"use client";
import {
  userSideLinks,
  adminSideLinks,
  bothAdminUserLinks,
  savedLinks,
} from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import EnrollmentDialog from "../EnrollmentDialog";
import BroadcastDialog from "../BrodcastDialog";
import EventDialog from "../EventDialog";

const SideBarLinks = ({
  isAdmin,
  userId,
}: {
  isAdmin: boolean;
  userId: string;
}) => {
  const pathName = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* home route  */}
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
          width={25}
          height={25}
          className={`${pathName === "/" ? "" : "invert dark:invert-0"}`}
        />
        <p
          className={`${
            pathName === "/"
              ? "text-[18px] font-bold leading-[140%]"
              : "text-[18px] font-medium leading-[25.2px]"
          } max-lg:hidden `}
        >
          Home
        </p>
      </Link>

      <hr />

      <SignedIn>
        {bothAdminUserLinks.map((item) => {
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
              } flex items-center justify-start gap-4 rounded-lg border border-transparent bg-transparent p-4 hover:border-[#FF7000]`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={25}
                height={25}
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

        <hr />

        {savedLinks.map((item) => {
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
              } flex items-center justify-start gap-4 rounded-lg border border-transparent bg-transparent p-4 hover:border-[#FF7000]`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={25}
                height={25}
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

        <hr />
        
        {isAdmin
          ? adminSideLinks.map((item) => {
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
                  } flex items-center justify-start gap-4 rounded-lg border border-transparent bg-transparent p-4 hover:border-[#FF7000]`}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={25}
                    height={25}
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
            })
          : userSideLinks.map((item) => {
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
                  } flex items-center justify-start gap-4 rounded-lg border border-transparent bg-transparent p-4 hover:border-[#FF7000]`}
                >
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={25}
                    height={25}
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
        <hr />

        {isAdmin && (
          <>
            <EnrollmentDialog userId={userId} />
            <EventDialog userId={userId} />
            <hr />
            <BroadcastDialog userId={userId} />
          </>
        )}
        
      </SignedIn>
    </div>
  );
};

export default SideBarLinks;
