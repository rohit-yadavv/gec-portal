import {
  Card,
  CardContent,
  CardDescription, 
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IEnrollment } from "@/database/enrollment.model";

// type: "gec",
// courseCode: "BT PPT 409A",=> code
// courseName: "Printing and Packaging Materials", => name
// department: " Printing and Packaging Materials", => department
// CourseCredits: 4,
// teacher: "suman kumari",
// sem: 4,
// eligible: "ug",
// seats: 40,
interface Props{
  courseName:string;
  courseCode:string;
  department:string;
  desc?:string;
}
const CourseCard = ({courseName, courseCode, department, desc }:Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{courseName}</CardTitle>
        <CardDescription>{courseCode}</CardDescription>
        <CardDescription>Offered by: {department}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{desc}</CardDescription>
      </CardContent>
      <CardFooter>
        <p>Posted by: suman kumari</p>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
