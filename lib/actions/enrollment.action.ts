"use server";
import Enrollment, { IEnrollment } from "@/database/enrollment.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import path from "path";
import events from "events";

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
  };
}


export async function createEvent(enrollmentData: Props) {
  try {
    const { path, eventData } = enrollmentData;
    connectToDatabase();
    const newEnrollment = await Enrollment.create(eventData);
    revalidatePath(path);
    return newEnrollment;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllEvents() {
  try { 
    connectToDatabase();
    const events = await Enrollment.find()
      .sort() 
      .limit(5);
      
    return events;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
