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
import BookMark from "../BookMark";
import Link from "next/link";
import CardBadge from "./CardBadge";
import OtherDetails from "./OtherDetails";
import CardButtons from "./CardButtons";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import ApplicationStatus from "./ApplicationStatus";

interface Props {
  event: {
    _id: string;
    courseName: string;
    courseCode: string;
    department: string;
    teacher: string;
    desc?: string;
    eligible: string;
    sem: number;
    uploadedBy: {
      _id: string;
      name: string;
      picture: string;
      email: string;
    };
    uploadedAt: Date;
    applyBy: Date;
    selected: string[];
    rejected: string[];
    applicant: string[];
    courseCredit: number;
    seats: number;
    type: string;
  };
}

const CourseCard = async ({ event }: Props) => {
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
    selected,
    rejected,
    seats,
  } = event;
  const appliedCount = applicant.length;

  const { userId } = auth();
  const user = await getUserById({ userId });
  const mongoUser = JSON.parse(user);
  const hasSaved = mongoUser?.saved.includes(_id);
  const hasApplied = mongoUser?.appliedGec.includes(_id);
  const isAdmin = mongoUser?.admin;
  const isSelected = selected?.includes(mongoUser?._id);
  const isRejected = rejected?.includes(mongoUser?._id);
  const isUploader = uploadedBy?._id === mongoUser?._id;
  return (
    <Card className="card-wrapper relative">
      {/* card header  */}
      <ApplicationStatus
        isAdmin={isAdmin}
        hasApplied={hasApplied}
        isSelected={isSelected}
        isRejected={isRejected}
      />
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
        <div className="hidden sm:flex">
          <BookMark
            formType="enrollment"
            userId={mongoUser?._id}
            hasSaved={hasSaved}
            enrollmentId={_id}
            size={20}
          />
        </div>
      </CardHeader>

      {/* card content & description  */}
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

      {/* card footer  */}
      <CardFooter className="relative flex flex-wrap justify-between gap-3">
        <p className="flex items-center gap-1">
          <span className=" line-clamp-1 text-sm max-sm:hidden">
            Apply by {formatDate(applyBy)}{" "}
            <span className="text-xs text-dark-500 dark:text-light-700">
              {" "}
              - posted {getTimeStamp(uploadedAt)}
            </span>
          </span>
        </p>
        {isAdmin ? (
          isUploader ? (
            <CardButtons
              selected={selected}
              applicant={applicant}
              enrollmentId={_id}
              user={user}
              viewApplicants={true}
              hasApplied={hasApplied}
              hasSaved={hasSaved}
            />
          ) : (
            <CardButtons enrollmentId={_id} user={user} hasSaved={hasSaved} />
          )
        ) : (
          <CardButtons
            isSelected={isSelected}
            isRejected={isRejected}
            selected={selected}
            applicant={applicant}
            enrollmentId={_id}
            user={user}
            viewApplicants={false}
            hasApplied={hasApplied}
            hasSaved={hasSaved}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
