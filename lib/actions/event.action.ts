import Event from "@/database/event.model";
import { connectToDatabase } from "../mongoose";
import { FilterQuery } from "mongoose";
import { registerProps } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getAllEvents(params: any) {
  try {
    const { searchQuery } = params;
    connectToDatabase();

    const query: FilterQuery<typeof Event> = {};
    const escapedSearchQuery = searchQuery?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (escapedSearchQuery) {
      query.$or = [
        { eventName: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { eventDesc: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { department: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { venue: { $regex: new RegExp(escapedSearchQuery, "i") } },
      ];
    }

    query.eventTime = { $gte: new Date() };

    const events = await Event.find(query).select('-eventPoster');

    return JSON.stringify(events);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function eventRegistration({ path, enrollmentId, userId }: registerProps) {
  try {
    connectToDatabase();
    await Event.findByIdAndUpdate(enrollmentId, {
      $addToSet: { applicant: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { appliedEvents: enrollmentId },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function eventUnRegistration({ path, userId, enrollmentId }: registerProps) {
  try {
    connectToDatabase();
    await Event.findByIdAndUpdate(enrollmentId, {
      $pull: { applicant: userId },
    });

    await Event.findByIdAndUpdate(userId, {
      $pull: { appliedEvent: enrollmentId },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
