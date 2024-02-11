"use server";
import Enrollment, { IEnrollment } from "@/database/enrollment.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { Schema } from "mongoose";
import Registration from "@/database/registered.model";

const { userId } = auth(); //clerkId

interface Props {
  path: string;
  registrationData: {
    name: string;
    rollNo: number;
    department: string;
    course: string;
    sem: number;
    registratedFor?: Schema.Types.ObjectId;
    registeredAt?: Date;
  };
}

export async function createRegistration(registration: Props) {
  try {
    const { path, registrationData } = registration;
    connectToDatabase();
    const newEnrollment = await Registration.create(registrationData);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
