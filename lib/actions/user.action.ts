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
    console.log(newUser)
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
      $addToSet: { saved: enrollmentId },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeSaveEvent({ path, data }: saveEventData) {
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

export async function getSavedEvents({ clerkId, searchQuery }: getSavedEventProps) {
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

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      model: Enrollment,
      populate: [
        { path: "uploadedBy", model: User, select: "name email picture" },
      ],
    });
    const savedEvents = user.saved;
    return JSON.stringify(savedEvents);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAppliedEnrollments({ clerkId, searchQuery}: getAppliedProps) {
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

    const user = await User.findOne({ clerkId }).populate({
      path: "appliedGec",
      match:query,
      model: Enrollment,
      populate: [
        { path: "uploadedBy", model: User, select: "name email picture" },
      ],
    });

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
