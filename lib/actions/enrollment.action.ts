"use server";
import Enrollment, { IEnrollment } from "@/database/enrollment.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongoose";
import User from "@/database/user.model";

interface Props {
  path: string;
  eventData: {
    type: string;
    courseCode: string;
    courseName: string;
    desc: string;
    department: string;
    teacher: string;
    sem: number;
    eligible: string;
    seats: number;
    courseCredit: number;
    uploadedBy: ObjectId;
  };
}

export async function createEvent(enrollmentData: Props) {
  try {
    const { path, eventData } = enrollmentData;
    connectToDatabase();
    const newEnrollment = await Enrollment.create(eventData);
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
      .sort({"uploadedAt":-1})
      .limit(5);

    const data = JSON.stringify(events);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOnlyGec() {
  try {
    connectToDatabase();
    const events = await Enrollment.find({ type: 'gec' })
    .populate({ path: "uploadedBy", model: User })
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOnlyVac() {
  try {
    connectToDatabase();
    const events = await Enrollment.find({ type: 'vac' })
    .populate({ path: "uploadedBy", model: User })
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOnlyEvents() {
  try {
    connectToDatabase();
    const events = await Enrollment.find({ type: 'event' })
    .populate({ path: "uploadedBy", model: User })
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
