"use server"
import { connectToDatabase } from "../mongoose";
import { FilterQuery } from "mongoose";
import { acceptEnrollmentProps, adminForms, deleteEnrollmentProps, eventRegisterProps, userFormsProps, userInEnrollmentProps } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Event from "@/database/event.model";
import { getUserByToken } from "./user.action";

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

export async function getUserEvent({ searchQuery }: userFormsProps) {
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
    

    const mongoUser = await getUserByToken();
    if(!mongoUser) return;
    const user = JSON.parse(mongoUser);

    if (!user) return;
    const event = await Event.find({ uploadedBy: user?._id, ...query })
      .select('-eventPoster') 
      .populate({ path: "applicant", model: User })
      .populate({ path: "selected", model: User });

      return JSON.stringify(event);

  } catch (error) {
    console.log(error);
    throw error;
  }
}
 

export async function countEvents(){
  try {
    connectToDatabase();
    const totalEvents = await Event.countDocuments();
    return totalEvents;
  } catch (error) {
    console.log(error)
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

export async function getAdminEvents({ userId }: adminForms) {
  try {
    connectToDatabase();

    const res = await Event.find({ uploadedBy: userId }).select('eventName eventId');

    const namesArray = res.map(doc => ({
      eventName: doc.eventName,
      eventId: doc._id
    }));

    return namesArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getSelectedMailEvents({ eventId }: { eventId: string }) {
  try {
    connectToDatabase();

    const res = await Event.findById(eventId)
      .populate({ path: "applicant", model: User })
      .select('applicant');

    // Check if 'applicant' is populated and has the 'email' field
    // @ts-ignore
    const emailArray = res?.applicant.map(applicant => applicant.email);

    return emailArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
