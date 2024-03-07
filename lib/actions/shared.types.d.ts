import { ObjectId } from "mongoose";

export interface CreateUserParams {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
  admin: boolean;
  isProfileComplete: boolean;
}

export interface saveEventData {
  path: string;
  data: {
    userId: string;
    enrollmentId: string;
  };
}

export interface GetUserByIdParams {
  userId: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: {
    name?: string;
    email?: string;
    picture?: string;
    rollNo?: number;
    department?: string;
    course?: string;
    sem?: number;
    isProfileComplete?: boolean;
  };
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface createEnrollmentProps {
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
    applyBy: Date;
  };
}

export interface deleteEnrollmentProps {
  path: string;
  enrollmentId: string;
}

export interface GetEnrollmentsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  // userId?:string;
}

export interface eventRegisterProps {
  path: string;
  eventId: string;
  userId: string;
}

export interface registerProps {
  path: string;
  enrollmentId: string;
  userId: string;
}

export interface adminForms {
  userId: string;
}
export interface acceptEnrollmentProps {
  path: string;
  userId: ObjectId;
  enrollmentId: ObjectId;
}

export interface userInEnrollmentProps {
  userId: ObjectId;
  enrollmentId: ObjectId;
}

export interface userFormsProps {
  searchQuery?: string | null;
}

export interface getSavedEventProps {
  searchQuery?: string;
  filter?: string;
}

export interface getAppliedProps {
  searchQuery?: string | null;
  filter?: string | null;
}