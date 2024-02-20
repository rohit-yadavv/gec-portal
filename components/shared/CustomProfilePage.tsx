import Profile from "@/components/shared/form/Profile"; 

const CustomProfilePage = ({ userId, user }: any) => { 
  return (
    <>
      <h1 className="text-[30px] font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
        Profile
      </h1>

      <div className="mt-9">
        {userId && user && <Profile clerkId={userId} user={user} />}
      </div>
    </>
  );
};

export default CustomProfilePage;
