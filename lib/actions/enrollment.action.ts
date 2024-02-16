"use server";

import Enrollment from "@/database/enrollment.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache"; 
import User from "@/database/user.model";
import { acceptEnrollmentProps, createEnrollmentProps, registerProps, userInEnrollmentProps } from "./shared.types";
 
export async function createEvent(enrollmentData: createEnrollmentProps) {
  try {
    const { path, eventData } = enrollmentData;
    console.log(eventData);
    connectToDatabase();
    await Enrollment.create(eventData);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllEvents() {
  try {
    connectToDatabase();
    const events = await Enrollment.find()
      .populate({ path: "uploadedBy", model: User })
      .populate({ path: "applicant", model: User })
      .sort({ uploadedAt: -1 })
      .limit(5);

    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOnlyGec() {
  try {
    connectToDatabase();
    const events = await Enrollment.find({ type: "gec" }).populate({
      path: "uploadedBy",
      model: User,
    });
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOnlyVac() {
  try {
    connectToDatabase();
    const events = await Enrollment.find({ type: "vac" }).populate({
      path: "uploadedBy",
      model: User,
    });
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOnlyEvents() {
  try {
    connectToDatabase();
    const events = await Enrollment.find({ type: "event" }).populate({
      path: "uploadedBy",
      model: User,
    });
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
 
export async function registerForEvent({ path,enrollmentId, userId }: registerProps) {
  try {
    connectToDatabase(); 
    await Enrollment.findByIdAndUpdate(enrollmentId, {
      $addToSet: { applicant: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { appliedGec: enrollmentId },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function acceptEnrollment({path, userId, enrollmentId}:acceptEnrollmentProps){  
  await Enrollment.findByIdAndUpdate(enrollmentId, {
    $addToSet: { selected: userId },
  });
  revalidatePath(path)
}

export async function rejectEnrollment({path, userId, enrollmentId}:acceptEnrollmentProps){  
  await Enrollment.findByIdAndUpdate(enrollmentId, {
    $pull: { selected: userId },
  });
revalidatePath(path)
}

export async function isUserSelectedInEnrollment({userId, enrollmentId}:userInEnrollmentProps){
  const res = await Enrollment.findById(enrollmentId)
  const data = res.selected.includes(userId) 
  return data;
}