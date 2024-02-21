import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import Handlebars from "handlebars";
import { welcomeTemplate } from "./templates/gec template";
import { broadcastTemplate } from "./templates/broadcast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkAdminEligibility(email: string): boolean {
  if (email.endsWith("@gmail.com")) {
    return true;
  } else {
    return false;
  }
}

export const getTimeStamp = (createdAtTemp: Date): string => {
  const createdAt = new Date(createdAtTemp);
  if (!(createdAt instanceof Date)) {
    throw new Error("Invalid date object");
  }

  // Calculate the time difference in milliseconds
  const now = new Date();
  const timeDifference = now.valueOf() - createdAt.valueOf();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Determine the appropriate time unit
  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
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

export function compileBroadcastMail(mailBody :string) {
  const template = Handlebars.compile(broadcastTemplate)
  const htmlBody = template({
    mailBody
  })
  return htmlBody
}
