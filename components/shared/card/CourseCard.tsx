import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalizeFirstLetter, formatDate, getTimeStamp } from "@/lib/utils";
import BookMark from "../BookMark";
import Link from "next/link";
import CardBadge from "./CardBadge";
import OtherDetails from "./OtherDetails";
import CardButtons from "./CardButtons";
import ApplicationStatus from "./ApplicationStatus";
import { getUserByToken } from "@/lib/actions/user.action";
import { CourseCardProps } from "@/types/components/card";



const CourseCard = async ({ event }: CourseCardProps) => {
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

  const user = await getUserByToken();
  // @ts-ignore
  const mongoUser = JSON.parse(user); 
  const appliedCount = applicant.length;
  const hasSaved = mongoUser?.saved?.includes(_id);
  const hasApplied = mongoUser?.appliedGec?.includes(_id);
  // console.log(hasApplied)
  const isTeacher = mongoUser?.teacher;
  // @ts-ignore
  const isSelected = selected?.some((user) => user._id === mongoUser?._id);
  const isRejected = rejected?.includes(mongoUser?._id);
  const isUploader = uploadedBy?._id === mongoUser?._id;

  return (
    <Card className="card-wrapper relative">
      {/* card header  */}

      <div className="absolute right-[30px] top-[-15px] flex w-max flex-row gap-3">
        <div className="rounded-md border border-[#e2995f] bg-light-900 px-4 py-2 text-[10px] font-medium leading-[13px] text-dark-200 dark:bg-dark-100 sm:text-[14px]">
          <p className="text-[#e2995f]">Apply by {formatDate(applyBy)}</p>
        </div>
        <ApplicationStatus
          isTeacher={isTeacher}
          hasApplied={hasApplied}
          isSelected={isSelected}
          isRejected={isRejected}
        />
      </div>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4">
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
            posted {getTimeStamp(uploadedAt)}
          </span>
        </p>

        {isTeacher ? (
          isUploader ? (
            <CardButtons
              selected={selected}
              applicant={applicant}
              enrollmentId={_id}
              user={mongoUser}
              viewApplicants={true}
              hasApplied={hasApplied}
              hasSaved={hasSaved}
              event={event}
            />
          ) : (
            <CardButtons enrollmentId={_id} user={mongoUser} hasSaved={hasSaved} />
          )
        ) : (
          <CardButtons
            event={event}
            isSelected={isSelected}
            isRejected={isRejected}
            selected={selected}
            applicant={applicant}
            enrollmentId={_id}
            user={mongoUser}
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
