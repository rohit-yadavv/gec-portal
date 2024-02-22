import Event from "@/database/event.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const eventName = formData.get('eventName') as string;
    const eventDesc = formData.get('eventDesc') as string;
    const department = formData.get('department') as string;
    const eventPoster = formData.get('eventPoster') as File;

    if (!eventPoster) {
      throw new Error("Event poster is required");
    }

    const posterData = Buffer.from(await eventPoster.arrayBuffer());

    const event = new Event({ eventName, eventDesc, department });
    event.eventPoster.data = posterData;
    event.eventPoster.contentType = eventPoster.type;

    await event.save();

    return NextResponse.json({ event: "d" });

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}