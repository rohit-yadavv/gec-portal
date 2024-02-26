import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "../ui/button";

const CallToAction = () => (
  <>
    <SignedOut>
      <div className="mb-6 rounded-md border-2 border-[#ff7000] p-8 text-center text-dark-100 dark:text-light-900">
        <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
        <p className="text-dark-200 dark:text-light-850">
          Explore available courses and events now!
        </p>
        <Tabs defaultValue="account" className=" pt-5">
          <TabsList>
            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
            <TabsTrigger value="signIn">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="signUp">
            <SignUp />
          </TabsContent>
          <TabsContent value="signIn">
            <SignIn />
          </TabsContent>
        </Tabs>
      </div>
    </SignedOut>
    <SignedIn>
      <div className="mb-6 rounded-md border-2 border-[#ff7000] p-8 text-center text-dark-100 dark:text-light-900">
        <h2 className="mb-4 text-3xl font-bold">
          Explore available courses and events now!
        </h2>
        <Button className="card-wrapper border bg-transparent px-6 text-dark-100 hover:bg-transparent dark:text-light-900">
          <Link href="/all-forms">Visit Now</Link>
        </Button>
      </div>
    </SignedIn>
  </>
);

export default CallToAction;
