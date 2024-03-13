import Footer from "@/components/shared/footer/Footer";
import LeftSideBar from "@/components/shared/navbar/LeftSideBar"; 
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-light-900 dark:bg-dark-100">
      <Navbar />
      <div className="flex">
        <LeftSideBar/>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-32 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Layout; 
