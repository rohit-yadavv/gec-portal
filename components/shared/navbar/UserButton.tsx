"use client";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeCookie } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";
import ChangePasswordDialog from "../ChangePasswordDialog";

const UserButton = () => {
  const { user, setUser } = useAuth();
  const path = usePathname();
  const router = useRouter();
  if (!user) return;


  const onLogOut = async () => { 
    try {
      await removeCookie({ path });
      setUser('');
      router.push('/sign-in')
    } catch (error) {
      console.log("Error in logout")
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="card-wrapper flex items-center justify-center border">
          <Image
            width={25}
            height={25}
            alt="user"
            className="invert dark:invert-0"
            src="/assets/icons/user.svg"
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hi {user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
          <ChangePasswordDialog />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onLogOut}>
          <p>LogOut</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
