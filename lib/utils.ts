import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import Handlebars from "handlebars";
import { welcomeTemplate } from "./templates/gec template";
import { broadcastTemplate } from "./templates/broadcast";
import { userRegistration } from "./templates/userRegistration";
import { eventTemplate } from "./templates/eventTemplate";
import { sendMail } from "./mail";
import { getUserById } from "./actions/user.action";
import { getEnrollmentById } from "./actions/enrollment.action";
import { getEventById } from "./actions/event.action";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkAdminEligibility(email: string): boolean {
  if (email.endsWith("@cuh.ac.in")) {
    return true;
  } else {
    return false;
  }
}

export const getTimeStamp = (createdAtTemp: Date): string => {
  const createdAt = new Date(createdAtTemp);

  const now = new Date();
  const timeDifference = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const second = 1;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = timeDifference;
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};

export function capitalizeFirstLetter(inputString: string) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export function capitalize(inputString: string): string {
  const words: string[] = inputString.split(" ");

  const capitalizedWords: string[] = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const resultString: string = capitalizedWords.join(" ");

  return resultString;
}

export function formatDate(mongoDateString: Date): string {
  const mongoDate = new Date(mongoDateString);

  const options: any = { day: 'numeric', month: 'long', year: 'numeric' as const };
  const formattedDate = mongoDate.toLocaleDateString('en-US', options);

  return formattedDate;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export function compileEventTemplate({ name, type, eName, eTime, eVenue }: { name: string, type: string, eName: string, eTime: string, eVenue: string }) {
  const template = Handlebars.compile(eventTemplate)
  const htmlBody = template({ name, type, eName, eTime, eVenue })
  return htmlBody
}

export function compileWelcomeTemplate({ name, type, cName, cId, cDept, action }: { name: string, type: string, cName: string, cId: string, cDept: string, action: string }) {

  const template = Handlebars.compile(welcomeTemplate)
  const htmlBody = template({
    name,
    type,
    cName,
    cId,
    cDept,
    action
  })
  return htmlBody
}

export function compileUserRegisterMail({ name, email, password }: { name: string, email: string, password: string }) {
  const template = Handlebars.compile(userRegistration)
  const htmlBody = template({ name, email, password })
  return htmlBody
}

export function compileBroadcastMail(mailBody: string) {
  const template = Handlebars.compile(broadcastTemplate)
  const htmlBody = template({
    mailBody
  })
  return htmlBody
}

export async function sendAcceptedEventMail({ userId, enrollmentId, type }: any) {
  try {

    const mongoUser = await getUserById(userId );
    if(!mongoUser) return;
    const user = JSON.parse(mongoUser);
    const enrollmentData = await getEventById({ enrollmentId });
    const enrollment = JSON.parse(enrollmentData);

    await sendMail({
      to: user?.email,
      name: user?.name,
      subject: `${type}ed for event of ${enrollment?.eventName}`,
      body: compileEventTemplate({
        name: user?.name,
        type: enrollment?.type,
        eName: enrollment?.eventName,
        eTime: enrollment?.eventTime,
        eVenue: enrollment?.venue,
      })
    });

  } catch (error) {
    console.error('Error in sendAcceptedEventMail function:', error);
  }
}

export async function sendAcceptedMail({ userId, enrollmentId, type }: any) {
  try {

    const mongoUser = await getUserById(userId);
    if(!mongoUser)return;
    const user = JSON.parse(mongoUser);

    const enrollmentData = await getEnrollmentById({ enrollmentId });
    const enrollment = JSON.parse(enrollmentData);

    await sendMail({
      to: user?.email,
      name: user?.name,
      subject: `${type}ed for ${enrollment?.type} of ${enrollment?.courseName}`,
      body: compileWelcomeTemplate({
        name: user?.name,
        type: enrollment?.type,
        cName: enrollment?.courseName,
        cId: enrollment?.courseCode,
        cDept: enrollment?.department,
        action: type
      })
    });

  } catch (error) {
    console.error('Error in sendAcceptedMail function:', error);
  }
}