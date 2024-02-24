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
  isAdmin: boolean;
}

const Accepted = ({ selected, isAdmin }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger>
        {isAdmin && (
          <div className="primary-gradient flex min-h-[46px] items-center justify-center rounded-lg px-2 !text-light-900">
            Selected Candidates
          </div>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Accepted students</DrawerTitle>
          <DrawerDescription>
            <DataTable 
              columns={columns}
              data={selected}
            />
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
