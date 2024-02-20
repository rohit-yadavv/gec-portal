import Profile from "@/components/shared/form/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const CustomProfilePage = () => {
  const [user, setUser] = useState("");
  const { userId } = useAuth();

  const getUser = async () => {
    const mongoUser = await getUserById({ userId });
    setUser(mongoUser);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        Profile
      </h1>

      <div className="mt-9">
        {userId&&user && <Profile clerkId={userId} user={user} />}
      </div>
    </>
  );
};

export default CustomProfilePage;
