"use server"
import { connectToDatabase } from "../mongoose";
import { FilterQuery } from "mongoose";
import { acceptEnrollmentProps, deleteEnrollmentProps, eventRegisterProps, userFormsProps, userInEnrollmentProps } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Event from "@/database/event.model";
import { getUserById } from "./user.action";

export async function getAllEvents(params: any) {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

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

    let sortOptions = {};

    switch (filter) {
      case "upcoming":
        query.eventTime = { $gte: new Date() };
        break;
        
      case "newest":
        sortOptions = { uploadedAt: -1 };
        break; 


      case "oldest":
        sortOptions = { uploadedAt: 1 };
        break;
    }


    const events = await Event.find(query)
      .select('-eventPoster') 
      .populate({ path: "applicant", model: User })
      .populate({ path: "selected", model: User })
      .sort(sortOptions);

    return JSON.stringify(events);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function eventRegistration({ path, eventId, userId }: eventRegisterProps) {
  try {
    connectToDatabase();
    await Event.findByIdAndUpdate(eventId, {
      $addToSet: { applicant: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { appliedEvent: eventId },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function eventUnRegistration({ path, userId, eventId }: eventRegisterProps) {
  try {
    connectToDatabase(); 
    await Event.findByIdAndUpdate(eventId, {
      $pull: { applicant: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { appliedEvent: eventId },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function isUserSelectedInEvent({ userId, enrollmentId }: userInEnrollmentProps) {
  try {
    connectToDatabase();
    const res = await Event.findById(enrollmentId)
    const data = res?.selected?.includes(userId)
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function isUserRejectedInEvent({ userId, enrollmentId }: userInEnrollmentProps) {
  try {
    connectToDatabase();
    const res = await Event.findById(enrollmentId)
    const data = res?.rejected?.includes(userId)
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
} 

export async function acceptEvent({ path, userId, enrollmentId }: acceptEnrollmentProps) {
  try {
    connectToDatabase();
    await Event.findByIdAndUpdate(enrollmentId, {
      $addToSet: { selected: userId },
      $pull: { rejected: userId },
    });
    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
} 

export async function rejectEvent({ path, userId, enrollmentId }: acceptEnrollmentProps) {
  try {
    connectToDatabase();
    await Event.findByIdAndUpdate(enrollmentId, {
      $pull: { selected: userId },
      $addToSet: { rejected: userId },
    });
    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteEvent({ path, enrollmentId }: deleteEnrollmentProps) {
  try {
    connectToDatabase();
    const event = await Event.findById(enrollmentId);

    // Check if the enrollment exists
    if (!event) {
      throw new Error('Enrollment not found');
    }

    await User.updateMany(
      { _id: { $in: event.applicant } }, // _id which is in the array enrollment.applicant.
      { $pull: { appliedEvent: enrollmentId } } // remove enrollmentId from appliedGec of user with _id 
    );

    await Event.deleteOne({ _id: enrollmentId });
    revalidatePath(path)
  } catch (error) {
    console.log(error);
  } 
}


export async function getUserEvent({ clerkId, searchQuery }: userFormsProps) {
  try {
    connectToDatabase();


    const query: FilterQuery<typeof Event> = {};
    const escapedSearchQuery = searchQuery?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (escapedSearchQuery) {
      query.$or = [
        // { <field>: { $regex: /pattern/, $options: '<options>' } } i:to include both lowercase and uppercaseS
        { courseCode: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { courseName: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { department: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { teacher: { $regex: new RegExp(escapedSearchQuery, "i") } },
      ];
    }

    const user = JSON.parse(await getUserById({ userId: clerkId }))
    const event = await Event.find({ uploadedBy: user._id, ...query }) 
      .select('-eventPoster') 
      .populate({ path: "applicant", model: User })
      .populate({ path: "selected", model: User });

    return JSON.stringify(event);
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getEventById(params: any) {
  try {
    connectToDatabase();
    const { enrollmentId } = params;
    const enrollment = await Event.findById(enrollmentId);
    return JSON.stringify(enrollment);
  } catch (error) {
    console.log(error);
    throw error;
  }
}