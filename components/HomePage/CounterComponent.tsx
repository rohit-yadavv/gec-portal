'use client'
import React, { useEffect, useState } from "react";
import "./CounterComponent.css";
import Image from "next/image";

interface Props{
  totalUsers:number;
  totalEvents:number;
  totalEnrollments:number;
}
const CounterComponent = ({ totalUsers, totalEvents, totalEnrollments }:Props) => { 
  const [usersCount, setUsersCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);

  useEffect(() => {
    const updateCounter = (targetValue:number, setCount:any) => {
      let currentValue = 0;

      const update = () => {
        if (currentValue < targetValue) {
          setCount(currentValue);
          currentValue += 1;
          requestAnimationFrame(update);
        }
      };

      update();
    };

    updateCounter(totalUsers, setUsersCount);
    updateCounter(totalEvents, setEventsCount);
    updateCounter(totalEnrollments, setEnrollmentsCount);
  }, [totalUsers, totalEvents, totalEnrollments]);

  return (
  <div className=" container p-3">
      <div className="flex flex-wrap items-center justify-center gap-10">
        <div className="">
          <div className="counter blue">
            <div className="counter-icon">
              <Image
                src="/assets/icons/all-forms.svg"
                width={35}
                height={35}
                alt="forms"
              />
            </div>
            <span className="counter-value">{enrollmentsCount}</span>
            <h3>Total Courses</h3>
          </div>
        </div>
        <div className="">
          <div className="counter green">
            <div className="counter-icon">
              <Image
                src="/assets/icons/users.svg"
                width={35}
                height={35}
                alt="forms"
              />
            </div>
            <span className="counter-value">{usersCount}</span>
            <h3>Registered Users</h3>
          </div>
        </div>
        <div className="">
          <div className="counter purple">
            <div className="counter-icon">
              <Image
                src="/assets/icons/all-events.svg"
                width={35}
                height={35}
                alt="event"
              />
            </div>
            <span className="counter-value">{eventsCount}</span>
            <h3>Total Events</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterComponent;
