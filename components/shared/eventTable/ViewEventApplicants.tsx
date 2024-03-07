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

interface Props {
  enrollmentId:string;
  applicant: string[];
}

const ViewEventApplicant = ({ applicant, enrollmentId }: Props) => {  
  return (
    <Drawer>
      <DrawerTrigger> 
        <div className="primary-gradient flex min-h-[46px] items-center justify-center rounded-lg px-1 !text-light-900">
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

export default ViewEventApplicant;
