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
    selected: string[];
    showDownloadExcel:boolean;
}

const Accepted = ({ selected, showDownloadExcel }: Props) => {   
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="primary-gradient min-h-[46px] rounded-lg px-3 py-1 !text-light-900 sm:px-4 sm:py-3">
          Selected Candidates
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Accepted students</DrawerTitle>
          <DrawerDescription>
            <DataTable showDownloadExcel={showDownloadExcel} columns={columns} data={selected} />
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

export default Accepted;
