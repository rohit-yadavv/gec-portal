import { Button } from "../ui/button";
import EnrollmentForm from "./form/EnrollmentForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import EnrollmentDialog from "./EnrollmentDialog";

const Enrollment = async() => {
    const {userId} = auth() ?? {userId:''}  //clerkId 
    const mongoUser=await getUserById({userId});   
    
  if (!mongoUser?.admin) { 
    return;
  }
  return (
    <EnrollmentDialog userId={userId}/>
  );
};

export default Enrollment;
