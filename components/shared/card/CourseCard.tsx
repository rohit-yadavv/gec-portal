import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 
import { getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import ApplyDialog from "../ApplyDialog";
import { ObjectId } from "mongoose";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action"; 
import BookMark from "../BookMark";

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
    _id:ObjectId;
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
    },
    uploadedAt: Date;
  };
}

const CourseCard = async ({ event }: Props) => {
    
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
    console.log(event)
  const {userId} = auth();
  const mongoUser = await getUserById({userId}) 
  let hasSaved = mongoUser?.saved.includes(_id);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row">
        <CardTitle>
          {courseName} 
        </CardTitle>
          <BookMark userId={mongoUser?._id} hasSaved={hasSaved} enrollmentId={_id}/>
      </CardHeader>
      <CardContent>
        <CardDescription>{courseCode}</CardDescription>
        <CardDescription>
          Offered by: {department} for {eligible} students of {sem} semester
        </CardDescription>
        <CardDescription> 
        </CardDescription>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
      <CardFooter className="relative flex flex-wrap justify-between gap-3">
        <p className="flex items-center gap-1 body-regular">
          <Image
            src={uploadedBy?.picture}
            width={16}
            height={16}
            alt="profile pic"
            className="object-contain rounded-full"
          />{" "}
          {uploadedBy?.name} ({uploadedBy?.email})
          <span className="small-regular line-clamp-1 max-sm:hidden text-dark100_light900">
            - {getTimeStamp(uploadedAt)}
          </span>
        </p>
        <div >
          <ApplyDialog registerFor={_id} userId={mongoUser?._id}  />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
