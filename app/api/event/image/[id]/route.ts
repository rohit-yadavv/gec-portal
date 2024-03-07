import Event from "@/database/event.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string }; // Update the parameter name to match the expected query parameter
};

export async function GET(req: Request, { params }: Params) {
  try {
    connectToDatabase(); 
    const eventId = params.id;

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const event = await Event.findById(eventId).select('eventPoster');

    if (!event || !event.eventPoster || !event.eventPoster.data) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return new NextResponse(event.eventPoster.data, {
      headers: {
        "Content-Type": event.eventPoster.contentType!,
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error while getting photo' }, { status: 500 });
  }
}
