import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "@/lib/actions/user.action";
import { getTimeStamp } from "@/lib/utils";
import Image from "next/image";
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
    courseName: string;
    courseCode: string;
    department: string;
    teacher: string;
    desc?: string;
    eligible: string;
    sem: string;
    uploadedByClerkId: string;
    uploadedAt: Date;
  };
}
const CourseCard = async ({ event }: Props) => {
  const {
    courseName,
    courseCode,
    department,
    desc,
    teacher,
    eligible,
    sem,
    uploadedByClerkId,
    uploadedAt,
  } = event;
  
  const user = await getUserById({ userId:uploadedByClerkId }); 

  return (
    <Card>
      <CardHeader>
        <CardTitle>{courseName}</CardTitle>
        <CardDescription>{courseCode}</CardDescription>
        <CardDescription>
          Offered by: {department} for {eligible} students of {sem} semester
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
      <CardFooter className="relative">

        <p className="flex items-center gap-1">
        <Image
          src={user?.picture}
          width={16}
          height={16}
          alt='profile pic'
          className="object-contain rounded-full"
        />
          <span className="small-regular line-clamp-1 max-sm:hidden">
            posted {getTimeStamp(uploadedAt)} by {user?.name} ({user?.email})
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
