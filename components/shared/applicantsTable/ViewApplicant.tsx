import { Button } from "@/components/ui/button"; 
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ObjectId } from "mongoose";


// {
//   name: 'Rohit',
//   email: 'rewarrior532@gmail.com',
//   admin: true,
//   picture: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yY0p3NGw0aFRXVFk0dXNDa05mTG1jRDFRdXgifQ',
//   course: 'btech',
//   department: 'cse',
//   rollNo: 221632,
//   sem: 4
// }

interface Props {
  enrollmentId:ObjectId;
  applicant:{
    name: string;
    rollNo:string;
    email:string;
    course:string;
    department:string;
  }[]
}

const ViewApplicant = ({ applicant, enrollmentId }: Props) => {  
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 !text-light-900">
          View Applicants
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>All Applicants</DrawerTitle>
          <DrawerDescription>
            <DataTable columns={columns} data={applicant} enrollmentId={enrollmentId} />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ViewApplicant;
