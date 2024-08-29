import Image from "next/image";
import React from "react";
interface Props {
  user: {
    imgUrl: string;
    name: string;
    role: string;
    designation: string;
  };
}
const TeamCard = async ({ user }: Props) => {
  return (
    <article className="flex flex-col items-center justify-center rounded-2xl border bg-light-900 p-8 dark:bg-dark-100 max-sm:min-w-full sm:w-[300px]">
      <Image
        src={user.imgUrl}
        alt="user profile picture"
        width={100}
        height={100}
        className="size-[100px] rounded-full"
      />
      <div className="mt-4 text-center">
        <h2 className=" line-clamp-1 font-semibold text-dark-200 dark:text-light-900">
          {user.name}
        </h2>
        <p className="text-[13px] font-normal text-dark-100 dark:text-light-850">
          ({user.designation})
        </p>
        <p className="text-[14px] font-normal text-dark-100 dark:text-light-850">
          Role: {user.role}
        </p>
      </div>
    </article>
  );
};

export default TeamCard;
