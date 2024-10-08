import SignIn from "@/components/shared/form/SignIn";
import Navbar from "@/components/shared/navbar/Navbar";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-light-900 dark:bg-dark-100">
      <Navbar />
      <section className="flex flex-1 flex-col px-6 pb-6 pt-32 max-md:pb-14 sm:px-14">
        <div className="mx-auto w-full max-w-5xl">
          <SignIn />
        </div>
      </section>
      {/* <div className="absolute bottom-0 w-full">
        <Footer />
      </div> */}
    </main>
  );
}
