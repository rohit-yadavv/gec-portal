  
import Profile from "@/components/shared/form/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs"; 

const page = async() => {
  const {userId} = auth();
  if(!userId) return null; 
  const mongoUser=await getUserById({userId}); 
  
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Profile</h1>

      <div className="mt-9">
        <Profile 
          clerkId={userId}
          user={JSON.stringify(mongoUser)} 
        />       
      </div>
    </>
  );
};

export default page;
