import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Theme from "./Theme";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="fixed z-50 flex w-full items-center  justify-between gap-5 border-b bg-light-900 p-4 dark:border-stone-800 dark:bg-dark-100 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          width={33} 
          height={33}
          alt="WebOverflow"
          src="/assets/images/site-logo.svg"
        />
        <p className=" text-dark-100 dark:text-light-900 max-sm:hidden">
          GEC <span className="text-primary-500">Portal</span>
        </p>
      </Link>
      {/* GlobalSearch  */}
      <div className="flex items-center justify-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav/>
      </div>
    </nav>
  );
};

export default Navbar;
