"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
  saveEventData,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Enrollment from "@/database/enrollment.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
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
      $push: { saved: enrollmentId },
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

export async function getSavedEvents({ clerkId }: { clerkId?: string | null }) {
  try {
    connectToDatabase();

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      model: Enrollment,
      populate: [
        { path: "uploadedBy", model: User, select: "name email picture" },
      ],
    });
    const savedEvents = user.saved;
    return savedEvents;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAppliedEnrollments({
  clerkId,
}: {
  clerkId?: string | null;
}) {
  try {
    await connectToDatabase(); 
    // uploadedBy: {
    //   name: string;
    //   picture: string;
    //   email: string;
    // };
    // uploadedAt: Date;
    const user = await User.findOne({ clerkId }).populate({
      path: "appliedGec",
      model: User,
      populate: [
        { path: "uploadedBy", model: User, select: "name email picture" },
      ],
    }); 
    
    const enrollments = user ? user.appliedGec : [];
    return enrollments;
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
