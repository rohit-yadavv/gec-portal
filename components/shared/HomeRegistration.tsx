import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { SignIn, SignUp,  SignedOut, auth } from "@clerk/nextjs"; 

const RightSideBar = async () => {
  const { userId } = auth();
  if(!userId){
    return;
  } 
  return (
    <section className="sticky right-0 top-0 flex h-screen ">
      <SignedOut>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <SignUp />
          </TabsContent>
          <TabsContent value="signin">
            <SignIn />
          </TabsContent>
        </Tabs>
      </SignedOut>
      {/* <SignedIn>   
      </SignedIn> */}
    </section>
  );
};

export default RightSideBar;
