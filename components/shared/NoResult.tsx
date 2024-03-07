import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link"; 
import { NoResultProps } from "@/types/components";

const NoResult = ({ title, desc, link, linkTitle }: NoResultProps) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result Illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />

      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result Illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />
      <h2 className="mt-8 text-dark-200 dark:text-light-900">{title}</h2>
      <p className="my-3.5 max-w-md text-center text-dark-200 dark:text-light-900">
        {desc}
      </p>
      {link ? (
        <Link href={`${link}`}>
          <Button className="mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
            {linkTitle}
          </Button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default NoResult;
