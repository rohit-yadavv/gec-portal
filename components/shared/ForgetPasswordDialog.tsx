"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { forgetPassword } from "@/lib/actions/user.action";
import { toast } from "sonner";

const ForgerPasswordDialog = () => {
  const [open, setOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [email, setEmail] = useState("");

  const handleFormSubmitSuccess = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChanging(true);
    try {
      const oneTimePassword = Math.random().toString(36).slice(-8);

      const res = await forgetPassword({ email, NewPassword: oneTimePassword });
      toast(res?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsChanging(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p>Forget Password ?</p>
      </DialogTrigger>
      <DialogContent className="h-max overflow-hidden">
        <DialogHeader>
          <DialogTitle>Forget Password</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleFormSubmitSuccess}
              className="mt-9 flex w-full flex-col gap-9"
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                className="no-focus  min-h-[56px] border"
                placeholder="Enter Your Email to Send New Password"
                required
              />
              <div className="mt-7 flex justify-end">
                <Button
                  id="submitForgetButton"
                  disabled={isChanging}
                  type="submit"
                  className="primary-gradient w-fit !text-light-900"
                >
                  {isChanging ? "Sending Mail..." : "Change Password"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ForgerPasswordDialog;
