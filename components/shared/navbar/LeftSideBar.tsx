"use client";
import {
  userSideLinks,
  adminSideLinks,
  bothAdminUserLinks,
  savedLinks,
  teacherSideLinks,
} from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import EnrollmentDialog from "../EnrollmentDialog";
import BroadcastDialog from "../BrodcastDialog";
import EventDialog from "../EventDialog";

const LeftSideBar = () => {
  const pathName = usePathname();
  const { user } = useAuth();
  if (!user) return;
  const isAdmin = user?.admin;
  const isTeacher = user?.teacher;

  return (
    <section className="custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r border-light-800 p-6 pt-32 dark:border-dark-200 dark:shadow-none max-sm:hidden lg:w-[266px]">
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

        {isAdmin &&
          adminSideLinks.map((item) => {
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
                  width={23}
                  height={23}
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

        {isTeacher
          ? teacherSideLinks.map((item) => {
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
        {isTeacher && (
          <>
            <EnrollmentDialog />
            <EventDialog />
            <hr />
            <BroadcastDialog />
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSideBar;
