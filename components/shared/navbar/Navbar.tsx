"use client";
import Image from "next/image";
import Link from "next/link";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import UserButton from "./UserButton";
import { useAuth } from "@/context/AuthProvider";

const Navbar = () => {
  const { user } = useAuth(); 
  return (
    <nav className="fixed z-50 flex w-full items-center justify-between border-b bg-light-900 p-4 dark:border-stone-800 dark:bg-dark-100 dark:shadow-none sm:px-12">
      <div className="flex flex-row gap-2">
        <MobileNav />
        <Link href="/" className="flex items-center gap-1">
          <Image
            width={30}
            height={30}
            alt="WebOverflow"
            src="/assets/images/logo.png"
          />
          <p className=" text-dark-100 dark:text-light-900 ">
            GEC <span className="text-primary-500">Portal</span>
          </p>
        </Link>
      </div>
 
      <div className="flex items-center justify-between gap-5 px-3">
        <Theme />
        {user && <UserButton />}
      </div>
    </nav>
  );
};

export default Navbar;
