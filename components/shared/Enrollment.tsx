import { Button } from "../ui/button";
import EnrollmentForm from "./form/EnrollmentForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import EnrollmentDialog from "./EnrollmentDialog";

const Enrollment = async() => {
    const {userId} = auth();
    const mongoUser=await getUserById({userId});  
    // if(!userId) return null;

    
  if (!mongoUser?.admin) { 
    return;
  }
  return (
    <EnrollmentDialog user={JSON.stringify(mongoUser)}/>
  );
};

export default Enrollment;
