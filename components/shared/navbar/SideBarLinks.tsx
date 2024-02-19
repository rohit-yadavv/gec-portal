"use client";
import { userSideLinks, adminSideLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import EnrollmentDialog from "../EnrollmentDialog";

const SideBarLinks = ({
  isAdmin,
  userId,
}: {
  isAdmin: boolean;
  userId: string;
}) => {
  const pathName = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-6">
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
          width={20}
          height={20}
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

      {/* signed user routes */}
      <SignedIn>
        {/* admin links  */}
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
        {isAdmin && <EnrollmentDialog userId={userId} />}
      </SignedIn>
    </div>
  );
};

export default SideBarLinks;
