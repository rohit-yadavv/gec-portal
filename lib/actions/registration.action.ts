"use server"; 
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { ObjectId, Schema } from "mongoose";
import Registration from "@/database/registered.model"; 
import User from "@/database/user.model";
import Enrollment from "@/database/enrollment.model";

interface Props {
  path: string;
  userId: ObjectId;
  registrationData: {
    name: string; 
    rollNo: number;
    department: string;
    course: string;
    sem: number;
    registerFor?: Schema.Types.ObjectId;
    registeredAt?: Date;
  };
}

export async function createRegistration(registration: Props) {
  try {
    const { path, registrationData, userId} = registration; 
    connectToDatabase();
    const newEnrollment = await Registration.create(registrationData);
    
    // update appliedGec array in User model
    await User.findByIdAndUpdate(userId, {
      $push: { appliedGec: newEnrollment._id },
    });

    // update applicant array in enrollment model
    await Enrollment.findByIdAndUpdate(registrationData.registerFor,{
      $push: { applicant: newEnrollment._id },
    })

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
