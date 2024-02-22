"use server"
import Event from "@/database/event.model";
import { connectToDatabase } from "../mongoose";


export async function getAllEvents() {
    try {
      connectToDatabase();  
      const events = await Event.find().select('-eventPoster');
      return JSON.stringify(events);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  