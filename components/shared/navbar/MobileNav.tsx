"use client"; 
import {
  Sheet, 
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"; 

import Link from "next/link";
import Image from "next/image"; 
import MobileSideBarLinks from "./MobileSideBarLinks"; 

const MobileNav = () => {   

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
        className="overflow-y-scroll border-none bg-light-900 dark:bg-dark-100"
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


        <MobileSideBarLinks />

      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
