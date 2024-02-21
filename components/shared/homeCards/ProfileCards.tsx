import Image from "next/image";
import React from "react";

 
const ProfileCard = async () => {
  return ( 
    // <article className="flex w-[200px] flex-col items-center justify-center rounded-2xl border p-2">
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border p-2">
      <Image
        src='https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yY09TUjlJNThsNk8ycko1S1lYaE1nNnNXaEEifQ?width=80'
        alt="user profile picture"
        width={100}
        height={100}
        className="rounded-full"
      />
      <div className="mt-4 text-center">
        <h3 className="  line-clamp-1">Rohit Yadav</h3>
        <p className=" mt-2">rk4740779@gmail.com</p>
      </div>
    </div>
    // </Link>
  );
};

export default ProfileCard;
