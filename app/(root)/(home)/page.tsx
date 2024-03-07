// src/components/Home.js
import AboutSection from "@/components/HomePage/AboutSection";
import CallToAction from "@/components/HomePage/CallToAction";
import CounterComponent from "@/components/HomePage/CounterComponent";
import FeatureCard from "@/components/HomePage/FeatureCard";
import Slider from "@/components/HomePage/Slider";
import { countEnrollments } from "@/lib/actions/enrollment.action";
import { countEvents } from "@/lib/actions/event.action";
import { countUser } from "@/lib/actions/user.action"; 
import React from "react";

const Home = async () => {
  const totalUsers = await countUser();
  const totalEnrollments = await countEnrollments();
  const totalEvents = await countEvents();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-light-900 dark:bg-dark-100">
      <div className="w-full bg-light-900 dark:bg-dark-100">
        <Slider />
      </div>
      <div className="mt-8">
        <h1 className="pt-5 text-4xl font-bold leading-[42px] tracking-tighter text-dark-100 dark:text-light-900">
          Welcome to GEC Portal
        </h1>
        <p className="mb-8 text-gray-600">
          Your portal for GEC, VAC, and Events registration!
        </p>
      </div>

      <div className="mt-8">
        <CounterComponent
          totalUsers={totalUsers + 1}
          totalEnrollments={totalEnrollments + 1}
          totalEvents={totalEvents + 1}
        />
      </div>

      <div className="mt-8">
        <AboutSection />
      </div>

      <div className="mt-8">
        <FeatureCard />
      </div>

      <div className="mt-8">
        <CallToAction />
      </div>

      <div className="w-full border-t-2 pt-3">
        <div className="flex w-full flex-wrap items-center justify-center">
          <p>© 2022 Central University Of Haryana.</p>
          <p>Designed & Developed By CSE Dept. CUH</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Home;
