import { FaUsers, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa"; 

const Services = () => { 
  return (
    <section className="py-24">
      <div className="flex size-full flex-wrap items-center justify-center gap-6">
        <div className="card-wrapper flex w-[350px] flex-col items-center justify-center rounded-lg border bg-light-850 p-8 shadow-md dark:bg-dark-100 sm:w-[400px]">
          <FaUsers className="size-8 fill-[#ff7000]" />
          <h3 className="mt-4 text-center">Register for GEC, VAC, and Events.</h3>
        </div>

        <div className="card-wrapper flex w-[350px] flex-col items-center justify-center rounded-lg border bg-light-850 p-8 shadow-md dark:bg-dark-100 sm:w-[400px]">
          <FaChalkboardTeacher className="size-8 fill-[#ff7000]" />
          <h3 className="mt-4 text-center">Post GEC, VAC, and Events for students.</h3>
        </div>

        <div className="card-wrapper flex w-[350px] flex-col items-center justify-center rounded-lg border bg-light-850 p-8 shadow-md dark:bg-dark-100 sm:w-[400px]">
          <FaCalendarAlt className="size-8 fill-[#ff7000]" />
          <h3 className="mt-4 text-center">View upcoming events and important dates.</h3>
        </div>
      </div>
    </section>
  );
};

export default Services;
