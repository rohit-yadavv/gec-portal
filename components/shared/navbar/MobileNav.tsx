"use client"; 
import {
  Sheet, 
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {  useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MobileSideBarLinks from "./MobileSideBarLinks";
import { getUserById } from "@/lib/actions/user.action";

const MobileNav = () => {
  const [isAdmin, setIsAdmin] = useState();
  const [mongoId, setMongoId] = useState();
  const { userId } = useAuth();

  const getAdminInfo = async () => {
    const user = JSON.parse(await getUserById({ userId }));
    setIsAdmin(user?.admin);
    setMongoId(user?._id)
  };

  useEffect(() => {
    getAdminInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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


        <MobileSideBarLinks isAdmin={isAdmin}  userId={mongoId} />

      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
