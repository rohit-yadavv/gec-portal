"use client";
 
import CustomProfilePage from "@/components/shared/CustomProfilePage"; 
import { UserProfile} from "@clerk/nextjs"; 
import ProfileIcon from "./ProfileIcon";
 
const UserProfilePage = () => ( 
  <UserProfile path="/user-profile" routing="path">
    <UserProfile.Page label="Your Details" labelIcon={<ProfileIcon/>} url="your-details">
        <CustomProfilePage/>
    </UserProfile.Page>
    <UserProfile.Page label="Terms" labelIcon='label' url="terms">
        {/* <CustomProfilePage /> */}
    </UserProfile.Page>
  </UserProfile>
);
 
export default UserProfilePage;