"use client";

import CustomProfilePage from "@/components/shared/CustomProfilePage";
import { UserProfile, useAuth } from "@clerk/nextjs";
import ProfileIcon from "./ProfileIcon";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/actions/user.action";

const UserProfilePage = () => {

  const [user, setUser] = useState("");
  const [isAdmin, isSetAdmin] = useState();
  const { userId } = useAuth();

  const getUser = async () => {
    const mongoUser = await getUserById({ userId });
    setUser(mongoUser);
    const parsedUser=JSON.parse(mongoUser)
    isSetAdmin(parsedUser.admin);
  };
  useEffect(() => {
    getUser();
  }, []);


  return (
    <UserProfile path="/user-profile" routing="path">
      <UserProfile.Page
        label="Your Details"
        labelIcon={<ProfileIcon />}
        url="your-details"
      >
        {!isAdmin &&  <CustomProfilePage userId={userId} user={user} />}
       
      </UserProfile.Page>
      <UserProfile.Page label="Terms" labelIcon="label" url="terms">
        {/* <CustomProfilePage /> */}
      </UserProfile.Page>
    </UserProfile>
  );
};

export default UserProfilePage;
