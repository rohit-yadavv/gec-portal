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
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const DeleteForm = ({
  enrollmentId,
  type,
}: {
  enrollmentId: string;
  type: string;
}) => {
  const path = usePathname();
  const deleteFormNow = async () => {
    type === "enrollment" && (await deleteEnrollment({ path, enrollmentId }));
    type === "event" && (await deleteEvent({ path, enrollmentId }));
    toast("Unregister Successful");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="primary-gradient min-h-[46px] cursor-pointer rounded-lg px-3 py-1 !text-light-900 sm:px-4 sm:py-3">
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
