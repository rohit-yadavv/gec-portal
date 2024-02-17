import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalizeFirstLetter, formatDate, getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import { ObjectId } from "mongoose";
import { SignedIn, SignedOut, auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import BookMark from "../BookMark";
import ApplyButton from "./ApplyButton";
import Link from "next/link";
import CardBadge from "./CardBadge";
import OtherDetails from "./OtherDetails";
import ViewApplicant from "../applicantsTable/ViewApplicant";
import { Button } from "@/components/ui/button";

interface Props {
  event: {
    _id: ObjectId;
    courseName: string;
    courseCode: string;
    department: string;
    teacher: string;
    desc?: string;
    eligible: string;
    sem: number;
    uploadedBy: {
      name: string;
      picture: string;
      email: string;
    };
    uploadedAt: Date;
    applyBy: Date;
    applicant: any;
    courseCredit: number;
    seats: number;
    type: string;
  };
  viewApplicants: boolean;
}

const CourseCard = async ({ event, viewApplicants }: Props) => {

  
  if (!event) return;
  const {
    _id,
    type,
    courseName,
    courseCode,
    department,
    desc,
    teacher,
    eligible,
    sem,
    courseCredit,
    uploadedBy,
    uploadedAt,
    applyBy,
    applicant,
    seats,
  } = event;
  
  const { userId } = auth();
  const mongoUser = JSON.parse(await getUserById({ userId }));
  const appliedCount = applicant.length; 

  const hasSaved = mongoUser?.saved.includes(_id);
  const hasApplied = mongoUser?.appliedGec.includes(_id);

  return (
    <Card className="card-wrapper">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4">
          <Image
            src={uploadedBy?.picture}
            width={45}
            height={45}
            alt="profile pic"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col gap-1">
            <CardTitle>{capitalizeFirstLetter(courseName)}</CardTitle>
            <Link
              href={`mailto:${uploadedBy?.email}`}
              className="cursor-pointer text-sm"
            >
              {uploadedBy?.name} |{" "}
              <span className="text-light-500"> {uploadedBy?.email} </span>
            </Link>
          </div>
        </div>
        <div className="hidden sm:block">
          <BookMark
            userId={mongoUser?._id}
            hasSaved={hasSaved}
            enrollmentId={_id}
            size={20}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-3">
          <CardBadge value={courseCode} desc={`course code - ${courseCode}`} />
          <CardBadge
            value={department}
            desc={`Offered by department of ${department}`}
          />
          <CardBadge value={eligible} desc={`only for ${eligible} students`} />
          <CardBadge value={type} desc={`it is a ${type}`} />
          <CardBadge value={teacher} desc={`teacher - ${teacher}`} />
        </div>
        <OtherDetails
          seats={seats}
          appliedCount={appliedCount}
          sem={sem}
          credit={courseCredit}
        />
        <CardDescription>{desc}</CardDescription>
      </CardContent>
      <CardFooter className="relative flex flex-wrap justify-between gap-3">
        <p className="flex items-center gap-1">
          <span className=" line-clamp-1 text-sm max-sm:hidden">
            Apply by {formatDate(applyBy)} <span className="text-xs text-dark-500 dark:text-light-700"> - posted {getTimeStamp(uploadedAt)}</span>
          </span>
        </p>
        <div className="hidden gap-3 sm:flex">
          {mongoUser?.admin ? (
            viewApplicants&& <ViewApplicant enrollmentId={_id} applicant={applicant} />
          ) : (
            <>
              <SignedOut>
                <Link href="/sign-in">
                  <Button className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900">
                    Login To Apply
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <ApplyButton
                  userId={mongoUser?._id}
                  enrollmentId={_id}
                  hasApplied={hasApplied}
                  isProfileComplete={mongoUser?.isProfileComplete} 
                />
              </SignedIn>
            </>
          )}
        </div>
        <div className="flex w-full flex-row items-center justify-between sm:hidden">
          <BookMark
            userId={mongoUser?._id}
            hasSaved={hasSaved}
            enrollmentId={_id}
            size={25}
          />
          <ApplyButton
            userId={mongoUser?._id}
            enrollmentId={_id}
            hasApplied={hasApplied}
            isProfileComplete={mongoUser?.isProfileComplete}
          />
          {viewApplicants && <ViewApplicant enrollmentId={_id} applicant={applicant} />}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
