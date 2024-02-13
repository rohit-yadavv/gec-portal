import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalizeFirstLetter, getTimeStamp } from "@/lib/utils";
import Image from "next/image"; 
import { ObjectId } from "mongoose";
import { auth } from "@clerk/nextjs";
import { getUserById, updateUser } from "@/lib/actions/user.action";
import BookMark from "../BookMark";
import { Badge } from "@/components/ui/badge"; 
import ApplyButton from "./ApplyButton";
// {
//   _id: new ObjectId('65c8a02f25bc80c7e0f69df5'),
//   type: 'vac',
//   desc: 'its an vac',
//   courseCode: 'bt cs 302',
//   courseName: 'vac for oops',
//   department: 'cse',
//   teacher: 'anant sir',
//   sem: 2,
//   eligible: 'pg',
//   seats: '20',
//   applicant: [],
//   uploadedAt: 2024-02-11T10:23:43.921Z,
//   __v: 0
// }

interface Props {
  event: {
    _id: ObjectId;
    courseName: string;
    courseCode: string;
    department: string;
    teacher: string;
    desc?: string;
    eligible: string;
    sem: string;
    uploadedBy: {
      name: string;
      picture: string;
      email: string;
    };
    uploadedAt: Date;
  };
}
const CourseCard = async ({ event }: Props) => {
  if (!event) return;
  const {
    _id,
    courseName,
    courseCode,
    department,
    desc,
    teacher,
    eligible,
    sem,
    uploadedBy,
    uploadedAt,
  } = event;

  const { userId } = auth();
  const mongoUser = await getUserById({ userId });

  let hasSaved = mongoUser?.saved.includes(_id);
  const hasApplied = mongoUser?.appliedGec.includes(_id);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row">
        <div className="flex flex-row gap-3 items-center">
          <Image
            src={uploadedBy?.picture}
            width={45}
            height={45}
            alt="profile pic"
            className="object-contain rounded-full"
          />
          <div>
            <CardTitle>{capitalizeFirstLetter(courseName)}</CardTitle>
            <p className="text-light400_light500">
              {uploadedBy?.name} | {uploadedBy?.email}
            </p>
          </div>
        </div>
        <BookMark
          userId={mongoUser?._id}
          hasSaved={hasSaved}
          enrollmentId={_id}
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Badge
            key={"eligible"}
            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
          >
            for {eligible}
          </Badge>
          <Badge
            key={"sem"}
            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
          >
            for sem {sem}
          </Badge>
          <Badge
            key={"tag"}
            className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
          >
            seats {}
          </Badge>
        </div>

        <CardDescription>{courseCode}</CardDescription>
        <CardDescription>Offered by department of {department}</CardDescription>
        <CardDescription></CardDescription>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
      <CardFooter className="relative flex flex-wrap justify-between gap-3">
        <p className="flex items-center gap-1 body-regular">
          <span className="small-regular line-clamp-1 max-sm:hidden text-dark100_light900">
            - posted {getTimeStamp(uploadedAt)}
          </span>
        </p>
        <div>
          <ApplyButton 
            userId={mongoUser?._id}
            enrollmentId={_id}
            hasApplied={hasApplied}
            isProfileComplete={mongoUser?.isProfileComplete}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
