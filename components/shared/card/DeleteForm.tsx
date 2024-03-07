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
import { deleteEnrollment } from "@/lib/actions/enrollment.action";
import { deleteEvent } from "@/lib/actions/event.action";
import { DeleteFormProps } from "@/types/components/card";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const DeleteForm = ({ enrollmentId, type }: DeleteFormProps) => {
  const path = usePathname();
  const deleteFormNow = async () => {
    type === "enrollment" && (await deleteEnrollment({ path, enrollmentId }));
    type === "event" && (await deleteEvent({ path, enrollmentId }));
    toast("Deleted Successful");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="primary-gradient flex min-h-[46px] cursor-pointer items-center justify-center rounded-lg px-2 !text-light-900">
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
