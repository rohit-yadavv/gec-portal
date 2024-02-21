import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { SignIn, SignUp,  SignedOut} from "@clerk/nextjs"; 

const RightSideBar = async () => {
  
  return (
    <section className="absolute right-0 top-0 flex h-screen w-[300px]">
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
