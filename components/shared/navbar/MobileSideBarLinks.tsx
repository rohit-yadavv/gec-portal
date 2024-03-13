"use client";
import { SheetClose } from "@/components/ui/sheet";
import {
  adminSideLinks,
  bothAdminUserLinks,
  savedLinks,
  teacherSideLinks,
  userSideLinks,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import EnrollmentDialog from "../EnrollmentDialog";
import EventDialog from "../EventDialog";
import BroadcastDialog from "../BrodcastDialog";

const MobileSideBarLinks = () => {
  const pathName = usePathname();
  const { user } = useAuth();
  if (!user) return;
  const isAdmin = user?.admin;
  const isTeacher = user?.teacher;

  return (
    <section className="flex h-full flex-col gap-6  bg-light-900 pt-16 dark:bg-dark-100">
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

      {isAdmin &&
        adminSideLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;

          return (
            <SheetClose asChild key={item.route}>
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
                  }  `}
                >
                  {item.label}
                </p>
              </Link>
            </SheetClose>
          );
        })}

      <hr />

      {bothAdminUserLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        return (
          <SheetClose asChild key={item.route}>
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
                }`}
              >
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}

      <hr />

      {savedLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        return (
          <SheetClose asChild key={item.route}>
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
                }`}
              >
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}

      <hr />

      {isTeacher
        ? teacherSideLinks.map((item) => {
            const isActive =
              (pathName.includes(item.route) && item.route.length > 1) ||
              pathName === item.route;

            return (
              <SheetClose asChild key={item.route}>
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
                    }  `}
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
                    }  `}
                  >
                    {item.label}
                  </p>
                </Link>
              </SheetClose>
            );
          })}
      <hr />

      {isTeacher && (
        <>
          <hr />
          <EnrollmentDialog />
          <EventDialog />
          <hr />
          <BroadcastDialog />
        </>
      )}
    </section>
  );
};

export default MobileSideBarLinks;
