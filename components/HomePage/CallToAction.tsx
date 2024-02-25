import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const CallToAction = () => (
  <div className="rounded-md bg-blue-500 p-8 text-center text-white">
    <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
    <p className="text-gray-200">Explore available courses and events now!</p>
    <Link href="/sign-up">
      <Button className="mt-4 rounded-full bg-white px-6 py-2 font-semibold text-blue-500">
        SignUp Now
      </Button>
    </Link>
  </div>
);

export default CallToAction;
