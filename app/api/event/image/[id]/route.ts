// @ts-nocheck
import Event from "@/database/event.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const eventId = req.query.id; 
  
      if (!eventId) {
        return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
      }
  
      const event = await Event.findById(eventId).select('eventPoster');
  
      if (!event || !event.eventPoster || !event.eventPoster.data) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
      }
  
      NextResponse.set('Content-type', event.eventPoster.contentType);
      return NextResponse.send(event.eventPoster.data);
  
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error while getting photo' }, { status: 500 });
    }
  }