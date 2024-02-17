"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteEvent } from "@/lib/actions/enrollment.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const DeleteForm = ({ enrollmentId }: { enrollmentId: string }) => {
  const path = usePathname();
  const deleteFormNow = async () => {
    console.log("deleted");
    await deleteEvent({ path, enrollmentId });
    toast("Unregister Successfull");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="primary-gradient min-h-[46px] cursor-pointer rounded-lg px-4 py-3 !text-light-900">
          Delete Form
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your form
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteFormNow}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteForm;
