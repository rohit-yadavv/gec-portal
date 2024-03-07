import Link from "next/link";
import { Button } from "../ui/button";

const CallToAction = () => (
  <div className="mb-6 rounded-md border-2 border-[#ff7000] p-8 text-center text-dark-100 dark:text-light-900">
    <h2 className="mb-4 text-3xl font-bold">
      Explore available courses and events now!
    </h2>
    <Button className="card-wrapper border bg-transparent px-6 text-dark-100 hover:bg-transparent dark:text-light-900">
      <Link href="/all-forms">Visit Now</Link>
    </Button>
  </div>
);

export default CallToAction;
