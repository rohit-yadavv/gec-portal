"use server";

import Enrollment from "@/database/enrollment.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";
import { GetEnrollmentsParams, acceptEnrollmentProps, adminForms, createEnrollmentProps, deleteEnrollmentProps, registerProps, userFormsProps, userInEnrollmentProps } from "./shared.types";
import { getUserByToken } from "./user.action";
import { FilterQuery } from "mongoose";

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

export async function getEnrollmentById(params: any) {
  try {
    connectToDatabase();
    const { enrollmentId } = params;
    const enrollment = await Enrollment.findById(enrollmentId);
    return JSON.stringify(enrollment);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function countEnrollments() {
  try {
    connectToDatabase();
    const totalEnrollments = await Enrollment.countDocuments();
    return totalEnrollments;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function deleteEnrollment({ path, enrollmentId }: deleteEnrollmentProps) {
  try {
    connectToDatabase();
    const enrollment = await Enrollment.findById(enrollmentId);

    // Check if the enrollment exists
    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    await User.updateMany(
      { _id: { $in: enrollment.applicant } }, // _id which is in the array enrollment.applicant.
      { $pull: { appliedGec: enrollmentId } } // remove enrollmentId from appliedGec of user with _id 
    );

    await Enrollment.deleteOne({ _id: enrollmentId });
    revalidatePath(path)
  } catch (error) {
    console.log(error);
  }
}

export async function getAllEvents(params: GetEnrollmentsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

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

    if (filter !== "all") {
      query.applyBy = { $gte: new Date() };
    }

    switch (filter) {
      case "newest":
        sortOptions = { uploadedAt: -1 };
        break;

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

    const events = await Enrollment.find(query)
      .populate({ path: "uploadedBy", model: User })
      .populate({ path: "applicant", model: User })
      .populate({ path: "selected", model: User })
      .sort(sortOptions);

    return JSON.stringify(events);
  } catch (error) {
    console.error(error);
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

export async function registerForEnrollment({ path, enrollmentId, userId }: registerProps) {
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

export async function unRegisterForEnrollment({ path, userId, enrollmentId }: registerProps) {
  try {
    connectToDatabase();
    await Enrollment.findByIdAndUpdate(enrollmentId, {
      $pull: { applicant: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { appliedGec: enrollmentId },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function acceptEnrollment({ path, userId, enrollmentId }: acceptEnrollmentProps) {
  try {
    connectToDatabase();
    await Enrollment.findByIdAndUpdate(enrollmentId, {
      $addToSet: { selected: userId },
      $pull: { rejected: userId },
    });
    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function rejectEnrollment({ path, userId, enrollmentId }: acceptEnrollmentProps) {
  try {
    connectToDatabase();
    await Enrollment.findByIdAndUpdate(enrollmentId, {
      $pull: { selected: userId },
      $addToSet: { rejected: userId },
    });
    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function isUserSelectedInEnrollment({ userId, enrollmentId }: userInEnrollmentProps) {
  try {
    connectToDatabase();
    const res = await Enrollment.findById(enrollmentId)
    const data = res?.selected?.includes(userId)
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function isUserRejectedInEnrollment({ userId, enrollmentId }: userInEnrollmentProps) {
  try {
    connectToDatabase();
    const res = await Enrollment.findById(enrollmentId)
    const data = res?.rejected?.includes(userId)
    return data;

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserForm({ searchQuery }: userFormsProps) {
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

    const mongoUser = await getUserByToken();
    if(!mongoUser) return;
    const user = JSON.parse(mongoUser);

    if (!user) return;
    const enrollments = await Enrollment.find({ uploadedBy: user?._id, ...query })
      .populate({ path: "uploadedBy", model: User })
      .populate({ path: "applicant", model: User })
      .populate({ path: "selected", model: User });

    console.log(enrollments)
    return JSON.stringify(enrollments);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAdminForms({ userId }: adminForms) {
  try {
    connectToDatabase();

    const res = await Enrollment.find({ uploadedBy: userId }).select('courseName courseId');

    const namesArray = res.map(doc => ({
      courseName: doc.courseName,
      courseId: doc._id
    }));

    return namesArray;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSelectedGecMail({ enrollmentId }: { enrollmentId: string }) {
  try {
    connectToDatabase();

    const res = await Enrollment.findById(enrollmentId)
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
