'use server'

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
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/auth";
import { compileUserRegisterMail } from "../utils";
import { sendMail } from "../mail";

export async function createUserByAdmin(userData: any) {
  try {
    connectToDatabase();

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return;
    }
    console.log("fjslkfjslkjfklsjflksjflksjkldajf;kajf;dladjf;akljfalkjfa;lfjlj;a")

    const password = await hashPassword(userData?.password)

    const newUser = await User.create({ ...userData, password });
    await sendMail({
      to: newUser.email,
      name: newUser.name,
      subject: `Successfully Registered to Gec Portal`,
      body: compileUserRegisterMail({
        name: newUser.name,
        password: userData?.password,
        email: newUser.email,
      })
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function userVerification(params: any) {
  try {
    connectToDatabase();
    const { email, password } = params;
    const user = await User.findOne({ email });

    const validPassword = await comparePassword(password, user?.password);
    if (!validPassword || !user) {
      return false;
    }

    const tokenData = {
      id: user._id,
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
    const oneDay = 24 * 60 * 60 * 1000
    cookies().set('token', token, { expires: Date.now() + oneDay, secure: true, httpOnly: true })

    return true;
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export async function getUserByToken() {
  try {
    connectToDatabase();

    const cookie = cookies().get('token');
    const token = cookie?.value

    if(!token){
      return;
    }
    // @ts-ignore
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const user = await User.findById(decodedToken.id).
      select("-password");

    if (!user) {
      return;
    }

    return JSON.stringify(user);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeCookie(params: any) {
  try {
    console.log("first")
    const { path } = params;
    connectToDatabase();
    cookies().set('token', '')
    revalidatePath(path)
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(userId: any) {
  try {
    connectToDatabase();

    const user = await User.findById(userId).
      select("-password");

    if (!user) {
      return;
    }

    return JSON.stringify(user);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function forgetPassword(params: any) {
  const { email, NewPassword } = params;

  const user = await User.findOne({ email })

  if (!user) {
    return { success: false, message: "User Not Found" };
  }

  // Hash the new password
  const hashedNewPassword = await hashPassword(NewPassword);

  user.password = hashedNewPassword;
  await user.save();

  await sendMail({
    to: email,
    name: user?.name,
    subject: `New Password for GEC Portal`,
    body: compileUserRegisterMail({
      name: user?.name,
      password: NewPassword,
      email,
    })
  })

  return { success: true, message: "Sended Mail Successfully" };
}

export async function changePassword(params: any) {
  const { currentPassword, newPassword, userId } = params;

  const user = await User.findById(userId)

  if (!user) {
    return { success: false, message: "User Not Found" };
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password);

  if (!isPasswordValid) {
    return { success: false, message: "Incorrect Password" };
  }

  // Hash the new password
  const hashedNewPassword = await hashPassword(newPassword);

  user.password = hashedNewPassword;
  await user.save();

  return { success: true, message: "Password changed successfully" };
}

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

export async function countUser() {
  try {
    connectToDatabase();
    const totalUsers = await User.countDocuments();
    return totalUsers;
  } catch (error) {
    console.log(error)
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

export async function getSavedEnrollments({ searchQuery, filter }: getSavedEventProps) {
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

    const cookie = cookies().get('token');
    const token = cookie?.value
    // @ts-ignore
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    const user = await User.findById(decodedToken.id).populate({
      path: "saved",
      match: query,
      model: Enrollment,
      populate: [
        { path: "uploadedBy", model: User, select: "name email picture" },
      ],
    }).sort(sortOptions);

    const savedEvents = user?.saved;
    return JSON.stringify(savedEvents);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedEvents({ searchQuery, filter }: getSavedEventProps) {
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

    const cookie = cookies().get('token');
    const token = cookie?.value
    // @ts-ignore
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    const user = await User.findById(decodedToken.id).populate({
      path: "savedEvents",
      match: query,
      model: Event,
      populate: [
        { path: "uploadedBy", model: User, select: "name email" },
      ],
    }).sort(sortOptions);

    console.log(user)
    const savedEvents = user?.savedEvents;
    return JSON.stringify(savedEvents);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAppliedEvents({ searchQuery, filter }: getAppliedProps) {
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

    const cookie = cookies().get('token');
    const token = cookie?.value
    // @ts-ignore
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    const user = await User.findById(decodedToken.id).populate({
      path: "appliedEvent",
      match: query,
      model: Event,
      populate: [
        { path: "uploadedBy", model: User, select: "name email picture" },
      ],
    }).sort(sortOptions);

    const events = user ? user.appliedEvent : [];
    return JSON.stringify(events);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAppliedEnrollments({ searchQuery, filter }: getAppliedProps) {
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


    const cookie = cookies().get('token');
    const token = cookie?.value
    // @ts-ignore
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    const user = await User.findById(decodedToken.id).populate({
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
