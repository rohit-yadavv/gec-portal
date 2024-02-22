import { getAllEvents } from "@/lib/actions/event.action";
import Image from "next/image";
import React from "react";

const page = async () => {
  const events = JSON.parse(await getAllEvents());
  console.log(events)
  return (
    <div>
      {events?.map((item:any) => (
        <div key={item?._id}>
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/event/image/${item?._id}`}
            width={50}
            height={50}
            alt="im"
          />
        </div>
      ))}
    </div>
  );
};

export default page;
