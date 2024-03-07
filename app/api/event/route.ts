import Event from "@/database/event.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    connectToDatabase();
    const formData = await request.formData();

    const eventName = formData.get('eventName') as string;
    const eventDesc = formData.get('eventDesc') as string;
    const eventTime= formData.get('eventTime') as string;
    const department = formData.get('department') as string;
    const uploadedBy = formData.get('uploadedBy') as unknown as ObjectId;
    const venue = formData.get('venue') as string;
    const eventPoster = formData.get('eventPoster') as File;

    if (!eventPoster) {
      throw new Error("Event poster is required");
    }

    const posterData = Buffer.from(await eventPoster.arrayBuffer());

    const event = new Event({ eventName,venue, eventDesc, department, eventTime, uploadedBy });
    event.eventPoster.data = posterData;
    event.eventPoster.contentType = eventPoster.type;

    await event.save();

    return NextResponse.json({ event: "d" });

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}