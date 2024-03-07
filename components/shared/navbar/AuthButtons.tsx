"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthButtons = () => {
  const { user } = useAuth();

  if (user) {
    return;
  }

  return (
    <div className="my-3 flex flex-col gap-3">
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
          <span className="primary-text-gradient flex h-[60px] items-center text-[25px] max-lg:hidden">
            Sign In
          </span>
        </Button>
      </Link>
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
          <span className="primary-text-gradient flex h-[60px] items-center text-[25px] max-lg:hidden">
            Sign Up
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
