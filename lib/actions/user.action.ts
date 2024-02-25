"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
  getAppliedProps,
  getSavedEventProps,
  saveEventData,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Enrollment from "@/database/enrollment.model";
import { FilterQuery } from "mongoose";
import Event from "@/database/event.model";

export async function getUserByMongoId(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ _id: userId });
    return JSON.stringify(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function countUser(){
  try {
    connectToDatabase();
    const totalUsers = await User.countDocuments();
    return totalUsers;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return JSON.stringify(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData); 
    return JSON.stringify(newUser);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveEvent({ path, data }: saveEventData) {
  try {
    connectToDatabase();
    const { userId, enrollmentId } = data;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedEvents: enrollmentId },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveEnrollment({ path, data }: saveEventData) {
  try {
    connectToDatabase();
    const { userId, enrollmentId } = data;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { saved: enrollmentId },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeSavedEvent({ path, data }: saveEventData) {
  try {
    connectToDatabase();
    const { userId, enrollmentId } = data;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedEvents: enrollmentId },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeSaveEnrollment({ path, data }: saveEventData) {
  try {
    connectToDatabase();
    const { userId, enrollmentId } = data;

    await User.findByIdAndUpdate(userId, {
      $pull: { saved: enrollmentId },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedEnrollments({ clerkId, searchQuery, filter }: getSavedEventProps) {
  try {
    connectToDatabase();

    const query: FilterQuery<typeof Enrollment> = {};
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

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { uploadedAt: -1 };
        break;

      // case "applied":
      //   query.applicant = { $in: [userId] };
      //   break;

      case "ug":
        query.eligible = 'ug';
        break;

      case "pg":
        query.eligible = 'pg';
        break;

      case "gec":
        query.type = 'gec';
        break;

      case "vac":
        query.type = 'vac';
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      model: Enrollment,
      populate: [
        { path: "uploadedBy", model: User, select: "name email picture" },
      ],
    }).sort(sortOptions);
    const savedEvents = user.saved;
    return JSON.stringify(savedEvents);
  } catch (error) {
    console.log(error);
    throw error;
  }
} 

export async function getSavedEvents({ clerkId, searchQuery, filter }: getSavedEventProps) {
  try {
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

    const user = await User.findOne({ clerkId }).populate({
      path: "savedEvents",
      match: query,
      model: Event,
    }).sort(sortOptions);
    const savedEvents = user.savedEvents;
    return JSON.stringify(savedEvents);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAppliedEvents({ clerkId, searchQuery, filter }: getAppliedProps) {
  try {
    await connectToDatabase();
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

    const user = await User.findOne({ clerkId }).populate({
      path: "appliedEvent",
      match: query,
      model: Event,
    }).sort(sortOptions);

    const events = user ? user.appliedEvent : [];
    return JSON.stringify(events);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAppliedEnrollments({ clerkId, searchQuery, filter }: getAppliedProps) {
  try {
    await connectToDatabase();
    const query: FilterQuery<typeof Enrollment> = {};
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

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { uploadedAt: -1 };
        break;

      // case "applied":
      //   query.applicant = { $in: [userId] };
      //   break;

      case "ug":
        query.eligible = 'ug';
        break;

      case "pg":
        query.eligible = 'pg';
        break;

      case "gec":
        query.type = 'gec';
        break;

      case "vac":
        query.type = 'vac';
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "appliedGec",
      match: query,
      model: Enrollment,
      populate: [
        { path: "uploadedBy", model: User, select: "name email picture" },
      ],
    }).sort(sortOptions);

    const enrollments = user ? user.appliedGec : [];
    return JSON.stringify(enrollments);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User Not found");
    }
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
